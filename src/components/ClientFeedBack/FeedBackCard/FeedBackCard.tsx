import { ClientFeedBack } from "@/types/ClientFeedBack";
import Image from "next/image";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

interface ClientFeedbackCardProps {
  clientFeedBack: ClientFeedBack;
  className?: string;
}

export default function ClientFeedbackCard({
  clientFeedBack,
  className = "",
}: ClientFeedbackCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <div
      className={`bg-on-background relative flex flex-col overflow-hidden rounded-2xl p-6 shadow-xl transition-all duration-300 ease-in-out ${className}`}
    >
      {/* Content */}
      <div className="relative z-10 transition-all duration-300 ease-in-out">
        {/* Profile Section */}
        <div
          className={`mb-4 flex flex-col items-start transition-all duration-300 ease-in-out`}
        >
          <div className="relative mb-3">
            {clientFeedBack.image ? (
              // Show profile image as-is (already circular with quote)
              <Image
                src={clientFeedBack.image}
                alt={clientFeedBack.name}
                width={48}
                height={48}
                className="h-12 w-12"
              />
            ) : (
              // Show avatar with initials if no image
              <>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-500 text-sm font-semibold text-gray-700 transition-all duration-300 ease-in-out`}
                >
                  {getInitials(clientFeedBack.name)}
                </div>
                <div
                  className={`absolute top-[-2px] right-[-10px] flex h-5 w-5 items-center justify-center rounded-full bg-teal-400 transition-all duration-300 ease-in-out`}
                >
                  <BiSolidQuoteAltLeft className="h-2.5 w-2.5 text-white" />
                </div>
              </>
            )}
          </div>
          <h3
            className={`text-background text-base font-bold transition-all duration-300 ease-in-out`}
          >
            {clientFeedBack.name}
          </h3>
        </div>

        {/* Quote */}
        <div className="flex-1">
          <blockquote
            className={`text-background text-[16px] leading-relaxed transition-all duration-300 ease-in-out lg:text-[18px]`}
          >
            &ldquo;{clientFeedBack.quote}&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  );
}
