import React from 'react';
import { MdOutlineChair } from 'react-icons/md';
import { PiHouseLineBold } from 'react-icons/pi';
import { HiOutlineClipboardDocumentCheck, HiOutlinePaintBrush } from 'react-icons/hi2';

const Services = () => {
  const services = [
    {
      icon: PiHouseLineBold ,
      title: "ARQUITECTURA",
      description: "Diseñamos espacios arquitectónicos que combinan estética contemporánea con funcionalidad inteligente."
    },
    {
      icon: MdOutlineChair ,
      title: "INTERIORES",
      description: "Transformamos ambientes interiores creando espacios únicos que reflejan tu estilo y necesidades."
    },
    {
      icon: HiOutlineClipboardDocumentCheck ,
      title: "CONSULTORÍA",
      description: "Asesoramiento profesional en proyectos arquitectónicos, desde planificación hasta ejecución final."
    },
    {
      icon: HiOutlinePaintBrush ,
      title: "DECORACIÓN",
      description: "Selección experta de elementos decorativos que complementan y realzan cada espacio de tu proyecto."
    }
  ];

  return (
    <section className="relative bg-gray-50 py-20 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Geometric pattern SVG */}
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="geometric-pattern-services" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="50" height="50" fill="none" stroke="#000" strokeWidth="0.5"/>
                <rect x="50" y="50" width="50" height="50" fill="none" stroke="#000" strokeWidth="0.5"/>
                <circle cx="25" cy="25" r="8" fill="none" stroke="#000" strokeWidth="0.5"/>
                <circle cx="75" cy="75" r="8" fill="none" stroke="#000" strokeWidth="0.5"/>
                <line x1="0" y1="0" x2="100" y2="100" stroke="#000" strokeWidth="0.3"/>
                <line x1="100" y1="0" x2="0" y2="100" stroke="#000" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric-pattern-services)"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black">SERVICIOS</h2>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 hover:scale-105 border border-gray-100"
              >
                {/* Ícono */}
                <div className="text-gray-800 mb-6 flex justify-center">
                  <IconComponent className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>

                {/* Título */}
                <h3 className="text-lg sm:text-xl lg:text-xl font-semibold mb-4 sm:mb-6 tracking-wide text-black">
                  {service.title}
                </h3>

                {/* Descripción */}
                <p className="text-xs sm:text-sm lg:text-sm font-light leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
