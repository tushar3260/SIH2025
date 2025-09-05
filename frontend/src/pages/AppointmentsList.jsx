// src/components/AppointmentsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, User, Loader2, AlertCircle } from "lucide-react";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/appointments/me/${userId}`
        );
        setAppointments(res.data);
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to fetch appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
        <span className="ml-2 text-gray-600">Loading appointments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-100 text-red-600 rounded-lg">
        <AlertCircle className="w-5 h-5 mr-2" />
        {error}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No appointments found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appt) => (
        <div
          key={appt._id}
          className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg text-gray-800">
              {appt.therapy?.name || "Unknown Therapy"}
            </h2>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                appt.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : appt.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : appt.status === "completed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {appt.status}
            </span>
          </div>

          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              {new Date(appt.start).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              {new Date(appt.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(appt.end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              {appt.practitioner?.user?.name || "Unknown Practitioner"}
            </div>
          </div>

          {appt.notes && (
            <p className="mt-2 text-sm text-gray-700 italic">
              Notes: {appt.notes}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;
