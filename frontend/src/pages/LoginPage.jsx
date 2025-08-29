import React, { useState } from 'react';
import { Eye, EyeOff, Leaf, Mail, Lock, ArrowRight, User, Phone } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login data:', formData);
      setIsLoading(false);
      // Handle login logic here
    }, 1500);
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
        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-2xl shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Continue your wellness journey</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
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
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
              <span>Continue with Google</span>
            </button>
            <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <button 
            onClick={() => {
              window.location.href = "/register";
            }}
            className="text-green-600 hover:text-green-700 font-semibold transition-colors">
              Create Account
            </button>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <button className="text-green-600 hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-green-600 hover:underline">Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;