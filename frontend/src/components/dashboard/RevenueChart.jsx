import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { getPayments } from "../../services/paymentService";

export default function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadRevenue();
  }, []);

  const loadRevenue = async () => {
    try {
      const res = await getPayments();

      const monthlyRevenue = {};

      res.data.forEach((payment) => {
        const month = new Date(payment.payment_date).toLocaleString(
          "default",
          {
            month: "short",
          }
        );

        monthlyRevenue[month] =
          (monthlyRevenue[month] || 0) +
          Number(payment.amount);
      });

      const chartData = Object.keys(monthlyRevenue).map((month) => ({
        month,
        revenue: monthlyRevenue[month],
      }));

      setData(chartData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            📈 Revenue Overview
          </h2>

          <p className="text-gray-500">
            Monthly payment collection
          </p>

        </div>

      </div>

      <ResponsiveContainer width="100%" height={320}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={4}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}