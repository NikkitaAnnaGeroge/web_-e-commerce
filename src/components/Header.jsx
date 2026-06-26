import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Sun, Moon, User, LogOut, Search } from 'lucide-react';

export const Header = ({ currentView, setView }) => {
  const {
    theme,
    toggleTheme,
    user,
    setIsAuthOpen,
    setIsCartOpen,
    cartCount,
    searchQuery,
    setSearchQuery,
    setAuthTab
  } = useApp();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (currentView !== 'store') {
      setView('store');
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setSearchQuery('');
    setView('store');
  };

  const handleProfileClick = () => {
    if (user) {
      // Just double checks, or can log out if desired.
      // We will open login if not logged in.
    } else {
      setAuthTab('login');
      setIsAuthOpen(true);
    }
  };

  const { logoutUser } = useApp();

  return (
    <header className="header glassmorphic">
      <div className="container header-container">
        {/* Logo */}
        <a href="#" className="logo" onClick={handleLogoClick}>
          <ShoppingBag size={28} />
          <span>LuxeCart</span>
        </a>

        {/* Global Search Bar */}
        <div className="search-bar">
          <Search size={18} className="text-secondary" />
          <input
            type="text"
            className="search-input"
            placeholder="Search products, brands..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Actions Menu */}
        <div className="header-actions">
          {/* Theme Toggle */}
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Cart Icon & Badge */}
          <button className="icon-btn" onClick={() => setIsCartOpen(true)} aria-label="Open Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>

          {/* User Auth Control */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button className="user-profile-btn" onClick={() => setView('checkout')}>
                <User size={16} />
                <span>{user.name}</span>
              </button>
              <button className="icon-btn" onClick={logoutUser} title="Log Out" aria-label="Log Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary" style={{ padding: '8px 16px', borderRadius: '100px', fontSize: '14px' }} onClick={handleProfileClick}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
