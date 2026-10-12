import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const {
    favorites,
    toggleFavorite,
    deleteProduct,
    user
  } = useApp();

  const isFavorite = favorites.includes(product.id);
  const isOwner = user && (product.userId === user.id || product.seller?.name === user.name);

  // Format currency in Indian Rupees
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="col">
      <div 
        className="card h-100 olx-product-card shadow-sm border position-relative"
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: 'pointer', transition: 'transform 0.18s ease, box-shadow 0.18s ease' }}
      >
        {/* Featured Ribbon */}
        {product.featured && (
          <span 
            className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark fw-bold shadow-sm z-2"
            style={{ fontSize: '11px', letterSpacing: '0.5px' }}
          >
            FEATURED
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center z-2"
          style={{ width: '34px', height: '34px', border: 'none' }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <i className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'} fs-6`}></i>
        </button>

        {/* Product Image */}
        <div 
          className="position-relative bg-light overflow-hidden rounded-top"
          style={{ height: '190px' }}
        >
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'}
            alt={product.title}
            className="w-100 h-100 object-fit-cover"
            loading="lazy"
          />
        </div>

        {/* Card Body */}
        <div className="card-body p-3 d-flex flex-column justify-content-between">
          <div>
            {/* Price */}
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="fs-5 fw-bold text-dark" style={{ letterSpacing: '-0.3px' }}>
                {formattedPrice}
              </span>
            </div>

            {/* Title */}
            <h6 
              className="card-title text-secondary mb-2 text-truncate-2" 
              style={{ 
                fontSize: '0.9rem', 
                fontWeight: '400',
                lineHeight: '1.3',
                height: '2.4em',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
              title={product.title}
            >
              {product.title}
            </h6>
          </div>

          {/* Footer details: Location & Date */}
          <div className="pt-2 border-top mt-2">
            <div className="d-flex align-items-center justify-content-between text-muted" style={{ fontSize: '11px' }}>
              <span className="text-truncate me-2" title={product.location}>
                <i className="bi bi-geo-alt me-1"></i>
                {product.location}
              </span>
              <span className="text-nowrap">{product.date}</span>
            </div>

            {/* Owner Delete button */}
            {isOwner && (
              <div className="mt-2 pt-2 border-top d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm py-0 px-2 small"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this listing?')) {
                      deleteProduct(product.id);
                    }
                  }}
                >
                  <i className="bi bi-trash me-1"></i> Delete Ad
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
