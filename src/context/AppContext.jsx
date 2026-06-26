import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- UI States ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [toast, setToast] = useState(null); // { message, type }

  // Trigger temporary visual toast notification
  const showToast = (message, type = 'primary') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // --- Theme State (Persisted) ---
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('luxe-theme');
    return saved || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem('luxe-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // --- Authentication State (Persisted) ---
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('luxe-user');
    return saved ? JSON.parse(saved) : null;
  });

  const loginUser = (email, password) => {
    // Simulated auth check. Allows any input, but defaults to a premium account name
    const mockUser = {
      email,
      name: email.split('@')[0].toUpperCase(),
      shippingAddress: {
        street: '123 Luxury Ave',
        city: 'New York',
        postalCode: '10001',
        country: 'United States'
      }
    };
    setUser(mockUser);
    localStorage.setItem('luxe-user', JSON.stringify(mockUser));
    setIsAuthOpen(false);
    showToast(`Welcome back, ${mockUser.name}!`, 'success');
  };

  const registerUser = (name, email, password) => {
    const mockUser = {
      email,
      name: name,
      shippingAddress: {
        street: '',
        city: '',
        postalCode: '',
        country: ''
      }
    };
    setUser(mockUser);
    localStorage.setItem('luxe-user', JSON.stringify(mockUser));
    setIsAuthOpen(false);
    showToast(`Account created successfully! Welcome, ${name}.`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('luxe-user');
    showToast('Logged out successfully.', 'primary');
  };

  const updateShippingAddress = (address) => {
    if (!user) return;
    const updatedUser = { ...user, shippingAddress: address };
    setUser(updatedUser);
    localStorage.setItem('luxe-user', JSON.stringify(updatedUser));
  };

  // --- Cart State (Persisted) ---
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('luxe-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('luxe-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, size = 'M') => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.variant === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        showToast(`Added ${quantity} more ${product.name} to cart.`, 'success');
        return newItems;
      } else {
        showToast(`${product.name} added to cart.`, 'success');
        return [...prevItems, { product, quantity, variant: size }];
      }
    });
  };

  const removeFromCart = (productId, variant) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(
        (item) => item.product.id === productId && item.variant === variant
      );
      if (itemToRemove) {
        showToast(`${itemToRemove.product.name} removed from cart.`, 'primary');
      }
      return prevItems.filter(
        (item) => !(item.product.id === productId && item.variant === variant)
      );
    });
  };

  const updateCartQty = (productId, variant, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.variant === variant
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('luxe-cart');
  };

  // --- Products Listing Filter & Sort ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'price-low' | 'price-high' | 'rating'
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Sort Products
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, sortBy]);

  // --- Checkout History / Confirmation ---
  const [lastOrder, setLastOrder] = useState(null);

  // Cart calculations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartShipping = cartSubtotal > 12000 || cartSubtotal === 0 ? 0 : 1200.0;
  const cartTax = cartSubtotal * 0.08; // 8% mock tax
  const cartTotal = cartSubtotal + cartShipping + cartTax;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        // UI
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        authTab,
        setAuthTab,
        toast,
        showToast,

        // Theme
        theme,
        toggleTheme,

        // Auth
        user,
        loginUser,
        registerUser,
        logoutUser,
        updateShippingAddress,

        // Cart
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartSubtotal,
        cartShipping,
        cartTax,
        cartTotal,
        cartCount,

        // Products, Search, Sorting
        filteredProducts,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,

        // Order Status
        lastOrder,
        setLastOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
