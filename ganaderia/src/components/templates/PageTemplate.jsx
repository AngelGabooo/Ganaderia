import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const PageTemplate = ({ children, fullWidth = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto px-4 py-8'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageTemplate;