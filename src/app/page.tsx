import Hero from "@/components/Hero/Hero";
import Partners from "@/components/Partners/Partners";
import AboutUs from "@/components/aboutUs/AboutUs";
import CompanyPhilosophy from "@/components/companyPhilosophy/companyPhilosophy";
import CompanyServices from "@/components/companyServices/CompanyServices";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <AboutUs />
      <CompanyServices />
      <CompanyPhilosophy />
    </>
  );
}
