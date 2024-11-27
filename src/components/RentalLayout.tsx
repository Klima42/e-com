import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  User, 
  MapPin, 
  Star, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Users,
  Calendar,
  Sliders
} from 'lucide-react';

// Type declarations
interface Property {
  id: number;
  price: number;
  image: string;
  title: string;
  location: string;
  dates: string;
  rating: number;
  reviews: number;
  category: string;
  amenities: string[];
  maxGuests: number;
  bedroomCount: number;
  bathCount: number;
  instantBook: boolean;
  superhost: boolean;
}

interface GuestCount {
  adults: number;
  children: number;
  infants: number;
}

interface DatePickerProps {
  selectedDates: Date[];
  onSelectDate: (dates: Date[]) => void;
  onClose: () => void;
}

interface FilterOptions {
  priceRange: [number, number];
  instantBook: boolean;
  propertyType: string[];
  amenities: string[];
}

interface GuestSelectorProps {
  guestCount: GuestCount;
  onGuestCountChange: (count: GuestCount) => void;
  maxGuests: number;
  onClose: () => void;
}

interface PropertyCardProps {
  property: Property;
}

interface PropertyGridProps {
  properties: Property[];
}

interface CalendarDay {
  date: Date | null;
  isDisabled: boolean;
}

interface SearchBarProps {
  onSearch: (location: string) => void;
  onDateClick: () => void;
  onGuestClick: () => void;
  dateDisplay: string;
  guestDisplay: string;
}

