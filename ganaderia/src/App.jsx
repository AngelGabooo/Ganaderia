import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Subscriptions from './pages/Subscriptions';
import FAQ from './pages/FAQ';
import ProductPage from './pages/ProductPage';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import CompaniesPage from './pages/CompaniesPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import NutriGanPage from './pages/NutriGanPage';
import VeterinariaElCampoPage from './pages/VeterinariaElCampoPage';
import MaquinariaSurPage from './pages/MaquinariaSurPage';
import SemillasPremiumPage from './pages/SemillasPremiumPage';
import TransporteGanaderoPage from './pages/TransporteGanaderoPage';
import ContactPage from './pages/ContactPage';
import FloatingAlerts from './pages/FloatingAlerts';
import LivestockAuctionPage from './pages/LivestockAuctionPage';
import TermsAndConditionsModal from './organisms/TermsAndConditionsModal';
import DashboardRouter from './pages/DashboardRouter';
import BusinessDashboard from './pages/Subscriptions';
import VeterinaryServicePage from './pages/VeterinaryServicePage';
import ForgotPassword from './pages/ForgotPassword'; // Nuevo componente
import ResetPassword from './pages/ResetPassword'; // Nuevo componente

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        {/* Componente de términos y condiciones */}
        <TermsAndConditionsModal />
        {/* Componente de alertas flotantes */}
        <FloatingAlerts />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Nueva ruta */}
          <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Nueva ruta */}
          <Route path="/productos" element={<ProductPage />} />
          <Route path="/contactos" element={<ContactPage />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/suscripciones" element={<Subscriptions />} />
          <Route path="/dashboard/:userId" element={<DashboardRouter />} />
          <Route path="/dashboard" element={<BusinessDashboard />} />
          {/* Nueva ruta para subastas ganaderas */}
          <Route path="/subastas-ganaderas" element={<LivestockAuctionPage />} />
          <Route path="/servicio-medico" element={<VeterinaryServicePage />} />
          {/* Rutas de empresas */}
          <Route path="/empresas" element={<CompaniesPage />} />
          <Route path="/empresa/2" element={<NutriGanPage />} />
          <Route path="/empresa/3" element={<VeterinariaElCampoPage />} />
          <Route path="/empresa/4" element={<MaquinariaSurPage />} />
          <Route path="/empresa/5" element={<SemillasPremiumPage />} />
          <Route path="/empresa/6" element={<TransporteGanaderoPage />} />
          {/* Detalle de empresa */}
          <Route path="/empresa/:id" element={<CompanyDetailPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;