import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiArrowLeft, FiCheckCircle, FiCalendar, FiClock, FiX } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import Header from '../organisms/Header';

const VeterinariaElCampoPage = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite, cart, addToCart } = useAppContext();
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Datos específicos para Veterinaria El Campo
  const company = {
    id: 3,
    name: "Pecuarius",
    logo: "https://www.pecuarios.club/empresas/Empresa_logo679c063e7a469_30012025.svg",
    description: "Pecuarius Laboratorios evoluciona constantemente para atender las necesidades del mercado, con avanzada tecnología y modernas líneas de producción que permiten fabricar productos biológicos y farmacéuticos de calidad superior, cumpliendo cabalmente con lo que marcan las normas y estándares de las BUENAS PRACTICAS DE MANUFACTURA (BPM), logra la CERTIFICACIÓN INTEGRAL otorgada por SAGARPA, que abarca los aspectos de gestión de la calidad, personal, instalaciones, equipos, producción, distribución y control de calidad permitiendo iniciar exportaciones a partir del año 2010.",
    address: "Calle Base, Providencia, CP. 85000, Cd. Obregón, Sonora.",
    phone: "+52 (644) 414 65 00",
    emergencyPhone: "+52 (644) 414 65 00",
    email: "info@veterinariaelcampo.com",
    category: "Salud Animal",
    services: [
      {
        id: 301,
        name: "Pecbiacid",
        image: "https://pecuarius.com/img/ADITIVOS_Y_PRESERVADORES/PECTRIACID.png",
        description: "Es un aditivo que disminuye los niveles de microorganismos patógenos en el alimento de los animales",
        detailedDescription: "Es un aditivo que disminuye los niveles de microorganismos patógenos en el alimento de los animales, los ingredientes utilizados en la formulación tiene una fuerte acción bactericida y fungicida., además de promover el mantenimiento de un buen balance microbiano en el tracto digestivo de los animales.",
        price: 500,
        unit: "Por unidad",
        duration: "2-3 dias",
        rating: 4.8,
        includes: [
          "Ácido Propiónico   40%",
          "Ácido fórmico      34%",
        ],
        preparation: [
          "Líquido para utilizarse en el alimento e ingredientes alimenticios.",
         
        ],
        additionalImages: [
          "https://pecuarius.com/img/ADITIVOS_Y_PRESERVADORES/PECTRIACID.png",
          "https://pecuarius.com/img/ADITIVOS_Y_PRESERVADORES/PECTRIACID.png",
          "https://pecuarius.com/img/ADITIVOS_Y_PRESERVADORES/PECTRIACID.png"
        ]
      },
      {
        id: 302,
        name: "Pecsalisyl Polvo",
        image: "https://www.pecuarios.club/productos/Producto_logo_5ca62b43a71bd.png",
        description: "Analgésico, antiinflamatoria y antipirética a base de ácido acetil salicílico.",
        detailedDescription: "Aves y cerdos: 1 g por cada litro de agua de bebida durante 3 a 5 días según el estado de los animales. 1 kg por tonelada de alimento durante 3 a 5 días. Bovinos: 10 a 100 mg por kg de peso cada 12 horas.",
        price: 350,
        unit: "Por bolsa",
        duration: "2-3 dias",
        rating: 4.9,
        includes: [
          "Acido 2-acetiloxibenzoico",
          "Acido acetilsalicílico 40%",
        ],
        preparation: [
          "Bovinos: 10 a 100 mg por kg de peso cada 12 horas.",
          "1 kg por tonelada de alimento durante 3 a 5 días.",
          "Aves y cerdos: 1 g por cada litro de agua de bebida durante 3 a 5 días según el estado de los animales."
        ],
        additionalImages: [
          "https://pecuarius.com/img/POLVOS_SOLUBLES/PECSALISYL_POLVO.png",
          "https://pecuarius.com/img/POLVOS_SOLUBLES/PECSALISYL_POLVO.png",
          "https://pecuarius.com/img/POLVOS_SOLUBLES/PECSALISYL_POLVO.png"
        ]
      },
      {
        id: 303,
        name: "Pecvermin Inyectable",
        image: "https://www.pecuarios.club/productos/Producto_logo_5ca62e4731227.png",
        description: "PECVERMIN INYECTABLE",
        detailedDescription: "PECVERMIN INYECTABLE contiene ivermectina. Posee un amplio espectro de actividad contra artrópodos y nemátodos comunes en porcinos y en bovinos. Posee un amplio margen de seguridad en su aplicación, además de un efecto residual antiparasitario prolongado.",
        price: 1200,
        unit: " Frascos con 10, 100, 250 y 500 ml.  ",
        duration: "2-3 dias",
        rating: 4.7,
        includes: [
          "Ivermectina 1 %",
          "Toxicidad aguda (dl50):"
        ],
        preparation: [
          "Cerdos: 0.3 mg/kg = 1 ml/33 kg de peso.",
          "Evaluación previa obligatoria",
          "Espacio limpio para recuperación"
        ],
        additionalImages: [
          "https://www.pecuarios.club/productos/Producto_logo_5ca5565e4ce21.webp",
          "https://www.pecuarios.club/productos/Producto_logo_5ca5565e4ce21.webp",
          "https://www.pecuarios.club/productos/Producto_logo_5ca5565e4ce21.webp"
        ]
      },
      {
        id: 304,
        name: "Pecformin",
        image: "https://www.pecuarios.club/productos/Producto_logo_5ca64f43ee564.png",
        description: "Uso veterinario.",
        detailedDescription: "PECFORMIN es un líquido el cual contiene formaldehído y ácido propiónico como ingredientes activos, está indicado para la preservación del alimento animal e ingredientes alimenticios evitando la contaminación o proliferación de bacterias como: Salmonella, E. coli, Staphilococcus aureus, Staphilococcus epidermidis y Streptococcus suis.",
        price: 800,
        unit: "Galon",
        duration: "Variable",
        rating: 4.9,
        includes: [
          "Formaldehído 33%",
          "Ácido Propiónico 9%",
        ],
        preparation: [
          "Antimicrobiano",
          "Antifúngico.",
        ],
        additionalImages: [
          "https://pecuarius.com/img/ADITIVOS_Y_PRESERVADORES/PECFORMIN.png",
          "https://pecuarius.com/img/ADITIVOS_Y_PRESERVADORES/PECFORMIN.png",
          "https://pecuarius.com/img/ADITIVOS_Y_PRESERVADORES/PECFORMIN.png"
        ]
      }
    ],
    specialties: [
      "Medicina preventiva",
      "Cirugía de campo",
      "Obstetricia animal",
      "Diagnóstico de laboratorio",
      "Control de enfermedades"
    ],
    team: [
      {
        name: "Dr. Javier Méndez",
        specialty: "Cirujano bovino",
        experience: "15 años",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Dra. Ana López",
        specialty: "Epidemiología",
        experience: "12 años",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        name: "MVZ Carlos Ruiz",
        specialty: "Reproducción animal",
        experience: "10 años",
        image: "https://randomuser.me/api/portraits/men/75.jpg"
      }
    ]
  };

  // Funciones para verificar estado
  const isFavorite = (serviceId) => favorites.some(item => item.id === serviceId);
  const isInCart = (serviceId) => cart.some(item => item.id === serviceId);

  // Funciones para el modal
  const openServiceModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeServiceModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header withCartIcon withFavoritesIcon />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/empresas" 
            className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" /> Volver a empresas
          </Link>
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
                <div className="w-40 h-40 rounded-full bg-white/20 flex items-center justify-center p-2">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
              <div className="md:w-3/4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{company.name}</h1>
                <p className="text-lg mb-4">{company.description}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">24/7 Emergencias</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Certificado SAGARPA</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Equipo especializado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Especialidades */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestras Especialidades</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {company.specialties.map((specialty, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FiCheckCircle className="text-blue-600 mr-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{specialty}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipo */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestro Equipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {company.team.map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-start">
                  <div className="w-16 h-16 rounded-full bg-gray-300 mr-4 flex-shrink-0 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{member.name}</h3>
                    <p className="text-blue-600 text-sm mb-1">{member.specialty}</p>
                    <p className="text-gray-500 text-xs">{member.experience} de experiencia</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Servicios Veterinarios</h2>
              <span className="text-gray-500">{company.services.length} servicios disponibles</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {company.services.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col border border-gray-100">
                  <div className="h-48 bg-gray-100 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center shadow-sm">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-medium">{service.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FiClock className="mr-1" />
                      <span>{service.duration}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Incluye:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <FiCheckCircle className="w-3 h-3 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-blue-600">
                          ${service.price.toLocaleString()}
                          <span className="text-sm text-gray-500 ml-1">{service.unit}</span>
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => addToCart(service)}
                          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                            isInCart(service.id) 
                              ? 'bg-gray-500 text-white cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                          disabled={isInCart(service.id)}
                        >
                          {isInCart(service.id) ? 'Agendado' : 'Agendar servicio'}
                        </button>
                        <button 
                          onClick={() => toggleFavorite(service)}
                          className={`p-2 rounded-full border ${
                            isFavorite(service.id)
                              ? 'text-red-500 border-red-200 bg-red-50'
                              : 'text-gray-500 border-gray-200 hover:text-red-500 hover:border-red-200'
                          }`}
                          title={isFavorite(service.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        >
                          <svg className="w-5 h-5" fill={isFavorite(service.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>

                      {/* Botón para ver detalles */}
                      <button 
                        onClick={() => openServiceModal(service)}
                        className="mt-2 w-full py-2 px-4 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Ver detalles completos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacto y Horario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contacto */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contacto de Emergencia</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Clínica Principal</h3>
                    <p className="text-gray-600">{company.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiPhone className="text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Urgencias 24/7</h3>
                    <a href={`tel:${company.emergencyPhone}`} className="text-gray-600 hover:text-blue-600">{company.emergencyPhone}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiPhone className="text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Consultas</h3>
                    <a href={`tel:${company.phone}`} className="text-gray-600 hover:text-blue-600">{company.phone}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiMail className="text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a href={`mailto:${company.email}`} className="text-gray-600 hover:text-blue-600">{company.email}</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Horario */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Horario de Atención</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <FiCalendar className="text-blue-600 mr-2" />
                    <span className="font-medium">Lunes a Viernes</span>
                  </div>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <FiCalendar className="text-blue-600 mr-2" />
                    <span className="font-medium">Sábados</span>
                  </div>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <FiCalendar className="text-blue-600 mr-2" />
                    <span className="font-medium">Domingos</span>
                  </div>
                  <span>Solo emergencias</span>
                </div>
                
                <div className="mt-6 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                  <p className="text-sm text-yellow-700">* Servicio de emergencias disponible las 24 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de detalles del servicio */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Fondo oscuro */}
            <div className="fixed inset-0 transition-opacity" onClick={closeServiceModal}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            {/* Contenido del modal */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    {/* Encabezado del modal */}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl leading-6 font-bold text-gray-900">
                        {selectedService.name}
                      </h3>
                      <button 
                        onClick={closeServiceModal}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>
                    
                    {/* Contenido principal del modal */}
                    <div className="mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Galería de imágenes */}
                        <div>
                          <div className="h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                            <img 
                              src={selectedService.image} 
                              alt={selectedService.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {selectedService.additionalImages.map((img, index) => (
                              <div key={index} className="h-24 bg-gray-100 rounded overflow-hidden">
                                <img 
                                  src={img} 
                                  alt={`${selectedService.name} ${index + 1}`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Información detallada */}
                        <div>
                          <p className="text-gray-700 mb-4">{selectedService.detailedDescription}</p>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold text-lg mb-2">Incluye:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {selectedService.includes.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <FiCheckCircle className="w-3 h-3 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-semibold text-lg mb-2">Preparación:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {selectedService.preparation.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <FiCheckCircle className="w-3 h-3 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xl font-bold text-blue-600">
                                ${selectedService.price.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 ml-1">{selectedService.unit}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="ml-1 text-gray-700">{selectedService.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pie del modal con botones de acción */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(selectedService);
                    closeServiceModal();
                  }}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                    isInCart(selectedService.id) 
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={isInCart(selectedService.id)}
                >
                  {isInCart(selectedService.id) ? 'Servicio agendado' : 'Agendar servicio'}
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(selectedService)}
                  className={`mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
                    isFavorite(selectedService.id)
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isFavorite(selectedService.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                </button>
                <button
                  type="button"
                  onClick={closeServiceModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VeterinariaElCampoPage;