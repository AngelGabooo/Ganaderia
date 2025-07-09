import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiMail, FiPhone, FiMapPin, FiMessageSquare, FiUser, FiAlertCircle, 
  FiUsers, FiAward, FiTrendingUp, FiAlertTriangle, FiX 
} from 'react-icons/fi';
import emailjs from '@emailjs/browser'; // Importa EmailJS
import Header from '../organisms/Header';

const ContactPage = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false); // Estado para errores
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Nombre es requerido';
    if (!formData.email.trim()) {
      errors.email = 'Email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email no válido';
    }
    if (!formData.message.trim()) errors.message = 'Mensaje es requerido';
    return errors;
  };

  const handleSubmit = async (e) => { // Cambiado a async para manejar múltiples promesas
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setSubmitSuccess(false);
      setSubmitError(false);

      const serviceID = 'service_0rn985g';
      const publicKey = '_kQWxzXTDMi33BzgE';

      // --- 🚨 Plantillas EmailJS 🚨 ---
      const templateID_empresa = 'template_hih9zfk'; // Para tu correo personal
      const templateID_cliente = 'template_dzjtcnq'; // Para el correo del cliente (ASEGÚRATE DE CREAR ESTA PLANTILLA EN EMAILJS)

      try {
        // Envío 1: Correo a la empresa (con los datos del formulario)
        await emailjs.send(serviceID, templateID_empresa, formData, publicKey);
        console.log('CORREO A EMPRESA ENVIADO!');

        // Envío 2: Correo de agradecimiento al cliente
        await emailjs.send(serviceID, templateID_cliente, formData, publicKey);
        console.log('CORREO DE AGRADECIMIENTO A CLIENTE ENVIADO!');
        
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' }); // Limpia el formulario
      } catch (err) {
        console.error('FALLO EL ENVÍO DE CORREOS...', err);
        setSubmitError(true);
      } finally {
        setIsSubmitting(false);
        // Oculta los mensajes después de 5 segundos
        setTimeout(() => {
          setSubmitSuccess(false);
          setSubmitError(false);
        }, 5000);
      }
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/528144384806`, '_blank');
  };

  const handleProducerRegister = () => {
    setShowModal(true);
  };

  const handleModalAccept = () => {
    setShowModal(false);
    navigate('/login');
  };

  const producersByRegion = [
    {
      region: 'Tapachula',
      description: 'Zona con alta producción ganadera y agrícola, conocida por su clima tropical ideal para ganado.',
      topProducers: [
        { name: 'Rancho Santa Fe', activity: 'Ganado bovino y cultivo de pastos', rating: 4.8 },
        { name: 'Granja Los Álamos', activity: 'Producción lechera especializada', rating: 4.7 },
        { name: 'Hacienda La Esperanza', activity: 'Doble propósito (carne y leche)', rating: 4.5 }
      ]
    },
    {
      region: 'Pijijiapan',
      description: 'Región costera con importante tradición ganadera y producción de quesos artesanales.',
      topProducers: [
        { name: 'Rancho San José', activity: 'Ganado de engorda', rating: 4.6 },
        { name: 'Establo La Perla', activity: 'Producción de queso fresco', rating: 4.4 },
        { name: 'Campo Verde', activity: 'Agricultura y ganadería integrada', rating: 4.3 }
      ]
    },
    {
      region: 'Acapetahua',
      description: 'Área con vocación ganadera y producción de alimentos balanceados.',
      topProducers: [
        { name: 'Rancho El Edén', activity: 'Ganado Brahman de alta calidad', rating: 4.9 },
        { name: 'Granja Don Carlos', activity: 'Cría y levante de becerros', rating: 4.5 },
        { name: 'Hacienda La Florida', activity: 'Sistema silvopastoril', rating: 4.4 }
      ]
    },
    {
      region: 'Mapastepec',
      description: 'Zona con producción ganadera sostenible y prácticas innovadoras.',
      topProducers: [
        { name: 'Rancho Los Pinos', activity: 'Ganado ecológico certificado', rating: 4.7 },
        { name: 'Estancia La Paz', activity: 'Mejoramiento genético', rating: 4.6 },
        { name: 'Campo Alegre', activity: 'Producción orgánica', rating: 4.5 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">Contáctanos</h1>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Información de la empresa */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-green-700 mb-6">Sobre Nosotros</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FiUser className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Quiénes Somos</h3>
                    <p className="text-gray-600">
                      Somos una plataforma innovadora diseñada para conectar y apoyar a los ganaderos de la costa de Chiapas. 
                      Como empresa nueva, nos enfocamos en facilitar el comercio de productos ganaderos y ofrecer herramientas 
                      para mejorar la productividad del sector.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FiAlertCircle className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Nuestros Servicios</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                      <li>Conectar productores con compradores</li>
                      <li>Información de mercados y precios</li>
                      <li>Asesoría técnica para ganaderos</li>
                      <li>Plataforma digital para gestión ganadera</li>
                      <li>Apoyo a productores locales</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FiMapPin className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ubicación</h3>
                    <p className="text-gray-600">
                      Trabajamos principalmente en la región costera de Chiapas, incluyendo Tapachula, Pijijiapan, 
                      Acapetahua y Mapastepec, donde se concentran algunos de los productores más activos del estado.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contáctanos directamente</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiPhone className="text-green-600 mr-3" />
                    <a href="tel:8144384806" className="text-gray-600 hover:text-green-600 transition-colors">
                      +52 814 438 4806
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <FiMail className="text-green-600 mr-3" />
                    <a href="mailto:contacto@agrochiopas.com" className="text-gray-600 hover:text-green-600 transition-colors">
                      contacto@agrochiopas.com
                    </a>
                  </div>
                  
                  <button 
                    onClick={openWhatsApp}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4"
                  >
                    <FiMessageSquare className="mr-2" />
                    Chatear por WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-green-700 mb-6">Envíanos un mensaje</h2>
              
              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
                </div>
              )}
              
              {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos por otro medio.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tu nombre"
                  />
                  {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="tu@email.com"
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="+52 81 1234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="¿Cómo podemos ayudarte?"
                  ></textarea>
                  {formErrors.message && <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Mapa de ubicación */}
          <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Nuestra Ubicación</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.926165750381!2d-100.318454!3d25.672545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQwJzIxLjIiTiAxMDDCsDE5JzA2LjQiVw!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Ubicación de AgroChiapas"
              ></iframe>
            </div>
          </div>

          {/* Sección de productores destacados */}
          <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Productores Destacados en la Costa de Chiapas</h2>
            
            <div className="mb-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700 mb-4">Sobre nuestra plataforma</h3>
              <p className="text-gray-700 mb-4">
                Somos una empresa nueva con una plataforma innovadora diseñada para ayudar a los ganaderos de la región 
                a conectarse con compradores, acceder a mejores precios y optimizar sus procesos productivos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <FiUsers className="text-green-600 text-2xl mr-3" />
                  <span className="text-gray-700">+150 ganaderos registrados</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <FiTrendingUp className="text-green-600 text-2xl mr-3" />
                  <span className="text-gray-700">Mejores precios de mercado</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <FiAward className="text-green-600 text-2xl mr-3" />
                  <span className="text-gray-700">Productores certificados</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {producersByRegion.map((region, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-green-600 p-4 text-white font-semibold flex items-center">
                    <FiMapPin className="mr-2" />
                    {region.region}
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-4">{region.description}</p>
                    <h4 className="font-medium text-gray-800 mb-3">Productores destacados:</h4>
                    <ul className="space-y-3">
                      {region.topProducers.map((producer, idx) => (
                        <li key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2">
                          <div>
                            <p className="font-medium">{producer.name}</p>
                            <p className="text-sm text-gray-500">{producer.activity}</p>
                          </div>
                          <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                            <span className="text-green-700 font-medium">{producer.rating}</span>
                            <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">¿Eres ganadero en la región?</h3>
              <p className="text-gray-700 mb-4">
                Únete a nuestra plataforma y accede a beneficios exclusivos para productores:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                <li>Mayor visibilidad para tu producción</li>
                <li>Acceso a compradores verificados</li>
                <li>Información de mercados y precios</li>
                <li>Asesoría técnica especializada</li>
              </ul>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                onClick={handleProducerRegister}
              >
                Regístrate como productor
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE ALERTA */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
            >
              <FiX size={20} />
            </button>
            <div className="flex flex-col items-center">
              <FiAlertTriangle className="text-yellow-500 text-4xl mb-3" />
              <h2 className="text-lg font-semibold mb-2 text-gray-800">¡Atención!</h2>
              <p className="text-gray-600 mb-6">
                Debes iniciar sesión para registrarte como productor.
              </p>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                onClick={handleModalAccept}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;