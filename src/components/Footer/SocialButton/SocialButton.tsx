interface SocialButtonProps {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  href,
  children,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-full items-center gap-3 rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/30 lg:h-14 lg:w-auto lg:px-6 lg:py-3 lg:text-base"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm lg:h-8 lg:w-8 lg:text-lg">
        {icon}
      </div>
      {children}
    </a>
  );
};

export default SocialButton;
