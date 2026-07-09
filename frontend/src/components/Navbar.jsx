import { ShieldCheck } from "lucide-react";

function Navbar() {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="bg-green-500 p-2 rounded-xl">

            <ShieldCheck
              className="text-black"
              size={28}
            />

          </div>

          <div>

            <h1 className="text-2xl font-extrabold text-white">
              LinkShield
            </h1>

            <p className="text-green-400 text-xs">
              AI Phishing Detection
            </p>

          </div>

        </div>

        {/* Navigation */}

        <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-green-400 transition"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("analytics")}
            className="hover:text-green-400 transition"
          >
            Analytics
          </button>

          <button
            onClick={() => scrollToSection("history")}
            className="hover:text-green-400 transition"
          >
            History
          </button>

          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-green-400 transition"
          >
            Features
          </button>

        </div>

        <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold text-black transition shadow-lg">
          Scan Now
        </button>

      </div>

    </nav>
  );
}

export default Navbar;