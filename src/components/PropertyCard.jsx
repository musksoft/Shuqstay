import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";
import { assets } from "../assets/assets.js";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Wifi,
  Car,
  Dumbbell,
  Shield,
  Pencil,
  Trash2,
} from "lucide-react";
import PropertyModal from "./PropertyModal.jsx";



const icons = { WiFi: Wifi, Parking: Car, Gym: Dumbbell, Security: Shield };

export default function PropertyCard({ property = {}, onEdit, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLandlord, setIsLandlord] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      const user = stored && JSON.parse(stored);
      if (user?.role === "landlord") {
        setIsLandlord(true);
      }
    } catch (error) {
      console.error("Error reading user from localStorage:", error);
    }
  }, []);

  const {
    title = "No title",
    location = "No location",
    price = 0,
    bedrooms = 0,
    bathrooms = 0,
    area = 0,
    amenities = [],
    featured = false,
    image = assets,
  } = property;

  useEffect(() => {
  console.log("Property data:", property);
}, [property]);


  return (
    <>
      <div className="relative">
        {/* CARD */}
        <Card className="max-w-xs overflow-hidden border-2 border-brown rounded-tl-[4rem] relative">
 
          {/* Image + featured badge */}
          <div className="relative">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            {featured && (
              <Badge className="absolute top-4 left-5">Featured</Badge>
            )}
          </div>

          {/* Card Content */}
          <CardContent>
           <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
  <div className="flex items-center">
    <MapPin className="w-4 h-4 mr-1" />
    {location}
  </div>

  {isLandlord && (
    <div className="flex space-x-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={onEdit}
        className="text-green-600 hover:bg-green-100 p-1"
      >
        <Pencil size={16} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onDelete}
        className="text-red-600 hover:bg-red-100 p-1"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  )}
</div>

            <h3 className="font-semibold mb-1">{title}</h3>

            <p className="text-xl font-bold mb-2">
              ${price.toLocaleString()}{" "}
              <span className="text-sm text-gray-500"> KD/month</span>
            </p>

            <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {bedrooms}
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                {bathrooms}
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                {area} sqft
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {amenities.slice(0, 3).map((a) => {
                const Icon = icons[a] || Square;
                return (
                  <Badge
                    key={a}
                    variant="secondary"
                    className="text-xs flex items-center gap-1"
                  >
                    <Icon className="w-3 h-3" />
                    {a}
                  </Badge>
                );
              })}
              {amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{amenities.length - 3} more
                </Badge>
              )}
            </div>

            <Button
              className="w-full bg-brown mb-2"
              onClick={() => setModalOpen(true)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>

      <PropertyModal
        property={property}
        isOpen={modalOpen}
        onClose={setModalOpen}
      />
    </>
  );
}
