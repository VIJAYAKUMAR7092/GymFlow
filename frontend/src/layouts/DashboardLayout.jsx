import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        <Navbar />

        <div className="mt-6">
          {children}
        </div>

      </div>

    </div>
  );
}