'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import HeroHeading from '@/app/design-system/components/HeroHeading';
import HeroSubtitle from '@/app/design-system/components/HeroSubtitle';


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full h-96 relative overflow-hidden mt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/caseback.jpg"
            alt="Dental Laboratory"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-[#1C1C1C]/80"></div>
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <HeroHeading
            primaryText="About"
            gradientText=" Us"
            variant="white"
            className="mb-2! drop-shadow-lg"
          />
          <HeroSubtitle
            text="Egypt's first fully digital dental laboratory, revolutionizing dental restorations with advanced ExoCAD integration, real-time tracking, and seamless online services."
            variant="white"
            className="mb-2! text-3xl! drop-shadow-md"
            delay={0.3}
          />
          <motion.div 
            className="w-32 h-32 mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
        
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <h3 
                className="text-4xl font-bold text-black font-serif tracking-tight mb-6"
              >
                Who We Are
              </h3>
              <p 
                className="text-lg leading-snug text-[#4A4A4A] font-sans mb-6"
              >
                We are Egypt&apos;s first fully digital dental laboratory, combining expert craftsmanship with cutting-edge digital technologies. Our team of highly skilled technicians uses ExoCAD and CAD/CAM systems to deliver flawless dental restorations with unmatched precision and speed.
              </p>

              <h3 
               className="text-4xl font-bold text-black font-serif tracking-tight mb-6"
              >
                What Makes Us Unique
              </h3>
              <p 
                className="text-lg leading-snug text-[#4A4A4A] font-sans mb-6"
              >
                Our digital workflow allows you to easily choose services and materials and track every stage of your case online. From upload to delivery, we ensure full transparency, efficiency, and peace of mind for dental professionals.
              </p>

              <h3 
               className="text-4xl font-bold text-black font-serif tracking-tight mb-6"
              >
                Educational Resources
              </h3>
              <p 
                className="text-lg leading-snug text-[#4A4A4A] font-sans mb-6"
              >
                We provide comprehensive guides, workshops, and tutorials on ExoCAD best practices, digital implant planning, and material selection — helping dental professionals stay ahead in their practice.
              </p>
            </div>
            
            <div className="flex justify-center items-start">
              <Image 
                src="/aboutUspic.jpg"
                alt="Dental Lab"
                width={500}
                height={400}
                className="w-full h-auto rounded-xl shadow-lg sticky top-8"
                priority
              />
            </div>
          </section>
          
          {/* Call to Action - Full Width */}
          <div className="mt-12 text-center">
            <p 
              className="text-2xl font-semibold text-[#E4B441] font-serif"
            >
              Partner with us and experience seamless digital dentistry — where technology, craftsmanship, and professional support come together.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
