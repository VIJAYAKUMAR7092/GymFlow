import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Wallet,
  CalendarCheck,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { getSettings } from "../../services/settingsService";

export default function Sidebar() {
  const navigate = useNavigate();

  const [gymName, setGymName] = useState("GymFlow");

  const isOwner = localStorage.getItem("is_owner") === "true";

  const menuItems = [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Users,
      title: "Members",
      path: "/members",
    },
    {
      icon: CreditCard,
      title: "Plans",
      path: "/plans",
    },
    {
      icon: Wallet,
      title: "Payments",
      path: "/payments",
    },
    {
      icon: CalendarCheck,
      title: "Attendance",
      path: "/attendance",
    },
    {
      icon: BarChart3,
      title: "Reports",
      path: "/reports",
    },
    {
      icon: Settings,
      title: "Settings",
      path: "/settings",
    },

    ...(isOwner
      ? [
          {
            icon: Users,
            title: "Pending Users",
            path: "/pending-users",
          },
        ]
      : []),
  ];

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await getSettings();

      if (res.data.length > 0) {
        setGymName(res.data[0].gym_name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("is_owner");
    localStorage.removeItem("remember");

    navigate("/login");
  };

  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-10">
          💪 {gymName}
        </h1>

        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 w-full p-4 rounded-xl transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-slate-700"
                  }`
                }
              >
                <Icon size={22} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="mt-auto p-6">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}