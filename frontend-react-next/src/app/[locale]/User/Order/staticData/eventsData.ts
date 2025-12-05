import { Event } from '@/types';

export const staticEvents: Event[] = [
  {
    id: '1',
    title: 'Advanced Dental Materials Workshop',
    date: '2024-12-15',
    description: 'Learn about the latest innovations in dental materials and their applications in modern dentistry. This workshop covers zirconia, emax, and hybrid ceramics.',
    image: '/c1.jpg',
    category: 'Workshop',
    speaker: {
      name: 'Dr. Sarah Johnson',
      title: 'Prosthodontist',
      photo: '/logo2.svg'
    },
    venue: 'Avanté Dental Lab - Main Conference Hall',
    ctaText: 'Register Now',
    ctaLink: '/register'
  },
  {
    id: '2',
    title: 'Digital Dentistry Symposium',
    date: '2024-12-20',
    description: 'Explore cutting-edge digital technologies transforming dental practices. Featuring CAD/CAM, 3D printing, and AI-powered diagnostic tools.',
    image: '/c2.jpg',
    category: 'Symposium',
    speaker: {
      name: 'Dr. Michael Chen',
      title: 'Digital Dentistry Expert',
      photo: '/logo3.svg'
    },
    venue: 'Tech Innovation Center',
    ctaText: 'Learn More',
    ctaLink: '/symposium'
  },
  {
    id: '3',
    title: 'Implant Restoration Masterclass',
    date: '2024-12-25',
    description: 'Comprehensive training on implant restoration techniques, from single crowns to full arch reconstructions. Hands-on sessions included.',
    image: '/c3.jpg',
    category: 'Masterclass',
    speaker: {
      name: 'Dr. Elena Rodriguez',
      title: 'Implant Specialist',
      photo: '/Logo.svg'
    },
    venue: 'Advanced Training Facility',
    ctaText: 'Book Seat',
    ctaLink: '/masterclass'
  }
];