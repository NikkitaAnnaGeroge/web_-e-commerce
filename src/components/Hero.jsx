import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const Hero = ({ onShopClick }) => {
  return (
    <section className="hero">
      <div className="container hero-grid">
        {/* Content Column */}
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            New Collection 2026
          </div>
          <h1 className="hero-title">
            Redefining Premium Shopping
          </h1>
          <p className="hero-description">
            Discover a handpicked collection of modern technology, minimalist accessories, premium fashion, and home essentials. Designed for those who value form and function.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={onShopClick}>
              Shop Collection
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
              <ShieldCheck size={18} />
              Learn More
            </button>
          </div>
        </div>

        {/* Visual Column */}
        <div className="hero-image-wrapper">
          <div className="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80"
              alt="Premium fashion collection banner"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
