import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../organisms/Header';
import { useAppContext } from '../context/AppContext';

const Favorites = () => {
  const { favorites, toggleFavorite } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <Header />
      
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mb-6 shadow-lg">
              <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Tus Productos Favoritos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Guarda y organiza los productos que más te interesan para encontrarlos fácilmente
            </p>
            {favorites.length > 0 && (
              <div className="mt-6 inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-rose-200">
                <span className="text-sm font-medium text-rose-700">
                  {favorites.length} {favorites.length === 1 ? 'producto favorito' : 'productos favoritos'}
                </span>
              </div>
            )}
          </div>
          
          {favorites.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                {/* Empty State Illustration */}
                <div className="relative mb-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-rose-100 to-pink-200 rounded-full flex items-center justify-center shadow-inner">
                    <svg className="h-16 w-16 text-rose-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  {/* Floating hearts animation */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-pulse">
                    <svg className="h-6 w-6 text-rose-300 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Aún no tienes favoritos
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Explora nuestro catálogo y marca como favoritos los productos que más te interesen. 
                  Así podrás encontrarlos fácilmente más tarde.
                </p>
                
                <Link 
                  to="/productos" 
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <svg className="h-5 w-5 mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explorar productos
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favorites.map((product, index) => (
                <div 
                  key={product.id} 
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 border border-white/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Favorite button with animation */}
                    <button 
                      onClick={() => toggleFavorite(product)}
                      className="absolute top-4 right-4 p-3 rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 group-hover:animate-pulse"
                    >
                      <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                    
                    {/* Floating love indicator */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      ❤️ Favorito
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                          ${product.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">Precio actual</span>
                      </div>
                      
                      <Link 
                        to="/productos" 
                        className="group/link inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 text-rose-700 hover:text-rose-800 font-medium rounded-xl transition-all duration-300 hover:shadow-md"
                      >
                        <span className="text-sm">Ver detalles</span>
                        <svg className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Bottom glow effect */}
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Favorites;