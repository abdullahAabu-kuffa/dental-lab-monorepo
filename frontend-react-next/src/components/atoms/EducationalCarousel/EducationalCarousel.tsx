import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EducationalResourceCard from "../EducationalResourceCard/EducationalResourceCard";
import { EducationalResource } from "../../../config/LandingData/educational-resources.data";
interface EducationalCarouselProps {
  items: EducationalResource[];
  speed?: number;
  onReadMore?: (resource: EducationalResource) => void;
}

export default function EducationalCarousel({ items, speed = 500, onReadMore }: EducationalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Auto-scroll (move ONE item only)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, speed);
    return () => clearInterval(interval);
  }, [items.length, speed]);

  // Responsive number of cards
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  // Visible items based on itemsPerView
  const visibleItems = [];
  for (let i = 0; i < itemsPerView; i++) {
    visibleItems.push(items[(currentIndex + i) % items.length]);
  }

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          key={currentIndex}
          initial={{ x: 50, opacity: 0.6 }}    
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1], // cubic-bezier smooth
          }}
        >
          {visibleItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
              <EducationalResourceCard
                resource={item}
                onReadMore={onReadMore || (() => {})}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/95 hover:bg-[#D4AF37] shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/95 hover:bg-[#D4AF37] shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group"
      >
        <ChevronRight className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index 
                ? "w-8 h-3 bg-gradient-to-r from-[#D4AF37] to-[#E4B441] shadow-md" 
                : "w-3 h-3 bg-gray-300 hover:bg-[#D4AF37]/60 hover:scale-110"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
