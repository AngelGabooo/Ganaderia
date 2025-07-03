import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../organisms/Header';

const CompaniesPage = () => {
  // Datos de ejemplo de empresas
  const companies = [
    {
      id: 1,
      name: "ADM Nutrición Animal",
      logo: "https://www.pecuarios.club/empresas/Empresa_logo62214dc78da03_03032022.svg",
      description: "Líder en producción ganadera en Chiapas",
      address: "Avenida Ejército Nacional #843 B, piso 1, Col. Granada, CP. 11520, Alcaldía Miguel Hidalgo, CDMX.",
      phone: "(55) 5089-8500 Smart Center 800 507-4600",
      email: "nola-smartcenter@adm.com",
      category: "Ganadería"
    },
    {
      id: 2,
      name: "Virbac México",
      logo: "https://www.pecuarios.club/empresas/Empresa_logo5dba0f4c57fd7_30102019.svg",
      description: "Virbac se ha convertido en referencia dentro del sector farmacéutico",
      address: "Av. Inglaterra 5070 Guadalajara Technology Park, CP. 45010, Zapopan, Jalisco.",
      phone: "+52 (33) 5000-2500, +52 800 024 7575",
      category: "Farmacéutico"
    },
    {
      id: 3,
      name: "Pecuarius",
      logo: "https://www.pecuarios.club/empresas/Empresa_logo679c063e7a469_30012025.svg",
      description: "Pecuarius Laboratorios",
      address: "Calle Base, Providencia, CP. 85000, Cd. Obregón, Sonora.",
      phone: "+ 52 (644) 414 65 00",
      email: "info@veterinariaelcampo.com",
      category: "Salud Animal"
    },
 
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuestras <span className="text-green-600">Empresas Asociadas</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conoce a las empresas líderes en el sector agropecuario de la región
            </p>
          </div>

          {/* Grid de Empresas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <div 
                key={company.id} 
                className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-96"
              >
                {/* Contenido Principal (visible siempre) */}
                <div className="flex flex-col items-center p-8 h-full transition-all duration-300 group-hover:opacity-0">
                  <div className="w-32 h-32 mb-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-green-100">
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{company.name}</h3>
                  <p className="text-gray-500 text-center">{company.category}</p>
                </div>

                {/* Información Adicional (aparece en hover) */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{company.name}</h3>
                  <p className="text-gray-600 mb-4">{company.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">{company.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${company.phone}`} className="text-gray-700 hover:text-green-600">{company.phone}</a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${company.email}`} className="text-gray-700 hover:text-green-600">{company.email}</a>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/empresa/${company.id}`} 
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-center block"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA al final */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Eres una empresa y quieres aparecer aquí?</h3>
            <Link 
              to="/suscripciones" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Regístrate como Empresa
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompaniesPage;