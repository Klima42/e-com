import React, { useState } from 'react';
import { GuestSelectorProps, GuestCounts } from './types';

type GuestTypeControlProps = {
  type: keyof GuestCounts;
  label: string;
  description: string;
  counts: GuestCounts;
  updateCount: (type: keyof GuestCounts, increment: number) => void;
};

const GuestSelector: React.FC<GuestSelectorProps> = ({ onSelect, onClose, initialCounts }) => {
  const [counts, setCounts] = useState<GuestCounts>(initialCounts);

  const updateCount = (type: keyof GuestCounts, increment: number): void => {
    const newCount = counts[type] + increment;
    const totalGuests = type === 'infants' 
      ? counts.adults + counts.children 
      : (counts.adults + counts.children + increment);
    
    if (newCount < 0) return;
    if (type === 'adults' && newCount < 1) return;
    if (totalGuests > 16) return;
    
    setCounts(prev => ({
      ...prev,
      [type]: newCount
    }));
  };

  const GuestTypeControl: React.FC<GuestTypeControlProps> = ({ type, label, description, counts, updateCount }) => (
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="font-medium text-emerald-800">{label}</h3>
        <p className="text-sm text-emerald-600">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => updateCount(type, -1)}
          className={`
            w-8 h-8 rounded-full border border-emerald-200 flex items-center justify-center
            ${counts[type] > (type === 'adults' ? 1 : 0)
              ? 'text-emerald-600 hover:border-emerald-600'
              : 'text-gray-300 cursor-not-allowed'}
          `}
          disabled={counts[type] <= (type === 'adults' ? 1 : 0)}
        >
          -
        </button>
        <span className="w-6 text-center">{counts[type]}</span>
        <button
          onClick={() => updateCount(type, 1)}
          className={`
            w-8 h-8 rounded-full border border-emerald-200 flex items-center justify-center
            ${counts.adults + counts.children < 16
              ? 'text-emerald-600 hover:border-emerald-600'
              : 'text-gray-300 cursor-not-allowed'}
          `}
          disabled={counts.adults + counts.children >= 16}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-emerald-800">Guests</h2>
          <button onClick={onClose} className="text-emerald-600 hover:text-emerald-800">✕</button>
        </div>

        <div className="divide-y divide-gray-100">
          <GuestTypeControl
            type="adults"
            label="Adults"
            description="Ages 13 or above"
            counts={counts}
            updateCount={updateCount}
          />
          <GuestTypeControl
            type="children"
            label="Children"
            description="Ages 2-12"
            counts={counts}
            updateCount={updateCount}
          />
          <GuestTypeControl
            type="infants"
            label="Infants"
            description="Under 2"
            counts={counts}
            updateCount={updateCount}
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setCounts({ adults: 1, children: 0, infants: 0 })}
            className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
          >
            Clear
          </button>
          <button
            onClick={() => onSelect(counts)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestSelector;
