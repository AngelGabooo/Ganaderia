import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const livestockProducts = [
  {
    id: 1,
    title: "Fardos de pasto seco",
    description: "Alimento nutritivo y económico para tu ganado",
    detailedDescription: "Cosechado en su punto óptimo de madurez y secado naturalmente para preservar sus nutrientes. Ideal para alimentación básica del ganado durante todo el año.",
    price: "$664.00 por fardo",
    quality: "Calidad Premium - 100% natural sin aditivos",
    image: "https://i.pinimg.com/1200x/7d/28/e5/7d28e52a5416b1aa509911d3ba293376.jpg",
    category: "Forraje"
  },
  {
    id: 2,
    title: "Fardos de alfalfa",
    description: "Alimento premium rico en proteínas",
    detailedDescription: "Alfalfa de alta calidad con alto contenido proteico que mejora la dieta del ganado y aumenta su productividad. Perfecto para vacas lecheras y ganado en crecimiento.",
    price: "$435.00 por fardo",
    quality: "Alta calidad - 18-22% proteína cruda",
    image: "https://www.arceoagropecuaria.com/img/productos-mega-fardos.jpg",
    category: "Premium"
  },
  {
    id: 3,
    title: "Sal mineralizada",
    description: "Complemento esencial para la salud",
    detailedDescription: "Mezcla mineral esencial que fortalece el sistema inmunológico del ganado y previene deficiencias nutricionales. Contiene calcio, fósforo, magnesio y oligoelementos.",
    price: "$469.00 por 5 kg",
    quality: "Grado veterinario - Balance óptimo de minerales",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_727916-MLA83390664236_042025-F.webp",
    category: "Minerales"
  },
  {
    id: 4,
    title: "Melaza y suplementos",
    description: "Energía concentrada para el ganado",
    detailedDescription: "Mezcla energética que mejora el sabor del alimento y aumenta el consumo voluntario. Fuente rápida de energía para épocas de alta demanda nutricional.",
    price: "$779.00 por 5 Kg",
    quality: "Alta pureza - Mejora la palatabilidad",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_616805-MLM83309831169_032025-F.webp",
    category: "Suplementos"
  }
];

