import { useEffect, useState } from "react";
import {
  getPayments,
  deletePayment,
} from "../../services/paymentService";
import PaymentForm from "../../components/payments/PaymentForm";
import {
  FaMoneyBillWave,
  FaSearch,
  FaEdit,
  FaTrash,
  FaWallet,
  FaCreditCard,
  FaUniversity,
} from "react-icons/fa";


export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [search, setSearch] = useState("");

  

  useEffect(() => {
    loadPayments();
  }, []);
  

const cashPayments = payments.filter(
  (p) => p.payment_method === "Cash"
).length;

const upiPayments = payments.filter(
  (p) => p.payment_method === "UPI"
).length;

const cardPayments = payments.filter(
  (p) => p.payment_method === "Card"
).length;

  const loadPayments = async () => {
    try {
      const res = await getPayments();
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = () => {
    setSelectedPayment(null);
    setShowForm(true);
  };

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmDelete) return;

    try {
      await deletePayment(id);
      alert("Payment deleted successfully");
      loadPayments();
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };
  const filteredPayments = payments.filter((payment) =>
  payment.subscription
    .toString()
    .includes(search)
);

const totalRevenue = payments.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);

const paidCount = payments.filter(
  (p) => p.status === "Paid"
).length;

const pendingCount = payments.filter(
  (p) => p.status === "Pending"
).length;

  return (
    <div className="p-6">

      <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-3xl p-8 text-white shadow-xl mb-8">

  <div className="flex justify-between items-center">

    <div>

      <h1 className="text-4xl font-bold flex items-center gap-3">
        <FaMoneyBillWave />
        Payments
      </h1>

      <p className="mt-2 text-green-100">
        Manage all member payments.
      </p>

    </div>

    <button
      onClick={handleAdd}
      className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-100 transition"
    >
      + Add Payment
    </button>

  </div>

  <div className="mt-6">

    <div className="relative">

      <FaSearch className="absolute left-4 top-4 text-gray-400" />

      <input
        type="text"
        placeholder="Search Subscription ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl pl-12 pr-4 py-4 text-gray-700 outline-none"
      />

    </div>

  </div>

</div>
<div className="grid grid-cols-3 gap-6 mb-8">

  <div className="bg-white rounded-2xl shadow-lg p-6">

    <p className="text-gray-500">
      Total Revenue
    </p>

    <h2 className="text-4xl font-bold text-green-600 mt-2">
      ₹{totalRevenue}
    </h2>

  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6">

    <p className="text-gray-500">
      Paid
    </p>

    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      {paidCount}
    </h2>

  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6">

    <p className="text-gray-500">
      Pending
    </p>

    <h2 className="text-4xl font-bold text-red-600 mt-2">
      {pendingCount}
    </h2>

  </div>

</div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

  <div className="bg-green-600 text-white rounded-2xl p-5 shadow-lg">
    <FaMoneyBillWave className="text-3xl mb-3" />
    <h3>Total Revenue</h3>
    <p className="text-4xl font-bold">
      ₹{totalRevenue}
    </p>
  </div>

  <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-lg">
    <FaWallet className="text-3xl mb-3" />
    <h3>Cash</h3>
    <p className="text-4xl font-bold">
      {cashPayments}
    </p>
  </div>

  <div className="bg-purple-600 text-white rounded-2xl p-5 shadow-lg">
    <FaUniversity className="text-3xl mb-3" />
    <h3>UPI</h3>
    <p className="text-4xl font-bold">
      {upiPayments}
    </p>
  </div>

  <div className="bg-orange-500 text-white rounded-2xl p-5 shadow-lg">
    <FaCreditCard className="text-3xl mb-3" />
    <h3>Card</h3>
    <p className="text-4xl font-bold">
      {cardPayments}
    </p>
  </div>

</div>
<div className="mb-5">

  <input
    type="text"
    placeholder="Search Subscription ID..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
  />

</div>
        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-3 text-left">Subscription</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredPayments.map((payment) => (

              <tr
                key={payment.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-3">
                  #{payment.subscription}
                </td>

                <td className="p-3">
                  ₹{payment.amount}
                </td>

                <td className="p-3">
                  {payment.payment_method}
                </td>

                <td className="p-3">
                  {payment.payment_date}
                </td>

                <td className="p-3">

                  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      payment.status === "Paid"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {payment.status}
  </span>

                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-3">

  <button
    onClick={() => handleEdit(payment)}
    className="bg-yellow-100 text-yellow-700 hover:bg-yellow-500 hover:text-white p-3 rounded-xl transition"
    title="Edit"
  >
    <FaEdit />
  </button>

  <button
    onClick={() => handleDelete(payment.id)}
    className="bg-red-100 text-red-700 hover:bg-red-600 hover:text-white p-3 rounded-xl transition"
    title="Delete"
  >
    <FaTrash />
  </button>

</div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showForm && (

        <PaymentForm
          payment={selectedPayment}
          onClose={() => {
            setShowForm(false);
            setSelectedPayment(null);
          }}
          onSuccess={loadPayments}
        />

      )}

    </div>
  );
}