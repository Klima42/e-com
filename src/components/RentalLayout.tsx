import { 
  Search, 
  Heart, 
  User, 
  MapPin, 
  Star, 
  X, 
  Sliders,
  Menu,
  Home
} from 'lucide-react';

interface Property {
  id: number;
  price: number;
  image: string;
  title: string;
  location: string;
  rating: number;
  superhost: boolean;
}

// Sample properties data
const sampleProperties: Property[] = [
  {
    id: 1,
    price: 150,
    image: "/api/placeholder/400/300",
    title: "Cozy Beach House",
    location: "Malibu, California",
    rating: 4.8,
    superhost: true
  },
  {
    id: 2,
    price: 200,
    image: "/api/placeholder/400/300",
    title: "Mountain Retreat",
    location: "Aspen, Colorado",
    rating: 4.9,
    superhost: true
  },
  {
    id: 3,
    price: 175,
    image: "/api/placeholder/400/300",
    title: "Downtown Loft",
    location: "New York City",
    rating: 4.7,
    superhost: false
  },
  {
    id: 4,
    price: 120,
    image: "/api/placeholder/400/300",
    title: "Lakefront Cabin",
    location: "Lake Tahoe",
    rating: 4.6,
    superhost: false
  }
];

// PropertyCard Component
interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl bg-white">
      <div className="relative aspect-[4/3]">
        <img 
          src={property.image} 
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

        <div className="mt-4 flex items-baseline">
          <span className="text-lg font-semibold text-emerald-800">
            ${property.price}
          </span>
          <span className="text-emerald-600 ml-1">/ night</span>
        </div>
      </div>
    </div>
  );
};

const ResponsiveRentalLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [properties] = useState<Property[]>(sampleProperties);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsMobileSearch(false);
  };

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
          <X className="h-6 w-6" />
        </button>
        <div className="mt-8 space-y-6">
          <button className="w-full py-3 text-left px-4 hover:bg-emerald-50 rounded-lg">
            List your property
          </button>
          <button className="w-full py-3 text-left px-4 hover:bg-emerald-50 rounded-lg">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );

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
            <X className="h-6 w-6" />
          </button>
          <span className="font-medium">Search</span>
        </div>
        <input
          type="text"
          placeholder="Where to?"
          className="w-full p-4 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="w-full bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Always visible */}
            <div className="flex-shrink-0 text-2xl font-bold text-emerald-600">
              StayScape
            </div>

            {/* Desktop Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <button 
                onClick={() => setIsMobileSearch(true)}
                className="w-full px-6 py-2 rounded-full border border-emerald-200 text-left text-emerald-600 hover:border-emerald-300"
              >
                Where to?
              </button>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full">
                List your property
              </button>
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <User className="h-5 w-5 text-emerald-600" />
              </button>
            </div>

            {/* Mobile Navigation Controls - Visible only on mobile */}
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

      {/* Mobile Menus */}
      <MobileMenu />
      <MobileSearch />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4">
        <div className="py-6">
          {/* Filters Bar - Responsive */}
          <div className="flex justify-between items-center mb-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {['Beach', 'Mountain', 'City', 'Lake'].map(filter => (
                <button
                  key={filter}
                  className="px-4 py-2 text-sm whitespace-nowrap rounded-full border border-emerald-200 hover:border-emerald-300"
                >
                  {filter}
                </button>
              ))}
            </div>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200">
              <Sliders className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Property Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {properties.map(property => (
              <div key={property.id} className="break-inside-avoid">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer - Responsive */}
      <footer className="bg-white border-t border-emerald-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <p>Help Center</p>
                <p>Safety Information</p>
                <p>Cancellation Options</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <div className="space-y-2 text-sm">
                <p>Blog</p>
                <p>Forum</p>
                <p>Events</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hosting</h3>
              <div className="space-y-2 text-sm">
                <p>List Your Property</p>
                <p>Host Resources</p>
                <p>Community Forum</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <div className="space-y-2 text-sm">
                <p>Our Story</p>
                <p>Careers</p>
                <p>Press</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-emerald-100 text-center text-sm">
            © 2024 StayScape. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation - Fixed at bottom on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 md:hidden">
        <div className="grid grid-cols-4 py-2">
          {[
            { icon: Home, label: 'Home' },
            { icon: Search, label: 'Search' },
            { icon: Heart, label: 'Saved' },
            { icon: User, label: 'Profile' }
          ].map(({ icon: Icon, label }) => (
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

export default ResponsiveRentalLayout;
