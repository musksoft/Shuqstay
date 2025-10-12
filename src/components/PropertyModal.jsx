// components/PropertyModal.jsx
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog.jsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyDetailsTab } from "../tabs/propertydetailstab.jsx";
import { Reviews } from "./Reviews.jsx";
import { ContactAndApplyTab } from "../tabs/ContactAndApply.jsx";

export default function PropertyModal({ property, isOpen, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);

  if (!property) return null;

  const images = property.images && property.images.length > 0
    ? property.images
    : [property.image];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
<DialogContent className="w-full max-w-4xl h-[90vh] overflow-y-auto z-[20] p-6">
  <DialogHeader>
    <DialogTitle>{property.title}</DialogTitle>
  </DialogHeader>

  {/* Image Gallery */}
  <div className="relative mt-4 rounded-lg overflow-hidden">
    <img
      src={images[currentImage]}
      alt={`Property image ${currentImage + 1}`}
      className="w-full h-60 md:h-80 object-cover transition duration-300"
    />

    {images.length > 1 && (
      <>
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </>
    )}

    {property.featured && (
      <Badge className="absolute top-4 left-4 bg-blue-600 text-white">Featured</Badge>
    )}
  </div>

  <Tabs defaultValue="details" className="mt-6">
    <TabsList className="grid grid-cols-3 w-full">
      <TabsTrigger value="details">Property Details</TabsTrigger>
      <TabsTrigger value="reviews">Reviews</TabsTrigger>
      <TabsTrigger value="contact">Contact & Apply</TabsTrigger>
    </TabsList>

    <TabsContent value="details">
      <PropertyDetailsTab property={property} />
    </TabsContent>

    <TabsContent value="reviews">
      <Reviews propertyId={property.id} />
    </TabsContent>

    <TabsContent value="contact">
      <ContactAndApplyTab property={property} />
    </TabsContent>
  </Tabs>
</DialogContent>

    </Dialog>
  );
}
