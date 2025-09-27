'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/Button';

interface SignOutButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function SignOutButton({
  children,
  className,
  variant = 'outline',
  size = 'sm',
}: SignOutButtonProps) {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <Button
      onClick={handleSignOut}
      className={className}
      variant={variant}
      size={size}
    >
      {children || 'Sign out'}
    </Button>
  );
}
