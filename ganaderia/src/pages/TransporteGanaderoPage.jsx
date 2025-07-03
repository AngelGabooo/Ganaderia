import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiArrowLeft, FiCheckCircle, FiTruck, FiClock, FiShield, FiUsers, FiNavigation } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import Header from '../organisms/Header';

const TransporteGanaderoPage = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite, cart, addToCart } = useAppContext();
  
  // Datos específicos para Transporte Ganadero
  const company = {
    id: 6,
    name: "Transporte Ganadero",
    logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&crop=center",
    description: "Empresa especializada en logística y transporte de ganado con más de 15 años de experiencia. Contamos con unidades especializadas, personal capacitado y seguros de carga para garantizar el bienestar animal durante el traslado.",
    address: "Calle Transportista 89, Arriaga",
    phone: "+52 966 456 3210",
    whatsapp: "+52 966 456 3211",
    email: "servicios@transporteganadero.com",
    category: "Logística",
    certifications: ["SAGARPA", "SENASICA", "PROFEPA", "SCT", "SEMARNAT"],
    services: [
      {
        id: 601,
        name: "Transporte de Ganado Bovino",
        image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a",
        description: "Traslado especializado de ganado bovino con unidades acondicionadas",
        price: 12,
        unit: "por cabeza/km",
        rating: 4.9,
        specs: [
          "Capacidad: 25-30 cabezas",
          "Unidades climatizadas",
          "Personal especializado",
          "Seguro de carga incluido",
          "Certificación sanitaria"
        ],
        urgent: true
      },
      {
        id: 602,
        name: "Transporte de Porcinos",
        image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a",
        description: "Logística para cerdos con sistemas de ventilación adecuados",
        price: 8,
        unit: "por cabeza/km",
        rating: 4.8,
        specs: [
          "Capacidad: 40-50 cerdos",
          "Sistema de ventilación",
          "Pisos antideslizantes",
          "Manejo de bioseguridad",
          "Documentación completa"
        ],
        urgent: false
      },
      {
        id: 603,
        name: "Transporte de Ovinos/Caprinos",
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7",
        description: "Servicio especializado para ovinos y caprinos",
        price: 6,
        unit: "por cabeza/km",
        rating: 4.7,
        specs: [
          "Capacidad: 60-80 cabezas",
          "Separadores ajustables",
          "Ventilación natural",
          "Manejo suave",
          "Rutas optimizadas"
        ],
        urgent: false
      },
      {
        id: 604,
        name: "Transporte de Aves",
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7",
        description: "Logística para aves de corral y reproductoras",
        price: 0.5,
        unit: "por ave/km",
        rating: 4.6,
        specs: [
          "Jaulas especializadas",
          "Control de temperatura",
          "Manejo sanitario",
          "Transporte nocturno",
          "Certificación SENASICA"
        ],
        urgent: false
      },
      {
        id: 605,
        name: "Transporte de Emergencia",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
        description: "Servicio urgente 24/7 para situaciones especiales",
        price: 20,
        unit: "por cabeza/km",
        rating: 4.9,
        specs: [
          "Disponibilidad 24/7",
          "Tiempo de respuesta: 2 horas",
          "Veterinario a bordo",
          "Unidades de emergencia",
          "Comunicación constante"
        ],
        urgent: true
      },
      {
        id: 606,
        name: "Logística Completa",
        image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a",
        description: "Servicio integral desde origen hasta destino",
        price: 150,
        unit: "por servicio/km",
        rating: 4.8,
        specs: [
          "Carga y descarga incluida",
          "Documentación completa",
          "Seguimiento GPS",
          "Coordinación con autoridades",
          "Reportes detallados"
        ],
        urgent: false
      }
    ],
    features: [
      "Flota de 25 unidades especializadas",
      "Personal certificado en bienestar animal",
      "Seguros de carga y responsabilidad civil",
      "Seguimiento GPS en tiempo real",
      "Documentación sanitaria completa",
      "Servicio 24/7 los 365 días del año"
    ]
  };

  // Funciones para verificar estado
  const isFavorite = (serviceId) => favorites.some(item => item.id === serviceId);
  const isInCart = (serviceId) => cart.some(item => item.id === serviceId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header withCartIcon withFavoritesIcon />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/empresas" 
            className="flex items-center text-green-600 mb-6 hover:text-green-800"
          >
            <FiArrowLeft className="mr-2" /> Volver a empresas
          </Link>
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
                <div className="w-40 h-40 rounded-full bg-white/20 flex items-center justify-center p-2">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
              <div className="md:w-3/4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{company.name}</h1>
                <p className="text-lg mb-4">{company.description}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Servicio 24/7</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Seguros incluidos</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Seguimiento GPS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificaciones */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Certificaciones y Permisos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {company.certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-800">{cert}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Características Principales */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Por Qué Elegirnos?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.features.map((feature, index) => (
                <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                  <FiCheckCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Servicios de Transporte */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Servicios de Transporte</h2>
              <span className="text-gray-500">{company.services.length} servicios disponibles</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.services.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col border border-gray-200">
                  <div className="h-48 bg-gray-100 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center shadow-sm">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-medium">{service.rating}</span>
                    </div>
                    {service.urgent && (
                      <div className="absolute bottom-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                        Servicio urgente
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Características del servicio:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.specs.map((spec, i) => (
                          <li key={i} className="flex items-start">
                            <FiCheckCircle className="w-3 h-3 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-blue-600">
                          ${service.price.toLocaleString()}
                          <span className="text-sm text-gray-500 ml-1">{service.unit}</span>
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => addToCart(service)}
                          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                            isInCart(service.id) 
                              ? 'bg-gray-500 text-white cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                          disabled={isInCart(service.id)}
                        >
                          {isInCart(service.id) ? 'Agregado' : 'Solicitar servicio'}
                        </button>
                        <button 
                          onClick={() => toggleFavorite(service)}
                          className={`p-2 rounded-full border ${
                            isFavorite(service.id)
                              ? 'text-red-500 border-red-200 bg-red-50'
                              : 'text-gray-500 border-gray-200 hover:text-red-500 hover:border-red-200'
                          }`}
                          title={isFavorite(service.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        >
                          <svg className="w-5 h-5" fill={isFavorite(service.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacto y Ventajas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contacto */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contacto y Ubicación</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Terminal de Transportes</h3>
                    <p className="text-gray-600">{company.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiPhone className="text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Central de Servicios</h3>
                    <a href={`tel:${company.phone}`} className="text-gray-600 hover:text-blue-600">{company.phone}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiTruck className="text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                    <a href={`https://wa.me/${company.whatsapp}`} className="text-gray-600 hover:text-blue-600">{company.whatsapp}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiMail className="text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a href={`mailto:${company.email}`} className="text-gray-600 hover:text-blue-600">{company.email}</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ventajas del Servicio */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Ventajas de Nuestro Servicio</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                  <FiClock className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Puntualidad Garantizada</h3>
                    <p className="text-sm text-gray-600">Cumplimos con los horarios acordados y mantenemos comunicación constante</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                  <FiShield className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Bienestar Animal</h3>
                    <p className="text-sm text-gray-600">Personal capacitado y unidades diseñadas para el cuidado de los animales</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                  <FiNavigation className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Seguimiento GPS</h3>
                    <p className="text-sm text-gray-600">Monitoreo en tiempo real de tu carga con reportes de ubicación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransporteGanaderoPage;