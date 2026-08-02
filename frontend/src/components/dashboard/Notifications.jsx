import { useEffect, useState } from "react";
import {
  FaBell,
  FaExclamationTriangle,
} from "react-icons/fa";
import api from "../../services/api";

export default function Notifications() {
  const [expiring, setExpiring] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
  try {
    const res = await api.get("/subscriptions/expiring/");
    setExpiring(res.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  const interval = setInterval(() => {
    loadNotifications();
  }, 30000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <div className="flex justify-between items-center mb-5">

  <div className="flex items-center gap-3">

    <FaBell className="text-yellow-500 text-2xl" />

    <h2 className="text-2xl font-bold">
      Notifications
    </h2>

  </div>

  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">

    {expiring.length}

  </div>

</div>

      {expiring.length === 0 ? (

        <div className="text-center py-8">

          <p className="text-green-600 font-semibold">
            ✅ No Membership Expiring Soon
          </p>

        </div>

      ) : (

        <div
  key={item.id}
  className="bg-yellow-50 border-l-4 border-yellow-500 rounded-2xl p-5 hover:shadow-lg transition"
>

  <div className="flex justify-between items-start">

    <div>

      <h3 className="font-bold text-lg">

        {item.member_name}

      </h3>

      <p className="text-gray-500">

        {item.plan_name}

      </p>

      <p className="text-red-600 font-semibold mt-2">

        Expires in {item.days_left} Days

      </p>

      <p className="text-sm text-gray-400">

        {item.end_date}

      </p>

    </div>

    <FaExclamationTriangle className="text-yellow-500 text-2xl" />

  </div>

</div>
      )}

    </div>
  );
}