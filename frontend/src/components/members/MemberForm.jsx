import { useState } from "react";
import {
  createMember,
  updateMember,
} from "../../services/memberService";
import toast from "react-hot-toast";


export default function MemberForm({
  onClose,
  member = null,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
  first_name: member?.first_name || "",
  last_name: member?.last_name || "",
  gender: member?.gender || "Male",
  date_of_birth: member?.date_of_birth || "",
  phone: member?.phone || "",
  email: member?.email || "",
  address: member?.address || "",
  emergency_contact: member?.emergency_contact || "",
  height: member?.height || "",
  weight: member?.weight || "",
  join_date:
    member?.join_date ||
    new Date().toISOString().split("T")[0],
  status: member?.status || "Active",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (member) {
      await updateMember(member.id, formData);
      toast.success("Member Updated Successfully");
    } else {
      await createMember(formData);
      toast.success("Member Added Successfully");
    }

    if (onSuccess) {
      onSuccess();
    }
onClose();
  } catch (error) {
    console.error(error.response?.data || error);
    toast.error("Operation Failed");
  }
};
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-2xl font-bold mb-5">
  {member ? "Edit Member" : "Add Member"}
</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
  name="first_name"
  value={formData.first_name}
  placeholder="First Name"
  className="w-full border p-3 rounded"
  onChange={handleChange}
/>

          <input
            name="last_name"
            value={formData.last_name}
            placeholder="Last Name"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="email"
            value={formData.email}
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />
          <input
  type="date"
  name="date_of_birth"
  value={formData.date_of_birth}
  className="w-full border p-3 rounded"
  onChange={handleChange}
/>

<textarea
  name="address"
  value={formData.address}
  placeholder="Address"
  className="w-full border p-3 rounded"
  onChange={handleChange}
/>

<input
  name="emergency_contact"
  value={formData.emergency_contact}
  placeholder="Emergency Contact"
  className="w-full border p-3 rounded"
  onChange={handleChange}
/>

<input
  type="number"
  name="height"
  value={formData.height}
  placeholder="Height (cm)"
  className="w-full border p-3 rounded"
  onChange={handleChange}
/>

<input
  type="number"
  name="weight"
  value={formData.weight}
  placeholder="Weight (kg)"
  className="w-full border p-3 rounded"
  onChange={handleChange}
/>

          <select
  name="gender"
  value={formData.gender}
  className="w-full border p-3 rounded"
  onChange={handleChange}
>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {member ? "Update" : "Save"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}