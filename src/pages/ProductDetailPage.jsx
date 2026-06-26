import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ArrowLeft, ShoppingCart, Info, Award } from 'lucide-react';

export const ProductDetailPage = ({ product, onBackClick }) => {
  const { addToCart } = useApp();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };

  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className="star-icon"
          style={{
            fill: i <= floorRating ? 'var(--accent)' : 'none',
            stroke: i <= floorRating ? 'var(--accent)' : 'var(--text-muted)'
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="container detail-page">
      {/* Back Button */}
      <button className="back-btn" onClick={onBackClick}>
        <ArrowLeft size={18} />
        Back to Products
      </button>

      {/* Main Details Grid */}
      <div className="detail-grid">
        {/* Left Column: Image Showcase */}
        <div className="detail-image-container">
          <img src={product.image} alt={product.name} className="detail-image" />
        </div>

        {/* Right Column: Specifications & Checkout Panel */}
        <div>
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-meta">
            <div className="detail-rating">
              {renderStars(product.rating)}
              <span style={{ marginLeft: '6px' }}>{product.rating}</span>
            </div>
            <span className="detail-reviews">{product.reviewCount} customer reviews</span>
          </div>

          <div className="detail-price">₹{product.price.toFixed(2)}</div>

          <p className="detail-description">{product.description}</p>

          {/* Size Variant Picker */}
          <div className="variants-section">
            <h4 className="variant-title">Select Size</h4>
            <div className="options-grid">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`option-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and CTA Add Button */}
          <div className="actions-section">
            <div className="quantity-selector">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button className="btn btn-primary buy-btn" onClick={handleAddToCart}>
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>

          {/* Trust assurances */}
          <div style={{ display: 'flex', gap: '16px', background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '12px' }}>
            <Award size={20} className="text-secondary" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Official Warranty Included:</strong> Guaranteed authentic products. 30 days hassle-free return window.
            </div>
          </div>
        </div>
      </div>

      {/* Tech Specifications & Details */}
      <div style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px' }}>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Features</h2>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            {product.features.map((feat, idx) => (
              <li key={idx} style={{ marginBottom: '10px' }}>{feat}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Specifications</h2>
          <table className="specs-table">
            <tbody>
              {Object.entries(product.specifications).map(([label, val]) => (
                <tr key={label} className="specs-row">
                  <td className="specs-label">{label}</td>
                  <td className="specs-value">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="reviews-section">
        <h2 className="reviews-title">Customer Feedback ({product.reviews.length})</h2>
        <div className="reviews-list">
          {product.reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-header">
                <div>
                  <h4 className="review-user">{rev.user}</h4>
                  <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                    {renderStars(rev.rating)}
                  </div>
                </div>
                <span className="review-date">{rev.date}</span>
              </div>
              <p className="review-comment">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
