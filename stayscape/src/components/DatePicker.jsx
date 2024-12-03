// DatePicker.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const DatePicker = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
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

  const handleDateSelect = (start, end) => {
    const newRange = { startDate: start, endDate: end };
    setDateRange(newRange);
    onChange?.(newRange);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:border-emerald-500"
      >
        <Calendar className="w-5 h-5 text-emerald-600" />
        <div className="text-sm">
          <p className="font-medium">
            {dateRange.startDate ? dateRange.startDate.toLocaleDateString() : 'Check in'} 
            {' - '}
            {dateRange.endDate ? dateRange.endDate.toLocaleDateString() : 'Check out'}
          </p>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 p-4 bg-white rounded-lg shadow-lg border z-50">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleDateSelect(new Date(), new Date(Date.now() + 86400000))}
                className="p-2 text-sm border rounded-lg hover:border-emerald-500"
              >
                Tonight
              </button>
              <button
                onClick={() => handleDateSelect(new Date(), new Date(Date.now() + 172800000))}
                className="p-2 text-sm border rounded-lg hover:border-emerald-500"
              >
                Weekend
              </button>
            </div>
            <button
              onClick={() => handleDateSelect(new Date(), new Date(Date.now() + 604800000))}
              className="w-full p-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Week
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

