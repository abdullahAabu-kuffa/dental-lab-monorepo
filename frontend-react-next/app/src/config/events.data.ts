import { Event } from '../types/components';

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Digital Dentistry Summit',
    description: 'Discover innovations transforming the dental industry from experts worldwide.',
    date: 'Dec 15, 2025',
    image: 'https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Summit',
    speaker: {
      name: '',
      title: 'Digital Dentistry Specialist',
      photo: ''
    },
    venue: 'Medical Center',
    ctaText: 'Reserve Seat →',
    ctaLink: '#'
  },
  {
    id: '2',
    title: 'Hands-On CAD/CAM',
    description: 'Live demonstration and interactive training on digital workflow tools.',
    date: 'Jan 10, 2026',
    image: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Training',
    speaker: {
      name: '',
      title: 'CAD/CAM Expert',
      photo: ''
    },
    venue: 'Dental Hub',
    ctaText: 'Reserve Seat →',
    ctaLink: '#'
  },
  {
    id: '3',
    title: 'Future of Dental Technology',
    description: 'Inspiring talks from thought leaders driving digital transformation.',
    date: 'Feb 22, 2026',
    image: 'https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Conference',
    speaker: {
      name: '',
      title: 'Dental Technology Director',
      photo: ''
    },
    venue: 'Avanté HQ',
    ctaText: 'Reserve Seat →',
    ctaLink: '#'
  }
];