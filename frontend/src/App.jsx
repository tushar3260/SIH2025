import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Doctors } from './components/Doctors';
import { Testimonials } from './components/Testimonials';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { BookingForm } from './components/BookingForm';
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleBookAppointment = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6 animate-gentle-float">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">AyurVeda Wellness</h1>
          <p className="text-gray-600">Preparing your wellness journey...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onBookAppointment={handleBookAppointment} />

      <main className="overflow-x-hidden">
        <Hero onBookAppointment={handleBookAppointment} />
        <About />
        <Services onBookAppointment={handleBookAppointment} />
        <Doctors onBookAppointment={handleBookAppointment} />
        <Testimonials />
        <Blog />
        <Contact onBookAppointment={handleBookAppointment} />
      </main>

      <BookingForm 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
      />

      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#f0f7f0',
            border: '1px solid #22c55e',
            color: '#1a3e2e',
          },
        }}
      />

      <motion.button
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl z-40 md:hidden"
        onClick={handleBookAppointment}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </motion.button>

      <motion.button
        className="fixed bottom-20 right-6 bg-white/90 hover:bg-white text-green-600 p-3 rounded-full shadow-lg border border-green-200 z-40 backdrop-blur-sm"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.3 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
} 