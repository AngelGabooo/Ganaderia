import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiChevronDown, FiChevronUp, FiX, FiMenu } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import Logo from '../atoms/Logo';
import NavItem from '../molecules/NavItem';
import { Crown } from 'lucide-react';

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCompaniesHovered, setIsCompaniesHovered] = useState(false);
  const [isMobileCompaniesOpen, setIsMobileCompaniesOpen] = useState(false);
  const navigate = useNavigate();
  const { cart, favorites } = useAppContext();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileCompaniesOpen(false);
  };

  const toggleMobileCompanies = () => setIsMobileCompaniesOpen(!isMobileCompaniesOpen);

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/login');
  };
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;

      const scrollY = window.scrollY;
      const header = document.getElementById('main-header');

      if (scrollY > 100) {
        setScrolled(true);
        if (scrollY > lastScrollY && scrollY > 200) {
          header.classList.add('-translate-y-full');
        } else {
          header.classList.remove('-translate-y-full');
          header.classList.add('bg-amber-800', 'shadow-xl', 'backdrop-blur-md');
        }
      } else {
        setScrolled(false);
        if (window.innerWidth > 768) {
          header.classList.remove('bg-amber-800', 'shadow-xl', 'backdrop-blur-md');
        }
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  return (
    <>
      {/* Header principal */}
      <header
        id="main-header"
        className={`
          fixed top-0 left-0 w-full z-50 py-3 transition-all duration-500 ease-out
          ${scrolled || isMenuOpen ? 'bg-amber-800 shadow-xl backdrop-blur-md' : 'bg-amber-800 md:bg-transparent'}
          text-gray-800
          border-b border-amber-700
        `}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between relative">
          <Link to="/" className="z-50">
            <Logo className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex space-x-8 items-center absolute left-1/2 transform -translate-x-1/2">
            <NavItem href="/" className="text-black hover:text-black font-bold">Inicio</NavItem>
            <NavItem href="/productos" className="text-black hover:text-black font-bold">Productos</NavItem>
            <NavItem href="/dashboard" className="text-black hover:text-black font-bold">Requisitos</NavItem>
            <NavItem href="/contactos" className="text-black hover:text-black font-bold">Contactos</NavItem>
            
            {/* Menú desplegable para Empresas (Desktop) */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCompaniesHovered(true)}
              onMouseLeave={() => setIsCompaniesHovered(false)}
            >
              <button className="flex items-center space-x-1 text-black hover:text-black transition-colors font-bold">
                <span>Empresas</span>
                {isCompaniesHovered ? (
                  <FiChevronUp className="h-4 w-4" />
                ) : (
                  <FiChevronDown className="h-4 w-4" />
                )}
              </button>
              
              <div 
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 transition-all duration-300 ${
                  isCompaniesHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <Link 
                  to="/empresas" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-medium"
                >
                  Todas las empresas
                </Link>
                <Link 
                  to="/faq" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-medium"
                >
                  Preguntas Frecuentes
                </Link>
                <Link 
                  to="/subastas-ganaderas" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-medium"
                >
                  Subastas
                </Link>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex space-x-4 items-center ml-auto">
            <Link
              to="/favoritos"
              className="relative p-2 text-amber-100 hover:text-red-300 transition-colors duration-300"
            >
              <FiHeart className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/carrito"
              className="relative p-2 text-amber-100 hover:text-green-300 transition-colors duration-300"
            >
              <FiShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cart.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => handleNavigation('/suscripciones')}
              className="bg-transparent text-white border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-amber-800 transition-all duration-300 font-medium"
            >
              SUSCRIPCIONES
            </button>

            <button
              onClick={() => handleNavigation('/login')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
            >
              LOGIN
            </button>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md focus:outline-none z-50 text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Menú móvil */}
      <div className={`
        fixed inset-0 z-40 transition-all duration-300
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        md:hidden
        bg-amber-800/95 backdrop-blur-sm
        pt-20
      `}>
        <div className="relative h-full w-full overflow-y-auto">
          <nav className="flex flex-col items-center justify-start h-full pb-10 px-6 space-y-4">
            <NavItem
              href="/"
              mobile
              onClick={closeMenu}
              className="text-white hover:text-amber-100 text-xl font-medium"
            >
              Inicio
            </NavItem>

            <NavItem
              href="/productos"
              mobile
              onClick={closeMenu}
              className="text-white hover:text-amber-100 text-xl font-medium"
            >
              Productos
            </NavItem>

            <NavItem
              href="/dashboard"
              mobile
              onClick={closeMenu}
              className="text-white hover:text-amber-100 text-xl font-medium"
            >
              Requisitos
            </NavItem>

            <NavItem
              href="/contactos"
              mobile
              onClick={closeMenu}
              className="text-white hover:text-amber-100 text-xl font-medium"
            >
              Contactos
            </NavItem>

            {/* Menú desplegable para Empresas (Mobile) */}
            <div className="w-full max-w-xs">
              <button
                onClick={toggleMobileCompanies}
                className="flex items-center justify-between w-full text-white hover:text-amber-100 text-xl font-medium py-2 px-4"
              >
                <span>Empresas</span>
                {isMobileCompaniesOpen ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                isMobileCompaniesOpen ? 'max-h-40' : 'max-h-0'
              }`}>
                <div className="pl-6 space-y-2 mt-2">
                  <Link
                    to="/empresas"
                    onClick={closeMenu}
                    className="block text-white hover:text-amber-100 text-lg font-medium"
                  >
                    Todas las empresas
                  </Link>
                  <Link
                    to="/faq"
                    onClick={closeMenu}
                    className="block text-white hover:text-amber-100 text-lg font-medium"
                  >
                    Preguntas Frecuentes
                  </Link>
                  <Link
                    to="/subastas-ganaderas"
                    onClick={closeMenu}
                    className="block text-white hover:text-amber-100 text-lg font-medium"
                  >
                    Subastas
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex space-x-8 my-6">
              <Link
                to="/favoritos"
                onClick={closeMenu}
                className="flex flex-col items-center text-white hover:text-red-300"
              >
                <div className="relative">
                  <FiHeart className="h-6 w-6" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <span className="text-sm mt-1">Favoritos</span>
              </Link>

              <Link
                to="/carrito"
                onClick={closeMenu}
                className="flex flex-col items-center text-white hover:text-green-300"
              >
                <div className="relative">
                  <FiShoppingCart className="h-6 w-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </div>
                <span className="text-sm mt-1">Carrito</span>
              </Link>
            </div>

            <div className="w-full max-w-xs space-y-4 mt-8">
              <button
                onClick={() => handleNavigation('/suscripciones')}
                className="w-full bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-amber-800 transition-all"
              >
                SUSCRIPCIONES
              </button>

              <button
                onClick={() => handleNavigation('/login')}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-500 transition-colors"
              >
                LOGIN
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;