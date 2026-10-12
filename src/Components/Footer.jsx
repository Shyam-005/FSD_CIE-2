import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { setSelectedLocation, setSelectedCategory } = useApp();
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    setSelectedLocation(`${city}, India`);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-5 border-top">
      {/* Upper Footer Links */}
      <div className="bg-light py-5">
        <div className="container-fluid px-lg-4">
          <div className="row g-4">
            
            {/* Column 1: Popular Locations */}
            <div className="col-6 col-md-3">
              <h6 className="fw-bold text-dark text-uppercase small mb-3">Popular Locations</h6>
              <ul className="list-unstyled text-muted small d-flex flex-column gap-2 mb-0">
                <li><button type="button" className="btn btn-link p-0 text-muted small text-decoration-none" onClick={() => handleCityClick('Kolkata')}>Kolkata</button></li>
                <li><button type="button" className="btn btn-link p-0 text-muted small text-decoration-none" onClick={() => handleCityClick('Mumbai')}>Mumbai</button></li>
                <li><button type="button" className="btn btn-link p-0 text-muted small text-decoration-none" onClick={() => handleCityClick('Chennai')}>Chennai</button></li>
                <li><button type="button" className="btn btn-link p-0 text-muted small text-decoration-none" onClick={() => handleCityClick('Pune')}>Pune</button></li>
              </ul>
            </div>

            {/* Column 2: Trending Locations */}
            <div className="col-6 col-md-3">
              <h6 className="fw-bold text-dark text-uppercase small mb-3">Trending Locations</h6>
              <ul className="list-unstyled text-muted small d-flex flex-column gap-2 mb-0">
                <li><button type="button" className="btn btn-link p-0 text-muted small text-decoration-none" onClick={() => handleCityClick('Hyderabad')}>Hyderabad</button></li>
                <li><button type="button" className="btn btn-link p-0 text-muted small text-decoration-none" onClick={() => handleCityClick('Bengaluru')}>Bengaluru</button></li>
                <li><button type="button" className="btn btn-link p-0 text-muted small text-decoration-none" onClick={() => handleCityClick('Delhi')}>Delhi</button></li>
                <li><button type="button" className="btn btn-link p-0 text-muted small text-decoration-none" onClick={() => handleCityClick('Ahmedabad')}>Ahmedabad</button></li>
              </ul>
            </div>

            {/* Column 3: About Us */}
            <div className="col-6 col-md-3">
              <h6 className="fw-bold text-dark text-uppercase small mb-3">About Us</h6>
              <ul className="list-unstyled text-muted small d-flex flex-column gap-2 mb-0">
                <li><span className="text-secondary cursor-pointer">About OLX Group</span></li>
                <li><span className="text-secondary cursor-pointer">Careers</span></li>
                <li><span className="text-secondary cursor-pointer">Contact Us</span></li>
                <li><span className="text-secondary cursor-pointer">OLX People</span></li>
                <li><span className="text-secondary cursor-pointer">Waah Jobs</span></li>
              </ul>
            </div>

            {/* Column 4: OLX & Quick Links */}
            <div className="col-6 col-md-3">
              <h6 className="fw-bold text-dark text-uppercase small mb-3">Quick Links</h6>
              <ul className="list-unstyled text-muted small d-flex flex-column gap-2 mb-3">
                <li><Link to="/signin" className="text-decoration-none text-muted">Sign In</Link></li>
                <li><Link to="/signup" className="text-decoration-none text-muted">Create Account</Link></li>
                <li><Link to="/sell" className="text-decoration-none text-muted">Post an Ad</Link></li>
                <li><Link to="/favorites" className="text-decoration-none text-muted">My Favorites</Link></li>
              </ul>

              <h6 className="fw-bold text-dark text-uppercase small mb-2">Follow Us</h6>
              <div className="d-flex gap-3 text-secondary fs-5">
                <i className="bi bi-facebook cursor-pointer text-primary"></i>
                <i className="bi bi-instagram cursor-pointer text-danger"></i>
                <i className="bi bi-twitter-x cursor-pointer text-dark"></i>
                <i className="bi bi-youtube cursor-pointer text-danger"></i>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="text-white py-3" style={{ backgroundColor: '#002f34' }}>
        <div className="container-fluid px-lg-4 d-flex flex-column flex-md-row align-items-center justify-content-between small gap-2">
          <div>
            Help - Free Classifieds in India
          </div>
          <div className="text-white-50">
            All rights reserved &copy; 2006-2026 OLX
          </div>
        </div>
      </div>
    </footer>
  );
}
