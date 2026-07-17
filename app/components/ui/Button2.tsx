import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, onClick, className = '', ...props }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-8 py-3
        border border-white
        text-white
        bg-black
        font-medium
        uppercase
        tracking-wider
        transition-all
        duration-300
        hover:bg-gray-50
        hover:text-black
        backdrop-blur-sm
        shadow-lg
        hover:shadow-xl
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
