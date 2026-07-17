import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from './ImageComparison';
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
    <div className="relative group">
      <ImageComparison className="aspect-[16/10] w-full rounded-md overflow-hidden" enableHover>
        <ImageComparisonImage
          src={project.image}
          alt={project.title}
          position="left"
          className="grayscale"
        />
        <ImageComparisonImage src={project.image} alt={project.title} position="right" />
        <ImageComparisonSlider className="w-0.5 bg-white/40">
          <div className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </ImageComparisonSlider>
      </ImageComparison>

      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="text-white/90 text-3xl md:text-4xl font-bold drop-shadow">
            {project.title}
          </span>
        </div>
        <div>
          <p className="text-white/80 text-xs md:text-sm uppercase">{project.location}</p>
          <Link
            to={`/proyectos/${project.slug}`}
            className="inline-flex items-center gap-2 text-white mt-1 text-xs md:text-sm font-semibold underline pointer-events-auto"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
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
