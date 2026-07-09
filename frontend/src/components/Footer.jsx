import {
  ShieldCheck,
  Github,
  Mail,
  Globe,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-3">

              <div className="bg-green-500 p-2 rounded-xl">

                <ShieldCheck
                  className="text-black"
                  size={30}
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

            <p className="text-gray-400 mt-5 leading-7">

              LinkShield AI is an intelligent phishing URL
              detection platform powered by AI, WHOIS,
              VirusTotal, Google Safe Browsing, SSL
              verification and DNS analysis.

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl text-white font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>🏠 Home</li>

              <li>📊 Analytics</li>

              <li>📜 Scan History</li>

              <li>⭐ Features</li>

            </ul>

          </div>

          {/* Tech Stack */}

          <div>

            <h3 className="text-xl text-white font-bold mb-5">
              Technology Stack
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>⚛ React + Vite</li>

              <li>🐍 FastAPI</li>

              <li>🗄 SQLite</li>

              <li>🤖 AI Threat Detection</li>

              <li>🌐 VirusTotal API</li>

            </ul>

          </div>

        </div>

        <hr className="border-slate-700 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400">

            © 2026 LinkShield AI • Developed as a Cyber Security Project

          </p>

          <div className="flex gap-5 mt-5 md:mt-0">

            <Github
              className="text-gray-400 hover:text-white cursor-pointer transition"
            />

            <Mail
              className="text-gray-400 hover:text-white cursor-pointer transition"
            />

            <Globe
              className="text-gray-400 hover:text-white cursor-pointer transition"
            />

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;