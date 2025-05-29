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
    return <img {...imgProps} alt="test" />;
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
