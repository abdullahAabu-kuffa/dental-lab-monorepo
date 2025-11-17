'use client';
import React from 'react';
import EducationalResourceCard from '../../../atoms/EducationalResourceCard/EducationalResourceCard';
import Button from '../../../atoms/Button/Button';
import { HeroHeading } from '../../../../../design-system';
import { HeroSubtitle } from '../../../../../design-system';
import { EDUCATIONAL_RESOURCES } from '../../../../config/LandingData/educational-resources.data';
import { componentStyles } from '../../../../../design-system';

const EducationalResourcesSection: React.FC = () => {
  return (
    <section className={`bg-white ${componentStyles.layout.spacingSection}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <HeroHeading
            primaryText=""
            gradientText="Educational Resources"
            variant="black"
          />
          <HeroSubtitle
            text="Stay ahead with our comprehensive guides and learning materials"
            variant="black"
          />
        </div>
        
        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {EDUCATIONAL_RESOURCES.map((resource) => (
            <EducationalResourceCard
              key={resource.id}
              resource={resource}
            />
          ))}
        </div>
        
        {/* View All Resources Button */}
        <div className="text-center">
          <Button variant="primary" onClick={() => window.location.href = '/resources'}>
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EducationalResourcesSection;

