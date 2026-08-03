import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Dumbbell,
} from "lucide-react";
import toast from "react-hot-toast";
import { loginUser } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    console.log(formData);

    const res = await loginUser(formData);

    console.log("LOGIN RESPONSE:", res.data);

    localStorage.setItem("token", res.data.token);
localStorage.setItem("username", res.data.username);
localStorage.setItem("email", res.data.email);
localStorage.setItem("role", res.data.role);
localStorage.setItem("is_owner", res.data.is_owner);

if (remember) {
  localStorage.setItem("remember", "true");
}

    toast.success("Welcome Back 👋");

    navigate("/dashboard");

  } catch (err) {
    console.log("STATUS:", err.response?.status);
    console.log("ERROR:", err.response?.data);

    toast.error(
      err.response?.data?.non_field_errors?.[0] || "Login Failed"
    );

  } finally {
    setLoading(false);
  }
};
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Card */}

      <div className="relative z-10 w-full max-w-md">

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

          <div className="flex justify-center mb-5">

            <div className="bg-blue-600 p-4 rounded-full shadow-lg">

              <Dumbbell
                className="text-white"
                size={36}
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold text-center text-white">
            GymPro
          </h1>

          <p className="text-center text-gray-300 mt-2 mb-8">
            Modern Gym Management System
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Username */}

            <div className="relative">

              <User
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-white/20 text-white placeholder-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none border border-white/20 focus:border-blue-500"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <Lock
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white/20 text-white placeholder-gray-300 rounded-xl py-3 pl-12 pr-12 outline-none border border-white/20 focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-gray-300"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {/* Remember */}

            <div className="flex justify-between items-center text-white text-sm">

              <label className="flex items-center gap-2 cursor-pointer">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() =>
                    setRemember(!remember)
                  }
                />

                Remember Me

              </label>

              <button
                type="button"
                className="hover:text-blue-400"
              >
                Forgot Password?
              </button>

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl text-white font-semibold text-lg shadow-lg"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>

          <div className="mt-8 text-center">

  <p className="text-gray-300">

    Don't have an account?

  </p>

  <button
    onClick={() => navigate("/register")}
    className="mt-3 text-blue-400 hover:text-blue-300 font-semibold"
  >
    Register Your Gym
  </button>

  <p className="text-gray-500 text-sm mt-5">
    Secure Login • GymPro v1.0
  </p>

</div>

        </div>

      </div>

    </div>
  );
}