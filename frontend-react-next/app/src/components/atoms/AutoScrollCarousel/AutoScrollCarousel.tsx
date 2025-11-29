"use client";
import React, { useEffect, useState } from "react";

interface CarouselProps {
  items: { image: string; title: string }[];
  speed?: number;
}

export default function AutoScrollCarousel({ items, speed = 3000 }: CarouselProps) {
  const [index, setIndex] = useState(0);

  // Auto Scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, speed);
    return () => clearInterval(interval);
  }, [items.length, speed]);

  const goToPrevious = () => setIndex((prev) => (prev - 1 + items.length) % items.length);
  const goToNext = () => setIndex((prev) => (prev + 1) % items.length);
  const goToSlide = (slideIndex: number) => setIndex(slideIndex);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-gray-900">
      {items.map((item, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div class="text-gray-400 text-center">
                      <div class="text-6xl mb-4">🦷</div>
                      <p class="text-xl">${item.title}</p>
                      <p class="text-sm mt-2">Dental lab excellence</p>
                    </div>
                  </div>
                `;
              }
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-center">
            <h3 className="text-white font-semibold text-lg">{item.title}</h3>
            <p className="text-white/80 text-sm mt-1">Dental lab excellence</p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
