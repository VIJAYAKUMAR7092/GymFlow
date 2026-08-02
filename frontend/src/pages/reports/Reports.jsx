import { useEffect, useState } from "react";
import { getDashboardReport } from "../../services/reportService";
import { generateReport } from "../../utils/pdfExport";
import RevenueChart from "../../components/dashboard/RevenueChart";

import { exportExcel } from "../../utils/excelExport";
import {
  FaUsers,
  FaDumbbell,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaFilePdf,
} from "react-icons/fa";

export default function Reports() {
  const [report, setReport] = useState({
  total_members: 0,
  total_plans: 0,
  total_revenue: 0,
  today_attendance: 0,
  chart: [],
});

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const res = await getDashboardReport();
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-slate-100 min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Reports Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Business Analytics & Revenue Overview
          </p>
        </div>

        <div className="flex gap-3">

  <button
    onClick={() => generateReport(report)}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl shadow-lg transition"
  >
    📄 Export PDF
  </button>

  <button
    onClick={() => exportExcel(report)}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-lg transition"
  >
    📊 Export Excel
  </button>

</div>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-6">

          <FaUsers className="text-3xl mb-3" />

          <h3 className="text-lg">
            Total Members
          </h3>

          <p className="text-4xl font-bold mt-3">
            {report.total_members}
          </p>

        </div>

        <div className="bg-purple-600 text-white rounded-2xl shadow-lg p-6">

          <FaDumbbell className="text-3xl mb-3" />

          <h3 className="text-lg">
            Membership Plans
          </h3>

          <p className="text-4xl font-bold mt-3">
            {report.total_plans}
          </p>

        </div>

        <div className="bg-green-600 text-white rounded-2xl shadow-lg p-6">

          <FaMoneyBillWave className="text-3xl mb-3" />

          <h3 className="text-lg">
            Total Revenue
          </h3>

          <p className="text-4xl font-bold mt-3">
            ₹{report.total_revenue}
          </p>

        </div>

        <div className="bg-orange-500 text-white rounded-2xl shadow-lg p-6">

          <FaClipboardCheck className="text-3xl mb-3" />

          <h3 className="text-lg">
            Today's Attendance
          </h3>

          <p className="text-4xl font-bold mt-3">
            {report.today_attendance}
          </p>

        </div>

      </div>

      {/* Revenue Chart */}

<RevenueChart data={report.chart} />
    </div>
  );
}