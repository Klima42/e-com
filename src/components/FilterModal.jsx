import React, { useState } from 'react';
import { FilterModalProps, FilterState } from './types';

const FilterModal: React.FC<FilterModalProps> = ({ onApply, onClose, initialFilters }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  
  const amenities = [
    'WiFi', 'Pool', 'Kitchen', 'Parking', 'AC', 'Heating', 'Washer', 'Dryer',
    'Hot Tub', 'BBQ', 'Beach Access', 'Gym'
  ] as const;

  const PriceRange: React.FC = () => (
    <div className="space-y-4">
      <h3 className="font-medium text-emerald-800">Price Range</h3>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm text-emerald-600">Min Price</label>
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({
              ...prev,
              priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
            }))}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-emerald-600">Max Price</label>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({
              ...prev,
              priceRange: [prev.priceRange[0], parseInt(e.target.value) || 0]
            }))}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-emerald-800">Filters</h2>
          <button onClick={onClose} className="text-emerald-600 hover:text-emerald-800">✕</button>
        </div>

        <div className="space-y-8">
          <PriceRange />

          <div>
            <h3 className="font-medium text-emerald-800 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {amenities.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({
                      ...prev,
                      amenities: e.target.checked
                        ? [...prev.amenities, amenity]
                        : prev.amenities.filter(a => a !== amenity)
                    }))}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-emerald-800">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.instantBook}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({
                  ...prev,
                  instantBook: e.target.checked
                }))}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-emerald-800">Instant Book</span>
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setFilters({
              priceRange: [0, 1000],
              propertyType: [],
              instantBook: false,
              amenities: []
            })}
            className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
          >
            Clear all
          </button>
          <button
            onClick={() => onApply(filters)}
            className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
