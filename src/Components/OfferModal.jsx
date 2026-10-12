import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function OfferModal() {
  const { offerProduct, setOfferProduct, showToast } = useApp();
  const [offerPrice, setOfferPrice] = useState('');
  const [offerStatus, setOfferStatus] = useState(null); // 'submitted' | null

  if (!offerProduct) return null;

  const listedPrice = offerProduct.price;

  const handleSetQuickOffer = (percent) => {
    const discounted = Math.round(listedPrice * (1 - percent / 100));
    setOfferPrice(discounted.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!offerPrice || Number(offerPrice) <= 0) return;

    setOfferStatus('submitted');
    showToast(`Offer of ₹${Number(offerPrice).toLocaleString('en-IN')} sent to ${offerProduct.seller?.name || 'seller'}!`);

    setTimeout(() => {
      setOfferStatus(null);
      setOfferProduct(null);
    }, 2000);
  };

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(3px)', zIndex: 1075 }}
      onClick={() => setOfferProduct(null)}
    >
      <div 
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg">
          
          <div className="modal-header border-bottom py-3">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <i className="bi bi-tag-fill text-warning"></i> Make an Offer
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setOfferProduct(null)}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            {offerStatus === 'submitted' ? (
              <div className="text-center py-4">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                <h5 className="fw-bold mt-2">Offer Sent!</h5>
                <p className="text-muted small">
                  The seller has received your offer. They will respond via chat shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-center bg-light p-3 rounded">
                  <span className="text-muted small d-block mb-1">Listed Price</span>
                  <span className="fs-4 fw-bold text-dark">
                    ₹{listedPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted mb-2">Quick Offer Suggestions</label>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm flex-fill py-2"
                      onClick={() => handleSetQuickOffer(5)}
                    >
                      5% off<br />
                      <strong className="small">₹{Math.round(listedPrice * 0.95).toLocaleString('en-IN')}</strong>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm flex-fill py-2"
                      onClick={() => handleSetQuickOffer(10)}
                    >
                      10% off<br />
                      <strong className="small">₹{Math.round(listedPrice * 0.9).toLocaleString('en-IN')}</strong>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm flex-fill py-2"
                      onClick={() => handleSetQuickOffer(15)}
                    >
                      15% off<br />
                      <strong className="small">₹{Math.round(listedPrice * 0.85).toLocaleString('en-IN')}</strong>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-dark">Your Offer Amount (₹) *</label>
                  <div className="input-group">
                    <span className="input-group-text fw-bold">₹</span>
                    <input
                      type="number"
                      required
                      min="1"
                      className="form-control"
                      placeholder="Enter offer amount"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                    />
                  </div>
                  <div className="text-muted mt-1" style={{ fontSize: '11px' }}>
                    Sellers are more likely to accept reasonable offers within 10-15% of listed price.
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-warning text-dark fw-bold py-2">
                    Send Offer to Seller
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-link text-muted small text-decoration-none"
                    onClick={() => setOfferProduct(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
