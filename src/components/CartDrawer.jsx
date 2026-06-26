import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export const CartDrawer = ({ setView }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateCartQty,
    removeFromCart,
    cartSubtotal,
    cartShipping,
    cartTax,
    cartTotal,
    user,
    setIsAuthOpen
  } = useApp();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    if (!user) {
      // Prompt sign-in, then redirect. That's fine.
      setIsAuthOpen(true);
    } else {
      setView('checkout');
    }
  };

  return (
    <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Cart Header */}
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={20} />
            <span>Your Cart</span>
          </div>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)} aria-label="Close Cart">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={`${item.product.id}-${item.variant}`} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.product.name}</h4>
                  <p className="cart-item-variant">Variant: {item.variant}</p>
                  <span className="cart-item-price">₹{item.product.price.toFixed(2)}</span>

                  <div className="cart-item-actions">
                    {/* Qty controller */}
                    <div className="cart-qty-controls">
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateCartQty(item.product.id, item.variant, item.quantity - 1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateCartQty(item.product.id, item.variant, item.quantity + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Trash remove button */}
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.product.id, item.variant)}
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart-state">
              <ShoppingBag size={48} />
              <p>Your shopping cart is currently empty.</p>
              <button className="btn btn-secondary" style={{ padding: '10px 20px', borderRadius: '8px' }} onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Cart Footer Summary */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>{cartShipping === 0 ? 'FREE' : `₹${cartShipping.toFixed(2)}`}</span>
            </div>
            <div className="cart-summary-row">
              <span>Est. Tax (8%)</span>
              <span>₹{cartTax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckoutClick}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
