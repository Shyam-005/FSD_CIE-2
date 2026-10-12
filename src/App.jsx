import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ChatModal from './components/ChatModal.jsx';
import OfferModal from './components/OfferModal.jsx';
import Toast from './components/Toast.jsx';

// Pages
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import SellAd from './pages/SellAd.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import MyAdsPage from './pages/MyAdsPage.jsx';
import DynamicRoute from './pages/DynamicRoute.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          
          {/* Category Routes */}
          <Route path="/category/:categoryId" element={<Home />} />
          
          {/* Product Detail Routes */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/item/:id" element={<ProductDetail />} />
          <Route path="/ad/:id" element={<ProductDetail />} />
          <Route path="/view/:id" element={<ProductDetail />} />
          
          {/* Functional Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sell" element={<SellAd />} />
          <Route path="/create" element={<SellAd />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/my-ads" element={<MyAdsPage />} />
          
          {/* Dynamic Top-Level Slug Route (e.g. /Cars, /cars, /mobiles, /bikes, /prod-1) */}
          <Route path="/:slug" element={<DynamicRoute />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Interactive Modals & Toast */}
      <ChatModal />
      <OfferModal />
      <Toast />
    </div>
  );
}
