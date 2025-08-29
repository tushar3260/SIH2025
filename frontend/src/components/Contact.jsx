import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Contact({ onBookAppointment }) {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Center',
      content: ['123 Wellness Avenue', 'Green Valley, CA 90210', 'United States'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: ['+1 (555) 123-4567', '+1 (555) 987-6543', 'Emergency: +1 (555) 911-2345'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: ['info@ayurvedawellness.com', 'appointments@ayurvedawellness.com', 'support@ayurvedawellness.com'],
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      content: ['Monday - Saturday: 9:00 AM - 7:00 PM', 'Sunday: 10:00 AM - 5:00 PM', 'Consultations by appointment'],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Get in <span className="text-green-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to begin your wellness journey? Contact us to schedule a consultation or learn more about our services.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full p-6 border-green-100 hover:border-green-300 transition-colors group">
                    <CardContent className="p-0 space-y-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <info.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">{info.title}</h3>
                        <div className="space-y-1">
                          {info.content.map((line, i) => (
                            <p key={i} className="text-gray-600 text-sm leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Wellness Journey?</h3>
              <p className="text-green-100 mb-6">
                Book your consultation today and take the first step towards optimal health and well-being through Ayurveda.
              </p>
              <Button 
                onClick={onBookAppointment}
                className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-full font-semibold group"
              >
                Book Consultation Now
                <Phone className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1679236703546-8a26e1d83918?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjB3ZWxsbmVzcyUyMGNlbnRlciUyMGJ1aWxkaW5nJTIwc3BhfGVufDF8fHx8MTc1NTg2MTk4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Ayurvedic wellness center building"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>
            </div>
            
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-green-100"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-32 h-24 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-800 mt-2">Find us on Map</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-green-200 pt-12"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-800">
                  AyurVeda Wellness
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Authentic Ayurvedic healing and wellness treatments to restore balance and promote natural health through time-tested practices.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['About Us', 'Services', 'Doctors', 'Testimonials', 'Blog', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="block text-gray-600 hover:text-green-600 transition-colors text-sm"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Our Services</h4>
              <div className="space-y-2">
                {['Panchakarma', 'Abhyanga Massage', 'Shirodhara', 'Consultation', 'Herbal Medicine', 'Lifestyle Counseling'].map((service) => (
                  <p key={service} className="text-gray-600 text-sm">
                    {service}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-green-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2024 AyurVeda Wellness Center. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
} 