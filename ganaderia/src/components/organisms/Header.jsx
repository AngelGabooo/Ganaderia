import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import { useFavorites } from '../../context/FavoritesContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { favorites } = useFavorites();

  const tabs = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/productos' },
    { name: 'Contacto', path: '/contacto' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-0' 
          : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-2'
        }
      `}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`
              relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
              ${isScrolled 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg' 
                : 'bg-white/20 backdrop-blur-sm border border-white/30'
              }
              group-hover:scale-105
            `}>
              <Icon name="store" className="text-white w-6 h-6" />
            </div>
            <Typography 
              variant="h3" 
              className={`
                font-bold transition-colors duration-300
                ${isScrolled ? 'text-gray-800' : 'text-white'}
              `}
            >
              TechShop
            </Typography>
          </Link>
          
          {/* Navegación Central - Desktop */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <ul className="flex items-center space-x-8">
              {tabs.map((tab) => (
                <li key={tab.name}>
                  <Link 
                    to={tab.path}
                    className={`
                      relative py-2 px-4 rounded-full font-medium transition-all duration-300
                      ${isScrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {tab.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/favoritos"
                  className={`
                    relative py-2 px-4 rounded-full font-medium transition-all duration-300
                    ${isScrolled 
                      ? 'text-gray-700 hover:text-red-600 hover:bg-red-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  Favoritos
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Acciones del header */}
          <div className="flex items-center space-x-2">
            {/* Botón de favoritos */}
            <Link to="/favoritos" className="relative">
              <Button 
                variant="ghost" 
                className={`
                  p-2 rounded-lg transition-all duration-300
                  ${isScrolled 
                    ? 'hover:bg-gray-100 text-gray-700' 
                    : 'hover:bg-white/10 text-white'
                  }
                `}
              >
                <Icon 
                  name={favorites.length > 0 ? "heart-filled" : "heart"} 
                  size="md" 
                  className={favorites.length > 0 ? "text-red-500" : "text-gray-400"}
                />
              </Button>
              {favorites.length > 0 && (
                <span className={`
                  absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold
                  flex items-center justify-center
                  ${isScrolled 
                    ? 'bg-red-500 text-white shadow' 
                    : 'bg-white text-red-500 shadow'
                  }
                `}>
                  {favorites.length}
                </span>
              )}
            </Link>
            
            {/* Botón del carrito */}
            <Button 
              variant="ghost" 
              className={`
                p-2 rounded-lg transition-all duration-300
                ${isScrolled 
                  ? 'hover:bg-gray-100 text-gray-700' 
                  : 'hover:bg-white/10 text-white'
                }
              `}
            >
              <Icon name="cart" size="md" />
            </Button>

            {/* Botón de menú hamburguesa para móvil */}
            <Button 
              variant="ghost" 
              className={`
                lg:hidden p-2 rounded-lg transition-all duration-300
                ${isScrolled 
                  ? 'hover:bg-gray-100 text-gray-700' 
                  : 'hover:bg-white/10 text-white'
                }
              `}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? "x" : "menu"} size="md" />
            </Button>
          </div>
        </div>
        
        {/* Menú móvil */}
        <div className={`
          lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96' : 'max-h-0'}
        `}>
          <nav className={`
            py-4 border-t
            ${isScrolled 
              ? 'border-gray-200 bg-white' 
              : 'border-white/20 bg-black/10'
            }
          `}>
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.name}>
                  <Link 
                    to={tab.path}
                    className={`
                      block py-3 px-4 rounded-lg font-medium transition-all duration-300
                      ${isScrolled 
                        ? 'text-gray-700 hover:bg-gray-100' 
                        : 'text-white hover:bg-white/10'
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tab.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/favoritos"
                  className={`
                    block py-3 px-4 rounded-lg font-medium transition-all duration-300
                    ${isScrolled 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-white/10'
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex justify-between items-center">
                    <span>Favoritos</span>
                    {favorites.length > 0 && (
                      <span className={`
                        px-2 py-1 text-xs rounded-full
                        ${isScrolled 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white text-red-500'
                        }
                      `}>
                        {favorites.length}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;