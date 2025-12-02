import { Suspense } from 'react';
import ResetPasswordContent from './reset-password-content';
import Loading from './loading'; // Create this if you don't have it

export const metadata = {
  title: 'Reset Password',
  description: 'Reset your account password',
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
