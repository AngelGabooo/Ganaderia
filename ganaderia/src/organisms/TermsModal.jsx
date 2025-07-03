import React, { useState, useEffect } from 'react';
import { FiX, FiCheck, FiFileText, FiShield } from 'react-icons/fi';

const TermsAndConditionsModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    const termsAccepted = localStorage.getItem('termsAccepted');
    
    if (!termsAccepted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', 'true');
    localStorage.setItem('termsAcceptedDate', new Date().toISOString());
    setHasAccepted(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleDecline = () => {
    // Redirigir a Google cuando se rechazan los términos
    window.location.href = 'https://www.google.com';
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay café arena semitransparente */}
      <div className="absolute inset-0 bg-amber-900/80 backdrop-blur-sm" />
      
      {/* Modal con diseño café arena */}
      <div className={`
        relative bg-amber-50 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border-2 border-amber-200
        transform transition-all duration-300 ease-out
        ${hasAccepted ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
      `}>
        {/* Header con gradiente café */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FiShield className="h-6 w-6 text-amber-100" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Términos y Condiciones</h2>
                <p className="text-amber-100 text-sm">Política de Privacidad y Uso</p>
              </div>
            </div>
            <button
              onClick={handleDecline}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Cerrar"
            >
              <FiX className="h-5 w-5 text-amber-100" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose prose-sm max-w-none">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <FiFileText className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-amber-900">Bienvenido a nuestra plataforma</h3>
              </div>
              <p className="text-amber-800 leading-relaxed">
                Para brindarte la mejor experiencia, necesitamos que aceptes nuestros términos y condiciones. 
                Tu privacidad y seguridad son nuestra prioridad.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-amber-100/50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-2">🔒 Privacidad y Datos</h4>
                <ul className="list-disc list-inside space-y-1 text-amber-800">
                  <li>Protegemos tu información personal con los más altos estándares de seguridad</li>
                  <li>No compartimos tus datos con terceros sin tu consentimiento</li>
                  <li>Utilizamos cookies solo para mejorar tu experiencia de navegación</li>
                </ul>
              </div>

              <div className="bg-amber-100/50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-2">🛒 Uso de la Plataforma</h4>
                <ul className="list-disc list-inside space-y-1 text-amber-800">
                  <li>Acceso a productos y servicios de empresas verificadas</li>
                  <li>Información actualizada sobre precios y disponibilidad</li>
                  <li>Soporte técnico y atención al cliente</li>
                </ul>
              </div>

              <div className="bg-amber-100/50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-2">⚖️ Responsabilidades</h4>
                <ul className="list-disc list-inside space-y-1 text-amber-800">
                  <li>Usar la plataforma de manera responsable y legal</li>
                  <li>Proporcionar información veraz en tu perfil</li>
                  <li>Respetar los derechos de otros usuarios y empresas</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-200/50 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-amber-900 text-sm">
                <strong>Nota:</strong> Al aceptar estos términos, confirmas que tienes al menos 18 años 
                y que has leído y comprendido nuestras políticas de privacidad.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-amber-100/30 px-6 py-4 border-t border-amber-200">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={handleDecline}
              className="px-6 py-2 border border-amber-400 text-amber-900 rounded-lg hover:bg-amber-200 transition-colors font-medium"
            >
              Rechazar y Salir
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <FiCheck className="h-4 w-4" />
              <span>Aceptar y Continuar</span>
            </button>
          </div>
          
          <div className="mt-3 text-center">
            <p className="text-xs text-amber-800">
              ¿Necesitas más información? 
              <a href="/faq" className="text-amber-700 hover:text-amber-900 ml-1 underline">
                Consulta nuestras FAQ
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;