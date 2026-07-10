import { motion } from "framer-motion";
import { ShieldCheck, ScanSearch, Lock, Brain, Globe } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 text-white min-h-screen flex items-center"
    >
      {/* Background Effects */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-green-500/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full"></div>
      
      <div className="absolute inset-0 opacity-10">

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,197,94,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ zIndex: 10 }}
          className="text-center"
        >

          {/* Logo */}

          <div className="inline-flex items-center justify-center bg-green-500/20 border border-green-500 rounded-full p-4 md:p-6 mb-6 md:mb-8 shadow-[0_0_40px_rgba(34,197,94,0.35)]">

            <ShieldCheck
              size={55}
              className="text-green-400"
            />

          </div>

          {/* Heading */}

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">

            Protect Yourself Against

            <span className="text-green-400">
              {" "}AI Powered Phishing Attacks
            </span>

          </h1>

          {/* Description */}

          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-4xl mx-auto mt-6 md:mt-8 leading-7 md:leading-9 px-2">

            Protect yourself from phishing websites using Artificial
            Intelligence, VirusTotal, WHOIS Lookup, Google Safe Browsing,
            SSL Verification and DNS Intelligence.

          </p>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 md:mt-12">

            <a
              href="#scanner"
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 md:px-10 py-4 rounded-xl transition duration-300 shadow-xl hover:scale-105 w-full sm:w-auto"
            >
              🚀 Start Secure Scan
            </a>

            <a
              href="#features"
              className="border border-green-500 hover:bg-green-500 hover:text-black px-8 md:px-10 py-4 rounded-xl font-semibold transition duration-300 w-full sm:w-auto"
            >
              ✨ Explore Features
            </a>

          </div>

          {/* Feature Pills */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-14 md:mt-20">

            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 1,
              }}
              className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-5 hover:border-green-500 hover:shadow-[0_0_35px_rgba(34,197,94,0.35)] transition-all duration-300"
            >

              <ScanSearch
                className="mx-auto text-green-400 mb-3"
                size={32}
              />

              <p className="font-semibold">
                Real-Time Scan
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 1,
              }}
              className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-5 hover:border-green-500 hover:shadow-[0_0_35px_rgba(34,197,94,0.35)] transition-all duration-300"
            >

              <Brain
                className="mx-auto text-green-400 mb-3"
                size={32}
              />

              <p className="font-semibold">
                AI Detection
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 1,
              }}
              className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-5 hover:border-green-500 hover:shadow-[0_0_35px_rgba(34,197,94,0.35)] transition-all duration-300"
            >

              <Lock
                className="mx-auto text-green-400 mb-3"
                size={32}
              />

              <p className="font-semibold">
                SSL Analysis
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 1,
              }}
              className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-5 hover:border-green-500 hover:shadow-[0_0_35px_rgba(34,197,94,0.35)] transition-all duration-300"
            >

              <Globe
                className="mx-auto text-green-400 mb-3"
                size={32}
              />

              <p className="font-semibold">
                WHOIS Lookup
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 1,
              }}
              className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-5 hover:border-green-500 hover:shadow-[0_0_35px_rgba(34,197,94,0.35)] transition-all duration-300"
            >

              <ShieldCheck
                className="mx-auto text-green-400 mb-3"
                size={32}
              />

              <p className="font-semibold">
                Threat Intelligence
              </p>

            </motion.div>

          </div>

          {/* Bottom Stats */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20">

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-400">
                AI
              </h2>
              <p className="text-gray-400 mt-2 text-sm md:text-base">
                Machine Learning Detection
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-400">
                24/7
              </h2>
              <p className="text-gray-400 mt-2 text-sm md:text-base">
                Security Monitoring
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-400">
                SSL
              </h2>
              <p className="text-gray-400 mt-2 text-sm md:text-base">
                Certificate Verification
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-400">
                DNS
              </h2>
              <p className="text-gray-400 mt-2 text-sm md:text-base">
                Network Intelligence
              </p>
            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;