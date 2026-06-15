import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Approach from "@/components/Approach";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Approach />
        <Services />
        <Process />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
