import Cases from "@/components/Cases";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Philosophy from "@/components/Philosophy";
import Process from "@/components/Process";
import Services from "@/components/Services";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Hero />
      <Manifesto />
      <Services />
      <Cases />
      <SocialProof />
      <Process />
      <CTA  />
      <Philosophy />  
      <Footer />
    </main>
  );
}