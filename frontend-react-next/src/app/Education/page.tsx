'use client';

import { useState } from 'react';

import ArticleModal from './ArticleModal';
import { EducationalResource } from '@/config/LandingData/educational-resources.data';
import HeroHeading from '../design-system/components/HeroHeading';
import HeroSubtitle from '../design-system/components/HeroSubtitle';
import EducationalCarousel from '../../components/atoms/EducationalCarousel/EducationalCarousel';

export default function Education() {
  const [selectedArticle, setSelectedArticle] = useState<EducationalResource | null>(null);

  const handleReadMore = (article: EducationalResource) => {
    setSelectedArticle(article);
  };

  const resources: EducationalResource[] = [
    {
      id: '1',
      title: "Emergency Dental Care: What to Do in a Dental Crisis",
      description:
        "Learn how to handle dental emergencies effectively. From knocked-out teeth to severe toothaches, discover immediate steps to take and when to seek professional help.",
      image:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
      category: "Emergency Care",
      readTime: "5 min read",
      difficulty: "Beginner",
      readMoreLink: "#emergency-care"
    },
    {
      id: '2',
      title: "Dental Implants: The Permanent Solution to Missing Teeth",
      description:
        "Explore the benefits of dental implants as a long-lasting solution for missing teeth. Understand the procedure, recovery time, and why implants are superior to other options.",
      image:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
      category: "Implants",
      readTime: "8 min read",
      difficulty: "Advanced",
      readMoreLink: "#dental-implants"
    },
    {
      id: '3',
      title: "Teeth Whitening: Everything You Need to Know",
      description:
        "Discover professional teeth whitening options and home remedies. Learn about safety, effectiveness, and how to maintain your bright smile for longer.",
      image:
        "https://images.unsplash.com/photo-1609840112855-9ab5ad8f66e4?w=400&h=300&fit=crop",
      category: "Cosmetic",
      readTime: "6 min read",
      difficulty: "Beginner",
      readMoreLink: "#teeth-whitening"
    },
    {
      id: '4',
      title: "Cosmetic Dentistry: Transforming Smiles with Modern Techniques",
      description:
        "Explore cutting-edge cosmetic dentistry procedures that can transform your smile. From veneers to bonding, learn which treatment is right for you.",
      image:
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop",
      category: "Cosmetic",
      readTime: "7 min read",
      difficulty: "Intermediate",
      readMoreLink: "#cosmetic-dentistry"
    },
    {
      id: '5',
      title: "Understanding Tooth Sensitivity: Causes and Solutions",
      description:
        "Find out what causes tooth sensitivity and how to treat it. Learn about effective treatments and lifestyle changes that can provide relief.",
      image:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop",
      category: "Dental Health",
      readTime: "5 min read",
      difficulty: "Beginner",
      readMoreLink: "#tooth-sensitivity"
    },
    {
      id: '6',
      title: "The Benefits of Regular Dental Checkups",
      description:
        "Understand why regular dental visits are crucial for maintaining oral health. Learn what happens during checkups and how they prevent serious problems.",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop",
      category: "Prevention",
      readTime: "4 min read",
      difficulty: "Beginner",
      readMoreLink: "#regular-checkups"
    },
 
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-10">
        {/* Header Section */}
        <div 
          className="relative bg-cover bg-center bg-no-repeat py-4"
        
        >
         
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <HeroHeading
              primaryText="Educational"
              gradientText=" Resources"
              variant="black"
              className="!mb-4 drop-shadow-lg"
            />
            <HeroSubtitle 
              variant="black"
              className="!mb-8 drop-shadow-md max-w-2xl mx-auto"
            >
              Expert insights and tips for maintaining your oral health
            </HeroSubtitle>
            <div className="flex justify-center">
          
            </div>
          </div>
        </div>

        {/* Articles Carousel */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <EducationalCarousel 
            items={resources}
            onReadMore={handleReadMore}
            speed={10000}
          />
        </div>
      </main>


      <ArticleModal
        resource={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}

