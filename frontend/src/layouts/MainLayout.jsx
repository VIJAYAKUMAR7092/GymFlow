import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}