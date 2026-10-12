import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function MyAdsPage() {
  const { products, user } = useApp();

  const myAds = products.filter(
    p => (user && (p.userId === user.id || p.seller?.name === user.name))
  );

  return (
    <div className="container py-4 my-2">
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold fs-3 text-dark mb-1">My Posted Ads</h2>
          <p className="text-muted small mb-0">Manage all listings you have published</p>
        </div>
        <Link to="/sell" className="btn btn-warning text-dark fw-bold px-3 py-2 shadow-sm">
          <i className="bi bi-plus-lg me-1"></i> Post New Ad
        </Link>
      </div>

      {myAds.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-4">
          {myAds.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-4 border p-4 my-3">
          <i className="bi bi-card-list text-muted" style={{ fontSize: '3rem' }}></i>
          <h4 className="fw-bold mt-3 mb-1">You haven't posted any ads yet</h4>
          <p className="text-muted small mb-4">Post an ad in seconds and reach millions of buyers!</p>
          <Link to="/sell" className="btn btn-warning text-dark fw-bold px-4 py-2">
            + Post an Ad Now
          </Link>
        </div>
      )}
    </div>
  );
}
