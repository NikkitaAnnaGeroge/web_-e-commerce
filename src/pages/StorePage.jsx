import React from 'react';
import { Hero } from '../components/Hero';
import { ProductList } from '../components/ProductList';
import { Truck, ShieldCheck, Sparkles } from 'lucide-react';

export const StorePage = ({ onViewDetails }) => {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('shop-catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Header */}
      <Hero onShopClick={scrollToCatalog} />

      {/* Value Propositions */}
      <section className="container" style={{ padding: '60px 24px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ padding: '12px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '12px' }}>
              <Truck size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Free Global Delivery</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                Complimentary shipping on all orders over $150. Fast tracking included.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ padding: '12px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '12px' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Secure Stripe Checkout</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                Your payment data is fully encrypted and processed directly via Stripe elements.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ padding: '12px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '12px' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Premium Curation</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                Every single item in our catalog is inspected and sourced from design partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Shop Catalog */}
      <ProductList onViewDetails={onViewDetails} />
    </div>
  );
};
