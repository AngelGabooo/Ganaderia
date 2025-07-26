import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Check, Zap, TrendingUp, Crown, ChevronRight, Star, X, User, Mail, FileText, ArrowLeft, 
  Building, Phone, MapPin, Users, Plus, Trash2, Package, Percent, Calendar, 
  Settings, LogOut, Eye, EyeOff, CreditCard, Lock, Home, Image
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Configuración de Stripe
const stripePromise = loadStripe('pk_test_51RhjdkQONMOKCmbZ3lQwmSRWGdqucTxFu2JMter2fFZrd5L4PE9Xbrefn9lyJ7kPeqqFeDnWUM4aynac3bwqT0Po00Urtmah2B');

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-green-600">GANARED</h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Volver al Inicio
          </button>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Bienvenido</p>
              <p className="font-semibold">{user.nombreEmpresa}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const PaymentForm = ({ plan, onPaymentSubmit, onBack, formData }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await processStripePayment();
    } catch (error) {
      console.error('Error en el pago:', error);
      alert('Ocurrió un error al procesar el pago. Por favor intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processStripePayment = async () => {
    const stripe = await stripePromise;
    
    // Mapeo de planes a IDs de producto de Stripe
    const planToStripeId = {
      'acumulador': 'prod_Se5hAyn9gVzaal',
      'vendedor': 'prod_Se5jceBB4zWcSa',
      'premium': 'prod_Se5ksC8qFoqubi'
    };
    
    const stripeProductId = planToStripeId[plan.id];
    
    if (!stripeProductId) {
      throw new Error('ID de producto de Stripe no configurado para este plan');
    }

    // Crear sesión de pago directamente desde el frontend (NO RECOMENDADO PARA PRODUCCIÓN)
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer sk_test_51RhjdkQONMOKCmbZUHVndanJ0P14pvBOb1Nnzy2qyZBScJfMpnx99oDW0cJP5FUF8vSaswE3kterhFTLkHKn5QiF00d3UdXxcK`
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'line_items[0][price_data][product]': stripeProductId,
        'line_items[0][price_data][currency]': 'mxn',
        'line_items[0][price_data][unit_amount]': plan.price * 100,
        'line_items[0][price_data][recurring][interval]': 'month',
        'line_items[0][quantity]': '1',
        'mode': 'subscription',
        'success_url': `${window.location.origin}/suscripciones?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${window.location.origin}/suscripciones?payment_canceled=true`,
        'customer_email': formData.email,
        'metadata[plan_id]': plan.id,
        'metadata[plan_name]': plan.name,
        'metadata[empresa]': formData.nombreEmpresa
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear sesión de pago');
    }

    const session = await response.json();

    // Redirigir a Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      throw result.error;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-2xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Información de Pago</h4>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Serás redirigido a la plataforma segura de Stripe para completar el pago.</p>
              <p className="text-sm text-gray-500">Tarjetas aceptadas: Visa, Mastercard, American Express</p>
            </div>
          </div>
          
          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className={`px-6 py-3 ${plan.color} text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center justify-center gap-2 ${isProcessing ? 'opacity-75' : ''}`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pagar ${plan.price} MXN
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Lock className="w-4 h-4 text-green-500" />
        <span>Pago seguro encriptado con SSL. Tus datos están protegidos.</span>
      </div>
    </div>
  );
};

const SubscriptionPlans = ({ onPurchase, user }) => { // Añadimos 'user' como prop
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    email: '',
    telefono: '',
    direccion: '',
    descripcion: '',
    publicaciones: 1
  });
  const [formStep, setFormStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('pequeñas');
  const sectionRefs = useRef([]);
  const navigate = useNavigate(); // Añadimos useNavigate para la navegación

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

  const basePlans = [
    {
      id: 'acumulador',
      name: 'Plan Acumulador',
      smallPrice: 1500,
      distributorPrice: 300,
      period: 'mes',
      description: 'Para ganaderos que producen constantemente',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      badge: 'Más Popular',
      badgeColor: 'bg-green-100 text-green-800',
      maxPublicaciones: 5,
      maxClientes: 50,
      ofertas: [
        'Publicación fija todo el mes',
        'Renovación automática mensual',
        'Alertas semanales de precios bajos',
        'Precios exclusivos de proveedores',
        'Tips de conservación y manejo',
        'Gestión de hasta 50 clientes',
        'Dashboard empresarial básico'
      ]
    },
    {
      id: 'vendedor',
      name: 'Plan Vendedor Rápido',
      smallPrice: 25250,
      distributorPrice: 500,
      period: 'mes',
      description: 'Ideal para ventas urgentes y rápidas',
      icon: Zap,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      badge: 'Recomendado',
      badgeColor: 'bg-blue-100 text-blue-800',
      maxPublicaciones: 10,
      maxClientes: 100,
      ofertas: [
        'Publicación destacada por 7 días',
        'Promoción en 5 grupos de WhatsApp',
        'Etiqueta "¡Producto Urgente!"',
        'Notificaciones a compradores activos',
        'Precios exclusivos de proveedores',
        'Tips semanales de ventas',
        'Gestión de hasta 100 clientes',
        'Dashboard empresarial avanzado',
        'Sistema de ofertas y descuentos'
      ]
    },
    {
      id: 'premium',
      name: 'Plan Oferta Especial',
      smallPrice: 50000,
      distributorPrice: 200000,
      period: 'mes',
      description: 'Máxima exposición para distribuidores grandes',
      icon: Crown,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      badge: 'Premium',
      badgeColor: 'bg-purple-100 text-purple-800',
      maxPublicaciones: 25,
      maxClientes: 'ilimitados',
      ofertas: [
        'Publicación destacada en portada',
        'Banner "Oferta de la Semana"',
        'Promoción por email y WhatsApp',
        'Difusión activa por 3 días',
        'Sello de confianza premium',
        'Acceso preferencial a compradores',
        'Mención en ferias y eventos',
        'Tips y alertas semanales completas',
        'Clientes ilimitados',
        'Dashboard empresarial premium',
        'Sistema completo de ofertas',
        'Soporte prioritario 24/7',
        'Reportes y análisis avanzados'
      ]
    }
  ];

  // Generar planes con precios según la categoría seleccionada
  const plans = basePlans.map(plan => ({
    ...plan,
    price: selectedCategory === 'pequeñas' ? plan.smallPrice : plan.distributorPrice
  }));

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
    setFormStep(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStep(2);
  };

  const handlePaymentSubmit = (paymentInfo) => {
    const userData = {
      ...formData,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      planPrice: selectedPlan.price,
      fechaRegistro: new Date().toISOString().split('T')[0],
      paymentMethod: paymentInfo.metodo
    };
    onPurchase(userData);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPlan(null);
  };

 return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
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
            Solo para Empresas - Compradores Gratis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🏭 Planes de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Suscripción Empresarial</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Impulsa tu empresa agropecuaria con nuestros planes diseñados específicamente para la costa de Chiapas. 
            <span className="font-semibold text-green-600"> Obtén mayor visibilidad, gestiona clientes y crea ofertas especiales.</span>
          </p>
          
          {/* Selector de categoría */}
          <div className="flex justify-center my-8">
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
          
          {/* Descripción de categoría */}
          <div className="max-w-2xl mx-auto">
            {selectedCategory === 'pequeñas' ? (
              <p className="text-green-700 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                <strong>Pequeñas empresas:</strong> Precios accesibles para productores locales con necesidades básicas de publicación y gestión.
              </p>
            ) : (
              <p className="text-blue-700 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                <strong>Distribuidores:</strong> Planes con mayor capacidad y beneficios exclusivos para empresas con alto volumen de ventas.
              </p>
            )}
          </div>

          {/* Botón para ir al Dashboard (visible solo si el usuario está logueado) */}
          {user && (
            <div className="mt-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                Ir al Dashboard Empresarial
              </button>
            </div>
          )}
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
                className={`relative group transition-all duration-300 ${isMiddle ? 'md:-translate-y-4' : ''}`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                <div className={`relative bg-white rounded-3xl p-6 md:p-8 shadow-lg transition-all duration-300 ${isHovered ? 'scale-105 shadow-xl' : 'hover:shadow-xl'} ${isMiddle ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
                  {plan.badge && (
                    <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 ${plan.badgeColor} rounded-full text-sm font-semibold`}>
                      {plan.badge}
                    </div>
                  )}
                  
                  {/* Indicador de categoría */}
                  <div className={`absolute -top-2 -right-2 px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedCategory === 'pequeñas' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedCategory === 'pequeñas' ? 'PEQ' : 'DIST'}
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
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{plan.maxPublicaciones}</div>
                        <div className="text-xs text-gray-600">Publicaciones</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{plan.maxClientes}</div>
                        <div className="text-xs text-gray-600">Clientes</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    {plan.ofertas.slice(0, 5).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 ${plan.color} rounded-full flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                    {plan.ofertas.length > 5 && (
                      <div className="text-sm text-gray-500 pl-8">
                        +{plan.ofertas.length - 5} características más...
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => handlePlanSelect(plan)}
                    className={`w-full ${plan.color} text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl transition-all duration-300 ${isHovered ? 'scale-105 shadow-md' : 'hover:scale-105 hover:shadow-md'} flex items-center justify-center gap-2`}
                  >
                    Seleccionar Plan
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
              ¿Necesitas ayuda para elegir el plan empresarial?
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6">
              Nuestro equipo te asesorará para seleccionar el mejor plan según el tamaño y necesidades de tu empresa
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-xl font-semibold transition-colors">
                💬 Contactar por WhatsApp
              </button>
              <button className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-6 py-2 md:px-8 md:py-3 rounded-xl font-semibold transition-colors">
                📞 Llamar Ahora
              </button>
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
            <span>+50 Empresas Registradas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Costa de Chiapas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Soporte Empresarial</span>
          </div>
        </div>
      </div>

      {showForm && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white rounded-t-3xl p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={closeForm}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Volver</span>
                </button>
                <button
                  onClick={closeForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-gray-900">Registro Empresarial</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`p-2 ${selectedPlan.color} rounded-lg`}>
                    <selectedPlan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedPlan.name}</h3>
                    <p className="text-sm text-gray-600">${selectedPlan.price} MXN/mes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {formStep === 1 ? (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Información de la Empresa
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre de la Empresa *
                        </label>
                        <input
                          type="text"
                          name="nombreEmpresa"
                          value={formData.nombreEmpresa}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          placeholder="Ej: Agrícola San Juan S.A."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Correo Empresarial *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          placeholder="contacto@tuempresa.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Teléfono de Contacto *
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          placeholder="962-123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FileText className="w-4 h-4 inline mr-2" />
                          Publicaciones Mensuales *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="publicaciones"
                            value={formData.publicaciones}
                            onChange={handleInputChange}
                            min="1"
                            max={selectedPlan.maxPublicaciones}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                            máx. {selectedPlan.maxPublicaciones}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Dirección Completa *
                      </label>
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="Calle, Número, Colonia, Ciudad, CP"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción de la Empresa
                      </label>
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="Describe brevemente tu empresa y los productos que ofreces..."
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Resumen del Plan Seleccionado</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Plan:</span>
                          <span className="font-medium">{selectedPlan.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Precio:</span>
                          <span className="font-medium">${selectedPlan.price} MXN/mes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Publicaciones:</span>
                          <span className="font-medium">{formData.publicaciones} de {selectedPlan.maxPublicaciones}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Clientes:</span>
                          <span className="font-medium">Hasta {selectedPlan.maxClientes}</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Incluye:</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {selectedPlan.ofertas.slice(0, 4).map((oferta, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="w-3 h-3 text-green-500" />
                              {oferta}
                            </li>
                          ))}
                          {selectedPlan.ofertas.length > 4 && (
                            <li className="text-xs text-gray-500">
                              +{selectedPlan.ofertas.length - 4} beneficios más
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className={`w-full ${selectedPlan.color} text-white font-semibold py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-md`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ChevronRight className="w-5 h-5" />
                      Continuar al Pago
                    </div>
                  </button>
                </>
              ) : (
                <PaymentForm 
                  plan={selectedPlan} 
                  onPaymentSubmit={handlePaymentSubmit}
                  onBack={() => setFormStep(1)}
                  formData={formData}
                />
              )}
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">
                  Al registrarte, aceptas nuestros términos y condiciones
                </p>
                <p className="text-xs text-gray-500">
                  🔒 Pago seguro • 💳 Acepta todas las tarjetas • 📱 Soporte 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BusinessDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan Pérez", email: "juan@email.com", telefono: "962-123-4567", fechaRegistro: "2024-01-15" },
    { id: 2, nombre: "María García", email: "maria@email.com", telefono: "962-765-4321", fechaRegistro: "2024-01-20" }
  ]);
  const [ofertas, setOfertas] = useState([
    { id: 1, titulo: "Maíz Premium", descripcion: "Maíz de alta calidad", precio: 8500, descuento: 15, activa: true, fechaVencimiento: "2024-02-15", imagen: null },
    { id: 2, titulo: "Frijol Orgánico", descripcion: "Frijol orgánico certificado", precio: 12000, descuento: 20, activa: true, fechaVencimiento: "2024-02-20", imagen: null }
  ]);
  const [showClienteForm, setShowClienteForm] = useState(false);
  const [showOfertaForm, setShowOfertaForm] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', email: '', telefono: '' });
  const [nuevaOferta, setNuevaOferta] = useState({ 
    titulo: '', 
    descripcion: '', 
    precio: '', 
    descuento: '', 
    fechaVencimiento: '',
    imagen: null,
    imagenPreview: null 
  });

  const planFeatures = {
    'acumulador': {
      maxClientes: 50,
      maxOfertas: 5,
      features: ['Publicación fija todo el mes', 'Renovación automática', 'Alertas de precios', 'Precios exclusivos', 'Tips de conservación']
    },
    'vendedor': {
      maxClientes: 100,
      maxOfertas: 10,
      features: ['Publicación destacada 7 días', 'Promoción WhatsApp', 'Etiqueta urgente', 'Notificaciones activas', 'Precios exclusivos', 'Tips de ventas']
    },
    'premium': {
      maxClientes: 'ilimitados',
      maxOfertas: 25,
      features: ['Publicación en portada', 'Banner semanal', 'Promoción email/WhatsApp', 'Difusión 3 días', 'Sello premium', 'Acceso preferencial', 'Mención en eventos', 'Tips completos']
    }
  };

  const currentPlanFeatures = planFeatures[user.planId] || planFeatures['acumulador'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen debe ser menor a 2MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setNuevaOferta(prev => ({
          ...prev,
          imagen: file,
          imagenPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const agregarCliente = () => {
    if (nuevoCliente.nombre && nuevoCliente.email && nuevoCliente.telefono) {
      setClientes([...clientes, {
        id: Date.now(),
        ...nuevoCliente,
        fechaRegistro: new Date().toISOString().split('T')[0]
      }]);
      setNuevoCliente({ nombre: '', email: '', telefono: '' });
      setShowClienteForm(false);
    }
  };

  const agregarOferta = () => {
    if (nuevaOferta.titulo && nuevaOferta.descripcion && nuevaOferta.precio) {
      setOfertas([...ofertas, {
        id: Date.now(),
        ...nuevaOferta,
        precio: parseFloat(nuevaOferta.precio),
        descuento: parseFloat(nuevaOferta.descuento) || 0,
        activa: true,
        imagen: nuevaOferta.imagenPreview
      }]);
      setNuevaOferta({ 
        titulo: '', 
        descripcion: '', 
        precio: '', 
        descuento: '', 
        fechaVencimiento: '',
        imagen: null,
        imagenPreview: null 
      });
      setShowOfertaForm(false);
    }
  };

  const eliminarCliente = (id) => {
    setClientes(clientes.filter(c => c.id !== id));
  };

  const eliminarOferta = (id) => {
    setOfertas(ofertas.filter(o => o.id !== id));
  };

  const toggleOferta = (id) => {
    setOfertas(ofertas.map(o => o.id === id ? { ...o, activa: !o.activa } : o));
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: TrendingUp },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'ofertas', label: 'Ofertas', icon: Package },
    { id: 'perfil', label: 'Perfil', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            user.planId === 'premium' ? 'bg-purple-100 text-purple-800' :
            user.planId === 'vendedor' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            <Crown className="w-4 h-4" />
            Plan {user.planName} - Activo
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex space-x-0 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Clientes</p>
                    <p className="text-2xl font-bold text-gray-900">{clientes.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ofertas Activas</p>
                    <p className="text-2xl font-bold text-gray-900">{ofertas.filter(o => o.activa).length}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Plan Actual</p>
                    <p className="text-2xl font-bold text-gray-900">{user.planName}</p>
                  </div>
                  <Crown className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Características de tu Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPlanFeatures.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Información de Pago</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Método de pago:</span>
                  <span className="font-medium">{user.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">{user.planName} (${user.planPrice} MXN/mes)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Próxima renovación:</span>
                  <span className="font-medium">1 de {new Date().toLocaleString('es-MX', { month: 'long' })}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'clientes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestión de Clientes</h2>
              <button
                onClick={() => setShowClienteForm(true)}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar Cliente
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <p className="text-sm text-gray-600">
                  Clientes: {clientes.length} / {currentPlanFeatures.maxClientes === 'ilimitados' ? '∞' : currentPlanFeatures.maxClientes}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-700">Nombre</th>
                      <th className="text-left p-4 font-medium text-gray-700">Email</th>
                      <th className="text-left p-4 font-medium text-gray-700">Teléfono</th>
                      <th className="text-left p-4 font-medium text-gray-700">Fecha Registro</th>
                      <th className="text-left p-4 font-medium text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map(cliente => (
                      <tr key={cliente.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{cliente.nombre}</td>
                        <td className="p-4">{cliente.email}</td>
                        <td className="p-4">{cliente.telefono}</td>
                        <td className="p-4">{cliente.fechaRegistro}</td>
                        <td className="p-4">
                          <button
                            onClick={() => eliminarCliente(cliente.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'ofertas' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestión de Ofertas</h2>
              <button
                onClick={() => setShowOfertaForm(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nueva Oferta
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-4">
                Ofertas: {ofertas.length} / {currentPlanFeatures.maxOfertas}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ofertas.map(oferta => (
                  <div key={oferta.id} className="border rounded-lg p-4">
                    {oferta.imagen && (
                      <img 
                        src={oferta.imagen} 
                        alt={oferta.titulo} 
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{oferta.titulo}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleOferta(oferta.id)}
                          className={`p-1 rounded ${oferta.activa ? 'text-green-500' : 'text-gray-400'}`}
                        >
                          {oferta.activa ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => eliminarOferta(oferta.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{oferta.descripcion}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold">${oferta.precio}</span>
                        {oferta.descuento > 0 && (
                          <span className="text-sm text-green-600 ml-2">-{oferta.descuento}%</span>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        oferta.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {oferta.activa ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'perfil' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Perfil de la Empresa</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  {user.logo ? (
                    <img src={user.logo} alt="Logo" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <Building className="w-8 h-8 text-green-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user.nombreEmpresa}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Empresa</label>
                  <p className="text-gray-900">{user.nombreEmpresa}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <p className="text-gray-900">{user.telefono}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                  <p className="text-gray-900">{user.direccion}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Actual</label>
                  <p className="text-gray-900">{user.planName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago</label>
                  <p className="text-gray-900">{user.paymentMethod}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Registro</label>
                  <p className="text-gray-900">{user.fechaRegistro}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showClienteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Agregar Cliente</h3>
              <button onClick={() => setShowClienteForm(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={nuevoCliente.nombre}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={nuevoCliente.email}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={nuevoCliente.telefono}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, telefono: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowClienteForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={agregarCliente}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
      {showOfertaForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Nueva Oferta</h3>
              <button onClick={() => setShowOfertaForm(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={nuevaOferta.titulo}
                  onChange={(e) => setNuevaOferta({...nuevaOferta, titulo: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={nuevaOferta.descripcion}
                  onChange={(e) => setNuevaOferta({...nuevaOferta, descripcion: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del Producto</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Image className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {nuevaOferta.imagenPreview && (
                  <div className="mt-2">
                    <img 
                      src={nuevaOferta.imagenPreview} 
                      alt="Vista previa" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <input
                  type="number"
                  value={nuevaOferta.precio}
                  onChange={(e) => setNuevaOferta({...nuevaOferta, precio: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descuento (%)</label>
                <input
                  type="number"
                  value={nuevaOferta.descuento}
                  onChange={(e) => setNuevaOferta({...nuevaOferta, descuento: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
                <input
                  type="date"
                  value={nuevaOferta.fechaVencimiento}
                  onChange={(e) => setNuevaOferta({...nuevaOferta, fechaVencimiento: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowOfertaForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={agregarOferta}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Crear Oferta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Subscriptions = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verificar parámetros de la URL para el éxito del pago
    const params = new URLSearchParams(location.search);
    const paymentSuccess = params.get('payment_success') === 'true';

    // Obtener datos del usuario desde localStorage
    const storedUser = localStorage.getItem('userData');
    let userData = storedUser ? JSON.parse(storedUser) : null;

    if (paymentSuccess && userData) {
      // Actualizar el estado del usuario para reflejar la suscripción
      userData = {
        ...userData,
        isSubscribed: true,
        subscriptionDate: new Date().toISOString(),
        nextRenewal: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      // Limpiar los parámetros de la URL
      navigate('/suscripciones', { replace: true });
    } else if (userData) {
      setUser(userData);
    } else {
      // Si no hay usuario, redirigir a login
      navigate('/login', { state: { from: '/suscripciones' } });
    }

    setIsLoading(false);
  }, [navigate, location]);

  const handlePurchase = (userData) => {
  const userWithPlan = {
    ...userData,
    isSubscribed: true,
    subscriptionDate: new Date().toISOString(),
    nextRenewal: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    planId: userData.planId,
    planName: userData.planName,
    planPrice: userData.planPrice,
    paymentMethod: userData.paymentMethod || 'Stripe',
    fechaRegistro: userData.fechaRegistro || new Date().toISOString().split('T')[0],
  };
  localStorage.setItem('userData', JSON.stringify(userWithPlan));
  setUser(userWithPlan);
};

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/login');
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

 if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-gray-600">Cargando...</div>
    </div>
  );
}

return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      {user?.isSubscribed ? (
        <BusinessDashboard user={user} onLogout={handleLogout} />
      ) : (
        <SubscriptionPlans onPurchase={handlePurchase} user={user} /> 
      )}
    </div>
  );
};

export default Subscriptions;