import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockData';

const AppContext = createContext();

const STORAGE_KEYS = {
  PRODUCTS: 'olx_products_v1',
  FAVORITES: 'olx_favorites_v1',
  USER: 'olx_user_v1',
  USERS_LIST: 'olx_users_list_v1'
};

const DEFAULT_USER = {
  id: 'user-demo-1',
  name: 'Shyam Sundar',
  email: 'shyam@example.com',
  password: 'password123',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  memberSince: 'Oct 2023'
};

const DEMO_USERS = [
  DEFAULT_USER,
  {
    id: 'user-demo-2',
    name: 'Ananya Verma',
    email: 'ananya@example.com',
    password: 'password123',
    phone: '+91 97412 88390',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    memberSince: 'Jan 2022'
  }
];

export function AppProvider({ children }) {
  // Load products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-2'];
    } catch {
      return ['prod-1', 'prod-2'];
    }
  });

  // Registered Users list
  const [usersList, setUsersList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS_LIST);
      return saved ? JSON.parse(saved) : DEMO_USERS;
    } catch {
      return DEMO_USERS;
    }
  });

  // Current session user
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('All India');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'price-asc' | 'price-desc'
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Modals for Chat & Offer
  const [chatProduct, setChatProduct] = useState(null);
  const [offerProduct, setOfferProduct] = useState(null);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(usersList));
    } catch (e) {
      console.error(e);
    }
  }, [usersList]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Auth Functions
  const registerUser = ({ name, email, password, phone }) => {
    const existing = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email already exists!' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone ? phone.trim() : '+91 98765 00000',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      memberSince: 'Oct 2026'
    };

    setUsersList(prev => [...prev, newUser]);
    setUser(newUser);
    showToast(`Account created! Welcome, ${newUser.name}!`, 'success');
    return { success: true, user: newUser };
  };

  const loginUser = (email, password) => {
    const found = usersList.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );

    if (found) {
      setUser(found);
      showToast(`Welcome back, ${found.name}!`, 'success');
      return { success: true, user: found };
    }

    // Also allow demo fallback if password matches default
    if (password === 'password123') {
      const demoUser = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
      if (demoUser) {
        setUser(demoUser);
        showToast(`Welcome back, ${demoUser.name}!`, 'success');
        return { success: true, user: demoUser };
      }
    }

    return { success: false, error: 'Invalid email or password. (Demo password: password123)' };
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const isFav = prev.includes(productId);
      const updated = isFav ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(isFav ? 'Removed from Favorites' : 'Saved to Favorites!', 'info');
      return updated;
    });
  };

  // Add Product
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      date: 'Just now',
      featured: false,
      seller: {
        name: user ? user.name : 'Shyam Sundar',
        phone: user ? user.phone : '+91 98765 43210',
        memberSince: 'Oct 2026',
        verified: true,
        rating: 5.0
      },
      specifications: productData.specifications || { 'Condition': 'Used' },
      userId: user ? user.id : 'user-demo-1'
    };

    setProducts(prev => [newProduct, ...prev]);
    showToast('🎉 Your Ad has been posted successfully!', 'success');
    return newProduct;
  };

  // Delete Product
  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setFavorites(prev => prev.filter(id => id !== productId));
    showToast('Listing removed successfully', 'warning');
  };

  // Get Product by ID
  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedLocation('All India');
    setSearchQuery('');
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
  };

  // Filtered and Sorted products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Location filter
    if (selectedLocation !== 'All India') {
      const locMatch = product.city?.toLowerCase().includes(selectedLocation.split(',')[0].toLowerCase()) ||
                       product.location?.toLowerCase().includes(selectedLocation.split(',')[0].toLowerCase());
      if (!locMatch) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchLoc = product.location.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchLoc && !matchCat) return false;
    }

    // Price range
    if (priceRange.min && product.price < Number(priceRange.min)) return false;
    if (priceRange.max && product.price > Number(priceRange.max)) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <AppContext.Provider
      value={{
        products,
        filteredProducts,
        favorites,
        toggleFavorite,
        addProduct,
        deleteProduct,
        getProductById,
        user,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
        selectedCategory,
        setSelectedCategory,
        selectedLocation,
        setSelectedLocation,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        resetFilters,
        chatProduct,
        setChatProduct,
        offerProduct,
        setOfferProduct,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
