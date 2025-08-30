import React, { useState, useEffect } from 'react';
import { Home, Users, Heart, UserCheck, BarChart3, Plus, Calendar, Clock, Star, TrendingUp, Play, CheckCircle, DollarSign, User, Phone, Mail, MapPin, Activity ,LogOut} from 'lucide-react';
import { io } from "socket.io-client";
import axios from 'axios';

const AyurvedaDoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [therapiesList, setTherapiesList] = useState([]);
  const [loadingTherapies, setLoadingTherapies] = useState(true);
  
  // Add states for patients
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [patientsError, setPatientsError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const pracId = JSON.parse(localStorage.getItem("user")).id;
  console.log('Practitioner ID:', pracId);

  // Sidebar
  const sidebarItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'patients', icon: Users, label: 'Patients' },
    { id: 'therapies', icon: Heart, label: 'Therapies' },
    { id: 'staff', icon: UserCheck, label: 'Staff' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'logout', icon: LogOut, label: 'Logout' }
  ];
const handleLogout = () => {
  localStorage.removeItem("user");  
  window.location.href = "/";       
};
  // Static Data
  const todaysAppointments = [
    {
      id: 1,
      patient: 'Anika Kapoor',
      time: '10:00 AM - 11:00 AM',
      therapy: 'Abhyanga',
      status: 'scheduled',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
      condition: 'Stress & Fatigue'
    },
    {
      id: 2,
      patient: 'Rohan Verma',
      time: '11:30 AM - 12:30 PM',
      therapy: 'Shirodhara',
      status: 'in-progress',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      condition: 'Anxiety & Insomnia'
    },
    {
      id: 3,
      patient: 'Priya Singh',
      time: '2:00 PM - 3:00 PM',
      therapy: 'Swedana',
      status: 'completed',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      condition: 'Joint Pain'
    }
  ];

  const doctorId = JSON.parse(localStorage.getItem("user")).id;

  // Socket.io setup
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      socket.emit("joinAsDoctor", doctorId);
    });

    socket.on("newAppointment", (data) => {
      console.log("📩 New Appointment:", data);
      setNotifications((prev) => [...prev, data.message]);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connect Error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [doctorId]);

  const activeSessions = [
    { patient: 'Anika Kapoor', therapy: 'Abhyanga', progress: 60, timeRemaining: '25 min', therapist: 'Maya Patel' },
    { patient: 'Rohan Verma', therapy: 'Shirodhara', progress: 40, timeRemaining: '35 min', therapist: 'Arjun Sharma' }
  ];

  // Fetch Patients from Backend when patients tab is active
  useEffect(() => {
    if (activeTab === 'patients') {
      fetchPatients();
    }
  }, [activeTab, pracId]);

  const fetchPatients = async () => {
    if (!pracId) {
      setPatientsError('Practitioner ID not found');
      setLoadingPatients(false);
      return;
    }

    try {
      setLoadingPatients(true);
      setPatientsError(null);

      console.log('Fetching patients for practitioner:', pracId);

      const response = await axios.get("http://localhost:5000/api/appointments/68b27b0f2a074e28c056694b");
      console.log('Appointments Response:', response.data);

      // Extract unique patients from appointments
      const uniquePatients = [];
      const patientIds = new Set();

      response.data.forEach(appointment => {
        if (appointment && !patientIds.has(appointment._id || appointment.id)) {
          patientIds.add(appointment._id || appointment.id);
          
          const patientData = {
            id: appointment._id || appointment.id,
            name: appointment.name || 'Unknown Patient',
            email: appointment.email || 'No email'
          };
          
          uniquePatients.push(patientData);
        }
      });

      console.log('Unique Patients:', uniquePatients);
      setPatients(uniquePatients);
      
    } catch (err) {
      console.error('Error fetching patients:', err);
      
      if (err.code === 'ECONNABORTED') {
        setPatientsError('Request timeout. Please try again.');
      } else if (err.response) {
        setPatientsError(err.response.data?.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        setPatientsError('Network error. Please check your connection.');
      } else {
        setPatientsError(err.message || 'An unexpected error occurred');
      }
    } finally {
      setLoadingPatients(false);
    }
  };

  // Fetch Therapies from Backend
  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/therapies/practitioner/${pracId}`);
        const data = await res.json();
        setTherapiesList(data);
      } catch (error) {
        console.error('Error fetching therapies:', error);
      } finally {
        setLoadingTherapies(false);
      }
    };
    fetchTherapies();
  }, []);

  // Render Sections
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-100 shadow-md border-b border-emerald-200 p-6 flex justify-between items-center rounded-b-2xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-900 tracking-tight">
            Welcome Dr. Sharma
          </h1>
          <p className="text-emerald-700 mt-1 text-sm md:text-base">
            Today you have, <span className="font-semibold">3 appointments</span> 
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Doctor Avatar"
            className="w-14 h-14 rounded-full border-2 border-indigo-600"
          />
          <div>
            <p className="font-semibold text-gray-900">Dr. Sharma</p>
            <p className="text-gray-500 text-sm">Cardiologist</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Users size={24} className="text-white" />
            </div>
            <TrendingUp className="text-blue-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{284}</p>
          <p className="text-blue-700 font-medium">Total Patients</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500 rounded-xl">
              <Heart size={24} className="text-white" />
            </div>
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{18}</p>
          <p className="text-emerald-700 font-medium">Active Therapies</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 border border-amber-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500 rounded-xl">
              <Star size={24} className="text-white" />
            </div>
            <Star className="text-amber-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">4.9</p>
          <p className="text-amber-700 font-medium">Patient Rating</p>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Today's Schedule</h2>
          <Calendar className="text-gray-400" size={24} />
        </div>
        <div className="p-6 space-y-4">
          {todaysAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <div 
                className="w-14 h-14 rounded-full bg-center bg-cover shadow-md"
                style={{ backgroundImage: `url(${appointment.avatar})` }}
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">{appointment.patient}</p>
                <p className="text-emerald-600 font-medium text-sm flex items-center gap-2">
                  <Clock size={14} />
                  {appointment.time}
                </p>
                <p className="text-gray-500 text-sm">{appointment.condition}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 mb-2">{appointment.therapy}</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                  appointment.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  {appointment.status === 'in-progress' ? (
                    <><Play size={12} className="mr-1" />In Progress</>
                  ) : appointment.status === 'completed' ? (
                    <><CheckCircle size={12} className="mr-1" />Completed</>
                  ) : 'Scheduled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Sessions + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Sessions */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Active Sessions</h3>
          </div>
          <div className="p-6 space-y-6">
            {activeSessions.map((session, index) => (
              <div key={index} className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{session.patient}</p>
                    <p className="text-emerald-600 text-sm font-medium">{session.therapy}</p>
                    <p className="text-gray-500 text-sm">with {session.therapist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{session.timeRemaining}</p>
                    <p className="text-xs text-gray-500">remaining</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{session.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${session.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">AI Insights</h3>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h4 className="font-semibold mb-2">Treatment Recommendation</h4>
                <p className="text-white/90 text-sm">Based on Anika Kapoor's Prakriti analysis, consider adding Swedana therapy for enhanced stress relief.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h4 className="font-semibold mb-2">Schedule Optimization</h4>
                <p className="text-white/90 text-sm">Your afternoon slots are underutilized. Consider promoting 2-4 PM time slots.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ Simplified Patients Section - Only Name, Email, and Buttons
  const renderPatients = () => {
    if (loadingPatients) {
      return (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Patients</h1>
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading patients...</span>
          </div>
        </div>
      );
    }

    if (patientsError) {
      return (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Patients</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Activity className="h-8 w-8 text-red-400 mr-2" />
              <span className="text-red-800 font-medium text-lg">Error Loading Patients</span>
            </div>
            <p className="text-red-700 mb-4">{patientsError}</p>
            <button 
              onClick={fetchPatients}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">Patients</h1>
          <div className="text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              Total: {patients.length} patients
            </span>
          </div>
        </div>

        {/* Patients List */}
        {patients.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Patients Found</h3>
            <p className="text-gray-600">No appointments found for this practitioner.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Patient Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                  </div>
                </div>

                {/* Email */}
                {patient.email !== 'No email' && (
                  <div className="flex items-center text-sm text-gray-600 mb-6">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{patient.email}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                    View Profile
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
                    Appointments
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Therapies Section
  const renderTherapies = () => {
    if (loadingTherapies) {
      return <p className="text-center py-20 text-gray-500">Loading therapies...</p>;
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Therapies</h1>
          <button 
            onClick={() => {
              window.location.href = "/Add-therapy";
            }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus size={20} /> Schedule Therapy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapiesList.map((therapy) => (
            <div
              key={therapy._id}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">{therapy.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{therapy.description}</p>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 font-medium">Code:</span>
                <span className="font-medium text-gray-900">{therapy.code}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 font-medium flex items-center gap-1">
                  <Clock size={14} /> Duration
                </span>
                <span className="font-medium text-gray-900">{therapy.duration} min</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 font-medium flex items-center gap-1">
                  <Star size={14} /> Price
                </span>
                <span className="font-medium text-gray-900">${therapy.price}</span>
              </div>
              {therapy.patients !== undefined && (
                <p className="text-gray-500 text-sm mb-4">{therapy.patients} patients scheduled</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'patients': return renderPatients();
      case 'therapies': return renderTherapies();
      case 'staff': return <div className="text-gray-500 py-20 text-center">Staff Section Coming Soon...</div>;
      case 'reports': return <div className="text-gray-500 py-20 text-center">Reports Section Coming Soon...</div>;
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col py-6 px-4 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">AyurSutra</h2>
        <div className="flex flex-col gap-4">
          {sidebarItems.map(item => (
      <button
        key={item.id}
        onClick={() => {
          if (item.id === "logout") {
            handleLogout();   // ✅ logout logic
          } else {
            setActiveTab(item.id);
          }
        }}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-colors duration-200 w-full text-left ${
          activeTab === item.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <item.icon size={20} />
        {item.label}
      </button>
    ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AyurvedaDoctorDashboard;
