import React, { useState } from 'react';
import { Eye, EyeOff, Leaf, Mail, Lock, ArrowRight, User, Phone, Shield } from 'lucide-react';
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'patient',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Name is required' });
      return false;
    }
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Email is required' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email' });
      return false;
    }
    if (formData.password.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return false;
    }
    return true;
  };

  
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/register`,
        formData
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('API response:', response.data);
      const k =JSON.parse(localStorage.getItem('user'));

      if (response.data.success) {
        setMessage({ type: 'success', text: response.data.message || 'Account created successfully!' });
        
        // Use React Router navigation
        setTimeout(() => {
          if(k.role==="practitioner"){
            window.location.href = '/practitioner-setup';
          }
          else{
            window.location.href = '/dashboard';
          }
        }, 1500);

      } else {
        setMessage({ type: 'error', text: response.data.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('API error:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.name.trim() || !formData.email.trim()) {
        setMessage({ type: 'error', text: 'Please fill in all required fields' });
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setMessage({ type: 'error', text: 'Please enter a valid email address' });
        return;
      }
    }
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center p-3 relative">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-8 w-24 h-24 bg-green-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-20 h-20 bg-amber-200/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-16 left-16 w-16 h-16 bg-green-300/25 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-8 w-12 h-12 bg-amber-300/20 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-xl shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">Join AyurVeda</h1>
            <p className="text-sm text-gray-600">Begin your wellness transformation</p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`mb-4 p-3 rounded-lg text-xs font-medium ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${currentStep >= 1 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${currentStep >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            </div>
          </div>

          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <User className="w-4 h-4 text-green-600" /> <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-300 bg-white shadow-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <Mail className="w-4 h-4 text-green-600" /> <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-300 bg-white shadow-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <Phone className="w-4 h-4 text-green-600" /> <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-300 bg-white shadow-sm"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Role */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-600" /> <span>Account Type</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-300 bg-white shadow-sm"
                >
                  <option value="patient">Patient - Seeking Wellness</option>
                  <option value="practitioner">Practitioner - Ayurveda Expert</option>
                  <option value="admin">Admin - System Administrator</option>
                </select>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 text-sm rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Continue</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {/* Password & Confirm */}
              {['password', 'confirmPassword'].map((field,i) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <Lock className="w-4 h-4 text-green-600" /> <span>{field === 'password' ? 'Password *' : 'Confirm Password *'}</span>
                  </label>
                  <div className="relative">
                    <input
                      type={field === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password')}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 pr-10 text-sm border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-300 bg-white shadow-sm"
                      placeholder={field === 'password' ? 'Create a strong password' : 'Confirm your password'}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => field === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                    >
                      {field === 'password' ? (showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />) :
                        (showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
                    </button>
                  </div>
                </div>
              ))}

              {/* Password Requirements */}
              <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className={`flex items-center space-x-2`}><div className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div><span>At least 8 characters</span></li>
                  <li className={`flex items-center space-x-2`}><div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div><span>One uppercase letter</span></li>
                  <li className={`flex items-center space-x-2`}><div className={`w-2 h-2 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div><span>One number</span></li>
                </ul>
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-2">
                <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-0.5" required />
                <span className="text-sm text-gray-600">I agree to the <button className="text-green-600 hover:underline">Terms</button> and <button className="text-green-600 hover:underline">Privacy Policy</button></span>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button onClick={prevStep} className="flex-1 bg-gray-200 text-gray-700 py-2.5 text-sm rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300" disabled={isLoading}>Back</button>
                <button onClick={handleSubmit} disabled={isLoading} className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 text-sm rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <>
                    <span>Create Account</span> <ArrowRight className="w-4 h-4" />
                  </>}
                </button>
              </div>
            </div>
          )}

          {/* Sign In */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <button onClick={() => window.location.href = "/login"} className="text-sm text-green-600 hover:text-green-700 font-semibold transition-colors">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
