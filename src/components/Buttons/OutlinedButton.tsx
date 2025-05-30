import React from "react";

interface OutlinedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "surface" | "warning";
  size?: "sm" | "md" | "lg" | "xl";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  width?: string;
  height?: string;
  className?: string;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
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
    "cursor-pointer font-primary font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-2 bg-transparent flex items-center justify-center";

  const variantClasses = {
    primary:
      "border-primary text-primary hover:bg-primary hover:text-on-primary focus:ring-primary/50",
    secondary:
      "border-secondary text-secondary hover:bg-secondary hover:text-on-secondary focus:ring-secondary/50",
    surface: "text-surface hover:text-surface focus:ring-surface/50",
    warning:
      "border-warning text-warning hover:bg-warning hover:text-background focus:ring-warning/50",
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

export default OutlinedButton;
