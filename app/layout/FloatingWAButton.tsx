import { FaWhatsapp } from 'react-icons/fa';

const FloatingWAButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '524773925249';
    const message = encodeURIComponent(
      'Hola, me gustaría obtener más información sobre sus servicios de arquitectura.'
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all duration-300 ease-in-out group cursor-pointer"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7 text-green-500 group-hover:text-green-600 transition-colors duration-300" />
    </button>
  );
};

export default FloatingWAButton;
