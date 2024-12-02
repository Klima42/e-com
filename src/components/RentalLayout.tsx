import { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  User,
  Menu,
  Calendar,
  Users,
  Sliders
} from 'lucide-react';

// Types
const propertyTypes = ['Beach', 'Mountain', 'City', 'Lake', 'Countryside', 'Desert'];

const sampleProperties = [
  {
    id: 1,
    title: "Cozy Beach House",
    location: "Malibu, California",
    price: 150,
    rating: 4.8,
    reviews: 124,
    image: "/api/placeholder/400/300",
    amenities: ["WiFi", "Pool", "Ocean View"],
    maxGuests: 6,
    bedroomCount: 3,
    bathCount: 2,
    superhost: true
  },
  {
    id: 2,
    title: "Mountain Retreat",
    location: "Aspen, Colorado",
    price: 200,
    rating: 4.9,
    reviews: 89,
    image: "/api/placeholder/400/300",
    amenities: ["Fireplace", "Hot Tub", "Ski-in/Ski-out"],
    maxGuests: 8,
    bedroomCount: 4,
    bathCount: 3,
    superhost: false
  }
];

// Components
const DatePicker = ({ onSelect, onClose }) => {
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const generateCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateSelect = (date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: date, end: null });
    } else {
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: date });
      }
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + direction)));
  };

  const isDateSelected = (date) => {
    if (!date || !selectedRange.start) return false;
    if (!selectedRange.end) return date.getTime() === selectedRange.start.getTime();
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const isDateInRange = (date) => {
    if (!date || !selectedRange.start || !selectedRange.end) return false;
    return date > selectedRange.start && date < selectedRange.end;
  };

  const monthDays = generateCalendarDays(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  const nextMonth = new Date(currentMonth);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextMonthDays = generateCalendarDays(
    nextMonth.getFullYear(),
    nextMonth.getMonth()
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-emerald-800">Select dates</h2>
          <button onClick={onClose} className="text-emerald-600 hover:text-emerald-800">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {[monthDays, nextMonthDays].map((days, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="text-emerald-600 hover:text-emerald-800 p-1"
                  disabled={index === 1}
                >
                  ←
                </button>
                <span className="font-medium">
                  {new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + index
                  ).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => navigateMonth(1)}
                  className="text-emerald-600 hover:text-emerald-800 p-1"
                  disabled={index === 0}
                >
                  →
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-emerald-600">
                    {day}
                  </div>
                ))}
                {days.map((date, i) => (
                  <button
                    key={i}
                    onClick={() => date && handleDateSelect(date)}
                    disabled={!date || date < new Date()}
                    className={`
                      h-10 w-10 rounded-full flex items-center justify-center text-sm
                      ${!date ? 'invisible' : ''}
                      ${date && date < new Date() ? 'text-gray-300 cursor-not-allowed' : ''}
                      ${isDateSelected(date) ? 'bg-emerald-600 text-white' : ''}
                      ${isDateInRange(date) ? 'bg-emerald-100' : ''}
                      ${
                        date && date >= new Date() && !isDateSelected(date) && !isDateInRange(date)
                          ? 'hover:bg-emerald-50'
                          : ''
                      }
                    `}
                  >
                    {date?.getDate()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setSelectedRange({ start: null, end: null })}
            className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
          >
            Clear
          </button>
          <button
            onClick={() => selectedRange.start && selectedRange.end && onSelect(selectedRange)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
            disabled={!selectedRange.start || !selectedRange.end}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
// GuestSelector Component
const GuestSelector = ({ onSelect, onClose, initialCounts = { adults: 1, children: 0, infants: 0 } }) => {
  const [counts, setCounts] = useState(initialCounts);

  const updateCount = (type, increment) => {
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

  const GuestTypeControl = ({ type, label, description }) => (
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
          <button onClick={onClose} className="text-emerald-600 hover:text-emerald-800">
            ✕
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          <GuestTypeControl
            type="adults"
            label="Adults"
            description="Ages 13 or above"
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
// FilterModal Component
const FilterModal = ({ onApply, onClose, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);
  
  const amenities = [
    'WiFi', 'Pool', 'Kitchen', 'Parking', 'AC', 'Heating', 'Washer', 'Dryer',
    'Hot Tub', 'BBQ', 'Beach Access', 'Gym'
  ];

  const PriceRange = () => (
    <div className="space-y-4">
      <h3 className="font-medium text-emerald-800">Price Range</h3>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm text-emerald-600">Min Price</label>
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={e => setFilters(prev => ({
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
            onChange={e => setFilters(prev => ({
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
              {amenities.map(amenity => (
                <label key={amenity} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={e => setFilters(prev => ({
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
                onChange={e => setFilters(prev => ({
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
// PropertyCard Component
const PropertyCard = ({ property, favorites, toggleFavorite }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="relative aspect-[4/3]">
      <img 
        src={property.image} 
        alt={property.title}
        className="w-full h-full object-cover rounded-t-xl"
      />
      <button 
        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(property.id);
        }}
      >
        <div className={favorites.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-600'}>
          <Heart />
        </div>
      </button>
      {property.superhost && (
        <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
          Superhost
        </div>
      )}
    </div>

    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg text-emerald-800 truncate">{property.title}</h3>
          <div className="text-emerald-600 text-sm">{property.location}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 my-2">
        {property.amenities.slice(0, 3).map((amenity, index) => (
          <span key={index} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
            {amenity}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-lg font-semibold text-emerald-800">${property.price}</span>
          <span className="text-emerald-600 ml-1">/ night</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-emerald-800">{property.rating}</span>
          <span className="text-sm text-emerald-600">({property.reviews})</span>
        </div>
      </div>
    </div>
  </div>
);

// Main RentalLayout Component
const RentalLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const [guestCounts, setGuestCounts] = useState({ adults: 1, children: 0, infants: 0 });
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    propertyType: [],
    instantBook: false,
    amenities: []
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleDateSelect = (range) => {
    setSelectedDates(range);
    setShowDatePicker(false);
  };

  const handleGuestSelect = (counts) => {
    setGuestCounts(counts);
    setShowGuestSelector(false);
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setShowFilterModal(false);
  };

  const formatDateRange = () => {
    if (!selectedDates.start) return 'Add dates';
    if (!selectedDates.end) return 'Select end date';
    return `${selectedDates.start.toLocaleDateString()} - ${selectedDates.end.toLocaleDateString()}`;
  };

  const formatGuestCount = () => {
    const total = guestCounts.adults + guestCounts.children;
    const guestText = `${total} guest${total !== 1 ? 's' : ''}`;
    return guestCounts.infants > 0 
      ? `${guestText}, ${guestCounts.infants} infant${guestCounts.infants !== 1 ? 's' : ''}` 
      : guestText;
  };

  useEffect(() => {
    let filtered = sampleProperties;

    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      filtered = filtered.filter(property => 
        property.price >= filters.priceRange[0] && 
        property.price <= filters.priceRange[1]
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }

    if (filters.propertyType.length > 0) {
      filtered = filtered.filter(property =>
        filters.propertyType.includes(property.category)
      );
    }

    setFilteredProperties(filtered);
  }, [searchQuery, filters]);

  return (
    <div className="w-screen min-h-screen bg-white">
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-100 w-full">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold text-emerald-600">StayScape</span>

            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full px-6 py-2 pl-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={handleSearchChange}
                  value={searchQuery}
                />
                <div className="absolute left-4 top-2.5 h-5 w-5 text-gray-400">
                  <Search />
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setShowDatePicker(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full"
              >
                <Calendar />
                {formatDateRange()}
              </button>
              <button 
                onClick={() => setShowGuestSelector(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full"
              >
                <Users />
                {formatGuestCount()}
              </button>
              <button 
                onClick={() => setShowFilterModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full"
              >
                <Sliders />
                Filters
              </button>
              <button className="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full">
                List your property
              </button>
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <User />
              </button>
            </div>

            <div className="flex md:hidden items-center gap-4">
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <Search />
              </button>
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full px-4 py-6">
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {propertyTypes.map(type => (
              <button
                key={type}
                className={`px-4 py-2 text-sm whitespace-nowrap rounded-full border ${
                  filters.propertyType.includes(type)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFilters(prev => ({
                  ...prev,
                  propertyType: prev.propertyType.includes(type)
                    ? prev.propertyType.filter(t => t !== type)
                    : [...prev.propertyType, type]
                }))}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </main>

      {showDatePicker && (
        <DatePicker 
          onSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {showGuestSelector && (
        <GuestSelector
          onSelect={handleGuestSelect}
          onClose={() => setShowGuestSelector(false)}
          initialCounts={guestCounts}
        />
      )}

      {showFilterModal && (
        <FilterModal
          onApply={handleFilterApply}
          onClose={() => setShowFilterModal(false)}
          initialFilters={filters}
        />
      )}

      <footer className="bg-white border-t border-emerald-100 mt-12">
        <div className="w-full px-4 py-8">
          <div className="space-y-2 text-sm">
            <p className="text-emerald-600 hover:text-emerald-700 cursor-pointer">Help Center</p>
            <p className="text-emerald-600 hover:text-emerald-700 cursor-pointer">Support</p>
          </div>
          <div className="mt-8 pt-8 border-t border-emerald-100 text-center text-sm text-emerald-600">
            © 2024 StayScape. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentalLayout;
