"use client";
import { companyServices } from "@/data/companyServices";
import { CompanyServicesProps } from "@/types/CompanyServiceTypes";
import React from "react";
import ServiceCard from "./ServiceCard/ServiceCard";

const CompanyServices: React.FC<CompanyServicesProps> = ({
  services = companyServices,
}) => {
  return (
    <section id="services" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="text-background mb-[4px] text-[18px] font-bold lg:mb-[32px] lg:text-[48px]">
            Our Services
          </h2>
          <p className="text-secondary mx-auto max-w-3xl text-lg lg:text-xl">
            Transforming your online presence with innovative digital strategies
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-y-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-[122px]">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyServices;
