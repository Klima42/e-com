import { useState, useEffect, FC } from 'react';
import { 
  Search, 
  Heart, 
  User, 
  MapPin, 
  Star, 
  X, 
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
  reviews: number;
  amenities: string[];
  bedroomCount: number;
  bathCount: number;
  maxGuests: number;
  superhost: boolean;
}

interface PropertyCardProps {
  property: Property;
}

const sampleProperties: Property[] = [
  {
    id: 1,
    price: 150,
    image: "/api/placeholder/400/300",
    title: "Cozy Beach House",
    location: "Malibu, California",
    rating: 4.8,
    reviews: 124,
    amenities: ["WiFi", "Pool", "Ocean View"],
    bedroomCount: 3,
    bathCount: 2,
    maxGuests: 6,
    superhost: true
  },
  {
    id: 2,
    price: 200,
    image: "/api/placeholder/400/300",
    title: "Mountain Retreat",
    location: "Aspen, Colorado",
    rating: 4.9,
    reviews: 89,
    amenities: ["Fireplace", "Hot Tub", "Ski-in/Ski-out"],
    bedroomCount: 4,
    bathCount: 3,
    maxGuests: 8,
    superhost: false
  },
  {
    id: 3,
    price: 175,
    image: "/api/placeholder/400/300",
    title: "Downtown Loft",
    location: "New York City",
    rating: 4.7,
    reviews: 156,
    amenities: ["WiFi", "Gym", "Doorman"],
    bedroomCount: 2,
    bathCount: 2,
    maxGuests: 4,
    superhost: true
  },
  {
    id: 4,
    price: 120,
    image: "/api/placeholder/400/300",
    title: "Lakefront Cabin",
    location: "Lake Tahoe",
    rating: 4.6,
    reviews: 78,
    amenities: ["Dock", "Kayaks", "BBQ"],
    bedroomCount: 3,
    bathCount: 2,
    maxGuests: 6,
    superhost: false
  }
];

const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3]">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
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

        <div className="flex flex-wrap gap-2 my-2">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <span className="text-lg font-semibold text-emerald-800">
              ${property.price}
            </span>
            <span className="text-emerald-600 ml-1">/ night</span>
          </div>
          <span className="text-sm text-emerald-600">
            {property.reviews} reviews
          </span>
        </div>
      </div>
    </div>
  );
};

const ResponsiveRentalLayout: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [properties] = useState<Property[]>(sampleProperties);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);

  useEffect(() => {
    const filtered = properties.filter(property => 
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchQuery, properties]);

  const MobileMenu: FC = () => (
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
        <nav className="mt-8 space-y-4">
          <button className="w-full p-4 text-left hover:bg-emerald-50 rounded-lg">
            Home
          </button>
          <button className="w-full p-4 text-left hover:bg-emerald-50 rounded-lg">
            Search
          </button>
          <button className="w-full p-4 text-left hover:bg-emerald-50 rounded-lg">
            Saved
          </button>
          <button className="w-full p-4 text-left hover:bg-emerald-50 rounded-lg">
            List your property
          </button>
        </nav>
      </div>
    </div>
  );

  const MobileSearch: FC = () => (
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
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );

  const filters = ['Beach', 'Mountain', 'City', 'Lake', 'Countryside', 'Desert'];
  const footerSections = [
    {
      title: 'Support',
      links: ['Help Center', 'Safety Information', 'Cancellation Options']
    },
    {
      title: 'Community',
      links: ['Blog', 'Forum', 'Events']
    },
    {
      title: 'Hosting',
      links: ['List Your Property', 'Host Resources', 'Community Forum']
    },
    {
      title: 'About',
      links: ['Our Story', 'Careers', 'Press']
    }
  ];

  const mobileNavItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Search' },
    { icon: Heart, label: 'Saved' },
    { icon: User, label: 'Profile' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <nav className="sticky top-0 z-30 bg-white shadow-sm border-b border-emerald-100 w-full">
        <div className="w-[95%] max-w-[2000px] mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 text-2xl font-bold text-emerald-600">
              StayScape
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full px-6 py-2 rounded-full border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => setSearchQuery(e.target.value)}
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

      <MobileMenu />
      <MobileSearch />

      <main className="w-[95%] max-w-[2000px] mx-auto py-6">
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-emerald-100 mt-16 w-full">
        <div className="w-[95%] max-w-[2000px] mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {footerSections.map(section => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <div className="space-y-2 text-sm">
                  {section.links.map(link => (
                    <p key={link} className="text-emerald-600 hover:text-emerald-700 cursor-pointer">
                      {link}
                    </p>
                  ))}
                </div>
              </div>
            ))}
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

export default ResponsiveRentalLayout;
