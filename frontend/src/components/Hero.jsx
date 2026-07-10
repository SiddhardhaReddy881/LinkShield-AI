import { motion } from "framer-motion";
import { ShieldCheck, ScanSearch, Lock, Brain, Globe } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Effects */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-green-500/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 py-28">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >

          {/* Logo */}

          <div className="inline-flex items-center justify-center bg-green-500/20 border border-green-500 rounded-full p-6 mb-8">

            <ShieldCheck
              size={70}
              className="text-green-400"
            />

          </div>

          {/* Heading */}

          <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight">

            AI Powered

            <span className="text-green-400">
              {" "}Phishing Detection
            </span>

          </h1>

          {/* Description */}

          <p className="text-slate-300 text-xl max-w-4xl mx-auto mt-8 leading-9">

            Protect yourself from phishing websites using Artificial
            Intelligence, VirusTotal, WHOIS Lookup, Google Safe Browsing,
            SSL Verification and DNS Intelligence.

          </p>

          {/* Buttons */}

          <div className="flex flex-col md:flex-row justify-center gap-5 mt-12">

            <a
              href="#scanner"
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-10 py-4 rounded-xl transition duration-300 shadow-lg"
            >
              🔍 Scan URL Now
            </a>

            <a
              href="#features"
              className="border border-green-500 hover:bg-green-500 hover:text-black px-10 py-4 rounded-xl font-semibold transition duration-300"
            >
              Learn More
            </a>

          </div>

          {/* Feature Pills */}

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mt-20">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6"
            >

              <ScanSearch
                className="mx-auto text-green-400 mb-3"
                size={35}
              />

              <p className="font-semibold">
                Real-Time Scan
              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6"
            >

              <Brain
                className="mx-auto text-green-400 mb-3"
                size={35}
              />

              <p className="font-semibold">
                AI Detection
              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6"
            >

              <Lock
                className="mx-auto text-green-400 mb-3"
                size={35}
              />

              <p className="font-semibold">
                SSL Analysis
              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6"
            >

              <Globe
                className="mx-auto text-green-400 mb-3"
                size={35}
              />

              <p className="font-semibold">
                WHOIS Lookup
              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6"
            >

              <ShieldCheck
                className="mx-auto text-green-400 mb-3"
                size={35}
              />

              <p className="font-semibold">
                Threat Intelligence
              </p>

            </motion.div>

          </div>

          {/* Bottom Stats */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">

            <div>
              <h2 className="text-4xl font-bold text-green-400">
                AI
              </h2>
              <p className="text-gray-400 mt-2">
                Machine Learning Detection
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-green-400">
                24/7
              </h2>
              <p className="text-gray-400 mt-2">
                Security Monitoring
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-green-400">
                SSL
              </h2>
              <p className="text-gray-400 mt-2">
                Certificate Verification
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-green-400">
                DNS
              </h2>
              <p className="text-gray-400 mt-2">
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