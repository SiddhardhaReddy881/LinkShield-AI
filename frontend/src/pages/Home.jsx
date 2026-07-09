import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import URLScanner from "../components/URLScanner";
import Statistics from "../components/Statistics";
import TrustedSection from "../components/TrustedSection";
import Features from "../components/Features";
import ScanHistory from "../components/ScanHistory";
import Analytics from "../components/Analytics";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <URLScanner />

      <ScanHistory />

      <Statistics />

      <Analytics />

      <Footer />

      <TrustedSection />
      <Features />
    </div>
  );
}

export default Home;