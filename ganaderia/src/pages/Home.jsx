import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Home.module.css';
import Header from '../organisms/Header';
import Carousel from '../organisms/Carousel';
import Products from '../organisms/Products';
import LivestockCatalog from '../organisms/LivestockCatalog';
import SubscriptionPlans from '../organisms/SubscriptionPlans';
import FeedCalculator from '../organisms/FeedCalculator';
import TestimonialsSection from '../organisms/TestimonialsSection';
import VerifiedProducersSection from '../organisms/VerifiedProducersSection';
import Footer from '../organisms/Footer'; 


const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className={styles.home}>
      <Header />
      <main>
        <Carousel />
        <Products id="productos" />
        <LivestockCatalog id="requisitos" />
        <FeedCalculator />
        <SubscriptionPlans />
        <TestimonialsSection id="contactos" />
        <VerifiedProducersSection />
      </main>
      <Footer /> {/* Agrega el Footer aquí */}
    </div>
  );
};

export default Home;