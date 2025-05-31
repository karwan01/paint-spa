import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface ArrowButtonProps {
  direction: "previous" | "next";
  onClick: () => void;
  variant: "mobile" | "desktop";
  position?: "left" | "right";
  className?: string;
}

export default function ArrowButton({
  direction,
  onClick,
  variant,
  position,
  className = "",
}: ArrowButtonProps) {
  const Icon = direction === "previous" ? IoChevronBack : IoChevronForward;

  const baseClasses =
    "group bg-background flex cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-110";

  const variantClasses = {
    mobile: "h-[40px] w-[40px]",
    desktop: "absolute top-1/3 z-20 hidden h-[56px] w-[56px] md:flex",
  };

  const positionClasses = {
    mobile: {
      left: "float-left",
      right: "float-right",
    },
    desktop: {
      left: "left-14",
      right: "right-14",
    },
  };

  const iconSizes = {
    mobile: "h-4 w-4",
    desktop: "h-6 w-6",
  };

  const getPositionClass = () => {
    if (variant === "mobile" && position) {
      return positionClasses.mobile[position];
    }
    if (variant === "desktop" && position) {
      return positionClasses.desktop[position];
    }
    return "";
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${getPositionClass()} ${className}`;

  const ariaLabel = `${direction === "previous" ? "Previous" : "Next"} feedback`;

  return (
    <button onClick={onClick} className={buttonClasses} aria-label={ariaLabel}>
      <Icon className={`text-on-background ${iconSizes[variant]}`} />
    </button>
  );
}
