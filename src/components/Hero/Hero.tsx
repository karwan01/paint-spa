"use client";
import OutlinedButton from "@/components/Buttons/OutlinedButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-background relative flex min-h-screen items-center overflow-hidden">
      <div className="flex gap-x-[185px]">
        {/* Left Content */}
        <div className="relative px-4 text-center lg:order-1 lg:flex lg:flex-col lg:gap-y-[132px] lg:ps-[88px] lg:text-left">
          <div>
            <h1 className="font-primary text-on-primary mb-6 text-[32px] leading-tight font-bold lg:text-[50px]">
              Transform your business{" "}
              <p>
                with our <span className="text-gradient"> Creative</span>
              </p>
              <span className="text-gradient block">Marketing Solutions!</span>
            </h1>

            <p className="font-primary text-on-primary mx-auto mb-8 max-w-2xl text-[16px] leading-relaxed sm:text-xl lg:mx-0">
              Welcome to Focus Marketing Solutions! We&apos;re a creative team
              dedicated to driving your business forward with innovative
              marketing strategies. From digital marketing to social media
              management, we&apos;re here to help you succeed. Let&apos;s build
              something extraordinary together
            </p>

            {/* CTA Buttons */}
            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <PrimaryButton
                variant="primary"
                size="lg"
                radius="full"
                className="px-8 py-4 font-semibold"
              >
                Join us
              </PrimaryButton>

              <OutlinedButton
                variant="surface"
                size="lg"
                radius="full"
                className="px-8 py-4 font-semibold"
              >
                Contact us
              </OutlinedButton>
            </div>
          </div>

          {/* Left Bottom SVG - Desktop Only - Positioned below text content */}
          <div className="relative hidden overflow-hidden lg:block">
            <Image
              src="/hero/left-hero-below-texts.svg"
              alt="Decorative design element"
              width={488}
              height={356}
              className="z-10"
            />
          </div>
        </div>

        {/* Right Content - Hero Images - Desktop Only */}
        <div className="hidden lg:order-2 lg:flex lg:flex-col lg:items-start lg:justify-end lg:gap-y-[28px]">
          {/* Main Hero Image - Top Right */}
          <Image
            src="/hero/right-hero.svg"
            alt="Professional painting service showcase"
            width={535}
            height={445}
            priority
          />

          {/* Bottom Right SVG */}
          <div className="relative overflow-hidden">
            <Image
              src="/hero/right-hero-bottom.svg"
              alt="Decorative design element"
              width={312}
              height={394}
              className="relative z-10"
            />
          </div>
        </div>
      </div>
      <div
        className="right-0 bottom-0 left-0 z-10 hidden h-[220px] lg:absolute"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.001) 8%, rgba(0,0,0,0.008) 16%, rgba(0,0,0,0.02) 24%, rgba(0,0,0,0.04) 32%, rgba(0,0,0,0.07) 40%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.19) 56%, rgba(0,0,0,0.28) 64%, rgba(0,0,0,0.39) 72%, rgba(0,0,0,0.52) 80%, rgba(0,0,0,0.66) 88%, rgba(0,0,0,0.8) 96%, rgba(0,0,0,0.92) 100%)",
        }}
      ></div>
    </section>
  );
};

export default Hero;
