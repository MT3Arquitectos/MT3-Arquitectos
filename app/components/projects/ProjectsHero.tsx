import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
  
const ProjectsHero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ['Personalizados', 'Modernos', 'Funcionales', 'Únicos', 'Sostenibles'],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) =>
        prev === titles.length - 1 ? 0 : prev + 1
      );
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full sm:h-[65vh] relative flex items-center justify-center bg-cover bg-center overflow-hidden" 
         style={{ backgroundImage: 'url(/projects/projects-bg.webp)' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">

          <div className="flex flex-col items-center gap-4">
            <h1 className="text-5xl md:text-7xl tracking-tighter text-center font-medium text-white font-semibold">
              Proyectos
            </h1>
            <div className="relative w-screen flex justify-center overflow-hidden text-center h-16 md:h-20 items-center">
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-normal text-white whitespace-nowrap text-5xl md:text-7xl"
                  initial={{ opacity: 0, y: '-100' }}
                  transition={{ type: 'spring', stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsHero;
