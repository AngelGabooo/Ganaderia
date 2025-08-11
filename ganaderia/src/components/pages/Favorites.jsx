import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import ProductGrid from '../organisms/ProductGrid';
import Typography from '../atoms/Typography';
import { useFavorites } from '../../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <MainTemplate>
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h1" className="mb-8 text-center">Mis Favoritos</Typography>
        
        {favorites.length > 0 ? (
          <ProductGrid products={favorites} />
        ) : (
          <div className="text-center py-12">
            <Typography variant="h3" className="mb-4">No tienes productos favoritos</Typography>
            <Typography variant="p" className="text-gray-600">
              Agrega productos a tus favoritos haciendo clic en el corazón
            </Typography>
          </div>
        )}
      </div>
    </MainTemplate>
  );
};

export default Favorites;