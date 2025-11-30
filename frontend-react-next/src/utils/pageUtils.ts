"use client";
import { useRouter } from 'next/navigation';
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

// Re-export animations from the consolidated design system
export { motionVariants as animations } from '@/app/design-system/animations';
