import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiArrowLeft, FiCheckCircle, FiTool, FiTruck, FiDollarSign } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import Header from '../organisms/Header';

const MaquinariaSurPage = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite, cart, addToCart } = useAppContext();
  
  // Datos específicos para Maquinaria Agrícola del Sur
  const company = {
    id: 4,
    name: "Maquinaria Agrícola del Sur",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&crop=center",
    description: "Distribuidores autorizados de maquinaria agrícola y ganadera de alta calidad. Ofrecemos equipos nuevos y seminuevos con garantía para todas las necesidades del campo.",
    address: "Blvd. Belisario Domínguez 2100, Chiapas",
    phone: "+52 961 777 8899",
    whatsapp: "+52 961 777 9900",
    email: "ventas@maquinariasur.com",
    category: "Maquinaria Agrícola",
    brands: ["John Deere", "New Holland", "Case IH", "Kubota", "Massey Ferguson"],
    products: [
      {
        id: 401,
        name: "Tractor Agrícola 4x4",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
        description: "Tractor de 85 HP ideal para labranza y cultivos extensivos",
        price: 850000,
        unit: "unidad",
        rating: 4.8,
        specs: [
          "Motor diesel 4 cilindros",
          "Transmisión 12 velocidades",
          "Potencia: 85 HP",
          "Tracción 4x4",
          "Garantía: 2 años"
        ],
        financing: true
      },
      {
        id: 402,
        name: "Cosechadora de Granos",
        image: "https://images.unsplash.com/photo-1554692915-e7d7c5c7a5f9",
        description: "Cosechadora eficiente para trigo, maíz y sorgo",
        price: 2500000,
        unit: "unidad",
        rating: 4.7,
        specs: [
          "Ancho de corte: 5 metros",
          "Capacidad tolva: 4000 kg",
          "Motor: 150 HP",
          "Sistema de trilla axial",
          "Garantía: 3 años"
        ],
        financing: true
      },
      {
        id: 403,
        name: "Empacadora de Forraje",
        image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30",
        description: "Empacadora para heno y forraje con atado automático",
        price: 450000,
        unit: "unidad",
        rating: 4.6,
        specs: [
          "Producción: 100-120 pacas/hora",
          "Peso de pacas: 15-25 kg",
          "Requiere tractor de 50 HP mínimo",
          "Sistema de atado automático",
          "Garantía: 1 año"
        ],
        financing: true
      },
      {
        id: 404,
        name: "Sembradora Neumática",
        image: "https://images.unsplash.com/photo-1579165466749-5650df9a5a8c",
        description: "Sembradora precisa para siembra directa",
        price: 320000,
        unit: "unidad",
        rating: 4.5,
        specs: [
          "16 surcos a 70 cm",
          "Sistema neumático de distribución",
          "Depósito de fertilizante",
          "Monitoreo electrónico",
          "Garantía: 1 año"
        ],
        financing: true
      }
    ],
    services: [
      "Venta de maquinaria nueva y seminueva",
      "Financiamiento a medida",
      "Servicio técnico especializado",
      "Repuestos originales",
      "Capacitación en operación",
      "Transporte y logística"
    ]
  };

  // Funciones para verificar estado
  const isFavorite = (productId) => favorites.some(item => item.id === productId);
  const isInCart = (productId) => cart.some(item => item.id === productId);

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
          <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl text-white p-8 mb-8">
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
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Distribuidor autorizado</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Servicio técnico</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Financiamiento</span>
                </div>
              </div>
            </div>
          </div>

          {/* Marcas Representadas */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Marcas Representadas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {company.brands.map((brand, index) => (
                <div key={index} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-800">{brand}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestros Servicios</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.services.map((service, index) => (
                <div key={index} className="flex items-start p-4 bg-orange-50 rounded-lg">
                  <FiCheckCircle className="text-orange-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{service}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Catálogo de Maquinaria */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Catálogo de Maquinaria</h2>
              <span className="text-gray-500">{company.products.length} equipos disponibles</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {company.products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col border border-gray-200">
                  <div className="h-48 bg-gray-100 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center shadow-sm">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                    {product.financing && (
                      <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                        Financiamiento disponible
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Especificaciones técnicas:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.specs.map((spec, i) => (
                          <li key={i} className="flex items-start">
                            <FiCheckCircle className="w-3 h-3 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-orange-600">
                          ${product.price.toLocaleString()}
                          <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => addToCart(product)}
                          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                            isInCart(product.id) 
                              ? 'bg-gray-500 text-white cursor-not-allowed'
                              : 'bg-orange-600 hover:bg-orange-700 text-white'
                          }`}
                          disabled={isInCart(product.id)}
                        >
                          {isInCart(product.id) ? 'Agregado' : 'Cotizar equipo'}
                        </button>
                        <button 
                          onClick={() => toggleFavorite(product)}
                          className={`p-2 rounded-full border ${
                            isFavorite(product.id)
                              ? 'text-red-500 border-red-200 bg-red-50'
                              : 'text-gray-500 border-gray-200 hover:text-red-500 hover:border-red-200'
                          }`}
                          title={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        >
                          <svg className="w-5 h-5" fill={isFavorite(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Contacto y Financiamiento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contacto */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contacto y Ubicación</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Showroom y Taller</h3>
                    <p className="text-gray-600">{company.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiPhone className="text-orange-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Ventas</h3>
                    <a href={`tel:${company.phone}`} className="text-gray-600 hover:text-orange-600">{company.phone}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiTruck className="text-orange-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                    <a href={`https://wa.me/${company.whatsapp}`} className="text-gray-600 hover:text-orange-600">{company.whatsapp}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiMail className="text-orange-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a href={`mailto:${company.email}`} className="text-gray-600 hover:text-orange-600">{company.email}</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Financiamiento */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Opciones de Financiamiento</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-orange-50 rounded-lg">
                  <FiDollarSign className="text-orange-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Crédito Agrícola</h3>
                    <p className="text-sm text-gray-600">Hasta 5 años para tractores y maquinaria pesada con tasa preferencial</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-orange-50 rounded-lg">
                  <FiTool className="text-orange-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Renta con opción a compra</h3>
                    <p className="text-sm text-gray-600">Pruebe el equipo antes de comprar con pagos que se abonan al precio final</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-orange-50 rounded-lg">
                  <FiCheckCircle className="text-orange-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Plan de mantenimiento incluido</h3>
                    <p className="text-sm text-gray-600">Con financiamiento aprobado, recibe 2 años de mantenimiento preventivo</p>
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

export default MaquinariaSurPage;