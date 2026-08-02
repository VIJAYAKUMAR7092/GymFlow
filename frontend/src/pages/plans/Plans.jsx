import { useEffect, useState } from "react";
import {
  getPlans,
  deletePlan,
} from "../../services/planService";
import PlanForm from "../../components/plans/PlanForm";

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaDumbbell,
  FaCheckCircle,
} from "react-icons/fa";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await getPlans();
      setPlans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plan?"
    );

    if (!confirmDelete) return;

    try {
      await deletePlan(id);
      alert("Plan deleted successfully");
      loadPlans();
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedPlan(null);
    setShowForm(true);
  };
  const activePlans = plans.filter(
  (p) => p.is_active
).length;

const inactivePlans =
  plans.length - activePlans;

const filteredPlans = plans.filter((plan) =>
  plan.name
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div className="p-6">

      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl mb-8">

  <div className="flex justify-between items-center">

    <div>

      <h1 className="text-4xl font-bold flex items-center gap-3">

        <FaDumbbell />

        Membership Plans

      </h1>

      <p className="mt-2 text-purple-100">

        Manage all gym membership plans.

      </p>

    </div>

    <button
      onClick={handleAdd}
      className="bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-100 transition flex items-center gap-2"
    >
      <FaPlus />
      Add Plan
    </button>

  </div>

  <div className="mt-6 relative">

    <FaSearch className="absolute left-4 top-4 text-gray-400" />

    <input
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search Plan..."
      className="w-full rounded-xl pl-12 pr-4 py-4 text-gray-700 outline-none"
    />

  </div>

</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

  <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-6">

    <h3>Total Plans</h3>

    <p className="text-4xl font-bold mt-2">

      {plans.length}

    </p>

  </div>

  <div className="bg-green-600 text-white rounded-2xl shadow-lg p-6">

    <FaCheckCircle className="text-3xl mb-3" />

    <h3>Active Plans</h3>

    <p className="text-4xl font-bold">

      {activePlans}

    </p>

  </div>

  <div className="bg-red-500 text-white rounded-2xl shadow-lg p-6">

    <h3>Inactive Plans</h3>

    <p className="text-4xl font-bold">

      {inactivePlans}

    </p>

  </div>

</div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800 text-white">
  <tr>
    <th className="p-4 text-left">Plan</th>
    <th className="p-4 text-left">Duration</th>
    <th className="p-4 text-left">Price</th>
    <th className="p-4 text-left">Status</th>
    <th className="p-4 text-center">Actions</th>
  </tr>
</thead>

          <tbody>

            {filteredPlans.map((plan) => (

              <tr
  key={plan.id}
  className="border-b hover:bg-purple-50 transition duration-300"
>

                <td className="p-4">

  <div className="flex items-center gap-4">

    <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">

      {plan.name.charAt(0)}

    </div>

    <div>

      <h3 className="font-semibold">

        {plan.name}

      </h3>

      <p className="text-sm text-gray-500">

        Plan #{plan.id}

      </p>

    </div>

  </div>

</td>

                <td className="p-4 font-medium">
  {plan.duration}
</td>

                <td className="p-4">

  <span className="font-bold text-green-600">

    ₹{plan.price}

  </span>

</td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      plan.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {plan.is_active ? "Active" : "Inactive"}
                  </span>

                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => handleEdit(plan)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
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

        <PlanForm
          plan={selectedPlan}
          onClose={() => {
            setShowForm(false);
            setSelectedPlan(null);
          }}
          onSuccess={loadPlans}
        />

      )}

    </div>
  );
}