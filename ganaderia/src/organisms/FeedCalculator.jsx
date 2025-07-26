import React, { useState, useEffect, useRef } from 'react';

const FeedCalculator = () => {
  // Datos completos de productos con precios actualizados
  const PRODUCT_DATA = {
    'Fardos de pasto seco': {
      consumo: 10,
      precio: 664,
      peso: 20,
      unidad: 'kg',
      presentacion: 'fardo de 20kg',
      descripcion: 'Alimento nutritivo y económico para tu ganado',
      categoria: 'forraje'
    },
    'Fardos de alfalfa': {
      consumo: 8,
      precio: 435,
      peso: 20,
      unidad: 'kg',
      presentacion: 'fardo de 20kg',
      descripcion: 'Alimento premium rico en proteínas',
      categoria: 'forraje'
    },
    'Sal mineralizada': {
      consumo: 0.1,
      precio: 469,
      peso: 5,
      unidad: 'kg',
      presentacion: 'bolsa de 5kg',
      descripcion: 'Complemento esencial para la salud',
      categoria: 'suplemento'
    },
    'Melaza y suplementos': {
      consumo: 0.5,
      precio: 779,
      peso: 5,
      unidad: 'kg',
      presentacion: 'contenedor de 5kg',
      descripcion: 'Energía concentrada para el ganado',
      categoria: 'suplemento'
    },
    'Api-carne crecimiento': {
      consumo: 0.2,
      precio: 800,
      peso: 3,
      unidad: 'kg',
      presentacion: 'paquete (3 productos)',
      descripcion: 'Nutris reprolact evialis monensina, Becerro engorda 16%',
      categoria: 'medicamento'
    },
    'Tulissin®': {
      consumo: 0.05,
      precio: 1250,
      peso: 1,
      unidad: 'kg',
      presentacion: 'unidad',
      descripcion: 'Tratamiento veterinario especializado',
      categoria: 'medicamento'
    },
    'FORTIK4': {
      consumo: 0.03,
      precio: 980,
      peso: 1,
      unidad: 'kg',
      presentacion: 'unidad',
      descripcion: 'Suplemento fortificante',
      categoria: 'medicamento'
    },
    'Maxflor® DUO': {
      consumo: 0.04,
      precio: 750,
      peso: 1,
      unidad: 'kg',
      presentacion: 'unidad',
      descripcion: 'Probiótico especializado',
      categoria: 'medicamento'
    },
    'Pecbiacid': {
      consumo: 0.02,
      precio: 1250,
      peso: 1,
      unidad: 'kg',
      presentacion: 'unidad',
      descripcion: 'Acidificante intestinal',
      categoria: 'medicamento'
    },
    'Pecsalisyl Polvo': {
      consumo: 0.01,
      precio: 350,
      peso: 1,
      unidad: 'kg',
      presentacion: 'unidad',
      descripcion: 'Antiinflamatorio en polvo',
      categoria: 'medicamento'
    },
    'Pecvermin Inyectable': {
      consumo: 0.005,
      precio: 1250,
      peso: 1,
      unidad: 'ml',
      presentacion: 'frasco',
      descripcion: 'Desparasitante inyectable',
      categoria: 'medicamento'
    },
    'Pecformi': {
      consumo: 0.03,
      precio: 800,
      peso: 1,
      unidad: 'kg',
      presentacion: 'unidad',
      descripcion: 'Suplemento nutricional',
      categoria: 'medicamento'
    }
  };

  const [formData, setFormData] = useState({
    cantidadAnimales: 50,
    diasAlimentacion: 30,
    productoSeleccionado: 'Fardos de pasto seco',
    presupuesto: 50000,
    mostrarTodos: false
  });

  const [resultado, setResultado] = useState(null);
  const [visibleSections, setVisibleSections] = useState(['header-section']);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, entry.target.id])]);
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'productoSeleccionado' ? value : Number(value))
    }));
  };

  const calcularAlimento = () => {
    const { cantidadAnimales, diasAlimentacion, productoSeleccionado, presupuesto } = formData;
    const producto = PRODUCT_DATA[productoSeleccionado];
    
    // Cálculo considerando 2-3 comidas por día
    const comidasPorDia = 2.5; // Promedio entre 2 y 3
    const consumoTotal = cantidadAnimales * producto.consumo * diasAlimentacion * comidasPorDia;
    
    // Cálculo de unidades necesarias
    const unidadesNecesarias = Math.ceil(consumoTotal / producto.peso);
    const costoTotal = unidadesNecesarias * producto.precio;
    
    // Cálculo con presupuesto disponible
    const unidadesComprables = Math.floor(presupuesto / producto.precio);
    const pesoComprable = unidadesComprables * producto.peso;
    
    // Recomendación específica para el ejemplo solicitado
    let recomendacionEspecifica = null;
    if (cantidadAnimales === 50 && productoSeleccionado === 'Fardos de pasto seco') {
      const fardosNecesarios = Math.ceil((50 * 10 * diasAlimentacion * 2.5) / 20);
      const costoFardos = fardosNecesarios * 664;
      recomendacionEspecifica = {
        fardos: fardosNecesarios,
        costo: costoFardos,
        dias: diasAlimentacion
      };
    }

    setResultado({
      consumoTotal,
      unidadesNecesarias,
      costoTotal,
      unidadesComprables,
      pesoComprable,
      suficiente: presupuesto >= costoTotal,
      diferenciaCosto: Math.abs(presupuesto - costoTotal),
      diferenciaPeso: Math.abs(pesoComprable - consumoTotal),
      productoData: producto,
      recomendacionEspecifica
    });

    setVisibleSections((prev) => [...new Set([...prev, 'results-section'])]);
  };

  const categorias = {
    forraje: Object.entries(PRODUCT_DATA).filter(([_, data]) => data.categoria === 'forraje'),
    suplemento: Object.entries(PRODUCT_DATA).filter(([_, data]) => data.categoria === 'suplemento'),
    medicamento: Object.entries(PRODUCT_DATA).filter(([_, data]) => data.categoria === 'medicamento')
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-gradient-to-br from-[#FAF9F6] via-[#F4F1EA] to-[#E8E4DC]">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div 
          id="header-section"
          ref={el => sectionRefs.current[0] = el}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            visibleSections.includes('header-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B5E3C] to-[#A0704E] rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 17h20v2H2z"/>
                <path d="M6 16c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
                <path d="M14 8V6a2 2 0 0 0-4 0v2"/>
              </svg>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8B5E3C] to-[#A0704E] bg-clip-text text-transparent">
                Calculadora Ganadera Pro
              </h2>
            </div>
          </div>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Optimiza tu inversión en alimentación ganadera con cálculos precisos, 
            recomendaciones personalizadas y control total de tu presupuesto
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="w-32 h-1 bg-gradient-to-r from-[#8B5E3C] to-[#A0704E] rounded-full"></div>
          </div>
        </div>

        {/* Catálogo de Productos */}
        <div 
          id="catalog-section"
          ref={el => sectionRefs.current[1] = el}
          className={`mb-12 transition-all duration-700 ease-out delay-150 ${
            visibleSections.includes('catalog-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#8B5E3C] mb-4">Catálogo de Productos</h3>
            <button
              onClick={() => setFormData(prev => ({...prev, mostrarTodos: !prev.mostrarTodos}))}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M21 6c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M21 18c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
              </svg>
              {formData.mostrarTodos ? 'Ocultar detalles' : 'Ver todos los productos'}
            </button>
          </div>

          {formData.mostrarTodos && (
            <div className="space-y-8">
              {Object.entries(categorias).map(([categoria, productos]) => (
                <div key={categoria} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-[#8B5E3C] to-[#A0704E] p-6">
                    <h4 className="text-xl font-bold text-white capitalize">
                      {categoria === 'forraje' ? '🌾 Forrajes' : 
                       categoria === 'suplemento' ? '⚡ Suplementos' : '💊 Medicamentos'}
                    </h4>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {productos.map(([nombre, data]) => (
                        <div key={nombre} className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-[#8B5E3C]/30">
                          <h5 className="font-semibold text-gray-800 mb-2 text-lg">{nombre}</h5>
                          <p className="text-sm text-gray-600 mb-3">{data.descripcion}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Precio:</span>
                              <span className="font-bold text-[#8B5E3C] text-lg">${data.precio.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Presentación:</span>
                              <span className="text-sm font-medium">{data.presentacion}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Consumo diario:</span>
                              <span className="text-sm font-medium">{data.consumo} {data.unidad}/animal</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Form Container */}
        <div 
          id="form-section"
          ref={el => sectionRefs.current[2] = el}
          className={`bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 transition-all duration-700 ease-out delay-300 ${
            visibleSections.includes('form-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-r from-[#8B5E3C] to-[#A0704E] p-8">
            <h3 className="text-2xl font-bold text-white mb-2">Configuración de Cálculo</h3>
            <p className="text-white/90">Ingresa los datos de tu operación ganadera</p>
          </div>
          
          <div className="p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🐄 Cantidad de animales
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="cantidadAnimales"
                    value={formData.cantidadAnimales}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all text-lg font-medium"
                    placeholder="Ej: 50"
                  />
                  <span className="absolute right-4 top-4 text-gray-500 font-medium">cabezas</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📅 Período de alimentación
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="diasAlimentacion"
                    value={formData.diasAlimentacion}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all text-lg font-medium"
                    placeholder="Ej: 30"
                  />
                  <span className="absolute right-4 top-4 text-gray-500 font-medium">días</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🌾 Tipo de producto
                </label>
                <select
                  name="productoSeleccionado"
                  value={formData.productoSeleccionado}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] appearance-none bg-white text-lg font-medium cursor-pointer"
                >
                  <optgroup label="🌾 Forrajes">
                    {categorias.forraje.map(([nombre]) => (
                      <option key={nombre} value={nombre}>{nombre}</option>
                    ))}
                  </optgroup>
                  <optgroup label="⚡ Suplementos">
                    {categorias.suplemento.map(([nombre]) => (
                      <option key={nombre} value={nombre}>{nombre}</option>
                    ))}
                  </optgroup>
                  <optgroup label="💊 Medicamentos">
                    {categorias.medicamento.map(([nombre]) => (
                      <option key={nombre} value={nombre}>{nombre}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 Presupuesto disponible
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-700 font-bold text-lg">$</span>
                  <input
                    type="number"
                    name="presupuesto"
                    value={formData.presupuesto}
                    onChange={handleChange}
                    min="1"
                    className="w-full pl-10 pr-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all text-lg font-medium"
                    placeholder="Ej: 50000"
                  />
                </div>
              </div>
            </div>
            
            {/* Información del producto seleccionado */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-blue-800">Producto Seleccionado</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-blue-600 mb-1">Precio por unidad</p>
                  <p className="text-2xl font-bold text-blue-800">${PRODUCT_DATA[formData.productoSeleccionado].precio.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-blue-600 mb-1">Consumo por animal/día</p>
                  <p className="text-2xl font-bold text-blue-800">{PRODUCT_DATA[formData.productoSeleccionado].consumo} {PRODUCT_DATA[formData.productoSeleccionado].unidad}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-blue-600 mb-1">Presentación</p>
                  <p className="text-lg font-bold text-blue-800">{PRODUCT_DATA[formData.productoSeleccionado].presentacion}</p>
                </div>
              </div>
              <p className="text-blue-700 mt-4 text-center italic">{PRODUCT_DATA[formData.productoSeleccionado].descripcion}</p>
            </div>
            
            <button
              onClick={calcularAlimento}
              className="w-full bg-gradient-to-r from-[#8B5E3C] to-[#A0704E] hover:from-[#A0704E] hover:to-[#8B5E3C] text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#8B5E3C]/30 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m4-6h8a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4"/>
                <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"/>
                <path d="M9 11v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-8"/>
              </svg>
              Calcular Necesidades y Costos
            </button>
          </div>
        </div>
        
        {/* Resultados */}
        {resultado && (
          <div className="space-y-8">
            {/* Resultado principal */}
            <div 
              id="results-section"
              ref={el => sectionRefs.current[3] = el}
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ease-out delay-300 ${
                visibleSections.includes('results-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`${resultado.suficiente ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'} p-8`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    {resultado.suficiente ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <path d="m9 11 3 3L22 4"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4"/>
                        <path d="M12 16h.01"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">
                      {resultado.suficiente ? '✅ Presupuesto Suficiente' : '⚠️ Presupuesto Insuficiente'}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {resultado.suficiente ? 
                        'Tu presupuesto cubre completamente las necesidades' : 
                        'Necesitas ajustar tu presupuesto o plan de alimentación'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        </svg>
                      </div>
                      <h4 className="font-bold text-blue-800">Consumo Total</h4>
                    </div>
                    <p className="text-3xl font-bold text-blue-600 mb-1">
                      {resultado.consumoTotal.toFixed(1)}
                    </p>
                    <p className="text-blue-600 text-sm">{resultado.productoData.unidad} necesarios</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                        </svg>
                      </div>
                      <h4 className="font-bold text-purple-800">Unidades Necesarias</h4>
                    </div>
                    <p className="text-3xl font-bold text-purple-600 mb-1">
                      {resultado.unidadesNecesarias}
                    </p>
                    <p className="text-purple-600 text-sm">{resultado.productoData.presentacion}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23"/>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                      </div>
                      <h4 className="font-bold text-orange-800">Costo Total</h4>
                    </div>
                    <p className="text-3xl font-bold text-orange-600 mb-1">
                      ${resultado.costoTotal.toLocaleString()}
                    </p>
                    <p className="text-orange-600 text-sm">Inversión requerida</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="14" x="2" y="5" rx="2"/>
                          <line x1="2" y1="10" x2="22" y2="10"/>
                        </svg>
                      </div>
                      <h4 className="font-bold text-green-800">Puedes Comprar</h4>
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-1">
                      {resultado.unidadesComprables}
                    </p>
                    <p className="text-green-600 text-sm">unidades con tu presupuesto</p>
                  </div>
                </div>

                {/* Recomendación específica para 50 ganados */}
                {resultado.recomendacionEspecifica && (
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-amber-800 mb-1">🐄 Recomendación Específica</h4>
                        <p className="text-amber-700">Para {formData.cantidadAnimales} cabezas de ganado durante {formData.diasAlimentacion} días</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                          <div className="text-3xl mb-2">📦</div>
                          <p className="text-2xl font-bold text-blue-600 mb-1">{resultado.recomendacionEspecifica.fardos}</p>
                          <p className="text-blue-700 font-medium">Fardos de pasto seco necesarios</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                          <div className="text-3xl mb-2">💰</div>
                          <p className="text-2xl font-bold text-green-600 mb-1">${resultado.recomendacionEspecifica.costo.toLocaleString()}</p>
                          <p className="text-green-700 font-medium">Costo total estimado</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                          <div className="text-3xl mb-2">📅</div>
                          <p className="text-2xl font-bold text-purple-600 mb-1">{resultado.recomendacionEspecifica.dias}</p>
                          <p className="text-purple-700 font-medium">Días de alimentación</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <p className="text-blue-800 text-center">
                          <strong>💡 Cálculo:</strong> {formData.cantidadAnimales} animales × 10kg/día × {formData.diasAlimentacion} días × 2.5 comidas = {(formData.cantidadAnimales * 10 * formData.diasAlimentacion * 2.5).toLocaleString()}kg total
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Análisis detallado */}
                <div className={`p-8 rounded-2xl border-2 ${resultado.suficiente ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'}`}>
                  <h4 className={`text-xl font-bold mb-4 flex items-center gap-3 ${resultado.suficiente ? 'text-green-800' : 'text-red-800'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    Análisis Detallado
                  </h4>
                  
                  {resultado.suficiente ? (
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h5 className="font-bold text-green-700 mb-3">✅ Situación Favorable</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-green-600"><strong>Sobra en presupuesto:</strong> ${resultado.diferenciaCosto.toLocaleString()}</p>
                            <p className="text-green-600"><strong>Excedente en producto:</strong> {resultado.diferenciaPeso.toFixed(1)} {resultado.productoData.unidad}</p>
                          </div>
                          <div>
                            <p className="text-green-600"><strong>Eficiencia:</strong> {((resultado.costoTotal / formData.presupuesto) * 100).toFixed(1)}% del presupuesto utilizado</p>
                            <p className="text-green-600"><strong>Margen de seguridad:</strong> {(((formData.presupuesto - resultado.costoTotal) / formData.presupuesto) * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h5 className="font-bold text-red-700 mb-3">⚠️ Déficit Presupuestario</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-red-600"><strong>Falta presupuesto:</strong> ${resultado.diferenciaCosto.toLocaleString()}</p>
                            <p className="text-red-600"><strong>Déficit en producto:</strong> {resultado.diferenciaPeso.toFixed(1)} {resultado.productoData.unidad}</p>
                          </div>
                          <div>
                            <p className="text-red-600"><strong>Cobertura actual:</strong> {((formData.presupuesto / resultado.costoTotal) * 100).toFixed(1)}% de las necesidades</p>
                            <p className="text-red-600"><strong>Días cubiertos:</strong> {Math.floor((resultado.pesoComprable / (formData.cantidadAnimales * resultado.productoData.consumo * 2.5)))} días</p>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h6 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                              <path d="M12 8v4"/>
                              <path d="M12 16h.01"/>
                            </svg>
                            Soluciones Recomendadas:
                          </h6>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                              <h6 className="font-medium text-red-700 mb-2">💰 Aumentar Presupuesto</h6>
                              <p className="text-sm text-red-600">Incrementa ${resultado.diferenciaCosto.toLocaleString()} para cubrir todas las necesidades</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                              <h6 className="font-medium text-red-700 mb-2">📅 Reducir Período</h6>
                              <p className="text-sm text-red-600">Alimenta por {Math.floor((resultado.pesoComprable / (formData.cantidadAnimales * resultado.productoData.consumo * 2.5)))} días con el presupuesto actual</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                              <h6 className="font-medium text-red-700 mb-2">🔄 Producto Alternativo</h6>
                              <p className="text-sm text-red-600">Considera combinar con opciones más económicas del catálogo</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Desglose de costos por período */}
                <div className="mt-8 bg-gradient-to-r from-gray-50 to-slate-50 p-8 rounded-2xl border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"/>
                      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                    </svg>
                    Proyección de Costos
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[7, 15, 30, 60].map((dias) => {
                      const costoProyectado = Math.ceil((formData.cantidadAnimales * resultado.productoData.consumo * dias * 2.5) / resultado.productoData.peso) * resultado.productoData.precio;
                      return (
                        <div key={dias} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-[#8B5E3C] mb-1">{dias} días</p>
                            <p className="text-lg font-semibold text-gray-700">${costoProyectado.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">
                              {Math.ceil((formData.cantidadAnimales * resultado.productoData.consumo * dias * 2.5) / resultado.productoData.peso)} unidades
                            </p>
                            <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                              costoProyectado <= formData.presupuesto ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {costoProyectado <= formData.presupuesto ? '✅ Alcanzable' : '❌ Excede presupuesto'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Consejos adicionales */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-8">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 18 18.5V21a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2.5a3.374 3.374 0 0 0-.924-2.31z"/>
                  </svg>
                  Consejos de Optimización
                </h3>
                <p className="text-white/90">Maximiza la eficiencia de tu operación ganadera</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-blue-800 mb-2">Compra por Volumen</h4>
                    <p className="text-blue-700 text-sm">Considera compras grandes para obtener mejores precios por unidad y reducir costos de transporte.</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-green-800 mb-2">Temporadas Óptimas</h4>
                    <p className="text-green-700 text-sm">Planifica compras durante temporadas de cosecha cuando los precios de forrajes suelen ser más bajos.</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-purple-800 mb-2">Combina Productos</h4>
                    <p className="text-purple-700 text-sm">Mezcla diferentes tipos de alimento para optimizar nutrición y costos según las necesidades específicas.</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <circle cx="12" cy="16" r="1"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-orange-800 mb-2">Almacenamiento Adecuado</h4>
                    <p className="text-orange-700 text-sm">Invierte en instalaciones de almacenamiento para comprar en épocas baratas y conservar la calidad.</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-red-800 mb-2">Monitoreo Constante</h4>
                    <p className="text-red-700 text-sm">Registra el consumo real para ajustar los cálculos y mejorar la precisión de futuras planificaciones.</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border border-teal-200">
                    <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-teal-800 mb-2">Consulta Veterinaria</h4>
                    <p className="text-teal-700 text-sm">Trabaja con un veterinario para optimizar la dieta según la edad, peso y condición de tus animales.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedCalculator;