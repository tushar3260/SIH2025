import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      age: 34,
      condition: 'Chronic Stress & Anxiety',
      image: 'https://images.unsplash.com/photo-1659353888818-0e41520d086a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjB3ZWxsbmVzcyUyMHRlc3RpbW9uaWFsJTIwbmF0dXJhbCUyMGhlYWx0aHxlbnwxfHx8fDE3NTU4NjE4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      testimonial: "The Shirodhara treatment completely transformed my life. After struggling with anxiety and insomnia for years, Dr. Sharma's personalized approach helped me find inner peace. I sleep better, feel more balanced, and have a renewed sense of vitality.",
      treatment: 'Shirodhara & Consultation',
      duration: '3 months',
    },
    {
      name: 'Michael Chen',
      age: 42,
      condition: 'Digestive Issues',
      image: 'https://images.unsplash.com/photo-1659353888818-0e41520d086a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjB3ZWxsbmVzcyUyMHRlc3RpbW9uaWFsJTIwbmF0dXJhbCUyMGhlYWx0aHxlbnwxfHx8fDE3NTU4NjE4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      testimonial: "After years of digestive problems and multiple failed treatments, the Panchakarma program was a game-changer. Dr. Kumar's expertise in detoxification helped me regain my health and energy. I feel like a new person!",
      treatment: 'Panchakarma Program',
      duration: '2 weeks',
    },
    {
      name: 'Emily Rodriguez',
      age: 29,
      condition: 'Skin & Hormonal Issues',
      image: 'https://images.unsplash.com/photo-1659353888818-0e41520d086a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjB3ZWxsbmVzcyUyMHRlc3RpbW9uaWFsJTIwbmF0dXJhbCUyMGhlYWx0aHxlbnwxfHx8fDE3NTU4NjE4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      testimonial: "Dr. Priya Nair's holistic approach to women's health was exactly what I needed. The combination of dietary changes, herbal treatments, and Abhyanga massage cleared my skin and balanced my hormones naturally.",
      treatment: 'Women\'s Wellness Program',
      duration: '4 months',
    },
    {
      name: 'Robert Williams',
      age: 55,
      condition: 'Joint Pain & Stiffness',
      image: 'https://images.unsplash.com/photo-1659353888818-0e41520d086a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjB3ZWxsbmVzcyUyMHRlc3RpbW9uaWFsJTIwbmF0dXJhbCUyMGhlYWx0aHxlbnwxfHx8fDE3NTU4NjE4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      testimonial: "The Abhyanga massage therapy and specialized joint care treatments have given me my mobility back. I was skeptical at first, but the results speak for themselves. No more morning stiffness!",
      treatment: 'Joint Care Program',
      duration: '6 weeks',
    },
    {
      name: 'Lisa Thompson',
      age: 38,
      condition: 'Chronic Fatigue',
      image: 'https://images.unsplash.com/photo-1659353888818-0e41520d086a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjB3ZWxsbmVzcyUyMHRlc3RpbW9uaWFsJTIwbmF0dXJhbCUyMGhlYWx0aHxlbnwxfHx8fDE3NTU4NjE4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      testimonial: "I came to the center feeling completely drained and exhausted. The personalized treatment plan including Rasayana therapy and lifestyle modifications restored my energy levels completely. I feel vibrant again!",
      treatment: 'Rejuvenation Therapy',
      duration: '2 months',
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-green-50">
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
            What Our <span className="text-green-600">Patients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who have experienced the transformative power of Ayurvedic healing.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Card className="max-w-4xl mx-auto overflow-hidden bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-2xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <Quote className="w-12 h-12 text-green-600 mb-6 opacity-50" />
                  
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonials[currentIndex].testimonial}"
                  </blockquote>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-gray-800">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600">
                      Age {testimonials[currentIndex].age} • {testimonials[currentIndex].condition}
                    </p>
                    <p className="text-green-600 font-medium">
                      {testimonials[currentIndex].treatment} • {testimonials[currentIndex].duration}
                    </p>
                  </div>
                </div>
                
                <div className="relative h-64 lg:h-full">
                  <ImageWithFallback
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-4 mb-16">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="rounded-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-green-600 w-8' 
                    : 'bg-green-200 hover:bg-green-400'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="rounded-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`cursor-pointer ${index === currentIndex ? 'ring-2 ring-green-600' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-green-100 hover:border-green-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    "{testimonial.testimonial}"
                  </p>
                  
                  <div className="pt-4 border-t border-green-100">
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.treatment}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
                <p className="text-gray-600 text-sm">Average Rating</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <p className="text-gray-600 text-sm">Satisfaction Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <p className="text-gray-600 text-sm">Reviews</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                <p className="text-gray-600 text-sm">Recommend Us</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}