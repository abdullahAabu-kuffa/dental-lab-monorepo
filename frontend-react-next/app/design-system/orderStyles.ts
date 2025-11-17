// app/User/Order/config/orderStyles.ts

// Color palette for order system
export const ORDER_COLORS = {
  // Status colors
  completed: {
    bg: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-500',
    light: 'bg-green-100',
    darkText: 'text-green-700'
  },
  inProgress: {
    bg: 'bg-blue-500',
    text: 'text-white',
    border: 'border-blue-500',
    light: 'bg-blue-100',
    darkText: 'text-blue-700'
  },
  pending: {
    bg: 'bg-orange-500',
    text: 'text-white',
    border: 'border-orange-500',
    light: 'bg-orange-100',
    darkText: 'text-orange-700'
  },
  rejected: {
    bg: 'bg-red-500',
    text: 'text-white',
    border: 'border-red-500',
    light: 'bg-red-100',
    darkText: 'text-red-700'
  },
  waiting: {
    bg: 'bg-gray-400',
    text: 'text-white',
    border: 'border-gray-400',
    light: 'bg-gray-100',
    darkText: 'text-gray-700'
  }
} as const;

// Background gradients
export const ORDER_BACKGROUNDS = {
  ordersList: 'bg-gradient-to-br from-[#2D3748] to-[#1A202C]',
  orderDetails: 'bg-gradient-to-br from-[#3B4B5F] to-[#2C3E50]',
  card: 'bg-white',
  darkCard: 'bg-[#374151]',
  mainPage: 'bg-gray-200'
} as const;

// Common styles for reuse
export const CARD_STYLES = {
  base: 'rounded-xl p-4 transition-all',
  hover: 'hover:shadow-md cursor-pointer',
  selected: 'border-2 border-blue-500 shadow-lg',
  unselected: 'border-2 border-transparent'
} as const;

// Typography styles
export const TEXT_STYLES = {
  heading: 'text-xl font-bold',
  subheading: 'text-lg font-semibold',
  body: 'text-sm',
  label: 'text-xs text-gray-500',
  value: 'text-sm font-semibold text-gray-900',
  price: 'text-sm font-bold text-blue-600'
} as const;