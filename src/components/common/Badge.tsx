import React from 'react';

/**
 * Badge Component - Conversion-Optimized
 * 
 * A sophisticated badge system designed to create urgency, highlight value,
 * and guide customer attention to key information.
 * 
 * Features:
 * - Multiple variants for different psychological triggers
 * - Animated variants for time-sensitive offers
 * - Icon support for enhanced communication
 * - Subtle animations that attract without overwhelming
 * - Premium aesthetics that elevate product perception
 */

// Type definitions
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'discount' | 'premium' | 'bestseller' | 'new' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ComponentType<{ className?: string }>;
  pulse?: boolean;
  glow?: boolean;
  className?: string;
}

interface DiscountBadgeProps extends Omit<BadgeProps, 'variant' | 'glow' | 'pulse' | 'children'> {
  percentage: number | string;
}

interface PresetBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {}

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  pulse = false,
  glow = false,
  className = '',
  ...props
}: BadgeProps) => {
  // Base styles - refined and attention-grabbing
  const baseStyles = `
    inline-flex
    items-center
    gap-1
    font-semibold
    rounded-full
    transition-all
    duration-300
    whitespace-nowrap
  `;

  // Variant styles - each designed for specific conversion goals
  const variants = {
    // Default: Clean and professional
    default: `
      bg-slate-100
      text-slate-700
      border
      border-slate-200
    `,
    
    // Primary: Main value proposition highlighter
    primary: `
      bg-gradient-to-r
      from-amber-500
      to-amber-600
      text-white
      shadow-md
      shadow-amber-500/30
    `,
    
    // Success: Positive indicators (in stock, verified, etc.)
    success: `
      bg-gradient-to-r
      from-emerald-500
      to-emerald-600
      text-white
      shadow-md
      shadow-emerald-500/20
    `,
    
    // Warning: Urgency creator (limited stock, ending soon)
    warning: `
      bg-gradient-to-r
      from-orange-500
      to-orange-600
      text-white
      shadow-md
      shadow-orange-500/30
      animate-pulse-subtle
    `,
    
    // Danger: Scarcity indicator (last copy, selling fast)
    danger: `
      bg-gradient-to-r
      from-red-500
      to-red-600
      text-white
      shadow-md
      shadow-red-500/30
    `,
    
    // Info: Informational (new release, featured)
    info: `
      bg-gradient-to-r
      from-blue-500
      to-blue-600
      text-white
      shadow-md
      shadow-blue-500/20
    `,
    
    // Discount: Savings highlighter
    discount: `
      bg-gradient-to-r
      from-pink-500
      to-rose-600
      text-white
      shadow-lg
      shadow-pink-500/40
      font-bold
    `,
    
    // Premium: Exclusive or high-value items
    premium: `
      bg-gradient-to-r
      from-purple-600
      via-purple-700
      to-indigo-600
      text-white
      shadow-lg
      shadow-purple-500/30
      border-2
      border-purple-400/30
    `,
    
    // Bestseller: Social proof indicator
    bestseller: `
      bg-gradient-to-r
      from-yellow-400
      to-amber-500
      text-slate-900
      shadow-lg
      shadow-yellow-500/40
      font-bold
    `,
    
    // New: Fresh content indicator
    new: `
      bg-gradient-to-r
      from-cyan-500
      to-teal-600
      text-white
      shadow-md
      shadow-cyan-500/30
    `,
    
    // Outline: Subtle variant for less critical info
    outline: `
      bg-white
      text-slate-700
      border-2
      border-slate-300
      hover:border-amber-500
      hover:text-amber-600
    `,
  };

  // Size variants - optimized for readability
  const sizes = {
    xs: 'px-2 py-0.5 text-[10px] gap-0.5',
    sm: 'px-2.5 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
    xl: 'px-5 py-2.5 text-lg gap-2',
  };

  // Icon sizes matched to badge sizes
  const iconSizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  // Glow effect for high-value badges
  const glowEffect = glow ? `
    animate-glow
    before:absolute
    before:inset-0
    before:rounded-full
    before:blur-md
    before:opacity-50
    before:-z-10
  ` : '';

  // Pulse animation for urgency
  const pulseAnimation = pulse ? 'animate-pulse-slow' : '';

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${glowEffect}
        ${pulseAnimation}
        ${className}
      `}
      {...props}
    >
      {/* Icon */}
      {Icon && (
        <Icon className={`${iconSizes[size]} shrink-0`} />
      )}

      {/* Badge text */}
      <span className="relative z-10 leading-none">
        {children}
      </span>
    </span>
  );
};

// Preset badge components for common use cases
// These make it easier to maintain consistency across the app

export const DiscountBadge = ({ percentage, ...props }: DiscountBadgeProps) => (
  <Badge variant="discount" glow pulse {...props}>
    -{percentage}%
  </Badge>
);

export const BestsellerBadge = ({ ...props }: PresetBadgeProps) => (
  <Badge variant="bestseller" {...props}>
    ⭐ Bestseller
  </Badge>
);

export const NewBadge = ({ ...props }: PresetBadgeProps) => (
  <Badge variant="new" {...props}>
    ✨ New
  </Badge>
);

export const LimitedBadge = ({ ...props }: PresetBadgeProps) => (
  <Badge variant="danger" pulse {...props}>
    🔥 Limited Stock
  </Badge>
);

export const FeaturedBadge = ({ ...props }: PresetBadgeProps) => (
  <Badge variant="premium" glow {...props}>
    👑 Featured
  </Badge>
);

export const FreeBadge = ({ ...props }: PresetBadgeProps) => (
  <Badge variant="success" {...props}>
    FREE
  </Badge>
);

export default Badge;