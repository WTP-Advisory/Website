import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Services } from "./_components/Services";
import { WhyChoose } from "./_components/WhyChoose";
import { Process } from "./_components/Process";
import { Ecosystem } from "./_components/Ecosystem";
import { CtaBand } from "./_components/CtaBand";
import { Contact } from "./_components/Contact";
import { Footer } from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyChoose />
        <Process />
        <Ecosystem />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
