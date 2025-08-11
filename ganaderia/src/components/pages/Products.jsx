import React, { useState } from 'react';
import MainTemplate from '../templates/MainTemplate';
import ProductGrid from '../organisms/ProductGrid';
import SearchBar from '../molecules/SearchBar';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';

const allProducts = [
  {
    id: 1,
    name: 'Auriculares Inalámbricos',
    description: 'Sonido de alta calidad con cancelación de ruido',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'audio'
  },
  {
    id: 2,
    name: 'Smartwatch Pro',
    description: 'Monitoriza tu salud y actividad física',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'wearables'
  },
  {
    id: 3,
    name: 'Cámara DSLR',
    description: 'Captura momentos con gran detalle',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'fotografia'
  },
  {
    id: 4,
    name: 'Altavoz Bluetooth',
    description: 'Sonido potente y portátil',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'audio'
  },
  {
    id: 5,
    name: 'Teclado Mecánico',
    description: 'Teclado para gamers y programadores',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551380871-c56b3d0bf2b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'accesorios'
  },
  {
    id: 6,
    name: 'Monitor 4K',
    description: 'Pantalla de 27 pulgadas con resolución Ultra HD',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1546538915-a9e2c8d5a8d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'monitores'
  }
];

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'audio', name: 'Audio' },
  { id: 'wearables', name: 'Wearables' },
  { id: 'fotografia', name: 'Fotografía' },
  { id: 'accesorios', name: 'Accesorios' },
  { id: 'monitores', name: 'Monitores' }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <MainTemplate>
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h1" className="mb-8 text-center">Nuestros Productos</Typography>
        
        <div className="mb-8">
          <SearchBar 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="mb-4"
          />
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                onClick={() => setSelectedCategory(category.id)}
                className="px-4 py-2 rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-12">
            <Typography variant="h3" className="mb-4">No se encontraron productos</Typography>
            <Typography variant="p" className="text-gray-600">
              Intenta con otros términos de búsqueda o categorías
            </Typography>
          </div>
        )}
      </div>
    </MainTemplate>
  );
};

export default Products;