import React, { useState } from 'react';
import { Eye, EyeOff, Leaf, Mail, Lock, ArrowRight, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Email is required' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return false;
    }
    if (!formData.password.trim()) {
      setMessage({ type: 'error', text: 'Password is required' });
      return false;
    }
    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate login success/failure
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo
      
      if (isSuccess) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        
        // Simulate redirect after success
        setTimeout(() => {
          alert('Login successful! Would redirect to dashboard.');
        }, 1500);
      } else {
        setMessage({ type: 'error', text: 'Invalid email or password. Please try again.' });
      }
      
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address first' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }
    
    setMessage({ type: 'success', text: 'Password reset link sent to your email!' });
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setMessage({ type: 'info', text: `Connecting to ${provider}...` });
    
    setTimeout(() => {
      setMessage({ type: 'success', text: `${provider} login successful!` });
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-amber-100 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-green-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl animate-ping" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-bounce" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-xl shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600">Continue your wellness journey</p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`mb-4 p-3 rounded-lg text-xs font-medium flex items-center space-x-2 ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : message.type === 'info'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Mail className="w-4 h-4 text-green-600" />
                <span>Email Address</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-300 bg-white shadow-sm text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Lock className="w-4 h-4 text-green-600" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2.5 pr-10 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-300 bg-white shadow-sm text-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" 
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-sm text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social Login */}
          {/* <div className="space-y-3">
            <button 
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 text-sm"
            >
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span>Continue with Google</span>
            </button>
            
            <button 
              onClick={() => handleSocialLogin('Apple')}
              disabled={isLoading}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 text-sm"
            >
              <div className="w-4 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🍎</span>
              </div>
              <span>Continue with Apple</span>
            </button>
          </div> */}

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <button 
              onClick={() => { window.location.href = "/register" }}
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <button className="text-green-600 hover:underline transition-colors">Terms of Service</button>
            {' '}and{' '}
            <button className="text-green-600 hover:underline transition-colors">Privacy Policy</button>
          </p>
        </div>


      </div>
    </div>
  );
};

export default LoginPage;
