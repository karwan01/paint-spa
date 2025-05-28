import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "warning";
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
  height,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-display font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-primary text-on-primary hover:bg-primary/90 focus:ring-primary/50 shadow-sm hover:shadow-md",
    secondary:
      "bg-secondary text-on-secondary hover:bg-secondary/90 focus:ring-secondary/50 shadow-sm hover:shadow-md",
    accent:
      "bg-accent text-white hover:bg-accent/90 focus:ring-accent/50 shadow-sm hover:shadow-md",
    warning:
      "bg-warning text-white hover:bg-warning/90 focus:ring-warning/50 shadow-sm hover:shadow-md",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
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
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${radiusClasses[radius]}
        ${className}
      `.trim()}
      style={customStyles}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
