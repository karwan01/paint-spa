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
      className="bg-background/20 text-background hover:bg-background/30 flex h-8 w-full items-center gap-3 rounded-full px-4 py-1 text-sm font-medium transition-colors duration-200 lg:h-14 lg:w-auto lg:px-6 lg:py-3 lg:text-base"
    >
      <div className="bg-background flex h-6 w-6 items-center justify-center rounded-full text-sm lg:h-8 lg:w-8 lg:text-lg">
        {icon}
      </div>
      {children}
    </a>
  );
};

export default SocialButton;
