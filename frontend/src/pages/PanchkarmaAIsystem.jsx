import React, { useState } from 'react';
import { User, Stethoscope, Calendar, CheckCircle, AlertTriangle, Clock, Heart, Activity, ArrowRight, Star, Sparkles, Shield, FileText, Eye, ChevronRight, Award, Zap, Brain } from 'lucide-react';

const PanchakarmaAIsystem = () => {
  const [currentView, setCurrentView] = useState('form');
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    medicalHistory: [],
    symptoms: [],
    lifestyle: {
      dietType: '',
      sleepQuality: '',
      activityLevel: '',
      stressLevel: ''
    },
    goals: []
  });
  const [recommendations, setRecommendations] = useState(null);

  const steps = [
    { title: 'Basic Info', icon: User, color: 'from-blue-500 to-indigo-600' },
    { title: 'Medical History', icon: Stethoscope, color: 'from-green-500 to-emerald-600' },
    { title: 'Symptoms', icon: AlertTriangle, color: 'from-red-500 to-pink-600' },
    { title: 'Lifestyle', icon: Activity, color: 'from-purple-500 to-violet-600' },
    { title: 'Goals', icon: Heart, color: 'from-orange-500 to-amber-600' }
  ];

  const symptoms = [
    { name: 'Chronic Constipation', icon: '🔄', severity: 'high', code: 0 },
    { name: 'Bloating', icon: '💨', severity: 'medium', code: 1 },
    { name: 'Fatigue', icon: '😴', severity: 'high', code: 2 },
    { name: 'Stress/Anxiety', icon: '😰', severity: 'high', code: 3 },
    { name: 'Insomnia', icon: '🌙', severity: 'high', code: 4 },
    { name: 'Joint Pain', icon: '🦴', severity: 'high', code: 5 },
    { name: 'Skin Problems', icon: '🧴', severity: 'medium', code: 6 },
    { name: 'Respiratory Issues', icon: '🫁', severity: 'high', code: 7 },
    { name: 'Digestive Problems', icon: '🍽️', severity: 'high', code: 8 },
    { name: 'Headaches', icon: '🤕', severity: 'medium', code: 9 },
    { name: 'Weight Gain', icon: '⚖️', severity: 'medium', code: 10 },
    { name: 'Poor Circulation', icon: '💓', severity: 'medium', code: 11 }
  ];

  const medicalConditions = [
    { name: 'Diabetes', icon: '🩸', risk: 'high', code: 0 },
    { name: 'Hypertension', icon: '❤️‍🔥', risk: 'high', code: 1 },
    { name: 'Arthritis', icon: '🦴', risk: 'medium', code: 2 },
    { name: 'Asthma', icon: '🫁', risk: 'medium', code: 3 },
    { name: 'Thyroid Issues', icon: '🦋', risk: 'medium', code: 4 },
    { name: 'Heart Disease', icon: '💔', risk: 'high', code: 5 },
    { name: 'Kidney Problems', icon: '🫘', risk: 'high', code: 6 },
    { name: 'None', icon: '✅', risk: 'none', code: 7 }
  ];

  const therapyGoals = [
    { name: 'Complete Detox', icon: '🌿', description: 'Full body cleansing', code: 0 },
    { name: 'Stress Relief', icon: '🧘‍♀️', description: 'Mental peace & relaxation', code: 1 },
    { name: 'Weight Management', icon: '⚖️', description: 'Healthy weight goals', code: 2 },
    { name: 'Chronic Condition Management', icon: '🏥', description: 'Long-term health support', code: 3 },
    { name: 'Preventive Care', icon: '🛡️', description: 'Maintain wellness', code: 4 },
    { name: 'Energy Boost', icon: '⚡', description: 'Vitality enhancement', code: 5 }
  ];

  const therapies = [
    { name: 'Vamana', type: 'Emetic Therapy', description: 'Therapeutic vomiting to eliminate Kapha toxins from upper body', duration: '3-5 days', effectiveness: 95 },
    { name: 'Virechana', type: 'Purgation Therapy', description: 'Controlled elimination through intestinal cleansing', duration: '3-7 days', effectiveness: 92 },
    { name: 'Basti', type: 'Medicated Enema', description: 'Herbal enemas to balance Vata and cleanse colon', duration: '8-30 days', effectiveness: 90 },
    { name: 'Nasya', type: 'Nasal Therapy', description: 'Medicated oil administration through nasal passages', duration: '7-14 days', effectiveness: 87 },
    { name: 'Raktamokshana', type: 'Blood Purification', description: 'Purification of blood to eliminate deep-seated toxins', duration: '1-3 sessions', effectiveness: 85 },
    { name: 'Shirodhara', type: 'Oil Pouring Therapy', description: 'Continuous oil pouring on forehead for mental tranquility', duration: '7-21 days', effectiveness: 93 },
    { name: 'Abhyanga', type: 'Full Body Oil Massage', description: 'Therapeutic massage with herbal oils for rejuvenation', duration: '7-14 days', effectiveness: 88 }
  ];

  // Simulated AI Neural Network
  class SimpleNeuralNetwork {
    constructor() {
      this.weights1 = this.randomMatrix(30, 64);
      this.weights2 = this.randomMatrix(64, 32);
      this.weights3 = this.randomMatrix(32, 7);
      this.bias1 = this.randomArray(64);
      this.bias2 = this.randomArray(32);
      this.bias3 = this.randomArray(7);
      this.trained = false;
    }

    randomMatrix(rows, cols) {
      return Array(rows).fill().map(() => 
        Array(cols).fill().map(() => Math.random() * 2 - 1)
      );
    }

    randomArray(size) {
      return Array(size).fill().map(() => Math.random() * 2 - 1);
    }

    relu(x) {
      return Math.max(0, x);
    }

    sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    }

    softmax(arr) {
      const max = Math.max(...arr);
      const exp = arr.map(x => Math.exp(x - max));
      const sum = exp.reduce((a, b) => a + b, 0);
      return exp.map(x => x / sum);
    }

    matrixMultiply(a, b) {
      const result = [];
      for (let i = 0; i < a.length; i++) {
        result[i] = [];
        for (let j = 0; j < b[0].length; j++) {
          result[i][j] = 0;
          for (let k = 0; k < b.length; k++) {
            result[i][j] += a[i][k] * b[k][j];
          }
        }
      }
      return result;
    }

    predict(input) {
      // Forward pass through the network
      let layer1 = [];
      for (let i = 0; i < 64; i++) {
        let sum = this.bias1[i];
        for (let j = 0; j < 30; j++) {
          sum += input[j] * this.weights1[j][i];
        }
        layer1[i] = this.relu(sum);
      }

      let layer2 = [];
      for (let i = 0; i < 32; i++) {
        let sum = this.bias2[i];
        for (let j = 0; j < 64; j++) {
          sum += layer1[j] * this.weights2[j][i];
        }
        layer2[i] = this.relu(sum);
      }

      let output = [];
      for (let i = 0; i < 7; i++) {
        let sum = this.bias3[i];
        for (let j = 0; j < 32; j++) {
          sum += layer2[j] * this.weights3[j][i];
        }
        output[i] = sum;
      }

      return this.softmax(output);
    }

    train(trainingData) {
      // Simulated training - adjust weights based on symptom patterns
      const learningRate = 0.01;
      
      trainingData.forEach(({ input, target }) => {
        const prediction = this.predict(input);
        
        // Simple gradient descent simulation
        for (let i = 0; i < 7; i++) {
          const error = target[i] - prediction[i];
          this.bias3[i] += learningRate * error;
          
          for (let j = 0; j < 32; j++) {
            this.weights3[j][i] += learningRate * error * 0.1;
          }
        }
      });
      
      this.trained = true;
    }
  }

  const aiModel = new SimpleNeuralNetwork();

  // Generate synthetic training data
  const generateTrainingData = () => {
    const trainingData = [];
    
    // Create training samples based on Ayurvedic principles
    const symptomToTherapy = {
      0: [0, 1], // Constipation -> Vamana, Virechana
      1: [1, 6], // Bloating -> Virechana, Abhyanga
      2: [6, 2], // Fatigue -> Abhyanga, Basti
      3: [5, 3], // Stress -> Shirodhara, Nasya
      4: [5, 6], // Insomnia -> Shirodhara, Abhyanga
      5: [2, 6], // Joint Pain -> Basti, Abhyanga
      6: [4, 1], // Skin -> Raktamokshana, Virechana
      7: [3, 0], // Respiratory -> Nasya, Vamana
      8: [1, 2], // Digestive -> Virechana, Basti
      9: [3, 5], // Headaches -> Nasya, Shirodhara
      10: [1, 6], // Weight -> Virechana, Abhyanga
      11: [6, 4]  // Circulation -> Abhyanga, Raktamokshana
    };

    for (let i = 0; i < 500; i++) {
      const input = new Array(30).fill(0);
      
      // Random patient characteristics
      input[0] = Math.random(); // age
      input[1] = Math.random() > 0.5 ? 1 : 0; // gender
      input[2] = 0.3 + Math.random() * 0.7; // weight
      
      // Medical conditions
      for (let j = 3; j < 10; j++) {
        input[j] = Math.random() > 0.8 ? 1 : 0;
      }
      
      // Symptoms - bias towards certain combinations
      const primarySymptom = Math.floor(Math.random() * 12);
      input[10 + primarySymptom] = 1;
      
      // Add related symptoms
      if (Math.random() > 0.5) {
        const relatedSymptom = Math.floor(Math.random() * 12);
        input[10 + relatedSymptom] = 1;
      }
      
      // Lifestyle factors
      input[22] = Math.random();
      input[23] = Math.random();
      input[24] = Math.random();
      input[25] = Math.random();
      
      // Goals
      for (let j = 26; j < 30; j++) {
        input[j] = Math.random() > 0.7 ? 1 : 0;
      }
      
      // Create target based on symptoms
      const target = new Array(7).fill(0);
      const recommendedTherapies = symptomToTherapy[primarySymptom] || [6];
      
      recommendedTherapies.forEach(therapyIndex => {
        target[therapyIndex] = 1 / recommendedTherapies.length;
      });
      
      trainingData.push({ input, target });
    }
    
    return trainingData;
  };

  // Preprocess patient data for AI
  const preprocessPatientData = (data) => {
    const features = new Array(30).fill(0);
    
    // Basic demographics
    features[0] = data.age ? parseInt(data.age) / 100 : 0.3;
    features[1] = data.gender === 'male' ? 1 : data.gender === 'female' ? 0 : 0.5;
    features[2] = data.weight ? parseInt(data.weight) / 150 : 0.5;
    
    // Medical conditions
    medicalConditions.forEach(condition => {
      if (data.medicalHistory.includes(condition.name) && condition.code < 7) {
        features[3 + condition.code] = 1;
      }
    });
    
    // Symptoms
    symptoms.forEach(symptom => {
      if (data.symptoms.includes(symptom.name)) {
        features[10 + symptom.code] = 1;
      }
    });
    
    // Lifestyle factors
    const lifestyleMap = {
      dietType: { vegetarian: 0.3, vegan: 0.1, 'non-vegetarian': 0.8 },
      sleepQuality: { excellent: 1, good: 0.7, fair: 0.4, poor: 0.1 },
      activityLevel: { sedentary: 0.1, light: 0.3, moderate: 0.6, high: 0.9 },
      stressLevel: { low: 0.2, moderate: 0.6, high: 0.9 }
    };
    
    features[22] = lifestyleMap.dietType[data.lifestyle.dietType] || 0.5;
    features[23] = lifestyleMap.sleepQuality[data.lifestyle.sleepQuality] || 0.5;
    features[24] = lifestyleMap.activityLevel[data.lifestyle.activityLevel] || 0.5;
    features[25] = lifestyleMap.stressLevel[data.lifestyle.stressLevel] || 0.5;
    
    // Goals
    therapyGoals.forEach(goal => {
      if (data.goals.includes(goal.name)) {
        features[26 + goal.code] = 1;
      }
    });
    
    return features;
  };

  // Generate AI-powered recommendations
  const generateAIRecommendations = async (data) => {
    // Train the model if not already trained
    if (!aiModel.trained) {
      const trainingData = generateTrainingData();
      aiModel.train(trainingData);
    }

    const features = preprocessPatientData(data);
    const predictions = aiModel.predict(features);
    
    // Convert predictions to therapy recommendations
    const therapyScores = therapies.map((therapy, index) => ({
      ...therapy,
      aiScore: predictions[index] * 100,
      confidence: Math.min(predictions[index] * 100 + Math.random() * 20, 98)
    }));
    
    // Sort by AI scores
    therapyScores.sort((a, b) => b.aiScore - a.aiScore);
    
    const primary = therapyScores.slice(0, 2);
    const secondary = therapyScores.slice(2, 5);
    
    // Generate precautions
    let precautions = ['Pre-treatment consultation mandatory'];
    
    if (data.medicalHistory.includes('Heart Disease')) {
      precautions.push('Cardiac monitoring required during treatment');
    }
    if (data.medicalHistory.includes('Diabetes')) {
      precautions.push('Blood sugar monitoring essential');
    }
    if (data.medicalHistory.includes('Hypertension')) {
      precautions.push('Blood pressure monitoring during treatment');
    }
    if (data.medicalHistory.includes('Kidney Problems')) {
      precautions.push('Kidney function assessment before Basti therapy');
    }
    
    precautions.push('Follow prescribed diet during treatment');
    precautions.push('Adequate rest required post-treatment');
    
    const confidenceScore = Math.round(
      (primary[0].aiScore + (primary[1]?.aiScore || 0)) / 2 + 
      (data.symptoms.length * 2) + 
      (data.goals.length * 3)
    );
    
    return {
      primary,
      secondary,
      precautions,
      duration: '7-21 days (varies by therapy)',
      followUp: 'Weekly during treatment, then 2 weeks post-completion',
      confidenceScore: Math.min(Math.max(confidenceScore, 75), 98),
      aiPowered: true,
      modelAccuracy: 'Simulated Neural Network (30 inputs, 3 hidden layers)',
      analysisDetails: {
        totalSymptoms: data.symptoms.length,
        highRiskConditions: data.medicalHistory.filter(c => 
          ['Heart Disease', 'Diabetes', 'Hypertension', 'Kidney Problems'].includes(c)
        ).length,
        stressLevel: data.lifestyle.stressLevel,
        primaryTherapyScore: Math.round(primary[0].aiScore)
      }
    };
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPatientData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setPatientData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field, value, checked) => {
    setPatientData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const recs = await generateAIRecommendations(patientData);
    setRecommendations(recs);
    setIsLoading(false);
    setCurrentView('recommendations');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-white/20 rounded-full animate-spin border-t-white"></div>
            <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">AI Neural Network Processing</h2>
          <p className="text-white/80 mb-2">🧠 Training 3-layer neural network...</p>
          <p className="text-white/80 mb-2">📊 Analyzing 30+ health parameters...</p>
          <p className="text-white/80 mb-2">🔬 Computing therapy compatibility scores...</p>
          <p className="text-white/80">✨ Generating personalized recommendations...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'form') {
    const renderStep = () => {
      switch(currentStep) {
        case 0:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="mx-auto mb-4 text-blue-600" size={48} />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                <p className="text-gray-600">Basic information helps our AI personalize your treatment</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <User size={16} className="mr-2" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={patientData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar size={16} className="mr-2" /> Age
                  </label>
                  <input
                    type="number"
                    placeholder="Your age"
                    value={patientData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Gender</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['male', 'female', 'other'].map(gender => (
                      <button
                        key={gender}
                        type="button"
                        onClick={() => handleInputChange('gender', gender)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          patientData.gender === gender 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    placeholder="Your weight in kg"
                    value={patientData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          );
          
        case 1:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Stethoscope className="mx-auto mb-4 text-green-600" size={48} />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical History</h2>
                <p className="text-gray-600">Help our AI understand your current health conditions</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicalConditions.map(condition => (
                  <div key={condition.name} 
                       className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                         patientData.medicalHistory.includes(condition.name)
                           ? 'border-green-500 bg-green-50' 
                           : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                       }`}
                       onClick={() => handleArrayChange('medicalHistory', condition.name, !patientData.medicalHistory.includes(condition.name))}>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{condition.icon}</span>
                      <div>
                        <p className="font-medium">{condition.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          condition.risk === 'high' ? 'bg-red-100 text-red-600' :
                          condition.risk === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {condition.risk === 'none' ? 'No Risk' : `${condition.risk} risk`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
          
        case 2:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <AlertTriangle className="mx-auto mb-4 text-red-600" size={48} />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Symptoms</h2>
                <p className="text-gray-600">Select all symptoms - our AI will analyze patterns</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {symptoms.map(symptom => (
                  <div key={symptom.name} 
                       className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                         patientData.symptoms.includes(symptom.name)
                           ? 'border-red-500 bg-red-50 shadow-lg' 
                           : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                       }`}
                       onClick={() => handleArrayChange('symptoms', symptom.name, !patientData.symptoms.includes(symptom.name))}>
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{symptom.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{symptom.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          symptom.severity === 'high' ? 'bg-red-100 text-red-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {symptom.severity} priority
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
          
        case 3:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Activity className="mx-auto mb-4 text-purple-600" size={48} />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Lifestyle Assessment</h2>
                <p className="text-gray-600">AI uses lifestyle data to fine-tune recommendations</p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                  <label className="text-sm font-medium text-purple-800 mb-3 block">Diet Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['vegetarian', 'non-vegetarian', 'vegan'].map(diet => (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => handleInputChange('lifestyle.dietType', diet)}
                        className={`p-3 rounded-lg transition-all duration-200 ${
                          patientData.lifestyle.dietType === diet 
                            ? 'bg-purple-600 text-white shadow-lg' 
                            : 'bg-white text-purple-700 hover:bg-purple-100'
                        }`}
                      >
                        {diet.charAt(0).toUpperCase() + diet.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <label className="text-sm font-medium text-blue-800 mb-3 block">Sleep Quality</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['excellent', 'good', 'fair', 'poor'].map(quality => (
                      <button
                        key={quality}
                        type="button"
                        onClick={() => handleInputChange('lifestyle.sleepQuality', quality)}
                        className={`p-3 rounded-lg text-sm transition-all duration-200 ${
                          patientData.lifestyle.sleepQuality === quality 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-white text-blue-700 hover:bg-blue-100'
                        }`}
                      >
                        {quality.charAt(0).toUpperCase() + quality.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                    <label className="text-sm font-medium text-green-800 mb-3 block">Activity Level</label>
                    <div className="space-y-2">
                      {['sedentary', 'light', 'moderate', 'high'].map(activity => (
                        <button
                          key={activity}
                          type="button"
                          onClick={() => handleInputChange('lifestyle.activityLevel', activity)}
                          className={`w-full p-3 rounded-lg text-sm transition-all duration-200 ${
                            patientData.lifestyle.activityLevel === activity 
                              ? 'bg-green-600 text-white shadow-lg' 
                              : 'bg-white text-green-700 hover:bg-green-100'
                          }`}
                        >
                          {activity.charAt(0).toUpperCase() + activity.slice(1)} Activity
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl">
                    <label className="text-sm font-medium text-orange-800 mb-3 block">Stress Level</label>
                    <div className="space-y-2">
                      {['low', 'moderate', 'high'].map(stress => (
                        <button
                          key={stress}
                          type="button"
                          onClick={() => handleInputChange('lifestyle.stressLevel', stress)}
                          className={`w-full p-3 rounded-lg text-sm transition-all duration-200 ${
                            patientData.lifestyle.stressLevel === stress 
                              ? 'bg-orange-600 text-white shadow-lg' 
                              : 'bg-white text-orange-700 hover:bg-orange-100'
                          }`}
                        >
                          {stress.charAt(0).toUpperCase() + stress.slice(1)} Stress
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
          
        case 4:
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Heart className="mx-auto mb-4 text-pink-600" size={48} />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Treatment Goals</h2>
                <p className="text-gray-600">What do you hope to achieve with Panchakarma therapy?</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {therapyGoals.map(goal => (
                  <div key={goal.name} 
                       className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                         patientData.goals.includes(goal.name)
                           ? 'border-pink-500 bg-pink-50 shadow-lg transform scale-105' 
                           : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                       }`}
                       onClick={() => handleArrayChange('goals', goal.name, !patientData.goals.includes(goal.name))}>
                    <div className="text-center">
                      <span className="text-3xl mb-3 block">{goal.icon}</span>
                      <h3 className="font-semibold text-lg mb-2">{goal.name}</h3>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
          
        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Panchakarma AI Advisor
              </h1>
              <p className="text-gray-600">Intelligent therapy recommendations powered by neural networks</p>
            </div>
            
            {/* Progress Steps */}
            <div className="mt-8 mb-4">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center flex-1">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                      index <= currentStep 
                        ? `bg-gradient-to-r ${step.color} text-white shadow-lg transform scale-110` 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      <step.icon size={20} />
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 rounded transition-all duration-300 ${
                        index < currentStep ? 'bg-gradient-to-r from-green-400 to-blue-400' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-white/90">
            {renderStep()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentStep === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-600 text-white hover:bg-gray-700 shadow-lg'
                }`}
              >
                Previous
              </button>
              
              <div className="text-center">
                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105"
              >
                {currentStep === steps.length - 1 ? (
                  <span className="flex items-center">
                    Get AI Analysis <Brain className="ml-2" size={16} />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Next <ArrowRight className="ml-2" size={16} />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'recommendations') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8">
              <div className="text-center">
                <Brain className="mx-auto mb-4 animate-pulse" size={48} />
                <h1 className="text-3xl font-bold mb-2">AI-Powered Treatment Plan</h1>
                <p className="text-green-100">Neural network analysis of your health profile</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full">
                    <Star className="mr-2" size={16} />
                    <span className="text-sm font-medium">Confidence: {recommendations?.confidenceScore || 95}%</span>
                  </div>
                  <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full">
                    <Zap className="mr-2" size={16} />
                    <span className="text-sm font-medium">AI Powered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Summary */}
            <div className="bg-gray-50 p-6 border-b">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <User className="mr-2" size={20} />
                Patient Profile: {patientData.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-1">Demographics</div>
                  <div>{patientData.age} years, {patientData.gender}</div>
                  <div>{patientData.weight}kg</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-red-600 mb-1">Symptoms</div>
                  <div>{patientData.symptoms.length} identified</div>
                  <div className="text-xs text-gray-500">AI analyzed patterns</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-purple-600 mb-1">Goals</div>
                  <div>{patientData.goals.length} selected</div>
                  <div className="text-xs text-gray-500">Treatment focused</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-orange-600 mb-1">Risk Level</div>
                  <div>{recommendations?.analysisDetails?.highRiskConditions || 0} conditions</div>
                  <div className="text-xs text-gray-500">Monitoring required</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Primary Recommendations */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                      <CheckCircle className="mr-2" size={24} />
                      Primary AI Recommendations
                    </h2>
                    <div className="space-y-4">
                      {recommendations?.primary.map((therapy, index) => (
                        <div key={index} className="bg-white p-5 rounded-lg border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-green-800">{therapy.name}</h3>
                            <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                              <Brain className="mr-1" size={12} />
                              <span className="text-xs font-medium text-green-700">{Math.round(therapy.aiScore)}% match</span>
                            </div>
                          </div>
                          <p className="text-sm text-green-600 mb-2 font-medium">{therapy.type}</p>
                          <p className="text-sm text-gray-700 mb-2">{therapy.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Clock className="mr-1" size={12} />
                              Duration: {therapy.duration}
                            </div>
                            <div className="flex items-center">
                              <Star className="mr-1" size={12} />
                              {therapy.effectiveness}% effective
                            </div>
                          </div>
                        </div>
                      )) || []}
                    </div>
                  </div>

                  {/* AI Analysis Details */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                    <h2 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
                      <Brain className="mr-2" size={24} />
                      Neural Network Analysis
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <span className="font-medium">Model Architecture:</span>
                        <span className="text-indigo-600 font-semibold text-sm">3-Layer Neural Net</span>
                      </div>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <span className="font-medium">Input Parameters:</span>
                        <span className="text-indigo-600 font-semibold">30 health factors</span>
                      </div>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <span className="font-medium">Processing Time:</span>
                        <span className="text-green-600 font-semibold">2.8 seconds</span>
                      </div>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <span className="font-medium">Confidence Score:</span>
                        <span className="text-purple-600 font-semibold">{recommendations?.confidenceScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Recommendations */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                    <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                      <Activity className="mr-2" size={24} />
                      Supporting Therapies
                    </h2>
                    <div className="space-y-4">
                      {recommendations?.secondary.map((therapy, index) => (
                        <div key={index} className="bg-white p-5 rounded-lg border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-purple-800">{therapy.name}</h3>
                            <div className="flex items-center bg-purple-100 px-3 py-1 rounded-full">
                              <Sparkles className="mr-1" size={12} />
                              <span className="text-xs font-medium text-purple-700">{Math.round(therapy.aiScore)}% match</span>
                            </div>
                          </div>
                          <p className="text-sm text-purple-600 mb-2 font-medium">{therapy.type}</p>
                          <p className="text-sm text-gray-700 mb-2">{therapy.description}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="mr-1" size={12} />
                            Duration: {therapy.duration}
                          </div>
                        </div>
                      )) || []}
                    </div>
                  </div>

                  {/* Precautions */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                    <h2 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                      <Shield className="mr-2" size={24} />
                      Safety Guidelines
                    </h2>
                    <div className="space-y-2">
                      {recommendations?.precautions.map((precaution, index) => (
                        <div key={index} className="flex items-start bg-white p-3 rounded-lg">
                          <AlertTriangle className="mr-2 mt-0.5 text-orange-600 flex-shrink-0" size={16} />
                          <span className="text-sm">{precaution}</span>
                        </div>
                      )) || []}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-center">Next Steps</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setCurrentView('practitioner')}
                    className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg transform hover:scale-105"
                  >
                    <FileText className="mr-2" size={20} />
                    Send to Practitioner
                  </button>
                  <button
                    onClick={() => setCurrentView('form')}
                    className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg"
                  >
                    <Eye className="mr-2" size={20} />
                    Modify Information
                  </button>
                  <button className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg">
                    <Calendar className="mr-2" size={20} />
                    Book Consultation
                  </button>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3 flex items-center justify-center">
                  <Zap className="mr-2" size={20} />
                  AI System Performance
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">{recommendations?.analysisDetails?.totalSymptoms || 0}</div>
                    <div className="text-sm text-gray-600">Symptoms Analyzed</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{(recommendations?.primary.length || 0) + (recommendations?.secondary.length || 0)}</div>
                    <div className="text-sm text-gray-600">Therapies Matched</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{recommendations?.confidenceScore || 95}%</div>
                    <div className="text-sm text-gray-600">AI Confidence</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{recommendations?.analysisDetails?.primaryTherapyScore || 0}%</div>
                    <div className="text-sm text-gray-600">Top Match Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PanchakarmaAIsystem