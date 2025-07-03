import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

const slides = [
  {
    id: 1,
    title: "VENDES O COMPRAS ",
    subtitle: "Si te interesa comprar o vender ganado revisa la lista de requisitos.",
    backgroundImage: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "Vende tu producto con nosotros",
    subtitle: "Registrate y obten ganancias potenciales",
    backgroundImage: "https://plus.unsplash.com/premium_photo-1664359132441-4cab2cccb891?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "Miles de productos",
    subtitle: "Descubre nuestra amplia variedad de productos ganaderos de calidad",
    backgroundImage: "https://images.unsplash.com/photo-1616517278632-60c8e088d19e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setFade(true);
    }, 500);
  };

  return (
    <div 
      className={styles.carousel}
      style={{ backgroundImage: `url(${slides[currentSlide].backgroundImage})` }}
    >
      <div className={`${styles.carouselContent} ${fade ? styles.fadeIn : styles.fadeOut}`}>
        <h1 className={`${styles.title} ${styles.slideIn}`}>{slides[currentSlide].title}</h1>
        <p className={`${styles.subtitle} ${styles.slideIn}`}>{slides[currentSlide].subtitle}</p>
      </div>
      
      <div className={styles.dots}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;