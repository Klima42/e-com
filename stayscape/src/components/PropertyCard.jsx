import React from 'react';
import { Heart, Star } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const {
    title,
    type,
    location,
    price,
    rating,
    reviews,
    image,
    superhost
  } = property;

  return (
    <div className="group flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition"
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition">
          <Heart className="h-5 w-5 text-gray-600 hover:text-rose-500 transition" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
          {superhost && (
            <span className="px-2 py-1 text-xs font-medium bg-rose-100 text-rose-600 rounded-full">
              Superhost
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-current text-yellow-400" />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-500">({reviews} reviews)</span>
        </div>

        <div className="mt-auto">
          <p className="text-gray-900">
            <span className="font-medium">${price}</span>
            <span className="text-sm text-gray-500"> / night</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;