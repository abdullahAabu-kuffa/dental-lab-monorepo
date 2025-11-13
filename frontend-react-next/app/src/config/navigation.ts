export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Orders', href: '/User/Order' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Events', href: '#events' },
  { name: 'Contact', href: '#contact' },
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
      href: '/login',
      variant: 'border'
    },
    register: {
      text: 'Register',
      href: '/register',
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