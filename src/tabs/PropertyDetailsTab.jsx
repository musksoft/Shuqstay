import { MapPin, Bed, Bath, Square, Wifi, Car, Dumbbell, Shield } from "lucide-react";
import { Badge } from "../ui/badge.jsx";

const amenityIcons = {
  WiFi: Wifi,
  Parking: Car,
  Gym: Dumbbell,
  Security: Shield,
};

export function PropertyDetailsTab({ property }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="space-y-4">
        <div>
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location}
          </div>
          <div className="text-primary">
            <span className="text-3xl font-bold">${property.price.toLocaleString()}</span>
            <span className="text-lg text-muted-foreground">/month</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center"><Bed className="h-5 w-5 mr-2" />{property.bedrooms} Bedrooms</div>
          <div className="flex items-center"><Bath className="h-5 w-5 mr-2" />{property.bathrooms} Bathrooms</div>
          <div className="flex items-center"><Square className="h-5 w-5 mr-2" />{property.area} sqft</div>
        </div>

        <div>
          <h4 className="mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity] || Square;
              return (
                <Badge key={amenity} variant="secondary" className="flex items-center space-x-1">
                  <Icon className="h-3 w-3" />
                  <span>{amenity}</span>
                </Badge>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="mb-2">Description</h4>
          <p className="text-muted-foreground leading-relaxed">
            This beautiful {property.bedrooms}-bedroom, {property.bathrooms}-bathroom apartment offers modern living
            in the heart of {property.location}. With {property.area} sqft of thoughtfully designed space,
            this property features contemporary finishes and great amenities.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* <div className="bg-muted rounded-lg p-4">
          <h4 className="mb-3">Property Highlights</h4>
          <ul className="space-y-2 text-sm">
            <li>• Renovated with modern appliances</li>
            <li>• In-unit washer and dryer</li>
            <li>• Hardwood floors</li>
            <li>• Central A/C & heating</li>
            <li>• Close to public transit</li>
            <li>• Pet-friendly</li>
          </ul>
        </div> */}

        {/* <div className="bg-muted rounded-lg p-4">
          <h4 className="mb-3">Lease Terms</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Lease Length:</span><span>12 months</span></div>
            <div className="flex justify-between"><span>Security Deposit:</span><span>${property.price.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Pet Deposit:</span><span>$500</span></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
