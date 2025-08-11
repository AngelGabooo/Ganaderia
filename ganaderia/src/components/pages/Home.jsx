import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import Carousel from '../organisms/Carousel';
import ProductGrid from '../organisms/ProductGrid';
import Typography from '../atoms/Typography';

const carouselItems = [
  {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Auriculares de alta calidad',
    title: 'Auriculares Premium'
  },
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Reloj inteligente',
    title: 'Smartwatches'
  },
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Zapatillas deportivas',
    title: 'Zapatillas Deportivas'
  }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Auriculares Inalámbricos',
    description: 'Sonido de alta calidad con cancelación de ruido',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'Smartwatch Pro',
    description: 'Monitoriza tu salud y actividad física',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'Cámara DSLR',
    description: 'Captura momentos con gran detalle',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    name: 'Altavoz Bluetooth',
    description: 'Sonido potente y portátil',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }
];

const Home = () => {
  return (
    <MainTemplate>
      {/* Sección del carrusel */}
      <section className="relative">
        <Carousel items={carouselItems} />
      </section>
      
      {/* Sección de contenido principal */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-12 md:mb-16">
          <Typography variant="h2" className="mb-4 text-3xl md:text-4xl font-bold">
            Bienvenido a TechShop
          </Typography>
          <Typography variant="p" className="max-w-2xl mx-auto text-gray-600 text-lg">
            Encuentra los mejores productos electrónicos al mejor precio. Calidad garantizada y envío rápido.
          </Typography>
        </div>
        
        <Typography variant="h2" className="mb-8 text-2xl md:text-3xl font-bold text-center">
          Productos Destacados
        </Typography>
        <ProductGrid products={featuredProducts} />
      </section>
    </MainTemplate>
  );
};

export default Home;