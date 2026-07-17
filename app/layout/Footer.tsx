import { useState } from 'react';
import { FaFacebookF, FaPinterestP, FaInstagram } from 'react-icons/fa';
import Modal from '../components/ui/Modal';
import PrivacyPolicy from '../components/ui/PrivacyPolicy';
import TermsConditions from '../components/ui/TermsConditions';

const Footer = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-black text-white">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-4"><img src="/navbar_logo.png" alt="Logo" className="w-auto h-20" /></h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Ofrecemos una gama completa de diseño arquitectónico
              </p>
            </div>

            {/* Menu */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold mb-6">Menú</h3>
              <ul className="space-y-4">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">INICIO</a></li>
                <li><a href="/nosotros" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">NOSOTROS</a></li>
                <li><a href="/servicios" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">SERVICIOS</a></li>
                <li><a href="/proyectos" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">PROYECTOS</a></li>
                <li><a href="/contacto" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">CONTACTO</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold mb-6">Contáctanos</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-1">Dirección:</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Volcan%20%23110%2C%20Jardines%20del%20Moral%20Le%C3%B3n%2C%20Guanajuato"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Volcan #110, Jardines del Moral León, Guanajuato
                  </a>
                </div>
                <div>
                  <p className="font-medium mb-1">Teléfono:</p>
                  <a
                    href="tel:+524773925249"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    +52 477 392 5249
                  </a>
                </div>
                <div>
                  <p className="font-medium mb-1">Email:</p>
                  <a
                    href="mailto:dirección@mt3arquitectos.com.mx"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    dirección@mt3arquitectos.com.mx
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold mb-6">Síguenos</h3>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a href="https://www.facebook.com/MT3arquitectos" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300">
                  <FaFacebookF className="w-5 h-5" />
                </a>

                {/* Pinterest */}
                <a href="https://mx.pinterest.com/mt3arquitectos/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300">
                  <FaPinterestP className="w-5 h-5" />
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/mt3arquitectos/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300">
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 MT3. Todos los Derechos reservados
            </p>
            <p className="text-gray-400 text-sm text-center">
              Designed and developed by{' '}
              <a
                href="https://www.instagram.com/sinfin.cc/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                SINFIN CC
              </a>
              {' '}and{' '}
              <a
                href="https://www.audently.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Darío Defossé
              </a>
            </p>
            <div className="flex space-x-6">
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300 cursor-pointer"
              >
                Políticas de Privacidad
              </button>
              <button
                onClick={() => setIsTermsModalOpen(true)}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300 cursor-pointer"
              >
                Términos y condiciones
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title="Políticas de Privacidad"
      >
        <PrivacyPolicy />
      </Modal>

      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="Términos y Condiciones"
      >
        <TermsConditions />
      </Modal>
    </>
  );
};

export default Footer;
