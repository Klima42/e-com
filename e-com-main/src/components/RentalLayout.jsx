// RentalLayout.jsx
import React, { useState, useEffect } from 'react';
import { Search, User, Menu, Heart } from 'lucide-react';
import PropertyCard from './PropertyCard';
import DatePicker from './DatePicker';
import GuestSelector from './GuestSelector';
import FilterModal from './FilterModal';

const sampleProperties = [
  {
    id: 1,
    title: "Cozy Beach House",
    type: "House",
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
    type: "Cabin",
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

const RentalLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState(sampleProperties);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFilter = (filters) => {
    const filtered = sampleProperties.filter(property => 
      property.price >= filters.priceRange[0] &&
      property.price <= filters.priceRange[1] &&
      property.bedroomCount >= filters.bedrooms &&
      property.bathCount >= filters.bathrooms &&
      (filters.propertyTypes.length === 0 || filters.propertyTypes.includes(property.type))
    );
    setProperties(filtered);
  };

  useEffect(() => {
    const filtered = sampleProperties.filter(property => 
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProperties(filtered);
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-100 w-full">
        <div className="max-w-[2520px] mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <span className="text-2xl font-bold text-emerald-600">StayScape</span>
            
            <div className="hidden md:flex flex-1 max-w-4xl mx-4 items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-2 pl-12 rounded-full border focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <DatePicker onChange={setDateRange} />
              <GuestSelector onChange={setGuestCounts} />
              <FilterModal onFilter={handleFilter} />
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full">
                List your property
              </button>
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <User className="h-5 w-5 text-emerald-600" />
              </button>
            </div>

            <button 
              className="md:hidden p-2 hover:bg-emerald-50 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-emerald-600" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t p-4">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-2 pl-12 rounded-full border"
                  />
                  <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <DatePicker onChange={setDateRange} />
                <GuestSelector onChange={setGuestCounts} />
                <FilterModal onFilter={handleFilter} />
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-grow w-full max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help Center</li>
                <li>Safety Information</li>
                <li>Cancellation Options</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Blog</li>
                <li>Forum</li>
                <li>Events</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Hosting</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>List Your Property</li>
                <li>Host Resources</li>
                <li>Community Forum</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">About</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Our Story</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            © 2024 StayScape. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentalLayout;
