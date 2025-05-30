import "@testing-library/jest-dom";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // Filter out Next.js specific props that shouldn't be passed to img element
    const nextJsProps = [
      "priority",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader",
      "fill",
      "sizes",
      "onLoad",
      "onLoadingComplete",
      "onError",
    ];

    const imgProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !nextJsProps.includes(key))
    );

    // eslint-disable-next-line @next/next/no-img-element
    return <img {...imgProps} alt={props.alt || ""} />;
  },
}));

// Mock Next.js Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// Mock Button Components
jest.mock("@/components/Buttons/PrimaryButton", () => {
  return function MockPrimaryButton({
    children,
    onClick,
    variant,
    size,
    radius,
    className,
    ...props
  }) {
    return (
      <button
        onClick={onClick}
        data-testid="primary-button"
        data-variant={variant}
        data-size={size}
        data-radius={radius}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  };
});

jest.mock("@/components/Buttons/OutlinedButton", () => {
  return function MockOutlinedButton({
    children,
    onClick,
    variant,
    size,
    radius,
    className,
    ...props
  }) {
    return (
      <button
        onClick={onClick}
        data-testid="outlined-button"
        data-variant={variant}
        data-size={size}
        data-radius={radius}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  };
});
