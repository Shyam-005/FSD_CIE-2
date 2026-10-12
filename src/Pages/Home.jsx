import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner.jsx';
import CategoryBar from '../components/CategoryBar.jsx';
import ProductList from '../components/ProductList.jsx';
import { useApp } from '../context/AppContext';
import { findCategory } from '../data/mockData';

export default function Home() {
  const { categoryId, category, slug } = useParams();
  const { setSelectedCategory, selectedCategory, searchQuery } = useApp();

  const rawParam = categoryId || category || slug;

  useEffect(() => {
    if (rawParam) {
      const matched = findCategory(rawParam);
      if (matched) {
        setSelectedCategory(matched.id);
      }
    } else {
      setSelectedCategory('all');
    }
  }, [rawParam, setSelectedCategory]);

  const showBanner = selectedCategory === 'all' && !searchQuery.trim() && !rawParam;

  return (
    <>
      <CategoryBar />
      {showBanner && <Banner />}
      <ProductList />
    </>
  );
}
