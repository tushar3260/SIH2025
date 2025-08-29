import React from 'react';
import { motion } from 'motion/react';
import { Clock, Star, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServicesProps {
  onBookAppointment: () => void;
}

export function Services({ onBookAppointment }: ServicesProps) {
  const services = [
    {
      name: 'Abhyanga',
      description: 'Full-body warm oil massage that nourishes the skin, calms the nervous system, and promotes deep relaxation.',
      duration: '90 mins',
      price: '$150',
      rating: 4.9,
      popular: true,
      benefits: ['Stress Relief', 'Improved Circulation', 'Detoxification'],
    },
    {
      name: 'Shirodhara',
      description: 'Continuous pouring of warm oil on the forehead to calm the mind and treat anxiety, insomnia, and stress.',
      duration: '60 mins',
      price: '$120',
      rating: 4.8,
      popular: false,
      benefits: ['Mental Clarity', 'Better Sleep', 'Anxiety Relief'],
    },
    {
      name: 'Panchakarma',
      description: 'Comprehensive detoxification program designed to eliminate toxins and restore natural balance.',
      duration: '5-7 days',
      price: '$800',
      rating: 5.0,
      popular: true,
      benefits: ['Deep Detox', 'Immune Boost', 'Rejuvenation'],
    },
    {
      name: 'Udvartana',
      description: 'Herbal powder massage that helps with weight management, improves skin texture, and enhances circulation.',
      duration: '75 mins',
      price: '$130',
      rating: 4.7,
      popular: false,
      benefits: ['Weight Management', 'Skin Health', 'Lymphatic Drainage'],
    },
    {
      name: 'Nasya',
      description: 'Nasal therapy using medicated oils to treat respiratory issues, headaches, and sinus problems.',
      duration: '45 mins',
      price: '$80',
      rating: 4.6,
      popular: false,
      benefits: ['Respiratory Health', 'Sinus Relief', 'Mental Clarity'],
    },
    {
      name: 'Ayurvedic Consultation',
      description: 'Personalized assessment of your constitution (Prakriti) and current state (Vikriti) with lifestyle recommendations.',
      duration: '60 mins',
      price: '$100',
      rating: 4.9,
      popular: true,
      benefits: ['Personalized Plan', 'Lifestyle Guidance', 'Health Assessment'],
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-green-600">Ayurvedic Therapies</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience authentic healing treatments designed to restore balance and promote wellness through time-tested Ayurvedic practices.
          </p>
        </motion.div>

        {/* Featured Service */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card className="overflow-hidden bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center p-8">
              <div>
                <Badge className="bg-green-600 text-white mb-4">Most Popular</Badge>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Complete Wellness Package</h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  A comprehensive 3-session package combining consultation, Abhyanga massage, and Shirodhara therapy 
                  for the ultimate Ayurvedic healing experience.
                </p>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">3 sessions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-gray-700">4.9 rating</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">$320</div>
                </div>
                <Button 
                  onClick={onBookAppointment}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full group"
                >
                  Book This Package
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBtYXNzYWdlJTIwdGhlcmFweSUyMHNwYSUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NTU4NjE3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Ayurvedic massage therapy"
                  className="w-full h-[300px] object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-green-100 group hover:border-green-300">
                <CardHeader className="relative">
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                      Popular
                    </Badge>
                  )}
                  <CardTitle className="text-xl text-gray-800 group-hover:text-green-600 transition-colors">
                    {service.name}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{service.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.benefits.map((benefit) => (
                      <Badge key={benefit} variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                        {benefit}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-green-100">
                    <div className="text-2xl font-bold text-green-600">{service.price}</div>
                    <Button 
                      onClick={onBookAppointment}
                      variant="outline" 
                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white group"
                    >
                      Book Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Not sure which therapy is right for you?</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Book a consultation with our experienced Ayurvedic practitioners to receive personalized recommendations based on your unique constitution and health goals.
            </p>
            <Button 
              onClick={onBookAppointment}
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-full font-semibold"
            >
              Schedule Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}