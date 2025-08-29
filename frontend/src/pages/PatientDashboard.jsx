import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  List, 
  TrendingUp, 
  Lightbulb, 
  Heart, 
  Settings, 
  HelpCircle,
  Bell,
  Search,
  Activity,
  Clock,
  Star,
  ArrowUp
} from 'lucide-react';

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', active: true },
    { id: 'appointments', icon: Calendar, label: 'Appointments', count: 2 },
    { id: 'therapies', icon: List, label: 'Therapies' },
    { id: 'progress', icon: TrendingUp, label: 'Progress' },
    { id: 'recommendations', icon: Lightbulb, label: 'Recommendations' },
    { id: 'health', icon: Heart, label: 'Health Info' }
  ];

  const bottomNavItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' }
  ];

  const therapySchedule = [
    { 
      therapy: 'Abhyanga', 
      date: '2024-07-22', 
      time: '9:00 AM', 
      status: 'Scheduled',
      duration: '60 min',
      practitioner: 'Dr. Sharma'
    },
    { 
      therapy: 'Shirodhara', 
      date: '2024-07-23', 
      time: '11:00 AM', 
      status: 'Confirmed',
      duration: '45 min',
      practitioner: 'Dr. Patel'
    },
    { 
      therapy: 'Swedana', 
      date: '2024-07-24', 
      time: '2:00 PM', 
      status: 'Pending',
      duration: '30 min',
      practitioner: 'Dr. Kumar'
    }
  ];

  const healthMetrics = [
    { label: 'Sleep Quality', value: '8.2', unit: '/10', trend: '+0.3', color: 'blue' },
    { label: 'Energy Level', value: '75', unit: '%', trend: '+12%', color: 'green' },
    { label: 'Stress Level', value: '3.1', unit: '/10', trend: '-0.8', color: 'orange' },
    { label: 'Digestion', value: '7.8', unit: '/10', trend: '+0.5', color: 'purple' }
  ];

  const healthInfo = [
    { label: 'Primary Dosha', value: 'Vata', description: 'Air & Space elements' },
    { label: 'Prakriti', value: 'Vata-Kapha', description: 'Natural constitution' },
    { label: 'Vikriti', value: 'Vata-Pitta', description: 'Current imbalance' },
    { label: 'Body Type', value: 'Ectomorph', description: 'Lean build tendency' }
  ];

  const recommendations = [
    {
      title: 'Morning Routine',
      description: 'Start with warm lemon water and gentle stretching',
      category: 'Daily Habits',
      priority: 'High',
      icon: '🌅'
    },
    {
      title: 'Dietary Focus',
      description: 'Warm, cooked meals with grounding spices like ginger and cumin',
      category: 'Nutrition',
      priority: 'High',
      icon: '🥘'
    },
    {
      title: 'Evening Wind-down',
      description: 'Oil massage and meditation before 10 PM for better sleep',
      category: 'Lifestyle',
      priority: 'Medium',
      icon: '🧘‍♀'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'border-l-red-500';
      case 'Medium': return 'border-l-yellow-500';
      case 'Low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col">
        {/* Logo Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">AS</span>
            </div>
            <div>
              <h1 className="text-gray-900 text-lg font-semibold">AyurSutra</h1>
              <p className="text-gray-500 text-sm">Wellness Dashboard</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = item.id === activeSection;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-700 shadow-sm border-l-4 border-emerald-500' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent size={20} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2">
            {bottomNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors"
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, Anya Sharma</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Health Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Activity size={24} className={`text-${metric.color}-500`} />
                  <span className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend.startsWith('+') ? <ArrowUp size={16} /> : null}
                    {metric.trend}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}<span className="text-lg text-gray-500">{metric.unit}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Therapy Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Therapy Schedule</h2>
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
                        <div className="text-gray-600 text-sm flex items-center gap-1">
                          <Clock size={14} />
                          {therapy.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{therapy.duration}</td>
                      <td className="px-6 py-4 text-gray-900">{therapy.practitioner}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(therapy.status)}`}>
                          {therapy.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Personalized Recommendations</h2>
            </div>
            <div className="p-6 space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-4 border-l-4 ${getPriorityColor(rec.priority)} bg-gray-50 rounded-r-lg`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{rec.icon}</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                            {rec.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{rec.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                      rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Health Profile</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthInfo.map((info, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{info.label}</h3>
                    <span className="text-lg font-bold text-emerald-600">{info.value}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
