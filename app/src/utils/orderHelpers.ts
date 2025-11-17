/**
 * Order Helper Utilities
 * Provides utility functions for order status handling
 */

/**
 * Returns the background color class based on order status
 * @param status - The status of the order
 * @returns Tailwind CSS background color class
 */
export const getStatusColor = (status: string) => {
  const colors = {
    'Manufacturing': 'bg-orange-500',
    'Design Review': 'bg-purple-500',
    'Quality Check': 'bg-green-500',
    'Completed': 'bg-blue-500',
    'In Progress': 'bg-blue-500',
    'Pending': 'bg-yellow-500',
    'Cancelled': 'bg-red-500'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500';
};

/**
 * Returns the badge color classes based on order status
 * @param status - The status of the order
 * @returns Tailwind CSS badge color classes (background, text, border)
 */
export const getStatusColorClasses = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-600 border-green-200';
    case 'In Progress':
    case 'Manufacturing':
      return 'bg-blue-100 text-blue-600 border-blue-200';
    case 'Pending':
    case 'Design Review':
      return 'bg-yellow-100 text-yellow-600 border-yellow-200';
    case 'Quality Check':
      return 'bg-purple-100 text-purple-600 border-purple-200';
    case 'Cancelled':
      return 'bg-red-100 text-red-600 border-red-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

/**
 * Returns the background color classes based on order status
 * @param status - The status of the order
 * @returns Tailwind CSS background and border color classes
 */
export const getBackgroundColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'border-green-200 bg-green-50';
    case 'In Progress':
    case 'Manufacturing':
      return 'border-blue-200 bg-blue-50';
    case 'Pending':
    case 'Design Review':
      return 'border-yellow-200 bg-yellow-50';
    case 'Quality Check':
      return 'border-purple-200 bg-purple-50';
    case 'Cancelled':
      return 'border-red-200 bg-red-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};
