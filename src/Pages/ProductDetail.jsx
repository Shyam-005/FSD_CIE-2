import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProductDetail() {
  const { id, slug } = useParams();
  const productId = (id || slug)?.toLowerCase();
  const navigate = useNavigate();
  const {
    products,
    favorites,
    toggleFavorite,
    setChatProduct,
    setOfferProduct
  } = useApp();

  const product = products.find(p => p.id.toLowerCase() === productId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showPhone, setShowPhone] = useState(false);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5 bg-white rounded-4 border shadow-sm p-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <i className="bi bi-question-circle text-muted" style={{ fontSize: '3.5rem' }}></i>
          <h3 className="fw-bold mt-3">Product Not Found</h3>
          <p className="text-muted small mb-4">
            The ad you are looking for may have been sold or removed by the seller.
          </p>
          <Link to="/" className="btn btn-primary fw-bold px-4" style={{ backgroundColor: '#002f34', borderColor: '#002f34' }}>
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'];

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="container py-4">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
          <li className="breadcrumb-item">
            <Link to={`/category/${product.category}`} className="text-decoration-none text-muted text-capitalize">
              {product.category}
            </Link>
          </li>
          <li className="breadcrumb-item active text-truncate" aria-current="page" style={{ maxWidth: '300px' }}>
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        
        {/* Left Column: Image Viewer & Specifications & Description */}
        <div className="col-lg-8">
          
          {/* Main Photo Gallery */}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-dark text-center position-relative">
            {/* Heart Favorite Button */}
            <button
              type="button"
              className="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle shadow p-0 d-flex align-items-center justify-content-center z-2"
              style={{ width: '42px', height: '42px', border: 'none' }}
              onClick={() => toggleFavorite(product.id)}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <i className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'} fs-5`}></i>
            </button>

            <div className="d-flex align-items-center justify-content-center p-3" style={{ minHeight: '400px', maxHeight: '520px' }}>
              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.title}
                className="img-fluid rounded"
                style={{ maxHeight: '480px', objectFit: 'contain' }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="d-flex justify-content-center gap-2 p-2 bg-black bg-opacity-50">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`btn p-0 rounded overflow-hidden border-2 ${activeImageIndex === idx ? 'border-warning' : 'border-transparent'}`}
                    style={{ width: '65px', height: '50px' }}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt="thumb" className="w-100 h-100 object-fit-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specifications Card */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <h5 className="fw-bold mb-3 text-dark">Specifications</h5>
              <div className="row g-3">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="col-sm-6 col-md-4">
                    <div className="bg-light p-2 px-3 rounded-3">
                      <span className="text-muted d-block small">{key}</span>
                      <span className="fw-semibold text-dark">{val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description Card */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold mb-3 text-dark">Description</h5>
            <p className="text-secondary mb-0" style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>
              {product.description}
            </p>
          </div>

        </div>

        {/* Right Column: Pricing, Seller & CTAs */}
        <div className="col-lg-4">
          <div className="d-flex flex-column gap-3 sticky-top" style={{ top: '80px', zIndex: 10 }}>
            
            {/* Price & Summary Card */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="badge bg-warning text-dark text-uppercase fw-bold px-2 py-1">
                  {product.category}
                </span>
                <span className="text-muted small">
                  <i className="bi bi-clock me-1"></i>{product.date}
                </span>
              </div>

              <h1 className="display-6 fw-bold text-dark mb-2" style={{ letterSpacing: '-0.5px' }}>
                {formattedPrice}
              </h1>

              <h5 className="fw-medium text-secondary mb-3" style={{ lineHeight: '1.4' }}>
                {product.title}
              </h5>

              <div className="d-flex align-items-center text-muted small pt-2 border-top">
                <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                <span className="text-truncate">{product.location}</span>
              </div>
            </div>

            {/* Seller Details Card */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <h6 className="fw-bold text-muted small text-uppercase mb-3">Seller Details</h6>
              
              <div className="d-flex align-items-center gap-3 mb-3">
                <div 
                  className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold fs-5"
                  style={{ width: '50px', height: '50px' }}
                >
                  {product.seller?.name ? product.seller.name.charAt(0) : 'S'}
                </div>
                <div>
                  <div className="fw-bold text-dark d-flex align-items-center gap-1">
                    {product.seller?.name || 'Seller'}
                    {product.seller?.verified && (
                      <i className="bi bi-patch-check-fill text-primary" title="Verified Seller"></i>
                    )}
                  </div>
                  <div className="text-muted small">
                    Member since {product.seller?.memberSince || '2023'}
                  </div>
                </div>
              </div>

              {/* Show Phone */}
              <div className="mb-3">
                {showPhone ? (
                  <div className="d-flex align-items-center justify-content-between bg-light p-2 px-3 rounded border">
                    <span className="fw-bold text-dark">{product.seller?.phone || '+91 98765 43210'}</span>
                    <span className="badge bg-success">Verified</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-dark w-100 fw-bold py-2"
                    onClick={() => setShowPhone(true)}
                  >
                    <i className="bi bi-telephone-fill me-2"></i> Show Phone Number
                  </button>
                )}
              </div>

              {/* Chat & Offer Buttons */}
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary fw-bold py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  style={{ backgroundColor: '#002f34', borderColor: '#002f34' }}
                  onClick={() => setChatProduct(product)}
                >
                  <i className="bi bi-chat-dots-fill"></i> Chat with Seller
                </button>
                <button
                  type="button"
                  className="btn btn-warning text-dark fw-bold py-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => setOfferProduct(product)}
                >
                  <i className="bi bi-tag-fill"></i> Make an Offer
                </button>
              </div>
            </div>

            {/* Safety Tips Card */}
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-light text-muted small">
              <div className="fw-bold text-dark mb-1 d-flex align-items-center gap-1">
                <i className="bi bi-shield-check text-success fs-5"></i> Safety Tips for Buyers
              </div>
              <ul className="mb-0 ps-3 mt-1" style={{ fontSize: '11px' }}>
                <li>Meet the seller in a safe, public place.</li>
                <li>Check the item condition thoroughly before paying.</li>
                <li>Never send partial or advance payments online.</li>
              </ul>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
