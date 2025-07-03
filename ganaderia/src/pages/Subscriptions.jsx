import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, Zap, TrendingUp, Crown, ChevronRight, Star, X, User, Mail, FileText, ArrowLeft, 
  Building, Phone, MapPin, Users, Plus, Trash2, Package, Percent, Calendar, 
  Settings, LogOut, Eye, EyeOff, CreditCard, Lock, Home, Image
} from 'lucide-react';

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

const AcceptedCards = () => (
  <div className="flex items-center justify-center gap-3 mt-4">
    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-6" />
      <span className="text-xs">Visa</span>
    </div>
    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" className="h-6" />
      <span className="text-xs">Mastercard</span>
    </div>
    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/americanexpress/americanexpress-original.svg" alt="Amex" className="h-6" />
      <span className="text-xs">Amex</span>
    </div>
  </div>
);

const CardEffect = ({ cardData }) => {
  const [flipped, setFlipped] = useState(false);
  const [cardType, setCardType] = useState('');

  useEffect(() => {
    const cleaned = cardData.cardNumber.replace(/\s+/g, '');
    if (/^4/.test(cleaned)) {
      setCardType('visa');
    } else if (/^5[1-5]/.test(cleaned)) {
      setCardType('mastercard');
    } else if (/^3[47]/.test(cleaned)) {
      setCardType('amex');
    } else {
      setCardType('');
    }
  }, [cardData.cardNumber]);

  return (
    <div className="perspective-1000 mb-8">
      <div 
        className={`relative w-full max-w-md h-56 transition-all duration-500 ease-in-out ${flipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={() => cardData.cvc && setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div 
          className={`absolute w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl p-6 flex flex-col justify-between ${flipped ? 'opacity-0' : 'opacity-100'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-start">
            {cardType === 'visa' && (
              <img 
                src="https://img.icons8.com/color/512/visa.png" 
                alt="Visa" 
                className="h-10 opacity-90" 
              />
            )}
            {cardType === 'mastercard' && (
              <img 
                src="https://w7.pngwing.com/pngs/92/785/png-transparent-mastercard-logo-mastercard-credit-card-payment-visa-nyse-ma-mastercard-logo-text-logo-sign.png" 
                alt="Mastercard" 
                className="h-10 opacity-90" 
              />
            )}
            {cardType === 'amex' && (
              <img 
                src="https://w7.pngwing.com/pngs/745/624/png-transparent-american-express-logo-credit-card-payment-credit-card-blue-text-label-thumbnail.png" 
                alt="Amex" 
                className="h-10 opacity-90" 
              />
            )}
            <div className="text-white text-sm">
              {cardData.expiryDate || 'MM/AA'}
            </div>
          </div>
          <div className="text-white text-2xl font-mono tracking-wider">
            {cardData.cardNumber || '•••• •••• •••• ••••'}
          </div>
          <div className="flex justify-between items-end">
            <div className="text-white uppercase text-lg">
              {cardData.cardName || 'NOMBRE EN TARJETA'}
            </div>
            <div className="text-white text-xs">
              {cardType === 'amex' ? 'AMERICAN EXPRESS' : 'DEBIT/CREDIT'}
            </div>
          </div>
        </div>
        <div 
          className={`absolute w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 flex flex-col justify-between ${flipped ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <div className="h-8 bg-black w-full mt-4"></div>
          <div className="bg-gray-200 h-10 rounded flex items-center px-4">
            <div className="text-black font-mono text-sm">
              {cardData.cvc ? '•••' : 'CVC'}
            </div>
          </div>
          <div className="flex justify-end">
            {cardType === 'visa' && (
              <img 
                src="https://img.icons8.com/color/512/visa.png" 
                alt="Visa" 
                className="h-8 opacity-90" 
              />
            )}
            {cardType === 'mastercard' && (
              <img 
                src="https://w7.pngwing.com/pngs/92/785/png-transparent-mastercard-logo-mastercard-credit-card-payment-visa-nyse-ma-mastercard-logo-text-logo-sign.png" 
                alt="Mastercard" 
                className="h-8 opacity-90" 
              />
            )}
            {cardType === 'amex' && (
              <img 
                src="https://w7.pngwing.com/pngs/745/624/png-transparent-american-express-logo-credit-card-payment-credit-card-blue-text-label-thumbnail.png" 
                alt="Amex" 
                className="h-8 opacity-90" 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccess = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h3>
      <p className="text-gray-600 mb-6">Tu suscripción ha sido activada correctamente.</p>
      <div className="animate-bounce mb-6">
        <div className="w-16 h-16 mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Continuar al Dashboard
      </button>
    </div>
  </div>
);

const PaymentForm = ({ plan, onPaymentSubmit, isSubmitting }) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvc: ''
  });
  const [errors, setErrors] = useState({});
  const [saveCard, setSaveCard] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showServiceUnavailable, setShowServiceUnavailable] = useState(false);

  const getCardType = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s+/g, '');
    if (/^4/.test(cleaned)) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
    if (/^3[47]/.test(cleaned)) return 'American Express';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!cardData.cardNumber.trim() || cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Número de tarjeta inválido (16 dígitos)';
    }
    if (!cardData.cardName.trim()) {
      newErrors.cardName = 'Nombre en la tarjeta es requerido';
    }
    if (!cardData.expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Fecha de expiración inválida (MM/AA)';
    }
    if (!cardData.cvc.trim() || cardData.cvc.length !== 3) {
      newErrors.cvc = 'CVC inválido (3 dígitos)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowServiceUnavailable(true); // Mostrar el aviso
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardData(prev => ({ ...prev, expiryDate: formatted }));
  };

  return (
    <div className="space-y-6">
      <CardEffect cardData={cardData} />
      <div className="bg-gray-50 rounded-2xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Información de Pago</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Tarjeta *
            </label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={`w-full px-4 py-3 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
              />
              {cardData.cardNumber.replace(/\s/g, '').length > 0 && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {getCardType(cardData.cardNumber) === 'Visa' && (
                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6" />
                  )}
                  {getCardType(cardData.cardNumber) === 'Mastercard' && (
                    <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" className="h-6" />
                  )}
                  {getCardType(cardData.cardNumber) === 'American Express' && (
                    <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" className="h-6" />
                  )}
                </div>
              )}
            </div>
            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre en la Tarjeta *
            </label>
            <input
              type="text"
              name="cardName"
              value={cardData.cardName}
              onChange={handleChange}
              placeholder="JUAN PEREZ"
              className={`w-full px-4 py-3 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
            />
            {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Expiración (MM/AA) *
              </label>
              <input
                type="text"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/AA"
                maxLength="5"
                className={`w-full px-4 py-3 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
              />
              {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código CVC *
              </label>
              <input
                type="text"
                name="cvc"
                value={cardData.cvc}
                onChange={handleChange}
                placeholder="123"
                maxLength="3"
                className={`w-full px-4 py-3 border ${errors.cvc ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
              />
              {errors.cvc && <p className="mt-1 text-sm text-red-600">{errors.cvc}</p>}
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              checked={saveCard}
              onChange={() => setSaveCard(!saveCard)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
              Guardar esta tarjeta para futuros pagos
            </label>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Lock className="w-4 h-4 text-green-500" />
        <span>Pago seguro encriptado con SSL. Aceptamos todas las tarjetas principales.</span>
          <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6" />
  <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" className="h-6" />
  <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" className="h-6" />

      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full ${plan.color} text-white font-semibold py-4 rounded-2xl transition-all duration-300 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-md'
        }`}
      >
        {isSubmitting ? (
         <div className="flex items-center gap-2 text-sm text-gray-500">
  <Lock className="w-4 h-4 text-green-500" />
          Procesando pago...
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
</div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            Pagar ${plan.price} MXN
          </div>
        )}
      </button>
      {showSuccess && <PaymentSuccess onClose={() => setShowSuccess(false)} />}
      {showServiceUnavailable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Servicio no disponible</h3>
            <p className="text-gray-600 mb-6">
              El pago con tarjeta no está disponible por el momento.<br />
              <span className="font-semibold text-green-600">No se realizará ningún cobro.</span><br />
              Puedes disfrutar el servicio gratis.
            </p>
            <button
              onClick={() => {
                setShowServiceUnavailable(false);
                // Llama a la función para activar el usuario y mostrar el dashboard
                onPaymentSubmit({
                  ...cardData,
                  saveCard,
                  metodo: 'Tarjeta (servicio no disponible)'
                });
                setShowSuccess(true); // Opcional: puedes mostrar el modal de éxito si lo deseas
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SubscriptionPlans = ({ onPurchase }) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);
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

  const plans = [
    {
      id: 'acumulador',
      name: 'Plan Acumulador',
      price: 150,
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
      price: 250,
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
      price: 500,
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

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      nombreEmpresa: '',
      email: '',
      telefono: '',
      direccion: '',
      descripcion: '',
      publicaciones: 1
    });
    setFormStep(1);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.nombreEmpresa.trim() || !formData.email.trim() || !formData.telefono.trim() || !formData.direccion.trim()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor ingresa un correo electrónico válido');
      return;
    }
    setFormStep(2);
  };

  const handlePaymentSubmit = (paymentInfo) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const userData = {
        nombreEmpresa: formData.nombreEmpresa,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        descripcion: formData.descripcion,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        publicaciones: formData.publicaciones,
        fechaRegistro: new Date().toISOString().split('T')[0],
        logo: null,
        paymentMethod: paymentInfo.saveCard ? 
          `Tarjeta guardada (${paymentInfo.cardNumber.slice(-4)})` : 
          `Tarjeta de crédito/débito (${paymentInfo.cardNumber.slice(-4)})`
      };
      onPurchase(userData);
      setIsSubmitting(false);
      setShowForm(false);
      setSelectedPlan(null);
      setFormData({ nombreEmpresa: '', email: '', telefono: '', direccion: '', descripcion: '', publicaciones: 1 });
      setFormStep(1);
    }, 3000);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPlan(null);
    setFormData({ nombreEmpresa: '', email: '', telefono: '', direccion: '', descripcion: '', publicaciones: 1 });
    setFormStep(1);
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
                  isSubmitting={isSubmitting} 
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

const AgroChiapasBusinessApp = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePurchase = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Cargando GANARED</h2>
          <p className="text-gray-600">Preparando tu experiencia empresarial...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <BusinessDashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SubscriptionPlans onPurchase={handlePurchase} />
    </div>
  );
};

export default AgroChiapasBusinessApp;