import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, FileText, AlertCircle } from 'lucide-react';
import axios from 'axios';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const patientId = JSON.parse(localStorage.getItem('user'))?.id;
  
  // Base API URL from environment variables
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
   
  useEffect(() => {
    fetchAppointments();
  }, [patientId, filter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        `${API_BASE_URL}/appointments/me/${patientId}`,
        {
          params: { status: filter },
          timeout: 10000,
        }
      );
      
      console.log('API Response:', response.data); // Debug के लिए
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Please try again.');
      } else if (err.response) {
        setError(err.response.data?.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diff = (endTime - startTime) / (1000 * 60);
    return `${diff} min`;
  };

  // Handle appointment actions
  const handleCancel = async (appointmentId) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/appointments/${appointmentId}`,
        { status: 'cancelled' }
      );
      
      if (response.status === 200) {
        fetchAppointments(); // Refresh data
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setError('Failed to cancel appointment');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading appointments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
          <div className="flex items-center mb-3">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-red-800 font-medium">Error</span>
          </div>
          <p className="text-red-700 text-sm">{error}</p>
          <button 
            onClick={fetchAppointments}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Appointments</h1>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === status
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No appointments found</p>
            <p className="text-gray-400 text-sm">Try adjusting your filter or schedule a new appointment</p>
          </div>
        ) : (
          appointments.map(appointment => (
            <div key={appointment._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Card Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatDate(appointment.start)}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {formatTime(appointment.start)} - {formatTime(appointment.end)}
                        </span>
                        <span className="text-gray-400">
                          ({getDuration(appointment.start, appointment.end)})
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${getStatusStyles(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-4">
                {/* Practitioner Info - ✅ Updated for new data structure */}
                <div className="flex items-start space-x-3 mb-4">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {/* ✅ Access practitioner name from nested user object */}
                      Dr. {appointment.practitioner?.user?.name || 'Unknown Practitioner'}
                    </h3>
                    {/* ✅ Handle specialty array */}
                    {appointment.practitioner?.specialty && appointment.practitioner.specialty.length > 0 && (
                      <p className="text-sm text-gray-600">
                        {appointment.practitioner.specialty.join(', ')}
                      </p>
                    )}
                    {/* ✅ Access email from nested user object
                    {appointment.practitioner?.user?.email && (
                      <p className="text-sm text-gray-500">
                        {appointment.practitioner.user.email}
                      </p>
                    )} */}
                    {/* ✅ Show practitioner ID for reference
                    <p className="text-xs text-gray-400">
                      ID: {appointment.practitioner?._id}
                    </p> */}
                  </div>
                </div>

                {/* Therapy Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Therapy Details</h4>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Type:</span> {appointment.therapy?.name || 'Not specified'}
                  </p>
                  {appointment.therapy?.description && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Description:</span> {appointment.therapy.description}
                    </p>
                  )}
                  {appointment.therapy?.duration && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Duration:</span> {appointment.therapy.duration} minutes
                    </p>
                  )}
                  {appointment.therapy?.price && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Price:</span> ₹{appointment.therapy.price}
                    </p>
                  )}
                </div>

                {/* Notes */}
                {appointment.notes && (
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Notes</h4>
                      <p className="text-sm text-gray-600">{appointment.notes}</p>
                    </div>
                  </div>
                )}

                {/* Created/Updated Info */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Created: {new Date(appointment.createdAt).toLocaleDateString('en-IN')}</span>
                    <span>Updated: {new Date(appointment.updatedAt).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {appointment.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => console.log('Reschedule', appointment._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                      >
                        Reschedule
                      </button>
                      <button 
                        onClick={() => handleCancel(appointment._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {appointment.status === 'confirmed' && (
                    <button 
                      onClick={() => console.log('Join Session', appointment._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                    >
                      Join Session
                    </button>
                  )}
                  {appointment.status === 'completed' && (
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                      View Report
                    </button>
                  )}
                  <button 
                    onClick={() => console.log('View Details', appointment._id)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
