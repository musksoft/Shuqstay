import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Entry from "../components/Entry";
import PropertyCard from "../components/PropertyCard";
import PropertyModal from "../components/PropertyModal";
import RentalRooms from "../components/RentalRooms";
import BrandCarousel from "../components/BrandCarousel";
import MobileApp from "../components/MobileApp";
import { Button } from "../ui/button.jsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select.jsx";
import { SlidersHorizontal } from "lucide-react";
import { assets } from "../assets/assets";

const mockProperties = [
  // your existing mockProperties array
  {
    id: 1,
    title: "Modern Apartment in City Center",
    location: "Downtown",
    price: 1200,
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    amenities: ["WiFi", "Parking"],
    featured: true,
    image: assets.flat_1,
    images: [assets.flat_1, assets.flat_2, assets.flat_3],
  },
  {
    id: 2,
    title: "Cozy Suburban Home",
    location: "Greenwood",
    price: 950,
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    amenities: ["Gym", "Security"],
    featured: false,
    image: assets.flat_2,
    images: [assets.flat_2, assets.flat_1],
  },
  {
    id: 3,
    title: "Flat Home",
    location: "Salmiya",
    price: 950,
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    amenities: ["WiFi", "Security"],
    featured: false,
    image: assets.flat_3,
    images: [assets.flat_3, assets.flat_4],
  },
  {
    id: 4,
    title: "Flat Home",
    location: "Abbassiya",
    price: 950,
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    amenities: ["WiFi", "Security", "Gym", "Parking"],
    featured: false,
    image: assets.flat_4,
    images: [assets.flat_4, assets.flat_3, assets.flat_2],
  },
  {
    id: 5,
    title: "Flat Home",
    location: "Abbassiya",
    price: 950,
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    amenities: ["WiFi", "Security", "Gym", "Parking"],
    featured: true,
    image: assets.flat_5,
    images: [assets.flat_5, assets.flat_3, assets.flat_2],
  },
  {
    id: 6,
    title: "Flat Home",
    location: "Abbassiya",
    price: 950,
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    amenities: ["WiFi", "Security", "Gym", "Parking"],
    featured: true,
    image: assets.flat_6,
    images: [assets.flat_6, assets.flat_3, assets.flat_2],
  },
];

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    priceRange: "any",
    bedrooms: "any",
  });
  const [sortBy, setSortBy] = useState("featured");
  const [user, setUser] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const handleViewMore = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (user.role === "tenant") {
      setActiveTab("rental");
      scrollToTenantSection();
    } else {
      alert("Only tenants can view more property details.");
    }
  };

  const scrollToTenantSection = () => {
    setTimeout(() => {
      const section = document.getElementById("tenant-rentals");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const filteredAndSorted = useMemo(() => {
    const { location, priceRange, bedrooms } = searchFilters;
    let filtered = mockProperties.filter((p) => {
      if (
        location &&
        !p.location.toLowerCase().includes(location.toLowerCase())
      )
        return false;
      if (priceRange !== "any") {
        const parts = priceRange
          .split("-")
          .map((str) => parseInt(str.replace("+", "")));
        const [min, max] = parts;
        if (max ? p.price < min || p.price > max : p.price < min) return false;
      }
      if (bedrooms !== "any") {
        const b = parseInt(bedrooms.replace("+", ""));
        if (bedrooms.includes("+") ? p.bedrooms < b : p.bedrooms !== b)
          return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "bedrooms":
          return b.bedrooms - a.bedrooms;
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
      }
    });

    return filtered;
  }, [searchFilters, sortBy]);

  return (
    <>
      <Hero onSearch={handleSearch} />
      <Entry />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-xl">Available Properties</h2>
          <p>{filteredAndSorted.length} found</p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low–High</SelectItem>
                <SelectItem value="price-high">Price: High–Low</SelectItem>
                <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-12">
            <p className="mb-4">No matching properties.</p>
            <Button
              onClick={() =>
                setSearchFilters({
                  location: "",
                  priceRange: "any",
                  bedrooms: "any",
                })
              }
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSorted.map((property) => (
              <div key={property.id} className="flex flex-col gap-2">
                <PropertyCard
                  property={property}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
        
          </div>
        )}
   <div className="w-full flex justify-center">
  <Button
    className="bg-brown text-white px-6 py-2 mt-3 -mb-4 rounded-tl-[1.5rem]"
    onClick={handleViewMore}
  >
    View More
  </Button>
</div>
        {/* Tenant Rentals Section */}
        {user?.role === "tenant" && activeTab === "rental" && (
          <div id="tenant-rentals" className="mt-12">
            <RentalRooms />
          </div>
        )}
      </main>

      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <p className="mb-4">Please log in to view more property details.</p>
            <Button className="bg-brown mr-4" onClick={() => navigate("/login")}>Login</Button>
            <Button className="text-black bg-dark_red"  onClick={() => setShowLoginPrompt(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <MobileApp />
      <BrandCarousel />
    </>
  );
}
