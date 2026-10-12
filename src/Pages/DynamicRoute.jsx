import React from 'react';
import { useParams } from 'react-router-dom';
import Home from './Home.jsx';
import ProductDetail from './ProductDetail.jsx';
import NotFound from './NotFound.jsx';
import { useApp } from '../context/AppContext';
import { findCategory } from '../data/mockData';

export default function DynamicRoute() {
  const { slug } = useParams();
  const { products } = useApp();

  if (!slug) return <Home />;

  // 1. Check if slug matches a product ID (case-insensitive)
  const product = products.find(p => p.id.toLowerCase() === slug.toLowerCase());
  if (product) {
    return <ProductDetail />;
  }

  // 2. Check if slug matches a known category (e.g. /Cars, /cars, /mobiles, /properties, /bikes)
  const matchedCategory = findCategory(slug);
  if (matchedCategory) {
    return <Home />;
  }

  // 3. Check if slug matches products by keyword (e.g. /swift, /iphone, /honda)
  const query = slug.toLowerCase();
  const hasMatchingProducts = products.some(
    p => p.title.toLowerCase().includes(query) ||
         p.category.toLowerCase().includes(query) ||
         p.location.toLowerCase().includes(query)
  );

  if (hasMatchingProducts) {
    return <Home />;
  }

  // 4. Otherwise show 404
  return <NotFound />;
}
