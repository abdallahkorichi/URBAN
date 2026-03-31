import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Logo from "../../components/shared/Logo";
import api from "../../services/api.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in the fields!");
      return;
    }
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!🎉");

      if (user.role === "architect") {
        navigate("/architect/dashboard");
      } else {
        navigate("/office/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-base-100">
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-[#F5EFE6] via-[#E8DFD0] to-[#D8CCB8]">
        <h1 className="text-4xl font-bold text-[#3E2F1C]">
          KOUTHBAN Platform
        </h1>

        <p className="mt-6 text-[#5C4B37] max-w-md">
          Secure access for architects and studies offices to manage structured
          KOUTHBAN planning submissions.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-center text-[#3E2F1C]">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-[#3E2F1C]">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C2A97F]"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2 text-[#3E2F1C]">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C2A97F]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#C2A97F] text-white py-3 rounded-xl font-medium hover:bg-[#9C7B52] transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#C2A97F] font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
