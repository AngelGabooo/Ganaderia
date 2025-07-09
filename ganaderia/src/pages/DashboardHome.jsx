import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const user = JSON.parse(localStorage.getItem('userData'));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Panel de Control</h1>
        
        {user?.isSubscribed ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Suscripción Activa</h3>
                <p className="text-sm text-green-600">Plan: {user.planName} - ${user.planPrice}/mes</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">No tienes suscripción activa</h3>
                <p className="text-sm text-blue-600">Adquiere un plan para acceder a todas las funciones</p>
              </div>
            </div>
            <Link 
              to="/suscripciones" 
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Ver Planes
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/dashboard/perfil" 
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-800 mb-2">Mi Perfil</h3>
            <p className="text-sm text-gray-600">Administra tu información personal</p>
          </Link>
          
          <Link 
            to="/dashboard/suscripcion" 
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-800 mb-2">Mi Suscripción</h3>
            <p className="text-sm text-gray-600">Administra tu plan y método de pago</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;