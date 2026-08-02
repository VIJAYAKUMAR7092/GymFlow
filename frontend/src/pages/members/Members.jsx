import { useEffect, useState } from "react";
import { getMembers, deleteMember } from "../../services/memberService";
import MemberForm from "../../components/members/MemberForm";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaUserPlus,
  FaUsers,
  FaMale,
  FaFemale,
  FaCheckCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";



export default function Members() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const res = await getMembers();
      setMembers(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const totalMembers = members.length;

const activeMembers = members.filter(
  (m) => m.status === "Active"
).length;

const maleMembers = members.filter(
  (m) => m.gender === "Male"
).length;

const femaleMembers = members.filter(
  (m) => m.gender === "Female"
).length;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?",
    );

    if (!confirmDelete) return;

    try {
      await deleteMember(id);
      toast.success("Member deleted successfully");
      loadMembers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete member");
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowForm(true);
  };
  const filteredMembers = members.filter((member) =>
    `${member.first_name} ${member.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  
const inactiveMembers = members.length - activeMembers;

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FaUsers className="text-blue-600" />
              Members
            </h1>

            <p className="text-gray-500 mt-2">
              Total Members : {members.length}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedMember(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <FaUserPlus />
            Add Member
          </button>
        </div>

        <div className="mt-6 relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

  <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-lg">
    <FaUsers className="text-3xl mb-3" />
    <h3 className="text-lg">Total Members</h3>
    <p className="text-4xl font-bold">{totalMembers}</p>
  </div>

  <div className="bg-green-600 text-white rounded-2xl p-5 shadow-lg">
    <FaCheckCircle className="text-3xl mb-3" />
    <h3 className="text-lg">Active</h3>
    <p className="text-4xl font-bold">{activeMembers}</p>
  </div>

  <div className="bg-sky-600 text-white rounded-2xl p-5 shadow-lg">
    <FaMale className="text-3xl mb-3" />
    <h3 className="text-lg">Male</h3>
    <p className="text-4xl font-bold">{maleMembers}</p>
  </div>

  <div className="bg-pink-600 text-white rounded-2xl p-5 shadow-lg">
    <FaFemale className="text-3xl mb-3" />
    <h3 className="text-lg">Female</h3>
    <p className="text-4xl font-bold">{femaleMembers}</p>
  </div>

</div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((member) => (
              <tr
  key={member.id}
  className="border-b hover:bg-blue-50 transition duration-300"
>
                <td className="p-4">

  <div className="flex items-center gap-4">

    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

      {member.first_name.charAt(0)}
      {member.last_name.charAt(0)}

    </div>

    <div>

      <h3 className="font-semibold">
        {member.first_name} {member.last_name}
      </h3>

      <p className="text-sm text-gray-500">
        Member #{member.id}
      </p>

    </div>

  </div>

</td>

                <td className="p-3">{member.phone}</td>

                <td className="p-3">{member.gender}</td>

                <td className="p-3">
                  <span
  className={`px-4 py-2 rounded-full text-sm font-semibold ${
    member.status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {member.status}
</span>
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-3">

  <button
    onClick={() => handleEdit(member)}
    className="bg-yellow-100 hover:bg-yellow-500 hover:text-white text-yellow-700 p-3 rounded-xl transition"
    title="Edit Member"
  >
    <FaEdit />
  </button>

  <button
    onClick={() => handleDelete(member.id)}
    className="bg-red-100 hover:bg-red-600 hover:text-white text-red-700 p-3 rounded-xl transition"
    title="Delete Member"
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
        <MemberForm
          member={selectedMember}
          onClose={() => {
            setShowForm(false);
            setSelectedMember(null);
          }}
          onSuccess={loadMembers}
        />
      )}
    </div>
  );
}
