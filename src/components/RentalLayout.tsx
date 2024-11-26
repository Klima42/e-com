import React, { useState } from 'react';
import { Search, Heart, User, MapPin, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
}

interface DatePickerProps {
  selectedDates: Date[];
  onSelectDate: (dates: Date[]) => void;
  onClose: () => void;
}

interface PropertyCardProps {
  property: Property;
}

interface CalendarDay {
  date: Date | null;
  isDisabled: boolean;
}

// DatePicker Component
const DatePicker: React.FC<DatePickerProps> = ({ selectedDates, onSelectDate, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const days: CalendarDay[] = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ date: null, isDisabled: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isDisabled: date < new Date(new Date().setHours(0, 0, 0, 0)),
      });
    }

    return days;
  };

  const isDateSelected = (date: Date | null): boolean => {
    if (!date) return false;
    return selectedDates.some(selectedDate =>
      selectedDate?.toDateString() === date.toDateString()
    );
  };

  const isDateInRange = (date: Date | null): boolean => {
    if (!date || selectedDates.length !== 2) return false;
    return date > selectedDates[0] && date < selectedDates[1];
  };

  const handleDateClick = (date: Date | null) => {
    if (!date || date.getTime() < new Date().setHours(0, 0, 0, 0)) return;

    if (selectedDates.length === 2 || selectedDates.length === 0) {
      onSelectDate([date]);
    } else {
      if (date < selectedDates[0]) {
        onSelectDate([date, selectedDates[0]]);
      } else {
        onSelectDate([selectedDates[0], date]);
      }
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-xl p-6 w-[680px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-emerald-800">Select dates</h3>
        <button onClick={onClose} className="p-2 hover:bg-emerald-100 rounded-full text-emerald-600">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-6">
        {[0, 1].map((offset) => {
          const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset);
          const days = getDaysInMonth(monthDate);

          return (
            <div key={offset} className="flex-1 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-emerald-800">
                  {monthNames[monthDate.getMonth()]} {monthDate.getFullYear()}
                </span>
                {offset === 0 && (
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-1 hover:bg-emerald-100 rounded-full text-emerald-600"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                {offset === 1 && (
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-1 hover:bg-emerald-100 rounded-full text-emerald-600"
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
                    disabled={day.isDisabled}
                    onClick={() => handleDateClick(day.date)}
                    onMouseEnter={() => setHoverDate(day.date)}
                    onMouseLeave={() => setHoverDate(null)}
                    className={`
                      h-8 flex items-center justify-center text-sm rounded-full transition-all
                      ${!day.date ? 'invisible' : ''}
                      ${day.isDisabled ? 'text-emerald-200 cursor-not-allowed' : 'hover:bg-emerald-100 text-emerald-800'}
                      ${isDateSelected(day.date) ? 'bg-emerald-600 text-white hover:bg-emerald-700' : ''}
                      ${isDateInRange(day.date) ? 'bg-emerald-100 text-emerald-800' : ''}
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
          <div>
            <p className="text-sm text-emerald-600">Selected dates:</p>
            <p className="font-medium text-emerald-800">
              {selectedDates[0]?.toLocaleDateString()} 
              {selectedDates[1] && ` → ${selectedDates[1]?.toLocaleDateString()}`}
            </p>
          </div>
          <button 
            onClick={() => onSelectDate([])}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  );
};

// Property Card Component
const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl bg-white hover:scale-[1.02]">
      <div className="relative aspect-[4/3]">
        <img 
          src={property.image || "/api/placeholder/400/300"} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg text-emerald-800 truncate">{property.title}</h3>
            <div className="flex items-center text-emerald-600 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
          </div>
          <div className="flex items-center bg-emerald-50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-emerald-600 mr-1" />
            <span className="text-emerald-600 text-sm">{property.rating}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-xl text-emerald-800">${property.price} / night</span>
          <button className="bg-emerald-600 text-white rounded-lg px-4 py-2">Book Now</button>
        </div>
      </div>
    </div>
  );
};

// PropertyGrid Component
const PropertyGrid: React.FC<{ properties: Property[] }> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

// Main Layout Component
const RentalLayout: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSelectDate = (dates: Date[]) => {
    setSelectedDates(dates);
    setShowDatePicker(false);
  };

  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
  };

  const properties: Property[] = [
    {
      id: 1,
      price: 250,
      image: "/path/to/image1.jpg",
      title: "Oceanfront Villa",
      location: "Malibu, CA",
      dates: "2024-12-01 to 2024-12-07",
      rating: 4.8,
      reviews: 132,
      category: "villa",
      amenities: ["pool", "wifi", "air conditioning"],
    },
    {
      id: 2,
      price: 150,
      image: "/path/to/image2.jpg",
      title: "Cozy Cottage",
      location: "Lake Tahoe, CA",
      dates: "2024-12-15 to 2024-12-22",
      rating: 4.5,
      reviews: 88,
      category: "cottage",
      amenities: ["fireplace", "kitchen", "wifi"],
    },
    // Add more properties here
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-emerald-800">Find Your Next Getaway</h1>
          <button 
            onClick={() => setShowDatePicker(true)} 
            className="bg-emerald-600 text-white py-2 px-4 rounded-lg"
          >
            Select Dates
          </button>
        </div>

        {showDatePicker && (
          <DatePicker 
            selectedDates={selectedDates} 
            onSelectDate={handleSelectDate} 
            onClose={handleCloseDatePicker} 
          />
        )}

        <PropertyGrid properties={properties} />
      </div>
    </div>
  );
};

export default RentalLayout;
