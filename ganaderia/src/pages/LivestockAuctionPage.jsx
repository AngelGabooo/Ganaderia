import React, { useState, useEffect } from 'react';
import { 
  FiSearch, FiFilter, FiHeart, FiShare2, FiClock, FiMapPin, 
  FiDollarSign, FiCalendar, FiAward, FiClipboard, FiCheck, FiX, FiHome 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Footer from '../organisms/Footer'; // Asegúrate de ajustar esta ruta según tu estructura de archivos

const LivestockAuctionPage = () => {
  const navigate = useNavigate();
  
  // Estados para los modales
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState({
    show: false,
    animal: null,
    bidAmount: 0
  });
  const [showBuyModal, setShowBuyModal] = useState({
    show: false,
    animal: null
  });
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Estados para la aplicación
  const [filters, setFilters] = useState({
    animalType: '',
    breed: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    healthStatus: ''
  });

  const [showFilters, setShowFilters] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [currentBid, setCurrentBid] = useState('');
  const [timeRemaining, setTimeRemaining] = useState({});

  // Datos de ejemplo para los animales
  const [livestockData, setLivestockData] = useState([
    {
      id: 1,
      lotNumber: 'G-2025-08965',
      type: 'Toro',
      breed: 'Angus',
      age: '3 años 4 meses',
      weight: '580 kg',
      location: 'OH - Cleveland West',
      price: 4850,
      bidPrice: 1600,
      status: 'Saludable',
      primaryDamage: 'Lesión pata trasera (2019)',
      secondaryDamage: 'Ninguno',
      retailValue: 4850,
      color: 'Negro',
      images: [
        'https://images.unsplash.com/photo-1549318581-ec37ba9f2413?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1545460580-36c1957cfde1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ],
      auctionEnd: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      runAndDrive: true,
      pedigree: {
        father: 'Torón de Oro',
        mother: 'Bella 345',
        grandparents: ['Gran Toro', 'Estrella Blanca']
      },
      performance: {
        growthRate: '1.2 kg/día',
        awards: ['Campeón Feria Regional 2023']
      },
      health: {
        lastCheckup: '2023-05-15',
        vaccinations: ['Fiebre aftosa', 'Brucelosis'],
        diet: 'Pastura + suplemento mineral'
      }
    },
    {
      id: 2,
      lotNumber: 'G-2025-08966',
      type: 'Vaca',
      breed: 'Hereford',
      age: '4 años 2 meses',
      weight: '620 kg',
      location: 'TX - Dallas North',
      price: 4200,
      bidPrice: 2100,
      status: 'Saludable',
      primaryDamage: 'Ninguno',
      secondaryDamage: 'Ninguno',
      retailValue: 4200,
      color: 'Blanco y rojo',
      images: [
        'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1545460580-36c1957cfde1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ],
      auctionEnd: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      runAndDrive: true,
      pedigree: {
        father: 'Rey Hereford',
        mother: 'Estrella 789',
        grandparents: ['Gran Hereford', 'Bella 123']
      },
      performance: {
        growthRate: '1.1 kg/día',
        awards: []
      },
      health: {
        lastCheckup: '2023-06-10',
        vaccinations: ['Fiebre aftosa', 'Brucelosis', 'Leptospirosis'],
        diet: 'Pastura + suplemento proteico'
      }
    },
    {
      id: 3,
      lotNumber: 'G-2025-08967',
      type: 'Toro',
      breed: 'Brahman',
      age: '2 años 8 meses',
      weight: '520 kg',
      location: 'FL - Miami Central',
      price: 3800,
      bidPrice: 1800,
      status: 'En tratamiento',
      primaryDamage: 'Problema digestivo leve',
      secondaryDamage: 'Ninguno',
      retailValue: 3800,
      color: 'Gris',
      images: [
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1545460580-36c1957cfde1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ],
      auctionEnd: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      runAndDrive: false,
      pedigree: {
        father: 'Sultán Brahman',
        mother: 'Perla 456',
        grandparents: ['Gran Brahman', 'Estrella Gris']
      },
      performance: {
        growthRate: '1.0 kg/día',
        awards: []
      },
      health: {
        lastCheckup: '2023-07-01',
        vaccinations: ['Fiebre aftosa'],
        diet: 'Dieta especial + medicamentos'
      }
    }
  ]);

  // Filtrar animales basado en los filtros seleccionados
  const filteredLivestock = livestockData.filter(animal => {
    return (
      (filters.animalType === '' || animal.type.toLowerCase().includes(filters.animalType.toLowerCase())) &&
      (filters.breed === '' || animal.breed.toLowerCase().includes(filters.breed.toLowerCase())) &&
      (filters.location === '' || animal.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.healthStatus === '' || animal.status.toLowerCase().includes(filters.healthStatus.toLowerCase())) &&
      (filters.minPrice === '' || animal.bidPrice >= Number(filters.minPrice)) &&
      (filters.maxPrice === '' || animal.bidPrice <= Number(filters.maxPrice))
    );
  });

  // Función para manejar el cambio en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Función para resetear los filtros
  const resetFilters = () => {
    setFilters({
      animalType: '',
      breed: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      healthStatus: ''
    });
  };

  // Función para formatear el tiempo restante
  const formatAuctionEnd = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Subasta finalizada';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Actualizar el tiempo restante cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeRemaining = {};
      livestockData.forEach(animal => {
        newTimeRemaining[animal.id] = formatAuctionEnd(animal.auctionEnd);
      });
      setTimeRemaining(newTimeRemaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [livestockData]);

  // Función para mostrar notificación
  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  // Función para mostrar modal de puja
  const openBidModal = (animal) => {
    const bidAmount = Number(currentBid);
    if (isNaN(bidAmount)) {
      showNotification('Por favor ingrese una cantidad válida', 'error');
      return;
    }

    if (bidAmount <= animal.bidPrice) {
      showNotification(`Su oferta debe ser mayor a $${animal.bidPrice}`, 'error');
      return;
    }

    setShowBidModal({
      show: true,
      animal,
      bidAmount
    });
  };

  // Función para confirmar puja
  const confirmBid = () => {
    const { animal, bidAmount } = showBidModal;
    const animalIndex = livestockData.findIndex(a => a.id === animal.id);
    
    if (animalIndex !== -1) {
      const updatedData = [...livestockData];
      updatedData[animalIndex].bidPrice = bidAmount;
      setLivestockData(updatedData);
      setCurrentBid('');
      showNotification(`¡Oferta de $${bidAmount} realizada con éxito!`);
    }
    
    setShowBidModal({ show: false, animal: null, bidAmount: 0 });
  };

  // Función para abrir modal de compra
  const openBuyModal = (animal) => {
    setShowBuyModal({
      show: true,
      animal
    });
  };

  // Función para confirmar compra
  const confirmPurchase = () => {
    const { animal } = showBuyModal;
    showNotification(`¡Felicidades! Ha comprado ${animal.type} ${animal.breed} por $${animal.price}`);
    setShowBuyModal({ show: false, animal: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <nav className="bg-gradient-to-r from-amber-700 to-amber-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Botón para regresar a Home */}
            <button 
              onClick={() => navigate('/')}
              className="p-2 bg-amber-800 rounded-lg hover:bg-amber-700 transition shadow flex items-center"
              title="Regresar al inicio"
            >
              <FiHome className="text-white" />
            </button>
            <h1 className="text-xl font-bold">Subastas Ganaderas</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 bg-amber-800 rounded-lg hover:bg-amber-700 transition shadow"
            >
              Mis Apuestas
            </button>
            <button 
              onClick={() => navigate('/suscripciones')}
              className="px-4 py-2 bg-amber-900 rounded-lg hover:bg-amber-800 transition shadow"
            >
              Ingresar
            </button>
          </div>
        </div>
      </nav>

      {/* Modal de inicio de sesión */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Iniciar sesión</h3>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Debes iniciar sesión para ver tus apuestas. ¿Deseas ir a la página de inicio de sesión?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => navigate('/suscripciones')}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
              >
                Ir a iniciar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de puja */}
      {showBidModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Confirmar oferta</h3>
              <button 
                onClick={() => setShowBidModal({ show: false, animal: null, bidAmount: 0 })}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              ¿Está seguro que desea ofertar <span className="font-bold">${showBidModal.bidAmount.toLocaleString()}</span> por este {showBidModal.animal.type} {showBidModal.animal.breed}?
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiDollarSign className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    Puja actual: <span className="font-bold">${showBidModal.animal.bidPrice.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowBidModal({ show: false, animal: null, bidAmount: 0 })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmBid}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Confirmar oferta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de compra */}
      {showBuyModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Confirmar compra</h3>
              <button 
                onClick={() => setShowBuyModal({ show: false, animal: null })}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              ¿Está seguro que desea comprar este <span className="font-bold">{showBuyModal.animal.type} {showBuyModal.animal.breed}</span> por <span className="font-bold">${showBuyModal.animal.price.toLocaleString()}</span>?
            </p>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiCheck className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Esta compra será inmediata y el animal será retirado de la subasta.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowBuyModal({ show: false, animal: null })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmPurchase}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Confirmar compra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notificación */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <FiCheck className="mr-2" />
          ) : (
            <FiX className="mr-2" />
          )}
          {notification.message}
        </div>
      )}

      {/* Contenido principal */}
      <main className="container mx-auto p-4">
        {!selectedAnimal ? (
          <>
            {/* Sección de filtros */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-grow">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar animales..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg transition shadow ${showFilters ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
                >
                  <FiFilter className="mr-2" />
                  {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                </button>
              </div>

              {/* Filtros avanzados */}
              {showFilters && (
                <div className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    <select
                      name="animalType"
                      value={filters.animalType}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Tipo de animal</option>
                      <option value="toro">Toro</option>
                      <option value="vaca">Vaca</option>
                      <option value="cerdo">Cerdo</option>
                      <option value="oveja">Oveja</option>
                    </select>

                    <select
                      name="breed"
                      value={filters.breed}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Raza</option>
                      <option value="angus">Angus</option>
                      <option value="hereford">Hereford</option>
                      <option value="brahman">Brahman</option>
                      <option value="duroc">Duroc</option>
                    </select>

                    <select
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Ubicación</option>
                      <option value="cleveland">OH - Cleveland West</option>
                      <option value="dallas">TX - Dallas North</option>
                      <option value="miami">FL - Miami Central</option>
                    </select>

                    <select
                      name="healthStatus"
                      value={filters.healthStatus}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Estado de salud</option>
                      <option value="saludable">Saludable</option>
                      <option value="tratamiento">En tratamiento</option>
                      <option value="campeón">Campeón</option>
                    </select>

                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Precio mínimo"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />

                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Precio máximo"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={resetFilters}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition flex items-center"
                    >
                      <FiX className="mr-1" />
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Grid de animales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLivestock.map((animal) => (
                <div 
                  key={animal.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 hover:border-amber-200"
                  onClick={() => setSelectedAnimal(animal)}
                >
                  {/* Imagen principal */}
                  <div className="relative h-48 bg-gray-200">
                    <img 
                      src={animal.images[0]} 
                      alt={animal.type} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/300?text=Imagen+no+disponible';
                      }}
                    />
                    <div className="absolute bottom-2 left-2 flex space-x-1">
                      {animal.images.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="w-8 h-8 border-2 border-white rounded-sm overflow-hidden shadow">
                          <img 
                            src={img} 
                            alt="" 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = 'https://via.placeholder.com/50?text=+';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button 
                        className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          showNotification('Añadido a favoritos', 'success');
                        }}
                      >
                        <FiHeart className="text-gray-600 hover:text-red-500" />
                      </button>
                      <button 
                        className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          showNotification('Enlace copiado al portapapeles', 'success');
                        }}
                      >
                        <FiShare2 className="text-gray-600 hover:text-blue-500" />
                      </button>
                    </div>
                    {animal.runAndDrive && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow">
                        Run & Drive
                      </div>
                    )}
                  </div>

                  {/* Información del animal */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-800">
                        {animal.type} {animal.breed}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        animal.status === 'Saludable' ? 'bg-green-100 text-green-800' :
                        animal.status === 'En tratamiento' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {animal.status}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <FiMapPin className="mr-1" />
                      {animal.location}
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Edad</p>
                        <p className="font-medium">{animal.age}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Peso</p>
                        <p className="font-medium">{animal.weight}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-500 text-sm">Valor de mercado</p>
                          <p className="font-bold text-gray-800">${animal.price.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 text-sm">Puja actual</p>
                          <p className="font-bold text-amber-600">${animal.bidPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <FiClock className="mr-1" />
                      Finaliza en: {timeRemaining[animal.id] || formatAuctionEnd(animal.auctionEnd)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredLivestock.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">No se encontraron animales con los filtros seleccionados</h3>
                <button 
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </>
        ) : (
          /* Vista detallada del animal seleccionado */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Botón para volver */}
            <button 
              onClick={() => setSelectedAnimal(null)}
              className="m-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center shadow"
            >
              ← Volver a resultados
            </button>

            {/* Galería de imágenes */}
            <div className="relative h-96 bg-gray-200">
              <img 
                src={selectedAnimal.images[0]} 
                alt={selectedAnimal.type} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/800x400?text=Imagen+no+disponible';
                }}
              />
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {selectedAnimal.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="w-12 h-12 border-2 border-white rounded-sm overflow-hidden cursor-pointer hover:border-amber-400 transition shadow"
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/50?text=+';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Contenido principal */}
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Columna izquierda - Información detallada */}
                <div className="lg:w-2/3">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {selectedAnimal.type} {selectedAnimal.breed} - Lote #{selectedAnimal.lotNumber}
                  </h1>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      selectedAnimal.status === 'Saludable' ? 'bg-green-100 text-green-800' :
                      selectedAnimal.status === 'En tratamiento' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedAnimal.status}
                    </span>
                    {selectedAnimal.runAndDrive && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Run & Drive
                      </span>
                    )}
                    {selectedAnimal.performance.awards.length > 0 && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                        <FiAward className="mr-1" />
                        {selectedAnimal.performance.awards[0]}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <FiClipboard className="mr-2 text-amber-600" />
                        Información Básica
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Edad:</span>
                          <span className="font-medium">{selectedAnimal.age}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Peso:</span>
                          <span className="font-medium">{selectedAnimal.weight}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Color:</span>
                          <span className="font-medium">{selectedAnimal.color}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Ubicación:</span>
                          <span className="font-medium">{selectedAnimal.location}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <FiClipboard className="mr-2 text-amber-600" />
                        Historial Médico
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Último chequeo:</span>
                          <span className="font-medium">{selectedAnimal.health.lastCheckup}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Vacunas:</span>
                          <span className="font-medium">{selectedAnimal.health.vaccinations.join(', ')}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Daños primarios:</span>
                          <span className="font-medium">{selectedAnimal.primaryDamage}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Daños secundarios:</span>
                          <span className="font-medium">{selectedAnimal.secondaryDamage}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <FiClipboard className="mr-2 text-amber-600" />
                        Pedigrí
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Padre:</span>
                          <span className="font-medium">{selectedAnimal.pedigree.father}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Madre:</span>
                          <span className="font-medium">{selectedAnimal.pedigree.mother}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Abuelos:</span>
                          <span className="font-medium">{selectedAnimal.pedigree.grandparents.join(', ')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Sección de rendimiento */}
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3">Rendimiento</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Tasa de crecimiento</h4>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          {selectedAnimal.performance.growthRate}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Alimentación actual</h4>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          {selectedAnimal.health.diet}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna derecha - Panel de subasta */}
                <div className="lg:w-1/3">
                  <div className="bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 shadow">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Información de Subasta</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Fecha de venta:</span>
                        <span className="font-medium">
                          <FiCalendar className="inline mr-1" />
                          {new Date(selectedAnimal.auctionEnd).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subasta:</span>
                        <span className="font-medium">{selectedAnimal.location}</span>
                      </div>

                      <div className="py-4 border-y border-amber-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Valor de mercado:</span>
                          <span className="font-bold text-lg">${selectedAnimal.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Puja actual:</span>
                          <span className="font-bold text-xl text-amber-600">${selectedAnimal.bidPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="bg-amber-100 border border-amber-200 rounded-lg p-3 text-center shadow-inner">
                        <div className="flex items-center justify-center">
                          <FiClock className="mr-2 text-amber-700" />
                          <span className="font-medium text-amber-800">
                            Subasta termina en: {timeRemaining[selectedAnimal.id] || formatAuctionEnd(selectedAnimal.auctionEnd)}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Realizar oferta</h3>
                        <div className="flex items-center">
                          <span className="mr-2 font-medium">$</span>
                          <input
                            type="number"
                            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Ingrese su oferta"
                            min={selectedAnimal.bidPrice + 50}
                            step="50"
                            value={currentBid}
                            onChange={(e) => setCurrentBid(e.target.value)}
                          />
                          <button 
                            className="px-4 py-2 bg-amber-600 text-white rounded-r-lg hover:bg-amber-700 transition shadow"
                            onClick={() => openBidModal(selectedAnimal)}
                          >
                            Ofertar
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Incremento mínimo: $50</p>
                      </div>

                      <div className="mt-4">
                        <button 
                          className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-bold hover:from-green-700 hover:to-green-600 transition shadow flex items-center justify-center"
                          onClick={() => openBuyModal(selectedAnimal)}
                        >
                          <FiDollarSign className="mr-2" />
                          Comprar ahora por ${selectedAnimal.price.toLocaleString()}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Resumen de costos */}
                  <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow">
                    <h3 className="font-semibold text-gray-800 mb-3">Resumen de costos</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Puja final:</span>
                        <span>${selectedAnimal.bidPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tarifas de subasta:</span>
                        <span>$740</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tarifas de documentación:</span>
                        <span>$139</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200 font-bold">
                        <div className="flex justify-between">
                          <span>Total estimado:</span>
                          <span>${(selectedAnimal.bidPrice + 740 + 139).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Usamos tu componente Footer personalizado */}
      <Footer />
    </div>
  );
};

export default LivestockAuctionPage;