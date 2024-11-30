import { useState, useEffect, FC } from 'react';
import { 
  Search, 
  Heart, 
  User, 
  MapPin, 
  Star, 
  X, 
  Menu,
  Home,
  LucideIcon
} from 'lucide-react';

// ... (keeping all interfaces the same)

const StayScape: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);

  useEffect(() => {
    const filtered = sampleProperties.filter(property => 
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchQuery]);

  const filters = ['Beach', 'Mountain', 'City', 'Lake', 'Countryside', 'Desert'];
  const mobileNavItems: NavItem[] = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Search' },
    { icon: Heart, label: 'Saved' },
    { icon: User, label: 'Profile' }
  ];

  // Mobile menu component
  const MobileMenu = () => (
    <div className={`
      fixed inset-0 bg-white z-50 transform transition-transform duration-300
      ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
    `}>
      <div className="p-4">
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="p-2 hover:bg-emerald-50 rounded-full"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>
        <nav className="mt-8 space-y-4">
          {mobileNavItems.map(({ icon: Icon, label }) => (
            <button 
              key={label}
              className="w-full p-4 text-left hover:bg-emerald-50 rounded-lg flex items-center gap-3"
            >
              <Icon className="h-5 w-5 text-emerald-600" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  // Mobile search component
  const MobileSearch = () => (
    <div className={`
      fixed inset-0 bg-white z-40 transform transition-transform duration-300
      ${isMobileSearch ? 'translate-y-0' : '-translate-y-full'}
    `}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setIsMobileSearch(false)}
            className="p-2 hover:bg-emerald-50 rounded-full"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
          <span className="font-medium">Search</span>
        </div>
        <input
          type="text"
          placeholder="Where to?"
          className="w-full p-4 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-30 bg-white border-b border-emerald-100">
        <div className="max-w-[2000px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold text-emerald-600">StayScape</span>

            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full px-6 py-2 rounded-full border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full">
                List your property
              </button>
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <User className="h-5 w-5 text-emerald-600" />
              </button>
            </div>

            <div className="flex md:hidden items-center gap-4">
              <button 
                onClick={() => setIsMobileSearch(true)}
                className="p-2 hover:bg-emerald-50 rounded-full"
              >
                <Search className="h-5 w-5 text-emerald-600" />
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 hover:bg-emerald-50 rounded-full"
              >
                <Menu className="h-5 w-5 text-emerald-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Components */}
      <MobileMenu />
      <MobileSearch />

      <main className="max-w-[2000px] mx-auto px-4 py-6">
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {filters.map(filter => (
              <button
                key={filter}
                className="px-4 py-2 text-sm whitespace-nowrap rounded-full border border-emerald-200 hover:border-emerald-300"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-emerald-100 mt-12">
        <div className="max-w-[2000px] mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Footer content remains the same */}
          </div>
          <div className="mt-8 pt-8 border-t border-emerald-100 text-center text-sm text-emerald-600">
            © 2024 StayScape. All rights reserved.
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 md:hidden">
        <div className="grid grid-cols-4 py-2">
          {mobileNavItems.map(({ icon: Icon, label }) => (
            <button key={label} className="flex flex-col items-center p-2">
              <Icon className="h-6 w-6 text-emerald-600" />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StayScape;
