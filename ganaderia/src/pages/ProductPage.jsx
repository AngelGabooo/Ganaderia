import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../organisms/Header';
import { useAppContext } from '../context/AppContext';

const ProductPage = () => {
  const { favorites, cart, toggleFavorite, addToCart } = useAppContext();
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de productos de ejemplo
  const products = [
    {
      id: 1,
      name: 'Multimin 90 100 Ml Suplemente Mineral',
      description: 'Suplemento mineral inyectable que proporciona zinc, manganeso, selenio y cobre en una forma quelada fácilmente disponible',
      price: 960,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_986526-MLU74224384068_022024-F.webp',
      category: 'Alimentos',
      seller: 'NutriGanado S.A.',
      quality: 'premium'
    },
    {
      id: 2,
      name: 'Paca De Paja De Avena - Tamaño Grande - Sin Tratamientos',
      description: 'Paca de paja de avena, también conocido como rastrojo de avena.',
      price: 664,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_661427-MLM81683933022_012025-F.webp',
      category: 'Suplementos',
      seller: 'Veterinaria El Campo',
      quality: 'popular'
    },
    {
      id: 3,
      name: 'Caballo Y Ganado Primer 54056 054056 De Goma Suave Curry Cep',
      description: 'Sistema de bebederos automáticos para corrales',
      price: 3055,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_618877-MLM41455605030_042020-F-caballo-y-ganado-primer-54056-054056-de-goma-suave-curry-cep.webp',
      category: 'Equipo',
      seller: 'AgroTecnica',
      quality: 'regular'
    },
    {
      id: 4,
      name: 'Tijera Trasquilar Ganado Ovejas Borregos Alta Resistencia',
      description: 'SWEET HOME',
      price: 100,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_730079-MLM48700015194_122021-F-tijera-trasquilar-ganado-ovejas-borregos-alta-resistencia.webp',
      category: 'Equipo',
      seller: 'DistriAgro',
      quality: 'premium'
    },
     {
      id: 5,
      name: 'Bebedero De Animales De Granja Grande 4l Automático De Agua',
      description: 'Bebedero/Comedero',
      price: 417,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_624520-CBT84575052941_052025-F.webp',
      category: 'Equipo',
      seller: 'AgroTecnica',
      quality: 'regular'
    },
     {
      id: 6,
      name: 'Tecnofos 4:40 25kg. Sal Mineral-proteica Para Ganado Bovino',
      description: 'Sistema de bebederos automáticos para corrales',
      price: 879,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_633599-MLU73695810251_122023-F.webp',
      category: 'Equipo',
      seller: 'TECNOFOS',
      quality: 'regular'
    },
  ];

  // Filtrar productos por precio y término de búsqueda
  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPrice && matchesSearch;
  });

  // Función para obtener el color de la etiqueta según la calidad
  const getQualityColor = (quality) => {
    switch(quality) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'popular':
        return 'bg-blue-100 text-blue-800';
      case 'regular':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Barra de búsqueda y acciones - Diseño moderno */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="relative w-full md:w-[500px]">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-12 pr-6 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex space-x-5">
              <Link to="/favoritos" className="relative p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                <svg className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-medium">
                    {favorites.length}
                  </span>
                )}
              </Link>
              
              <Link to="/carrito" className="relative p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                <svg className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-medium">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Filtro de precios - Diseño moderno */}
            <div className="w-full lg:w-80 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-28">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Filtrar productos</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-3">
                    Rango de precios: <span className="font-semibold text-emerald-600">${priceRange[0]} - ${priceRange[1]}</span>
                  </label>
                  <div className="relative py-4">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
                    />
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-emerald-500 rounded-full" 
                         style={{ width: `${(priceRange[1] / 10000) * 100}%` }}>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Mínimo</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1] - 100}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Máximo</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                      <input
                        type="number"
                        min={priceRange[0] + 100}
                        max="10000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lista de productos - Diseño moderno */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-100">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button 
                        onClick={() => toggleFavorite(product)}
                        className={`absolute top-4 right-4 p-2.5 rounded-full shadow-sm transition-all ${
                          favorites.some(fav => fav.id === product.id) 
                            ? 'text-red-500 bg-white' 
                            : 'text-gray-400 hover:text-red-500 bg-white/90 hover:bg-white'
                        }`}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getQualityColor(product.quality)}`}>
                          {product.quality === 'premium' ? 'Premium' : product.quality === 'popular' ? 'Popular' : 'Regular'}
                        </span>
                      </div>
                      
                      <p className="text-gray-500 mb-3">{product.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Vendido por:</span> {product.seller}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-emerald-600">${product.price.toLocaleString()}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center transition-colors shadow-sm hover:shadow-md"
                        >
                          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-xl font-medium text-gray-700">No se encontraron productos</h3>
                  <p className="mt-2 text-gray-500">Prueba ajustando los filtros de búsqueda</p>
                  <button 
                    onClick={() => {
                      setPriceRange([0, 10000]);
                      setSearchTerm('');
                    }}
                    className="mt-6 inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
                  >
                    Reiniciar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;