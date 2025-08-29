import React, { useState } from 'react';
import { Home, Users, Heart, UserCheck, BarChart3, Bell, Settings, Plus, Calendar, Clock, Star, TrendingUp } from 'lucide-react';

const AyurvedaDoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'patients', icon: Users, label: 'Patients' },
    { id: 'therapies', icon: Heart, label: 'Therapies' },
    { id: 'staff', icon: UserCheck, label: 'Staff' },
    { id: 'reports', icon: BarChart3, label: 'Reports' }
  ];

  const todaysAppointments = [
    {
      id: 1,
      patient: 'Anika Kapoor',
      time: '10:00 AM - 11:00 AM',
      therapy: 'Abhyanga',
      status: 'scheduled',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      patient: 'Rohan Verma',
      time: '11:30 AM - 12:30 PM',
      therapy: 'Shirodhara',
      status: 'in-progress',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      patient: 'Priya Singh',
      time: '2:00 PM - 3:00 PM',
      therapy: 'Swedana',
      status: 'completed',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const activeSessions = [
    { patient: 'Anika Kapoor', therapy: 'Abhyanga', progress: 60 },
    { patient: 'Rohan Verma', therapy: 'Shirodhara', progress: 40 }
  ];

  const upcomingAppointments = [
    { date: 'July 25, 2024', time: '2:00 PM', patient: 'Vikram Singh', therapy: 'Basti' },
    { date: 'July 26, 2024', time: '11:00 AM', patient: 'Divya Sharma', therapy: 'Nasya' },
    { date: 'July 27, 2024', time: '3:30 PM', patient: 'Arjun Mehta', therapy: 'Vamana' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-green-600 text-sm font-normal">Welcome back, Dr. Sharma</p>
        </div>
        <button className="bg-green-400 hover:bg-green-500 text-gray-900 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Add Patient
        </button>
      </div>

      {/* Today's Overview */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Overview</h2>
        <div className="space-y-3">
          {todaysAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
              <div 
                className="w-14 h-14 rounded-full bg-center bg-cover"
                style={{ backgroundImage: `url(${appointment.avatar})` }}
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Patient: {appointment.patient}</p>
                <p className="text-green-600 text-sm">{appointment.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{appointment.therapy}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  appointment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {appointment.status === 'in-progress' ? 'In Progress' : 
                   appointment.status === 'completed' ? 'Completed' : 'Scheduled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Active Sessions</h2>
        <div className="space-y-4">
          {activeSessions.map((session, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-gray-900">Patient: {session.patient}</p>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gray-900 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${session.progress}%` }}
                />
              </div>
              <p className="text-green-600 text-sm">Therapy: {session.therapy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">AI Recommendations</h2>
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Personalized Therapy Plan for Anika Kapoor</h3>
          <p className="text-green-100">Based on her Prakriti analysis, consider adding Swedana to her treatment.</p>
        </div>
      </div>

      {/* Analytics Overview */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Therapy Revenue Chart */}
          <div className="bg-white border border-green-200 rounded-xl p-6">
            <p className="font-medium text-gray-900 mb-4">Therapy Revenue</p>
            <div className="flex items-end justify-center gap-4 h-40">
              {[100, 20, 60, 90, 30, 95].map((height, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-green-100 border-t-2 border-green-600 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                  <p className="text-green-600 text-xs font-bold mt-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Demographics */}
          <div className="bg-white border border-green-200 rounded-xl p-6">
            <p className="font-medium text-gray-900 mb-4">Patient Demographics</p>
            <div className="space-y-4">
              {[
                { label: 'Male', percentage: 45 },
                { label: 'Female', percentage: 50 },
                { label: 'Other', percentage: 5 }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <p className="text-green-600 text-sm font-bold w-12">{item.label}</p>
                  <div className="flex-1 bg-green-100 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-green-600 text-sm">{item.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 rounded-xl p-6">
          <p className="font-medium text-gray-900">Total Patients</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">250</p>
        </div>
        <div className="bg-green-100 rounded-xl p-6">
          <p className="font-medium text-gray-900">Active Therapies</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">15</p>
        </div>
        <div className="bg-green-100 rounded-xl p-6">
          <p className="font-medium text-gray-900">Revenue</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">₹12,500</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="bg-green-400 hover:bg-green-500 text-gray-900 px-4 py-2 rounded-xl font-bold transition-colors">
          Add Patient
        </button>
        <button className="bg-green-100 hover:bg-green-200 text-gray-900 px-4 py-2 rounded-xl font-bold transition-colors">
          Book Therapy
        </button>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
        <button className="bg-green-400 hover:bg-green-500 text-gray-900 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
          <Plus size={20} />
          Add Patient
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Therapy</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((appointment, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-green-600 text-sm">{appointment.date}</td>
                  <td className="py-4 px-4 text-green-600 text-sm">{appointment.time}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">{appointment.patient}</td>
                  <td className="py-4 px-4 text-green-600 text-sm">{appointment.therapy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTherapies = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Therapies</h1>
        <button className="bg-green-400 hover:bg-green-500 text-gray-900 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
          <Plus size={20} />
          Schedule Therapy
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Therapy Progress</h2>
        <div className="space-y-6">
          {[
            { name: 'Abhyanga', completed: 3, total: 4, progress: 75 },
            { name: 'Shirodhara', completed: 2, total: 4, progress: 50 },
            { name: 'Swedana', completed: 4, total: 4, progress: 100 }
          ].map((therapy) => (
            <div key={therapy.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-900">{therapy.name}</p>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${therapy.progress}%` }}
                />
              </div>
              <p className="text-green-600 text-sm">
                {therapy.completed}/{therapy.total} sessions completed
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Feedback</h2>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-4xl font-black text-gray-900">4.8</p>
            <div className="flex gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={18} 
                  className={star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"} 
                />
              ))}
            </div>
            <p className="text-gray-900 font-normal">125 reviews</p>
          </div>
          <div className="flex-1 space-y-2">
            {[
              { stars: 5, percentage: 70 },
              { stars: 4, percentage: 20 },
              { stars: 3, percentage: 5 },
              { stars: 2, percentage: 3 },
              { stars: 1, percentage: 2 }
            ].map((rating) => (
              <div key={rating.stars} className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-900 w-2">{rating.stars}</span>
                <div className="flex-1 bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-gray-900 h-2 rounded-full"
                    style={{ width: `${rating.percentage}%` }}
                  />
                </div>
                <span className="text-green-600 text-sm w-8 text-right">{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'patients':
        return renderPatients();
      case 'therapies':
        return renderTherapies();
      case 'staff':
        return <div className="text-center py-12 text-gray-500">Staff management coming soon...</div>;
      case 'reports':
        return <div className="text-center py-12 text-gray-500">Reports section coming soon...</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-white flex font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col min-h-screen">
        <div className="p-4">
          <h1 className="text-gray-900 font-medium mb-1">AyurSutra</h1>
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-green-100 text-gray-900'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={24} />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto p-4 space-y-4">
          <button className="w-full bg-green-400 hover:bg-green-500 text-gray-900 px-4 py-2 rounded-xl font-bold transition-colors">
            Add Patient
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-xl">
            <Settings size={24} />
            <span className="font-medium text-sm">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 max-w-4xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default AyurvedaDoctorDashboard;