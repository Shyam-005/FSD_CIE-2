import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function FavoritesPage() {
  const { products, favorites } = useApp();
  const favProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="container py-4 my-2">
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold fs-3 text-dark mb-1">My Favorites</h2>
          <p className="text-muted small mb-0">Items you have bookmarked for later</p>
        </div>
        <span className="badge bg-danger rounded-pill px-3 py-2 fs-6">
          {favProducts.length} Saved
        </span>
      </div>

      {favProducts.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-4">
          {favProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-4 border p-4 my-3">
          <i className="bi bi-heart text-muted" style={{ fontSize: '3rem' }}></i>
          <h4 className="fw-bold mt-3 mb-1">No favorites saved yet</h4>
          <p className="text-muted small mb-4">Click the heart icon on any ad to bookmark it here!</p>
          <Link to="/" className="btn btn-primary fw-bold px-4" style={{ backgroundColor: '#002f34', borderColor: '#002f34' }}>
            Discover Items
          </Link>
        </div>
      )}
    </div>
  );
}
