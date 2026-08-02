import { useState, useEffect } from "react";
import {
  createAttendance,
  updateAttendance,
} from "../../services/attendanceService";
import { getMembers } from "../../services/memberService";
import toast from "react-hot-toast";

export default function AttendanceForm({
  onClose,
  attendance = null,
  onSuccess,
}) {
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    member: attendance?.member || "",
    date: attendance?.date || new Date().toISOString().split("T")[0],
    status: attendance?.status || "Check In",
    notes: attendance?.notes || "",
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const res = await getMembers();
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (attendance) {
        await updateAttendance(attendance.id, formData);
        toast.success("Attendance Updated Successfully");
      } else {
        await createAttendance(formData);
        toast.success("Attendance Added Successfully");
      }

      if (onSuccess) {
        await onSuccess();
      }

      onClose();
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.error(err.response.data);
        alert(JSON.stringify(err.response.data));
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[500px] shadow-xl">
        <h2 className="text-2xl font-bold mb-5">
          {attendance ? "Edit Attendance" : "Mark Attendance"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="member"
            value={formData.member}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >
            <option value="">Select Member</option>

            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.first_name} {member.last_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="Check In">Check In</option>
            <option value="Check Out">Check Out</option>
          </select>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="w-full border p-3 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {attendance ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
