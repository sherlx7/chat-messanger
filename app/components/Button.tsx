'use client'

import clsx from 'clsx';

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    //syntax:ReactNode is a type in React that represents any valid React component 
    //or value that can be rendered as part of the component's output
    //children prop can accept any valid React node as its value.
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
  }


  const Button: React.FC<ButtonProps> = ({
    type = "button",
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
}) => {
    return(
        <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={clsx(`
          flex 
          justify-center 
          rounded-md 
          px-3
          py-2 
          text-sm 
          font-semibold 
          focus-visible:outline 
          focus-visible:outline-2 
          focus-visible:outline-offset-2 
          `,
          disabled && 'opacity-50 cursor-default',
          fullWidth && 'w-full',
          secondary ? 'text-gray-900' : 'text-white',
          danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
          !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
        )}
        >
            {children}
        </button>
    )
}

export default Button;