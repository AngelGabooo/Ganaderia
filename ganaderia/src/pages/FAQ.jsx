import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiHelpCircle, FiFileText, FiTruck, FiDollarSign, FiUserCheck, FiShield, FiMessageSquare } from 'react-icons/fi';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const FAQ = () => {
  // Categorías de preguntas frecuentes
  const faqCategories = [
    {
      id: 'general',
      name: 'General',
      icon: <FiHelpCircle className="text-brown-tierra text-xl" />
    },
    {
      id: 'documentacion',
      name: 'Documentación',
      icon: <FiFileText className="text-brown-tierra text-xl" />
    },
    {
      id: 'envios',
      name: 'Envíos y Logística',
      icon: <FiTruck className="text-brown-tierra text-xl" />
    },
    {
      id: 'pagos',
      name: 'Pagos y Facturación',
      icon: <FiDollarSign className="text-brown-tierra text-xl" />
    },
    {
      id: 'productores',
      name: 'Para Productores',
      icon: <FiUserCheck className="text-brown-tierra text-xl" />
    },
    {
      id: 'seguridad',
      name: 'Seguridad y Garantías',
      icon: <FiShield className="text-brown-tierra text-xl" />
    }
  ];

  // Preguntas frecuentes por categoría
  const faqItems = {
    general: [
      {
        question: '¿Qué es AgroChiapas?',
        answer: 'AgroChiapas es una plataforma digital especializada en conectar a productores ganaderos con compradores, ofreciendo herramientas para mejorar la productividad y comercialización de productos ganaderos en la región.'
      },
      {
        question: '¿Cómo puedo registrarme en la plataforma?',
        answer: 'Puedes registrarte haciendo clic en "Registrarse" en la esquina superior derecha de nuestro sitio web y completando el formulario con tus datos básicos. El proceso es gratuito y toma menos de 5 minutos.'
      },
      {
        question: '¿La plataforma tiene algún costo?',
        answer: 'El registro básico es completamente gratuito. Ofrecemos planes premium con funcionalidades adicionales para aquellos productores que necesiten más herramientas y visibilidad.'
      }
    ],
    documentacion: [
      {
        question: '¿Qué documentos necesito para vender en AgroChiapas?',
        answer: 'Para productores: Identificación oficial, comprobante de domicilio y documentación que acredite la propiedad o uso legal del terreno. Para compradores: Identificación oficial y comprobante de domicilio.'
      },
      {
        question: '¿Cómo verifican a los productores?',
        answer: 'Realizamos visitas técnicas a las unidades de producción y validamos la documentación proporcionada para garantizar la autenticidad de los productores registrados.'
      }
    ],
    envios: [
      {
        question: '¿Cómo se manejan los envíos de ganado?',
        answer: 'Los envíos se coordinan directamente entre comprador y vendedor. AgroChiapas ofrece una red de transportistas verificados que pueden be contratados para este servicio.'
      },
      {
        question: '¿Qué zonas cubren actualmente?',
        answer: 'Actualmente operamos en toda la región de Chiapas, con especial cobertura en la zona costera (Tapachula, Pijijiapan, Acapetahua, Mapastepec).'
      }
    ],
    pagos: [
      {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos transferencias bancarias, depósitos en efectivo y próximamente integraremos pagos con tarjeta de crédito/débito a través de nuestra plataforma segura.'
      },
      {
        question: '¿Cómo garantizan la seguridad de las transacciones?',
        answer: 'Todas las transacciones pasan por nuestro sistema de custodia de pagos, que libera los fondos al vendedor solo cuando el comprador confirma la recepción satisfactoria del producto.'
      }
    ],
    productores: [
      {
        question: '¿Cómo beneficia AgroChiapas a los productores?',
        answer: 'Ofrecemos a los productores acceso a mejores precios, reducción de intermediarios, herramientas de gestión ganadera, asesoría técnica y visibilidad en nuevos mercados.'
      },
      {
        question: '¿Puedo promocionar mis productos en la plataforma?',
        answer: 'Sí, los productores registrados pueden crear perfiles completos de sus unidades de producción y listar sus productos con fotos, descripciones y precios.'
      }
    ],
    seguridad: [
      {
        question: '¿Qué garantías ofrecen a los compradores?',
        answer: 'Garantizamos que todos los productores en nuestra plataforma están verificados y que los productos cumplen con las descripciones publicadas. Ofrecemos mediación en caso de disputas.'
      },
      {
        question: '¿Mis datos personales están protegidos?',
        answer: 'Sí, cumplimos con todas las regulaciones de protección de datos personales. Tu información nunca será compartida con terceros sin tu consentimiento explícito.'
      }
    ]
  };

  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Configuración de colores personalizados */}
      <style jsx global>{`
        :root {
          --brown-tierra: #8B5E3C;
          --brown-tierra-dark: #A9745B;
        }
        
        .bg-brown-tierra { background-color: var(--brown-tierra); }
        .bg-brown-tierra-dark { background-color: var(--brown-tierra-dark); }
        .from-brown-tierra { --tw-gradient-from: var(--brown-tierra); }
        .to-brown-tierra-dark { --tw-gradient-to: var(--brown-tierra-dark); }
        .text-brown-tierra { color: var(--brown-tierra); }
        .border-brown-tierra { border-color: var(--brown-tierra); }
      `}</style>

      <Header />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-brown-tierra mb-4">Preguntas Frecuentes</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra respuestas a las dudas más comunes sobre nuestra plataforma ganadera.
            </p>
            <div className="w-24 h-1 bg-brown-tierra mx-auto rounded-full mt-6"></div>
          </div>

          {/* Categorías */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Explora por categorías</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {faqCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${activeCategory === category.id ? 'bg-brown-tierra/10 border-2 border-brown-tierra' : 'bg-white border border-gray-200 hover:border-brown-tierra-dark'}`}
                >
                  <div className="mb-2">{category.icon}</div>
                  <span className="font-medium text-gray-800">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preguntas y respuestas */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 bg-brown-tierra">
              <h2 className="text-xl font-bold text-white">
                {faqCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {faqItems[activeCategory].map((item, index) => (
                <div key={index} className="p-6">
                  <button
                    onClick={() => toggleItem(`${activeCategory}-${index}`)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-lg font-medium text-gray-800">{item.question}</h3>
                    {openItems[`${activeCategory}-${index}`] ? (
                      <FiChevronUp className="text-brown-tierra text-xl" />
                    ) : (
                      <FiChevronDown className="text-brown-tierra text-xl" />
                    )}
                  </button>
                  
                  {openItems[`${activeCategory}-${index}`] && (
                    <div className="mt-4 text-gray-600 pl-2">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sección de ayuda adicional */}
          <div className=" bg-brown-tierra-dark mt-16 bg-gradient-to-r from-brown-tierra to-brown-tierra-dark rounded-xl p-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className=" text-2xl md:text-3xl font-bold mb-4">¿No encontraste lo que buscabas?</h2>
              <p className="text-lg mb-6">
                Nuestro equipo de atención al ganadero está listo para ayudarte con cualquier duda o consulta que tengas.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/contactos"
                  className="bg-white text-brown-tierra hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Contáctanos
                </a>
                <a
                  href="https://wa.me/528144384806"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brown-tierra-dark hover:bg-brown-tierra font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <FiMessageSquare className="mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;