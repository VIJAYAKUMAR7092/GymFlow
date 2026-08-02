import { useEffect, useState } from "react";
import {
  getSettings,
  createSettings,
  updateSettings,
} from "../../services/settingsService";

import {
  FaCog,
  FaSave,
  FaImage,
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Settings() {
  const [settingId, setSettingId] = useState(null);

  const [formData, setFormData] = useState({
    gym_name: "",
    owner_name: "",
    email: "",
    phone: "",
    address: "",
    opening_time: "",
    closing_time: "",
    logo: null,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await getSettings();

      if (res.data.length > 0) {
        setSettingId(res.data[0].id);
        setFormData(res.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  setFormData({
    ...formData,
    [name]: files ? files[0] : value,
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  data.append("gym_name", formData.gym_name);
  data.append("owner_name", formData.owner_name);
  data.append("email", formData.email);
  data.append("phone", formData.phone);
  data.append("address", formData.address);
  data.append("opening_time", formData.opening_time);
  data.append("closing_time", formData.closing_time);

  if (formData.logo instanceof File) {
    data.append("logo", formData.logo);
  }

  try {
    if (settingId) {
      await updateSettings(settingId, data);
      alert("Settings Updated Successfully");
    } else {
      await createSettings(data);
      alert("Settings Saved Successfully");
    }

    loadSettings();

  } catch (err) {
    console.error(err.response?.data || err);
    alert("Operation Failed");
  }
};

  return (
    <div className="p-6">

      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-3xl p-8 text-white shadow-xl mb-8">

  <div className="flex items-center gap-4">

    <div className="bg-white/20 p-4 rounded-2xl">

      <FaCog size={34} />

    </div>

    <div>

      <h1 className="text-4xl font-bold">
        Gym Settings
      </h1>

      <p className="text-slate-300 mt-2">
        Configure your gym information and branding.
      </p>

    </div>

  </div>

</div>

      <form
  onSubmit={handleSubmit}
  className="bg-white rounded-3xl shadow-xl p-8"
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"></div>
        <div className="space-y-5">
        <input
        
          name="gym_name"
          value={formData.gym_name}
          onChange={handleChange}
          placeholder="Gym Name"
          className="w-full border p-3 rounded"
        />
        

        <input
          name="owner_name"
          value={formData.owner_name}
          onChange={handleChange}
          placeholder="Owner Name"
          className="w-full border p-3 rounded"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-3 rounded"
        />
        <input
  type="file"
  name="logo"
  accept="image/*"
  onChange={handleChange}
  className="w-full border p-3 rounded"
/>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-3 rounded"
        />

        <div className="grid grid-cols-2 gap-4">

          <input
            type="time"
            name="opening_time"
            value={formData.opening_time}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="time"
            name="closing_time"
            value={formData.closing_time}
            onChange={handleChange}
            className="border p-3 rounded"
          />
          </div>

        </div>
<div className="space-y-6">

  <div className="bg-slate-50 rounded-2xl p-6 border">

    <h2 className="text-xl font-bold mb-5 flex items-center gap-3">

      <FaImage className="text-blue-600" />

      Gym Logo

    </h2>

    {formData.logo &&
    typeof formData.logo === "string" ? (

      <img
        src={formData.logo}
        alt="Logo"
        className="w-36 h-36 object-cover rounded-xl border mb-5"
      />

    ) : (

      <div className="w-36 h-36 rounded-xl bg-slate-200 flex items-center justify-center mb-5">

        <FaImage
          size={45}
          className="text-gray-500"
        />

      </div>

    )}

    <input
      type="file"
      name="logo"
      accept="image/*"
      onChange={handleChange}
      className="w-full border rounded-xl p-3"
    />

  </div>

  <div className="bg-slate-50 rounded-2xl p-6 border">

    <h2 className="text-xl font-bold mb-4">
      Preview
    </h2>

    <div className="space-y-3 text-gray-700">

      <p>
        <FaUserTie className="inline mr-2 text-blue-600" />
        {formData.owner_name || "-"}
      </p>

      <p>
        <FaEnvelope className="inline mr-2 text-green-600" />
        {formData.email || "-"}
      </p>

      <p>
        <FaPhone className="inline mr-2 text-orange-500" />
        {formData.phone || "-"}
      </p>

      <p>
        <FaMapMarkerAlt className="inline mr-2 text-red-500" />
        {formData.address || "-"}
      </p>

      <p>
        <FaClock className="inline mr-2 text-purple-600" />
        {formData.opening_time} - {formData.closing_time}
      </p>

    </div>

  </div>

</div>
        <div className="mt-8">

  <button
    className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 shadow-lg"
  >

    <FaSave />

    Save Settings

  </button>

</div>

      </form>

    </div>
  );
}