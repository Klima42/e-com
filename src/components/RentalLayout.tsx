import { useState, useEffect, FC, MouseEvent } from 'react';

// SVG Icon Components
const SearchIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const HeartIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const UserIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MenuIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CalendarIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const UsersIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const SlidersIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  </svg>
);

type Property = {
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
};

type FilterState = {
  priceRange: [number, number];
  propertyType: string[];
  instantBook: boolean;
  amenities: string[];
};

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

const propertyTypes = ['Beach', 'Mountain', 'City', 'Lake', 'Countryside', 'Desert'] as const;

const RentalLayout: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    propertyType: [],
    instantBook: false,
    amenities: []
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const toggleFavorite = (propertyId: number, e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setFavorites(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  useEffect(() => {
    let filtered = sampleProperties;

    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      filtered = filtered.filter(property => 
        property.price >= filters.priceRange[0] && 
        property.price <= filters.priceRange[1]
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }

    setFilteredProperties(filtered);
  }, [searchQuery, filters]);

  const PropertyCard: FC<{ property: Property }> = ({ property }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3]">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
          onClick={(e) => toggleFavorite(property.id, e)}
        >
          <div className={favorites.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-600'}>
            <HeartIcon />
          </div>
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
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-emerald-800">
              {property.rating}
            </span>
            <span className="text-sm text-emerald-600">
              ({property.reviews})
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-screen min-h-screen bg-white">
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-100 w-full">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold text-emerald-600">StayScape</span>

            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full px-6 py-2 pl-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={handleSearchChange}
                  value={searchQuery}
                />
                <div className="absolute left-4 top-2.5 h-5 w-5 text-gray-400">
                  <SearchIcon />
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full">
                <CalendarIcon />
                Dates
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full">
                <UsersIcon />
                Guests
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full">
                <SlidersIcon />
                Filters
              </button>
              <button className="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full">
                List your property
              </button>
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <UserIcon />
              </button>
            </div>

            <div className="flex md:hidden items-center gap-4">
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <SearchIcon />
              </button>
              <button className="p-2 hover:bg-emerald-50 rounded-full">
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full px-4 py-6">
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {propertyTypes.map(filter => (
              <button
                key={filter}
                className={`px-4 py-2 text-sm whitespace-nowrap rounded-full border ${
                  filters.propertyType.includes(filter)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFilters(prev => ({
                  ...prev,
                  propertyType: prev.propertyType.includes(filter)
                    ? prev.propertyType.filter(t => t !== filter)
                    : [...prev.propertyType, filter]
                }))}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-emerald-100 mt-12">
        <div className="w-full px-4 py-8">
          <div className="space-y-2 text-sm">
            <p className="text-emerald-600 hover:text-emerald-700 cursor-pointer">Help Center</p>
            <p className="text-emerald-600 hover:text-emerald-700 cursor-pointer">Support</p>
          </div>
          <div className="mt-8 pt-8 border-t border-emerald-100 text-center text-sm text-emerald-600">
            © 2024 StayScape. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentalLayout;
