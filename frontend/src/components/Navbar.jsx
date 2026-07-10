import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Home,
  Search,
  BarChart3,
  History,
  Star,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = sessionStorage.getItem("user");

    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const menuClass = (path) =>
    location.pathname === path
      ? "text-green-400 font-semibold"
      : "text-gray-300 hover:text-green-400 transition";

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-slate-700 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="bg-green-500 p-2 rounded-xl">

            <ShieldCheck
              size={30}
              className="text-black"
            />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">
              LinkShield AI
            </h1>

            <p className="text-xs text-green-400">
              Intelligent Phishing Detection
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <div className="hidden lg:flex items-center gap-7">

          <Link
            to="/"
            className={menuClass("/")}
          >
            <div className="flex items-center gap-2">
              <Home size={18} />
              Home
            </div>
          </Link>

          <a
            href="#scanner"
            className="text-gray-300 hover:text-green-400 transition"
          >
            <div className="flex items-center gap-2">
              <Search size={18} />
              Scan
            </div>
          </a>

          <a
            href="#analytics"
            className="text-gray-300 hover:text-green-400 transition"
          >
            <div className="flex items-center gap-2">
              <BarChart3 size={18} />
              Analytics
            </div>
          </a>

          <a
            href="#history"
            className="text-gray-300 hover:text-green-400 transition"
          >
            <div className="flex items-center gap-2">
              <History size={18} />
              History
            </div>
          </a>

          <a
            href="#features"
            className="text-gray-300 hover:text-green-400 transition"
          >
            <div className="flex items-center gap-2">
              <Star size={18} />
              Features
            </div>
          </a>

        </div>

        {/* User */}

        {!user ? (

          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold px-5 py-2 rounded-xl transition"
            >
              <LogIn size={18} />
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-semibold px-5 py-2 rounded-xl transition"
            >
              <UserPlus size={18} />
              Register
            </Link>

          </div>

        ) : (

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl">

              <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center font-bold text-black">

                {user.username.charAt(0).toUpperCase()}

              </div>

              <div>

                <p className="text-white font-semibold">
                  {user.username}
                </p>

                <p className="text-xs text-green-400">
                  Logged In
                </p>

              </div>

            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-white transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;