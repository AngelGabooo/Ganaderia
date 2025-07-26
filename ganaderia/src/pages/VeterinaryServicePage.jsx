import Footer from '../organisms/Footer'; 
import Header from '../organisms/Header';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStethoscope, FaSyringe, FaClipboardCheck, FaPhoneAlt, FaCalendarAlt, FaDownload, FaPrint, FaPrescriptionBottleAlt } from 'react-icons/fa';

const VeterinaryServicePage = () => {
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMedications, setShowMedications] = useState(false);
  const [vaccineSchedule, setVaccineSchedule] = useState([]);

  const animalTypes = [
    { value: 'bovinos', label: 'Bovinos' },
    { value: 'equinos', label: 'Equinos' },
    { value: 'porcinos', label: 'Porcinos' },
    { value: 'ovinos', label: 'Ovinos' },
    { value: 'caprinos', label: 'Caprinos' },
    { value: 'aves', label: 'Aves de corral' }
  ];

  const diseases = {
    bovinos: [
      { value: 'fiebre_aftosa', label: 'Fiebre Aftosa' },
      { value: 'brucelosis', label: 'Brucelosis' },
      { value: 'tuberculosis', label: 'Tuberculosis' },
      { value: 'rabia', label: 'Rabia' },
      { value: 'parasitos', label: 'Parásitos Internos' },
      { value: 'mastitis', label: 'Mastitis' },
      { value: 'ninguna', label: 'Sin enfermedad (Prevención)' }
    ],
    equinos: [
      { value: 'tetanos', label: 'Tétanos' },
      { value: 'influenza', label: 'Influenza Equina' },
      { value: 'encefalitis', label: 'Encefalitis' },
      { value: 'ninguna', label: 'Sin enfermedad (Prevención)' }
    ],
    porcinos: [
      { value: 'peste_porcina', label: 'Peste Porcina' },
      { value: 'erisipela', label: 'Erisipela' },
      { value: 'neumonias', label: 'Neumonías' },
      { value: 'ninguna', label: 'Sin enfermedad (Prevención)' }
    ],
    ovinos: [
      { value: 'fiebre_aftosa', label: 'Fiebre Aftosa' },
      { value: 'clostridiales', label: 'Enfermedades Clostridiales' },
      { value: 'parasitos', label: 'Parásitos Internos' },
      { value: 'ninguna', label: 'Sin enfermedad (Prevención)' }
    ],
    caprinos: [
      { value: 'fiebre_aftosa', label: 'Fiebre Aftosa' },
      { value: 'clostridiales', label: 'Enfermedades Clostridiales' },
      { value: 'parasitos', label: 'Parásitos Internos' },
      { value: 'ninguna', label: 'Sin enfermedad (Prevención)' }
    ],
    aves: [
      { value: 'newcastle', label: 'Newcastle' },
      { value: 'gumboro', label: 'Gumboro' },
      { value: 'ninguna', label: 'Sin enfermedad (Prevención)' }
    ]
  };

  const medications = {
    fiebre_aftosa: [
      { name: 'Vacuna Aftosa Oleosa', dosage: '2ml IM', frequency: 'Cada 6 meses' },
      { name: 'Antiviral Aftosa', dosage: '5ml IM', frequency: 'Solo en brotes' }
    ],
    brucelosis: [
      { name: 'Vacuna B19', dosage: '2ml SC', frequency: 'Terneras 3-8 meses' },
      { name: 'Estreptomicina', dosage: '10mg/kg IM', frequency: 'Tratamiento por 5 días' }
    ],
    tuberculosis: [
      { name: 'Isoniazida', dosage: '10mg/kg PO', frequency: 'Tratamiento prolongado' },
      { name: 'Rifampicina', dosage: '10mg/kg PO', frequency: 'Combinado con Isoniazida' }
    ],
    rabia: [
      { name: 'Vacuna Antirrábica', dosage: '2ml IM', frequency: 'Semestral' },
      { name: 'Suero Antirrábico', dosage: '1ml/kg IM', frequency: 'Post-exposición' }
    ],
    parasitos: [
      { name: 'Ivermectina', dosage: '1ml/50kg SC', frequency: 'Cada 3-4 meses' },
      { name: 'Albendazol', dosage: '10mg/kg PO', frequency: 'Cada 3 meses' }
    ],
    mastitis: [
      { name: 'Penicilina + Estreptomicina', dosage: '10ml intramamario', frequency: 'Cada 12h por 3 días' },
      { name: 'Sellador de pezones', dosage: 'Post-ordeño', frequency: 'Cada ordeño' }
    ],
    tetanos: [
      { name: 'Toxoide Tetánico', dosage: '1ml IM', frequency: 'Semestral' },
      { name: 'Suero Antitetánico', dosage: '1.500 UI IM', frequency: 'Post-heridas' }
    ],
    influenza: [
      { name: 'Vacuna Influenza Equina', dosage: '1ml IM', frequency: 'Cuatrimestral' },
      { name: 'Antivirales', dosage: 'Varía según producto', frequency: 'Durante brotes' }
    ],
    encefalitis: [
      { name: 'Vacuna Encefalitis', dosage: '2ml IM', frequency: 'Semestral' },
      { name: 'Repelentes', dosage: 'Aplicación tópica', frequency: 'Semanal' }
    ],
    peste_porcina: [
      { name: 'Vacuna Peste Porcina', dosage: '2ml IM', frequency: 'Semestral' },
      { name: 'Antivirales', dosage: 'Varía según producto', frequency: 'Durante brotes' }
    ],
    erisipela: [
      { name: 'Vacuna Erisipela', dosage: '2ml IM', frequency: 'Semestral' },
      { name: 'Penicilina', dosage: '20.000 UI/kg IM', frequency: 'Cada 24h por 3 días' }
    ],
    neumonias: [
      { name: 'Vacuna Neumonía', dosage: '2ml IM', frequency: 'Trimestral' },
      { name: 'Oxitetraciclina', dosage: '20mg/kg IM', frequency: 'Cada 48h por 5 días' }
    ],
    clostridiales: [
      { name: 'Vacuna Clostridial', dosage: '2ml IM', frequency: 'Semestral' },
      { name: 'Antitoxina', dosage: '5ml IM', frequency: 'En casos agudos' }
    ],
    newcastle: [
      { name: 'Vacuna Newcastle', dosage: '1ml SC', frequency: 'Cada 2-3 meses' },
      { name: 'Antivirales', dosage: 'Varía según producto', frequency: 'Durante brotes' }
    ],
    gumboro: [
      { name: 'Vacuna Gumboro', dosage: '1ml SC', frequency: 'Cada 3-4 meses' },
      { name: 'Inmunoestimulantes', dosage: 'Varía según producto', frequency: 'Durante brotes' }
    ]
  };

  const vaccineSchedules = {
    bovinos: {
      fiebre_aftosa: [
        { vaccine: 'Vacuna Aftosa Oleosa', months: [1, 7], description: 'Aplicación semestral' },
        { vaccine: 'Refuerzo Aftosa', months: [4, 10], description: 'Refuerzo trimestral en zonas de riesgo' }
      ],
      brucelosis: [
        { vaccine: 'Vacuna B19', months: [3], description: 'Solo terneras de 3-8 meses' }
      ],
      tuberculosis: [
        { vaccine: 'Prueba Tuberculina', months: [6, 12], description: 'Prueba diagnóstica anual' }
      ],
      rabia: [
        { vaccine: 'Vacuna Antirrábica', months: [2, 8], description: 'Aplicación semestral' }
      ],
      parasitos: [
        { vaccine: 'Desparasitación Interna', months: [3, 6, 9, 12], description: 'Cada 3 meses' },
        { vaccine: 'Desparasitación Externa', months: [1, 4, 7, 10], description: 'Control de garrapatas' }
      ],
      mastitis: [
        { vaccine: 'Vacuna Mastitis', months: [2, 5, 8, 11], description: 'Prevención trimestral' },
        { vaccine: 'Prueba CMT', months: [1, 3, 5, 7, 9, 11], description: 'Control mensual alterno' }
      ],
      ninguna: [
        { vaccine: 'Vacuna Triple', months: [1, 4, 7, 10], description: 'Prevención general' },
        { vaccine: 'Desparasitante', months: [2, 5, 8, 11], description: 'Control de parásitos' },
        { vaccine: 'Vitaminas', months: [3, 6, 9, 12], description: 'Suplementación' }
      ]
    },
    equinos: {
      tetanos: [
        { vaccine: 'Vacuna Antitetánica', months: [1, 7], description: 'Refuerzo semestral' },
        { vaccine: 'Suero Antitetánico', months: [], description: 'En caso de heridas' }
      ],
      influenza: [
        { vaccine: 'Vacuna Influenza Equina', months: [1, 4, 7, 10], description: 'Cuatrimestral' }
      ],
      encefalitis: [
        { vaccine: 'Vacuna Encefalitis', months: [2, 8], description: 'Semestral' }
      ],
      ninguna: [
        { vaccine: 'Desparasitación', months: [3, 6, 9, 12], description: 'Trimestral' },
        { vaccine: 'Vitaminas', months: [2, 5, 8, 11], description: 'Suplementación' }
      ]
    },
    porcinos: {
      peste_porcina: [
        { vaccine: 'Vacuna Peste Porcina', months: [1, 6], description: 'Semestral' }
      ],
      erisipela: [
        { vaccine: 'Vacuna Erisipela', months: [2, 8], description: 'Semestral' }
      ],
      neumonias: [
        { vaccine: 'Vacuna Neumonía', months: [1, 4, 7, 10], description: 'Trimestral' }
      ],
      ninguna: [
        { vaccine: 'Desparasitación', months: [3, 6, 9, 12], description: 'Trimestral' },
        { vaccine: 'Vitaminas', months: [1, 5, 9], description: 'Suplementación' }
      ]
    },
    ovinos: {
      fiebre_aftosa: [
        { vaccine: 'Vacuna Aftosa', months: [1, 7], description: 'Semestral' }
      ],
      clostridiales: [
        { vaccine: 'Vacuna Clostridial', months: [2, 8], description: 'Semestral' }
      ],
      parasitos: [
        { vaccine: 'Desparasitación', months: [3, 6, 9, 12], description: 'Trimestral' }
      ],
      ninguna: [
        { vaccine: 'Vitaminas', months: [1, 4, 7, 10], description: 'Suplementación' }
      ]
    },
    caprinos: {
      fiebre_aftosa: [
        { vaccine: 'Vacuna Aftosa', months: [1, 7], description: 'Semestral' }
      ],
      clostridiales: [
        { vaccine: 'Vacuna Clostridial', months: [2, 8], description: 'Semestral' }
      ],
      parasitos: [
        { vaccine: 'Desparasitación', months: [3, 6, 9, 12], description: 'Trimestral' }
      ],
      ninguna: [
        { vaccine: 'Vitaminas', months: [1, 4, 7, 10], description: 'Suplementación' }
      ]
    },
    aves: {
      newcastle: [
        { vaccine: 'Vacuna Newcastle', months: [1, 3, 6, 9, 12], description: 'Cada 2-3 meses' }
      ],
      gumboro: [
        { vaccine: 'Vacuna Gumboro', months: [1, 4, 8, 12], description: 'Cada 3-4 meses' }
      ],
      ninguna: [
        { vaccine: 'Vitaminas', months: [2, 5, 8, 11], description: 'Suplementación' }
      ]
    }
  };

  useEffect(() => {
    if (selectedAnimalType && selectedDisease) {
      generateVaccineCalendar();
    }
  }, [selectedAnimalType, selectedDisease]);

  const generateVaccineCalendar = () => {
    if (!selectedAnimalType || !selectedDisease) return;

    const schedule = vaccineSchedules[selectedAnimalType]?.[selectedDisease] || [];
    const currentYear = new Date().getFullYear();
    const calendar = [];

    schedule.forEach(item => {
      item.months.forEach(month => {
        calendar.push({
          date: new Date(currentYear, month - 1, 15),
          vaccine: item.vaccine,
          description: item.description,
          animalType: selectedAnimalType
        });
      });
    });

    setVaccineSchedule(calendar.sort((a, b) => a.date - b.date));
    setShowCalendar(true);
  };

  const downloadCalendar = () => {
    const calendarData = vaccineSchedule.map(item => 
      `${item.date.toLocaleDateString('es-ES')},${item.vaccine},${item.description}`
    ).join('\n');
    
    const blob = new Blob([`Fecha,Vacuna,Descripción\n${calendarData}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendario_vacunacion_${selectedAnimalType}.csv`;
    a.click();
  };

  const tips = [
    {
      title: "Vacunación oportuna",
      content: "Mantenga al día el esquema de vacunación de su ganado para prevenir enfermedades comunes.",
      icon: <FaSyringe className="text-amber-600 text-2xl" />
    },
    {
      title: "Control de parásitos",
      content: "Realice desparasitaciones periódicas según recomendación veterinaria.",
      icon: <FaStethoscope className="text-amber-600 text-2xl" />
    },
    {
      title: "Nutrición adecuada",
      content: "Asegure una dieta balanceada según la etapa productiva de cada animal.",
      icon: <FaClipboardCheck className="text-amber-600 text-2xl" />
    },
    {
      title: "Detección temprana",
      content: "Aprenda a reconocer signos tempranos de enfermedad en su ganado.",
      icon: <FaStethoscope className="text-amber-600 text-2xl" />
    },
    {
      title: "Bioseguridad",
      content: "Implemente medidas de cuarentena para animales nuevos y controle el acceso a su predio.",
      icon: <FaClipboardCheck className="text-amber-600 text-2xl" />
    },
    {
      title: "Registro sanitario",
      content: "Mantenga un registro detallado de tratamientos y procedimientos realizados.",
      icon: <FaClipboardCheck className="text-amber-600 text-2xl" />
    }
  ];

  const emergencyContacts = [
    { name: "Emergencias 24h", phone: "123-456-7890" },
    { name: "Veterinario Local", phone: "234-567-8901" },
    { name: "Control de Epidemias", phone: "345-678-9012" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-amber-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Servicio Médico Veterinario</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Consejos profesionales y asistencia para mantener tu ganado saludable y productivo
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/empresas" 
              className="bg-white text-amber-800 px-6 py-3 rounded-full font-medium hover:bg-amber-100 transition-colors"
            >
              Ver empresas veterinarias
            </Link>
            <a 
              href="#contacto" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-amber-800 transition-colors"
            >
              Contacto de emergencia
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Vaccination Calendar Generator */}
        <section className="mb-20">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6">
              <h2 className="text-3xl font-bold mb-2">Generador de Calendario de Vacunación</h2>
              <p className="text-amber-100">Crea un calendario personalizado para el control sanitario de tu ganado</p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tipo de Ganado
                  </label>
                  <select 
                    value={selectedAnimalType} 
                    onChange={(e) => {
                      setSelectedAnimalType(e.target.value);
                      setSelectedDisease('');
                      setShowCalendar(false);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar tipo de ganado</option>
                    {animalTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Enfermedad/Condición
                  </label>
                  <select 
                    value={selectedDisease} 
                    onChange={(e) => {
                      setSelectedDisease(e.target.value);
                      setShowCalendar(false);
                      setShowMedications(false);
                    }}
                    disabled={!selectedAnimalType}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Seleccionar enfermedad</option>
                    {selectedAnimalType && diseases[selectedAnimalType]?.map(disease => (
                      <option key={disease.value} value={disease.value}>{disease.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={generateVaccineCalendar}
                  disabled={!selectedAnimalType || !selectedDisease}
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                  <FaCalendarAlt className="mr-2" />
                  Generar Calendario
                </button>

                {selectedDisease && selectedDisease !== 'ninguna' && (
                  <button
                    onClick={() => setShowMedications(!showMedications)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
                  >
                    <FaPrescriptionBottleAlt className="mr-2" />
                    {showMedications ? 'Ocultar' : 'Ver'} Medicamentos
                  </button>
                )}
              </div>

              {/* Auto-generation indicator */}
              {selectedAnimalType && !selectedDisease && (
                <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                  <p className="text-blue-800 text-center">
                    <FaCalendarAlt className="inline mr-2" />
                    Selecciona una enfermedad/condición para generar automáticamente el calendario
                  </p>
                </div>
              )}

              {/* Medications Section */}
              {showMedications && selectedDisease && medications[selectedDisease] && (
                <div className="mt-8 bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <FaPrescriptionBottleAlt className="mr-2" />
                    Medicamentos Recomendados para {diseases[selectedAnimalType]?.find(d => d.value === selectedDisease)?.label}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {medications[selectedDisease].map((med, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                        <h4 className="font-semibold text-gray-800 mb-2">{med.name}</h4>
                        <p className="text-sm text-gray-600 mb-1"><strong>Dosis:</strong> {med.dosage}</p>
                        <p className="text-sm text-gray-600"><strong>Frecuencia:</strong> {med.frequency}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Importante:</strong> Consulte siempre con un veterinario antes de administrar cualquier medicamento. 
                      Las dosis pueden variar según el peso del animal y la severidad de la condición.
                    </p>
                  </div>
                </div>
              )}

              {/* Generated Calendar */}
              {showCalendar && vaccineSchedule.length > 0 && (
                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-blue-800">
                      Calendario de Vacunación - {animalTypes.find(a => a.value === selectedAnimalType)?.label}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={downloadCalendar}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center text-sm"
                      >
                        <FaDownload className="mr-2" />
                        Descargar CSV
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center text-sm"
                      >
                        <FaPrint className="mr-2" />
                        Imprimir
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vaccineSchedule.map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                        <div className="flex items-center mb-2">
                          <FaSyringe className="text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-800">{item.vaccine}</h4>
                        </div>
                        <p className="text-blue-700 font-medium mb-1">
                          {item.date.toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Consejos para la Salud de tu Ganado</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recomendaciones prácticas de expertos para prevenir enfermedades y mantener a tus animales en óptimas condiciones
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {tip.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{tip.title}</h3>
                </div>
                <p className="text-gray-600">{tip.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section id="contacto" className="mb-20">
          <div className="bg-amber-50 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Contactos de Emergencia</h2>
              <p className="text-gray-600">Asistencia inmediata para casos urgentes</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <FaPhoneAlt className="text-amber-600 mr-3" />
                    <h3 className="text-lg font-medium text-gray-800">{contact.name}</h3>
                  </div>
                  <a 
                    href={`tel:${contact.phone}`} 
                    className="text-xl font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Veterinary Calendar */}
        <section className="mb-20">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Calendario Sanitario</h2>
                <p className="text-gray-600 mb-6">
                  Mantén un control adecuado de las actividades veterinarias a lo largo del año
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <FaCalendarAlt className="text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Primavera</h3>
                      <p className="text-gray-600">Vacunación contra enfermedades respiratorias, control de parásitos internos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <FaCalendarAlt className="text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Verano</h3>
                      <p className="text-gray-600">Control de moscas y garrapatas, vacunación contra enfermedades transmitidas por vectores</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <FaCalendarAlt className="text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Otoño</h3>
                      <p className="text-gray-600">Refuerzo de vacunas, desparasitación estratégica</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <FaCalendarAlt className="text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Invierno</h3>
                      <p className="text-gray-600">Protección contra el frío, suplementación nutricional</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 bg-amber-600 flex items-center justify-center p-8">
                <div className="text-white text-center">
                  <FaStethoscope className="text-6xl mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">¿Necesitas asesoría personalizada?</h3>
                  <p className="mb-6 max-w-md mx-auto">
                    Contáctanos para programar una visita de nuestros veterinarios especializados en ganado
                  </p>
                  <button className="bg-white text-amber-800 px-6 py-3 rounded-full font-medium hover:bg-amber-100 transition-colors">
                    Solicitar visita
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Diseases */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Enfermedades Comunes en Ganado</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Aprende a identificar y prevenir las principales enfermedades que afectan al ganado
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enfermedad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Síntomas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prevención</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Fiebre Aftosa</td>
                  <td className="px-6 py-4 text-gray-600">Ampollas en boca y patas, fiebre, salivación</td>
                  <td className="px-6 py-4 text-gray-600">Vacunación regular, control de movilización</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Brucelosis</td>
                  <td className="px-6 py-4 text-gray-600">Abortos en hembras, infertilidad en machos</td>
                  <td className="px-6 py-4 text-gray-600">Pruebas periódicas, eliminación de positivos</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Parásitos Internos</td>
                  <td className="px-6 py-4 text-gray-600">Pérdida de peso, diarrea, anemia</td>
                  <td className="px-6 py-4 text-gray-600">Desparasitación estratégica, rotación de potreros</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Mastitis</td>
                  <td className="px-6 py-4 text-gray-600">Inflamación de ubres, leche anormal</td>
                  <td className="px-6 py-4 text-gray-600">Higiene en ordeño, tratamiento temprano</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default VeterinaryServicePage;