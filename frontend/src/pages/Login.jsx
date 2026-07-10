import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/login", form);

      if (response.data.success) {
        sessionStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

        toast.success("Login Successful");

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-md p-10">

        <h1 className="text-4xl font-bold text-center text-white mb-8">
          🔐 Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

<div className="text-right mt-3">
  <Link
    to="/forgot-password"
    className="text-green-400 hover:underline text-sm"
  >
    Forgot Password?
  </Link>
</div>

<p className="text-center text-gray-400 mt-8">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-green-400 hover:underline"
  >
    Register
  </Link>
</p>

      </div>

    </div>
  );
}

export default Login;