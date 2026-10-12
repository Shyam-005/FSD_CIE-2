import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container py-5 text-center my-4">
      <div className="py-5 bg-white rounded-4 border p-4 shadow-sm" style={{ maxWidth: '540px', margin: '0 auto' }}>
        <h1 className="display-1 fw-bold text-dark mb-0" style={{ color: '#002f34' }}>404</h1>
        <h4 className="fw-bold mb-2">Oops! Page not found</h4>
        <p className="text-muted small mb-4">
          The link you followed may be broken, or the page may have been removed.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary fw-bold px-4 py-2"
          style={{ backgroundColor: '#002f34', borderColor: '#002f34' }}
        >
          Go to OLX Home
        </Link>
      </div>
    </div>
  );
}
