import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getAttendance } from "../../services/attendanceService";

export default function AttendancePieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getAttendance();

    const checkIn = res.data.filter(
      (a) => a.status === "Check In"
    ).length;

    const checkOut = res.data.filter(
      (a) => a.status === "Check Out"
    ).length;

    setData([
      {
        name: "Check In",
        value: checkIn,
      },
      {
        name: "Check Out",
        value: checkOut,
      },
    ]);
  };

  const COLORS = ["#2563eb", "#22c55e"];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-5">
        Attendance Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}