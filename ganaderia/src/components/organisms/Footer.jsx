import React from 'react';
import Typography from '../atoms/Typography';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Typography variant="h4" className="mb-4">Mi E-commerce</Typography>
            <Typography variant="p">La mejor tienda en línea para tus necesidades.</Typography>
          </div>
          <div>
            <Typography variant="h4" className="mb-4">Enlaces Rápidos</Typography>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Inicio</a></li>
              <li><a href="#" className="hover:text-blue-400">Productos</a></li>
              <li><a href="#" className="hover:text-blue-400">Contacto</a></li>
            </ul>
          </div>
          <div>
            <Typography variant="h4" className="mb-4">Contacto</Typography>
            <Typography variant="p">email@example.com</Typography>
            <Typography variant="p">+1 234 567 890</Typography>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <Typography variant="p">© 2023 Mi E-commerce. Todos los derechos reservados.</Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;