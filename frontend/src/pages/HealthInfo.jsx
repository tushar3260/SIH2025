import React, { useState, useEffect, useReducer, useMemo, useCallback, memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Cell } from 'recharts';
import { Heart, Activity, Brain, Moon, Thermometer, Droplets, Utensils, Clock, Bell, BellOff, TrendingUp, Award, AlertTriangle, CheckCircle, Settings, Download, Calendar, Zap, Target, MessageCircle, Shield, Smartphone } from 'lucide-react';

// Advanced Health Data Reducer
const healthReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_HEALTH_ENTRY':
      const newEntry = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        aiScore: calculateHealthScore(action.payload, state.entries)
      };
      const updatedEntries = [...state.entries, newEntry].slice(-90); // Keep last 90 days
      return {
        ...state,
        entries: updatedEntries,
        currentScore: newEntry.aiScore,
        lastUpdate: new Date().toISOString(),
        streak: calculateStreak(updatedEntries)
      };
    case 'SET_PREFERENCES':
      return { ...state, preferences: { ...state.preferences, ...action.payload } };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications.slice(0, 9)] };
    case 'DISMISS_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    case 'LOAD_DATA':
      return { ...action.payload };
    default:
      return state;
  }
};

// Advanced AI Health Scoring Algorithm
const calculateHealthScore = (data, historicalData = []) => {
  const weights = {
    physical: 0.25,
    sleep: 0.20,
    mental: 0.20,
    vitals: 0.15,
    lifestyle: 0.10,
    trend: 0.10
  };

  const physicalScore = Math.max(0, 100 - (data.pain * 8));
  const sleepScore = data.sleepHours >= 7 ? 100 : Math.max(0, data.sleepHours * 14.3);
  const mentalScore = (data.mood * 20);
  
  const vitalScore = calculateVitalScore(data.vitals);
  const lifestyleScore = calculateLifestyleScore(data.lifestyle);
  const trendScore = calculateTrendAnalysis(historicalData);
  
  const totalScore = 
    physicalScore * weights.physical +
    sleepScore * weights.sleep +
    mentalScore * weights.mental +
    vitalScore * weights.vitals +
    lifestyleScore * weights.lifestyle +
    trendScore * weights.trend;
  
  return Math.round(Math.max(0, Math.min(100, totalScore)));
};

const calculateVitalScore = (vitals) => {
  if (!vitals) return 70;
  let score = 100;
  
  // Blood Pressure (120/80 optimal)
  if (vitals.systolic > 140 || vitals.diastolic > 90) score -= 20;
  else if (vitals.systolic > 130 || vitals.diastolic > 85) score -= 10;
  
  // Heart Rate (60-100 optimal)
  if (vitals.heartRate < 60 || vitals.heartRate > 100) score -= 15;
  
  // Temperature (98.6°F optimal)
  const tempDiff = Math.abs(vitals.temperature - 98.6);
  if (tempDiff > 2) score -= 20;
  else if (tempDiff > 1) score -= 10;
  
  return Math.max(0, score);
};

const calculateLifestyleScore = (lifestyle) => {
  if (!lifestyle) return 60;
  let score = 0;
  
  score += lifestyle.hydration >= 8 ? 25 : (lifestyle.hydration * 3);
  score += lifestyle.exercise >= 30 ? 25 : (lifestyle.exercise * 0.8);
  score += lifestyle.screenTime <= 6 ? 25 : Math.max(0, 25 - (lifestyle.screenTime - 6) * 3);
  score += lifestyle.socialInteraction >= 3 ? 25 : (lifestyle.socialInteraction * 8);
  
  return Math.min(100, score);
};

const calculateTrendAnalysis = (entries) => {
  if (entries.length < 7) return 70;
  
  const recent = entries.slice(-7);
  const older = entries.slice(-14, -7);
  
  if (older.length === 0) return 70;
  
  const recentAvg = recent.reduce((sum, entry) => sum + (entry.aiScore || 70), 0) / recent.length;
  const olderAvg = older.reduce((sum, entry) => sum + (entry.aiScore || 70), 0) / older.length;
  
  const improvement = recentAvg - olderAvg;
  return Math.max(0, Math.min(100, 70 + improvement * 2));
};

