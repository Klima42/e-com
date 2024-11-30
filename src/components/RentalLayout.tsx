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
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold text-emerald-500">StayScape</span>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full px-6 py-2 pl-12 rounded-full bg-gray-50 border border-gray-200"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
                <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-emerald-500 hover:bg-emerald-50 rounded-full">
                List your property
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User className="h-5 w-5" />
              </button>
            </div>

            <div className="flex md:hidden items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full px-6 py-6">
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {filters.map(filter => (
              <button
                key={filter}
                className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full border border-gray-200 hover:border-gray-300"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredProperties.map(property => (
            <div key={property.id} className="bg-white rounded-xl">
              <div className="relative aspect-[4/3]">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white hover:scale-110 transition-transform">
                  <Heart className="h-5 w-5" />
                </button>
                {property.superhost && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                    Superhost
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">
                  {property.title}
                </h3>
                <div className="text-gray-600 text-sm">
                  {property.location}
                </div>

                <div className="flex flex-wrap gap-2 my-2">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-emerald-500 text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-semibold">
                      ${property.price}
                    </span>
                    <span className="text-gray-600 ml-1">/ night</span>
                  </div>
                  <span className="text-sm text-emerald-500">
                    {property.reviews} reviews
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-12 py-8 text-sm text-gray-600">
        <div className="w-full px-6">
          <div className="space-y-2">
            <p className="hover:text-gray-900 cursor-pointer">Help Center</p>
            <p className="hover:text-gray-900 cursor-pointer">Support</p>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            © 2024 StayScape. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentalLayout;
