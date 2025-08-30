import React, { useState } from "react";
import axios from "axios";

const PractitionerForm = ({ userId, onSuccess }) => {
  const [formData, setFormData] = useState({
    specialty: "",
    availability: [
      { weekday: 1, slots: [{ start: "09:00", end: "13:00" }] },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // ✅ Clear previous errors
    setSuccess(false); // ✅ Clear previous success
    
    userId = JSON.parse(localStorage.getItem('user')).id;

    try {
      const res = await axios.post("http://localhost:5000/api/practitioners", {
        user: userId, 
        specialty: [formData.specialty],
        availability: formData.availability,
      });
      
      console.log(res.data);
      
      // ✅ Check if response is successful
      if (res.data && res.data._id) {
        localStorage.setItem("practioner", JSON.stringify(res.data));
        setSuccess(true);
        setError(""); // ✅ Make sure error is cleared
        
        if (onSuccess) onSuccess(res.data);
        
        // ✅ Optional: Reset form after success
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        throw new Error("Invalid response from server");
      }
      
    } catch (err) {
      console.error("Error creating practitioner:", err);
      setError(err.response?.data?.error || err.message || "Something went wrong");
      setSuccess(false); // ✅ Clear success on error
    } finally {
      setLoading(false); // ✅ Always set loading false
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Practitioner Setup</h2>

      {/* ✅ Fixed conditional rendering */}
      {error && !success && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && !error && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          Practitioner created successfully!
        </div>
      )}

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

        {/* Availability */}
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
          className={`w-full p-2 rounded text-white font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? "Creating..." : "Create Practitioner"}
        </button>
      </form>
    </div>
  );
};


export default PractitionerForm;
