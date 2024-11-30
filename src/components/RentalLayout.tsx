import { useState, useEffect, FC } from 'react';
import { 
  Search, 
  Heart, 
  User,
  Menu,
  Home,
  LucideIcon
} from 'lucide-react';

// Interfaces
interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  maxGuests: number;
  bedroomCount: number;
  bathCount: number;
  superhost: boolean;
}

interface NavItem {
  icon: LucideIcon;
  label: string;
}

// Sample data
const sampleProperties: Property[] = [
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

const RentalLayout: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties);

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
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <Search className="h-5 w-5 text-emerald-600" />
              </button>
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <Menu className="h-5 w-5 text-emerald-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

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
            <div key={property.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3]">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform">
                  <Heart className="h-5 w-5 text-gray-600" />
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
                    <div className="text-emerald-600 text-sm">
                      {property.location}
                    </div>
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
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-emerald-100 mt-12">
        <div className="max-w-[2000px] mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Help</h3>
              <div className="space-y-2 text-sm">
                <p className="text-emerald-600 hover:text-emerald-700 cursor-pointer">Help Center</p>
                <p className="text-emerald-600 hover:text-emerald-700 cursor-pointer">Support</p>
              </div>
            </div>
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

export default RentalLayout;
