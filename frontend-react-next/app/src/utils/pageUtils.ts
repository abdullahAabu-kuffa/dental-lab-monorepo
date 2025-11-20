"use client";

import { useRouter } from 'next/navigation';

// Common styling classes that are duplicated across pages
export const commonStyles = {
  background: "bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100",
  container: "max-w-7xl mx-auto",
  card: "bg-white rounded-xl shadow-sm border border-gray-200 p-6",
  button: {
    primary: "px-6 py-3 bg-gradient-to-r from-[#E4B441] to-[#D4A431] text-white font-semibold rounded-lg hover:from-[#FFD700] hover:to-[#E4B441] transition-all transform hover:scale-105 shadow-lg",
    secondary: "px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all",
    outline: "px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
  }
};

// Common hooks for navigation
export const useNavigation = () => {
  const router = useRouter();
  
  return {
    router,
    goBack: () => router.back(),
    navigateTo: (path: string) => router.push(path),
    navigateToForm: () => router.push('/User/Order/Form'),
    navigateToOrdersList: () => router.push('/User/Order/orders-list'),
    navigateToUpload: () => router.push('/User/Order/Upload'),
    navigateToHome: () => router.push('/User/Order')
  };
};

// Common animation configs
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

// Background gradient class
export const BACKGROUND_GRADIENT = "bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100";

// Router hook
export { useRouter } from 'next/navigation';