const calculateStreak = (entries) => {
  if (entries.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  
  for (let i = entries.length - 1; i >= 0; i--) {
    const entryDate = new Date(entries[i].timestamp);
    const daysDiff = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

// AI Insights Generation
const generateAIInsights = (userData, trends, preferences) => {
  const insights = [];
  const score = userData.currentScore || 70;
  
  // Health Prediction
  if (score >= 90) {
    insights.push({
      type: 'achievement',
      title: 'Peak Performance Mode',
      message: 'Your health metrics indicate optimal wellness. Maintain your current routine for continued excellence.',
      confidence: 95,
      priority: 'high'
    });
  } else if (score < 60) {
    insights.push({
      type: 'alert',
      title: 'Health Attention Needed',
      message: 'Several metrics suggest intervention may be beneficial. Consider consulting with healthcare providers.',
      confidence: 88,
      priority: 'urgent'
    });
  }
  
  // Sleep Analysis
  const avgSleep = trends.reduce((sum, entry) => sum + (entry.sleepHours || 7), 0) / Math.max(trends.length, 1);
  if (avgSleep < 7) {
    insights.push({
      type: 'recommendation',
      title: 'Sleep Optimization Needed',
      message: `Your average sleep of ${avgSleep.toFixed(1)} hours is below optimal. Aim for 7-9 hours nightly.`,
      confidence: 92,
      priority: 'medium'
    });
  }
  
  // Pain Pattern Recognition
  const painEntries = trends.filter(entry => entry.pain > 5);
  if (painEntries.length >= 3) {
    insights.push({
      type: 'pattern',
      title: 'Pain Pattern Detected',
      message: 'Recurring pain levels above 5/10 detected. Consider tracking triggers and discussing with healthcare provider.',
      confidence: 85,
      priority: 'medium'
    });
  }
  
  return insights;
};

// Notification System
const NotificationBadge = memo(({ notification, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const getBadgeStyle = () => {
    switch (notification.priority) {
      case 'urgent': return 'bg-red-500 border-red-400 animate-pulse shadow-red-500/30';
      case 'high': return 'bg-amber-500 border-amber-400 shadow-amber-500/30';
      default: return 'bg-blue-500 border-blue-400 shadow-blue-500/30';
    }
  };
  
  const getIcon = () => {
    switch (notification.type) {
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'achievement': return <Award className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div className={`border-2 ${getBadgeStyle()} text-white p-3 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {getIcon()}
          <div>
            <h4 className="font-semibold text-sm">{notification.title}</h4>
            <p className="text-xs opacity-90">{notification.message}</p>
            {notification.confidence && (
              <div className="text-xs mt-1 opacity-75">
                Confidence: {notification.confidence}%
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onDismiss(notification.id), 300);
          }}
          className="text-white/70 hover:text-white transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
});

// Advanced Health Form Component
const HealthAssessmentForm = memo(({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    pain: 0,
    sleepHours: 7,
    sleepQuality: 3,
    mood: 3,
    anxiety: 1,
    vitals: {
      systolic: 120,
      diastolic: 80,
      heartRate: 72,
      temperature: 98.6,
      oxygenSat: 98
    },
    lifestyle: {
      hydration: 8,
      exercise: 30,
      screenTime: 6,
      socialInteraction: 3
    },
    notes: ''
  });
  
  const [activeTab, setActiveTab] = useState('physical');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const tabs = [
    { id: 'physical', label: 'Physical', icon: <Heart className="w-4 h-4" /> },
    { id: 'sleep', label: 'Sleep', icon: <Moon className="w-4 h-4" /> },
    { id: 'mental', label: 'Mental', icon: <Brain className="w-4 h-4" /> },
    { id: 'vitals', label: 'Vitals', icon: <Activity className="w-4 h-4" /> },
    { id: 'lifestyle', label: 'Lifestyle', icon: <Target className="w-4 h-4" /> }
  ];
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Health Assessment</h2>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Form Content */}
      <div className="space-y-6">
        {activeTab === 'physical' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Pain Level: {formData.pain}/10
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.pain}
                onChange={(e) => setFormData({...formData, pain: parseInt(e.target.value)})}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>No Pain</span>
                <span>Severe Pain</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'sleep' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Sleep Hours: {formData.sleepHours}h
              </label>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={formData.sleepHours}
                onChange={(e) => setFormData({...formData, sleepHours: parseFloat(e.target.value)})}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Sleep Quality: {formData.sleepQuality}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.sleepQuality}
                onChange={(e) => setFormData({...formData, sleepQuality: parseInt(e.target.value)})}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        )}
        
        {activeTab === 'mental' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Mood: {formData.mood}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: parseInt(e.target.value)})}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Anxiety Level: {formData.anxiety}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.anxiety}
                onChange={(e) => setFormData({...formData, anxiety: parseInt(e.target.value)})}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        )}
        
        {activeTab === 'vitals' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Systolic BP</label>
              <input
                type="number"
                value={formData.vitals.systolic}
                onChange={(e) => setFormData({
                  ...formData, 
                  vitals: {...formData.vitals, systolic: parseInt(e.target.value)}
                })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Diastolic BP</label>
              <input
                type="number"
                value={formData.vitals.diastolic}
                onChange={(e) => setFormData({
                  ...formData, 
                  vitals: {...formData.vitals, diastolic: parseInt(e.target.value)}
                })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Heart Rate</label>
              <input
                type="number"
                value={formData.vitals.heartRate}
                onChange={(e) => setFormData({
                  ...formData, 
                  vitals: {...formData.vitals, heartRate: parseInt(e.target.value)}
                })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Temperature °F</label>
              <input
                type="number"
                step="0.1"
                value={formData.vitals.temperature}
                onChange={(e) => setFormData({
                  ...formData, 
                  vitals: {...formData.vitals, temperature: parseFloat(e.target.value)}
                })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
        )}
        
        {activeTab === 'lifestyle' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Hydration (glasses): {formData.lifestyle.hydration}
              </label>
              <input
                type="range"
                min="0"
                max="15"
                value={formData.lifestyle.hydration}
                onChange={(e) => setFormData({
                  ...formData, 
                  lifestyle: {...formData.lifestyle, hydration: parseInt(e.target.value)}
                })}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Exercise (minutes): {formData.lifestyle.exercise}
              </label>
              <input
                type="range"
                min="0"
                max="120"
                step="5"
                value={formData.lifestyle.exercise}
                onChange={(e) => setFormData({
                  ...formData, 
                  lifestyle: {...formData.lifestyle, exercise: parseInt(e.target.value)}
                })}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Additional Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Any symptoms, observations, or additional context..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white h-20"
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            Analyze Health Data
          </>
        )}
      </button>
    </form>
  );
});

// Dashboard Analytics Components
const HealthScoreGauge = memo(({ score, size = 150 }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return '#10B981'; // Green
    if (score >= 80) return '#84CC16'; // Light Green
    if (score >= 70) return '#F59E0B'; // Yellow
    if (score >= 60) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };
  
  const getScoreLabel = (score) => {
    if (score >= 90) return 'Optimal';
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Concerning';
    return 'Critical';
  };
  
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke={getScoreColor(score)}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{score}</span>
          <span className="text-xs text-gray-600">{getScoreLabel(score)}</span>
        </div>
      </div>
    </div>
  );
});

const TrendChart = memo(({ data, metric = 'aiScore', title = 'Health Score Trend' }) => {
  const chartData = useMemo(() => {
    return data.slice(-30).map((entry, index) => ({
      day: index + 1,
      value: entry[metric] || 0,
      date: new Date(entry.timestamp).toLocaleDateString()
    }));
  }, [data, metric]);
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="day" 
            stroke="#6B7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              color: '#374151'
            }}
            formatter={(value) => [value, metric]}
            labelFormatter={(label) => `Day ${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

const RadarHealthChart = memo(({ data }) => {
  const latestEntry = data[data.length - 1];
  if (!latestEntry) return null;
  
  const radarData = [
    { subject: 'Physical', A: Math.max(0, 100 - (latestEntry.pain * 8)), fullMark: 100 },
    { subject: 'Sleep', A: latestEntry.sleepHours >= 7 ? 100 : latestEntry.sleepHours * 14.3, fullMark: 100 },
    { subject: 'Mental', A: (latestEntry.mood * 20), fullMark: 100 },
    { subject: 'Hydration', A: latestEntry.lifestyle?.hydration * 12.5 || 60, fullMark: 100 },
    { subject: 'Exercise', A: Math.min(100, (latestEntry.lifestyle?.exercise || 0) * 3.33), fullMark: 100 },
    { subject: 'Vitals', A: calculateVitalScore(latestEntry.vitals), fullMark: 100 }
  ];
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Health Dimensions</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#6B7280' }} />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fontSize: 10, fill: '#6B7280' }}
          />
          <Radar
            name="Current"
            dataKey="A"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.1}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
});

// Main App Component
const HealthInfo = () => {
  const initialState = {
    entries: [],
    currentScore: 0,
    streak: 0,
    lastUpdate: null,
    notifications: [],
    preferences: {
      notificationsEnabled: true,
      language: 'en'
    }
  };
  
  const [state, dispatch] = useReducer(healthReducer, initialState);
  const [activeView, setActiveView] = useState('dashboard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Generate AI insights
  const aiInsights = useMemo(() => {
    return generateAIInsights(state, state.entries, state.preferences);
  }, [state.entries, state.currentScore]);
  
  // Auto-generate notifications based on AI insights
  useEffect(() => {
    aiInsights.forEach(insight => {
      if (insight.priority === 'urgent' && !state.notifications.find(n => n.title === insight.title)) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: Date.now() + Math.random(),
            ...insight,
            timestamp: new Date().toISOString()
          }
        });
      }
    });
  }, [aiInsights]);
  
  const handleHealthSubmit = useCallback(async (formData) => {
    setIsSubmitting(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    dispatch({ type: 'ADD_HEALTH_ENTRY', payload: formData });
    setActiveView('dashboard');
    setIsSubmitting(false);
  }, []);
  
  const handleNotificationDismiss = useCallback((id) => {
    dispatch({ type: 'DISMISS_NOTIFICATION', payload: id });
  }, []);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `health-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [state]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" /> },
    { id: 'assessment', label: 'Assessment', icon: <Heart className="w-5 h-5" /> },
    { id: 'insights', label: 'AI Insights', icon: <Brain className="w-5 h-5" /> },
    { id: 'trends', label: 'Trends', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  AI Health Intelligence
                </h1>
                <p className="text-gray-600">
                  Advanced health monitoring & predictive analytics
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {state.streak > 0 && (
                <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg border border-green-200">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {state.streak} day streak
                  </span>
                </div>
              )}
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors border border-gray-300"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-2 mb-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm ${
                  activeView === item.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Notifications */}
          {state.notifications.length > 0 && (
            <div className="space-y-3 mb-6">
              {state.notifications.slice(0, 3).map(notification => (
                <NotificationBadge
                  key={notification.id}
                  notification={notification}
                  onDismiss={handleNotificationDismiss}
                />
              ))}
            </div>
          )}
        </header>

        {/* Main Content */}
        <main>
          {activeView === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Health Score */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Current Health Score
                </h2>
                <HealthScoreGauge score={state.currentScore} />
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Last updated: {state.lastUpdate ? new Date(state.lastUpdate).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600">Avg Pain</p>
                      <p className="text-xl font-bold text-gray-800">
                        {state.entries.length > 0 
                          ? (state.entries.reduce((sum, e) => sum + e.pain, 0) / state.entries.length).toFixed(1)
                          : '0.0'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Moon className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Avg Sleep</p>
                      <p className="text-xl font-bold text-gray-800">
                        {state.entries.length > 0 
                          ? (state.entries.reduce((sum, e) => sum + e.sleepHours, 0) / state.entries.length).toFixed(1) + 'h'
                          : '0.0h'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Brain className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600">Avg Mood</p>
                      <p className="text-xl font-bold text-gray-800">
                        {state.entries.length > 0 
                          ? (state.entries.reduce((sum, e) => sum + e.mood, 0) / state.entries.length).toFixed(1)
                          : '0.0'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Entries</p>
                      <p className="text-xl font-bold text-gray-800">
                        {state.entries.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              {state.entries.length > 0 && (
                <>
                  <div className="lg:col-span-2">
                    <TrendChart data={state.entries} />
                  </div>
                  <div>
                    <RadarHealthChart data={state.entries} />
                  </div>
                </>
              )}

              {/* Recent Insights */}
              {aiInsights.length > 0 && (
                <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Health Insights
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {aiInsights.slice(0, 4).map((insight, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-start gap-3">
                          {insight.type === 'achievement' && <Award className="w-5 h-5 text-yellow-500 mt-1" />}
                          {insight.type === 'alert' && <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />}
                          {insight.type === 'recommendation' && <Target className="w-5 h-5 text-blue-500 mt-1" />}
                          {insight.type === 'pattern' && <TrendingUp className="w-5 h-5 text-purple-500 mt-1" />}
                          <div>
                            <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{insight.message}</p>
                            <div className="text-xs text-gray-500 mt-2">
                              Confidence: {insight.confidence}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'assessment' && (
            <HealthAssessmentForm onSubmit={handleHealthSubmit} isSubmitting={isSubmitting} />
          )}

          {activeView === 'insights' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
                  <Brain className="w-8 h-8 text-purple-500" />
                  Advanced AI Health Intelligence
                </h2>
                
                {aiInsights.length > 0 ? (
                  <div className="space-y-4">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                            {insight.type === 'achievement' && <Award className="w-6 h-6 text-white" />}
                            {insight.type === 'alert' && <AlertTriangle className="w-6 h-6 text-white" />}
                            {insight.type === 'recommendation' && <Target className="w-6 h-6 text-white" />}
                            {insight.type === 'pattern' && <TrendingUp className="w-6 h-6 text-white" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {insight.title}
                            </h3>
                            <p className="text-gray-600 mb-3">
                              {insight.message}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-gray-500">
                                <Shield className="w-4 h-4" />
                                Confidence: {insight.confidence}%
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                insight.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                insight.priority === 'high' ? 'bg-amber-100 text-amber-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {insight.priority} priority
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      No insights available yet
                    </h3>
                    <p className="text-gray-500">
                      Complete a few health assessments to unlock AI-powered insights.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeView === 'trends' && (
            <div className="space-y-6">
              {state.entries.length > 0 ? (
                <>
                  <TrendChart data={state.entries} metric="pain" title="Pain Trend (0-10)" />
                  <TrendChart data={state.entries} metric="sleepHours" title="Sleep Hours Trend" />
                  <TrendChart data={state.entries} metric="mood" title="Mood Trend (1-5)" />
                  <RadarHealthChart data={state.entries} />
                </>
              ) : (
                <div className="bg-white rounded-xl p-12 shadow-lg text-center border border-gray-200">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No trend data available
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start logging your health data to see trends and patterns.
                  </p>
                  <button
                    onClick={() => setActiveView('assessment')}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                  >
                    Start Assessment
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-700">Export Data</label>
                  <button
                    onClick={exportData}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    <p>Total Entries: {state.entries.length}</p>
                    <p>Current Streak: {state.streak} days</p>
                    <p>Last Update: {state.lastUpdate ? new Date(state.lastUpdate).toLocaleDateString() : 'Never'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthInfo;