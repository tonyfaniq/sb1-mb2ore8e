import React from 'react';

interface AlertProps {
  variant: 'default' | 'destructive';
  children: React.ReactNode;
  className?: string;
}

export function Alert({ variant, children, className = '' }: AlertProps) {
  const baseClasses = 'p-4 rounded-lg border';
  const variantClasses = {
    default: 'bg-blue-50 border-blue-200 text-blue-700',
    destructive: 'bg-red-50 border-red-200 text-red-700',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}