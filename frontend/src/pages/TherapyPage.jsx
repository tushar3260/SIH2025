import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, MapPin, Star, Phone, Mail, Calendar, Heart, Award, Users, Sparkles, ChevronDown, Play, Shield, Zap, Eye } from 'lucide-react';

const TherapyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
    const timer = setTimeout(() => setAnimateCards(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm]);

  const therapies = [
    {
      id: 1,
      name: "Cognitive Behavioral Therapy",
      shortName: "CBT",
      category: "individual",
      therapist: "Dr. Sarah Johnson",
      credentials: "PhD, LCSW",
      rating: 4.9,
      reviews: 247,
      duration: "50 min",
      price: 120,
      originalPrice: 150,
      location: "Downtown Wellness Center",
      address: "123 Main St, Suite 400",
      phone: "(555) 123-4567",
      email: "sarah.j@therapy.com",
      availability: "Next available: Tomorrow",
      specialties: ["Anxiety", "Depression", "PTSD", "OCD"],
      languages: ["English", "Spanish"],
      experience: "12 years",
      description: "Transform negative thought patterns with evidence-based CBT techniques. Specializing in anxiety, depression, and trauma recovery.",
      longDescription: "Dr. Johnson uses cutting-edge cognitive behavioral therapy techniques to help clients identify and change unhelpful thinking patterns. Her approach combines traditional CBT with mindfulness practices for lasting change.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop",
      verified: true,
      featured: true,
      badge: "Most Popular",
      sessionTypes: ["In-Person", "Virtual", "Phone"],
      nextSession: "Today 3:00 PM",
      responseTime: "Usually responds within 2 hours"
    },
    {
      id: 2,
      name: "Psychodynamic Therapy",
      shortName: "Psychodynamic",
      category: "individual",
      therapist: "Dr. Marcus Rivera",
      credentials: "MD, Psychiatrist",
      rating: 4.8,
      reviews: 189,
      duration: "60 min",
      price: 180,
      originalPrice: 200,
      location: "Serenity Mental Health Clinic",
      address: "456 Oak Avenue, Floor 2",
      phone: "(555) 234-5678",
      email: "m.rivera@therapy.com",
      availability: "Next available: Today",
      specialties: ["Personality Disorders", "Complex Trauma", "Relationship Issues"],
      languages: ["English", "Portuguese"],
      experience: "15 years",
      description: "Explore unconscious patterns and early experiences that shape current behavior and relationships.",
      longDescription: "Dr. Rivera combines psychodynamic principles with modern therapeutic techniques to help clients understand the root causes of their struggles and develop lasting insight.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=400&fit=crop",
      verified: true,
      featured: true,
      badge: "Expert",
      sessionTypes: ["In-Person", "Virtual"],
      nextSession: "Tomorrow 10:00 AM",
      responseTime: "Usually responds within 1 hour"
    },
    {
      id: 3,
      name: "Family Systems Therapy",
      shortName: "Family Therapy",
      category: "family",
      therapist: "Dr. Emily Chen",
      credentials: "PhD, MFT",
      rating: 4.9,
      reviews: 156,
      duration: "75 min",
      price: 200,
      originalPrice: 220,
      location: "Harmony Family Center",
      address: "789 Wellness Blvd, Suite 100",
      phone: "(555) 345-6789",
      email: "e.chen@therapy.com",
      availability: "Next available: This week",
      specialties: ["Family Conflict", "Teen Issues", "Parenting", "Divorce"],
      languages: ["English", "Mandarin"],
      experience: "10 years",
      description: "Heal family relationships and improve communication patterns for stronger, healthier family dynamics.",
      longDescription: "Dr. Chen specializes in systemic approaches to family healing, helping families develop better communication patterns and resolve long-standing conflicts.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=400&fit=crop",
      verified: true,
      featured: false,
      badge: "Family Specialist",
      sessionTypes: ["In-Person", "Virtual"],
      nextSession: "Thursday 2:00 PM",
      responseTime: "Usually responds within 3 hours"
    },
    {
      id: 4,
      name: "EMDR Therapy",
      shortName: "EMDR",
      category: "trauma",
      therapist: "Dr. Amanda Foster",
      credentials: "PhD, EMDR Certified",
      rating: 4.9,
      reviews: 203,
      duration: "60 min",
      price: 160,
      originalPrice: 180,
      location: "Trauma Recovery Institute",
      address: "321 Healing Way, Suite 200",
      phone: "(555) 456-7890",
      email: "a.foster@therapy.com",
      availability: "Next available: Next week",
      specialties: ["PTSD", "Complex Trauma", "Anxiety", "Phobias"],
      languages: ["English"],
      experience: "8 years",
      description: "Breakthrough trauma therapy using Eye Movement Desensitization and Reprocessing for lasting healing.",
      longDescription: "Dr. Foster is specially trained in EMDR therapy, helping clients process traumatic memories and reduce their emotional impact through this innovative approach.",
      image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=500&h=400&fit=crop",
      verified: true,
      featured: true,
      badge: "Trauma Expert",
      sessionTypes: ["In-Person"],
      nextSession: "Monday 11:00 AM",
      responseTime: "Usually responds within 4 hours"
    },
    {
      id: 5,
      name: "Couples Therapy",
      shortName: "Couples",
      category: "couples",
      therapist: "Dr. James Thompson",
      credentials: "PhD, LMFT",
      rating: 4.7,
      reviews: 134,
      duration: "60 min",
      price: 180,
      originalPrice: 200,
      location: "Love & Connection Center",
      address: "654 Romance Road, Floor 3",
      phone: "(555) 567-8901",
      email: "j.thompson@therapy.com",
      availability: "Next available: This weekend",
      specialties: ["Relationship Issues", "Communication", "Intimacy", "Premarital"],
      languages: ["English", "French"],
      experience: "14 years",
      description: "Strengthen your relationship with evidence-based couples therapy techniques and communication skills.",
      longDescription: "Dr. Thompson uses the Gottman Method and Emotionally Focused Therapy to help couples build stronger, more fulfilling relationships.",
      image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=500&h=400&fit=crop",
      verified: true,
      featured: false,
      badge: "Relationship Expert",
      sessionTypes: ["In-Person", "Virtual"],
      nextSession: "Saturday 4:00 PM",
      responseTime: "Usually responds within 6 hours"
    },
    {
      id: 6,
      name: "Art & Music Therapy",
      shortName: "Creative",
      category: "creative",
      therapist: "Dr. Luna Martinez",
      credentials: "MA, ATR, MT-BC",
      rating: 4.8,
      reviews: 98,
      duration: "60 min",
      price: 110,
      originalPrice: 130,
      location: "Creative Healing Studio",
      address: "987 Artist Lane, Studio 5",
      phone: "(555) 678-9012",
      email: "l.martinez@therapy.com",
      availability: "Next available: Tomorrow",
      specialties: ["Creative Expression", "ADHD", "Autism", "Grief"],
      languages: ["English", "Spanish"],
      experience: "9 years",
      description: "Express yourself through art and music therapy for emotional healing and self-discovery.",
      longDescription: "Dr. Martinez combines traditional therapy with creative arts to help clients express emotions and experiences that may be difficult to verbalize.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop",
      verified: true,
      featured: false,
      badge: "Creative Specialist",
      sessionTypes: ["In-Person", "Virtual"],
      nextSession: "Tomorrow 1:00 PM",
      responseTime: "Usually responds within 2 hours"
    },
    {
      id: 7,
      name: "Group Therapy Sessions",
      shortName: "Group",
      category: "group",
      therapist: "Dr. Robert Kim",
      credentials: "PhD, LCSW",
      rating: 4.6,
      reviews: 167,
      duration: "90 min",
      price: 70,
      originalPrice: 80,
      location: "Community Wellness Hub",
      address: "147 Unity Street, Room A",
      phone: "(555) 789-0123",
      email: "r.kim@therapy.com",
      availability: "Next session: Wednesday",
      specialties: ["Addiction Recovery", "Social Anxiety", "Grief Support", "LGBTQ+"],
      languages: ["English", "Korean"],
      experience: "16 years",
      description: "Find support and connection in therapeutic group settings with peers facing similar challenges.",
      longDescription: "Dr. Kim facilitates various support groups, creating safe spaces for healing through shared experiences and peer support.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&h=400&fit=crop",
      verified: true,
      featured: false,
      badge: "Group Leader",
      sessionTypes: ["In-Person", "Virtual"],
      nextSession: "Wednesday 6:00 PM",
      responseTime: "Usually responds within 8 hours"
    },
    {
      id: 8,
      name: "Mindfulness-Based Therapy",
      shortName: "Mindfulness",
      category: "wellness",
      therapist: "Dr. Priya Sharma",
      credentials: "PhD, MBSR Certified",
      rating: 4.9,
      reviews: 221,
      duration: "55 min",
      price: 130,
      originalPrice: 150,
      location: "Mindful Living Center",
      address: "258 Zen Garden Way, Floor 1",
      phone: "(555) 890-1234",
      email: "p.sharma@therapy.com",
      availability: "Next available: Today",
      specialties: ["Stress Reduction", "Chronic Pain", "Sleep Issues", "Meditation"],
      languages: ["English", "Hindi"],
      experience: "11 years",
      description: "Integrate mindfulness and meditation practices into therapy for stress reduction and emotional balance.",
      longDescription: "Dr. Sharma combines traditional psychotherapy with mindfulness practices, helping clients develop present-moment awareness and emotional regulation skills.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
      verified: true,
      featured: true,
      badge: "Mindfulness Expert",
      sessionTypes: ["In-Person", "Virtual", "Outdoor Sessions"],
      nextSession: "Today 5:00 PM",
      responseTime: "Usually responds within 1 hour"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Therapies', icon: Heart },
    { value: 'individual', label: 'Individual', icon: Users },
    { value: 'couples', label: 'Couples', icon: Heart },
    { value: 'family', label: 'Family', icon: Users },
    { value: 'group', label: 'Group', icon: Users },
    { value: 'creative', label: 'Creative Arts', icon: Sparkles },
    { value: 'trauma', label: 'Trauma Therapy', icon: Shield },
    { value: 'wellness', label: 'Wellness', icon: Zap }
  ];

  const allSpecialties = [...new Set(therapies.flatMap(t => t.specialties))];

  const filteredTherapies = therapies
    .filter(therapy => {
      const matchesSearch = therapy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          therapy.therapist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          therapy.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || therapy.category === selectedCategory;
      
      const matchesSpecialties = selectedSpecialties.length === 0 || 
                                selectedSpecialties.some(s => therapy.specialties.includes(s));
      
      const matchesPrice = therapy.price >= priceRange[0] && therapy.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesSpecialties && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
      return 0;
    });

  const featuredTherapies = therapies.filter(t => t.featured);
  const stats = [
    { label: 'Licensed Therapists', value: '50+', icon: Award },
    { label: 'Success Stories', value: '2,500+', icon: Star },
    { label: 'Years of Experience', value: '15+', icon: Clock },
    { label: 'Therapy Sessions', value: '10,000+', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-ping delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-medium">Premium Mental Health Care</span>
                <Shield className="w-5 h-5 text-green-300" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Therapy Match
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with world-class licensed therapists who understand your unique journey. 
              Start healing today with personalized, evidence-based treatment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                Book Free Consultation
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </button>
              
              <button className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                <Play className="w-5 h-5" />
                Watch How It Works
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Featured Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-16">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🌟 Most Popular This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTherapies.slice(0, 3).map((therapy, index) => (
              <div key={therapy.id} className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{therapy.shortName.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{therapy.shortName}</h3>
                      <p className="text-sm text-gray-600">{therapy.therapist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{therapy.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{therapy.description.substring(0, 100)}...</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">${therapy.price}</div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Quick Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search therapies, therapists, specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 w-full border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80"
              />
            </div>

            {/* Category Pills */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 6).map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.value
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3 rounded-2xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              Advanced
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {isFilterOpen && (
            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Specialties */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Specialties</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {allSpecialties.map(specialty => (
                    <label key={specialty} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedSpecialties.includes(specialty)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSpecialties([...selectedSpecialties, specialty]);
                          } else {
                            setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Price Range</label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                  <option value="price">Price: Low to High</option>
                  <option value="experience">Most Experience</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-700">
              <span className="font-bold text-blue-600">{filteredTherapies.length}</span> of <span className="font-medium">{therapies.length}</span> therapists match your criteria
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">View:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Therapy Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTherapies.map((therapy, index) => (
              <div 
                key={therapy.id}
                className={`group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200 ${
                  animateCards ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
                }`}
                style={{
                  transitionDelay: animateCards ? `${index * 100}ms` : '0ms'
                }}
              >
                {/* Image & Badge */}
                <div className="relative overflow-hidden">
                  <img 
                    src={therapy.image} 
                    alt={therapy.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-colors duration-300"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    {therapy.verified && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 mb-2">
                        <Shield className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                    {therapy.badge && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {therapy.badge}
                      </div>
                    )}
                  </div>
                  
                  {/* Price & Availability */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 line-through">${therapy.originalPrice}</div>
                        <div className="text-lg font-bold text-green-600">${therapy.price}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Available Now Indicator */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      {therapy.availability}
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {therapy.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <span className="font-medium">{therapy.therapist}</span>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">{therapy.credentials}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{therapy.rating}</span>
                      <span className="text-xs text-gray-500">({therapy.reviews})</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">{therapy.description}</p>

                  {/* Key Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">{therapy.duration} sessions</span>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <span className="text-gray-600">{therapy.experience} experience</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">{therapy.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <Eye className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{therapy.responseTime}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {therapy.specialties.slice(0, 3).map(specialty => (
                        <span 
                          key={specialty}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs rounded-full font-medium border border-blue-200"
                        >
                          {specialty}
                        </span>
                      ))}
                      {therapy.specialties.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                          +{therapy.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Session Types */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      {therapy.sessionTypes.map(type => (
                        <div key={type} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                      <Calendar className="w-4 h-4" />
                      Book Session
                    </button>
                    
                    <button className="p-3 border-2 border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 group">
                      <Phone className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                    </button>
                    
                    <button className="p-3 border-2 border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 group">
                      <Mail className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                    </button>
                  </div>

                  {/* Next Session Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Next available:</span>
                      <span className="font-medium text-green-600">{therapy.nextSession}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-6">
            {filteredTherapies.map((therapy, index) => (
              <div 
                key={therapy.id}
                className={`bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 ${
                  animateCards ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
                }`}
                style={{
                  transitionDelay: animateCards ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="relative w-full lg:w-48 h-32 lg:h-36 rounded-2xl overflow-hidden">
                    <img 
                      src={therapy.image} 
                      alt={therapy.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      {therapy.verified && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-lg font-bold text-green-600">${therapy.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{therapy.name}</h3>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-gray-700">{therapy.therapist}</span>
                          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{therapy.credentials}</span>
                          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold">{therapy.rating}</span>
                            <span className="text-xs text-gray-500">({therapy.reviews})</span>
                          </div>
                        </div>
                      </div>
                      
                      {therapy.badge && (
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                          {therapy.badge}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{therapy.longDescription}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>{therapy.duration} • {therapy.experience} exp</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{therapy.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Eye className="w-4 h-4 text-green-500" />
                        <span>{therapy.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {therapy.specialties.map(specialty => (
                        <span 
                          key={specialty}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs rounded-full font-medium border border-blue-200"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {therapy.sessionTypes.map(type => (
                          <div key={type} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {type}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 font-semibold text-sm shadow-lg hover:shadow-xl">
                          <Calendar className="w-4 h-4" />
                          Book Session
                        </button>
                        
                        <button className="p-3 border-2 border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-300 transition-colors">
                          <Phone className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        <button className="p-3 border-2 border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-300 transition-colors">
                          <Mail className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredTherapies.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-6">
              <Search className="w-24 h-24 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No therapists found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any therapists matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedSpecialties([]);
                setPriceRange([0, 300]);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Heart className="w-5 h-5 text-pink-300" />
              <span className="font-medium">Your Mental Health Matters</span>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Life?
          </h2>
          
          <p className="text-xl mb-8 text-indigo-100 leading-relaxed max-w-3xl mx-auto">
            Join thousands who've found healing and growth with our licensed therapists. 
            Your journey to better mental health starts with a single step.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 justify-center">
              <Calendar className="w-6 h-6" />
              Start Free Consultation
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </button>
            
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center">
              <Phone className="w-5 h-5" />
              Call (555) 123-4567
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">100% Confidential</h3>
              <p className="text-indigo-200 text-sm">Your privacy is our top priority</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Licensed Professionals</h3>
              <p className="text-indigo-200 text-sm">All therapists are fully licensed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Personalized Care</h3>
              <p className="text-indigo-200 text-sm">Tailored to your unique needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyPage