'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/Button';

interface SignInButtonProps {
  provider?: 'email' | 'github';
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function SignInButton({
  provider = 'email',
  children,
  className,
  variant = 'default',
  size = 'default',
}: SignInButtonProps) {
  const handleSignIn = () => {
    if (provider === 'email') {
      signIn('email');
    } else if (provider === 'github') {
      signIn('github');
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      className={className}
      variant={variant}
      size={size}
    >
      {children || `Sign in with ${provider === 'email' ? 'Email' : 'GitHub'}`}
    </Button>
  );
}
