export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Orders', href: '/User/Order' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Technology', href: '/technology' },
  { name: 'Videos', href: '/videos' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
] as const;

export const NAVBAR_CONFIG = {
  logo: {
    src: '/gold.svg',
    alt: 'Gold Logo',
    
    width: 'w-55',
    height: 'h-30'
  },
  links: NAV_LINKS,
  authButtons: {
    login: {
      text: 'Login',
      href: '/auth/register',
      variant: 'border'
    },
    register: {
      text: 'Register',
      href: '/auth/register',
      variant: 'solid'
    }
  }
} as const;

export const LEGACY_NAV_ITEMS = [
  {
    label: 'orders and services',
    href: '#services',
    icon: 'Settings'
  },
  {
    label: 'Process',
    href: '#process',
    icon: 'Workflow'
  },
  {
    label: 'Workflow',
    href: '#workflow',
    icon: 'Zap'
  },
  {
    label: 'Events',
    href: '#events',
    icon: 'Calendar'
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: 'Phone'
  },
] as const;