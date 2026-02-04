import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Integration from "@/components/Integration";
import NavBar from "@/components/landing";
import Pricing from "@/components/Pricing";
import SocialProof from "@/components/SocialProof";


export default function Home() {
  return (
    <main className="w-full flex flex-col relative z-10">
      <NavBar />
      <Hero />
      <SocialProof />
      <Features />
      <Integration/>
      <Pricing/>
      <Footer />
    </main>
  );
}
