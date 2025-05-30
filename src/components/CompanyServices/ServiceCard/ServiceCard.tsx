import { ServiceCardProps } from "@/types/CompanyServiceTypes";
import Image from "next/image";
import React from "react";

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group flex flex-col items-center text-center transition-all duration-300">
      {/* White rectangle container for icon */}
      <div className="bg-background mb-6 flex h-38 w-38 items-center justify-center rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Icon container - circular with primary background */}
        <div className="bg-primary flex h-36 w-36 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105">
          <Image
            src={service.img}
            alt={`${service.name} icon`}
            width={64}
            height={64}
            className="h-16 w-16 brightness-0 invert transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="group-hover:text-primary text-background text-[16px] font-semibold transition-colors duration-300 lg:text-[21px]">
          {service.name}
        </h3>
        <p className="text-secondary text-[14px] leading-relaxed lg:text-[18px]">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
