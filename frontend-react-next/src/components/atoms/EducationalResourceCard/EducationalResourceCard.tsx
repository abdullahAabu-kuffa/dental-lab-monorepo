/* eslint-disable @next/next/no-img-element */
import { ExternalLink } from 'lucide-react';
import { EducationalResource } from '../../../config/LandingData/educational-resources.data';

interface EducationalResourceCardProps {
  resource: EducationalResource;
  onReadMore?: (resource: EducationalResource) => void;
}

const DIFFICULTY_COLORS = {
  Beginner: 'bg-green-100 text-green-600',
  Intermediate: 'bg-yellow-100 text-yellow-600',
  Advanced: 'bg-red-100 text-red-600',
} as const;

export default function EducationalResourceCard({ resource, onReadMore }: EducationalResourceCardProps) {
  const difficultyColor = DIFFICULTY_COLORS[resource.difficulty as keyof typeof DIFFICULTY_COLORS]
    || 'bg-gray-100 text-gray-600';

  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(resource);
    } else if (resource.readMoreLink && resource.readMoreLink !== '#') {
      window.open(resource.readMoreLink, '_blank');
    }
  };

  return (
    <article className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={resource.image}
          alt={resource.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full text-gray-700">
          {resource.category}
        </span>
        
        {/* Title */}
        <h3 className="text-xl font-bold mt-3 mb-2 text-gray-900 line-clamp-2">
          {resource.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {resource.description}
        </p>
        
        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
          <span>{resource.readTime}</span>
          <span className={`px-2 py-1 rounded-full font-medium ${difficultyColor}`}>
            {resource.difficulty}
          </span>
        </div>
        
        {/* Read More Button */}
        <button
          onClick={handleReadMore}
          className="inline-flex items-center gap-1 text-[#E4B441] font-semibold text-sm hover:underline hover:gap-2 transition-all bg-transparent border-0 cursor-pointer p-0"
        >
          Read More
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </article>
  );
}