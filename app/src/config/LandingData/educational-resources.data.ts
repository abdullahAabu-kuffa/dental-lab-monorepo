// Educational Resources configuration
export interface EducationalResource {
  id: string;
  title: string;
  description: string;
  image: string;
  readMoreLink: string;
  category: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const EDUCATIONAL_RESOURCES: EducationalResource[] = [
  {
    id: '1',
    title: 'Digital Implant Planning',
    description: 'Learn how to create precise surgical guides and achieve predictable implant outcomes with digital workflows.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    readMoreLink: '/resources/digital-implant-planning',
    category: 'Implantology',
    readTime: '15 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '2', 
    title: 'ExoCAD Best Practices',
    description: 'Master ExoCAD software with our expert tips and techniques for designing perfect dental restorations.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    readMoreLink: '/resources/exocad-best-practices',
    category: 'CAD/CAM',
    readTime: '20 min read',
    difficulty: 'Beginner'
  },
  {
    id: '3',
    title: 'Material Selection Guide',
    description: 'Discover which materials work best for different clinical situations and patient requirements.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    readMoreLink: '/resources/material-selection-guide',
    category: 'Materials',
    readTime: '12 min read',
    difficulty: 'Advanced'
  }
];