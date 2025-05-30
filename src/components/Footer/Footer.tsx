"use client";

import Button from "@/components/Buttons/PrimaryButton";
import Image from "next/image";
import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import SocialButton from "./SocialButton/SocialButton";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  const navLinks = [
    { label: "The company", href: "#" },
    { label: "Who are we", href: "#" },
    { label: "Services", href: "#" },
    { label: "Jobs", href: "#", badge: "12" },
    { label: "Branches", href: "#" },
  ];

  const helpLinks = [
    { label: "Help center", href: "#" },
    { label: "Common questions", href: "#" },
    { label: "Contact us", href: "#" },
    { label: "Register as merchant", href: "#" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-primary h-4 w-4" />,
      href: "#",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-primary h-4 w-4" />,
      href: "#",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-primary h-4 w-4" />,
      href: "#",
    },
  ];

  return (
    <footer
      className="bg-primary relative min-h-screen overflow-hidden lg:min-h-[600px]"
      style={{
        backgroundImage: "url('/footer/footer-bg.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom",
      }}
    >
      {/* CTA Section */}
      <div className="pt-[34px] pb-[70px] text-center lg:mb-[34px] lg:px-[88px] lg:pt-[130px] lg:text-start">
        <h2 className="text-background mb-4 text-[24px] leading-tight font-bold lg:text-[46px]">
          What are you waiting for?
        </h2>
        <p className="text-background/90 mb-[36px] px-3 text-[16px] leading-relaxed lg:mb-[73px] lg:max-w-3xl lg:text-[24px]">
          Register now to get the best delivery experience for you and your
          clients in Iraq!
        </p>

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-2 px-3 lg:max-w-lg lg:flex-row lg:gap-4 lg:px-0"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="bg-background/95 focus:ring-background/50 h-[55px] flex-1 rounded-full border-none px-6 py-4 text-base text-gray-800 placeholder-gray-500 outline-none focus:ring-2"
            required
          />
          <Button type="submit" variant="on-surface" radius="full">
            register now
          </Button>
        </form>
      </div>

      {/* Nav links */}
      <div className="px-3 lg:grid lg:grid-cols-4 lg:px-0 lg:pt-[96px]">
        {/* Links Section */}
        <div className="col-span-3 pb-[40px] lg:ms-[60px] lg:flex lg:flex-row lg:gap-x-[67px]">
          {/* Logo Section */}
          <Image
            className="h-fit pb-[28px]"
            src="/logo/logo.svg"
            alt="Paint Logo"
            width={135}
            height={40}
          />

          <div className="flex justify-between lg:gap-x-8">
            {/* Navigation Links */}
            <nav className="flex flex-col gap-3 lg:gap-6">
              {navLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <a
                    href={link.href}
                    className={`${
                      index === 0
                        ? "text-background hover:text-background"
                        : "text-background/80 hover:text-background"
                    } text-base font-medium transition-colors lg:text-[16px]`}
                  >
                    {link.label}
                  </a>
                  {link.badge && (
                    <span className="bg-on-surface text-background rounded-full px-2 py-1 text-xs">
                      {link.badge}
                    </span>
                  )}
                </div>
              ))}
            </nav>

            {/* Help Center Links */}
            <nav className="flex flex-col gap-3 lg:gap-6">
              {helpLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`${
                    index === 0
                      ? "text-background hover:text-background"
                      : "text-background/80 hover:text-background"
                  } text-base font-medium transition-colors lg:text-[16px]`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Social Media Buttons */}
        <div className="flex max-w-1/2 flex-col gap-6 lg:col-span-1 lg:me-[112px] lg:max-w-full">
          <div className="space-y-3">
            {socialLinks.map((social) => (
              <SocialButton
                key={social.name}
                icon={social.icon}
                href={social.href}
              >
                {social.name}
              </SocialButton>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-[50px] pt-[65px] pb-[55px] text-center lg:pt-[163px]">
        <p className="text-background/80 text-[14px]">
          © 2024 Leader Express Delivery Company. All rights reserved.
        </p>
      </div>

      {/* Background about us for small screens */}
    </footer>
  );
};

export default Footer;
