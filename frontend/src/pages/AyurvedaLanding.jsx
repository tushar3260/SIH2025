import React, { useState, useEffect } from 'react';
import { ChevronRight, Leaf, Heart, Star, Users, Award, Phone, Mail, MapPin, Menu, X, ArrowUp } from 'lucide-react';

const AyurvedaLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    {
      icon: <Leaf className="w-12 h-12 text-green-600" />,
      title: "Herbal Medicine",
      description: "Traditional Ayurvedic herbs and formulations crafted with ancient wisdom for modern wellness."
    },
    {
      icon: <Heart className="w-12 h-12 text-green-600" />,
      title: "Wellness Consultation",
      description: "Personalized health assessment and treatment plans based on your unique dosha constitution."
    },
    {
      icon: <Star className="w-12 h-12 text-green-600" />,
      title: "Panchakarma Therapy",
      description: "Complete detoxification and rejuvenation treatments for deep healing and restoration."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      text: "Ayurveda transformed my health completely. The holistic approach helped me find balance in life.",
      rating: 5
    },
    {
      name: "Rajesh Kumar", 
      text: "After years of modern medicine, I found true healing through these ancient practices.",
      rating: 5
    },
    {
      name: "Anjali Gupta",
      text: "The personalized treatment plan was exactly what I needed. Feeling healthier than ever!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
                AyurVeda
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">About</a>
              <a href="#services" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Services</a>
              <a href="#testimonials" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Reviews</a>
              <a href="#contact" className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Contact Us
              </a>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-4">
              <a href="#home" className="block text-gray-700 hover:text-green-600 transition-colors py-2">Home</a>
              <a href="#about" className="block text-gray-700 hover:text-green-600 transition-colors py-2">About</a>
              <a href="#services" className="block text-gray-700 hover:text-green-600 transition-colors py-2">Services</a>
              <a href="#testimonials" className="block text-gray-700 hover:text-green-600 transition-colors py-2">Reviews</a>
              <a href="#contact" className="block bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full text-center">
                Contact Us
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-amber-600/10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-amber-200/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300/40 rounded-full animate-ping"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Discover Ancient
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-amber-500 bg-clip-text text-transparent block">
                Ayurvedic Wisdom
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience holistic healing through time-tested Ayurvedic practices. 
              Restore balance, enhance vitality, and embrace natural wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 group">
                <span>Start Your Journey</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                5000 Years of 
                <span className="text-green-600"> Healing Wisdom</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ayurveda, the "science of life," is one of the world's oldest healing systems. 
                Our approach combines traditional knowledge with modern understanding to provide 
                personalized healthcare solutions that treat the root cause, not just symptoms.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600">5000+</div>
                  <div className="text-gray-600">Years of Tradition</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl">
                  <div className="text-3xl font-bold text-amber-600">1000+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-200 to-amber-200 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-32 h-32 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-green-600">Healing Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive Ayurvedic treatments tailored to your unique constitution and health needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What Our <span className="text-green-600">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600">Real stories of transformation and healing</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 text-center">
                  "{testimonial.text}"
                </p>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-green-600 to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Begin Your <span className="text-green-200">Healing Journey</span>
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Ready to experience the transformative power of Ayurveda? Contact us today for a personalized consultation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center text-white">
              <Phone className="w-12 h-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-green-100">+91 98765 43210</p>
            </div>
            <div className="text-center text-white">
              <Mail className="w-12 h-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-green-100">info@ayurveda.com</p>
            </div>
            <div className="text-center text-white">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-green-100">Mathura, Uttar Pradesh</p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Book Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold">AyurVeda</span>
              </div>
              <p className="text-gray-400">
                Ancient wisdom for modern wellness. Experience the transformative power of Ayurveda.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-400 hover:text-green-400 transition-colors">Home</a>
                <a href="#about" className="block text-gray-400 hover:text-green-400 transition-colors">About</a>
                <a href="#services" className="block text-gray-400 hover:text-green-400 transition-colors">Services</a>
                <a href="#contact" className="block text-gray-400 hover:text-green-400 transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <div className="space-y-2">
                <div className="text-gray-400">Herbal Medicine</div>
                <div className="text-gray-400">Wellness Consultation</div>
                <div className="text-gray-400">Panchakarma</div>
                <div className="text-gray-400">Yoga Therapy</div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div>+91 98765 43210</div>
                <div>info@ayurveda.com</div>
                <div>Mathura, Uttar Pradesh</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AyurVeda. All rights reserved. Ancient wisdom, modern care.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-50 hover:scale-110"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default AyurvedaLanding;