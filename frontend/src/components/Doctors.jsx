import React from 'react';
import { motion } from 'motion/react';
import { Star, Award, Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Doctors({ onBookAppointment }) {
  const doctors = [
    {
      name: 'Dr. Rajesh Sharma',
      title: 'Chief Ayurvedic Physician',
      image: 'https://images.unsplash.com/photo-1659353887222-630895f23cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBpbmRpYW4lMjBheXVydmVkaWMlMjBwcmFjdGl0aW9uZXJ8ZW58MXx8fHwxNzU1ODYxODA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      experience: '20+ Years',
      patients: '5000+',
      rating: 4.9,
      specializations: ['Panchakarma', 'Digestive Disorders', 'Stress Management'],
      education: 'BAMS, MD (Ayurveda), Kerala Ayurveda Academy',
      description: 'Dr. Sharma is a renowned Ayurvedic physician with over two decades of experience in traditional healing. He specializes in complex chronic conditions and personalized treatment approaches.',
      languages: ['English', 'Hindi', 'Sanskrit'],
    },
    {
      name: 'Dr. Priya Nair',
      title: 'Senior Ayurvedic Consultant',
      image: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzU1ODYxODA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      experience: '15+ Years',
      patients: '3500+',
      rating: 4.8,
      specializations: ['Women\'s Health', 'Skincare', 'Mental Wellness'],
      education: 'BAMS, PG Diploma in Ayurveda, Mumbai University',
      description: 'Dr. Nair is an expert in women\'s health and wellness, with a special focus on hormonal balance, skincare, and mental well-being through Ayurvedic principles.',
      languages: ['English', 'Hindi', 'Malayalam'],
    },
    {
      name: 'Dr. Arun Kumar',
      title: 'Panchakarma Specialist',
      image: 'https://images.unsplash.com/photo-1659353885824-1199aeeebfc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBkb2N0b3IlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NTU4NjE4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      experience: '18+ Years',
      patients: '4200+',
      rating: 4.9,
      specializations: ['Detoxification', 'Joint & Muscle Care', 'Respiratory Health'],
      education: 'BAMS, MS (Panchakarma), All India Institute of Ayurveda',
      description: 'Dr. Kumar is a master of Panchakarma therapy with extensive experience in detoxification treatments and rejuvenation therapies for optimal health and longevity.',
      languages: ['English', 'Hindi', 'Tamil'],
    },
  ];

  return (
    <section id="doctors" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Meet Our <span className="text-green-600">Expert Practitioners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of certified Ayurvedic physicians brings decades of experience and deep knowledge of traditional healing practices.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-green-100 overflow-hidden group">
                <div className="relative">
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-800">{doctor.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                    <p className="text-green-600 font-medium">{doctor.title}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{doctor.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{doctor.patients}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">{doctor.description}</p>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Specializations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary" className="bg-green-50 text-green-700 text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p><strong>Education:</strong> {doctor.education}</p>
                    <p><strong>Languages:</strong> {doctor.languages.join(', ')}</p>
                  </div>

                  <Button 
                    onClick={onBookAppointment}
                    className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full group"
                  >
                    Book with {doctor.name.split(' ')[1]}
                    <Calendar className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-green-100"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Why Choose Our <span className="text-green-600">Expert Team</span>
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600">50+</div>
              <p className="text-gray-600">Years Combined Experience</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600">12K+</div>
              <p className="text-gray-600">Patients Treated</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600">4.9</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <p className="text-gray-600">Consultation Support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 