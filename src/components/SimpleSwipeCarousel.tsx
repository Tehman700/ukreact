import React, { useRef, useState } from "react";

interface SimpleSwipeCarouselProps {
  images: string[];
  altTexts?: string[];
  className?: string;
}

export default function SimpleSwipeCarousel({
  images,
  altTexts = [],
  className = "",
}: SimpleSwipeCarouselProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  if (images.length === 0) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const threshold = 50; // swipe distance in px
    if (touchDeltaX.current > threshold) {
      setCurrent((i) => (i === 0 ? images.length - 1 : i - 1)); // swipe right
    } else if (touchDeltaX.current < -threshold) {
      setCurrent((i) => (i === images.length - 1 ? 0 : i + 1)); // swipe left
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div
      className={`relative w-full max-w-xl mx-auto overflow-hidden rounded-lg ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={altTexts[i] || `Slide ${i + 1}`}
            className="w-full flex-shrink-0 object-cover"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}
