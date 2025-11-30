import React from 'react';
import { Smile, Award, Sparkles, Heart, Shield, Star } from 'lucide-react';

const DentalIconsBackground: React.FC = () => {
  return (
    <>

      <div className="absolute top-20 left-20 opacity-5">
        <Smile className="w-32 h-32 text-[#D4AF37]" />
      </div>
      <div className="absolute top-40 right-32 opacity-5">
        <Sparkles className="w-24 h-24 text-[#D4AF37]" />
      </div>
      <div className="absolute bottom-32 left-1/4 opacity-5">
        <Shield className="w-28 h-28 text-[#D4AF37]" />
      </div>
      <div className="absolute bottom-20 right-1/3 opacity-5">
        <Heart className="w-20 h-20 text-[#D4AF37]" />
      </div>
      <div className="absolute top-1/2 left-10 opacity-5">
        <Star className="w-16 h-16 text-[#D4AF37]" />
      </div>
      <div className="absolute top-1/3 right-20 opacity-5">
        <Award className="w-24 h-24 text-[#D4AF37]" />
      </div>
    </>
  );
};

export default DentalIconsBackground;