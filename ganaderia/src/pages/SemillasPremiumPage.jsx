import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiArrowLeft, FiCheckCircle, FiSun, FiDroplet, FiTrendingUp } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import Header from '../organisms/Header';

const SemillasPremiumPage = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite, cart, addToCart } = useAppContext();
  
  // Datos específicos para Semillas Premium
  const company = {
    id: 5,
    name: "Semillas Premium",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop&crop=center",
    description: "Distribuidores especializados en semillas de alta calidad para cultivos comerciales y de subsistencia. Ofrecemos variedades certificadas con garantía de germinación y adaptadas al clima de Chiapas.",
    address: "Av. Agricultura 456, Cintalapa",
    phone: "+52 968 123 7890",
    whatsapp: "+52 968 123 7891",
    email: "contacto@semillaspremium.com",
    category: "Agricultura",
    brands: ["Pioneer", "Monsanto", "Syngenta", "Bayer", "Dow AgroSciences"],
    products: [
      {
        id: 501,
        name: "Semilla de Maíz Híbrido",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
        description: "Semilla híbrida de alto rendimiento para clima tropical",
        price: 2500,
        unit: "kg (20 kg)",
        rating: 4.9,
        specs: [
          "Germinación: 95% garantizada",
          "Ciclo: 110-120 días",
          "Rendimiento: 8-10 ton/ha",
          "Resistente a sequía",
          "Certificación SENASICA"
        ],
        seasonal: true
      },
      {
        id: 502,
        name: "Semilla de Frijol Negro",
        image: "https://images.unsplash.com/photo-1518978138681-1febf5dc8036",
        description: "Variedad mejorada de frijol negro con alta proteína",
        price: 180,
        unit: "kg",
        rating: 4.7,
        specs: [
          "Germinación: 90% garantizada",
          "Ciclo: 75-85 días",
          "Contenido proteico: 22%",
          "Resistente a enfermedades",
          "Variedad criolla mejorada"
        ],
        seasonal: false
      },
      {
        id: 503,
        name: "Semilla de Sorgo Forrajero",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
        description: "Sorgo de corte para alimentación ganadera",
        price: 450,
        unit: "kg (25 kg)",
        rating: 4.6,
        specs: [
          "Germinación: 85% garantizada",
          "Altura: 2.5-3 metros",
          "Cortes: 3-4 por ciclo",
          "Alto contenido nutricional",
          "Resistente a plagas"
        ],
        seasonal: true
      },
      {
        id: 504,
        name: "Semilla de Tomate Saladette",
        image: "https://images.unsplash.com/photo-1546470427-e2e40d5b3b0b",
        description: "Variedad indeterminada para invernadero",
        price: 850,
        unit: "sobre (1000 semillas)",
        rating: 4.8,
        specs: [
          "Germinación: 95% garantizada",
          "Peso fruto: 180-220 gr",
          "Resistente a virus",
          "Larga vida de anaquel",
          "Ideal para exportación"
        ],
        seasonal: false
      },
      {
        id: 505,
        name: "Semilla de Chile Jalapeño",
        image: "https://images.unsplash.com/photo-1583300872034-15ee0c2ec636",
        description: "Variedad picante adaptada a clima cálido",
        price: 320,
        unit: "sobre (500 semillas)",
        rating: 4.5,
        specs: [
          "Germinación: 90% garantizada",
          "Tamaño: 6-8 cm",
          "Picor: 2,500-8,000 SHU",
          "Resistente a bacteriosis",
          "Ideal para procesamiento"
        ],
        seasonal: false
      },
      {
        id: 506,
        name: "Semilla de Calabaza Criolla",
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371",
        description: "Variedad tradicional de alto rendimiento",
        price: 95,
        unit: "kg",
        rating: 4.4,
        specs: [
          "Germinación: 85% garantizada",
          "Peso fruto: 3-5 kg",
          "Ciclo: 90-100 días",
          "Uso: fruto y semilla",
          "Adaptada a temporal"
        ],
        seasonal: true
      }
    ],
    services: [
      "Semillas certificadas y garantizadas",
      "Asesoría técnica especializada",
      "Análisis de suelos",
      "Programas de siembra",
      "Capacitación en cultivos",
      "Entrega a domicilio"
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
          <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl text-white p-8 mb-8">
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
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Semillas certificadas</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Asesoría técnica</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Garantía germinación</span>
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
                <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg">
                  <FiCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{service}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Catálogo de Semillas */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Catálogo de Semillas</h2>
              <span className="text-gray-500">{company.products.length} variedades disponibles</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    {product.seasonal && (
                      <div className="absolute bottom-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded-full text-xs">
                        Temporada de siembra
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Características:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.specs.map((spec, i) => (
                          <li key={i} className="flex items-start">
                            <FiCheckCircle className="w-3 h-3 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-green-600">
                          ${product.price.toLocaleString()}
                          <span className="text-sm text-gray-500 ml-1">por {product.unit}</span>
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => addToCart(product)}
                          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                            isInCart(product.id) 
                              ? 'bg-gray-500 text-white cursor-not-allowed'
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                          disabled={isInCart(product.id)}
                        >
                          {isInCart(product.id) ? 'Agregado' : 'Cotizar semilla'}
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

          {/* Contacto y Asesoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contacto */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contacto y Ubicación</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Almacén y Oficinas</h3>
                    <p className="text-gray-600">{company.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiPhone className="text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Ventas</h3>
                    <a href={`tel:${company.phone}`} className="text-gray-600 hover:text-green-600">{company.phone}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiSun className="text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                    <a href={`https://wa.me/${company.whatsapp}`} className="text-gray-600 hover:text-green-600">{company.whatsapp}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiMail className="text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a href={`mailto:${company.email}`} className="text-gray-600 hover:text-green-600">{company.email}</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Asesoría Técnica */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Asesoría Técnica</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-green-50 rounded-lg">
                  <FiDroplet className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Análisis de Suelos</h3>
                    <p className="text-sm text-gray-600">Evaluamos las condiciones de tu terreno para recomendar las mejores variedades</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-green-50 rounded-lg">
                  <FiSun className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Calendario de Siembra</h3>
                    <p className="text-sm text-gray-600">Te ayudamos a planificar tus siembras según el clima y temporadas</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-green-50 rounded-lg">
                  <FiTrendingUp className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Seguimiento de Cultivos</h3>
                    <p className="text-sm text-gray-600">Acompañamiento técnico durante todo el ciclo productivo</p>
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

export default SemillasPremiumPage;