/**
 * Process Helper Utilities
 * Provides utility functions for process step status handling
 */

/**
 * Returns the background color class based on process step status
 * @param status - The status of the process step ('completed', 'active', 'pending')
 * @returns Tailwind CSS background color class
 */
export const getStatusColor = (status: 'completed' | 'active' | 'pending'): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'active':
      return 'bg-blue-500';
    case 'pending':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

/**
 * Returns the badge color classes based on process step status
 * @param status - The status of the process step ('completed', 'active', 'pending')
 * @returns Tailwind CSS badge color classes (background, text, border)
 */
export const getStatusBadgeColor = (status: 'completed' | 'active' | 'pending'): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-600 border-green-200';
    case 'active':
      return 'bg-blue-100 text-blue-600 border-blue-200';
    case 'pending':
      return 'bg-gray-100 text-gray-600 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

/**
 * Returns the text color class based on process step status
 * @param status - The status of the process step ('completed', 'active', 'pending')
 * @returns Tailwind CSS text color class
 */
export const getStatusTextColor = (status: 'completed' | 'active' | 'pending'): string => {
  switch (status) {
    case 'completed':
      return 'text-green-600';
    case 'active':
      return 'text-blue-600';
    case 'pending':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};
