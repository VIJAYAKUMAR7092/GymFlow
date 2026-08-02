export default function AttendanceProgress() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-6">
        Today's Attendance
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-5">

        <div
          className="bg-green-500 h-5 rounded-full"
          style={{ width: "92%" }}
        ></div>

      </div>

      <p className="mt-5 text-lg font-semibold">
        92 / 100 Members
      </p>

    </div>
  );
}