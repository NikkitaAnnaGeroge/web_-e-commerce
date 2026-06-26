import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, CheckCircle, Mail, MapPin, Truck, HelpCircle, Shield } from 'lucide-react';

export const CheckoutPage = ({ setView }) => {
  const {
    cartItems,
    cartSubtotal,
    cartShipping,
    cartTax,
    cartTotal,
    clearCart,
    user,
    updateShippingAddress,
    showToast
  } = useApp();

  // Address Form States
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [street, setStreet] = useState(user?.shippingAddress?.street || '');
  const [city, setCity] = useState(user?.shippingAddress?.city || '');
  const [zip, setZip] = useState(user?.shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(user?.shippingAddress?.country || 'United States');

  // Stripe Simulator Payment States
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardType, setCardType] = useState('generic'); // 'visa' | 'mastercard' | 'amex' | 'generic'

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Handle card brand recognition
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // strip non-digits
    
    // Format card number with spaces every 4 digits
    let formatted = '';
    for (let i = 0; i < value.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += value[i];
    }
    setCardNumber(formatted);

    // Identify brand
    if (value.startsWith('4')) {
      setCardType('visa');
    } else if (value.startsWith('5')) {
      setCardType('mastercard');
    } else if (value.startsWith('3')) {
      setCardType('amex');
    } else {
      setCardType('generic');
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    if (value.length > 0) {
      formatted = value.substring(0, 2);
      if (value.length > 2) {
        formatted += '/' + value.substring(2, 4);
      }
    }
    setCardExpiry(formatted);
  };

  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    setCardCvc(value.substring(0, 4));
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      showToast('Your cart is empty. Please add items before checkout.', 'error');
      return;
    }

    if (!name || !email || !street || !city || !zip) {
      showToast('Please fill out all shipping fields.', 'error');
      return;
    }

    if (cardNumber.length < 19 && cardType !== 'amex') {
      showToast('Please enter a valid credit card number.', 'error');
      return;
    }

    if (cardExpiry.length < 5) {
      showToast('Please enter a valid card expiration date.', 'error');
      return;
    }

    if (cardCvc.length < 3) {
      showToast('Please enter a valid card security code (CVC).', 'error');
      return;
    }

    // Save shipping info back to user context
    updateShippingAddress({
      street,
      city,
      postalCode: zip,
      country
    });

    setIsProcessing(true);

    // Simulate Stripe payment roundtrip
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const generatedOrderId = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedOrderId);
      showToast('Payment successful! Your order has been placed.', 'success');
    }, 2500);
  };

  const handleFinishSuccess = () => {
    clearCart();
    setView('store');
  };

  // --- Success Render Screen ---
  if (isSuccess) {
    return (
      <div className="container" style={{ padding: '120px 24px 80px 24px' }}>
        <div className="checkout-section-card success-screen" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="success-icon-circle">
            <CheckCircle size={40} />
          </div>
          <h1 className="success-title">Order Confirmed!</h1>
          <p className="success-message">
            Thank you for shopping with LuxeCart. Your transaction has been securely processed. A receipt has been sent to <strong>{email}</strong>.
          </p>

          <div className="success-details">
            <div className="success-detail-row">
              <span>Order Number:</span>
              <strong style={{ fontFamily: 'monospace' }}>{orderId}</strong>
            </div>
            <div className="success-detail-row">
              <span>Delivery Address:</span>
              <span>{street}, {city}, {zip}</span>
            </div>
            <div className="success-detail-row">
              <span>Estimated Delivery:</span>
              <span>3-5 Business Days</span>
            </div>
            <div className="success-detail-row" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontWeight: 'bold' }}>
              <span>Total Paid:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleFinishSuccess}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <h1 style={{ fontSize: '36px', marginBottom: '32px' }}>Checkout</h1>

      <div className="checkout-grid">
        {/* Left Column: Forms */}
        <div>
          <form onSubmit={handlePaySubmit}>
            {/* Shipping Card */}
            <div className="checkout-section-card">
              <h2 className="checkout-section-title">
                <MapPin size={20} className="text-secondary" />
                Shipping Information
              </h2>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="123 Luxury Ave"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>

              <div className="stripe-inline-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ZIP / Postal Code</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="10001"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Country</label>
                <select
                  className="form-input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Payment Card */}
            <div className="checkout-section-card">
              <h2 className="checkout-section-title">
                <CreditCard size={20} className="text-secondary" />
                Payment Method (Stripe Elements Sandbox)
              </h2>

              <div className="form-group">
                <label className="form-label">Card Details</label>
                <div className="stripe-input-container">
                  <CreditCard size={18} className="stripe-card-icon" />
                  <input
                    type="text"
                    className="stripe-credit-input"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                  />
                  {cardType === 'visa' && (
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e40af', padding: '2px 6px', background: '#dbeafe', borderRadius: '4px', fontFamily: 'sans-serif' }}>VISA</span>
                  )}
                  {cardType === 'mastercard' && (
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#9a3412', padding: '2px 6px', background: '#ffedd5', borderRadius: '4px', fontFamily: 'sans-serif' }}>MASTERCARD</span>
                  )}
                  {cardType === 'amex' && (
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#065f46', padding: '2px 6px', background: '#d1fae5', borderRadius: '4px', fontFamily: 'sans-serif' }}>AMEX</span>
                  )}
                </div>

                <div className="stripe-inline-row">
                  <div>
                    <label className="form-label" style={{ marginTop: '16px' }}>Expiration Date</label>
                    <div className="stripe-input-container">
                      <input
                        type="text"
                        className="stripe-credit-input"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" style={{ marginTop: '16px' }}>CVC / Security Code</label>
                    <div className="stripe-input-container">
                      <input
                        type="password"
                        className="stripe-credit-input"
                        placeholder="CVC"
                        value={cardCvc}
                        onChange={handleCvcChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stripe Payment Submit Action */}
              <button
                type="submit"
                className="stripe-pay-btn"
                disabled={isProcessing || cartItems.length === 0}
              >
                {isProcessing ? (
                  <>
                    <div className="spinner"></div>
                    <span>Processing Securely...</span>
                  </>
                ) : (
                  <>
                    <Shield size={18} />
                    <span>Pay ${cartTotal.toFixed(2)}</span>
                  </>
                )}
              </button>

              <div className="stripe-badge-footer">
                <Shield size={13} className="text-secondary" />
                <span>Secured by Stripe Elements. Sandbox environment.</span>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div>
          <div className="checkout-summary-card">
            <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Order Summary</h3>

            {/* Summary Items list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.variant}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', background: 'var(--bg-tertiary)' }} />
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{item.product.name}</h4>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Qty: {item.quantity} | Size: {item.variant}</p>
                    </div>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations widget */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <div className="cart-summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span>{cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}</span>
              </div>
              <div className="cart-summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <span>Est. Tax (8%)</span>
                <span>${cartTax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 800, marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
