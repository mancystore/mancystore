import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-display uppercase tracking-widest text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap select-none';

  const sizeStyles = {
    sm: 'py-2 px-4 text-[11px]',
    md: 'py-3.5 px-6 text-xs',
    lg: 'py-4 px-8 text-sm',
  };

  const variantStyles = {
    primary:
      'bg-[#111111] text-[#F5F4F0] hover:bg-[#2A2A2A] active:bg-[#000000] border border-[#111111]',
    secondary:
      'bg-[#EDEBE6] text-[#111111] hover:bg-[#E2DFD8] active:bg-[#D5D2C9] border border-[#EDEBE6]',
    outline:
      'bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-[#F5F4F0]',
    ghost:
      'bg-transparent text-[#111111] hover:bg-[#111111]/5 border border-transparent',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
