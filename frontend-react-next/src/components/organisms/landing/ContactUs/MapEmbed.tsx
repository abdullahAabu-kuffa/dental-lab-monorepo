import React from 'react';

interface MapEmbedProps {
  mapUrl: string;
  className?: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({ mapUrl, className = "" }) => {
  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Location"
        sandbox="allow-scripts allow-same-origin allow-presentation"
      ></iframe>
    </div>
  );
};

export default MapEmbed;