interface FilterModalProps {
  filters: FilterOptions;
  onFilterUpdate: (filters: FilterOptions) => void;
  onClose: () => void;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Sample Data
const sampleProperties: Property[] = [
  {
    id: 1,
    price: 150,
    image: "/api/placeholder/400/300",
    title: "Cozy Beach House",
    location: "Malibu, California",
    dates: "Available all year",
    rating: 4.8,
    reviews: 124,
    category: "Beach",
    amenities: ["WiFi", "Pool", "Ocean View"],
    maxGuests: 6,
    bedroomCount: 3,
    bathCount: 2,
    instantBook: true,
    superhost: true
  },
  {
    id: 2,
    price: 200,
    image: "/api/placeholder/400/300",
    title: "Mountain Retreat",
    location: "Aspen, Colorado",
    dates: "Winter season",
    rating: 4.9,
    reviews: 89,
    category: "Mountain",
    amenities: ["Fireplace", "Hot Tub", "Ski-in/Ski-out"],
    maxGuests: 8,
    bedroomCount: 4,
    bathCount: 3,
    instantBook: false,
    superhost: true
  }
];

// Constants
const PROPERTY_CATEGORIES = ['Beach', 'Mountain', 'City', 'Countryside', 'Lake', 'Desert'];
const COMMON_AMENITIES = ['WiFi', 'Pool', 'Kitchen', 'Parking', 'AC', 'Heating', 'Washer', 'Dryer'];

// Helper Functions
const getMonthDays = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getMonthFirstDay = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};
// Filter Modal Component
const FilterModal: React.FC<FilterModalProps> = ({ filters, onFilterUpdate, onClose }) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handlePriceChange = (value: [number, number]) => {
    setLocalFilters(prev => ({ ...prev, priceRange: value }));
  };

  const handleInstantBookToggle = () => {
    setLocalFilters(prev => ({ ...prev, instantBook: !prev.instantBook }));
  };

  const handlePropertyTypeToggle = (type: string) => {
    setLocalFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter(t => t !== type)
        : [...prev.propertyType, type]
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setLocalFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleApplyFilters = () => {
    onFilterUpdate(localFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-emerald-800">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium mb-4">Price Range</h4>
          <input
            type="range"
            min={0}
            max={1000}
            step={50}
            value={localFilters.priceRange[1]}
            onChange={(e) => handlePriceChange([localFilters.priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span>${localFilters.priceRange[0]}</span>
            <span>${localFilters.priceRange[1]}</span>
          </div>
        </div>

        {/* Instant Book */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.instantBook}
              onChange={handleInstantBookToggle}
              className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Instant Book</span>
          </label>
        </div>

        {/* Property Types */}
        <div className="mb-6">
          <h4 className="font-medium mb-4">Property Type</h4>
          <div className="space-y-2">
            {PROPERTY_CATEGORIES.map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.propertyType.includes(type)}
                  onChange={() => handlePropertyTypeToggle(type)}
                  className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h4 className="font-medium mb-4">Amenities</h4>
          <div className="space-y-2">
            {COMMON_AMENITIES.map(amenity => (
              <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyFilters}
          className="w-full py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

// DatePicker Component
const DatePicker: React.FC<DatePickerProps> = ({ selectedDates, onSelectDate, onClose }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const generateCalendarDays = (year: number, month: number): CalendarDay[] => {
    const firstDay = getMonthFirstDay(year, month);
    const daysInMonth = getMonthDays(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const days: CalendarDay[] = [];
    
    // Add empty days for the start of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: null, isDisabled: true });
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isDisabled: date < today
      });
    }
    
    return days;
  };

  const isDateSelected = (date: Date | null): boolean => {
    if (!date || !selectedDates.length) return false;
    return selectedDates.some(selectedDate => 
      selectedDate.toDateString() === date.toDateString()
    );
  };

  const isDateInRange = (date: Date | null): boolean => {
    if (!date || selectedDates.length !== 2) return false;
    return date > selectedDates[0] && date < selectedDates[1];
  };

  const handleDateClick = (day: CalendarDay) => {
    if (!day.date || day.isDisabled) return;

    let newSelectedDates: Date[];
    if (selectedDates.length === 0 || selectedDates.length === 2) {
      newSelectedDates = [day.date];
    } else {
      const firstDate = selectedDates[0];
      if (day.date < firstDate) {
        newSelectedDates = [day.date, firstDate];
      } else {
        newSelectedDates = [firstDate, day.date];
      }
    }
    onSelectDate(newSelectedDates);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-emerald-800">Select dates</h3>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-emerald-100 rounded-full"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-8">
        {[0, 1].map((monthOffset) => {
          const displayDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + monthOffset
          );
          const days = generateCalendarDays(
            displayDate.getFullYear(),
            displayDate.getMonth()
          );

          return (
            <div key={monthOffset} className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">
                  {monthNames[displayDate.getMonth()]} {displayDate.getFullYear()}
                </span>
                {monthOffset === 0 ? (
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="p-1 hover:bg-emerald-100 rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="p-1 hover:bg-emerald-100 rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-emerald-600">
                    {day}
                  </div>
                ))}
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    disabled={day.isDisabled}
                    className={`
                      h-8 flex items-center justify-center text-sm rounded-full
                      ${!day.date ? 'invisible' : ''}
                      ${day.isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-emerald-100'}
                      ${isDateSelected(day.date) ? 'bg-emerald-600 text-white' : ''}
                      ${isDateInRange(day.date) ? 'bg-emerald-100' : ''}
                    `}
                  >
                    {day.date?.getDate()}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDates.length > 0 && (
        <div className="mt-6 pt-4 border-t border-emerald-100 flex justify-between items-center">
          <div className="text-sm text-emerald-600">
            {selectedDates.length === 2 
              ? `${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`
              : selectedDates[0].toLocaleDateString()
            }
          </div>
          <button
            onClick={() => onSelectDate([])}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-full"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  );
};
// Guest Selector Component
const GuestSelector: React.FC<GuestSelectorProps> = ({ 
  guestCount, 
  onGuestCountChange, 
  maxGuests, 
  onClose 
}) => {
  const updateCount = (type: keyof GuestCount, increment: boolean): void => {
    const newCount = { ...guestCount };
    const currentTotal = guestCount.adults + guestCount.children;
    
    if (increment && currentTotal >= maxGuests && (type === 'adults' || type === 'children')) {
      return;
    }
    
    newCount[type] = increment 
      ? newCount[type] + 1 
      : Math.max(type === 'adults' ? 1 : 0, newCount[type] - 1);
    
    onGuestCountChange(newCount);
  };

  const guestTypes: Array<{
    type: keyof GuestCount;
    label: string;
    subtitle: string;
  }> = [
    { type: 'adults', label: 'Adults', subtitle: 'Ages 13+' },
    { type: 'children', label: 'Children', subtitle: 'Ages 2-12' },
    { type: 'infants', label: 'Infants', subtitle: 'Under 2' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-emerald-800">Guests</h3>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-emerald-100 rounded-full"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {guestTypes.map(({ type, label, subtitle }) => (
        <div key={type} className="flex justify-between items-center py-4 border-b border-emerald-100">
          <div>
            <p className="font-medium text-emerald-800">{label}</p>
            <p className="text-sm text-emerald-600">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateCount(type, false)}
              className="p-2 rounded-full hover:bg-emerald-100 text-emerald-600 disabled:opacity-50"
              disabled={type === 'adults' ? guestCount[type] <= 1 : guestCount[type] <= 0}
            >
              -
            </button>
            <span className="w-6 text-center font-medium">{guestCount[type]}</span>
            <button
              onClick={() => updateCount(type, true)}
              className="p-2 rounded-full hover:bg-emerald-100 text-emerald-600"
              disabled={(guestCount.adults + guestCount.children) >= maxGuests && (type === 'adults' || type === 'children')}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <p className="mt-4 text-sm text-emerald-600">
        Maximum {maxGuests} guests (excluding infants)
      </p>
    </div>
  );
};

// Search Bar Component
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onDateClick,
  onGuestClick,
  dateDisplay,
  guestDisplay,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center justify-between px-6 py-3 rounded-full border border-emerald-200 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center gap-6 text-sm">
        <input
          type="text"
          placeholder="Where to?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none bg-transparent w-32 placeholder-emerald-400"
        />
        <button 
          type="button"
          onClick={onDateClick}
          className="border-l border-emerald-100 pl-6 font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          {dateDisplay}
        </button>
        <button 
          type="button"
          onClick={onGuestClick}
          className="border-l border-emerald-100 pl-6 text-emerald-500 hover:text-emerald-700 flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          {guestDisplay}
        </button>
      </div>
      <button 
        type="submit"
        className="bg-emerald-600 p-2 rounded-full text-white hover:bg-emerald-700 transition-colors"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
};
// Property Card Component
const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const img = new Image();
    img.src = property.image;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
  }, [property.image]);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl bg-white hover:scale-[1.02]">
      <div className="relative aspect-[4/3]">
        {isLoading && (
          <div className="absolute inset-0 bg-emerald-50 animate-pulse" />
        )}
        <img 
          src={property.image} 
          alt={property.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
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
            <h3 className="font-semibold text-lg text-emerald-800 truncate">
              {property.title}
            </h3>
            <div className="flex items-center text-emerald-600 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
          </div>
          <div className="flex items-center bg-emerald-50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-emerald-600 mr-1" />
            <span className="font-medium text-emerald-800">{property.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-emerald-600 mt-2">
          <span>{property.bedroomCount} bed</span>
          <span>•</span>
          <span>{property.bathCount} bath</span>
          <span>•</span>
          <span>Max {property.maxGuests} guests</span>
        </div>

        <div className="flex flex-wrap gap-1 my-2">
          {property.amenities?.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-baseline">
          <span className="text-lg font-semibold text-emerald-800">
            ${property.price}
          </span>
          <span className="text-emerald-600 ml-1">/ night</span>
        </div>

        <div className="mt-1 text-sm text-emerald-600">
          {property.reviews} reviews
        </div>
      </div>
    </div>
  );
};

// Property Grid Component
const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    instantBook: false,
    propertyType: [],
    amenities: []
  });
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);

  useEffect(() => {
    const filtered = properties.filter(property => {
      const matchesPrice = property.price >= filters.priceRange[0] && 
                          property.price <= filters.priceRange[1];
      const matchesInstantBook = !filters.instantBook || property.instantBook;
      const matchesType = filters.propertyType.length === 0 || 
                         filters.propertyType.includes(property.category);
      const matchesAmenities = filters.amenities.length === 0 || 
                              filters.amenities.every(amenity => 
                                property.amenities.includes(amenity));

      return matchesPrice && matchesInstantBook && matchesType && matchesAmenities;
    });

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleFilterUpdate = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-emerald-800">
          Featured Properties
        </h2>
        <button 
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-50"
        >
          <Sliders className="h-4 w-4" />
          Filters
        </button>
      </div>

      {showFilterModal && (
        <FilterModal
          filters={filters}
          onFilterUpdate={handleFilterUpdate}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};
// Main Layout Component
const RentalLayout: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showGuestSelector, setShowGuestSelector] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [guestCount, setGuestCount] = useState<GuestCount>({
    adults: 1,
    children: 0,
    infants: 0
  });
  
  const [properties] = useState<Property[]>(sampleProperties);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedProperties, setSearchedProperties] = useState<Property[]>(properties);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = properties.filter(property => 
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchedProperties(filtered);
    } else {
      setSearchedProperties(properties);
    }
  }, [searchQuery, properties]);

  const handleSearch = (location: string) => {
    setSearchQuery(location);
  };

  const getDateRangeDisplay = (): string => {
    if (selectedDates.length === 0) return 'Select dates';
    if (selectedDates.length === 1) return selectedDates[0].toLocaleDateString();
    return `${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`;
  };

  const getGuestDisplay = (): string => {
    const total = guestCount.adults + guestCount.children;
    const guestText = `${total} guest${total !== 1 ? 's' : ''}`;
    return guestCount.infants > 0 
      ? `${guestText}, ${guestCount.infants} infant${guestCount.infants !== 1 ? 's' : ''}` 
      : guestText;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <nav className="w-full bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full flex items-center justify-between py-4">
            <div className="text-2xl font-bold text-emerald-600 cursor-pointer hover:text-emerald-700 transition-colors">
              StayScape
            </div>
            
            <div className="flex-1 max-w-2xl mx-4 relative">
              <SearchBar
                onSearch={handleSearch}
                onDateClick={() => {
                  setShowDatePicker(true);
                  setShowGuestSelector(false);
                }}
                onGuestClick={() => {
                  setShowGuestSelector(true);
                  setShowDatePicker(false);
                }}
                dateDisplay={getDateRangeDisplay()}
                guestDisplay={getGuestDisplay()}
              />

              {showDatePicker && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50">
                  <DatePicker
                    selectedDates={selectedDates}
                    onSelectDate={setSelectedDates}
                    onClose={() => setShowDatePicker(false)}
                  />
                </div>
              )}

              {showGuestSelector && (
                <div className="absolute top-16 right-0 z-50">
                  <GuestSelector
                    guestCount={guestCount}
                    onGuestCountChange={setGuestCount}
                    maxGuests={16}
                    onClose={() => setShowGuestSelector(false)}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                List your property
              </button>
              <button className="p-2 hover:bg-emerald-50 rounded-full text-emerald-600 transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <PropertyGrid properties={searchedProperties} />
      </main>

      <footer className="bg-white border-t border-emerald-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-emerald-600">
            © 2024 StayScape. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-emerald-600 mb-6">
            We're sorry, but there was an error loading this content.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// App Component
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <RentalLayout />
    </ErrorBoundary>
  );
};

export default App;
