import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StorePage } from './pages/StorePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';

function AppContent() {
  const [view, setView] = useState('store'); // 'store' | 'detail' | 'checkout'
  const [activeProduct, setActiveProduct] = useState(null);
  const { toast } = useApp();

  const handleViewDetails = (product) => {
    setActiveProduct(product);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStore = () => {
    setView('store');
    setActiveProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sticky Top Navigation Header */}
      <Header currentView={view} setView={setView} />

      {/* Main App Content View Routing */}
      <main style={{ flexGrow: 1 }}>
        {view === 'store' && <StorePage onViewDetails={handleViewDetails} />}
        {view === 'detail' && activeProduct && (
          <ProductDetailPage product={activeProduct} onBackClick={handleBackToStore} />
        )}
        {view === 'checkout' && <CheckoutPage setView={setView} />}
      </main>

      {/* Footer Navigation */}
      <Footer setView={setView} />

      {/* Persistent Shopping Drawer */}
      <CartDrawer setView={setView} />

      {/* Authentication Dialog */}
      <AuthModal />

      {/* Global Status Toast Indicator */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
