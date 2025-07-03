import React, { useState, useEffect } from 'react';
import { FiX, FiAlertCircle, FiPercent, FiShoppingBag, FiUserCheck, FiTruck, FiStar, FiTrendingUp, FiClock, FiGift, FiTarget, FiAward, FiHeart } from 'react-icons/fi';

const FloatingAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [alertQueue, setAlertQueue] = useState([]);

  // Lista expandida de alertas con diseño moderno
  const alertMessages = [
    {
      id: 1,
      message: '🔥 ¡Oferta Flash! 25% OFF en suplementos ganaderos - Solo por hoy',
      icon: <FiPercent className="text-amber-400 text-xl" />,
      bgGradient: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-300/50',
      accentColor: 'bg-amber-400',
      category: 'Oferta'
    },
    {
      id: 2,
      message: '🛒 Juan Pérez compró 50 fajas premium - ¡Quedan pocas!',
      icon: <FiShoppingBag className="text-blue-400 text-xl" />,
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-300/50',
      accentColor: 'bg-blue-400',
      category: 'Compra'
    },
    {
      id: 3,
      message: '📦 Nuevo stock: Sal mineralizada premium recién llegada',
      icon: <FiAlertCircle className="text-emerald-400 text-xl" />,
      bgGradient: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-emerald-300/50',
      accentColor: 'bg-emerald-400',
      category: 'Stock'
    },
    {
      id: 4,
      message: '👋 María González se unió como productora verificada',
      icon: <FiUserCheck className="text-purple-400 text-xl" />,
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-300/50',
      accentColor: 'bg-purple-400',
      category: 'Usuario'
    },
    {
      id: 5,
      message: '🚚 Envío gratis en pedidos superiores a $500 - Tiempo limitado',
      icon: <FiTruck className="text-indigo-400 text-xl" />,
      bgGradient: 'from-indigo-500/20 to-blue-500/20',
      borderColor: 'border-indigo-300/50',
      accentColor: 'bg-indigo-400',
      category: 'Envío'
    },
    {
      id: 6,
      message: '⭐ Producto más vendido: Vitaminas para ganado lechero',
      icon: <FiStar className="text-yellow-400 text-xl" />,
      bgGradient: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-300/50',
      accentColor: 'bg-yellow-400',
      category: 'Popular'
    },
    {
      id: 7,
      message: '📈 Ventas aumentaron 40% esta semana - ¡Únete al éxito!',
      icon: <FiTrendingUp className="text-green-400 text-xl" />,
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-300/50',
      accentColor: 'bg-green-400',
      category: 'Tendencia'
    },
    {
      id: 8,
      message: '⏰ Últimas 2 horas para aprovechar descuentos especiales',
      icon: <FiClock className="text-red-400 text-xl" />,
      bgGradient: 'from-red-500/20 to-pink-500/20',
      borderColor: 'border-red-300/50',
      accentColor: 'bg-red-400',
      category: 'Urgente'
    },
    {
      id: 9,
      message: '🎁 Regalo sorpresa por compras superiores a $300',
      icon: <FiGift className="text-pink-400 text-xl" />,
      bgGradient: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'border-pink-300/50',
      accentColor: 'bg-pink-400',
      category: 'Regalo'
    },
    {
      id: 10,
      message: '🎯 Objetivo del mes: 90% completado - ¡Sigamos así!',
      icon: <FiTarget className="text-cyan-400 text-xl" />,
      bgGradient: 'from-cyan-500/20 to-teal-500/20',
      borderColor: 'border-cyan-300/50',
      accentColor: 'bg-cyan-400',
      category: 'Meta'
    },
    {
      id: 11,
      message: '🏆 Cliente destacado: Pedro Martínez - 5 años de confianza',
      icon: <FiAward className="text-orange-400 text-xl" />,
      bgGradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-300/50',
      accentColor: 'bg-orange-400',
      category: 'Reconocimiento'
    },
    {
      id: 12,
      message: '💝 Programa de lealtad: Acumula puntos con cada compra',
      icon: <FiHeart className="text-rose-400 text-xl" />,
      bgGradient: 'from-rose-500/20 to-pink-500/20',
      borderColor: 'border-rose-300/50',
      accentColor: 'bg-rose-400',
      category: 'Lealtad'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Si no hay alertas activas, mostrar una nueva
      if (!currentAlert) {
        const availableAlerts = alertMessages.filter(alert => 
          !alerts.some(a => a.id === alert.id)
        );
        
        if (availableAlerts.length > 0) {
          const randomAlert = availableAlerts[Math.floor(Math.random() * availableAlerts.length)];
          setAlerts(prev => [...prev, randomAlert]);
          setCurrentAlert(randomAlert);
          setIsVisible(true);
          
          // Auto-hide después de 6 segundos
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              setCurrentAlert(null);
            }, 500);
          }, 6000);
        } else {
          // Reiniciar cuando se hayan mostrado todas
          setAlerts([]);
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [alerts, currentAlert]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentAlert(null);
    }, 500);
  };

  const handleClick = () => {
    // Efecto de click - podrías agregar navegación aquí
    console.log('Alert clicked:', currentAlert);
  };

  if (!currentAlert) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`transform transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}>
        <div 
          className={`
            relative overflow-hidden rounded-2xl backdrop-blur-md bg-gradient-to-br ${currentAlert.bgGradient}
            border ${currentAlert.borderColor} shadow-2xl max-w-sm cursor-pointer
            hover:shadow-3xl hover:scale-105 transition-all duration-300
            before:absolute before:inset-0 before:bg-white/10 before:backdrop-blur-sm
          `}
          onClick={handleClick}
        >
          {/* Barra de acento superior */}
          <div className={`absolute top-0 left-0 right-0 h-1 ${currentAlert.accentColor}`}></div>
          
          {/* Efecto de brillo animado */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
          
          <div className="relative p-5 flex items-start">
            {/* Icono con fondo glassmorphic */}
            <div className="mr-4 mt-1">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                {currentAlert.icon}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              {/* Categoría */}
              <div className="mb-2">
                <span className={`
                  inline-block px-2 py-1 rounded-full text-xs font-semibold
                  ${currentAlert.accentColor} text-white shadow-sm
                `}>
                  {currentAlert.category}
                </span>
              </div>
              
              {/* Mensaje */}
              <p className="text-sm font-medium text-gray-800 leading-relaxed">
                {currentAlert.message}
              </p>
              
              {/* Barra de progreso animada */}
              <div className="mt-3 w-full bg-white/30 rounded-full h-1">
                <div 
                  className={`${currentAlert.accentColor} h-1 rounded-full transition-all duration-6000 ease-linear`}
                  style={{ width: isVisible ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
            
            {/* Botón de cerrar mejorado */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="ml-3 p-2 rounded-full bg-white/20 hover:bg-white/30 text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-110"
            >
              <FiX className="text-sm" />
            </button>
          </div>
          
          {/* Partículas decorativas */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAlerts;