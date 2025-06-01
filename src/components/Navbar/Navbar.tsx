"use client";
import OutlinedButton from "@/components/Buttons/OutlinedButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { navLinks } from "@/constants/URLs/navLinks";
import { useSmoothScroll } from "@/hooks/scroll/useSmoothScroll";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { handleNavClick } = useSmoothScroll({
    navbarHeight: 80,
    onNavigate: () => setIsMenuOpen(false),
  });

  return (
    <nav className="bg-on-background/80 fixed top-0 right-0 left-0 z-50 backdrop-blur-md lg:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center"
              onClick={(e) => handleNavClick(e, "/")}
            >
              <Image
                src="/logo/logo.svg"
                alt="Paint Logo"
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
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-background hover:text-primary font-primary relative flex items-center font-medium transition-colors duration-200"
                >
                  {link.name}
                  {link.badge && (
                    <span className="bg-primary text-background ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-2 py-1 text-xs leading-none font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
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
              className="text-background hover:text-primary focus:ring-primary/50 rounded-md p-2 transition-colors duration-200 focus:ring-2 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="flex h-6 w-6 flex-col justify-center space-y-1">
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "translate-y-1 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-translate-y-1 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "min-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-on-background/95 border-surface/20 space-y-1 rounded-b-lg border-t px-2 pt-2 pb-6 backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-background hover:text-primary font-primary flex items-center justify-between rounded-md px-3 py-3 font-medium transition-all duration-200"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="bg-primary text-background inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-2 py-1 text-xs leading-none font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <div className="space-y-3 px-3 pt-4">
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
