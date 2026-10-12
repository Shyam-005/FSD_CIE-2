import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES, LOCATIONS, PRESET_IMAGES } from '../data/mockData';

export default function SellAd() {
  const { addProduct, selectedLocation, user } = useApp();
  const navigate = useNavigate();

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
      setError('Please enter a description');
      return;
    }

    const newAd = addProduct({
      title: formData.title.trim(),
      category: formData.category,
      price: Number(formData.price),
      location: formData.location,
      city: formData.location.split(',')[0],
      description: formData.description.trim(),
      images: [previewImage || PRESET_IMAGES[0].url]
    });

    navigate(`/product/${newAd.id}`);
  };

  return (
    <div className="container py-4 my-2" style={{ maxWidth: '800px' }}>
      
      {/* Page Header */}
      <div className="mb-4 text-center">
        <h2 className="fw-bold text-dark">POST YOUR AD</h2>
        <p className="text-muted small">Fill in the details below to list your item on India's #1 marketplace</p>
      </div>

      <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
        
        {error && (
          <div className="alert alert-danger py-2 small mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            
            {/* Category */}
            <div className="col-md-6">
              <label className="form-label fw-bold small text-dark">Category *</label>
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

            {/* Price */}
            <div className="col-md-6">
              <label className="form-label fw-bold small text-dark">Price (₹) *</label>
              <div className="input-group">
                <span className="input-group-text fw-bold bg-light">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 25000"
                  className="form-control border-2"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>
            </div>

            {/* Ad Title */}
            <div className="col-12">
              <label className="form-label fw-bold small text-dark">Ad Title *</label>
              <input
                type="text"
                required
                maxLength={100}
                placeholder="Mention key details (Brand, Model, Year, Condition)"
                className="form-control border-2"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
              <div className="text-muted text-end small mt-1" style={{ fontSize: '11px' }}>
                {formData.title.length}/100 characters
              </div>
            </div>

            {/* Location */}
            <div className="col-md-6">
              <label className="form-label fw-bold small text-dark">Location / City *</label>
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

            {/* File Upload */}
            <div className="col-md-6">
              <label className="form-label fw-bold small text-dark">Upload Photo *</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleFileUpload}
              />
            </div>

            {/* Preset Photos */}
            <div className="col-12">
              <label className="form-label small fw-bold text-muted mb-2">Or pick a sample photo:</label>
              <div className="d-flex flex-wrap gap-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`btn btn-sm ${previewImage === preset.url ? 'btn-dark' : 'btn-outline-secondary bg-light'}`}
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

            {/* Description & Preview */}
            <div className="col-md-8">
              <label className="form-label fw-bold small text-dark">Description *</label>
              <textarea
                rows={4}
                required
                placeholder="Describe what makes your item unique, accessories included, condition, etc..."
                className="form-control border-2"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              ></textarea>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold small text-dark">Photo Preview</label>
              <div className="border rounded-3 overflow-hidden bg-light d-flex align-items-center justify-content-center" style={{ height: '110px' }}>
                {previewImage ? (
                  <img src={previewImage} alt="preview" className="w-100 h-100 object-fit-cover" />
                ) : (
                  <span className="text-muted small">No photo chosen</span>
                )}
              </div>
            </div>

          </div>

          <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
            <Link to="/" className="btn btn-outline-secondary px-4">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-warning fw-bold px-4 text-dark shadow-sm"
            >
              Post Ad Now
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
