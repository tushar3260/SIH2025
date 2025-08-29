import React from 'react';
import { motion } from 'motion/react';
import { Heart, Leaf, Zap, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const principles = [
    {
      icon: Heart,
      title: 'Holistic Healing',
      description: 'We treat the whole person, not just symptoms, addressing mind, body, and spirit.',
    },
    {
      icon: Leaf,
      title: 'Natural Remedies',
      description: 'Using pure herbs and natural ingredients following ancient Ayurvedic traditions.',
    },
    {
      icon: Zap,
      title: 'Energy Balance',
      description: 'Restoring the natural balance of your three doshas for optimal health.',
    },
    {
      icon: Shield,
      title: 'Prevention Focus',
      description: 'Emphasis on preventing illness through lifestyle and dietary guidance.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About Our <span className="text-green-600">Wellness Center</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With over 15 years of experience in authentic Ayurvedic practices, we bring ancient wisdom to modern wellness.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              The Science of Life & Longevity
            </h3>
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Ayurveda, the world's oldest healing system, originated in India over 5,000 years ago. 
              The word "Ayurveda" comes from the Sanskrit words "ayur" (life) and "veda" (knowledge), 
              literally meaning "the science of life."
            </p>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our center combines traditional Ayurvedic principles with modern wellness practices 
              to create personalized treatment plans that address your unique constitutional type 
              and health goals.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Authentic Practices</h4>
                <p className="text-gray-600 text-sm">Traditional methods passed down through generations</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Personalized Care</h4>
                <p className="text-gray-600 text-sm">Treatments tailored to your individual constitution</p>
              </div>
            </div>
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
                src="https://images.unsplash.com/photo-1677599082447-6549af4c5454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBoZXJicyUyMHNwaWNlcyUyMG5hdHVyYWwlMjBtZWRpY2luZXxlbnwxfHx8fDE3NTU4NjE2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Ayurvedic herbs and natural medicine"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
            </div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-green-100"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">15+</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Years of Experience</p>
                  <p className="text-gray-600 text-sm">in Ayurvedic Practice</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Core <span className="text-green-600">Principles</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <principle.icon className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">{principle.title}</h4>
                <p className="text-gray-600 leading-relaxed">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 