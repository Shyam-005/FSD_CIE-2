import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, LOCATIONS, PRESET_IMAGES } from '../data/mockData';

export default function SellModal() {
  const {
    isSellModalOpen,
    setIsSellModalOpen,
    addProduct,
    setActiveTab,
    selectedLocation
  } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: 'mobiles',
    price: '',
    location: selectedLocation !== 'All India' ? selectedLocation : 'Mumbai, Maharashtra',
    description: '',
    imageUrl: PRESET_IMAGES[1].url
  });

  const [previewImage, setPreviewImage] = useState(PRESET_IMAGES[1].url);
  const [error, setError] = useState('');

  if (!isSellModalOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please enter an ad title');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError('Please enter a valid price');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please provide a brief description');
      return;
    }

    addProduct({
      title: formData.title.trim(),
      category: formData.category,
      price: Number(formData.price),
      location: formData.location,
      city: formData.location.split(',')[0],
      description: formData.description.trim(),
      images: [previewImage || PRESET_IMAGES[0].url]
    });

    setIsSellModalOpen(false);
    setActiveTab('my-ads');
  };

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
      onClick={() => setIsSellModalOpen(false)}
    >
      <div 
        className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg">
          
          {/* Header */}
          <div className="modal-header bg-white border-bottom py-3">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <span className="badge bg-warning text-dark p-2 rounded-circle">
                <i className="bi bi-camera-fill"></i>
              </span>
              POST YOUR AD
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setIsSellModalOpen(false)}
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4 bg-light">
            {error && (
              <div className="alert alert-danger py-2 small mb-3 alert-dismissible">
                {error}
                <button type="button" className="btn-close py-2" onClick={() => setError('')}></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">

                {/* Category Selection */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-dark">Category *</label>
                  <select
                    className="form-select border-2"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price (INR) */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-dark">Price (₹) *</label>
                  <div className="input-group">
                    <span className="input-group-text fw-bold">₹</span>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 15000"
                      className="form-control border-2"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Ad Title */}
                <div className="col-12">
                  <label className="form-label small fw-bold text-dark">Ad Title *</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Mention the key features (e.g. Brand, Model, Year, Condition)"
                    className="form-control border-2"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <div className="text-muted small mt-1 text-end" style={{ fontSize: '11px' }}>
                    {formData.title.length}/100 characters
                  </div>
                </div>

                {/* Location */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-dark">Location / City *</label>
                  <select
                    className="form-select border-2"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  >
                    {LOCATIONS.filter(l => l !== 'All India').map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Image Selection / Upload */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-dark">Upload Photos *</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileUpload}
                  />
                  <div className="text-muted small mt-1" style={{ fontSize: '11px' }}>
                    Choose a photo from your computer, or pick a preset below:
                  </div>
                </div>

                {/* Preset sample images */}
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Or pick a sample marketplace image:</label>
                  <div className="d-flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`btn btn-sm ${previewImage === preset.url ? 'btn-dark' : 'btn-outline-secondary bg-white'}`}
                        onClick={() => {
                          setPreviewImage(preset.url);
                          setFormData(prev => ({ ...prev, imageUrl: preset.url }));
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo Preview & Description */}
                <div className="col-12">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label small fw-bold text-dark">Description *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Include condition, features, reasons for selling, warranty details..."
                        className="form-control border-2"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      ></textarea>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-dark">Image Preview</label>
                      <div 
                        className="rounded border bg-white overflow-hidden d-flex align-items-center justify-content-center"
                        style={{ height: '110px' }}
                      >
                        {previewImage ? (
                          <img 
                            src={previewImage} 
                            alt="preview" 
                            className="w-100 h-100 object-fit-cover" 
                          />
                        ) : (
                          <span className="text-muted small">No photo chosen</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={() => setIsSellModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-warning fw-bold px-4 text-dark shadow-sm"
                >
                  <i className="bi bi-check2-circle me-1"></i> Post Ad Now
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
