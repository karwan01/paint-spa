import AboutUs from "@/components/AboutUs/AboutUs";
import ClientFeedBack from "@/components/ClientFeedBack/ClientFeedBack";
import CompanyPhilosophy from "@/components/CompanyPhilosophy/CompanyPhilosophy";
import CompanyServices from "@/components/CompanyServices/CompanyServices";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Partners from "@/components/Partners/Partners";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-18 lg:pt-25">
        <Hero />
        <Partners />
        <AboutUs />
        <CompanyServices />
        <CompanyPhilosophy />
        <ClientFeedBack />
      </main>
      <Footer />
    </>
  );
}