const LivestockCatalog = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === livestockProducts.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? livestockProducts.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const currentProduct = livestockProducts[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4 md:p-8" style={{backgroundColor: '#FAF9F6'}}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div 
          id="header-section"
          ref={el => sectionRefs.current[0] = el}
          className={`text-center mb-12 space-y-6 transition-all duration-700 ease-out ${
            visibleSections.includes('header-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full shadow-lg font-bold text-sm tracking-wide" style={{background: 'linear-gradient(135deg, #8B5E3C, #A9745B)'}}>
            <span className="text-xl">🐄</span>
            PRODUCTOS GANADEROS PREMIUM
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{background: 'linear-gradient(135deg, #4CAF50, #6C9A4E, #8B5E3C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
            Nutrición de Calidad
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Insumos premium que maximizan la productividad y salud de tu ganado
          </p>
          
          <div className="w-32 h-1 mx-auto rounded-full" style={{background: 'linear-gradient(135deg, #4CAF50, #6C9A4E)'}}></div>
        </div>

        {/* Main Carousel */}
        <div 
          id="carousel-section"
          ref={el => sectionRefs.current[1] = el}
          className={`relative mb-16 transition-all duration-700 ease-out delay-150 ${
            visibleSections.includes('carousel-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl font-bold text-gray-700 hover:scale-110 ${
              isAnimating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{backgroundColor: '#F4F1EA'}}
            onMouseEnter={(e) => {
              if (!isAnimating) {
                e.target.style.backgroundColor = '#FAF9F6';
                e.target.style.color = '#4CAF50';
              }
            }}
            onMouseLeave={(e) => {
              if (!isAnimating) {
                e.target.style.backgroundColor = '#F4F1EA';
                e.target.style.color = '#374151';
              }
            }}
          >
            ←
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl font-bold text-gray-700 hover:scale-110 ${
              isAnimating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{backgroundColor: '#F4F1EA'}}
            onMouseEnter={(e) => {
              if (!isAnimating) {
                e.target.style.backgroundColor = '#FAF9F6';
                e.target.style.color = '#4CAF50';
              }
            }}
            onMouseLeave={(e) => {
              if (!isAnimating) {
                e.target.style.backgroundColor = '#F4F1EA';
                e.target.style.color = '#374151';
              }
            }}
          >
            →
          </button>

          {/* Product Card */}
          <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-600 ${
            isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
          }`}>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              
              {/* Image Section */}
              <div className="relative overflow-hidden" style={{background: 'linear-gradient(135deg, #E0E0E0, #BDBDBD)'}}>
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className={`w-full h-full object-cover transition-all duration-600 ${
                    isAnimating ? 'scale-110 blur-sm' : 'scale-100 blur-0'
                  }`}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg" style={{background: 'linear-gradient(135deg, #FBC02D, #FFD54F)'}}>
                  {currentProduct.category}
                </div>

                {/* Quality Badge */}
                <div className="absolute bottom-6 left-6 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2" style={{backgroundColor: '#FAF9F6'}}>
                  <span style={{color: '#FBC02D'}}>✨</span>
                  {currentProduct.quality}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  {currentProduct.title}
                </h2>

                <p className="text-xl font-semibold mb-6" style={{color: '#4CAF50'}}>
                  {currentProduct.description}
                </p>

                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {currentProduct.detailedDescription}
                </p>

                {/* Price and CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-3xl font-bold" style={{background: 'linear-gradient(135deg, #4CAF50, #6C9A4E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                    {currentProduct.price}
                  </div>

                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none shadow-lg hover:shadow-xl"
                    style={{background: 'linear-gradient(135deg, #C1440E, #BF360C)'}}
                  >
                    COTIZAR AHORA
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {livestockProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8' 
                    : 'hover:bg-gray-400'
                }`}
                style={{
                  backgroundColor: index === currentIndex 
                    ? '#4CAF50' 
                    : '#BDBDBD'
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Preview Strip */}
        <div 
          id="preview-section"
          ref={el => sectionRefs.current[2] = el}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ease-out delay-300 ${
            visibleSections.includes('preview-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {livestockProducts.map((product, index) => (
            <div
              key={product.id}
              onClick={() => goToSlide(index)}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                index === currentIndex 
                  ? 'ring-4 scale-105' 
                  : 'hover:ring-2 hover:ring-gray-200'
              }`}
              style={{
                backgroundColor: index === currentIndex ? '#F4F1EA' : 'white',
                ringColor: index === currentIndex ? '#4CAF50' : undefined
              }}
            >
              <h3 className={`font-bold text-lg mb-2 ${
                index === currentIndex ? '' : 'text-gray-800'
              }`} style={{color: index === currentIndex ? '#4CAF50' : '#1F2937'}}>
                {product.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              
              <div className={`font-bold text-lg ${
                index === currentIndex 
                  ? '' 
                  : 'text-gray-800'
              }`} style={{
                color: index === currentIndex ? undefined : '#1F2937',
                background: index === currentIndex ? 'linear-gradient(135deg, #4CAF50, #6C9A4E)' : undefined,
                WebkitBackgroundClip: index === currentIndex ? 'text' : undefined,
                WebkitTextFillColor: index === currentIndex ? 'transparent' : undefined,
                backgroundClip: index === currentIndex ? 'text' : undefined
              }}>
                {product.price}
              </div>
              
              {index === currentIndex && (
                <div className="mt-3 text-xs font-semibold flex items-center gap-1" style={{color: '#4CAF50'}}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#4CAF50'}}></span>
                  SELECCIONADO
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div 
          id="cta-section"
          ref={el => sectionRefs.current[3] = el}
          className={`text-center mt-16 rounded-3xl p-12 text-white transition-all duration-700 ease-out delay-500 ${
            visibleSections.includes('cta-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{background: 'linear-gradient(135deg, #8B5E3C, #A9745B)'}}
        >
          <h3 className="text-3xl font-bold mb-4">
            ¿Necesitas asesoría personalizada?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Nuestros expertos te ayudarán a elegir los mejores productos para tu ganado
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{backgroundColor: '#FAF9F6', color: '#8B5E3C'}}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F4F1EA';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FAF9F6';
            }}
          >
            Contactar Especialista
          </button>
        </div>
      </div>
    </div>
  );
};

export default LivestockCatalog;