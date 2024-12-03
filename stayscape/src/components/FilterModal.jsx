import React, { useState } from 'react';
import { X } from 'lucide-react';

const FilterModal = ({ isOpen, onClose, onFilter }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    bedrooms: 1,
    bathrooms: 1,
    propertyTypes: []
  });

  const handleSubmit = () => {
    onFilter(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-lg mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="flex gap-4">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => setFilters({
                  ...filters,
                  priceRange: [parseInt(e.target.value), filters.priceRange[1]]
                })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Min"
              />
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({
                  ...filters,
                  priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Rooms */}
          <div>
            <h3 className="font-medium mb-2">Rooms</h3>
            <div className="flex gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bedrooms</label>
                <input
                  type="number"
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({
                    ...filters,
                    bedrooms: parseInt(e.target.value)
                  })}
                  min="1"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bathrooms</label>
                <input
                  type="number"
                  value={filters.bathrooms}
                  onChange={(e) => setFilters({
                    ...filters,
                    bathrooms: parseInt(e.target.value)
                  })}
                  min="1"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-medium mb-2">Property Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {['House', 'Apartment', 'Cabin', 'Villa'].map(type => (
                <button
                  key={type}
                  onClick={() => {
                    const types = filters.propertyTypes.includes(type)
                      ? filters.propertyTypes.filter(t => t !== type)
                      : [...filters.propertyTypes, type];
                    setFilters({ ...filters, propertyTypes: types });
                  }}
                  className={`px-4 py-2 rounded-lg border ${
                    filters.propertyTypes.includes(type)
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;