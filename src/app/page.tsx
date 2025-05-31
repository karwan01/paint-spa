import AboutUs from "@/components/AboutUs/AboutUs";
import ClientFeedBack from "@/components/ClientFeedBack/ClientFeedBack";
import CompanyPhilosophy from "@/components/CompanyPhilosophy/CompanyPhilosophy";
import CompanyServices from "@/components/CompanyServices/CompanyServices";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import News from "@/components/News/News";
import Partners from "@/components/Partners/Partners";
import Pricing from "@/components/Pricing/Pricing";
import Statistic from "@/components/Statistic/Statistic";

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
        <Statistic />
        <News />
        <Pricing />
        <ClientFeedBack />
      </main>
      <Footer />
    </>
  );
}
