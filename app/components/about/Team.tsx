import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface TeamMember {
  id: number;
  name: string;
  lastName: string;
  role: string;
  image: string;
}

const Team = () => {
  const teamMembers: TeamMember[] = [
    { id: 1, name: 'JUAN CARLOS', lastName: 'MARTÍNEZ TEJADA', role: 'ARQUITECTO CO-FUNDADOR', image: '/team/member-3.webp' },
    { id: 2, name: 'JUAN CARLOS', lastName: 'MARTÍNEZ GUZMÁN', role: 'ARQUITECTO FUNDADOR', image: '/team/member-2.webp' },
    { id: 3, name: 'CARLO ESTEBAN', lastName: 'MARTÍNEZ TEJADA', role: 'ARQUITECTO CO-FUNDADOR', image: '/team/member-1.webp' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative bg-neutral-900 py-20">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-white">
            NUESTRO EQUIPO
          </h2>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 max-w-6xl mx-auto"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              className="group relative bg-white overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={`${member.name} ${member.lastName}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay con efecto hover */}
                <motion.div
                  className="absolute inset-0 bg-black/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Info Container con animación hover */}
              <motion.div
                className="relative bg-white p-6 text-center"
                whileHover={{
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Nombre */}
                <motion.h3
                  className="text-xl font-semibold text-gray-900 mb-1 tracking-wider"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {member.name}
                </motion.h3>
                <motion.h4
                  className="text-xl font-semibold text-gray-900 mb-3 tracking-wider"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {member.lastName}
                </motion.h4>

                {/* Línea decorativa */}
                <motion.div
                  className="w-12 h-0.5 bg-orange-500 mx-auto mb-3"
                  whileHover={{ width: '3rem' }}
                  transition={{ duration: 0.3 }}
                />

                {/* Rol */}
                <motion.p
                  className="text-sm font-medium text-gray-600 uppercase tracking-widest"
                  whileHover={{ color: '#ea580c', scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {member.role}
                </motion.p>

                {/* Efecto de borde animado */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent"
                  whileHover={{ borderColor: '#ea580c', scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
