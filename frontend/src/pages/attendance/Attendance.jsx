import { useEffect, useState } from "react";
import {
  getAttendance,
  deleteAttendance,
} from "../../services/attendanceService";
import AttendanceForm from "../../components/attendance/AttendanceForm";
import {
  FaClipboardCheck,
  FaUserCheck,
  FaCalendarDay,
} from "react-icons/fa";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await getAttendance();
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const totalAttendance = attendance.length;

const presentCount = attendance.filter(
  (a) => a.status === "Present"
).length;

const today = new Date().toISOString().split("T")[0];

const todayAttendance = attendance.filter(
  (a) => a.date === today
).length;
  const filteredAttendance = attendance.filter((item) =>
  item.member.toString().includes(search)
);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAttendance(id);
      alert("Attendance Deleted Successfully");
      loadAttendance();
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  return (
    <div className="p-6">

      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white shadow-xl mb-8">

  <div className="flex justify-between items-center">

    <div>
      <h1 className="text-4xl font-bold">
        📅 Attendance Management
      </h1>

      <p className="text-green-100 mt-2">
        Track daily member attendance.
      </p>
    </div>

    <button
  onClick={() => {
    setSelectedAttendance(null);
    setShowForm(true);
  }}
  className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-50 transition"
>
  + Mark Attendance
</button>

  </div>

  <input
    type="text"
    placeholder="🔍 Search by Member ID..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="mt-6 w-full rounded-xl px-5 py-4 text-gray-700 outline-none"
  />

</div>
<div className="grid grid-cols-3 gap-6 mb-8">

  <div className="bg-white rounded-2xl shadow-lg p-6">
    <p className="text-gray-500">Today's Records</p>

    <h2 className="text-4xl font-bold text-green-600 mt-3">
      {attendance.length}
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6">
    <p className="text-gray-500">Check In</p>

    <h2 className="text-4xl font-bold text-blue-600 mt-3">
      {
        attendance.filter(
          (a) => a.status === "Check In"
        ).length
      }
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6">
    <p className="text-gray-500">Check Out</p>

    <h2 className="text-4xl font-bold text-red-600 mt-3">
      {
        attendance.filter(
          (a) => a.status === "Check Out"
        ).length
      }
    </h2>
  </div>

</div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

  <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-lg">
    <FaClipboardCheck className="text-3xl mb-3" />
    <h3>Total Records</h3>
    <p className="text-4xl font-bold">
      {totalAttendance}
    </p>
  </div>

  <div className="bg-green-600 text-white rounded-2xl p-5 shadow-lg">
    <FaUserCheck className="text-3xl mb-3" />
    <h3>Present</h3>
    <p className="text-4xl font-bold">
      {presentCount}
    </p>
  </div>

  <div className="bg-orange-500 text-white rounded-2xl p-5 shadow-lg">
    <FaCalendarDay className="text-3xl mb-3" />
    <h3>Today's Entries</h3>
    <p className="text-4xl font-bold">
      {todayAttendance}
    </p>
  </div>

</div>
<div className="relative mb-5">

  <input
    type="text"
    placeholder="Search Member..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
  />

</div>


        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-3">Member</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredAttendance.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-blue-50 transition duration-300">

                <td className="p-4">
  <div className="flex items-center gap-3">

    <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
      M
    </div>

    <div>
      <h3 className="font-semibold">
        Member #{item.member}
      </h3>

      <p className="text-sm text-gray-500">
        Gym Member
      </p>
    </div>

  </div>
</td>

                <td className="p-3">
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {item.time.slice(0,5)}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Check In"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => {
                        setSelectedAttendance(item);
                        setShowForm(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showForm && (
        <AttendanceForm
          attendance={selectedAttendance}
          onClose={() => {
            setShowForm(false);
            setSelectedAttendance(null);
          }}
          onSuccess={loadAttendance}
        />
      )}

    </div>
  );
}