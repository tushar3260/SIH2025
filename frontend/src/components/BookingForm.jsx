import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Mail, Stethoscope } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from "sonner@2.0.3";

export function BookingForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    therapy: '',
    date: '',
    time: '',
    notes: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const therapies = [
    { value: 'consultation', label: 'Ayurvedic Consultation', duration: '60 mins', price: '$100' },
    { value: 'abhyanga', label: 'Abhyanga (Full Body Massage)', duration: '90 mins', price: '$150' },
    { value: 'shirodhara', label: 'Shirodhara (Oil Pouring)', duration: '60 mins', price: '$120' },
    { value: 'panchakarma', label: 'Panchakarma Program', duration: '5-7 days', price: '$800' },
    { value: 'udvartana', label: 'Udvartana (Herbal Powder Massage)', duration: '75 mins', price: '$130' },
    { value: 'nasya', label: 'Nasya (Nasal Therapy)', duration: '45 mins', price: '$80' },
    { value: 'wellness-package', label: 'Complete Wellness Package', duration: '3 sessions', price: '$320' },
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.therapy || !formData.date || !formData.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Appointment booked successfully! We will contact you shortly to confirm.');
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        therapy: '',
        date: '',
        time: '',
        notes: '',
      });
      
      onClose();
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedTherapy = therapies.find(t => t.value === formData.therapy);
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-green-200 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <CardTitle className="text-2xl flex items-center space-x-3">
              <Calendar className="w-6 h-6" />
              <span>Book Your Appointment</span>
            </CardTitle>
            <p className="text-green-100">
              Schedule your personalized Ayurvedic consultation and therapy session
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-green-600" />
                    <span>Full Name *</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>Phone Number *</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span>Email Address *</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-green-200 focus:border-green-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Stethoscope className="w-4 h-4 text-green-600" />
                  <span>Select Therapy *</span>
                </Label>
                <Select onValueChange={(value) => handleInputChange('therapy', value)} required>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Choose your preferred therapy" />
                  </SelectTrigger>
                  <SelectContent>
                    {therapies.map((therapy) => (
                      <SelectItem key={therapy.value} value={therapy.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{therapy.label}</span>
                          <span className="text-sm text-gray-500">
                            {therapy.duration} • {therapy.price}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTherapy && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-green-50 p-4 rounded-lg border border-green-200"
                >
                  <h4 className="font-semibold text-green-800 mb-2">Selected Therapy:</h4>
                  <p className="text-green-700">{selectedTherapy.label}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-green-600">
                    <span>Duration: {selectedTherapy.duration}</span>
                    <span>Price: {selectedTherapy.price}</span>
                  </div>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span>Preferred Date *</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>Preferred Time *</span>
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('time', value)} required>
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific concerns, health conditions, or preferences you'd like us to know about..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="border-green-200 focus:border-green-500 min-h-[80px]"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Important Information:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Please arrive 15 minutes before your appointment</li>
                  <li>• Bring a list of current medications and supplements</li>
                  <li>• Wear comfortable, loose-fitting clothing</li>
                  <li>• Avoid heavy meals 2 hours before your session</li>
                </ul>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Booking...</span>
                    </div>
                  ) : (
                    'Book Appointment'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 