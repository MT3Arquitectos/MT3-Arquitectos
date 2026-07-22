import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import type { IconType } from 'react-icons';
import { FiHome, FiUser, FiBriefcase, FiFileText, FiMenu, FiX } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaPinterestP, FaTiktok } from 'react-icons/fa';

export interface NavItem {
  name: string;
  url: string;
  icon: IconType;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export function NavBar({ items, className = '' }: NavBarProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Sincronizar activeTab con la ruta actual
  useEffect(() => {
    const currentItem = items.find((item) => item.url === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location.pathname, items]);

  // Cerrar menú al cambiar el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Control de visibilidad del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Cerrar menú al hacer clic en un enlace
  const handleLinkClick = (name: string) => {
    setActiveTab(name);
    setIsMobileMenuOpen(false);
  };

  // Redes sociales
  const socialLinks: SocialLink[] = [
    { name: 'Facebook', url: 'https://facebook.com', icon: <FaFacebookF className="w-4 h-4" /> },
    { name: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram className="w-4 h-4" /> },
    { name: 'Pinterest', url: 'https://pinterest.com', icon: <FaPinterestP className="w-4 h-4" /> },
    { name: 'TikTok', url: 'https://tiktok.com', icon: <FaTiktok className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Desktop Logo */}
      <div className={`fixed top-0 py-6 left-10 z-50 hidden lg:block transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <Link to="/" className="flex items-center">
          <img
            src="/navbar_logo.png"
            alt="MT3 Logo"
            className="h-20 w-auto bg-slate-500/20 rounded-lg p-2 backdrop-blur-lg shadow-lg hover:scale-105 transition-all duration-300"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 hidden lg:block transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${className}`}>
        <div className="flex items-center gap-3 bg-white border border-gray-200 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
          {items.map(({ name, url }) => {
            const isActive = activeTab === name;
            return (
              <Link
                key={name}
                to={url}
                prefetch="intent"
                onClick={() => setActiveTab(name)}
                className={`
                  relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors
                  text-gray-700 hover:text-slate-400
                  ${isActive ? 'bg-gray-200 text-amber-500' : ''}
                `}
              >
                <span>{name}</span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-slate-500/5 rounded-full -z-10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                      <div className="absolute w-12 h-6 bg-white rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Logo */}
      <div className={`fixed top-5 left-5 z-50 lg:hidden transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-20'}`}>
        <Link to="/" className="flex items-center">
          <img
            src="/navbar_logo.png"
            alt="MT3 Logo"
            className="h-14 w-auto bg-slate-500/20 rounded-lg p-2 shadow-lg hover:scale-105 transition-all duration-300"
          />
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <div className={`fixed top-5 right-5 z-50 lg:hidden transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-20'}`}>
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white border border-gray-200 backdrop-blur-lg p-3 rounded-full shadow-lg text-gray-700 hover:text-amber-500 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-lg border-l border-gray-200 shadow-xl z-50 lg:hidden"
          >
            <div className="p-6 pt-20 h-full flex flex-col">
              {/* Navigation Links */}
              <nav className="space-y-2">
                {items.map(({ name, url, icon: Icon }) => {
                  const isActive = activeTab === name;
                  return (
                    <Link
                      key={name}
                      to={url}
                      prefetch="intent"
                      onClick={() => handleLinkClick(name)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                        text-gray-700 hover:bg-gray-100 hover:text-amber-500
                        ${isActive ? 'bg-amber-50 text-amber-500 font-semibold' : ''}
                      `}
                    >
                      <Icon size={20} />
                      <span className="text-base">{name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="mobile-active"
                          className="ml-auto w-2 h-2 bg-amber-500 rounded-full"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Social Media Links */}
              <div className="mt-auto mb-6">
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                    Síguenos
                  </h3>
                  <div className="flex justify-center gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center w-10 h-10
                                 bg-gray-100 rounded-full transition-all duration-300 ease-in-out
                                 hover:bg-amber-500 hover:scale-110 hover:shadow-lg"
                        aria-label={social.name}
                      >
                        <div className="text-gray-600 group-hover:text-white transition-colors duration-300">
                          {social.icon}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function NavBarDemo() {
  const navItems: NavItem[] = [
    { name: 'Inicio', url: '/', icon: FiHome },
    { name: 'Nosotros', url: '/nosotros', icon: FiUser },
    { name: 'Servicios', url: '/servicios', icon: FiBriefcase },
    { name: 'Proyectos', url: '/proyectos', icon: FiBriefcase },
    { name: 'Contacto', url: '/contacto', icon: FiFileText },
  ];

  return <NavBar items={navItems} />;
}

export default NavBar;
