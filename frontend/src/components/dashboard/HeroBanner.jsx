import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";

export default function HeroBanner() {
  const navigate = useNavigate();

  const [gymName, setGymName] = useState("AMA GYM");
  const [banner, setBanner] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await api.get("/settings/");

      if (res.data.length > 0) {
        setGymName(res.data[0].gym_name);
        setBanner(res.data[0].logo);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="relative h-80 rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center"
      style={{
        backgroundImage: `url(${
          banner || "https://via.placeholder.com/1400x500"
        })`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      <div className="relative h-full flex items-center justify-between px-10">

        <div>

          <p className="text-blue-300 font-semibold text-lg">
            Welcome Back 👋
          </p>

          <h1 className="text-5xl font-extrabold text-white mt-3">
            {gymName}
          </h1>

          <p className="text-gray-200 mt-5 text-lg max-w-xl leading-8">
            Manage members, attendance, subscriptions and payments
            from one powerful dashboard.
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={() => navigate("/members")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              View Members
            </button>

            <button
              onClick={() => navigate("/payments")}
              className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition"
            >
              Payments
            </button>

          </div>

        </div>

        <div className="hidden lg:flex flex-col gap-5">

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 w-64 border border-white/20">

            <div className="flex items-center gap-3">

              <FaUsers className="text-3xl text-blue-300" />

              <div>
                <p className="text-gray-300 text-sm">
                  Members
                </p>

                <h2 className="text-white text-2xl font-bold">
                  Active
                </h2>
              </div>

            </div>

          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 w-64 border border-white/20">

            <div className="flex items-center gap-3">

              <FaMoneyBillWave className="text-3xl text-green-300" />

              <div>

                <p className="text-gray-300 text-sm">
                  Revenue
                </p>

                <h2 className="text-white text-2xl font-bold">
                  Growing 📈
                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}