import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/mockData';

export default function ProductList() {
  const {
    filteredProducts,
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
    resetFilters
  } = useApp();

  const currentCategoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name || 'All Categories';

  const getHeading = () => {
    if (searchQuery.trim()) return `Search results for "${searchQuery}"`;
    if (selectedCategory !== 'all') return currentCategoryName;
    return 'Fresh recommendations';
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedLocation !== 'All India' || 
    searchQuery.trim() !== '' || 
    priceRange.min !== '' || 
    priceRange.max !== '';

  return (
    <section className="container-fluid px-lg-4 my-4">
      
      {/* Top Filter & Sort Bar */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3 pb-2 border-bottom">
        <div>
          <div className="d-flex align-items-center gap-2">
            <h2 className="fs-4 fw-bold mb-0 text-dark" style={{ letterSpacing: '-0.3px' }}>
              {getHeading()}
            </h2>
            <span className="badge bg-secondary rounded-pill small">
              {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* Controls: Price Filter & Sort By */}
        <div className="d-flex flex-wrap align-items-center gap-2">
          
          {/* Price Range Filter Inputs */}
          <div className="d-flex align-items-center gap-1 bg-light p-1 rounded border">
            <span className="small text-muted px-1 fw-bold">₹</span>
            <input
              type="number"
              placeholder="Min Price"
              className="form-control form-control-sm border-0 bg-transparent text-end"
              style={{ width: '85px', fontSize: '12px' }}
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
            />
            <span className="text-muted">-</span>
            <input
              type="number"
              placeholder="Max Price"
              className="form-control form-control-sm border-0 bg-transparent text-end"
              style={{ width: '85px', fontSize: '12px' }}
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            />
            {(priceRange.min || priceRange.max) && (
              <button
                type="button"
                className="btn btn-sm btn-link text-muted p-0 ms-1"
                onClick={() => setPriceRange({ min: '', max: '' })}
                title="Clear price filter"
              >
                <i className="bi bi-x-circle"></i>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="d-flex align-items-center gap-1">
            <label htmlFor="sortSelect" className="small text-muted fw-bold text-nowrap d-none d-sm-inline">
              Sort by:
            </label>
            <select
              id="sortSelect"
              className="form-select form-select-sm border fw-medium"
              style={{ width: '160px', height: '34px' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
          <span className="small text-muted fw-bold">Active filters:</span>
          {selectedCategory !== 'all' && (
            <span className="badge bg-light text-dark border d-flex align-items-center gap-1 py-1 px-2">
              Category: {currentCategoryName}
              <i 
                className="bi bi-x cursor-pointer ms-1" 
                onClick={() => setSelectedCategory('all')}
                style={{ cursor: 'pointer' }}
              ></i>
            </span>
          )}
          {selectedLocation !== 'All India' && (
            <span className="badge bg-light text-dark border d-flex align-items-center gap-1 py-1 px-2">
              Location: {selectedLocation}
              <i 
                className="bi bi-x cursor-pointer ms-1" 
                onClick={() => setSelectedLocation('All India')}
                style={{ cursor: 'pointer' }}
              ></i>
            </span>
          )}
          {searchQuery.trim() !== '' && (
            <span className="badge bg-light text-dark border d-flex align-items-center gap-1 py-1 px-2">
              Search: "{searchQuery}"
              <i 
                className="bi bi-x cursor-pointer ms-1" 
                onClick={() => setSearchQuery('')}
                style={{ cursor: 'pointer' }}
              ></i>
            </span>
          )}
          {(priceRange.min || priceRange.max) && (
            <span className="badge bg-light text-dark border d-flex align-items-center gap-1 py-1 px-2">
              Price: ₹{priceRange.min || '0'} - ₹{priceRange.max || 'Any'}
              <i 
                className="bi bi-x cursor-pointer ms-1" 
                onClick={() => setPriceRange({ min: '', max: '' })}
                style={{ cursor: 'pointer' }}
              ></i>
            </span>
          )}
          <button
            type="button"
            className="btn btn-link btn-sm text-danger text-decoration-none p-0 ms-1 fw-bold"
            onClick={resetFilters}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product Cards Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-5 mb-3">
            <button 
              type="button" 
              className="btn btn-outline-dark px-4 py-2 fw-bold rounded-pill"
              onClick={() => alert('All matching recommendations are currently loaded!')}
            >
              Load more
            </button>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-5 my-4 bg-light rounded-3 border">
          <div className="mb-3">
            <i className="bi bi-search text-muted" style={{ fontSize: '3rem' }}></i>
          </div>
          <h4 className="fw-bold mb-2">No listings found</h4>
          <p className="text-muted mb-4" style={{ maxWidth: '420px', margin: '0 auto' }}>
            We couldn't find any listings matching your criteria. Try adjusting your filters or search keywords.
          </p>
          <div className="d-flex justify-content-center gap-2">
            {hasActiveFilters && (
              <button 
                type="button" 
                className="btn btn-primary px-4 fw-bold"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            )}
            <Link 
              to="/sell" 
              className="btn btn-warning text-dark px-4 fw-bold text-decoration-none"
            >
              + Post an Ad
            </Link>
          </div>
        </div>
      )}

    </section>
  );
}
