import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, TrendingUp, Crown, ChevronRight, Star, Loader2 } from 'lucide-react';

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('pequeñas');
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

  const handleStartNow = () => {
    navigate('/suscripciones');
  };

  const basePlans = [
    {
      id: 'acumulador',
      name: 'Plan Acumulador',
      smallPrice: 150,
      distributorPrice: 300,
      period: 'mes',
      description: 'Para ganaderos que producen constantemente',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      badge: 'Más Popular',
      badgeColor: 'bg-green-100 text-green-800',
      features: [
        'Publicación fija todo el mes',
        'Renovación automática mensual',
        'Alertas semanales de precios bajos',
        'Precios exclusivos de proveedores',
        'Tips de conservación y manejo'
      ]
    },
    {
      id: 'vendedor',
      name: 'Plan Vendedor Rápido',
      smallPrice: 250,
      distributorPrice: 500,
      period: 'mes',
      description: 'Ideal para ventas urgentes y rápidas',
      icon: Zap,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      badge: 'Recomendado',
      badgeColor: 'bg-blue-100 text-blue-800',
      features: [
        'Publicación destacada por 7 días',
        'Promoción en 5 grupos de WhatsApp',
        'Etiqueta "¡Producto Urgente!"',
        'Notificaciones a compradores activos',
        'Precios exclusivos de proveedores',
        'Tips semanales de ventas'
      ]
    },
    {
      id: 'premium',
      name: 'Plan Oferta Especial',
      smallPrice: 500,
      distributorPrice: 1000,
      period: 'mes',
      description: 'Máxima exposición para distribuidores grandes',
      icon: Crown,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      badge: 'Premium',
      badgeColor: 'bg-purple-100 text-purple-800',
      features: [
        'Publicación destacada en portada',
        'Banner "Oferta de la Semana"',
        'Promoción por email y WhatsApp',
        'Difusión activa por 3 días',
        'Sello de confianza premium',
        'Acceso preferencial a compradores',
        'Mención en ferias y eventos',
        'Tips y alertas semanales completas'
      ]
    }
  ];

  const plans = basePlans.map(plan => ({
    ...plan,
    price: selectedCategory === 'pequeñas' ? plan.smallPrice : plan.distributorPrice
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div 
          id="header-section"
          ref={el => sectionRefs.current[0] = el}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            visibleSections.includes('header-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Solo para Vendedores - Compradores Gratis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🐄 Planes de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Suscripción</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Impulsa tus ventas ganaderas con nuestros planes diseñados específicamente para la costa de Chiapas. 
            <span className="font-semibold text-green-600"> Los compradores navegan gratis</span>, tú solo pagas por vender.
          </p>

          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 inline-flex">
              <button
                onClick={() => setSelectedCategory('pequeñas')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === 'pequeñas'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pequeñas empresas
              </button>
              <button
                onClick={() => setSelectedCategory('distribuidores')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === 'distribuidores'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Distribuidores
              </button>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            {selectedCategory === 'pequeñas' ? (
              <p className="text-green-700 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                <strong>Pequeñas empresas:</strong> Precios accesibles para ganaderos y productores locales
              </p>
            ) : (
              <p className="text-blue-700 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                <strong>Distribuidores:</strong> Planes premium con mayor alcance y beneficios exclusivos
              </p>
            )}
          </div>
        </div>

        <div 
          id="plans-section"
          ref={el => sectionRefs.current[1] = el}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-700 ease-out delay-150 ${
            visibleSections.includes('plans-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === plan.id;
            const isMiddle = index === 1;
            
            return (
              <div
                key={plan.id}
                className={`relative group transition-all duration-300 ${
                  isMiddle ? 'md:-translate-y-4' : ''
                }`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                <div className={`relative bg-white rounded-3xl p-6 md:p-8 shadow-lg transition-all duration-300 ${
                  isHovered ? 'scale-105 shadow-xl' : 'hover:shadow-xl'
                } ${isMiddle ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
                  
                  {plan.badge && (
                    <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 ${plan.badgeColor} rounded-full text-sm font-semibold`}>
                      {plan.badge}
                    </div>
                  )}

                  <div className={`absolute -top-2 -right-2 px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedCategory === 'pequeñas' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedCategory === 'pequeñas' ? 'PE' : 'DIST'}
                  </div>

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 ${plan.color} rounded-2xl mb-4 md:mb-6 shadow-md`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4 md:mb-6">{plan.description}</p>
                    
                    <div className="flex items-baseline gap-2 mb-6 md:mb-8">
                      <span className="text-3xl md:text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-500">MXN/{plan.period}</span>
                      {selectedCategory === 'distribuidores' && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 ${plan.color} rounded-full flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleStartNow}
                    className={`w-full ${plan.color} text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl transition-all duration-300 ${
                      isHovered ? 'scale-105 shadow-md' : 'hover:scale-105 hover:shadow-md'
                    } flex items-center justify-center gap-2`}
                  >
                    Comenzar Ahora
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {isHovered && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                    <Star className="w-2 h-2 md:w-3 md:h-3 text-yellow-800" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div 
          id="bottom-section"
          ref={el => sectionRefs.current[2] = el}
          className={`text-center mt-12 md:mt-16 transition-all duration-700 ease-out delay-300 ${
            visibleSections.includes('bottom-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              ¿Necesitas ayuda para elegir?
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6">
              Nuestro equipo te ayuda a seleccionar el plan perfecto para tu operación ganadera
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="https://wa.me/8144384806"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
              >
                💬 Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div 
          id="trust-section"
          ref={el => sectionRefs.current[3] = el}
          className={`flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-8 md:mt-12 text-gray-500 text-sm md:text-base transition-all duration-700 ease-out delay-500 ${
            visibleSections.includes('trust-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>+200 Ganaderos Activos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Costa de Chiapas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Soporte 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;