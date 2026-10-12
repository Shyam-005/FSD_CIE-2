import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <div className="container-fluid px-lg-4 my-3">
      <div 
        className="rounded-3 p-4 p-md-5 text-white position-relative overflow-hidden shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #002f34 0%, #004d40 60%, #00a49f 100%)',
          minHeight: '180px'
        }}
      >
        <div className="row align-items-center position-relative z-1">
          <div className="col-lg-8">
            <span className="badge bg-warning text-dark fw-bold mb-2 px-3 py-1 text-uppercase">
              Verified Marketplace
            </span>
            <h1 className="display-6 fw-bold mb-2">
              Buy & Sell Anything Near You
            </h1>
            <p className="lead mb-4 text-white-50 fs-6">
              Connect with genuine buyers & sellers in your city. Post ads for free with zero commission!
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link 
                to="/sell"
                className="btn btn-warning fw-bold px-4 py-2 text-dark rounded-pill shadow-sm text-decoration-none"
              >
                <i className="bi bi-camera me-2"></i> Post Free Ad Now
              </Link>
              <Link 
                to="/category/cars"
                className="btn btn-outline-light px-3 py-2 rounded-pill text-decoration-none"
              >
                Explore Cars
              </Link>
              <Link 
                to="/category/mobiles"
                className="btn btn-outline-light px-3 py-2 rounded-pill text-decoration-none"
              >
                Explore Mobiles
              </Link>
            </div>
          </div>
          
          <div className="col-lg-4 d-none d-lg-flex justify-content-end">
            <div className="bg-white bg-opacity-10 p-3 rounded-3 border border-white border-opacity-25 text-center" style={{ backdropFilter: 'blur(8px)', width: '240px' }}>
              <div className="fs-2 fw-bold text-warning mb-1">100% Free</div>
              <div className="small text-white-50 mb-3">No hidden charges or commissions</div>
              <div className="d-flex justify-content-around border-top border-white border-opacity-25 pt-2">
                <div>
                  <div className="fw-bold">10M+</div>
                  <div style={{ fontSize: '11px' }} className="text-white-50">Active Users</div>
                </div>
                <div>
                  <div className="fw-bold">500+</div>
                  <div style={{ fontSize: '11px' }} className="text-white-50">Cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div 
          className="position-absolute end-0 bottom-0 opacity-10 pointer-events-none"
          style={{ transform: 'translate(10%, 20%)' }}
        >
          <svg width="400" height="400" viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="90" />
          </svg>
        </div>
      </div>
    </div>
  );
}
