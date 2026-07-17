const PrivacyPolicy = () => {
  return (
    <div className="prose prose-gray max-w-none">
      <div className="space-y-6 text-gray-700">
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">1. Información General</h3>
          <p className="leading-relaxed">
            En MT3 Arquitectos, nos comprometemos a proteger la privacidad de nuestros clientes y visitantes del sitio web. 
            Esta Política de Privacidad describe cómo recopilamos, usamos, compartimos y protegemos su información personal.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">2. Información que Recopilamos</h3>
          <p className="leading-relaxed mb-3">Podemos recopilar los siguientes tipos de información:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Información de contacto (nombre, correo electrónico, número de teléfono, dirección)</li>
            <li>Información sobre proyectos y preferencias de diseño</li>
            <li>Información de navegación y uso del sitio web</li>
            <li>Comunicaciones que nos envíe</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">3. Uso de la Información</h3>
          <p className="leading-relaxed mb-3">Utilizamos su información para:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Proporcionar y mejorar nuestros servicios de arquitectura</li>
            <li>Responder a sus consultas y comunicarnos con usted</li>
            <li>Desarrollar propuestas y proyectos personalizados</li>
            <li>Enviar información relevante sobre nuestros servicios</li>
            <li>Cumplir con obligaciones legales y regulatorias</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">4. Compartir Información</h3>
          <p className="leading-relaxed">
            No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario 
            para proporcionar nuestros servicios (como contratistas o consultores especializados) o cuando lo requiera la ley.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">5. Seguridad de la Información</h3>
          <p className="leading-relaxed">
            Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal 
            contra acceso no autorizado, alteración, divulgación o destrucción.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">6. Cookies y Tecnologías Similares</h3>
          <p className="leading-relaxed">
            Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar su experiencia de navegación, 
            analizar el tráfico del sitio y personalizar el contenido. Puede configurar su navegador para rechazar cookies, 
            aunque esto puede afectar algunas funcionalidades del sitio.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">7. Sus Derechos</h3>
          <p className="leading-relaxed mb-3">Usted tiene derecho a:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Acceder a su información personal</li>
            <li>Solicitar la corrección de información inexacta</li>
            <li>Solicitar la eliminación de su información</li>
            <li>Oponerse al procesamiento de su información</li>
            <li>Retirar su consentimiento en cualquier momento</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">8. Retención de Datos</h3>
          <p className="leading-relaxed">
            Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos descritos 
            en esta política, a menos que la ley requiera o permita un período de retención más largo.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">9. Cambios a esta Política</h3>
          <p className="leading-relaxed">
            Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios significativos 
            publicando la nueva política en nuestro sitio web con una fecha de actualización revisada.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-3">10. Contacto</h3>
          <p className="leading-relaxed mb-2">
            Si tiene preguntas sobre esta Política de Privacidad o sobre cómo manejamos su información personal, 
            puede contactarnos:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
            <p><strong>Correo electrónico:</strong> arquitectosmt3@gmail.com</p>
            <p><strong>Teléfono:</strong> +52 477 392 5249</p>
            <p><strong>Dirección:</strong> Volcan #110, Jardines del Moral, León, Guanajuato</p>
          </div>
        </section>

        <section className="mt-8 pt-6 border-t border-gray-300">
          <p className="text-sm text-gray-600 italic">
            Última actualización: Octubre 2025
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


