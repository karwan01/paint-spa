"use client";
import OutlinedButton from "@/components/Buttons/OutlinedButton";
import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section
      id="about"
      className="text-background item-center relative flex min-h-screen justify-center overflow-hidden lg:min-h-[626px]"
    >
      {/* Background about us for small screens */}
      <div
        className="absolute h-full w-full bg-contain bg-no-repeat lg:hidden"
        style={{
          backgroundImage: "url('/about-us/lines-bg-sm.svg')",
        }}
      />
      {/* Background about us for large screens */}
      <div
        className="absolute hidden h-full w-full bg-contain bg-no-repeat lg:block"
        style={{
          backgroundImage: "url('/about-us/lines-bg.svg')",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:min-h-fit lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main heading */}
          <h2 className="text-background mb-[4px] text-[18px] font-bold lg:mb-[32px] lg:text-[48px]">
            About Us
          </h2>
          {/* Description text */}
          <div className="mb-[80px] lg:mb-10">
            <p className="text-justify text-[16px] leading-[2] lg:text-[20px] lg:leading-[1.5]">
              Welcome to{" "}
              <span className="text-primary"> Focus Marketing Solutions!</span>{" "}
              We&apos;re a creative team dedicated to driving your business
              forward with innovative marketing strategies. From digital
              marketing to social media management, we&apos;re here to help you
              succeed.{" "}
              <span className="text-primary">
                Let&apos;s build something extraordinary together.
              </span>
            </p>
          </div>

          {/* Read more button */}
          <div className="flex flex-col lg:flex-row lg:justify-center">
            <OutlinedButton variant="primary" size="lg" radius="full">
              Read more
            </OutlinedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
