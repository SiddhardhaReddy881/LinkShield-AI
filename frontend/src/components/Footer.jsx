import {
  ShieldCheck,
  Mail,
  Globe,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* About */}

          <div>

            <div className="flex items-center gap-3">

              <div className="bg-green-500 p-2 rounded-xl shadow-lg">

                <ShieldCheck
                  className="text-black"
                  size={28}
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  LinkShield AI
                </h2>

                <p className="text-green-400 text-sm">
                  Intelligent Phishing Detection
                </p>

              </div>

            </div>

            <p className="text-gray-400 mt-5 text-sm md:text-base leading-7">
              LinkShield AI is an intelligent phishing URL detection platform
              powered by Artificial Intelligence, VirusTotal, WHOIS, Google Safe
              Browsing, DNS Analysis and SSL Verification.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-bold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a
                  href="#home"
                  className="hover:text-green-400 transition"
                >
                  🏠 Home
                </a>
              </li>

              <li>
                <a
                  href="#scanner"
                  className="hover:text-green-400 transition"
                >
                  🔍 Scanner
                </a>
              </li>

              <li>
                <a
                  href="#analytics"
                  className="hover:text-green-400 transition"
                >
                  📊 Analytics
                </a>
              </li>

              <li>
                <a
                  href="#history"
                  className="hover:text-green-400 transition"
                >
                  📜 History
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="hover:text-green-400 transition"
                >
                  ⭐ Features
                </a>
              </li>

            </ul>

          </div>

          {/* Technology */}

          <div>

            <h3 className="text-xl font-bold text-white mb-5">
              Technologies
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a
                  href="https://react.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition"
                >
                  ⚛ React + Vite
                </a>
              </li>

              <li>
                <a
                  href="https://fastapi.tiangolo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition"
                >
                  🐍 FastAPI
                </a>
              </li>

              <li>
                <a
                  href="https://sqlite.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition"
                >
                  🗄 SQLite
                </a>
              </li>

              <li>
                <a
                  href="https://www.virustotal.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition"
                >
                  🛡 VirusTotal
                </a>
              </li>

              <li>
                <a
                  href="https://www.tensorflow.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition"
                >
                  🤖 TensorFlow AI
                </a>
              </li>

            </ul>

          </div>

        </div>

        <hr className="border-slate-700 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-center md:text-left text-gray-400 text-sm">
            © 2026 <span className="text-green-400 font-semibold">LinkShield AI</span> • Cyber Security Project
          </p>

          <div className="flex items-center gap-6">

            <a href="mailto:your_email@example.com">

              <Mail
                size={22}
                className="text-gray-400 hover:text-green-400 hover:scale-110 transition-all duration-300"
              />

            </a>

            <a
              href="https://github.com/SiddhardhaReddy881/LinkShield-AI"
              target="_blank"
              rel="noopener noreferrer"
            >

              <Globe
                size={22}
                className="text-gray-400 hover:text-green-400 hover:scale-110 transition-all duration-300"
              />

            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;