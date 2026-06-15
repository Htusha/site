import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Approach from "@/components/Approach";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Tests from "@/components/Tests";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToSection from "@/components/ScrollToSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>
      <Header />
      <main>
        <Hero />
        <About />
        <Approach />
        <Services />
        <Process />
        <Tests />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
