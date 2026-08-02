import { useState } from "react";
import {
  createPlan,
  updatePlan,
} from "../../services/planService";
import toast from "react-hot-toast";

export default function PlanForm({
  onClose,
  plan = null,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    duration: plan?.duration || "Monthly",
    price: plan?.price || "",
    description: plan?.description || "",
    is_active: plan?.is_active ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (plan) {
        await updatePlan(plan.id, formData);
        toast.success("Plans Updated Successfully");
      } else {
        await createPlan(formData);
        toast.success("Plans Added Successfully");
      }

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Operation Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          {plan ? "Edit Plan" : "Add Plan"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Plan Name"
            className="w-full border p-3 rounded"
          />

          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Half Yearly</option>
            <option>Yearly</option>
          </select>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-3 rounded"
          />

          <label className="flex gap-3">

            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />

            Active Plan

          </label>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {plan ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}