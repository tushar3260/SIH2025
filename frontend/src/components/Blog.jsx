import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Your Dosha: A Complete Guide to Ayurvedic Constitution',
      excerpt: 'Discover how to identify your unique dosha type and create a personalized wellness routine that aligns with your natural constitution for optimal health and balance.',
      image: 'https://images.unsplash.com/photo-1724833190236-0c25b6c94e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBibG9nJTIwd2VsbG5lc3MlMjBtZWRpdGF0aW9uJTIweW9nYXxlbnwxfHx8fDE3NTU4NjE4ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      author: 'Dr. Rajesh Sharma',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Constitution',
      tags: ['Dosha', 'Wellness', 'Personalized Care'],
      featured: true,
    },
    {
      id: 2,
      title: 'Ayurvedic Nutrition: Eating According to Your Body Type',
      excerpt: 'Learn how to choose foods that support your dosha, improve digestion, and enhance your overall well-being through ancient Ayurvedic dietary principles.',
      image: 'https://images.unsplash.com/photo-1670698783848-5cf695a1b308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG51dHJpdGlvbiUyMGF5dXJ2ZWRhJTIwZGlldHxlbnwxfHx8fDE3NTU4NjE4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      author: 'Dr. Priya Nair',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Nutrition',
      tags: ['Diet', 'Digestion', 'Lifestyle'],
      featured: false,
    },
    {
      id: 3,
      title: 'The Power of Daily Routines: Dinacharya for Modern Life',
      excerpt: 'Explore how incorporating Ayurvedic daily routines can improve your energy levels, sleep quality, and overall health in our fast-paced modern world.',
      image: 'https://images.unsplash.com/photo-1557735587-58e316c41219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBtZWRpdGF0aW9uJTIwd2VsbG5lc3MlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzU1ODYxODk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      author: 'Dr. Arun Kumar',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'Lifestyle',
      tags: ['Routine', 'Energy', 'Balance'],
      featured: false,
    },
    {
      id: 4,
      title: 'Seasonal Cleansing: Preparing Your Body for Change',
      excerpt: 'Understand the importance of seasonal detox and how Panchakarma treatments can help your body adapt to changing seasons naturally.',
      image: 'https://images.unsplash.com/photo-1724833190236-0c25b6c94e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBibG9nJTIwd2VsbG5lc3MlMjBtZWRpdGF0aW9uJTIweW9nYXxlbnwxfHx8fDE3NTU4NjE4ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      author: 'Dr. Arun Kumar',
      date: '2024-01-01',
      readTime: '9 min read',
      category: 'Detox',
      tags: ['Panchakarma', 'Seasonal', 'Cleansing'],
      featured: false,
    },
    {
      id: 5,
      title: 'Managing Stress Naturally: Ayurvedic Approaches to Mental Wellness',
      excerpt: 'Discover effective Ayurvedic techniques for managing stress, anxiety, and promoting mental clarity through natural therapies and lifestyle changes.',
      image: 'https://images.unsplash.com/photo-1557735587-58e316c41219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBtZWRpdGF0aW9uJTIwd2VsbG5lc3MlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzU1ODYxODk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      author: 'Dr. Priya Nair',
      date: '2023-12-28',
      readTime: '5 min read',
      category: 'Mental Health',
      tags: ['Stress', 'Anxiety', 'Mental Wellness'],
      featured: false,
    },
  ];

  const categories = ['All', 'Constitution', 'Nutrition', 'Lifestyle', 'Detox', 'Mental Health'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Wellness <span className="text-green-600">Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the latest insights, tips, and knowledge about Ayurvedic wellness, natural healing, and healthy living.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'border-green-600 text-green-600 hover:bg-green-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {featuredPost && selectedCategory === 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <Card className="overflow-hidden shadow-2xl border-green-200 group hover:shadow-3xl transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 text-white">Featured</Badge>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-green-50 text-green-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock classNameName="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full w-fit group">
                    Read Full Article
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(selectedCategory === 'All' ? regularPosts : filteredPosts).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-green-100 group">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-green-700">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-green-50 text-green-700 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-green-100">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3" />
                      <span>{post.author.split(' ')[1]}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 group">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white overflow-hidden">
            <CardContent className="p-8 lg:p-12 text-center">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Stay Updated with Wellness Tips
              </h3>
              <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and receive weekly insights, seasonal wellness tips, and exclusive content from our Ayurvedic experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-full text-gray-8 00 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-full font-semibold">
                  Subscribe
                </Button>
              </div>
              <p className="text-green-200 text-sm mt-4">
                Join 5,000+ subscribers. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 