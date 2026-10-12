import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LOCATIONS } from '../data/mockData';

export default function Header() {
  const {
    user,
    logoutUser,
    favorites,
    selectedLocation,
    setSelectedLocation,
    searchQuery,
    setSearchQuery,
    resetFilters
  } = useApp();

  const navigate = useNavigate();
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className="olx-header sticky-top bg-white border-bottom shadow-sm">
      <div className="container-fluid px-lg-4 py-2">
        <div className="d-flex align-items-center justify-content-between gap-3">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="d-flex align-items-center text-decoration-none"
            onClick={resetFilters}
            title="OLX Home"
          >
            <svg width="46" height="30" viewBox="0 0 1024 1024" fill="#002f34">
              <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z" />
            </svg>
            <span className="ms-1 fw-bold fs-4 d-none d-sm-inline" style={{ color: '#002f34', letterSpacing: '-0.5px' }}>
              OLX
            </span>
          </Link>

          {/* Location Selector */}
          <div className="position-relative d-none d-md-block" style={{ width: '230px' }}>
            <div 
              className="form-control d-flex align-items-center justify-content-between cursor-pointer border-2"
              style={{ borderColor: '#002f34', cursor: 'pointer', height: '48px', borderRadius: '4px' }}
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            >
              <div className="d-flex align-items-center text-truncate">
                <i className="bi bi-geo-alt-fill text-dark me-2"></i>
                <span className="text-truncate fw-medium small">{selectedLocation}</span>
              </div>
              <i className={`bi bi-chevron-${locationDropdownOpen ? 'up' : 'down'} ms-2`}></i>
            </div>

            {locationDropdownOpen && (
              <div 
                className="position-absolute bg-white border rounded shadow mt-1 w-100 z-3"
                style={{ maxHeight: '280px', overflowY: 'auto' }}
              >
                <div className="p-2 border-bottom text-muted small fw-bold">Popular Locations</div>
                {LOCATIONS.map(loc => (
                  <button
                    key={loc}
                    className={`dropdown-item py-2 px-3 small d-flex align-items-center ${selectedLocation === loc ? 'active bg-light text-dark fw-bold' : ''}`}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setLocationDropdownOpen(false);
                      navigate('/');
                    }}
                  >
                    <i className="bi bi-geo-alt me-2 text-secondary"></i>
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar Form */}
          <form className="flex-grow-1" style={{ maxWidth: '640px' }} onSubmit={handleSearchSubmit}>
            <div className="input-group" style={{ height: '48px' }}>
              <input
                type="text"
                className="form-control border-2"
                style={{ borderColor: '#002f34', borderRadius: '4px 0 0 4px', fontSize: '0.95rem' }}
                placeholder="Find Cars, Mobile Phones, Electronics and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="btn btn-outline-secondary border-2 border-end-0"
                  style={{ borderColor: '#002f34' }}
                  type="button"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
              <button 
                className="btn text-white px-3 border-2"
                style={{ backgroundColor: '#002f34', borderColor: '#002f34', borderRadius: '0 4px 4px 0' }}
                type="submit"
              >
                <i className="bi bi-search fs-5"></i>
              </button>
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="d-flex align-items-center gap-2 gap-lg-3">
            
            {/* Favorites Icon */}
            <Link
              to="/favorites"
              className="btn btn-light position-relative d-flex align-items-center justify-content-center rounded-circle border-0 text-decoration-none"
              title="My Favorites"
              style={{ width: '42px', height: '42px' }}
            >
              <i className={`bi ${favorites.length > 0 ? 'bi-heart-fill text-danger' : 'bi-heart'} fs-5`}></i>
              {favorites.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Dropdown or Sign In link */}
            {user ? (
              <div className="position-relative">
                <button
                  className="btn btn-light d-flex align-items-center gap-2 p-1 pe-2 rounded-pill border"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-circle"
                    style={{ width: '34px', height: '34px', objectFit: 'cover' }}
                  />
                  <span className="d-none d-lg-inline small fw-bold text-truncate" style={{ maxWidth: '100px' }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <i className="bi bi-chevron-down small text-muted"></i>
                </button>

                {userMenuOpen && (
                  <div className="position-absolute end-0 mt-2 bg-white border rounded shadow p-2 z-3" style={{ width: '220px' }}>
                    <div className="px-3 py-2 border-bottom mb-1">
                      <div className="fw-bold small">{user.name}</div>
                      <div className="text-muted" style={{ fontSize: '11px' }}>{user.email}</div>
                    </div>
                    <Link 
                      to="/my-ads" 
                      className="dropdown-item small py-2 px-3 rounded text-decoration-none"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <i className="bi bi-card-list me-2"></i> My Ads
                    </Link>
                    <Link 
                      to="/favorites" 
                      className="dropdown-item small py-2 px-3 rounded text-decoration-none"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <i className="bi bi-heart me-2"></i> Favorites ({favorites.length})
                    </Link>
                    <hr className="my-1" />
                    <button 
                      className="dropdown-item small py-2 px-3 rounded text-danger"
                      onClick={() => {
                        logoutUser();
                        setUserMenuOpen(false);
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link
                  to="/signin"
                  className="btn btn-link text-decoration-none fw-bold text-dark p-0"
                  style={{ fontSize: '15px' }}
                >
                  Sign In
                </Link>
                <span className="text-muted small">|</span>
                <Link
                  to="/signup"
                  className="btn btn-link text-decoration-none fw-bold text-dark p-0"
                  style={{ fontSize: '15px' }}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* OLX Styled + SELL Button */}
            <Link
              to="/sell"
              className="olx-sell-btn d-flex align-items-center gap-1 shadow-sm text-decoration-none"
              title="Post an Ad"
            >
              <i className="bi bi-plus-lg fw-bold"></i>
              <span className="fw-bold">SELL</span>
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
}
