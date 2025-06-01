export interface NavLink {
  name: string;
  href: string;
  badge?: number;
}

export const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Branches", href: "#branches" },
  { name: "Jobs", href: "#jobs", badge: 12 },
];
