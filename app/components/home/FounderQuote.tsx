import React from 'react';

const FounderQuote = () => {
  return (
    <section className="relative bg-black text-white py-20 px-6 overflow-hidden">
      {/* Patrón geométrico de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gray-400 rotate-45"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-gray-400 rotate-12"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 border border-gray-400 rotate-45"></div>
        <div className="absolute bottom-10 right-32 w-28 h-28 border border-gray-400 rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-gray-400 rotate-45"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border border-gray-400 rotate-12"></div>
        
        {/* Líneas geométricas adicionales */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gray-400 rotate-12 opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gray-400 rotate-12 opacity-30"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gray-400 rotate-12 opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto de la cita */}
          <div className="space-y-8">
            <blockquote className="text-3xl lg:text-4xl xl:text-5xl font-light leading-tight">
              "Aunque no tengas un boceto listo de lo que quieres, te ayudaremos a conseguir el resultado que siempre soñaste."
            </blockquote>
          </div>

          {/* Información del fundador */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-6">
            {/* Foto del fundador */}
            <div className="relative">
              <img 
                src="/team/juan-carlos.webp" 
                alt="Juan Carlos Martínez Guzmán - Arquitecto Fundador"
                className="w-48 h-48 rounded-full object-cover border-2 border-gray-600"
              />
            </div>

            {/* Información personal */}
            <div className="space-y-2">
              <h3 className="text-2xl lg:text-3xl font-bold">
                Juan Carlos<br />
                Martínez Guzmán
              </h3>
              <p className="text-sm lg:text-base font-medium tracking-wider text-gray-300">
                ARQUITECTO FUNDADOR
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderQuote;
