'use client';

// Lighter version for less visual weight
export default function MedicalBackgroundLight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Clean Grid Lines - More subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(163,216,244,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(163,216,244,0.01)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Soft Glow Effects Only */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#A3D8F4]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#F9E7B2]/8 rounded-full blur-3xl" />
    </div>
  );
}