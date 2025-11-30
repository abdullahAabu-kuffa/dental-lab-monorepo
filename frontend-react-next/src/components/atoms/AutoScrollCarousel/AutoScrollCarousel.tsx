/* eslint-disable @next/next/no-img-element */
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

  return (
    <div className="relative w-full h-80 md:h-112 lg:h-128 bg-gray-900 rounded-lg">


      {/* Carousel slides */}
      {items.map((item, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ${
            i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
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
                  <div class="w-full h-full bg-linear-to-br from-gray-800 via-[#1a1d2e] to-gray-900 flex items-center justify-center">
                    <div class="text-center px-8">
                      <div class="text-7xl mb-6 animate-pulse">🦷</div>
                      <p class="text-2xl font-bold text-[#d4a574] mb-2">${item.title}</p>
                      <div class="w-24 h-1 bg-[#d4a574] mx-auto mb-4"></div>
                      <p class="text-gray-400">Dental Lab Excellence</p>
                    </div>
                  </div>
                `;
              }
            }}
          />
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-[#d4a574]/5 to-transparent"></div>
          
          {/* Title section */}
          <div className="absolute bottom-0 left-0 right-0 p-10 bg-linear-to-t from-black/95 via-black/80 to-black/40 z-40">
            <div className="relative">
              <div className="w-20 h-1 bg-[#d4a574] mb-4 shadow-lg"></div>
              <h3 className="text-white font-bold text-3xl mb-3 tracking-wide drop-shadow-lg">{item.title}</h3>
              <p className="text-[#d4a574] text-base uppercase tracking-widest font-semibold drop-shadow-md">
                Premium Dental Solutions
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute top-6 right-6 flex gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full z-30">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              i === index 
                ? "w-10 h-3 bg-[#d4a574]" 
                : "w-4 h-4 bg-white/70 hover:bg-white/90"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
