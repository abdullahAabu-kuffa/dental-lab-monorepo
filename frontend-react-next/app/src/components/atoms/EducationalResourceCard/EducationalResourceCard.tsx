import React from 'react';
import { ExternalLink } from 'lucide-react';
import { EducationalResource } from '../../../config/educational-resources.data';

interface EducationalResourceCardProps {
  resource: EducationalResource;
}

const EducationalResourceCard: React.FC<EducationalResourceCardProps> = ({ resource }) => {
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-600',
      'Intermediate': 'bg-yellow-100 text-yellow-600',
      'Advanced': 'bg-red-100 text-red-600'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-200">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={resource.image} 
          alt={resource.title}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <span className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full text-gray-700">
          {resource.category}
        </span>
        
        {/* Title */}
        <h3 className="text-xl font-bold mt-3 mb-2 text-gray-900">
          {resource.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">
          {resource.description}
        </p>
        
        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
          <span>{resource.readTime}</span>
          <span className={`px-2 py-1 rounded-full ${getDifficultyColor(resource.difficulty)}`}>
            {resource.difficulty}
          </span>
        </div>
        
        {/* Read More Link */}
        <a 
          href={resource.readMoreLink}
          className="text-[#E4B441] font-semibold text-sm hover:underline flex items-center gap-1 w-fit"
        >
          Read More
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default EducationalResourceCard;