import React, { useState } from 'react';
import { Plus, Leaf, Clock, DollarSign, User, FileText, Sparkles, Loader2 } from 'lucide-react';

const AddTherapy = () => {
  const [therapy, setTherapy] = useState({
    name: '',
    description: '',
    code: '',
    duration: '',
    price: ''
  });

  // Mock practitioner ID - in real app, this would come from authentication
  const pracId = JSON.parse(localStorage.getItem("user")).id; // You can change this to actual practitioner ID
  console.log(pracId);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTherapy(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!therapy.name || !therapy.description || !therapy.code || !therapy.duration || !therapy.price || !pracId) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/therapies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: therapy.name,
          description: therapy.description,
          code: therapy.code,
          duration: parseInt(therapy.duration),
          price: parseFloat(therapy.price),
          practitionerId: pracId
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        setMessage({ type: 'success', text: 'Therapy added successfully!' });
        setTimeout(() => {
            window.history.back();
        }, 2000);
        // Reset form after successful submission
        setTherapy({
          name: '',
          description: '',
          code: '',
          duration: '',
          price: ''
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setMessage({ 
          type: 'error', 
          text: errorData.message || `Error: ${response.status} - ${response.statusText}` 
        });
      }

    } catch (error) {
      console.error('Error adding therapy:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage({ type: 'error', text: 'Network error. Please check if the server is running.' });
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">AyurSutra</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Therapy</h1>
          <p className="text-lg text-gray-600">Share your ancient healing wisdom with the world</p>
          <div className="flex items-center justify-center mt-4 space-x-2 text-green-600">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Ancient Healing, Reinvented for You</span>
            <Sparkles className="w-5 h-5" />
          </div>
          
          {/* Display current practitioner ID */}
          <div className="mt-4 p-3 bg-green-100 rounded-lg inline-block">
            <div className="flex items-center space-x-2 text-green-700">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Practitioner ID: {pracId}</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-yellow-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Leaf className="w-6 h-6 mr-3" />
              Therapy Details
            </h2>
            <p className="text-green-100 mt-2">Fill in the details of your Ayurvedic therapy</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Success/Error Message */}
            {message.text && (
              <div className={`p-4 rounded-lg border ${
                message.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center space-x-2">
                  {message.type === 'success' ? (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                  )}
                  <span className="font-medium">{message.text}</span>
                </div>
              </div>
            )}

            {/* Therapy Name */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Sparkles className="w-4 h-4 mr-2 text-green-500" />
                Therapy Name
              </label>
              <input
                type="text"
                name="name"
                value={therapy.name}
                onChange={handleInputChange}
                placeholder="e.g., Panchakarma Detox Therapy"
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2 text-green-500" />
                Description
              </label>
              <textarea
                name="description"
                value={therapy.description}
                onChange={handleInputChange}
                placeholder="Describe the therapy, its benefits, and healing properties..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors resize-none"
                required
              />
            </div>

            {/* Code and Duration Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <span className="w-4 h-4 mr-2 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">#</span>
                  Therapy Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={therapy.code}
                  onChange={handleInputChange}
                  placeholder="e.g., AYU001"
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 mr-2 text-green-500" />
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={therapy.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 60"
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={therapy.price}
                onChange={handleInputChange}
                placeholder="e.g., 2500"
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full font-bold py-4 px-8 rounded-lg transform transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-yellow-500 text-white hover:from-green-600 hover:to-yellow-600 hover:scale-105'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Adding Therapy...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add Therapy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-8 p-6 bg-white/50 rounded-xl border border-green-100">
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
            <Leaf className="w-5 h-5" />
            <span className="font-semibold">Discover the path to health, harmony, and inner peace with AyurSutra</span>
            <Leaf className="w-5 h-5" />
          </div>
          <p className="text-sm text-gray-600">Your therapy will be reviewed and made available to patients seeking holistic healing.</p>
        </div>

        {/* Debug Info */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
          <p><strong>Note:</strong> This is running in Claude artifacts. In your real application:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Replace the hardcoded pracId with actual user authentication</li>
            <li>The fetch API call will work with your localhost:5000 server</li>
            <li>You can copy this code to your React project</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddTherapy;