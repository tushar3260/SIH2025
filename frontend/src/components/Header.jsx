import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from './ui/button';

export function Header({ onBookAppointment }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg'
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-800">
              AyurVeda Wellness
            </span>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </motion.button>
            ))}
            <Button 
              onClick={onBookAppointment}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book Appointment
            </Button>
          </nav>

          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white rounded-lg shadow-xl mt-2 py-4 px-4 border border-green-100"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-green-100">
              <Button 
                onClick={onBookAppointment}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full"
              >
                Book Appointment
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
} 