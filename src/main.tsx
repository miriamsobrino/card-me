import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext.tsx';
import App from './App.tsx';
import './index.css';
import { CardProvider } from './context/CardContext.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CardProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CardProvider>
  </AuthProvider>
);
