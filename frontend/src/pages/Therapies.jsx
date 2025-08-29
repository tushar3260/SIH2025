import React, { useEffect, useState } from "react";
import { Clock, IndianRupee, Leaf, Calendar } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const Therapies = () => {
  const [therapies, setTherapies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/therapies");
        setTherapies(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch therapies.");
      } finally {
        setLoading(false);
      }
    };

    fetchTherapies();
  }, []);

  if (loading)
    return (
      <p className="p-6 text-gray-600 animate-pulse">Loading therapies...</p>
    );
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2">
          <Leaf className="text-emerald-600" size={32} />
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
            Therapies
          </h1>
        </div>
        <p className="mt-3 text-gray-600 text-lg">
          Explore our curated Panchakarma and Ayurveda therapies for healing,
          detox, and rejuvenation 🌿
        </p>
      </div>

      {/* Therapies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {therapies.map((therapy, i) => (
          <motion.div
            key={therapy._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 border border-emerald-100 hover:border-emerald-200 transition-all duration-300 flex flex-col"
          >
            <div className="p-6 flex flex-col flex-grow">
              {/* Therapy Code */}
              <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">
                {therapy.code}
              </span>

              {/* Therapy Name */}
              <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
                {therapy.name}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm flex-grow mb-5 leading-relaxed">
                {therapy.description || "No description available"}
              </p>

              {/* Duration & Price */}
              <div className="flex justify-between items-center text-sm font-medium mb-5">
                <span className="flex items-center gap-1 text-emerald-700">
                  <Clock size={18} /> {therapy.duration} min
                </span>
                <span className="flex items-center gap-1 text-amber-700">
                  <IndianRupee size={18} /> {therapy.price}
                </span>
              </div>

              {/* Created At */}
              <p className="text-xs text-gray-400 mb-4">
                Added on {new Date(therapy.createdAt).toLocaleDateString()}
              </p>

              {/* Book Appointment Button */}
              <button
                onClick={() => alert(`Booking appointment for ${therapy.name}`)}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 
                bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-semibold 
                shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-amber-600 
                transition-all duration-300"
              >
                <Calendar size={18} /> Book Appointment
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Therapies;
