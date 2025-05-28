"use client";
import React, { useState } from "react";
import Link from "next/link";
import OutlinedButton from "@/components/Buttons/OutlinedButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Branches", href: "#branches" },
    { name: "Jobs", href: "#jobs", badge: 12 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="PaintSPA Logo"
                width={135}
                height={40}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-on-background hover:text-primary transition-colors duration-200 font-primary font-medium flex items-center"
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full min-w-[20px] h-5">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <OutlinedButton variant="surface" radius="full" height="48px">
              Contact us
            </OutlinedButton>
            <PrimaryButton variant="primary" radius="full" height="48px">
              Join us
            </PrimaryButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-on-background hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-6 space-y-1 bg-background/95 backdrop-blur-sm rounded-b-lg border-t border-surface/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center justify-between px-3 py-3 text-on-background hover:text-primary hover:bg-surface/50 rounded-md transition-all duration-200 font-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full min-w-[20px] h-5">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-4 px-3 space-y-3">
              <OutlinedButton
                variant="primary"
                size="md"
                radius="full"
                width="100%"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact us
              </OutlinedButton>
              <PrimaryButton
                variant="primary"
                size="md"
                radius="full"
                width="100%"
                onClick={() => setIsMenuOpen(false)}
              >
                Join us
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
