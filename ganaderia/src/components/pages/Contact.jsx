import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <MainTemplate>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <Typography variant="h1" className="mb-4">Contacto</Typography>
          <Typography variant="p" className="text-gray-600 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Escríbenos y te responderemos lo antes posible.
          </Typography>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="check" size="xl" className="text-green-600" />
                  </div>
                  <Typography variant="h3" className="mb-2">¡Gracias por contactarnos!</Typography>
                  <Typography variant="p" className="text-gray-600">
                    Hemos recibido tu mensaje y te responderemos pronto.
                  </Typography>
                  <Button 
                    variant="primary" 
                    className="mt-6"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  
                  <Input
                    label="Mensaje"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                  />
                  
                  <div className="pt-2">
                    <Button type="submit" variant="primary" className="w-full">
                      Enviar Mensaje
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="mail" className="text-blue-600" />
                </div>
                <div>
                  <Typography variant="h4" className="mb-1">Email</Typography>
                  <Typography variant="p" className="text-gray-600">
                    contacto@techshop.com
                  </Typography>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="phone" className="text-blue-600" />
                </div>
                <div>
                  <Typography variant="h4" className="mb-1">Teléfono</Typography>
                  <Typography variant="p" className="text-gray-600">
                    +1 (555) 123-4567
                  </Typography>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="map-pin" className="text-blue-600" />
                </div>
                <div>
                  <Typography variant="h4" className="mb-1">Dirección</Typography>
                  <Typography variant="p" className="text-gray-600">
                    123 Calle Principal<br />
                    Ciudad, País 12345
                  </Typography>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <Typography variant="h4" className="mb-4">Horario de atención</Typography>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="p" className="text-gray-600">Lunes - Viernes</Typography>
                  <Typography variant="p" className="font-medium">9:00 AM - 6:00 PM</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="p" className="text-gray-600">Sábado</Typography>
                  <Typography variant="p" className="font-medium">10:00 AM - 4:00 PM</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="p" className="text-gray-600">Domingo</Typography>
                  <Typography variant="p" className="font-medium">Cerrado</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
};

export default Contact;