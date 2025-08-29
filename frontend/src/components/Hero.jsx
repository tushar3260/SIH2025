import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Users, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero({ onBookAppointment }) {
  const stats = [
    { icon: Users, value: '5000+', label: 'Happy Clients' },
    { icon: Star, value: '4.9', label: 'Rating' },
    { icon: Clock, value: '15+', label: 'Years Experience' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://i.pinimg.com/1200x/1f/43/49/1f434959e13ac00bc4413f5ac7c2fecc.jpg"
          alt="Ayurvedic wellness and meditation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        <div className="absolute inset-0 bg-green-700/60"></div>
      </div>

      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-16 h-16 bg-yellow-400/20 rounded-full"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-12 h-12 bg-orange-400/20 rounded-full"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the art of Ayurveda and Panchkarma
          </motion.h1>

          <motion.p 
            className="text-xl sm:text-2xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Restore balance to your mind, body, and spirit with authentic Ayurvedic therapies and personalized wellness treatments.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              onClick={onBookAppointment}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
            >
              Book Your Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-green-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
} 