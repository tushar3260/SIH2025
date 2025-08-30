import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  IndianRupee,
  Leaf,
  AlertCircle,
  CheckCircle2,
  Loader2,
  User,
} from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // therapyId from URL

  // Safe user getter
  const getUserData = () => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const userData = getUserData();
  console.log("userData:", userData); // Debug log
  const patientId = userData?.id || userData?._id || null;

  console.log("Raw localStorage user:", localStorage.getItem("user")); // Debug
  console.log("Parsed userData:", userData); // Debug
  console.log("Extracted patientId:", patientId); // Debug

  // Local-time-safe today for min attribute
  const todayLocal = useMemo(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }, []);

  const [therapy, setTherapy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({ date: "", time: "", notes: "" });

  // Fetch therapy by ID
  useEffect(() => {
    const fetchTherapy = async () => {
      if (!id) {
        setError("Invalid therapy ID");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/api/therapies/${id}`);
        setTherapy(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load therapy information. Try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTherapy();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userData || !patientId) {
      setError("Please log in to book an appointment");
      return;
    }
    if (!therapy || !therapy._id) {
      setError("Therapy information not available");
      return;
    }
    if (!formData.date || !formData.time) {
      setError("Please select both date and time");
      return;
    }

    setSubmitting(true);
    try {
      const startLocal = new Date(`${formData.date}T${formData.time}`);
      if (isNaN(startLocal.getTime())) throw new Error("Invalid date/time");

      // Check if appointment is in the future
      const now = new Date();
      if (startLocal <= now) {
        setError("Please select a future date and time");
        setSubmitting(false);
        return;
      }

      // Updated payload - use userData._id and add role check
      const payload = {
        patientId: userData._id || userData.id, // Try both possible field names
        therapyId: therapy._id,
        start: startLocal.toISOString(),
        notes: formData.notes.trim(),
      };

      console.log("User data:", userData); // Debug user data
      console.log("Booking payload:", payload); // Debug log

      const response = await axios.post("http://localhost:5000/api/appointments", payload, {
        timeout: 15000,
        headers: { "Content-Type": "application/json" },
      });

      console.log("Booking response:", response.data); // Debug log

      setSuccess("Appointment booked successfully! Redirecting...");
      setFormData({ date: "", time: "", notes: "" });
      setTimeout(() => navigate("/appointments"), 2000); // Changed from /therapies to /appointments
    } catch (err) {
      console.error("Booking error:", err); // Debug log
      let message = err.response?.data?.error || err.message || "Failed to book appointment";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <Loader2 className="animate-spin text-green-600 mx-auto mb-4" size={40} />
          <p className="text-gray-600">Loading therapy information...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-green-50 to-white">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-xl font-bold text-red-700 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to book an appointment</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (error && !therapy) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-green-50 to-white">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Therapy</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/therapies")}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Therapies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-green-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-xl rounded-2xl max-w-lg w-full p-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700 flex items-center justify-center gap-2 mb-2">
            <Leaf className="text-green-500" /> Book Appointment
          </h2>
          <p className="text-gray-600">Schedule your therapy session</p>
        </div>

        {/* Therapy Info */}
        {therapy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100"
          >
            <h3 className="text-lg font-semibold text-green-800 mb-1">{therapy.name}</h3>
            {therapy.description && (
              <p className="text-gray-600 text-sm mb-2">{therapy.description}</p>
            )}
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 text-green-600 font-medium">
                <IndianRupee size={16} /> ₹{therapy.price}
              </p>
              <p className="flex items-center gap-1 text-gray-600 text-sm">
                <Clock size={14} /> {therapy.duration} min
              </p>
            </div>
          </motion.div>
        )}

        {/* Error/Success Messages */}
        {error && <Message type="error" text={error} />}
        {success && <Message type="success" text={success} />}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputDate 
            label="Appointment Date" 
            name="date" 
            value={formData.date} 
            min={todayLocal} 
            onChange={handleChange} 
            disabled={submitting}
            required
          />
          
          <InputTime 
            label="Appointment Time" 
            name="time" 
            value={formData.time} 
            onChange={handleChange} 
            disabled={submitting}
            required
          />
          
          <InputTextArea 
            label="Additional Notes (Optional)" 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            disabled={submitting}
            placeholder="Any specific requirements or preferences..."
          />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/therapies")}
              disabled={submitting}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !formData.date || !formData.time}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Booking...
                </>
              ) : (
                "Book Appointment"
              )}
            </button>
          </div>
        </form>

        {/* User Info Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
          <User size={16} className="text-green-500" />
          <span>
            Booking as: <strong className="text-green-700">{userData?.name || userData?.email}</strong>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

// Helper Components
const Message = ({ type, text }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className={`mb-4 p-4 border rounded-lg flex items-center gap-2 ${
      type === "error" 
        ? "bg-red-50 border-red-200 text-red-700" 
        : "bg-green-50 border-green-200 text-green-700"
    }`}
  >
    {type === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
    <span>{text}</span>
  </motion.div>
);

const InputDate = ({ label, ...props }) => (
  <div>
    <label className="block font-medium mb-2 flex items-center gap-2 text-gray-700">
      <Calendar size={18} className="text-green-500" /> {label}
    </label>
    <input
      type="date"
      {...props}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 disabled:bg-gray-50 transition-colors"
    />
  </div>
);

const InputTime = ({ label, ...props }) => (
  <div>
    <label className="block font-medium mb-2 flex items-center gap-2 text-gray-700">
      <Clock size={18} className="text-green-500" /> {label}
    </label>
    <input
      type="time"
      {...props}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 disabled:bg-gray-50 transition-colors"
    />
  </div>
);

const InputTextArea = ({ label, ...props }) => (
  <div>
    <label className="block font-medium mb-2 text-gray-700">{label}</label>
    <textarea
      {...props}
      rows="3"
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 disabled:bg-gray-50 resize-none transition-colors"
    />
  </div>
);

export default BookAppointment;