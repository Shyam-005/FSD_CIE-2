import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const getBgClass = () => {
    switch (toastMessage.type) {
      case 'success': return 'bg-success text-white';
      case 'warning': return 'bg-warning text-dark';
      case 'danger': return 'bg-danger text-white';
      default: return 'bg-dark text-white';
    }
  };

  return (
    <div 
      className="position-fixed bottom-0 start-50 translate-middle-x mb-4 z-3"
      style={{ zIndex: 1090 }}
    >
      <div className={`toast show align-items-center ${getBgClass()} border-0 shadow-lg px-3 py-2 rounded-pill`} role="alert">
        <div className="d-flex align-items-center gap-2">
          {toastMessage.type === 'success' && <i className="bi bi-check-circle-fill fs-5"></i>}
          {toastMessage.type === 'warning' && <i className="bi bi-exclamation-triangle-fill fs-5"></i>}
          {toastMessage.type === 'info' && <i className="bi bi-info-circle-fill fs-5"></i>}
          <div className="toast-body p-0 fw-semibold">
            {toastMessage.message}
          </div>
        </div>
      </div>
    </div>
  );
}
