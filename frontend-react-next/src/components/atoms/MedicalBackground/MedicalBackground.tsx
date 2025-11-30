'use client';

interface CrossIconProps {
  className: string;
}

const CrossIcon = ({ className }: CrossIconProps) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" fill="currentColor">
      <rect x="40" y="0" width="20" height="100"/>
      <rect x="0" y="40" width="100" height="20"/>
    </svg>
  </div>
);

const MedicalIcon = ({ className }: CrossIconProps) => (
  <div className={className}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 8h-3V4H7v4H4c-1.1 0-2 .9-2 2v10h20V10c0-1.1-.9-2-2-2zm0 10H4v-8h3v2h2v-2h6v2h2v-2h3v8z"/>
    </svg>
  </div>
);

const ToothIcon = ({ className }: CrossIconProps) => (
  <div className={className}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9.8 2 8 3.8 8 6v6c0 1.5-.8 2.8-2 3.5v4.5c0 1.1.9 2 2 2h1c.6 0 1-.4 1-1v-3c0-.6.4-1 1-1s1 .4 1 1v3c0 .6.4 1 1 1h1c1.1 0 2-.9 2-2v-4.5c-1.2-.7-2-2-2-3.5V6c0-2.2-1.8-4-4-4z"/>
    </svg>
  </div>
);

export default function MedicalBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Navy Blue Background */}
      <div className="absolute inset-0 bg-[#0E141A]" />
      

      
      {/* Medical Cross Pattern - */}
      <div className="absolute inset-0 opacity-[0.04]">
        <CrossIcon className="absolute top-20 left-16 w-32 h-32 text-white" />
        <CrossIcon className="absolute bottom-28 right-28 w-24 h-24 text-white" />
        <CrossIcon className="absolute top-1/2 right-1/4 w-20 h-20 text-white" />
        <CrossIcon className="absolute bottom-1/2 left-1/3 w-28 h-28 text-white" />
        <CrossIcon className="absolute top-1/3 left-1/2 w-16 h-16 text-white" />
      </div>
      
      {/* Dental/Medical Icons -*/}
      <div className="absolute inset-0 opacity-[0.05]">
        <ToothIcon className="absolute top-1/4 right-20 w-20 h-20 text-[#E4B441] rotate-12" />
        <ToothIcon className="absolute bottom-1/3 left-24 w-16 h-16 text-[#E4B441] -rotate-12" />
        <MedicalIcon className="absolute top-2/3 right-1/3 w-14 h-14 text-white rotate-6" />
        <MedicalIcon className="absolute top-1/3 left-1/4 w-12 h-12 text-white -rotate-6" />
      </div>
      
      {/* Enhanced Grid Lines -*/}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Diagonal Medical Lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E4B441] to-transparent transform rotate-12 origin-top-left" />
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E4B441] to-transparent transform -rotate-12 origin-bottom-right" />
      </div>
    </div>
  );
}