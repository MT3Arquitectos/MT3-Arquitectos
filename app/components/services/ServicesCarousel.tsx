import React from "react";

const ServicesCarousel = () => {
  const images = [
    "/voala/voala-16.webp",
    "/esmeralda/esmeralda-8.webp",
    "/voala/voala-14.webp",
    "/esmeralda/esmeralda-5.webp",
    "/voala/voala-13.webp",
    "/esmeralda/esmeralda-10.webp",
  ];

  // duplicate for seamless loop
  const duplicated = [...images, ...images];

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Small CSS: keyframes + mask gradient (kept minimal) */}
      <style>{`
        @keyframes scrollRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mask-gradient {
          mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
        }
      `}</style>

      {/* Background overlay (subtle) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl py-10">
        <div className="mask-gradient overflow-hidden">
          {/* animated row */}
          <div
            className="flex items-center gap-6 w-max"
            style={{ animation: "scrollRight 50s linear infinite" }}
            aria-hidden="false"
          >
            {duplicated.map((src, i) => (
              <figure
                key={i}
                className="flex-shrink-0 rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-300 filter hover:scale-105 hover:brightness-110"
                // sizes: rectangular horizontal — adjust per breakpoint
                style={{ width: 520, height: 300 }}
              >
                <img
                  src={src}
                  alt={`Galería ${ (i % images.length) + 1 }`}
                  loading="lazy"
                  className="w-full h-full object-cover block"
                  // prefer layout control via Tailwind breakpoints below (for older browsers inline style gives consistent base)
                />
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}

export default ServicesCarousel;
