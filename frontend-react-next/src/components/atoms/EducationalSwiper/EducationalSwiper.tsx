"use client";

import React, { useState, useEffect } from 'react';
import { EducationalResource } from '../../../config/LandingData/educational-resources.data';
import './EducationalSwiper.css';

interface EducationalSwiperProps {
  items: EducationalResource[];
  onReadMore?: (resource: EducationalResource) => void;
}

export default function EducationalSwiper({ items, onReadMore }: EducationalSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateCarousel = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((newIndex + items.length) % items.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const nextSlide = () => updateCarousel(currentIndex + 1);
  const prevSlide = () => updateCarousel(currentIndex - 1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        prevSlide();
      } else if (e.key === 'ArrowDown') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const getCardClass = (index: number) => {
    const offset = (index - currentIndex + items.length) % items.length;
    if (offset === 0) return 'center';
    if (offset === 1) return 'down-1';
    if (offset === 2) return 'down-2';
    if (offset === items.length - 1) return 'up-1';
    if (offset === items.length - 2) return 'up-2';
    return 'hidden';
  };

  return (
    <div className="educational-swiper">
      <div className="carousel-container">
        <div className="carousel-track">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`card ${getCardClass(index)}`}
              onClick={() => updateCarousel(index)}
            >
              <img src={item.image} alt={item.title} />
              <div className="card-overlay">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReadMore?.(item);
                  }}
                  className="read-more-btn"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="nav-arrow up" onClick={prevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
        <button className="nav-arrow down" onClick={nextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => updateCarousel(index)}
          />
        ))}
      </div>

      {/* Member Info */}
      <div className="member-info">
        <div className="member-name">{items[currentIndex]?.title}</div>
        <div className="member-role">{items[currentIndex]?.category}</div>
      </div>
    </div>
  );
}