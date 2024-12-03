import React, { useState } from 'react';
import { Users } from 'lucide-react';

const GuestSelector = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });

  const updateGuests = (type, value) => {
    const newGuests = { ...guests, [type]: Math.max(0, guests[type] + value) };
    setGuests(newGuests);
    onChange(newGuests);
  };

  const totalGuests = guests.adults + guests.children;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border rounded-full hover:border-gray-300 focus:outline-none"
      >
        <Users className="h-4 w-4" />
        <span>{totalGuests} guest{totalGuests !== 1 ? 's' : ''}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-white border rounded-xl shadow-lg z-50">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Adults</h3>
                <p className="text-sm text-gray-500">Ages 13 or above</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateGuests('adults', -1)}
                  disabled={guests.adults <= 1}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>
                <span className="w-8 text-center">{guests.adults}</span>
                <button
                  onClick={() => updateGuests('adults', 1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Children</h3>
                <p className="text-sm text-gray-500">Ages 2-12</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateGuests('children', -1)}
                  disabled={guests.children <= 0}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>
                <span className="w-8 text-center">{guests.children}</span>
                <button
                  onClick={() => updateGuests('children', 1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Infants</h3>
                <p className="text-sm text-gray-500">Under 2</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateGuests('infants', -1)}
                  disabled={guests.infants <= 0}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>
                <span className="w-8 text-center">{guests.infants}</span>
                <button
                  onClick={() => updateGuests('infants', 1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestSelector;