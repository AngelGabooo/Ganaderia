import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiArrowLeft, FiCheckCircle, FiX } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import Header from '../organisms/Header';

const NutriGanPage = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite, cart, addToCart } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Datos específicos para Alimentos NutriGan
  const company = {
    id: 2,
    name: "Virbac México",
    logo: "https://www.pecuarios.club/empresas/Empresa_logo5dba0f4c57fd7_30102019.svg",
    description: "Virbac se ha convertido en referencia dentro del sector farmacéutico.",
    address: "Av. Inglaterra 5070 Guadalajara Technology Park, CP. 45010, Zapopan, Jalisco.",
    phone: "+52(33) 5000-2500, +52 800 024 7575",
    email: "contacto@virbac.com.mx",
    category: "Sector farmacéutico",
    certifications: ["ISO 9001", "SAGARPA", "Buenas Prácticas de Manufactura"],
    products: [
      {
        id: 201,
        name: "Tulissin® 100",
        image: "https://www.pecuarios.club/productos/Producto_logo_6033f0ed283ae.png",
        description: "En bovinos (carne y productores de leche en período seco) indicado como tratamiento y metafilaxia del complejo respiratorio bovino (CRB) asociado a Mannheimia haemolytica, Pasteurella multocida, Histophilus somni y Mycoplasma bovis sensibles a la tulatromicina.",
        detailedDescription: "Tulissin® 100 es un antibiótico de última generación específicamente formulado para el tratamiento de enfermedades respiratorias en bovinos. Su fórmula de acción prolongada permite un tratamiento efectivo con una sola aplicación, reduciendo el estrés en los animales y optimizando los costos de tratamiento. Efectivo contra las principales bacterias patógenas que causan el complejo respiratorio bovino.",
        price: 1250,
        unit: "Frasco con 250 ml.",
        rating: 4.7,
        specs: [
          "Tulatromicina ………………………… 100 mg",
          "Vehículo c.b.p./Excipientes c.s.p .......… 1 ml"
        ],
        specifications: [
          { label: "Principio activo", value: "Tulatromicina" },
          { label: "Concentración", value: "100 mg/ml" },
          { label: "Presentación", value: "Frasco de 100 ml" },
          { label: "Periodo de retiro", value: "42 días para carne, 36 días para leche" }
        ],
        additionalImages: [
          "https://www.pecuarios.club/productos/Producto_logo_6033f0ed283ae.png",
          "https://dailymed.nlm.nih.gov/dailymed/image.cfm?name=label+2+2.jpg&id=656394",
          "https://vet-us.virbac.com/files/live/sites/virbac-b2b-usa/files/pictures/Product%20Shots/Tulissin%20100/TULISSIN%20100_250ml_Packshot_WEB_600X600_face.png"
        ]
      },
      {
        id: 202,
        name: "FORTIK4",
        image: "https://www.pecuarios.club/productos/Producto_logo_61fb3bffb67f6.png",
        description: "FORTIK4 es un antiparasitario externo para uso en bovinos (carne), indicado para el tratamiento y control de ectoparasitosis bovinas causadas por Haematobia irritans (mosca del cuerno), garrapatas Rhipicephalus (Boophilus) microplus y larvas de la mosca Dermatobia hominis.",
        detailedDescription: "Nuestro suplemento energético está diseñado para maximizar la ganancia de peso en periodos de engorda y ayudar en la recuperación de animales debilitados. Contiene una mezcla balanceada de carbohidratos de alta digestibilidad, grasas protegidas y aditivos que mejoran la absorción de nutrientes. Ideal para preparar animales para exposiciones o recuperar condición corporal después del parto.",
        price: 980,
        unit: "por saco de 40kg",
        rating: 4.5,
        specs: [
          "Administrar 1ml por cada 10kg de peso",
          "2.5 mg/kg de fluazurón",
          "7 mg/kg de clorpirifos",
          "6 mg/kg de cipermetrina",
          "6 mg/kg de butóxido de piperonilo",
        ],
        specifications: [
          { label: "Proteína cruda", value: "12%" },
          { label: "Grasa cruda", value: "6%" },
          { label: "Fibra cruda", value: "6%" },
          { label: "Energía metabolizable", value: "3.2 Mcal/kg" },
          { label: "Presentación", value: "Sacos de 40kg" }
        ],
        additionalImages: [
          "https://http2.mlstatic.com/D_NQ_NP_835779-MLB84204040949_042025-O.webp",
          "https://mx.virbac.com/files/live/sites/virbac-mx/files/mexico%20correctas/productos/600/Fortik_4_Virbac_600.png",
          "https://www.pecuarios.club/productos/Producto_logo_6033f0ed283ae.png"
        ]
      },
      {
        id: 203,
        name: "Maxflor® DUO",
        image: "https://www.pecuarios.club/productos/Producto_logo_5e41ec6f4d640.png",
        description: "Antibacteriano inyectable de amplio espectro, asociado a un antiinflamatorio no esteroide.",
        detailedDescription: "Maxflor® Duo contiene florfenicol y meglumina de flunixin. El florfenicol es un antimicrobiano de amplio espectro que inhibe la síntesis de proteína a nivel de ribosoma. Meglumina de flunixin, es un antiinflamatorio no esteroidal (AINE), con efecto analgésico y antipirético que actúa por bloqueo de la enzima ciclo oxigenasa. Está indicado para el tratamiento de las infecciones y la incorporación al consumo de alimento de bovinos productores de carne.",
        price: 750,
        unit: "Frasco con 250 ml.",
        rating: 4.6,
        specs: [
          "Florfenicol.............................. 400 mg",
          "Flunixin meglumina .............. 36.5 mg ",
          "Vehículo c.b.p. ............................1 ml",
        ],
        specifications: [
          { label: "Minerales incluidos", value: "12 esenciales" },
          { label: "Vitaminas", value: "A, D, E" },
          { label: "Presentación", value: "Sacos de 25kg" },
          { label: "Consumo recomendado", value: "100g por animal por día" }
        ],
        additionalImages: [
          "https://www.pecuarios.club/productos/Producto_logo_5e41ec6f4d640.png",
          "https://co.virbac.com/files/live/sites/virbac-co/files/predefined-files/packshots/200x200/Maxflor.png",
          "https://www.pecuarios.club/productos/Producto_logo_63b3092d853a3.png"
        ]
      },
      
    ],
    
    benefits: [
      "Formulaciones científicamente comprobadas",
      "Ingredientes de alta calidad",
      "Asesoría nutricional gratuita",
      "Entrega a toda la región"
    ]
  };

  // Funciones para verificar estado
  const isFavorite = (productId) => favorites.some(item => item.id === productId);
  const isInCart = (productId) => cart.some(item => item.id === productId);

  // Funciones para el modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header withCartIcon withFavoritesIcon />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/empresas" 
            className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
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
                  {company.certifications.map((cert, index) => (
                    <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Beneficios */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Beneficios de nuestros productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {company.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                  <FiCheckCircle className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Productos */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Nuestros Productos</h2>
              <span className="text-gray-500">{company.products.length} productos disponibles</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col border border-gray-100">
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
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Composición:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.specs.map((spec, i) => (
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
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                          disabled={isInCart(product.id)}
                        >
                          {isInCart(product.id) ? 'En el carrito' : 'Agregar al carrito'}
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

                      {/* Botón para ver detalles */}
                      <button 
                        onClick={() => openProductModal(product)}
                        className="mt-2 w-full py-2 px-4 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Ver detalles completos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contacta a {company.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <FiMapPin className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Dirección</h3>
                    <p className="text-gray-600">{company.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <FiPhone className="text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Teléfono</h3>
                    <a href={`tel:${company.phone}`} className="text-gray-600 hover:text-blue-600">{company.phone}</a>
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
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Horario de atención</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Lunes a Viernes</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sábados</span>
                    <span className="font-medium">9:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Domingos</span>
                    <span className="font-medium">Cerrado</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de detalles del producto */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Fondo oscuro */}
            <div className="fixed inset-0 transition-opacity" onClick={closeProductModal}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            {/* Contenido del modal */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    {/* Encabezado del modal */}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl leading-6 font-bold text-gray-900">
                        {selectedProduct.name}
                      </h3>
                      <button 
                        onClick={closeProductModal}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>
                    
                    {/* Contenido principal del modal */}
                    <div className="mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Galería de imágenes */}
                        <div>
                          <div className="h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                            <img 
                              src={selectedProduct.image} 
                              alt={selectedProduct.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {selectedProduct.additionalImages.map((img, index) => (
                              <div key={index} className="h-24 bg-gray-100 rounded overflow-hidden">
                                <img 
                                  src={img} 
                                  alt={`${selectedProduct.name} ${index + 1}`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Información detallada */}
                        <div>
                          <p className="text-gray-700 mb-4">{selectedProduct.detailedDescription}</p>
                          
                          <div className="mb-6">
                            <h4 className="font-semibold text-lg mb-2">Especificaciones</h4>
                            <div className="space-y-2">
                              {selectedProduct.specifications.map((spec, index) => (
                                <div key={index} className="flex justify-between border-b border-gray-100 py-2">
                                  <span className="text-gray-600">{spec.label}:</span>
                                  <span className="text-gray-800 font-medium">{spec.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-blue-600">
                                ${selectedProduct.price.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 ml-1">{selectedProduct.unit}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="ml-1 text-gray-700">{selectedProduct.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pie del modal con botones de acción */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(selectedProduct);
                    closeProductModal();
                  }}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                    isInCart(selectedProduct.id) 
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={isInCart(selectedProduct.id)}
                >
                  {isInCart(selectedProduct.id) ? 'Producto en carrito' : 'Agregar al carrito'}
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(selectedProduct)}
                  className={`mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
                    isFavorite(selectedProduct.id)
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isFavorite(selectedProduct.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                </button>
                <button
                  type="button"
                  onClick={closeProductModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutriGanPage;  