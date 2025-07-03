import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- Agrega useNavigate
import Header from '../organisms/Header';
import { useAppContext } from '../context/AppContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useAppContext();
  const navigate = useNavigate(); // <-- Inicializa useNavigate

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Tu Carrito de Compras</h1>
            <span className="text-gray-500">{cart.length} {cart.length === 1 ? 'producto' : 'productos'}</span>
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-700">Tu carrito está vacío</h3>
              <p className="mt-2 text-gray-500 mb-6">Agrega productos para continuar</p>
              <Link 
                to="/productos" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200"
              >
                Explorar productos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="p-5 flex flex-col sm:flex-row gap-5">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                            <p className="text-emerald-600 font-bold mt-2">${item.price.toLocaleString()}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="px-3 py-1 text-center w-8">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-28">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen de compra</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
                    <span>${calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="text-emerald-600 font-medium">Gratis</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
                
                <button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                  onClick={() => navigate('/suscripciones')} // <-- Añade este onClick
                >
                  Proceder al pago
                </button>
                
                <div className="mt-4 flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs text-gray-500">Pago seguro con encriptación SSL</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;