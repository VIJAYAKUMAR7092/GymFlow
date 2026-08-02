import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-white shadow rounded-2xl p-5 flex justify-between items-center">

      <div>
        <h2 className="text-3xl font-bold">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back, Admin 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2">
          <Search size={18} />
          <input
            className="bg-transparent outline-none ml-2"
            placeholder="Search..."
          />
        </div>

        <Bell size={24} />

        <img
          src="https://i.pravatar.cc/100"
          className="w-12 h-12 rounded-full"
        />

      </div>

    </div>
  );
}