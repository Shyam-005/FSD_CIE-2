import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ProductDetailModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    favorites,
    toggleFavorite,
    setChatProduct,
    setOfferProduct
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showPhone, setShowPhone] = useState(false);

  if (!selectedProduct) return null;

  const isFavorite = favorites.includes(selectedProduct.id);
  const images = selectedProduct.images && selectedProduct.images.length > 0 
    ? selectedProduct.images 
    : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'];

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(selectedProduct.price);

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(3px)', zIndex: 1055 }}
      onClick={() => setSelectedProduct(null)}
    >
      <div 
        className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg overflow-hidden">
          
          {/* Modal Header */}
          <div className="modal-header bg-white border-bottom py-2 px-3 d-flex align-items-center justify-content-between">
            <span className="badge bg-light text-dark border text-uppercase fw-bold">
              {selectedProduct.category}
            </span>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '36px', height: '36px' }}
                onClick={() => toggleFavorite(selectedProduct.id)}
                title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              >
                <i className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'} fs-6`}></i>
              </button>
              <button
                type="button"
                className="btn-close"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close"
              ></button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-0">
            <div className="row g-0">
              
              {/* Left Column: Image Viewer */}
              <div className="col-lg-7 bg-dark d-flex flex-column justify-content-between p-3 p-md-4 text-center">
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{ minHeight: '360px', maxHeight: '500px' }}
                >
                  <img
                    src={images[activeImageIndex] || images[0]}
                    alt={selectedProduct.title}
                    className="img-fluid rounded"
                    style={{ maxHeight: '460px', objectFit: 'contain' }}
                  />
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="d-flex justify-content-center gap-2 mt-3 pt-2 border-top border-secondary">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`btn p-0 rounded overflow-hidden border-2 ${activeImageIndex === idx ? 'border-warning' : 'border-transparent'}`}
                        style={{ width: '60px', height: '48px' }}
                        onClick={() => setActiveImageIndex(idx)}
                      >
                        <img src={img} alt="thumbnail" className="w-100 h-100 object-fit-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Details & Actions */}
              <div className="col-lg-5 p-3 p-md-4 d-flex flex-column justify-content-between bg-white">
                <div>
                  
                  {/* Price & Title */}
                  <div className="mb-3">
                    <div className="d-flex align-items-baseline justify-content-between">
                      <h2 className="display-6 fw-bold text-dark mb-1" style={{ letterSpacing: '-0.5px' }}>
                        {formattedPrice}
                      </h2>
                    </div>
                    <h5 className="fw-semibold text-secondary mb-2" style={{ lineHeight: '1.4' }}>
                      {selectedProduct.title}
                    </h5>
                    <div className="d-flex align-items-center text-muted small gap-3">
                      <span><i className="bi bi-geo-alt me-1 text-danger"></i>{selectedProduct.location}</span>
                      <span><i className="bi bi-clock me-1"></i>{selectedProduct.date}</span>
                    </div>
                  </div>

                  <hr />

                  {/* Specifications */}
                  {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
                    <div className="mb-3">
                      <h6 className="fw-bold text-dark mb-2">Specifications</h6>
                      <div className="row g-2 small">
                        {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                          <div key={key} className="col-6">
                            <div className="bg-light p-2 rounded">
                              <span className="text-muted d-block" style={{ fontSize: '11px' }}>{key}</span>
                              <span className="fw-semibold text-dark">{val}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-4">
                    <h6 className="fw-bold text-dark mb-2">Description</h6>
                    <p className="text-secondary small mb-0" style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Seller Card */}
                  <div className="card bg-light border-0 p-3 mb-3 rounded-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: '42px', height: '42px', fontSize: '16px' }}
                        >
                          {selectedProduct.seller?.name ? selectedProduct.seller.name.charAt(0) : 'U'}
                        </div>
                        <div>
                          <div className="fw-bold text-dark d-flex align-items-center gap-1">
                            {selectedProduct.seller?.name || 'Seller'}
                            {selectedProduct.seller?.verified && (
                              <i className="bi bi-patch-check-fill text-primary" title="Verified Seller"></i>
                            )}
                          </div>
                          <div className="text-muted" style={{ fontSize: '11px' }}>
                            Member since {selectedProduct.seller?.memberSince || '2023'}
                          </div>
                        </div>
                      </div>
                      <span className="badge bg-success-subtle text-success border border-success-subtle">
                        ⭐ {selectedProduct.seller?.rating || '4.8'}
                      </span>
                    </div>

                    {/* Phone Reveal */}
                    <div className="mt-2 pt-2 border-top">
                      {showPhone ? (
                        <div className="d-flex align-items-center justify-content-between bg-white p-2 rounded border">
                          <span className="fw-bold text-dark">{selectedProduct.seller?.phone || '+91 98765 43210'}</span>
                          <span className="badge bg-success">Verified</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-dark btn-sm w-100 fw-bold py-2"
                          onClick={() => setShowPhone(true)}
                        >
                          <i className="bi bi-telephone-fill me-2"></i> Show Phone Number
                        </button>
                      )}
                    </div>
                  </div>

                </div>

                {/* Primary Action Buttons */}
                <div>
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-primary fw-bold py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                      onClick={() => setChatProduct(selectedProduct)}
                    >
                      <i className="bi bi-chat-dots-fill fs-5"></i> Chat with Seller
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-warning text-dark fw-bold py-2 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => setOfferProduct(selectedProduct)}
                    >
                      <i className="bi bi-tag-fill"></i> Make an Offer
                    </button>
                  </div>

                  {/* Safety Advice */}
                  <div className="text-muted text-center mt-3" style={{ fontSize: '11px' }}>
                    <i className="bi bi-shield-check me-1 text-success"></i>
                    Never send payments online before inspecting the item in person.
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
