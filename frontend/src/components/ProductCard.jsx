import { useState } from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState('yellow');
  const colors = ['yellow', 'white', 'rose'];

  const colorMap = {
    yellow: {
      name: 'Yellow Gold',
      hex: '#E6CA97',
      bg: 'bg-yellow-gold'
    },
    white: {
      name: 'White Gold',
      hex: '#D9D9D9',
      bg: 'bg-white-gold'
    },
    rose: {
      name: 'Rose Gold',
      hex: '#E1A4A9',
      bg: 'bg-rose-gold'
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            size={14}
            fill="#FFA500"
            stroke="#FFA500"
            className="inline"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative inline-block" style={{ width: '14px', height: '14px' }}>
            <Star
              size={14}
              fill="#E5E5E5"
              stroke="#FFA500"
              className="absolute"
            />
            <div className="absolute overflow-hidden" style={{ width: '50%' }}>
              <Star
                size={14}
                fill="#FFA500"
                stroke="#FFA500"
              />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star
            key={i}
            size={14}
            fill="#E5E5E5"
            stroke="#D1D5DB"
            className="inline"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Product Image */}
      <div className="bg-gray-50 rounded-lg mb-4 aspect-square flex items-center justify-center overflow-hidden">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className="w-full h-full object-contain p-6"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-normal text-black">
          {product.name}
        </h3>
        
        <p className="text-sm font-normal text-black">
          ${product.price.toFixed(2)} USD
        </p>

        {/* Color Selector */}
        <div className="flex items-center gap-2 mt-1">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-5 h-5 rounded-full border transition-all ${
                selectedColor === color
                  ? 'border-gray-800 ring-1 ring-offset-1 ring-gray-400'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: colorMap[color].hex }}
              aria-label={`Select ${colorMap[color].name}`}
            />
          ))}
        </div>

        {/* Selected Color Name */}
        <p className="text-xs text-gray-500">
          {colorMap[selectedColor].name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            {renderStars(product.popularityRating)}
          </div>
          <span className="text-xs text-gray-500">
            {product.popularityRating}/5
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;