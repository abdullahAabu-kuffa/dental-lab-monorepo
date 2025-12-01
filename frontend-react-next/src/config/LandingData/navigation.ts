export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/aboutUs' },
  { name: 'Order', href: '/User/Order' },
  { name: 'Cases', href: '/cases' },
  { name: 'Education', href: '/Education' },
  // { name: 'Gallery and Videos', href: '/gallery' },
  { name: 'Contact Us', href: '/contact' },
] as const;

export const NAVBAR_CONFIG = {
  logo: {
    src: '/navbarG.svg',
    alt: 'Navbar Logo',

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