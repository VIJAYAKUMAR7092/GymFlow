import { useState, useEffect } from "react";
import {
  createPayment,
  updatePayment,
} from "../../services/paymentService";
import { getSubscriptions } from "../../services/subscriptionService";
import toast from "react-hot-toast";

export default function PaymentForm({
  onClose,
  payment = null,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    subscription: payment?.subscription || "",
    amount: payment?.amount || "",
    payment_method: payment?.payment_method || "Cash",
    payment_date:
      payment?.payment_date ||
      new Date().toISOString().split("T")[0],
    status: payment?.status || "Paid",
    notes: payment?.notes || "",
  });
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
  loadSubscriptions();
}, []);

const loadSubscriptions = async () => {
  try {
    const res = await getSubscriptions();
    setSubscriptions(res.data);
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
      if (payment) {
        await updatePayment(payment.id, formData);
        toast.success("Payment Updated Successfully");
      } else {
        await createPayment(formData);
        toast.success("Payment Added Successfully");
      }

      onSuccess();
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
          {payment ? "Edit Payment" : "Add Payment"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <select
  name="subscription"
  value={formData.subscription}
  onChange={handleChange}
  className="w-full border p-3 rounded"
>

  <option value="">
    Select Subscription
  </option>

  {subscriptions.map((sub) => (

    <option
      key={sub.id}
      value={sub.id}
    >
      Subscription #{sub.id}
    </option>

  ))}

</select>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border p-3 rounded"
          />

          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Bank Transfer</option>
          </select>

          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

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
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {payment ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}