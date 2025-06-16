import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/reset.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Envolver com Router */}
      <AuthProvider> {/* Envolver App com AuthProvider */}
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>,
)