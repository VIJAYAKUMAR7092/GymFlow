import { Bell, Search } from "lucide-react";

export default function TopBar() {
  const username = localStorage.getItem("username") || "Admin";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome Back 👋
        </h1>
        <p className="text-slate-500">
          Have a productive day, {username}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="relative p-3 rounded-xl bg-slate-100 hover:bg-slate-200">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt=""
            className="w-11 h-11 rounded-full"
          />

          <div>
            <h3 className="font-semibold">
              {username}
            </h3>

            <p className="text-sm text-gray-500">
              Reception
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}