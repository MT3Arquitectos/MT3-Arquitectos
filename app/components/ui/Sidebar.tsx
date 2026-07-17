import type { ReactNode } from 'react';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';

interface SocialLink {
  name: string;
  url: string;
  icon: ReactNode;
}

const Sidebar = () => {
  const socialLinks: SocialLink[] = [
    { name: 'Facebook', url: 'https://www.facebook.com/MT3arquitectos', icon: <FaFacebookF className="w-5 h-5" /> },
    { name: 'Instagram', url: 'https://www.instagram.com/mt3arquitectos/', icon: <FaInstagram className="w-5 h-5" /> },
    { name: 'Pinterest', url: 'https://mx.pinterest.com/mt3arquitectos/', icon: <FaPinterestP className="w-5 h-5" /> },
  ];

  return (
    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
      <div className="flex flex-col space-y-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-10 h-10
                     bg-white/10 backdrop-blur-sm border border-white/20
                     rounded-full transition-all duration-300 ease-in-out
                     hover:bg-white hover:scale-110 hover:shadow-lg"
            aria-label={social.name}
          >
            <div className="text-white group-hover:text-gray-800 transition-colors duration-300">
              {social.icon}
            </div>

            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-2 py-1 bg-white text-gray-800
                          text-sm rounded opacity-0 group-hover:opacity-100
                          transition-opacity duration-300 whitespace-nowrap
                          shadow-lg border border-gray-200">
              {social.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
