'use client';
import React from 'react';
import EducationalResourceCard from '../../../atoms/EducationalResourceCard';
import Button from '../../../atoms/Button/Button';
import HeroHeading from '../../../molecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../../molecules/HeroSubtitle/HeroSubtitle';
import { EDUCATIONAL_RESOURCES } from '../../../../config/educational-resources.data';
import { typography, componentStyles } from '../../../../../design-system';

const EducationalResourcesSection: React.FC = () => {
  return (
    <section className={`${componentStyles.background.sectionWhite} ${componentStyles.layout.spacingSection}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <HeroHeading
            primaryText=""
            gradientText="Educational Resources"
            gradientColors="linear-gradient(to right, #4A90E2, #357ABD, #2E5B8C)"
          />
          <HeroSubtitle
            text="Stay ahead with our comprehensive guides and learning materials"
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
