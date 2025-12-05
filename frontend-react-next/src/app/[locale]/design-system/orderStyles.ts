// app/User/Order/config/orderStyles.ts

// Color palette for order system - Updated with modern gradients
export const ORDER_COLORS = {
  // Status colors with gradients
  completed: {
    bg: 'bg-gradient-to-br from-emerald-500 to-green-600',
    text: 'text-emerald-700',
    textSecondary: 'text-emerald-600',
    border: 'border-emerald-500',
    light: 'bg-emerald-100',
    darkText: 'text-emerald-700',
    ring: 'ring-2 ring-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    card: 'bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300',
    icon: 'bg-gradient-to-br from-emerald-500 to-green-600 text-white'
  },
  inProgress: {
    bg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    text: 'text-blue-700',
    textSecondary: 'text-blue-600',
    border: 'border-blue-500',
    light: 'bg-blue-100',
    darkText: 'text-blue-700',
    ring: 'ring-4 ring-blue-200 animate-pulse',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    dot: 'bg-blue-500 animate-pulse',
    card: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300',
    icon: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
  },
  pending: {
    bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    text: 'text-amber-700',
    textSecondary: 'text-amber-600',
    border: 'border-amber-500',
    light: 'bg-amber-100',
    darkText: 'text-amber-700',
    ring: '',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    card: 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300',
    icon: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
  },
  cancelled: {
    bg: 'bg-gradient-to-br from-red-500 to-rose-600',
    text: 'text-red-700',
    textSecondary: 'text-red-600',
    border: 'border-red-500',
    light: 'bg-red-100',
    darkText: 'text-red-700',
    ring: '',
    badge: 'bg-red-100 text-red-700 border-red-200',
    dot: 'bg-red-500',
    card: 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300',
    icon: 'bg-gradient-to-br from-red-500 to-rose-600 text-white'
  },
  default: {
    bg: 'bg-slate-300',
    text: 'text-slate-400',
    textSecondary: 'text-slate-400',
    border: 'border-slate-300',
    light: 'bg-slate-100',
    darkText: 'text-slate-700',
    ring: '',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
    card: 'bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-300',
    icon: 'bg-slate-100 text-slate-600'
  }
} as const;

// Urgency colors
export const URGENCY_COLORS = {
  High: {
    dot: 'bg-red-500 animate-pulse',
    text: 'text-red-700'
  },
  Medium: {
    dot: 'bg-amber-500',
    text: 'text-amber-700'
  },
  Low: {
    dot: 'bg-emerald-500',
    text: 'text-emerald-700'
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
  selected: 'border-2 border-blue-500',
  unselected: ''
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

// Helper function to get status colors
export const getStatusColors = (status: string) => {
  const normalizedStatus = status.toLowerCase().replace(/ /g, '');
  switch (normalizedStatus) {
    case 'completed':
      return ORDER_COLORS.completed;
    case 'inprogress':
      return ORDER_COLORS.inProgress;
    case 'pending':
      return ORDER_COLORS.pending;
    case 'cancelled':
      return ORDER_COLORS.cancelled;
    default:
      return ORDER_COLORS.default;
  }
};

// Helper function to get urgency colors
export const getUrgencyColors = (urgency: 'High' | 'Medium' | 'Low') => {
  return URGENCY_COLORS[urgency] || URGENCY_COLORS.Low;
};

// Helper function to get progress step colors (for OrderProgress component)
export const getProgressStepColors = (status: string) => {
  switch (status) {
    case 'completed':
      return {
        bg: 'bg-gradient-to-br from-emerald-500 to-green-600',
        text: 'text-emerald-700',
        textSecondary: 'text-emerald-600',
        ring: 'ring-2 ring-emerald-200',
        iconColor: 'text-white'
      };
    case 'active':
      return {
        bg: 'bg-gradient-to-br from-blue-500 to-indigo-600 blur-[0.5px]',
        text: 'text-blue-700',
        textSecondary: 'text-blue-600',
        ring: 'ring-4 ring-blue-200 animate-pulse',
        iconColor: 'text-white'
      };
    default: // pending
      return {
        bg: 'bg-white border-2 border-slate-200',
        text: 'text-slate-400',
        textSecondary: 'text-slate-400',
        ring: '',
        iconColor: 'text-slate-400'
      };
  }
};