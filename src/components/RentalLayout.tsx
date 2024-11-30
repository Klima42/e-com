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

// ... (keeping all interfaces and sample data the same)

const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  // ... (keeping PropertyCard component the same)
};

const ResponsiveRentalLayout: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [properties] = useState<Property[]>(sampleProperties);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);

  // ... (keeping state and effects the same)

  const MobileMenu: FC = () => (
    // ... (keeping MobileMenu component the same)
  );

  const MobileSearch: FC = () => (
    // ... (keeping MobileSearch component the same)
  );

  const filters = ['Beach', 'Mountain', 'City', 'Lake', 'Countryside', 'Desert'];
  const footerSections = [
    // ... (keeping footer sections the same)
  ];

  const mobileNavItems = [
    // ... (keeping mobile nav items the same)
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-30 bg-white shadow-sm border-b border-emerald-100">
        <div className="w-[95%] max-w-[2000px] mx-auto">
          {/* ... (keeping nav content the same) */}
        </div>
      </nav>

      <MobileMenu />
      <MobileSearch />

      <main className="flex-grow w-[95%] max-w-[2000px] mx-auto py-6">
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

      <footer className="mt-auto bg-white border-t border-emerald-100 w-full">
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
