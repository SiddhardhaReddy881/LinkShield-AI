import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import URLScanner from "../components/URLScanner";
import Statistics from "../components/Statistics";
import TrustedSection from "../components/TrustedSection";
import Features from "../components/Features";
import Analytics from "../components/Analytics";
import ScanHistory from "../components/ScanHistory";
import Footer from "../components/Footer";

function Home() {
  const [refreshHistory, setRefreshHistory] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

<Hero />


<URLScanner
  onScanComplete={() =>
    setRefreshHistory((prev) => prev + 1)
  }
/> 

<Statistics />

<Analytics />

      <ScanHistory
        refresh={refreshHistory}
      />

      <TrustedSection />

      <Features />

      <Footer />

    </div>
  );
}

export default Home;