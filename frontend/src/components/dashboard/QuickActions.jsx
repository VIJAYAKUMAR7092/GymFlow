import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={() => navigate("/members")}
          className="bg-blue-600 text-white rounded-2xl p-5 hover:scale-105 transition"
        >
          Add Member
        </button>

        <button
          onClick={() => navigate("/payments")}
          className="bg-green-600 text-white rounded-2xl p-5 hover:scale-105 transition"
        >
          Add Payment
        </button>

        <button
          onClick={() => navigate("/attendance")}
          className="bg-orange-500 text-white rounded-2xl p-5 hover:scale-105 transition"
        >
          Attendance
        </button>

        <button
          onClick={() => navigate("/reports")}
          className="bg-purple-600 text-white rounded-2xl p-5 hover:scale-105 transition"
        >
          Reports
        </button>

      </div>

    </div>
  );
}