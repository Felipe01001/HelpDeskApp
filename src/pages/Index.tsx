
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redireciona para a página home
  return <Navigate to="/" replace />;
};

export default Index;
