import React from 'react';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import { useFavorites } from '../../context/FavoritesContext';

const ProductCard = ({ product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleWhatsAppClick = () => {
    const message = `Hola, estoy interesado en comprar: ${product.name} (${product.price})`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/529641064269?text=${encodedMessage}`, '_blank');
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
      {/* Botón de favoritos */}
      <button 
        onClick={toggleFavorite}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
      >
        <Icon 
          name={favorite ? "heart-filled" : "heart"} 
          className={favorite ? "text-red-500" : "text-gray-400"} 
        />
      </button>
      
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <Typography variant="h4" className="mb-2">{product.name}</Typography>
        <Typography variant="p" className="text-gray-600 mb-4">{product.description}</Typography>
        <div className="flex justify-between items-center">
          <Typography variant="h4" className="text-blue-600">${product.price}</Typography>
          <Button 
            variant="primary" 
            onClick={handleWhatsAppClick}
            className="flex items-center space-x-1"
          >
            <Icon name="whatsapp" className="text-white" />
            <span>Comprar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;