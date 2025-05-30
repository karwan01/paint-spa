import AboutUs from "@/components/AboutUs/AboutUs";
import CompanyPhilosophy from "@/components/CompanyPhilosophy/CompanyPhilosophy";
import CompanyServices from "@/components/CompanyServices/CompanyServices";
import Hero from "@/components/Hero/Hero";
import Partners from "@/components/Partners/Partners";

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
