import React, { useState, useEffect } from "react";
import { Search, User, Menu, X } from "lucide-react";
import DatePicker from "./DatePicker.jsx";
import GuestSelector from "./GuestSelector.jsx";
import FilterModal from "./FilterModal.jsx";
import PropertyCard from "./PropertyCard.jsx";
import AuthSystem from "./AuthSystem.jsx";

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
  // Basic states
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
  
  // Auth states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const filtered = sampleProperties.filter(property => 
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProperties(filtered);
  }, [searchQuery]);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-orange-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-orange-700 w-full">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <span className="text-2xl font-bold text-white">StayScape</span>
            
            {/* Desktop Search Bar and Filters */}
            <div className="hidden md:flex flex-1 mx-4 items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-2 pl-12 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <Search className="absolute left-4 top-2.5 h-5 w-5 text-orange-700" />
              </div>
              <DatePicker onChange={setDateRange} />
              <GuestSelector onChange={setGuestCounts} />
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 rounded-full border border-orange-500"
              >
                Filters
              </button>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 rounded-full">
                List your property
              </button>
              
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="p-2 hover:bg-orange-600 rounded-full flex items-center gap-2">
                    <span className="text-white text-sm">{user?.name || 'User'}</span>
                    <User className="h-5 w-5 text-white" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">My Bookings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">Settings</a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  className="p-2 hover:bg-orange-600 rounded-full"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User className="h-5 w-5 text-white" />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-orange-600 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-orange-600 p-4">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-2 pl-12 rounded-full border border-orange-200"
                  />
                  <Search className="absolute left-4 top-2.5 h-5 w-5 text-orange-700" />
                </div>
                <DatePicker onChange={setDateRange} />
                <GuestSelector onChange={setGuestCounts} />
                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="w-full px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 rounded-full border border-orange-500"
                >
                  Filters
                </button>
                {isAuthenticated ? (
                  <>
                    <div className="text-white px-4 py-2">{user?.name || 'User'}</div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 rounded-full border border-orange-500"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 rounded-full border border-orange-500"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-4 md:px-8 lg:px-12 py-6 bg-orange-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-orange-700 text-white py-8">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>Help Center</li>
                <li>Safety Information</li>
                <li>Cancellation Options</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>Blog</li>
                <li>Forum</li>
                <li>Events</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Hosting</h3>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>List Your Property</li>
                <li>Host Resources</li>
                <li>Community Forum</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">About</h3>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>Our Story</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-orange-600 text-center text-sm text-orange-100">
            © 2024 StayScape. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isFilterModalOpen && (
        <FilterModal 
          onFilter={handleFilter} 
          onClose={() => setIsFilterModalOpen(false)}
          isOpen={isFilterModalOpen}
        />
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsAuthModalOpen(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative">
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-50"
              >
                <X className="h-5 w-5" />
              </button>
              <AuthSystem onAuthSuccess={handleAuthSuccess} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalLayout;