import { Home, Folder, ClipboardList, Database, PlayCircle, Calendar, Mail, Settings, Workflow, Zap, Phone } from 'lucide-react';

export const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
    icon: Home
  },
  {
    label: 'Services',
    href: '/services',
    icon: Folder
  },
  {
    label: 'How It Works',
    href: '/how-it-works',
    icon: ClipboardList
  },
  {
    label: 'Technology',
    href: '/technology',
    icon: Database
  },
  {
    label: 'Videos',
    href: '/videos',
    icon: PlayCircle
  },
  {
    label: 'Events',
    href: '/events',
    icon: Calendar
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: Mail
  },
] as const;

export const LEGACY_NAV_ITEMS = [
  {
    label: 'Services',
    href: '#services',
    icon: Settings
  },
  {
    label: 'Process',
    href: '#process',
    icon: Workflow
  },
  {
    label: 'Workflow',
    href: '#workflow',
    icon: Zap
  },
  {
    label: 'Events',
    href: '#events',
    icon: Calendar
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: Phone
  },
] as const;

export type NavItem = typeof NAV_ITEMS[number];
export type LegacyNavItem = typeof LEGACY_NAV_ITEMS[number];