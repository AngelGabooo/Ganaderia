import React, { useState, useEffect, useRef } from 'react';

const FeedCalculator = () => {
  // Datos de consumo y precios
  const PRODUCT_DATA = {
    'Fardos de pasto seco': {
      consumo: 10,    // kg/día por animal
      precio: 25,     // $ por fardo (20kg)
      unidad: 'kg',
      presentacion: 'fardos de 20kg'
    },
    'Fardos de alfalfa': {
      consumo: 8,
      precio: 35,
      unidad: 'kg',
      presentacion: 'fardos de 20kg'
    },
    'Sal mineralizada': {
      consumo: 0.1,
      precio: 15,
      unidad: 'kg',
      presentacion: 'kg'
    },
    'Melaza y suplementos': {
      consumo: 0.5,
      precio: 20,
      unidad: 'litros',
      presentacion: 'litro'
    }
  };

  const [formData, setFormData] = useState({
    cantidadAnimales: 10,
    diasAlimentacion: 30,
    productoSeleccionado: 'Fardos de pasto seco',
    presupuesto: 1000
  });

  const [resultado, setResultado] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'productoSeleccionado' ? value : Number(value)
    }));
  };

 const calcularAlimento = () => {
  const { cantidadAnimales, diasAlimentacion, productoSeleccionado, presupuesto } = formData;
  const producto = PRODUCT_DATA[productoSeleccionado];
  
  const consumoTotal = cantidadAnimales * producto.consumo * diasAlimentacion;
  const precioUnitario = producto.precio;
  let cantidadComprable = presupuesto / precioUnitario;
  let comprableEnUnidades = cantidadComprable;
  
  if (productoSeleccionado.includes('Fardos')) {
    comprableEnUnidades = Math.floor(cantidadComprable);
    cantidadComprable = comprableEnUnidades * 20;
  }

  setResultado({
    consumoTotal,
    cantidadComprable,
    comprableEnUnidades,
    suficiente: cantidadComprable >= consumoTotal,
    diferencia: Math.abs(cantidadComprable - consumoTotal),
    productoData: producto
  });

  // 👇 Fuerza visibilidad de la sección de resultados
  setVisibleSections((prev) => [...new Set([...prev, 'results-section'])]);
};


  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#FAF9F6] to-[#F4F1EA]">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div 
          id="header-section"
          ref={el => sectionRefs.current[0] = el}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            visibleSections.includes('header-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#8B5E3C] mb-3">
            Calculadora de Alimento
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Optimiza tu presupuesto y calcula exactamente cuánto alimento necesitas para tu ganado
          </p>
          <div className="w-20 h-1 bg-[#8B5E3C] mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* Form Container */}
        <div 
          id="form-section"
          ref={el => sectionRefs.current[1] = el}
          className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ease-out delay-150 ${
            visibleSections.includes('form-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Formulario */}
          <div className="p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Cantidad de animales
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="cantidadAnimales"
                    value={formData.cantidadAnimales}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] transition-all"
                  />
                  <span className="absolute right-3 top-3 text-gray-400">cabezas</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Período de alimentación
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="diasAlimentacion"
                    value={formData.diasAlimentacion}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] transition-all"
                  />
                  <span className="absolute right-3 top-3 text-gray-400">días</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de alimento
                </label>
                <select
                  name="productoSeleccionado"
                  value={formData.productoSeleccionado}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5rem]"
                >
                  {Object.keys(PRODUCT_DATA).map(producto => (
                    <option key={producto} value={producto}>{producto}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Presupuesto disponible
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-700">$</span>
                  <input
                    type="number"
                    name="presupuesto"
                    value={formData.presupuesto}
                    onChange={handleChange}
                    min="1"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] transition-all"
                  />
                </div>
              </div>
            </div>
            
            {/* Botón Café */}
            <button
              onClick={calcularAlimento}
              className="w-full bg-[#8B5E3C] hover:bg-[#A9745B] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#8B5E3C]/30 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Calcular necesidades
            </button>
          </div>
          
          {/* Resultados */}
          {resultado && (
            <div 
              id="results-section"
              ref={el => sectionRefs.current[2] = el}
              className={`border-t ${resultado.suficiente ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'} p-8 md:p-10 transition-all duration-700 ease-out delay-300 ${
                visibleSections.includes('results-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${resultado.suficiente ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} flex items-center justify-center mt-1`}>
                  {resultado.suficiente ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <path d="m9 11 3 3L22 4"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"/>
                      <path d="m6 6 12 12"/>
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${resultado.suficiente ? 'text-green-800' : 'text-red-800'}`}>
                    {resultado.suficiente ? 'Presupuesto suficiente' : 'Presupuesto insuficiente'}
                  </h3>
                  <p className={`${resultado.suficiente ? 'text-green-600' : 'text-red-600'}`}>
                    {resultado.suficiente ? 
                      'Tienes suficiente presupuesto para cubrir las necesidades de tu ganado' : 
                      'Necesitas más presupuesto o ajustar tu plan de alimentación'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
                  <p className="text-sm text-gray-500 mb-1">Consumo total estimado</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {resultado.consumoTotal.toFixed(1)} <span className="text-lg text-gray-500">{resultado.productoData.unidad}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Para {formData.cantidadAnimales} animales durante {formData.diasAlimentacion} días
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
                  <p className="text-sm text-gray-500 mb-1">Puedes comprar</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {resultado.comprableEnUnidades.toFixed(resultado.productoData.unidad === 'kg' ? 1 : 0)} <span className="text-lg text-gray-500">{resultado.productoData.presentacion}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    ({resultado.cantidadComprable.toFixed(1)} {resultado.productoData.unidad})
                  </p>
                </div>
              </div>
              
              <div className={`p-5 rounded-xl ${resultado.suficiente ? 'bg-green-100/50 border border-green-200' : 'bg-red-100/50 border border-red-200'} transition-all duration-300 hover:shadow-sm`}>
                <p className="font-medium mb-2">
                  {resultado.suficiente ? (
                    <span className="text-green-700">Tendrás un excedente de:</span>
                  ) : (
                    <span className="text-red-700">Te faltará aproximadamente:</span>
                  )}
                </p>
                <p className={`text-2xl font-bold ${resultado.suficiente ? 'text-green-600' : 'text-red-600'}`}>
                  {resultado.diferencia.toFixed(1)} {resultado.productoData.unidad}
                </p>
                
                {!resultado.suficiente && (
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <h4 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                      </svg>
                      Recomendaciones:
                    </h4>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Aumenta tu presupuesto en ${(resultado.diferencia * resultado.productoData.precio / (resultado.productoData.unidad === 'kg' ? 1 : 20)).toFixed(2)}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Reduce el período de alimentación a {Math.floor(formData.presupuesto / (formData.cantidadAnimales * resultado.productoData.consumo * resultado.productoData.precio / (resultado.productoData.unidad === 'kg' ? 1 : 20)))} días</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Considera combinar con otros alimentos más económicos</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedCalculator;