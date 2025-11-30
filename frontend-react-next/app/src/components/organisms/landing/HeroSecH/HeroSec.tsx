"use client";

import HeroLogo from "../../../../components/molecules/HeroLogo/HeroLogo";
import { HeroHeading, HeroSubtitle } from "../../../../../design-system";
import HeroCTAButtons from "../../../../components/molecules/HeroCTAButtons/HeroCTAButtons";
import AutoScrollCarousel from "../../../atoms/AutoScrollCarousel/AutoScrollCarousel";

export default function HeroSec() {
  const slides = [
    { image: "/c1.jpg", title: "Precision Dental Work" },
    { image: "/c2.jpg", title: "Advanced Technology" },
    { image: "/c3.jpg", title: "Quality Assurance" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#151821] via-[#1a1d2e] to-[#252938] overflow-hidden">
      {/* Decorative Dots Pattern - Top Left (hidden on mobile) */}
      <div className="hidden md:block absolute top-8 left-1/4 grid grid-cols-5 gap-2 opacity-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={`dot-tl-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-[#d4a574]"
          />
        ))}
      </div>

      {/* Large Cross - Center Left (hidden on mobile) */}
      <div className="hidden lg:block absolute top-1/4 left-1/4 opacity-15">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="32" y="0" width="16" height="80" fill="#d4a574" />
          <rect x="0" y="32" width="80" height="16" fill="#d4a574" />
        </svg>
      </div>

      {/* Medium Cross - Bottom Center (hidden on mobile) */}
      <div className="hidden lg:block absolute top-1/4 left-1/4 opacity-15">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="32" y="0" width="16" height="80" fill="#d4a574" />
          <rect x="0" y="32" width="80" height="16" fill="#d4a574" />
        </svg>
      </div>

      {/* Small Cross - Top Right (hidden on mobile) */}
      <div className="hidden md:block absolute top-1/3 right-1/3 opacity-10">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="16" y="0" width="8" height="40" fill="#d4a574" />
          <rect x="0" y="16" width="40" height="8" fill="#d4a574" />
        </svg>
      </div>

      {/* Curved Decorative Elements (responsive sizing) */}
      <div className="absolute bottom-0 left-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-[#d4a574]/5 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 md:w-48 md:h-48 rounded-full bg-[#FFD700]/4 blur-3xl"></div>

      {/* Gold Accent Line - Horizontal (hidden on mobile) */}
      <div className="hidden lg:block absolute top-1/2 left-12 w-32 md:w-64 h-0.5 bg-[#d4a574]/30"></div>

      {/* Medical Pattern Background - Subtle */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #d4a574 1px, transparent 1px),
                           radial-gradient(circle at 60% 70%, #d4a574 1px, transparent 1px),
                           radial-gradient(circle at 80% 10%, #d4a574 1px, transparent 1px)`,
            backgroundSize: "100px 100px, 150px 150px, 120px 120px",
          }}
        ></div>
      </div>

      {/* Dental Icons Pattern - Very Subtle */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tooth-pattern"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M100,40 Q90,60 100,80 Q110,60 100,40 M80,100 L90,120 L100,110 L110,120 L120,100"
                fill="none"
                stroke="#d4a574"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tooth-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto h-screen px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-12 h-full gap-6 lg:gap-8 items-center">
          {/* LEFT COLUMN - 60% */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center h-full pt-4 pb-18">
            {/* Logo */}
            <div className="mb-6">
              <HeroLogo
                src="/logo2.svg"
                alt="avantE Dental Lab"
                width={400}
                height={400}
                className="h-24 sm:h-32 w-auto"
                delay={0}
              />
            </div>

            {/* Main Headline */}
            <div className="mb-2">
              <HeroHeading
                primaryText="Egypt's First "
                gradientText="Digital Dental Lab"
                variant="white"
                delay={0.2}
              />
            </div>

            {/* Subheadline */}
            <div className="mb-2">
              <HeroSubtitle
                text="Revolutionizing dental restoration with ExoCAD integration, real-time tracking, and instant online payments"
                variant="white"
              />
            </div>

            {/* Key Feature Badge */}
            <div className="flex justify-center items-center w-full h-16 mt-2 mb-2">
              <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-[#d4a574]/10 to-[#d4a574]/5 border border-[#d4a574]/30 rounded-lg backdrop-blur-sm relative">
                <span className="text-2xl sm:text-4xl">⚡</span>
                <p className="text-[#d4a574] text-sm sm:text-lg md:text-xl font-semibold text-center leading-tight">
                  <span className="hidden sm:inline">
                    The only lab in Egypt with a fully digital workflow
                  </span>
                  <span className="sm:hidden">
                    Egypt&apos;s only fully digital dental lab
                  </span>
                </p>
                <div className="absolute inset-0 bg-[#d4a574]/5 blur-xl rounded-lg -z-10"></div>
              </div>
            </div>

            {/* CTA Buttons */}
            <HeroCTAButtons />
          </div>

          {/* RIGHT COLUMN - 40% */}
          <div className="hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 w-[380px] h-[28rem]">
            {/* Carousel Container - Hidden on mobile */}
            <div className="relative w-full h-full flex items-center justify-end">
              {/* Rectangular container with carousel - Hidden on mobile */}
              <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[380px] h-[28rem] hidden md:block">
                {/* Gold border square */}
                <div className="absolute inset-0">
                  {/* Inner square with carousel */}
                  <div className="w-full h-full overflow-hidden">
                    <AutoScrollCarousel items={slides} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
