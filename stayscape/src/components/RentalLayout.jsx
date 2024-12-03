import React, { useState, useEffect } from "react";
import { Search, User, Menu } from "lucide-react";
import DatePicker from "./DatePicker.jsx";
import GuestSelector from "./GuestSelector.jsx";
import FilterModal from "./FilterModal.jsx";
import PropertyCard from "./PropertyCard.jsx";

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleFilter = (filters) => {
    const filtered = sampleProperties.filter(property => 
      property.price >= filters.priceRange[0] &&
      property.price <= filters.priceRange[1] &&
      property.bedroomCount >= filters.bedrooms &&
      property.bathCount >= filters.bathrooms &&
      (filters.propertyTypes.length === 0 || filters.propertyTypes.includes(property.type))
    );
    setProperties(filtered);
    setIsFilterModalOpen(false);
  };

  useEffect(() => {
    const filtered = sampleProperties.filter(property => 
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProperties(filtered);
  }, [searchQuery]);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
      <nav className="sticky top-0 z-30 bg-indigo-700 border-b border-indigo-800 w-full">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold text-white">StayScape</span>
            
            <div className="hidden md:flex flex-1 mx-4 items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-2 pl-12 rounded-full border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <Search className="absolute left-4 top-2.5 h-5 w-5 text-indigo-500" />
              </div>
              <DatePicker onChange={setDateRange} />
              <GuestSelector onChange={setGuestCounts} />
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 rounded-full border border-indigo-500"
              >
                Filters
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 rounded-full">
                List your property
              </button>
              <button className="p-2 hover:bg-indigo-600 rounded-full">
                <User className="h-5 w-5 text-white" />
              </button>
            </div>

            <button 
              className="md:hidden p-2 hover:bg-indigo-600 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-white" />
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-indigo-600 p-4">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-2 pl-12 rounded-full border border-indigo-300"
                  />
                  <Search className="absolute left-4 top-2.5 h-5 w-5 text-indigo-500" />
                </div>
                <DatePicker onChange={setDateRange} />
                <GuestSelector onChange={setGuestCounts} />
                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="w-full px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 rounded-full border border-indigo-500"
                >
                  Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="w-full px-4 md:px-8 lg:px-12 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>

      <footer className="w-full bg-indigo-700 text-white py-8">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-indigo-200">
                <li>Help Center</li>
                <li>Safety Information</li>
                <li>Cancellation Options</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-indigo-200">
                <li>Blog</li>
                <li>Forum</li>
                <li>Events</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Hosting</h3>
              <ul className="space-y-2 text-sm text-indigo-200">
                <li>List Your Property</li>
                <li>Host Resources</li>
                <li>Community Forum</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">About</h3>
              <ul className="space-y-2 text-sm text-indigo-200">
                <li>Our Story</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-indigo-600 text-center text-sm text-indigo-200">
            © 2024 StayScape. All rights reserved.
          </div>
        </div>
      </footer>

      {isFilterModalOpen && (
        <FilterModal 
          onFilter={handleFilter} 
          onClose={() => setIsFilterModalOpen(false)}
          isOpen={isFilterModalOpen}
        />
      )}
    </div>
  );
};

export default RentalLayout;