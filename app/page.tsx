import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyTrust } from "@/components/sections/WhyTrust";
import { WhoFor } from "@/components/sections/WhoFor";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <WhyTrust />
        <WhoFor />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
