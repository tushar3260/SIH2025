import React, { useState } from "react";
import axios from "axios";

const PractitionerForm = ({ userId, onSuccess }) => {
  const [formData, setFormData] = useState({
    specialty: "",
    availability: [
      { weekday: 1, slots: [{ start: "09:00", end: "13:00" }] }, // default Monday slot
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    userId = JSON.parse(localStorage.getItem('user')).id;

    try {
      const res = await axios.post("http://localhost:5000/api/practitioners", {
        user: userId, 
        specialty: [formData.specialty],
        availability: formData.availability,
      });
      console.log(res.data)
      localStorage.setItem("practioner",JSON.stringify(res.data))
      

      setSuccess(true);
      setLoading(false);
      localStorage.setItem("part")
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Practitioner Setup</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">Practitioner created!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Specialty Input */}
        <div>
          <label className="block text-sm font-medium">Specialty</label>
          <input
            type="text"
            value={formData.specialty}
            onChange={(e) =>
              setFormData({ ...formData, specialty: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="e.g. Ayurveda, Panchakarma"
            required
          />
        </div>

        {/* Availability (basic input for now) */}
        <div>
          <label className="block text-sm font-medium">Default Availability</label>
          <div className="flex gap-2">
            <input
              type="time"
              value={formData.availability[0].slots[0].start}
              onChange={(e) => {
                const updated = [...formData.availability];
                updated[0].slots[0].start = e.target.value;
                setFormData({ ...formData, availability: updated });
              }}
              className="border p-2 rounded"
              required
            />
            <span>to</span>
            <input
              type="time"
              value={formData.availability[0].slots[0].end}
              onChange={(e) => {
                const updated = [...formData.availability];
                updated[0].slots[0].end = e.target.value;
                setFormData({ ...formData, availability: updated });
              }}
              className="border p-2 rounded"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Create Practitioner"}
        </button>
      </form>
    </div>
  );
};

export default PractitionerForm;
