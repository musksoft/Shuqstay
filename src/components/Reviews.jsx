// components/Reviews.jsx
import { Star } from "lucide-react";

const dummyReviews = [
  {
    id: 1,
    author: "Jane Doe",
    rating: 5,
    comment: "Loved living here! Very quiet and clean.",
  },
  {
    id: 2,
    author: "John Smith",
    rating: 4,
    comment: "Great amenities, but parking could be better.",
  },
];

export function Reviews({ propertyId }) {
  // You can later fetch reviews with propertyId
  const reviews = dummyReviews;

  return (
    <div className="mt-6 space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border p-4 rounded-md bg-muted">
          <div className="flex justify-between mb-1">
            <strong>{review.author}</strong>
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-500" />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews