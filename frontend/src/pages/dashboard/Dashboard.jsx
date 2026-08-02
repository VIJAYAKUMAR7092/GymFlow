import { useEffect, useState } from "react";

import HeroBanner from "../../components/dashboard/HeroBanner";
import StatCard from "../../components/dashboard/StatCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import RecentMembers from "../../components/dashboard/RecentMembers";
import AttendanceProgress from "../../components/dashboard/AttendanceProgress";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentPayments from "../../components/dashboard/RecentPayments";
import TopBar from "../../components/dashboard/TopBar";
import Notifications from "../../components/dashboard/Notifications";
import AttendancePieChart from "../../components/dashboard/AttendancePieChart";

import {
  FaUsers,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaDumbbell,
} from "react-icons/fa";

import { getMembers } from "../../services/memberService";
import { getPlans } from "../../services/planService";
import { getPayments } from "../../services/paymentService";
import { getAttendance } from "../../services/attendanceService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    members: 0,
    revenue: 0,
    attendance: 0,
    plans: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [membersRes, plansRes, paymentsRes, attendanceRes] =
        await Promise.all([
          getMembers(),
          getPlans(),
          getPayments(),
          getAttendance(),
        ]);
        console.log("Members :", membersRes.data);
console.log("Plans :", plansRes.data);
console.log("Payments :", paymentsRes.data);
console.log("Attendance :", attendanceRes.data);

      const revenue = paymentsRes.data.reduce(
        (total, payment) => total + Number(payment.amount),
        0,
      );

      setStats({
        members: membersRes.data.length,
        plans: plansRes.data.length,
        attendance: attendanceRes.data.length,
        revenue,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-slate-100 min-h-screen">
      <TopBar />

      <HeroBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Members"
          value={stats.members}
          icon={<FaUsers />}
          color="bg-blue-600"
        />

        <StatCard
          title="Revenue"
          value={`₹${stats.revenue}`}
          icon={<FaMoneyBillWave />}
          color="bg-green-600"
        />

        <StatCard
          title="Attendance"
          value={stats.attendance}
          icon={<FaClipboardCheck />}
          color="bg-orange-500"
        />

        <StatCard
          title="Plans"
          value={stats.plans}
          icon={<FaDumbbell />}
          color="bg-purple-600"
        />
      </div>

     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  <div className="lg:col-span-2">

    <AttendanceProgress />

  </div>

  <Notifications />

</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  <AttendancePieChart />

  <RecentMembers />

</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceProgress />

        <QuickActions />
      </div>
    </div>
    
  );
}
