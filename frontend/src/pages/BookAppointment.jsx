import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, IndianRupee, Leaf } from "lucide-react";
import axios from "axios"; // 👈 direct axios use kar rahe hain
import { motion } from "framer-motion";

const BookAppointment = () => {
  const { id } = useParams(); // therapy id from URL
  const navigate = useNavigate();

  const [therapy, setTherapy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    const fetchTherapy = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/therapies/${id}`);
        setTherapy(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load therapy details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTherapy();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/appointments", {
        ...formData,
        therapyId: therapy._id,
      });
      alert("Appointment booked successfully!");
      navigate("/therapies");
    } catch (err) {
      console.error(err);
      alert("Failed to book appointment");
    }
  };

  if (loading)
    return <p className="p-6 text-gray-600 animate-pulse">Loading therapy...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-emerald-100 p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <Leaf className="text-emerald-600" size={32} />
            <h1 className="text-4xl font-extrabold text-emerald-700">
              Book Appointment
            </h1>
          </div>
          <p className="mt-2 text-gray-600">
            Confirm your slot for <b>{therapy?.name}</b>
          </p>
        </div>

        {/* Therapy Details */}
        <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {therapy.name}
          </h2>
          <p className="text-gray-600 mb-4">{therapy.description}</p>
          <div className="flex justify-between text-sm font-medium">
            <span className="flex items-center gap-1 text-emerald-700">
              <Clock size={18} /> {therapy.duration} min
            </span>
            <span className="flex items-center gap-1 text-amber-700">
              <IndianRupee size={18} /> {therapy.price}
            </span>
          </div>
        </div>

        {/* Appointment Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Notes (optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 
              bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-semibold 
              shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-amber-600 
              transition-all duration-300"
          >
            <Calendar size={18} /> Confirm Appointment
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookAppointment;
