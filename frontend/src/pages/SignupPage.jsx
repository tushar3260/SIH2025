import React, { useState } from 'react';
import { Eye, EyeOff, Leaf, Mail, Lock, ArrowRight, User, Phone, Shield } from 'lucide-react';

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup data:', {
        ...formData,
        passwordHash: formData.password // This would be hashed on backend
      });
      setIsLoading(false);
      // Handle signup logic here
    }, 1500);
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-amber-200/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-green-300/25 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-amber-300/20 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Signup Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-2xl shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent mb-2">
              Join AyurVeda
            </h1>
            <p className="text-gray-600">Begin your wellness transformation</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep >= 1 ? 'bg-green-600' : 'bg-gray-200'
              }`}></div>
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep >= 2 ? 'bg-green-600' : 'bg-gray-200'
              }`}></div>
            </div>
          </div>

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4 text-green-600" />
                  <span>Full Name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span>Phone Number (Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Account Type</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                  <option value="patient">Patient - Seeking Wellness</option>
                  <option value="practitioner">Practitioner - Ayurveda Expert</option>
                  <option value="admin">Admin - System Administrator</option>
                </select>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Password Setup */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-green-50/50 backdrop-blur-sm rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <span>At least 8 characters</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      /[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <span>One uppercase letter</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      /[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <span>One number</span>
                  </li>
                </ul>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1" 
                  required 
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <button className="text-green-600 hover:underline">Terms of Service</button>
                  {' '}and{' '}
                  <button className="text-green-600 hover:underline">Privacy Policy</button>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Divider - Only show on step 1 */}
          {currentStep === 1 && (
            <>
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Social Signup */}
              <div className="space-y-3">
                <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                  <span>Sign up with Google</span>
                </button>
                <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                  <span>Sign up with Apple</span>
                </button>
              </div>
            </>
          )}

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button 
            onClick={() => {
              window.location.href = "/login";
            } }
            className="text-green-600 hover:text-green-700 font-semibold transition-colors">
              Sign In
            </button>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our{' '}
            <button className="text-green-600 hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-green-600 hover:underline">Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;