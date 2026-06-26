import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const Footer = ({ setView }) => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      showToast(`Thank you for subscribing, ${email}!`, 'success');
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Logo & Brand Description */}
          <div className="footer-logo-desc">
            <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setView('store'); }}>
              <ShoppingBag size={24} />
              <span>LuxeCart</span>
            </a>
            <p className="footer-desc">
              Experience the pinnacle of eCommerce with LuxeCart. Curated premium goods, persistent shopping conveniences, and secure Stripe checkout.
            </p>
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h4 className="footer-title">Shop</h4>
            <div className="footer-links">
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setView('store'); }}>All Products</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setView('store'); }}>New Arrivals</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setView('store'); }}>Featured Tech</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setView('store'); }}>Accessories</a>
            </div>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="footer-title">Support</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Returns & Refunds</a>
              <a href="#" className="footer-link">Shipping Policy</a>
              <a href="#" className="footer-link">Contact Us</a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-newsletter-desc">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} LuxeCart Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ fontSize: '12px' }}>🔒 Stripe Secured Checkout</span>
            <span style={{ fontSize: '12px' }}>Terms</span>
            <span style={{ fontSize: '12px' }}>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
