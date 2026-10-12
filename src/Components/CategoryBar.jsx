import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';

export default function CategoryBar() {
  const { categoryId } = useParams();
  const { selectedCategory, setSelectedCategory } = useApp();

  const currentCat = categoryId || selectedCategory || 'all';

  return (
    <nav className="bg-white border-bottom shadow-sm-sm py-2">
      <div className="container-fluid px-lg-4">
        <div className="d-flex align-items-center gap-2 overflow-x-auto py-1 scrollbar-hidden">
          
          <Link
            to="/"
            className={`btn btn-sm d-flex align-items-center gap-2 text-nowrap rounded-pill px-3 py-1 fw-bold text-decoration-none ${
              currentCat === 'all'
                ? 'btn-dark text-white' 
                : 'btn-outline-secondary border-0 text-dark bg-light'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            <i className="bi bi-grid-fill"></i>
            <span>All Categories</span>
          </Link>

          {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
            const isActive = currentCat === cat.id;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`btn btn-sm d-flex align-items-center gap-2 text-nowrap rounded-pill px-3 py-1 text-decoration-none ${
                  isActive 
                    ? 'btn-primary text-white fw-bold shadow-sm' 
                    : 'btn-light text-secondary border'
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <i className={`bi ${cat.icon}`}></i>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
