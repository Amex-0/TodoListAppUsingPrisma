"use client"

import React from "react";

type ButtonProps = (React.ButtonHTMLAttributes<any> & { href?: string; as?: 'a' | 'button'; }) & {
  variant?: "primary" | "ghost" | "danger";
};

export default function Button({ children, variant = "primary", className = "", as = 'button', ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded-md font-medium focus:outline-none motion inline-flex items-center justify-center";
  const variants: Record<string, string> = {
    primary: `bg-primary text-white hover:opacity-95`,
    ghost: `bg-transparent text-primary border border-primary hover:bg-primary/5`,
    danger: `bg-danger text-white hover:opacity-95`,
  };
  const disabledClass = props.disabled ? 'opacity-60 pointer-events-none' : '';
  const cls = `${base} ${variants[variant]} ${className} ${disabledClass}`;
  if (as === 'a') {
    const { onClick, ...rest } = props as any;
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a className={cls} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {props.disabled ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
      {children}
    </button>
  );
}
