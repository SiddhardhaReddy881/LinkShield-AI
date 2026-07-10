import {
  ShieldCheck,
  Mail,
  Globe,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* About */}

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
              LinkShield AI is an intelligent phishing URL detection
              platform powered by AI, VirusTotal, WHOIS,
              Google Safe Browsing, DNS analysis and SSL verification.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl text-white font-bold mb-5">
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
                  📜 Scan History
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

            <h3 className="text-xl text-white font-bold mb-5">
              Technology
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
                  🛡 VirusTotal API
                </a>
              </li>

              <li>
                <a
                  href="https://www.tensorflow.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition"
                >
                  🤖 AI Threat Analysis
                </a>
              </li>

            </ul>

          </div>

        </div>

        <hr className="border-slate-700 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400">
            © 2026 LinkShield AI • Cyber Security Project
          </p>

          <div className="flex gap-5 mt-5 md:mt-0">

            <a href="mailto:your_email@example.com">
              <Mail
                className="text-gray-400 hover:text-green-400 transition cursor-pointer"
              />
            </a>

            <a
              href="https://github.com/your-github-username"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe
                className="text-gray-400 hover:text-green-400 transition cursor-pointer"
              />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;