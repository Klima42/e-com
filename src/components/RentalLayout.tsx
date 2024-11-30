import { useState, useEffect, FC } from 'react';
import { 
  Search, 
  Heart, 
  User,
  Menu
} from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-14">
            <span className="text-xl font-bold text-emerald-500">StayScape</span>

            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full px-4 py-1.5 pl-10 rounded-full bg-gray-50 border border-gray-200 text-sm"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
                <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm font-medium text-emerald-500 hover:bg-emerald-50 rounded-full">
                List your property
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-full">
                <User className="h-4 w-4" />
              </button>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <button className="p-1.5 hover:bg-gray-100 rounded-full">
                <Search className="h-4 w-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-full">
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full px-4 py-4">
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {filters.map(filter => (
              <button
                key={filter}
                className="px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-full border border-gray-200 hover:border-gray-300"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filteredProperties.map(property => (
            <div key={property.id} className="bg-white rounded-xl">
              <div className="relative aspect-[4/3]">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white hover:scale-110 transition-transform">
                  <Heart className="h-4 w-4" />
                </button>
                {property.superhost && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-medium rounded-full">
                    Superhost
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3 className="font-medium text-base truncate">
                  {property.title}
                </h3>
                <div className="text-gray-600 text-xs">
                  {property.location}
                </div>

                <div className="flex flex-wrap gap-2 my-1">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span 
                      key={index}
                      className="text-emerald-500 text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="mt-2 flex items-baseline justify-between">
                  <div>
                    <span className="text-base font-medium">
                      ${property.price}
                    </span>
                    <span className="text-gray-600 text-xs ml-1">/ night</span>
                  </div>
                  <span className="text-xs text-emerald-500">
                    {property.reviews} reviews
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-8 py-6 text-xs text-gray-600">
        <div className="w-full px-4">
          <div className="space-y-1">
            <p className="hover:text-gray-900 cursor-pointer">Help Center</p>
            <p className="hover:text-gray-900 cursor-pointer">Support</p>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            © 2024 StayScape. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentalLayout;
