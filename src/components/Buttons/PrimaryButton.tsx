import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "on-surface" | "warning";
  size?: "sm" | "md" | "lg" | "xl";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  width?: string;
  height?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  radius = "md",
  width,
  height = "55px",
  className = "",
  ...props
}) => {
  const baseClasses =
    "cursor-pointer font-primary font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

  const variantClasses = {
    primary:
      "bg-primary text-on-primary hover:bg-primary/90 focus:ring-primary/50 shadow-sm hover:shadow-md",
    secondary:
      "bg-secondary text-on-secondary hover:bg-secondary/90 focus:ring-secondary/50 shadow-sm hover:shadow-md",
    "on-surface":
      "bg-on-surface text-surface hover:bg-on-surface/90 focus:ring-on-surface/50 shadow-sm hover:shadow-md",
    warning:
      "bg-warning text-background hover:bg-warning/90 focus:ring-warning/50 shadow-sm hover:shadow-md",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-7 py-4 text-lg",
    xl: "px-9 py-5 text-xl",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const customStyles = {
    width: width || "auto",
    height: height || "auto",
  };

  return (
    <button
      className={` ${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${radiusClasses[radius]} ${className} `.trim()}
      style={customStyles}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
