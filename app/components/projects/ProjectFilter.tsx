import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { PROJECT_CATEGORIES } from '../../data/projectsData';
import type { Project } from '../../data/projectsData';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

const TabButton = ({ active, onClick, children }: TabButtonProps) => (
  <motion.button
    onClick={onClick}
    className={`relative px-4 md:px-6 py-2 text-sm md:text-base tracking-wide transition-colors ${
      active ? 'text-[#F2B705]' : 'text-gray-300 hover:text-white'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
  >
    {children}
    {active && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F2B705]"
        layoutId="activeTab"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    )}
  </motion.button>
);

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      to={`/proyectos/${project.slug}`}
      className="relative group block aspect-[16/10] w-full rounded-md overflow-hidden"
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Degradado para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white/90 text-3xl md:text-4xl font-bold drop-shadow">
            {project.title}
          </span>
        </div>
        <div>
          <p className="text-white/80 text-xs md:text-sm uppercase mb-3">{project.location}</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/25 px-5 py-2 text-xs md:text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
            Ver detalles
            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

const ProjectFilter = ({ projects }: { projects: Project[] }) => {
  const [active, setActive] = useState('TODOS');

  const filtered = useMemo(() => {
    if (active === 'TODOS') return projects;
    return projects.filter((p) => p.category === active);
  }, [active, projects]);

  return (
    <section className="bg-[#2d2a28] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="flex items-center gap-6 border-b border-white/20 pb-4 overflow-x-auto">
          {PROJECT_CATEGORIES.map((cat) => (
            <TabButton key={cat.key} active={active === cat.key} onClick={() => setActive(cat.key)}>
              {cat.label}
            </TabButton>
          ))}
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8" layout>
          {filtered.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                delay: idx * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              layout
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectFilter;
