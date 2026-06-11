import { TopBar } from "./_components/TopBar";
import { Header } from "./_components/Header";
import { HeroSlider } from "./_components/HeroSlider";
import { Solutions } from "./_components/Solutions";
import { StatsBand } from "./_components/StatsBand";
import { News } from "./_components/News";
import { BrochureCta } from "./_components/BrochureCta";
import { Footer } from "./_components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <HeroSlider />
        <Solutions />
        <StatsBand />
        <News />
        <BrochureCta />
      </main>
      <Footer />
    </>
  );
}
