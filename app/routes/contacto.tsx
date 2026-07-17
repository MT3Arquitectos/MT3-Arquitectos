import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useFetcher } from 'react-router';
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaPinterestP, FaWhatsapp } from 'react-icons/fa';
import type { Route } from './+types/contacto';
import Button from '../components/ui/Button2';
import { sendContactEmail } from '../lib/email.server';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Contacto — MT3 Arquitectos' },
    {
      name: 'description',
      content:
        'Ponte en contacto con MT3 Arquitectos en León, Guanajuato. Cuéntanos tu proyecto y lo haremos realidad.',
    },
    { property: 'og:image', content: '/og/contacto.jpg' },
    { name: 'twitter:image', content: '/og/contacto.jpg' },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  // Honeypot: si el campo oculto viene lleno, es un bot. Aceptamos en silencio
  // y descartamos (reemplaza al rate-limit en memoria, que no sirve en serverless).
  if (formData.get('company')) {
    return {
      success: true,
      message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.',
    };
  }

  return await sendContactEmail({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });
}

interface SocialLink {
  name: string;
  url: string;
  icon: ReactNode;
}

export default function Contacto() {
  const fetcher = useFetcher<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);

  const loading = fetcher.state !== 'idle';
  const result = fetcher.data;

  // Resetear el formulario cuando el envío fue exitoso.
  useEffect(() => {
    if (fetcher.state === 'idle' && result?.success) {
      formRef.current?.reset();
    }
  }, [fetcher.state, result]);

  const socialLinks: SocialLink[] = [
    { name: 'Facebook', url: 'https://www.facebook.com/MT3arquitectos', icon: <FaFacebookF className="w-5 h-5" /> },
    { name: 'Instagram', url: 'https://www.instagram.com/mt3arquitectos/', icon: <FaInstagram className="w-5 h-5" /> },
    { name: 'Pinterest', url: 'https://mx.pinterest.com/mt3arquitectos/', icon: <FaPinterestP className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="w-full h-[65vh] relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/voala/voala-14.webp)' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto relative z-10 px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight">
              Contáctanos
            </h1>
            <div className="w-32 h-1 bg-slate-400 mt-6"></div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">PONTE EN CONTACTO</h2>
                <p className="text-gray-600">
                  Nos encantaría conocer tu proyecto. Completa el formulario y nos pondremos en contacto contigo.
                </p>
              </div>

              <fetcher.Form method="post" ref={formRef} className="space-y-6">
                {/* Honeypot anti-spam (oculto para humanos) */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre completo"
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-300 text-gray-700"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu correo electrónico"
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-300 text-gray-700"
                  />
                </div>

                <div className="relative">
                  <div className="absolute top-4 left-0 pl-3 flex items-start pointer-events-none">
                    <FiMessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Cuéntanos sobre tu proyecto..."
                    required
                    rows={6}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-300 resize-none text-gray-700"
                  ></textarea>
                </div>

                <div className="w-full">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>

                  {/* Mensaje de estado */}
                  {result?.message && (
                    <div
                      className={`mt-4 p-4 rounded-lg border ${
                        result.success
                          ? 'bg-green-50 border-green-200 text-green-800'
                          : 'bg-red-50 border-red-200 text-red-800'
                      } animate-fade-in`}
                    >
                      <div className="flex items-start gap-3">
                        {result.success ? (
                          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        <p className="text-sm leading-relaxed">{result.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              </fetcher.Form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">COMENCEMOS TU PROYECTO</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3">
                      <FiMapPin className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Dirección</h4>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Volcan%20%23110%2C%20Jardines%20del%20Moral%20Le%C3%B3n%2C%20Guanajuato"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Volcan #110, Jardines del Moral León, Guanajuato
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3">
                      <FiMail className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Correo</h4>
                      <a
                        href="mailto:direccion@mt3arquitectos.com.mx"
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        direccion@mt3arquitectos.com.mx
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3">
                      <FiPhone className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Teléfono</h4>
                      <a
                        href="tel:+524773925249"
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        +52 477 392 5249
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <a
                    href="https://wa.me/524773925249"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-black hover:bg-gray-50 text-white hover:text-black font-semibold py-4 px-6 transition-all duration-300 shadow-lg hover:shadow-xl rounded-sm"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                    Escribir por WhatsApp
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Síguenos</h3>
                <div className="flex justify-start gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-black hover:bg-gray-900 hover:text-white hover:border-gray-700 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="w-full h-96 bg-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.8147777777777!2d-101.6830!3d21.1222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842bbf0f0f0f0f0f%3A0x1234567890abcdef!2sVolcan%20110%2C%20Jardines%20del%20Moral%2C%20Le%C3%B3n%2C%20Gto.!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          title="Ubicación MT3 - Volcan #110, Jardines del Moral León, Guanajuato"
        ></iframe>
      </div>
    </div>
  );
}
