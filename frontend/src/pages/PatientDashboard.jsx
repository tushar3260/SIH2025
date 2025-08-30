import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this import
import { 
  Home, Calendar, List, TrendingUp, Lightbulb, Heart, Settings, HelpCircle,
  Activity, Clock, ArrowUp, FileText,
  CloudCog
} from 'lucide-react';
import { Leaf, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const PatientDashboard = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate hook
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [therapies, setTherapies] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', active: true },
    { id: 'appointments', icon: Calendar, label: 'Appointments', count: 2, navigate: true }, // ✅ Add navigate flag
    { id: 'therapies', icon: List, label: 'Therapies' },
    { id: 'progress', icon: TrendingUp, label: 'Progress' },
    { id: 'recommendations', icon: Lightbulb, label: 'Recommendations' },
    { id: 'health', icon: Heart, label: 'Health Info' },
    { id: 'records', icon: FileText, label: 'View Records' },
  ];

  const bottomNavItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' }
  ];

  // ✅ Handle navigation and section changes
  const handleNavigation = (item) => {
    if (item.navigate) {
      // Navigate to the route for items that need routing
      navigate(`/${item.id}`);
    } else {
      // Set active section for items that stay on the same page
      setActiveSection(item.id);
    }
  };

  // Dummy therapy schedule
  const therapySchedule = [
    { therapy: 'Abhyanga', date: '2025-08-30', time: '9:00 AM', status: 'Scheduled', duration: '60 min', practitioner: 'Dr. Sharma' },
    { therapy: 'Shirodhara', date: '2025-08-31', time: '11:00 AM', status: 'Confirmed', duration: '45 min', practitioner: 'Dr. Patel' },
    { therapy: 'Swedana', date: '2025-09-01', time: '2:00 PM', status: 'Pending', duration: '30 min', practitioner: 'Dr. Kumar' }
  ];

  const healthMetrics = [
    { label: 'Sleep Quality', value: '8.2', unit: '/10', trend: '+0.3', color: 'blue' },
    { label: 'Energy Level', value: '75', unit: '%', trend: '+12%', color: 'green' },
    { label: 'Stress Level', value: '3.1', unit: '/10', trend: '-0.8', color: 'orange' },
    { label: 'Digestion', value: '7.8', unit: '/10', trend: '+0.5', color: 'purple' }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }),
      time: date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  // Records fetch
  useEffect(() => {
    if (activeSection === "records") {
      setLoading(true);
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then(res => res.json())
        .then(data => {
          setRecords(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching records:", err);
          setLoading(false);
        });
    }
  }, [activeSection]);

  // Therapies fetch
  useEffect(() => {
    if (activeSection === "therapies") {
      setLoading(true);
      fetch("http://localhost:5000/api/therapies/user/68b211ed14a9228cd7fe43bd")
        .then(res => res.json())
        .then(data => {
          setTherapies(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching therapies:", err);
          setLoading(false);
        });
    }
  }, [activeSection]);

  // Appointments fetch - UPDATED to handle your API response structure
  useEffect(() => {
    if (activeSection === "appointments") {
      setLoading(true);
      axios.get(`http://localhost:5000/api/appointments/me/${userId}`)
        .then(res => {
          console.log("Fetched Appointments Data:", res.data);
          
          // Transform the API response to match your component's expected structure
          const transformedAppointments = res.data.map(appointment => ({
            id: appointment._id,
            therapyName: appointment.therapy?.name || 'Unknown Therapy',
            date: formatDateTime(appointment.start).date,
            time: formatDateTime(appointment.start).time,
            duration: `${appointment.therapy?.duration || 60} min`,
            practitioner: appointment.practitioner?.user?.name || 
                         appointment.practitioner?.name || 
                         'Dr. Unknown',
            status: appointment.status,
            notes: appointment.notes || '',
            endTime: formatDateTime(appointment.end).time,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt
          }));

          setAppointments(transformedAppointments);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching appointments:", err);
          setLoading(false);
          
          // Fallback data if API fails
          const fallbackAppointments = [
            {
              id: 1,
              therapyName: 'Abhyanga Massage',
              date: '02/09/2025',
              time: '10:00 AM',
              duration: '60 min',
              practitioner: 'Dr. Sharma',
              status: 'confirmed',
              notes: 'Full body oil massage therapy'
            },
            {
              id: 2,
              therapyName: 'Shirodhara',
              date: '05/09/2025',
              time: '2:00 PM',
              duration: '45 min',
              practitioner: 'Dr. Patel',
              status: 'scheduled',
              notes: 'Oil pouring therapy for relaxation'
            }
          ];
          setAppointments(fallbackAppointments);
        });
    }
  }, [activeSection, userId]);

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">AS</span>
          </div>
          <div>
            <h1 className="text-gray-900 text-lg font-semibold">AyurSutra</h1>
            <p className="text-gray-500 text-sm">Wellness Dashboard</p>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)} // ✅ Updated click handler
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm border-l-4 border-emerald-500' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {/* ✅ Show count badge for appointments */}
                {item.count && (
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200 space-y-2">
          {bottomNavItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)} // ✅ Updated click handler
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
        <div className="bg-white shadow-sm border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Anya Sharma</p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <>
              {/* Health Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <Activity size={24} className={`text-${metric.color}-500`} />
                      <span className={`flex items-center gap-1 text-sm font-medium ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.trend.startsWith('+') ? <ArrowUp size={16} /> : null}
                        {metric.trend}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}<span className="text-lg text-gray-500">{metric.unit}</span></p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Therapy Schedule */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Therapy Schedule</h2>
                  {/* ✅ Add "View All Appointments" button */}
                  <button 
                    onClick={() => navigate('/appointments')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm font-medium"
                  >
                    View All Appointments
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Therapy</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Practitioner</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {therapySchedule.map((therapy, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{therapy.therapy}</td>
                          <td className="px-6 py-4">
                            <div className="text-gray-900">{therapy.date}</div>
                            <div className="text-gray-600 text-sm flex items-center gap-1"><Clock size={14} />{therapy.time}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{therapy.duration}</td>
                          <td className="px-6 py-4 text-gray-900">{therapy.practitioner}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(therapy.status)}`}>{therapy.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Appointments Section - UPDATED */}
          {activeSection === "appointments" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Your Appointments</h2>
                <span className="text-sm text-gray-500">User ID: {userId}</span>
              </div>
              {loading ? (
                <div className="p-6">
                  <p className="text-gray-500 text-center">Loading your appointments...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Therapy</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Practitioner</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Notes</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.length > 0 ? appointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{appointment.therapyName}</td>
                          <td className="px-6 py-4">
                            <div className="text-gray-900">{appointment.date}</div>
                            <div className="text-gray-600 text-sm flex items-center gap-1">
                              <Clock size={14} />{appointment.time}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{appointment.duration}</td>
                          <td className="px-6 py-4 text-gray-900">{appointment.practitioner}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate">
                            {appointment.notes || 'No notes'}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
                              onClick={() => alert(`Viewing details for appointment ${appointment.id}`)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
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

          {/* Records Section */}
          {activeSection === "records" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Records</h2>
              {loading ? (
                <p className="text-gray-500">Loading records...</p>
              ) : (
                <ul className="space-y-4">
                  {records.map((rec) => (
                    <li key={rec.id} className="p-4 border rounded-lg hover:shadow transition">
                      <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                      <p className="text-gray-600 text-sm">{rec.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Therapies Section */}
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
                  Explore our curated Panchakarma and Ayurveda therapies for healing,
                  detox, and rejuvenation 🌿
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {loading ? (
                  <p className="text-gray-500 col-span-full">Loading therapies...</p>
                ) : (
                  therapies.map((therapy, i) => (
                    <motion.div
                      key={i}
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
                            <IndianRupee size={18} /> {therapy.price || "1000"}
                          </span>
                        </div>

                        <p className="text-xs text-gray-400 mb-4">
                          Added on{" "}
                          {therapy.createdAt
                            ? new Date(therapy.createdAt).toLocaleDateString()
                            : "N/A"}
                        </p>

                        {/* Book Appointment Button */}
                        <button
                          onClick={() => navigate('/appointments')} // ✅ Navigate to appointments
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
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
