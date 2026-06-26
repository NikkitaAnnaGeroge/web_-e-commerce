import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Eye, ShoppingCart } from 'lucide-react';

export const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useApp();

  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
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

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    addToCart(product, 1, 'M'); // defaults size variant to 'M' or whatever fits
  };

  return (
    <div className="product-card" onClick={onViewDetails}>
      {/* Image & Quick Action Overlay */}
      <div className="product-card-image-wrapper">
        <img src={product.image} alt={product.name} className="product-card-image" />
        <div className="product-badge">Top Rated</div>
        <div className="product-card-actions">
          <button className="card-action-btn" onClick={onViewDetails} aria-label="View Details" title="View Details">
            <Eye size={16} />
          </button>
          <button className="card-action-btn" onClick={handleAddToCartClick} aria-label="Add to Cart" title="Add to Cart">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">{product.name}</h3>

        <div className="product-card-rating">
          {renderStars(product.rating)}
          <span style={{ marginLeft: '4px', fontSize: '12px' }}>({product.reviewCount})</span>
        </div>

        <div className="product-card-footer">
          <span className="product-card-price">₹{product.price.toFixed(2)}</span>
          <button className="add-cart-btn" onClick={handleAddToCartClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
