import { useEffect, useState } from "react";
import {
  getPendingUsers,
  approveUser,
  rejectUser,
} from "../../services/pendingUserService";

import toast from "react-hot-toast";

export default function PendingUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getPendingUsers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load pending users");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveUser(id);

      toast.success("User Approved");

      loadUsers();
    } catch (err) {
      console.log(err);
      toast.error("Approval Failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectUser(id);

      toast.success("User Rejected");

      loadUsers();
    } catch (err) {
      console.log(err);
      toast.error("Reject Failed");
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Pending Registrations
      </h1>

      <div className="space-y-4">

        {users.length === 0 ? (
          <p>No Pending Users</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="border rounded-xl p-5 flex justify-between items-center shadow"
            >
              <div>
                <h2 className="font-bold">
                  {user.username}
                </h2>

                <p>{user.email}</p>

                <p>{user.phone}</p>
              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => handleApprove(user.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(user.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}