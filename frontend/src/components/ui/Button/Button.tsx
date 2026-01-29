import type React from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost';

interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<'button'>>,
        HTMLMotionProps<'button'> {
    variant?: ButtonVariant;
    isLoading?: boolean;
    loadingText?: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary hover:bg-primary/80 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-100 text-primary',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white ',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-black ',
    ghost: 'bg-transparent hover:bg-transparent text-primary',
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    loadingText = 'Chargement...',
    disabled,
    className = '',
    ...props
}) => {
    const baseStyle =
        'cursor-pointer group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out';
    const variantStyle = variantStyles[variant];
    const disabledStyle = 'opacity-50 cursor-not-allowed';

    return (
        <div>
            <motion.button
                disabled={disabled || isLoading}
                className={`${baseStyle} ${variantStyle} ${disabled || isLoading ? disabledStyle : ''} ${className}`}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin"
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
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                )}
                {isLoading ? loadingText : children}
            </motion.button>
        </div>
    );
};
