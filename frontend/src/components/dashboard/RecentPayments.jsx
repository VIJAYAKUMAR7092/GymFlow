import { useEffect, useState } from "react";
import { getPayments } from "../../services/paymentService";

export default function RecentPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const res = await getPayments();
      setPayments(res.data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        💰 Recent Payments
      </h2>

      <div className="space-y-4">

        {payments.map((payment) => (

          <div
            key={payment.id}
            className="flex justify-between items-center border-b pb-4"
          >

            <div>

              <h3 className="font-semibold">
                Subscription #{payment.subscription}
              </h3>

              <p className="text-gray-500 text-sm">
                {payment.payment_method}
              </p>

            </div>

            <div className="text-right">

              <p className="font-bold text-green-600">
                ₹{payment.amount}
              </p>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  payment.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {payment.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}