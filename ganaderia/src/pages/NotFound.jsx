import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      {/* Contenedor principal con animación */}
      <div className="text-center animate-pulse">
        {/* Icono de mantenimiento grande */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-orange-100 rounded-full flex items-center justify-center shadow-lg">
            <svg 
              className="w-16 h-16 text-orange-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
          {/* Círculos decorativos */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Número 404 estilizado */}
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 mb-4 drop-shadow-sm">
          404
        </h1>

        {/* Mensaje principal */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🔧 En Mantenimiento
        </h2>
        
        <p className="text-lg text-gray-600 mb-4 max-w-md mx-auto leading-relaxed">
          Estamos trabajando para mejorar tu experiencia. 
          <span className="block mt-2 font-semibold text-orange-600">
            ¡Pronto estaremos de regreso!
          </span>
        </p>

        {/* Mensaje adicional de mantenimiento */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 max-w-lg mx-auto">
          <div className="flex items-center justify-center space-x-2 text-orange-700">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-medium">Trabajando en mejoras...</span>
          </div>
          <p className="text-sm text-orange-600 mt-2 text-center">
            Tiempo estimado: Pocas horas
          </p>
        </div>

        {/* Iconos de estado de mantenimiento */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="flex items-center space-x-2 text-gray-500">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Mantenimiento programado</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Regresaremos pronto</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Volver al inicio
          </Link>
          
          <div className="pt-4">
            <button 
              onClick={() => window.history.back()} 
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Página anterior
            </button>
          </div>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-10 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-700"></div>
    </div>
  );
};

export default NotFound;