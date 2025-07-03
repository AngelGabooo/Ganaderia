import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiamos esta línea

const products = [
  {
    id: 1,
    title: "Fardos de pasto seco",
    description: "Alimento nutritivo y económico para tu ganado, cosechado en su punto óptimo de madurez y secado naturalmente.",
    features: [
      "Alto contenido nutricional",
      "Proceso de secado natural",
      "Disponible todo el año"
    ],
    details: {
      images: [
        "https://plus.unsplash.com/premium_photo-1664359132441-4cab2cccb891?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1664359132241-b0bf6cdd6c2e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1623493052534-b7416331b332?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      specifications: [
        "Peso: 20-25 kg por fardo",
        "Proteína: 8-10%",
        "Fibra: 30-35%",
        "Humedad: <15%",
        "Tamaño: 90x45x35 cm"
      ],
      benefits: [
        "Mejora la digestión del ganado",
        "Mantiene el peso corporal",
        "Almacenamiento fácil y duradero",
        "Reduce costos de alimentación",
        "Disponibilidad todo el año"
      ],
      usageTips: [
        "Almacenar en lugar seco y ventilado",
        "Ofrecer en comederos elevados",
        "Complementar con minerales",
        "Rotar existencias (primero en entrar, primero en salir)"
      ]
    },
    icon: "🌾",
    color: "from-green-pasto to-green-pasto-dark",
    buttonColor: "bg-brown-tierra hover:bg-brown-tierra-dark"
  },
  {
    id: 2,
    title: "Fardos de alfalfa",
    description: "Alimento premium rico en proteínas, ideal para mejorar la dieta de tu ganado y aumentar su productividad.",
    features: [
      "Alto contenido proteico",
      "Mejora la digestión",
      "Aumenta la producción lechera"
    ],
    details: {
      images: [
        "https://i.pinimg.com/1200x/16/e4/8a/16e48a0f5001986c04a7bd60965e4a75.jpg",
        "https://i.pinimg.com/1200x/47/ec/da/47ecdaa78cf622ec55b5dc10984bd2b2.jpg",
        "https://i.pinimg.com/1200x/cf/86/58/cf8658b05ada620a0529f84d5f6a3855.jpg"
      ],
      specifications: [
        "Peso: 18-22 kg por fardo",
        "Proteína: 15-18%",
        "Fibra: 25-30%",
        "Humedad: <12%",
        "Tamaño: 80x40x30 cm"
      ],
      benefits: [
        "Aumenta la producción de leche",
        "Mejora la condición corporal",
        "Alto contenido de calcio",
        "Favorece el crecimiento muscular",
        "Mejora la fertilidad"
      ],
      usageTips: [
        "Ideal para vacas lecheras",
        "Complementar con granos",
        "Almacenar protegido de la humedad",
        "Controlar consumo para evitar timpanismo"
      ]
    },
    icon: "🌿",
    color: "from-brown-tierra to-brown-tierra-dark",
    buttonColor: "bg-brown-tierra hover:bg-brown-tierra-dark"
  },
  {
    id: 3,
    title: "Sal mineralizada",
    description: "Complemento esencial para la salud del ganado, con los minerales necesarios para su desarrollo óptimo.",
    features: [
      "Mejora el sistema inmunológico",
      "Previene deficiencias minerales",
      "Promueve crecimiento saludable"
    ],
    details: {
      images: [
        "https://i.pinimg.com/1200x/82/e9/fd/82e9fddd9199037556c4b1a98988618e.jpg",
        "https://http2.mlstatic.com/D_NQ_NP_2X_903161-MLA82903884715_032025-F.webp",
        "https://i.pinimg.com/1200x/b1/58/25/b1582558e6c499f3c123bba93aa9c579.jpg"
      ],
      specifications: [
        "Presentación: Bloques de 5 kg",
        "Contenido: NaCl, Ca, P, Mg, Zn, Cu, Co, I",
        "Consumo: 50-100 g por animal/día",
        "Vida útil: 12 meses",
        "Embalaje: Bolsa plástica sellada"
      ],
      benefits: [
        "Previene enfermedades carenciales",
        "Mejora la conversión alimenticia",
        "Fortalece huesos y articulaciones",
        "Aumenta la resistencia a enfermedades",
        "Mejora la calidad del pelaje"
      ],
      usageTips: [
        "Disponer en comederos protegidos",
        "Ubicar en zonas de paso obligado",
        "No mezclar con otros alimentos",
        "Controlar consumo según necesidades"
      ]
    },
    icon: "🧂",
    color: "from-beige-claro to-beige-claro-dark",
    buttonColor: "bg-brown-tierra hover:bg-brown-tierra-dark"
  },
  {
    id: 4,
    title: "Melaza y suplementos",
    description: "Energía concentrada para el ganado, mejora el sabor del alimento y aumenta el consumo voluntario.",
    features: [
      "Fuente de energía rápida",
      "Mejora la palatabilidad",
      "Fácil de mezclar"
    ],
    details: {
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_2X_616805-MLM83309831169_032025-F.webp",
        "https://i.pinimg.com/1200x/8a/3c/40/8a3c405646e318f49449215aa9a38a21.jpg",
        "https://i.pinimg.com/1200x/0a/84/72/0a8472794b9e43a36a7e6fabb6f7ec31.jpg"
      ],
      specifications: [
        "Presentación: Bidones de 20 L",
        "Densidad: 1.4-1.5 g/cm³",
        "Materia seca: 75-80%",
        "Azúcares: 45-50%",
        "Consumo: 100-300 g por animal/día"
      ],
      benefits: [
        "Aumenta el consumo de forrajes",
        "Fuente de energía de rápida asimilación",
        "Mejora la absorción de nutrientes",
        "Reduce el polvo en alimentos",
        "Facilita la ingesta de medicamentos"
      ],
      usageTips: [
        "Mezclar uniformemente con alimentos",
        "No exceder el 10% de la dieta",
        "Almacenar en lugar fresco",
        "Usar en épocas de alta demanda energética",
        "Lavar equipos después de usar"
      ]
    },
    icon: "🍯",
    color: "from-rojo-terracota to-rojo-terracota-dark",
    buttonColor: "bg-brown-tierra hover:bg-brown-tierra-dark"
  }
];

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.details.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.details.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h3 className="text-2xl font-bold text-brown-tierra">{product.title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="relative mb-8">
            <img 
              src={product.details.images[currentImageIndex]} 
              alt={product.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
            
            {product.details.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            <div className="flex justify-center mt-4 space-x-2">
              {product.details.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-brown-tierra' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-brown-tierra">Descripción Detallada</h4>
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <h4 className="text-xl font-semibold mb-4 text-brown-tierra">Beneficios</h4>
              <ul className="space-y-3">
                {product.details.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-green-pasto text-white rounded-full mr-3 mt-0.5 flex-shrink-0 text-sm">
                      ✓
                    </span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4 text-brown-tierra">Especificaciones Técnicas</h4>
              <ul className="space-y-3">
                {product.details.specifications.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-brown-tierra text-white rounded-full mr-3 mt-0.5 flex-shrink-0 text-sm">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{spec}</span>
                  </li>
                ))}
              </ul>
              
              <h4 className="text-xl font-semibold mb-4 mt-6 text-brown-tierra">Recomendaciones de Uso</h4>
              <ul className="space-y-3">
                {product.details.usageTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-dorado text-white rounded-full mr-3 mt-0.5 flex-shrink-0 text-sm">
                      !
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-beige-claro p-6 rounded-lg border border-gray-suave">
            <h4 className="text-xl font-semibold mb-3 text-brown-tierra">¿Interesado en este producto?</h4>
            <p className="text-gray-700 mb-4">Contáctanos para más información sobre precios, disponibilidad y entregas.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-brown-tierra hover:bg-brown-tierra-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Solicitar Cotización
              </button>
              <button className="flex-1 bg-green-pasto hover:bg-green-pasto-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Hablar con Asesor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const handleContactSpecialist = () => {
    navigate('/dashboard'); 
  };

  return (
    <section 
      ref={sectionRef} 
      className={`py-20 px-4 bg-beige-claro min-h-screen transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      id="productos"
    >
      <style jsx global>{`
        :root {
          --green-pasto: #4CAF50;
          --green-pasto-dark: #6C9A4E;
          --brown-tierra: #8B5E3C;
          --brown-tierra-dark: #A9745B;
          --beige-claro: #FAF9F6;
          --beige-claro-dark: #F4F1EA;
          --yellow-dorado: #FBC02D;
          --yellow-dorado-dark: #FFD54F;
          --gray-suave: #E0E0E0;
          --gray-suave-dark: #BDBDBD;
          --rojo-terracota: #C1440E;
          --rojo-terracota-dark: #BF360C;
        }
        
        .bg-green-pasto { background-color: var(--green-pasto); }
        .bg-green-pasto-dark { background-color: var(--green-pasto-dark); }
        .from-green-pasto { --tw-gradient-from: var(--green-pasto); }
        .to-green-pasto-dark { --tw-gradient-to: var(--green-pasto-dark); }
        
        .bg-brown-tierra { background-color: var(--brown-tierra); }
        .bg-brown-tierra-dark { background-color: var(--brown-tierra-dark); }
        .from-brown-tierra { --tw-gradient-from: var(--brown-tierra); }
        .to-brown-tierra-dark { --tw-gradient-to: var(--brown-tierra-dark); }
        
        .bg-beige-claro { background-color: var(--beige-claro); }
        .bg-beige-claro-dark { background-color: var(--beige-claro-dark); }
        .from-beige-claro { --tw-gradient-from: var(--beige-claro); }
        .to-beige-claro-dark { --tw-gradient-to: var(--beige-claro-dark); }
        
        .bg-yellow-dorado { background-color: var(--yellow-dorado); }
        .bg-yellow-dorado-dark { background-color: var(--yellow-dorado-dark); }
        .from-yellow-dorado { --tw-gradient-from: var(--yellow-dorado); }
        .to-yellow-dorado-dark { --tw-gradient-to: var(--yellow-dorado-dark); }
        
        .bg-gray-suave { background-color: var(--gray-suave); }
        .bg-gray-suave-dark { background-color: var(--gray-suave-dark); }
        .from-gray-suave { --tw-gradient-from: var(--gray-suave); }
        .to-gray-suave-dark { --tw-gradient-to: var(--gray-suave-dark); }
        
        .bg-rojo-terracota { background-color: var(--rojo-terracota); }
        .bg-rojo-terracota-dark { background-color: var(--rojo-terracota-dark); }
        .from-rojo-terracota { --tw-gradient-from: var(--rojo-terracota); }
        .to-rojo-terracota-dark { --tw-gradient-to: var(--rojo-terracota-dark); }
        
        .text-green-pasto { color: var(--green-pasto); }
        .text-brown-tierra { color: var(--brown-tierra); }
        .text-beige-claro { color: var(--beige-claro); }
        .text-yellow-dorado { color: var(--yellow-dorado); }
        .text-gray-suave { color: var(--gray-suave); }
        .text-rojo-terracota { color: var(--rojo-terracota); }
        
        .border-green-pasto { border-color: var(--green-pasto); }
        .border-brown-tierra { border-color: var(--brown-tierra); }
        .border-beige-claro { border-color: var(--beige-claro); }
        .border-yellow-dorado { border-color: var(--yellow-dorado); }
        .border-gray-suave { border-color: var(--gray-suave); }
        .border-rojo-terracota { border-color: var(--rojo-terracota); }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-brown-tierra mb-6">
            Productos Ganaderos de Calidad
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos los mejores insumos para la alimentación y cuidado de tu ganado
          </p>
          <div className="w-24 h-1 bg-brown-tierra mx-auto mt-8 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-gray-suave overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 100 + 400}ms`,
                animation: isVisible ? `slideInUp 0.6s ease-out ${index * 0.1 + 0.4}s both` : 'none'
              }}
            >
              <div className={`bg-gradient-to-r ${product.color} p-6 text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white opacity-10 transform rotate-12 scale-150"></div>
                <div className="text-6xl mb-2 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {product.icon}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-pasto transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {product.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span className={`inline-flex items-center justify-center w-5 h-5 bg-${product.color.split(' ')[1].replace('from-', '')}-100 text-${product.color.split(' ')[1].replace('from-', '')} rounded-full mr-3 mt-0.5 flex-shrink-0 text-xs font-bold`}>
                        ✓
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => openModal(product)}
                  className={`w-full ${product.buttonColor} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brown-tierra/50 shadow-lg hover:shadow-xl`}
                >
                  Más información
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-lg text-gray-700 mb-6">
            ¿Necesitas asesoría personalizada para tu ganado?
          </p>
          <button 
            onClick={handleContactSpecialist}
            className="bg-brown-tierra hover:bg-brown-tierra-dark text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brown-tierra/50 shadow-xl hover:shadow-2xl"
          >
            Contactar Especialista
          </button>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={closeModal} 
        />
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Products;