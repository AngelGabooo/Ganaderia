import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardHome from '../pages/DashboardHome';
import Subscriptions from '../pages/Subscriptions';

const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/suscripcion" element={<Subscriptions />} />
    </Routes>
  );
};

export default DashboardRouter;