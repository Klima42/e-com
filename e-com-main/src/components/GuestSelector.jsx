// GuestSelector.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Users, Minus, Plus } from 'lucide-react';

const GuestSelector = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [counts, setCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateCount = (type, increment) => {
    setCounts(prev => {
      const newCounts = {
        ...prev,
        [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1)
      };
      onChange?.(newCounts);
      return newCounts;
    });
  };

  const GuestTypeControl = ({ type, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateCount(type, false)}
          disabled={type === 'adults' ? counts[type] <= 1 : counts[type] <= 0}
          className="p-1 rounded-full border hover:border-emerald-500 disabled:opacity-50"
        >
          <Minus className="w-4 h-4 text-emerald-600" />
        </button>
        <span className="w-6 text-center">{counts[type]}</span>
        <button
          onClick={() => updateCount(type, true)}
          className="p-1 rounded-full border hover:border-emerald-500"
        >
          <Plus className="w-4 h-4 text-emerald-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:border-emerald-500"
      >
        <Users className="w-5 h-5 text-emerald-600" />
        <span className="text-sm font-medium">
          {counts.adults + counts.children} guests
          {counts.infants > 0 && `, ${counts.infants} infants`}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-80 bg-white rounded-lg shadow-lg border p-4 z-50">
          <GuestTypeControl 
            type="adults" 
            label="Adults" 
            description="Age 13+" 
          />
          <GuestTypeControl 
            type="children" 
            label="Children" 
            description="Ages 2-12" 
          />
          <GuestTypeControl 
            type="infants" 
            label="Infants" 
            description="Under 2" 
          />
          
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestSelector;
