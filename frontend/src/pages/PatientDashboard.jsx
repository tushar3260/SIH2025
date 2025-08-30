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
  Award,
  CheckCircle,
  Flame,
} from "lucide-react";
import { Leaf, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [notifications, setNotifications] = useState(3);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  // Therapies ke liye state
  const [therapies, setTherapies] = useState([]);
  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", active: true },
    { id: "appointments", icon: Calendar, label: "Appointments", count: 2 },
    { id: "therapies", icon: List, label: "Therapies" },
    { id: "progress", icon: TrendingUp, label: "Progress" },
    { id: "recommendations", icon: Lightbulb, label: "Recommendations" },
    { id: "health", icon: Heart, label: "Health Info" },
    { id: "records", icon: FileText, label: "View Records" },
  ];
  const bottomNavItems = [
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "help", icon: HelpCircle, label: "Help" },
  ];
  // Dummy therapy schedule
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
  // Dummy health metrics
  const healthMetrics = [
    {
      label: "Sleep Quality",
      value: "8.2",
      unit: "/10",
      trend: "+0.3",
      color: "blue",
    },
    {
      label: "Energy Level",
      value: "75",
      unit: "%",
      trend: "+12%",
      color: "green",
    },
    {
      label: "Stress Level",
      value: "3.1",
      unit: "/10",
      trend: "-0.8",
      color: "orange",
    },
    {
      label: "Digestion",
      value: "7.8",
      unit: "/10",
      trend: "+0.5",
      color: "purple",
    },
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const moodData = [
    { date: "Aug 1", mood: 6 },
    { date: "Aug 8", mood: 7 },
    { date: "Aug 15", mood: 8 },
    { date: "Aug 22", mood: 7 },
  ];

  const milestones = [
    { title: "First Session", achieved: true },
    { title: "Consistent Week", achieved: true },
    { title: "Halfway Program", achieved: false },
    { title: "Completed Plan", achieved: false },
  ];

  const goals = [
    { name: "Reduce Stress to < 3", progress: "60%" },
    { name: "Complete 10 Therapies", progress: "40%" },
  ];

  const [sessionNotes, setSessionNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      setSessionNotes([
        ...sessionNotes,
        { note: newNote, date: new Date().toLocaleDateString() },
      ]);
      setNewNote("");
    }
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
  // Therapies fetch
  useEffect(() => {
    if (activeSection === "therapies") {
      setLoading(true);
      fetch("http://localhost:5000/api/therapies")
        .then((res) => res.json())
        .then((data) => {
          setTherapies(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching therapies:", err);
          setLoading(false);
        });
    }
  }, [activeSection]);
  // Dummy Progress Data
  const overallProgress = 72;
  const completedTherapies = [
    { name: "Abhyanga (Massage Therapy)", completed: true },
    { name: "Shirodhara (Oil Dripping Therapy)", completed: true },
    { name: "Basti (Detox Therapy)", completed: false },
    { name: "Swedana (Steam Therapy)", completed: false },
  ];
  const badges = [
    { icon: Award, title: "First Step", desc: "Completed first therapy" },
    { icon: CheckCircle, title: "Consistency", desc: "Attended 5 sessions" },
    { icon: Flame, title: "Healing Streak", desc: "3 sessions in a row" },
  ];

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
                onClick={() => setActiveSection(item.id)}
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
            <h1 className="text-3xl font-bold text-gray-900">
              Patient Dashboard
            </h1>
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
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Activity
                        size={24}
                        className={`text-${metric.color}-500`}
                      />
                      <span
                        className={`flex items-center gap-1 text-sm font-medium ${
                          metric.trend.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {metric.trend.startsWith("+") ? (
                          <ArrowUp size={16} />
                        ) : null}
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
                ))}
              </div>
              {/* Therapy Schedule */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Therapy Schedule
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
                      {therapySchedule.map((therapy, index) => (
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {/* Records Section */}
          {activeSection === "records" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Patient Records
              </h2>
              {loading ? (
                <p className="text-gray-500">Loading records...</p>
              ) : (
                <ul className="space-y-4">
                  {records.map((rec) => (
                    <li
                      key={rec.id}
                      className="p-4 border rounded-lg hover:shadow transition"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {rec.title}
                      </h3>
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
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2">
                  <Leaf className="text-emerald-600" size={32} />
                  <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                    Therapies
                  </h1>
                </div>
                <p className="mt-3 text-gray-600 text-lg">
                  Explore our curated Panchakarma and Ayurveda therapies for
                  healing, detox, and rejuvenation 🌿
                </p>
              </div>
              {/* Therapies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {loading ? (
                  <p className="text-gray-500 col-span-full">
                    Loading therapies...
                  </p>
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
                        <button
                          onClick={() =>
                            alert(`Booking appointment for ${therapy.name}`)
                          }
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
          {/* Progress Section */}
{activeSection === "progress" && (
  <div className="p-10 bg-gradient-to-br from-emerald-50 to-green-100 min-h-screen rounded-2xl shadow-md border border-gray-200">
    {/* Title */}
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-extrabold text-emerald-900 mb-12 text-center tracking-tight"
    >
      🌿 Healing Journey Dashboard
    </motion.h1>

    <div className="grid xl:grid-cols-3 gap-10">
      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-8 border-t-4 border-emerald-500"
      >
        <div className="w-44 h-44 mb-6">
          <CircularProgressbar
            value={overallProgress}
            text={`${overallProgress}%`}
            styles={buildStyles({
              textSize: "18px",
              pathColor: "#059669",
              textColor: "#065f46",
              trailColor: "#dcfce7",
            })}
          />
        </div>
        <p className="text-xl font-semibold text-emerald-800">
          Overall Progress
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Keep going! You're healing beautifully 🌸
        </p>
      </motion.div>

      {/* Therapies */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="xl:col-span-2 bg-white shadow-lg rounded-2xl p-8 border-t-4 border-green-400"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          💆 Therapy Progress
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {completedTherapies.map((therapy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 bg-emerald-50 rounded-xl px-5 py-4 shadow-sm"
            >
              <CheckCircle
                size={28}
                className={
                  therapy.completed ? "text-emerald-600" : "text-gray-300"
                }
              />
              <span
                className={`text-lg ${
                  therapy.completed
                    ? "text-emerald-700 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {therapy.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mood Chart */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  className="xl:col-span-3 bg-white shadow-lg rounded-2xl p-8 border-t-4 border-emerald-400"
>
  <h2 className="text-2xl font-bold text-gray-800 mb-6">😊 Mood Tracker</h2>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={moodData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="date" />
      <YAxis domain={[0, 10]} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="mood"
        stroke="#10b981"
        strokeWidth={3}
        dot={{ r: 5 }}
      />
    </LineChart>
  </ResponsiveContainer>
</motion.div>


      {/* Milestones & Achievements Side by Side */}
<div className="xl:col-span-3 grid lg:grid-cols-2 gap-8 mt-8">
  {/* Milestones */}
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-green-300"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-6">🏆 Milestones</h2>
    <ul className="space-y-4">
      {milestones.map((m, idx) => (
        <li
          key={idx}
          className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
        >
          <CheckCircle
            size={26}
            className={m.achieved ? "text-emerald-600" : "text-gray-300"}
          />
          <span
            className={`text-lg ${
              m.achieved
                ? "text-emerald-700 font-semibold"
                : "text-gray-600"
            }`}
          >
            {m.title}
          </span>
        </li>
      ))}
    </ul>
  </motion.div>

  {/* Achievements */}
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-amber-400"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-6">✨ Achievements</h2>
    <div className="grid sm:grid-cols-2 gap-4">
      {badges.map((badge, idx) => {
        const BadgeIcon = badge.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-3 bg-amber-50 rounded-lg px-5 py-4 shadow-sm"
          >
            <BadgeIcon size={26} className="text-amber-600" />
            <div>
              <div className="font-semibold text-amber-800">{badge.title}</div>
              <div className="text-sm text-gray-600">{badge.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  </motion.div>
</div>


     {/* Notes */}
<div className="xl:col-span-3 bg-white shadow-md rounded-2xl p-6 border-t-4 border-green-400">
  <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Session Notes</h2>
  
  {/* Input */}
  <div className="mb-3">
    <textarea
      value={newNote}
      onChange={(e) => setNewNote(e.target.value)}
      rows={2}
      placeholder="Write your reflections..."
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
    />
    <button
      onClick={handleAddNote}
      className="mt-2 px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm"
    >
      ➕ Add Note
    </button>
  </div>

  {/* Notes List */}
  <ul className="space-y-2 max-h-48 overflow-y-auto">
    {sessionNotes.map((item, idx) => (
      <li
        key={idx}
        className="p-3 bg-gray-50 rounded-lg border text-gray-800 shadow-sm text-sm"
      >
        <span className="font-medium">{item.date}:</span> {item.note}
      </li>
    ))}
  </ul>
</div>

    </div>
  </div>
)}


          {/* Recommendations Section */}
          {activeSection === "recommendations" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
                Personalized Recommendations
              </h2>
              <p className="text-gray-600 mb-5">
                Get suggestions from our experts to enhance your healing
                journey.
              </p>
              {/* Dummy Recommendations */}
              <ul className="space-y-4">
                <li className="p-4 border rounded-lg bg-emerald-50 flex items-center gap-3">
                  <Lightbulb size={24} className="text-emerald-600" />
                  <span className="text-gray-800 text-lg">
                    Try early morning yoga for better sleep.
                  </span>
                </li>
                <li className="p-4 border rounded-lg bg-emerald-50 flex items-center gap-3">
                  <Lightbulb size={24} className="text-emerald-600" />
                  <span className="text-gray-800 text-lg">
                    Include triphala in your diet to aid digestion.
                  </span>
                </li>
                <li className="p-4 border rounded-lg bg-emerald-50 flex items-center gap-3">
                  <Lightbulb size={24} className="text-emerald-600" />
                  <span className="text-gray-800 text-lg">
                    Hydrate with warm herbal teas to alleviate stress.
                  </span>
                </li>
              </ul>
            </div>
          )}
          {/* Health Info Section */}
          {activeSection === "health" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
                Health Information
              </h2>
              <p className="text-gray-600 mb-5">
                Track your vitals, recent updates, and holistic health tips
                here.
              </p>
              {/* Dummy Health Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-emerald-50 p-6 rounded-xl shadow flex flex-col items-center">
                  <Award size={32} className="text-emerald-700 mb-2" />
                  <p className="font-bold text-lg text-emerald-900">Weight</p>
                  <p className="text-gray-800 text-2xl font-bold">66 kg</p>
                </div>
                <div className="bg-emerald-50 p-6 rounded-xl shadow flex flex-col items-center">
                  <Flame size={32} className="text-emerald-700 mb-2" />
                  <p className="font-bold text-lg text-emerald-900">
                    Blood Pressure
                  </p>
                  <p className="text-gray-800 text-2xl font-bold">
                    120/80 mmHg
                  </p>
                </div>
                <div className="bg-emerald-50 p-6 rounded-xl shadow flex flex-col items-center">
                  <Heart size={32} className="text-emerald-700 mb-2" />
                  <p className="font-bold text-lg text-emerald-900">Pulse</p>
                  <p className="text-gray-800 text-2xl font-bold">76 bpm</p>
                </div>
              </div>
            </div>
          )}
          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
                Settings
              </h2>
              <p className="text-gray-600 mb-5">
                Customize your dashboard, notifications, and privacy preferences
                here.
              </p>
              {/* Settings Placeholder */}
              <div className="text-gray-700">
                <p>Settings options will be available soon.</p>
              </div>
            </div>
          )}
          {/* Help Section */}
          {activeSection === "help" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
                Help & Support
              </h2>
              <p className="text-gray-600 mb-5">
                Find answers to common queries and contact support.
              </p>
              {/* Help Placeholder */}
              <div className="text-gray-700">
                <p>If you need assistance, please reach out to our support.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
