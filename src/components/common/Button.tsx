import React from 'react';

/**
 * Button Component - Conversion-Optimized
 * 
 * A sophisticated button system designed to maximize conversions
 * with clear visual hierarchy and psychological triggers.
 * 
 * Features:
 * - Multiple variants for different conversion goals
 * - Micro-interactions that increase perceived value
 * - Loading states to reduce abandonment
 * - Icon support for increased clarity
 * - Premium feel that matches book quality
 */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconPosition = 'left' | 'right';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: IconPosition;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  // Base styles - sophisticated and refined
  const baseStyles = `
    relative
    inline-flex
    items-center
    justify-center
    font-semibold
    transition-all
    duration-300
    ease-out
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    disabled:cursor-not-allowed
    overflow-hidden
    group
  `;

  // Variant styles - each optimized for conversion psychology
  const variants: Record<ButtonVariant, string> = {
    // Primary: High-contrast, irresistible CTA
    primary: `
      bg-gradient-to-r from-amber-600 to-amber-500
      text-white
      shadow-lg
      shadow-amber-500/30
      hover:shadow-xl
      hover:shadow-amber-500/40
      hover:scale-[1.02]
      active:scale-[0.98]
      focus:ring-amber-500
      disabled:from-gray-400
      disabled:to-gray-400
      disabled:shadow-none
      disabled:hover:scale-100
      before:absolute
      before:inset-0
      before:bg-gradient-to-r
      before:from-white/0
      before:via-white/20
      before:to-white/0
      before:translate-x-[-200%]
      before:transition-transform
      before:duration-700
      hover:before:translate-x-[200%]
    `,
    
    // Secondary: Sophisticated choice for alternate actions
    secondary: `
      bg-slate-800
      text-white
      border-2
      border-slate-700
      shadow-md
      hover:bg-slate-700
      hover:border-slate-600
      hover:shadow-lg
      hover:scale-[1.02]
      active:scale-[0.98]
      focus:ring-slate-500
      disabled:bg-slate-300
      disabled:border-slate-300
      disabled:text-slate-500
      disabled:hover:scale-100
    `,
    
    // Outline: Subtle but elegant for low-pressure actions
    outline: `
      bg-transparent
      text-slate-700
      border-2
      border-slate-300
      hover:border-amber-500
      hover:text-amber-600
      hover:bg-amber-50
      active:bg-amber-100
      focus:ring-amber-500
      disabled:text-slate-400
      disabled:border-slate-200
      disabled:hover:bg-transparent
      disabled:hover:border-slate-200
    `,
    
    // Ghost: Minimal friction for exploration
    ghost: `
      bg-transparent
      text-slate-600
      hover:bg-slate-100
      hover:text-slate-900
      active:bg-slate-200
      focus:ring-slate-400
      disabled:text-slate-300
      disabled:hover:bg-transparent
    `,
    
    // Danger: Clear visual warning for destructive actions
    danger: `
      bg-red-600
      text-white
      shadow-md
      shadow-red-600/20
      hover:bg-red-700
      hover:shadow-lg
      hover:shadow-red-600/30
      hover:scale-[1.02]
      active:scale-[0.98]
      focus:ring-red-500
      disabled:bg-red-300
      disabled:shadow-none
      disabled:hover:scale-100
    `,
    
    // Success: Positive reinforcement
    success: `
      bg-green-600
      text-white
      shadow-md
      shadow-green-600/20
      hover:bg-green-700
      hover:shadow-lg
      hover:shadow-green-600/30
      hover:scale-[1.02]
      active:scale-[0.98]
      focus:ring-green-500
      disabled:bg-green-300
      disabled:shadow-none
      disabled:hover:scale-100
    `,
  };

  // Size variants - balanced for readability and touch targets
  const sizes: Record<ButtonSize, string> = {
    xs: 'px-3 py-1.5 text-xs rounded-md gap-1',
    sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
    md: 'px-6 py-3 text-base rounded-lg gap-2',
    lg: 'px-8 py-4 text-lg rounded-xl gap-2.5',
    xl: 'px-10 py-5 text-xl rounded-xl gap-3',
  };

  // Icon sizes matched to button sizes
  const iconSizes: Record<ButtonSize, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className={`animate-spin ${iconSizes[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Loading state */}
      {loading && (
        <span className="mr-2">
          <LoadingSpinner />
        </span>
      )}

      {/* Icon before text */}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={`${iconSizes[size]} transition-transform group-hover:scale-110`} />
      )}

      {/* Button text */}
      <span className="relative z-10">{children}</span>

      {/* Icon after text */}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={`${iconSizes[size]} transition-transform group-hover:scale-110`} />
      )}
    </button>
  );
};

export default Button;