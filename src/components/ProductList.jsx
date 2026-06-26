import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { categories } from '../data/products';
import { SearchCode } from 'lucide-react'; // simple placeholder or graphic icon if needed

export const ProductList = ({ onViewDetails }) => {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy
  } = useApp();

  return (
    <section className="container" style={{ padding: '40px 24px' }} id="shop-catalog">
      {/* Category Tabs */}
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sorting panel */}
      <div className="store-controls">
        <p style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort by: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
        </select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={() => onViewDetails(product)}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--text-primary)' }}>No Products Found</h3>
          <p>We couldn't find anything matching your filters. Try checking other categories or clearing your search term.</p>
        </div>
      )}
    </section>
  );
};
