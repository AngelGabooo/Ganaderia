import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Hook para detectar si es móvil
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

const VerifiedProducersSection = () => {
  // Datos de ejemplo de productores verificados
  const producersData = [
    {
      id: 1,
      name: "Rancho Los Toros",
      location: "Jalisco",
      specialty: "Ganado de carne",
      rating: 4.9,
      yearsActive: 12,
      image: "https://i.pinimg.com/736x/19/5f/af/195faf0cbc22dc43d3b895660e84bf81.jpg",
      verifiedSince: 2018
    },
    {
      id: 2,
      name: "Hacienda La Esperanza",
      location: "Guanajuato",
      specialty: "Cultivos orgánicos",
      rating: 4.8,
      yearsActive: 8,
      image: "https://i.pinimg.com/736x/5f/37/2c/5f372cec7768d95c614117d7dec72a05.jpg",
      verifiedSince: 2020
    },
    {
      id: 3,
      name: "Finca El Edén",
      location: "Michoacán",
      specialty: "Avicultura",
      rating: 5.0,
      yearsActive: 15,
      image: "https://i.pinimg.com/736x/37/b5/10/37b51028fe2eac8aacc434f45965412e.jpg",
      verifiedSince: 2016
    },
    {
      id: 4,
      name: "Agropecuaria Santa Ana",
      location: "Chiapas",
      specialty: "Porcicultura",
      rating: 4.7,
      yearsActive: 10,
      image: "https://i.pinimg.com/736x/2c/a3/54/2ca354c4f785eeba900700f91cded609.jpg",
      verifiedSince: 2019
    },
    {
      id: 5,
      name: "Rancho San Miguel",
      location: "Sonora",
      specialty: "Ganado lechero",
      rating: 4.8,
      yearsActive: 7,
      image: "https://i.pinimg.com/736x/fb/75/8c/fb758ceb1311242bc515e906e40f1010.jpg",
      verifiedSince: 2021
    },
    {
      id: 6,
      name: "Granja Los Pinos",
      location: "Puebla",
      specialty: "Avicultura premium",
      rating: 4.9,
      yearsActive: 9,
      image: "https://i.pinimg.com/736x/9b/64/ce/9b64ce24a46b4d2a0ddb1335c0460c23.jpg",
      verifiedSince: 2017
    }
  ];

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Duplicamos los productores para el efecto infinito
  const verifiedProducers = [...producersData, ...producersData];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleSections, setVisibleSections] = useState([]);
  const carouselRef = useRef(null);
  const sectionRefs = useRef([]);

  // Efecto para el carrusel automático infinito
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentIndex(prev => {
          // Cuando llegamos al final del array duplicado, reiniciamos sin animación
          if (prev >= producersData.length * 2 - 1) {
            // Hacemos un reset instantáneo al inicio después de la animación
            setTimeout(() => {
              setCurrentIndex(0);
              setIsAnimating(false);
            }, 1000);
            return prev;
          }
          return prev + 1;
        });
        
        // Solo marcamos como no animando si no estamos en el reset
        if (currentIndex < producersData.length * 2 - 1) {
          setTimeout(() => setIsAnimating(false), 1000);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAnimating, currentIndex, producersData.length]);

  // Observador de intersección para animaciones al hacer scroll
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

  // Función para calcular el desplazamiento del carrusel
  const getTransformValue = () => {
    if (isMobile) {
      return `translateX(-${currentIndex * 100}vw)`;
    }
    const itemWidth = 100 / producersData.length;
    let effectiveIndex = currentIndex;
    if (currentIndex >= producersData.length) {
      effectiveIndex = currentIndex % producersData.length;
    }
    return `translateX(-${effectiveIndex * itemWidth}%)`;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div 
          id="header-section"
          ref={el => sectionRefs.current[0] = el}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            visibleSections.includes('header-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            Productores Verificados
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Conoce a nuestros productores certificados con los más altos estándares de calidad y sostenibilidad.
          </p>
        </div>

        {/* Carrusel Infinito */}
        <div 
          id="carousel-section"
          ref={el => sectionRefs.current[1] = el}
          className={`relative mb-12 transition-all duration-700 ease-out delay-150 ${
            visibleSections.includes('carousel-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div
            ref={carouselRef}
            className="flex transition-transform duration-1000 ease-out"
            style={{
              transform: getTransformValue(),
              width: isMobile
                ? `${verifiedProducers.length * 100}vw`
                : `${verifiedProducers.length * (100 / producersData.length)}%`
            }}
          >
            {verifiedProducers.map((producer, index) => (
              <div
                key={`${producer.id}-${index}`}
                className="flex-shrink-0"
                style={{
                  width: isMobile
                    ? '100vw'
                    : `${100 / producersData.length}%`,
                  padding: isMobile ? '0 12px' : '0 16px',
                  boxSizing: 'border-box',
                  margin: isMobile ? '0 auto' : undefined
                }}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-amber-100 h-full">
                  <div className="relative">
                    <img 
                      src={producer.image} 
                      alt={producer.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verificado
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-amber-900">{producer.name}</h3>
                      <div className="flex items-center bg-amber-100 px-2 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 font-semibold text-amber-800">{producer.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-amber-700 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {producer.location}
                    </p>
                    
                    <p className="text-amber-800 mb-4">
                      <span className="font-semibold text-amber-900">Especialidad:</span> {producer.specialty}
                    </p>
                    
                    <div className="flex justify-between text-sm text-amber-600">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {producer.yearsActive} años
                      </span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Verificado desde {producer.verifiedSince}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => navigate('/contact')}
                      className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                      Contactar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {(isMobile ? producersData : producersData).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 1000);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex % producersData.length ? 'w-6 bg-amber-600' : 'bg-amber-200'
              }`}
            />
          ))}
        </div>

        {/* Ver Todos Button */}
        <div 
          id="button-section"
          ref={el => sectionRefs.current[2] = el}
          className={`text-center transition-all duration-700 ease-out delay-300 ${
            visibleSections.includes('button-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          
          <button
            className="inline-flex items-center px-6 py-3 border border-amber-600 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition duration-200"
            onClick={() => navigate('/dashboard')}
          >
            Ver todos los productores
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerifiedProducersSection;