import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../organisms/Header';
import { FiMapPin, FiPhone, FiMail, FiArrowLeft, FiShoppingCart, FiHeart, FiX } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const CompanyDetailPage = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite, cart, addToCart } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Datos de ejemplo
  const company = {
    id: 1,
    name: "ADM Nutrición Animal",
    logo: "https://www.pecuarios.club/empresas/Empresa_logo62214dc78da03_03032022.svg",
    description: "En ADM fabricamos una nutrición especializada para cada tipo de producción, la cual apoya a mejorar las conversiones alimenticias e impactar de manera significativa en el cuidado de la salud humana.",
    address: "Avenida Ejército Nacional #843 B, piso 1, Col. Granada, CP. 11520, Alcaldía Miguel Hidalgo, CDMX.",
    phone: "(55) 5089-8500 Smart Center 800 507-4600",
    email: "nola-smartcenter@adm.com",
    category: "Ganadería",
    products: [
      {
        id: 101,
        name: "Api-carne crecimiento",
        image: "https://www.pecuarios.club/productos/Producto_logo_668444d7b3749.webp",
        description: "Alimento balanceado para toros en crecimiento",
        detailedDescription: "Alimento balanceado para toros en crecimiento, formulado con alta energía (granos de cereales rolados al vapor). Adicionado con buffers e ionoforos que disminuyen el riesgo de acidosis. Permite excelentes ganancias de peso y conversión alimenticia. Indicado de 90 a 200 Kg. Presentación Pellet.",
        price: 800,
        unit: "Por bolsa",
        rating: 4.8,
        specifications: [
          { label: "Peso promedio", value: "500-600 kg" },
          { label: "Edad", value: "18-24 meses" },
          { label: "Certificaciones", value: "Orgánico, Libre de hormonas" },
          { label: "Disponibilidad", value: "Todo el año" }
        ],
        additionalImages: [
          "https://www.pecuarios.club/uploads/Upload-668444a5bdf23-02072024.webp",
          "https://www.pecuarios.club/uploads/Upload-668444cb13a99-02072024.webp",
          "https://www.pecuarios.club/uploads/Upload-668444a5bdf23-02072024.webp"
        ]
      },
      {
        id: 102,
        name: "Nutris reprolact evialis monensina",
        image: "https://www.pecuarios.club/productos/Producto_logo_66847f405532e.webp",
        description: "Alimento completo para vacas en lactancia",
        detailedDescription: "Alimento completo para vacas frescas, formulado con niveles significativos de grasa de sobrepaso. Reduce la pérdida de condición corporal y reduce los riesgos de acidosis y desplazamiento del abomaso. Indicado desde el parto hasta 21 días post-parto. Presentación pellet.",
        price: 800,
        unit: "Por bolsa",
        rating: 4.5,
        specifications: [
          { label: "Peso promedio", value: "450-550 kg" },
          { label: "Edad", value: "20-26 meses" },
          { label: "Resistencia", value: "Alta resistencia al calor y humedad" },
          { label: "Disponibilidad", value: "Temporada de primavera" }
        ],
        additionalImages: [
          "https://www.pecuarios.club/uploads/Upload-66847efdbab82-02072024.webp",
          "https://www.pecuarios.club/uploads/Upload-66847f2db9bb6-02072024.webp",
          "https://www.pecuarios.club/uploads/Upload-66847f2db9bb6-02072024.webp"
        ]
      },
       {
        id: 103,
        name: "Becerro engorda 16% api aba",
        image: "https://www.pecuarios.club/productos/Producto_logo_66844b4f9b112.webp",
        description: "Alimento balanceado para bovinos de engorda",
        detailedDescription: "Alimento balanceado con 16% de proteína para bovinos de engorda. Ideal para complementar la alimentación en pastoreo.  Indicado de 90kg a 200kg. Presentación rolado.",
        price: 800,
        unit: "Por bolsa",
        rating: 4.5,
        specifications: [
          { label: "Peso promedio", value: "450-550 kg" },
          { label: "Edad", value: "20-26 meses" },
          { label: "Resistencia", value: "Alta resistencia al calor y humedad" },
          { label: "Disponibilidad", value: "Temporada de primavera" }
        ],
        additionalImages: [
          "https://www.pecuarios.club/productos/Producto_logo_66844b4f9b112.webp",
          "https://www.pecuarios.club/uploads/Upload-66844b2363a49-02072024.webp",
          "https://www.pecuarios.club/uploads/Upload-66844b430058a-02072024.webp"
        ]
      }
    ]
  };

  const isFavorite = (productId) => favorites.some(item => item.id === productId);
  const isInCart = (productId) => cart.some(item => item.id === productId);

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
            className="flex items-center text-green-600 mb-6 hover:text-green-800"
          >
            <FiArrowLeft className="mr-2" /> Volver a empresas
          </Link>
          
          {/* Información de la empresa */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-48 h-48 rounded-full bg-gray-100 border-4 border-green-100 flex items-center justify-center overflow-hidden mb-6">
                  <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-4" />
                </div>
                
                <div className="space-y-4 w-full">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{company.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-green-600 flex-shrink-0" />
                    <a href={`tel:${company.phone}`} className="text-gray-700 hover:text-green-600">{company.phone}</a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FiMail className="text-green-600 flex-shrink-0" />
                    <a href={`mailto:${company.email}`} className="text-gray-700 hover:text-green-600">{company.email}</a>
                  </div>
                  
                  <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                    Contactar Empresa
                  </button>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{company.name}</h1>
                <p className="text-gray-600 mb-6">{company.description}</p>
                
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Especialización</h3>
                  <p className="text-gray-700">{company.category}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Productos de la empresa */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos ofrecidos</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">
                        ${product.price.toLocaleString()} <span className="text-sm text-gray-500">{product.unit}</span>
                      </span>
                      
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-gray-700">{product.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <button 
                        onClick={() => addToCart(product)}
                        className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                          isInCart(product.id) 
                            ? 'bg-gray-500 text-white cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
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
              ))}
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
                              <span className="text-2xl font-bold text-green-600">
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
                      : 'bg-green-600 hover:bg-green-700'
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

export default CompanyDetailPage;