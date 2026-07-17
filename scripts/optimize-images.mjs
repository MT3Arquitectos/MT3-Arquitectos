import { spawn } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve('.');
const publicDir = join(root, 'public');
const maxBytes = 200 * 1024;

const webpTargets = [
  'voala/voala-16.webp',
  'projects/projects-bg.webp',
  'services_hero/services-slider.webp',
  'voala/voala-1.webp',
  'voala/voala-5.webp',
];

const ogTarget = {
  input: 'og/mt3-og.webp',
  output: 'og/mt3-og.webp',
  width: 1200,
  height: 630,
  maxBytes,
};

async function trySharp() {
  try {
    const sharp = (await import('sharp')).default;

    for (const rel of webpTargets) {
      const file = join(publicDir, rel);
      let quality = 82;
      let output;

      do {
        output = await sharp(file).webp({ quality, effort: 6 }).toBuffer();
        quality -= 6;
      } while (output.length > maxBytes && quality >= 44);

      await writeFile(file, output);
      console.log(`${rel}: ${Math.round(output.length / 1024)} KB`);
    }

    const ogFile = join(publicDir, ogTarget.input);
    let quality = 86;
    let ogOutput;

    do {
      ogOutput = await sharp(ogFile)
        .resize(ogTarget.width, ogTarget.height, { fit: 'cover', position: 'center' })
        .webp({ quality, effort: 6 })
        .toBuffer();
      quality -= 6;
    } while (ogOutput.length > ogTarget.maxBytes && quality >= 44);

    await writeFile(join(publicDir, ogTarget.output), ogOutput);
    console.log(`${ogTarget.output}: ${Math.round(ogOutput.length / 1024)} KB`);
    return true;
  } catch {
    return false;
  }
}

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate));
}

async function waitForJson(url, timeoutMs = 10000) {
  const started = Date.now();
  let lastError;

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolveTimeout) => setTimeout(resolveTimeout, 200));
  }

  throw lastError ?? new Error(`Timed out waiting for ${url}`);
}

function createCdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;

    const { resolve: resolveMessage, reject } = pending.get(message.id);
    pending.delete(message.id);

    if (message.error) reject(new Error(message.error.message));
    else resolveMessage(message.result);
  });

  return new Promise((resolveSocket, rejectSocket) => {
    ws.addEventListener('open', () => {
      resolveSocket({
        send(method, params = {}) {
          const messageId = ++id;
          ws.send(JSON.stringify({ id: messageId, method, params }));
          return new Promise((resolveMessage, reject) => {
            pending.set(messageId, { resolve: resolveMessage, reject });
          });
        },
        close() {
          ws.close();
        },
      });
    });
    ws.addEventListener('error', rejectSocket);
  });
}

function optimizerExpression(dataUrl, options) {
  const payload = JSON.stringify({ dataUrl, options });
  return `
    (async () => {
      const { dataUrl, options } = ${payload};
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = dataUrl;
      });

      const encode = (canvas, quality) => new Promise((resolve) => {
        canvas.toBlob(async (blob) => {
          const buffer = await blob.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          let binary = '';
          for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
          resolve({ base64: btoa(binary), size: bytes.length, quality });
        }, 'image/webp', quality);
      });

      let width = options.width || img.naturalWidth;
      let height = options.height || img.naturalHeight;
      let scale = options.width ? Math.max(width / img.naturalWidth, height / img.naturalHeight) : 1;
      let quality = 0.86;

      for (let attempt = 0; attempt < 18; attempt += 1) {
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(width));
        canvas.height = Math.max(1, Math.round(height));
        const ctx = canvas.getContext('2d');

        if (options.width) {
          const sourceWidth = width / scale;
          const sourceHeight = height / scale;
          const sx = Math.max(0, (img.naturalWidth - sourceWidth) / 2);
          const sy = Math.max(0, (img.naturalHeight - sourceHeight) / 2);
          ctx.drawImage(img, sx, sy, sourceWidth, sourceHeight, 0, 0, width, height);
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }

        const result = await encode(canvas, quality);
        if (result.size <= options.maxBytes || (quality <= 0.42 && options.width)) {
          return { ...result, width: canvas.width, height: canvas.height };
        }

        if (quality > 0.44) {
          quality -= 0.08;
        } else {
          width *= 0.92;
          height *= 0.92;
        }
      }

      throw new Error('Could not compress image below requested size.');
    })()
  `;
}

async function optimizeWithChrome() {
  const browser = chromePath();
  if (!browser) {
    throw new Error('Neither sharp nor a local Chromium browser is available.');
  }

  const port = 9333 + Math.floor(Math.random() * 1000);
  const userDataDir = join(root, '.tmp', 'chrome-image-optimizer');
  await mkdir(userDataDir, { recursive: true });

  const chrome = spawn(browser, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    'about:blank',
  ], { stdio: 'ignore' });

  let cdp;
  try {
    await waitForJson(`http://127.0.0.1:${port}/json/version`);
    const targets = await waitForJson(`http://127.0.0.1:${port}/json`);
    const page = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl);
    if (!page) throw new Error('Chrome did not expose a page target.');

    cdp = await createCdp(page.webSocketDebuggerUrl);
    await cdp.send('Runtime.enable');

    const tasks = [
      ...webpTargets.map((rel) => ({ input: rel, output: rel, maxBytes })),
      ogTarget,
    ];

    for (const task of tasks) {
      const inputFile = join(publicDir, task.input);
      const outputFile = join(publicDir, task.output);
      const input = await readFile(inputFile);
      const dataUrl = `data:image/webp;base64,${input.toString('base64')}`;
      const result = await cdp.send('Runtime.evaluate', {
        expression: optimizerExpression(dataUrl, task),
        awaitPromise: true,
        returnByValue: true,
      });

      if (result.exceptionDetails) {
        throw new Error(result.exceptionDetails.text);
      }

      const value = result.result.value;
      await mkdir(dirname(outputFile), { recursive: true });
      await writeFile(outputFile, Buffer.from(value.base64, 'base64'));
      console.log(`${task.output}: ${Math.round(value.size / 1024)} KB, ${value.width}x${value.height}`);
    }

  } finally {
    cdp?.close();
    chrome.kill();
    await new Promise((resolveClose) => {
      chrome.once('close', resolveClose);
      setTimeout(resolveClose, 1500);
    });

    for (let attempt = 0; attempt < 5; attempt += 1) {
      try {
        await rm(userDataDir, { recursive: true, force: true });
        break;
      } catch {
        await new Promise((resolveTimeout) => setTimeout(resolveTimeout, 300));
      }
    }
  }
}

if (!(await trySharp())) {
  await optimizeWithChrome();
}
