import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-[var(--primary)] text-black hover:bg-[var(--primary)]/90 shadow-[0_0_15px_var(--primary-glow)] border-none',
            secondary: 'bg-[var(--surface-highlight)] text-[var(--foreground)] hover:bg-[var(--surface-highlight)]/80 border border-[var(--glass-border)]',
            outline: 'border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 hover:shadow-[0_0_10px_var(--primary-glow)]',
            ghost: 'hover:bg-[var(--surface-highlight)] text-[var(--foreground)] hover:text-[var(--primary)]',
            danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
            glow: 'bg-[var(--secondary)] text-black hover:bg-[var(--secondary)]/90 shadow-[0_0_20px_var(--secondary-glow)]',
        };

        const sizes = {
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 py-2',
            lg: 'h-12 px-8 text-lg',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button };
