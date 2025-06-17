import React from 'react';
import './style.css';

const GlobalSpinner = () => {
  return (
    <div className="global-spinner-overlay">
      <div className="global-spinner"></div>
      <p className="global-spinner-text">Carregando aplicação...</p>
    </div>
  );
};

export default GlobalSpinner;