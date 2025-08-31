import React, { useState, useEffect } from "react";
import {
  Home,
  Calendar,
  List,
  TrendingUp,
  Lightbulb,
  Heart,
  Settings,
  HelpCircle,
  Activity,
  Clock,
  ArrowUp,
  FileText,
  CloudCog,
} from "lucide-react";
import { Leaf, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import HealthInfo from "./HealthInfo";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Loading from "./Loading.jsx";
const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [notifications, setNotifications] = useState(3);
  // const [loading, setLoading] = useState(false);
  const [therapies, setTherapies] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [therapyProgressData, setTherapyProgressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const user = JSON.parse(localStorage.getItem("user")); 
  const navigate = useNavigate();

  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", active: true },
    { id: "appointments", icon: Calendar, label: "Appointments", count: 2 },
    { id: "therapies", icon: List, label: "Therapies" },
    { id: "progress", icon: TrendingUp, label: "Progress" },
    { id: "recommendations", icon: Lightbulb, label: "AI Consultant" },
    { id: "health", icon: Heart, label: "Health Info" },
  ];

  const bottomNavItems = [
    { id: "logout", icon: CloudCog, label: "Logout" }
  ];

  const therapySchedule = [
    {
      therapy: "Abhyanga",
      date: "2025-08-30",
      time: "9:00 AM",
      status: "Scheduled",
      duration: "60 min",
      practitioner: "Dr. Sharma",
    },
    {
      therapy: "Shirodhara",
      date: "2025-08-31",
      time: "11:00 AM",
      status: "Confirmed",
      duration: "45 min",
      practitioner: "Dr. Patel",
    },
    {
      therapy: "Swedana",
      date: "2025-09-01",
      time: "2:00 PM",
      status: "Pending",
      duration: "30 min",
      practitioner: "Dr. Kumar",
    },
  ];

  // Updated dashboard metrics instead of health metrics
  const dashboardMetrics = [
    {
      label: "Total Appointments",
      value: appointments.length.toString(),
      unit: "",
      trend: appointments.length > 0 ? `+${appointments.length}` : "0",
      color: "emerald",
      icon: Calendar,
    },
    {
      label: "Available Therapies",
      value: therapies.length.toString(),
      unit: "",
      trend: therapies.length > 0 ? `${therapies.length} active` : "0 active",
      color: "blue",
      icon: List,
    },
    {
      label: "Completed Sessions",
      value: appointments.filter(appt => appt.status === 'completed').length.toString(),
      unit: "",
      trend: appointments.filter(appt => appt.status === 'completed').length > 0 ? "completed" : "none yet",
      color: "green",
      icon: Activity,
    },
    {
      label: "Upcoming Sessions",
      value: appointments.filter(appt => appt.status === 'scheduled' || appt.status === 'confirmed').length.toString(),
      unit: "",
      trend: appointments.filter(appt => appt.status === 'scheduled' || appt.status === 'confirmed').length > 0 ? "scheduled" : "none",
      color: "amber",
      icon: Clock,
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Helper function to format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  // Records fetch
  useEffect(() => {
    if (activeSection === "records") {
      setLoading(true);
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then((res) => res.json())
        .then((data) => {
          setRecords(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching records:", err);
          setLoading(false);
        });
    }
  }, [activeSection]);

  // Updated Therapies fetch with axios and proper API endpoint
  useEffect(() => {
    if (activeSection === "therapies" && userId) {
      setLoading(true);
      console.log("Fetching therapies for userId:", userId); // Debug log

      axios
        .get(`http://localhost:5000/api/therapies`, {
          timeout: 10000, // 10 second timeout
        })
        .then((res) => {
          console.log("Fetched Therapies Data:", res.data);
          setTherapies(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching therapies:", err);

          // Better error handling
          if (err.code === "ECONNABORTED") {
            console.error("Request timeout");
          } else if (err.response) {
            console.error(
              "Server error:",
              err.response.status,
              err.response.data
            );
          } else if (err.request) {
            console.error("Network error");
          }

          setLoading(false);
        });
    }
  }, [activeSection, userId]);

  // Fetch therapies for dashboard display
  useEffect(() => {
    if (activeSection === "dashboard") {
      axios
        .get(`http://localhost:5000/api/therapies`, {
          timeout: 10000,
        })
        .then((res) => {
          setTherapies(res.data);
        })
        .catch((err) => {
          console.error("Error fetching therapies for dashboard:", err);
        });
    }
  }, [activeSection]);

  // Appointments fetch - UPDATED to handle your API response structure
  useEffect(() => {
    if ((activeSection === "appointments" || activeSection === "progress" || activeSection === "dashboard") && userId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/appointments/me/${userId}`)
        .then((res) => {
          console.log("Fetched Appointments Data:", res.data);

          // Transform the API response to match your component's expected structure
          const transformedAppointments = res.data.map((appointment) => ({
            id: appointment._id,
            therapyName: appointment.therapy?.name || "Unknown Therapy",
            date: formatDateTime(appointment.start).date,
            time: formatDateTime(appointment.start).time,
            duration: `${appointment.therapy?.duration || 60} min`,
            practitioner:
              appointment.practitioner?.user?.name ||
              appointment.practitioner?.name ||
              "Dr. Unknown",
            status: appointment.status,
            notes: appointment.notes || "",
            endTime: formatDateTime(appointment.end).time,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt,
          }));

          setAppointments(transformedAppointments);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching appointments:", err);
          setLoading(false);

          // Fallback data if API fails
          const fallbackAppointments = [
            {
              id: 1,
              therapyName: "Abhyanga Massage",
              date: "02/09/2025",
              time: "10:00 AM",
              duration: "60 min",
              practitioner: "Dr. Sharma",
              status: "confirmed",
              notes: "Full body oil massage therapy",
            },
            {
              id: 2,
              therapyName: "Shirodhara",
              date: "05/09/2025",
              time: "2:00 PM",
              duration: "45 min",
              practitioner: "Dr. Patel",
              status: "scheduled",
              notes: "Oil pouring therapy for relaxation",
            },
          ];
          setAppointments(fallbackAppointments);
        });
    }
  }, [activeSection, userId]);

  // Generate Progress Data from appointments
  useEffect(() => {
    if (activeSection === "progress" && appointments.length > 0) {
      // Appointments per date
      const dateCounts = {};
      appointments.forEach((appt) => {
        const date = new Date(appt.date.split('/').reverse().join('-')).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
        dateCounts[date] = (dateCounts[date] || 0) + 1;
      });
      
      const chartData = Object.keys(dateCounts)
        .map((date) => ({ date, appointments: dateCounts[date] }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      
      setProgressData(chartData);

      // Therapy type distribution
      const therapyCounts = {};
      appointments.forEach((appt) => {
        therapyCounts[appt.therapyName] = (therapyCounts[appt.therapyName] || 0) + 1;
      });

      const therapyData = Object.keys(therapyCounts).map((therapy) => ({
        therapy,
        count: therapyCounts[therapy],
      }));

      setTherapyProgressData(therapyData);
    }
  }, [activeSection, appointments]);

  // Colors for pie chart
  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl grid place-items-center bg-gradient-to-br from-green-100 to-amber-100">
              <Leaf className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-green-600">
                AyurSutra
              </div>
            </div>
          </Link>
        </div>

        <div className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 shadow-sm border-l-4 border-emerald-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200 space-y-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "logout") {
                    handleLogout();
                  } else {
                    setActiveSection(item.id);
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors"
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header - Only show on dashboard */}
        {activeSection === "dashboard" && (
          <div className="bg-white shadow-sm border-b border-gray-200 p-6 flex justify-center items-center">
            <div className="flex flex-col items-center justify-center min-h-[8vh] 
                            bg-gradient-to-r from-emerald-50 via-amber-50 to-white 
                            rounded-2xl shadow-md py-12 px-6 w-full">
              <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent 
                             bg-gradient-to-r from-emerald-600 to-amber-600 drop-shadow-lg text-center">
                Welcome to AyurSutra, {user?.name || "Guest"}!
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-700 font-medium text-center">
                Embark on your personalized Ayurveda and Panchakarma wellness journey 🌿
              </p>
            </div>
          </div>
        )}

        <div className="p-6 space-y-8">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <>
              {/* Updated Dashboard Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardMetrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent
                          size={24}
                          className={`text-${metric.color}-500`}
                        />
                        <span
                          className={`flex items-center gap-1 text-sm font-medium ${
                            metric.value !== "0"
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {metric.trend}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-600 text-sm font-medium">
                          {metric.label}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {metric.value}
                          <span className="text-lg text-gray-500">
                            {metric.unit}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Therapy Schedule */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Your Upcoming Appointments
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Therapy
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Date & Time
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Duration
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Practitioner
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* Show real appointments if available, otherwise show dummy data */}
                      {appointments.length > 0 ? (
                        appointments.slice(0, 3).map((appointment) => (
                          <tr
                            key={appointment.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 font-medium text-gray-900">
                              {appointment.therapyName}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-gray-900">{appointment.date}</div>
                              <div className="text-gray-600 text-sm flex items-center gap-1">
                                <Clock size={14} />
                                {appointment.time}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {appointment.duration}
                            </td>
                            <td className="px-6 py-4 text-gray-900">
                              {appointment.practitioner}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  appointment.status
                                )}`}
                              >
                                {appointment.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        therapySchedule.map((therapy, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 font-medium text-gray-900">
                              {therapy.therapy}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-gray-900">{therapy.date}</div>
                              <div className="text-gray-600 text-sm flex items-center gap-1">
                                <Clock size={14} />
                                {therapy.time}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {therapy.duration}
                            </td>
                            <td className="px-6 py-4 text-gray-900">
                              {therapy.practitioner}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  therapy.status
                                )}`}
                              >
                                {therapy.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Show link to view all appointments */}
                <div className="p-6 border-t border-gray-200 text-center">
                  <button
                    onClick={() => setActiveSection("appointments")}
                    className="text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    View All Appointments →
                  </button>
                </div>
              </div>

              {/* Available Therapies Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Featured Therapies
                  </h2>
                  <p className="text-gray-600 mt-1">Popular Ayurveda and Panchakarma treatments</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Show real therapies if available, otherwise show dummy data */}
                    {therapies.length > 0 ? (
                      therapies.slice(0, 3).map((therapy, index) => (
                        <div 
                          key={therapy._id || index}
                          className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {therapy.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {therapy.description || "Ancient Ayurvedic therapy for wellness and healing"}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1 text-emerald-700 text-sm font-medium">
                              <Clock size={16} /> {therapy.duration || "30"} min
                            </span>
                            <span className="flex items-center gap-1 text-amber-700 text-sm font-medium">
                              <IndianRupee size={16} /> ₹{therapy.price || "1000"}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      [
                        { name: "Abhyanga Massage", desc: "Full body oil massage therapy for relaxation and detox", duration: "60", price: "2500" },
                        { name: "Shirodhara Treatment", desc: "Continuous oil pouring on forehead for mental peace", duration: "45", price: "2000" },
                        { name: "Swedana Therapy", desc: "Herbal steam bath for toxin elimination", duration: "30", price: "1500" }
                      ].map((therapy, index) => (
                        <div 
                          key={index}
                          className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {therapy.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {therapy.desc}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1 text-emerald-700 text-sm font-medium">
                              <Clock size={16} /> {therapy.duration} min
                            </span>
                            <span className="flex items-center gap-1 text-amber-700 text-sm font-medium">
                              <IndianRupee size={16} /> ₹{therapy.price}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setActiveSection("therapies")}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-amber-500 
                        text-white font-semibold rounded-xl shadow-md 
                        hover:shadow-lg hover:from-emerald-600 hover:to-amber-600 
                        transition-all duration-300"
                    >
                      Explore All Therapies →
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Progress Section */}
          {activeSection === "progress" && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress Overview</h2>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading progress data...</p>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <TrendingUp className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg">No appointment data available yet.</p>
                    <p className="text-gray-400">Book your first therapy session to see progress!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Appointments Timeline Chart */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointments Timeline</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={progressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="appointments" 
                            stroke="#10B981" 
                            strokeWidth={3}
                            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Therapy Distribution Pie Chart */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Therapy Distribution</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={therapyProgressData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ therapy, percent }) => `${therapy} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {therapyProgressData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Progress Summary Stats */}
                {appointments.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-emerald-50 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-emerald-600 mb-2">
                        {appointments.length}
                      </div>
                      <div className="text-emerald-700 font-medium">Total Sessions</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {appointments.filter(a => a.status === 'completed').length}
                      </div>
                      <div className="text-blue-700 font-medium">Completed</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-amber-600 mb-2">
                        {new Set(appointments.map(a => a.therapyName)).size}
                      </div>
                      <div className="text-amber-700 font-medium">Therapy Types</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Appointments Section */}
          {activeSection === "appointments" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Appointments
                </h2>
                <span className="text-sm text-gray-500">User ID: {userId}</span>
              </div>
              {loading ? (
                <div className="p-6">
                  <p className="text-gray-500 text-center">
                    Loading your appointments...
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Therapy
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Date & Time
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Duration
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Practitioner
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Notes
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                          <tr
                            key={appointment.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 font-medium text-gray-900">
                              {appointment.therapyName}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-gray-900">
                                {appointment.date}
                              </div>
                              <div className="text-gray-600 text-sm flex items-center gap-1">
                                <Clock size={14} />
                                {appointment.time}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {appointment.duration}
                            </td>
                            <td className="px-6 py-4 text-gray-900">
                              {appointment.practitioner}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  appointment.status
                                )}`}
                              >
                                {appointment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate">
                              {appointment.notes || "No notes"}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
                                onClick={() =>
                                  alert(
                                    `Viewing details for appointment ${appointment.id}`
                                  )
                                }
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-6 py-8 text-center text-gray-500"
                          >
                            No appointments found for this user.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Updated Therapies Section with Real API Data */}
          {activeSection === "therapies" && (
            <div className="p-8 min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2">
                  <Leaf className="text-emerald-600" size={32} />
                  <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                    Therapies
                  </h1>
                </div>
                <p className="mt-3 text-gray-600 text-lg">
                  Explore our curated Panchakarma and Ayurveda therapies for
                  healing, detox, and rejuvenation
                </p>
              </div>

              {/* Show loading state or user ID info */}
              {!userId && (
                <div className="text-center py-8">
                  <p className="text-red-600 font-medium">
                    Please login to view therapies
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {loading ? (
                  <div className="col-span-full text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading therapies...</p>
                  </div>
                ) : therapies.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">
                      No therapies found for this user.
                    </p>
                  </div>
                ) : (
                  therapies.map((therapy, i) => (
                    <motion.div
                      key={therapy._id || i}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1
                        border border-emerald-100 hover:border-emerald-200 transition-all
                        duration-300 flex flex-col"
                    >
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">
                          {therapy.code || "AYU-THERAPY"}
                        </span>

                        <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
                          {therapy.name}
                        </h2>

                        <p className="text-gray-600 text-sm flex-grow mb-5 leading-relaxed">
                          {therapy.description || "No description available"}
                        </p>

                        <div className="flex justify-between items-center text-sm font-medium mb-5">
                          <span className="flex items-center gap-1 text-emerald-700">
                            <Clock size={18} /> {therapy.duration || "30"} min
                          </span>
                          <span className="flex items-center gap-1 text-amber-700">
                            <IndianRupee size={18} /> ₹{therapy.price || "1000"}
                          </span>
                        </div>

                        <p className="text-xs text-gray-400 mb-4">
                          Added on{" "}
                          {therapy.createdAt
                            ? new Date(therapy.createdAt).toLocaleDateString()
                            : "N/A"}
                        </p>

                        {/* Updated Book Appointment Button */}
                        <button
                          onClick={() => navigate(`/book/${therapy._id}`)}
                          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4
                            bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-semibold
                            shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-amber-600
                            transition-all duration-300"
                        >
                          <Calendar size={18} /> Book Appointment
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Recommendations Section */}
          {activeSection === "recommendations" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                AI Recommendations
              </h2>

              <div className="flex flex-col items-center">
                <img
                  src="https://i.pinimg.com/1200x/8f/1c/19/8f1c191e824e0462dcbfd920553ba3a7.jpg"
                  alt="AI Personalized Consultant"
                  className="w-full max-w-2xl rounded-xl shadow-md mb-6"
                />

                <p className="text-gray-600 text-center text-lg max-w-xl mb-6">
                  Discover personalized therapy suggestions designed to restore
                  balance, relieve stress, and rejuvenate your body and mind
                  through Ayurveda and Panchakarma practices.
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => navigate("/ai-consultant")}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-amber-500 
                    text-white font-semibold rounded-xl shadow-md 
                    hover:shadow-lg hover:from-emerald-600 hover:to-amber-600 
                    transition-all duration-300"
                >
                  Get AI Consultant
                </button>
              </div>
            </div>
          )}

          {/* Health Info Section */}
          {activeSection === "health" && <HealthInfo />}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Settings</h3>
                  <p className="text-gray-600">Manage your account information and preferences.</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Settings</h3>
                  <p className="text-gray-600">Control how you receive updates and reminders.</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Privacy Settings</h3>
                  <p className="text-gray-600">Manage your data privacy and security preferences.</p>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          {activeSection === "help" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Help & Support</h2>
              <div className="space-y-6">
                <div className="bg-emerald-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-emerald-900 mb-2">📞 Contact Support</h3>
                  <p className="text-emerald-700">Call us at +91-XXXX-XXXXXX for immediate assistance.</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">📧 Email Support</h3>
                  <p className="text-blue-700">Send us an email at support@ayursutra.com</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-amber-900 mb-2">❓ FAQ</h3>
                  <p className="text-amber-700">Find answers to common questions about our therapies and services.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;