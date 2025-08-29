import React, { useState } from 'react';
import { Home, Users, Heart, UserCheck, BarChart3, Bell, Settings, Plus, Calendar, Clock, Star, TrendingUp, Search, Filter, MoreVertical, Play, CheckCircle } from 'lucide-react';

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

  const activeSessions = [
    { patient: 'Anika Kapoor', therapy: 'Abhyanga', progress: 60, timeRemaining: '25 min', therapist: 'Maya Patel' },
    { patient: 'Rohan Verma', therapy: 'Shirodhara', progress: 40, timeRemaining: '35 min', therapist: 'Arjun Sharma' }
  ];

  const upcomingAppointments = [
    { date: 'July 25, 2024', time: '2:00 PM', patient: 'Vikram Singh', therapy: 'Basti', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { date: 'July 26, 2024', time: '11:00 AM', patient: 'Divya Sharma', therapy: 'Nasya', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face' },
    { date: 'July 27, 2024', time: '3:30 PM', patient: 'Arjun Mehta', therapy: 'Vamana', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' }
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Good morning, Dr. Sharma</h1>
          <p className="text-gray-600 text-lg">You have 8 appointments today</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Plus size={20} />
            New Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Users size={24} className="text-white" />
            </div>
            <TrendingUp className="text-blue-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">284</p>
          <p className="text-blue-700 font-medium">Total Patients</p>
          <p className="text-blue-600 text-sm mt-2">+12% from last month</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500 rounded-xl">
              <Heart size={24} className="text-white" />
            </div>
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">18</p>
          <p className="text-emerald-700 font-medium">Active Therapies</p>
          <p className="text-emerald-600 text-sm mt-2">3 starting today</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500 rounded-xl">
              <Star size={24} className="text-white" />
            </div>
            <Star className="text-amber-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">4.9</p>
          <p className="text-amber-700 font-medium">Patient Rating</p>
          <p className="text-amber-600 text-sm mt-2">Based on 156 reviews</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <BarChart3 size={24} className="text-white" />
            </div>
            <TrendingUp className="text-purple-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">₹18,500</p>
          <p className="text-purple-700 font-medium">This Month</p>
          <p className="text-purple-600 text-sm mt-2">+8% from last month</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Today's Schedule</h2>
            <Calendar className="text-gray-400" size={24} />
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
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
                      <>
                        <Play size={12} className="mr-1" />
                        In Progress
                      </>
                    ) : appointment.status === 'completed' ? (
                      <>
                        <CheckCircle size={12} className="mr-1" />
                        Completed
                      </>
                    ) : (
                      'Scheduled'
                    )}
                  </span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-gray-200 transition-all">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Revenue Analytics</h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-end justify-center gap-6 h-48 mb-6">
            {[
              { month: 'Jan', value: 85, amount: '₹12K' },
              { month: 'Feb', value: 45, amount: '₹8K' },
              { month: 'Mar', value: 100, amount: '₹18K' },
              { month: 'Apr', value: 75, amount: '₹14K' },
              { month: 'May', value: 60, amount: '₹11K' },
              { month: 'Jun', value: 95, amount: '₹17K' }
            ].map((data, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="text-xs font-medium text-gray-900 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.amount}
                </div>
                <div 
                  className="w-12 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg hover:from-emerald-600 hover:to-teal-500 transition-colors cursor-pointer"
                  style={{ height: `${data.value}%` }}
                />
                <p className="text-gray-600 text-sm font-medium mt-3">{data.month}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">₹18,500</p>
              <p className="text-gray-600 text-sm">This Month</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">₹156,000</p>
              <p className="text-gray-600 text-sm">This Year</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">+12%</p>
              <p className="text-gray-600 text-sm">Growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Patients</h1>
          <p className="text-gray-600">Manage your patient appointments and records</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Plus size={20} />
            New Patient
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Patient</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Date & Time</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Therapy</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((appointment, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full bg-center bg-cover"
                        style={{ backgroundImage: `url(${appointment.avatar})` }}
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{appointment.patient}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-900 font-medium">{appointment.date}</p>
                    <p className="text-emerald-600 text-sm">{appointment.time}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      {appointment.therapy}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
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
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Therapies</h1>
          <p className="text-gray-600">Monitor therapy progress and patient feedback</p>
        </div>
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl">
          <Plus size={20} />
          Schedule Therapy
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Therapy Progress</h2>
          </div>
          <div className="p-6 space-y-6">
            {[
              { name: 'Abhyanga', completed: 3, total: 4, progress: 75, color: 'from-blue-500 to-indigo-600' },
              { name: 'Shirodhara', completed: 2, total: 4, progress: 50, color: 'from-emerald-500 to-teal-600' },
              { name: 'Swedana', completed: 4, total: 4, progress: 100, color: 'from-green-500 to-emerald-600' }
            ].map((therapy) => (
              <div key={therapy.name} className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900">{therapy.name}</p>
                  <span className="text-sm font-medium text-gray-600">
                    {therapy.completed}/{therapy.total} sessions
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`bg-gradient-to-r ${therapy.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${therapy.progress}%` }}
                  />
                </div>
                <p className="text-gray-500 text-sm">
                  {therapy.progress === 100 ? 'Completed' : `${100 - therapy.progress}% remaining`}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Patient Feedback</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-8 mb-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-gray-900 mb-2">4.9</p>
                <div className="flex gap-1 justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={20} 
                      className="text-amber-400 fill-current" 
                    />
                  ))}
                </div>
                <p className="text-gray-600 font-medium">156 reviews</p>
              </div>
              <div className="flex-1 space-y-3">
                {[
                  { stars: 5, percentage: 78 },
                  { stars: 4, percentage: 15 },
                  { stars: 3, percentage: 4 },
                  { stars: 2, percentage: 2 },
                  { stars: 1, percentage: 1 }
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900 w-3">{rating.stars}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-600 text-sm w-10 text-right">{rating.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
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
        return (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <UserCheck size={64} className="mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold mb-2">Staff Management</h2>
            <p>Manage your therapy staff and schedules</p>
            <p className="text-sm mt-2">Coming soon...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <BarChart3 size={64} className="mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold mb-2">Analytics & Reports</h2>
            <p>Detailed insights and performance reports</p>
            <p className="text-sm mt-2">Coming soon...</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col min-h-screen shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Heart className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-lg">AyurSutra</h1>
              <p className="text-gray-500 text-sm">Wellness Platform</p>
            </div>
          </div>
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto p-6 space-y-3">
          <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
            Quick Actions
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AyurvedaDoctorDashboard;