// src/pages/AyurvedaLanding.jsx
import React, { useEffect, useState } from "react";

import {
  Award,
    ChevronRight,
  Leaf,
  Heart,
  Star,
  Users,
  ShieldCheck,
  Sparkles,
  Bot,
  CalendarCheck2,
  ClipboardList,
  BrainCircuit,
  Stethoscope,
  Bell,
  FileText,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowUp,
  Activity,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const FadeIn = ({ delay = 0, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Stat = ({ icon: Icon, label, value, sub }) => (
  <div className="rounded-2xl bg-white/80 backdrop-blur p-6 shadow-sm ring-1 ring-black/5 hover:shadow-md transition">
    <div className="flex items-center gap-3">
      <div className="rounded-xl p-3 bg-gradient-to-br from-green-500/10 to-amber-500/10">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
    {sub && <div className="mt-3 text-xs text-gray-500">{sub}</div>}
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, tag }) => (
  <div className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 hover:shadow-lg hover:translate-y-[-2px] transition">
    <div className="flex items-start gap-4">
      <div className="rounded-xl p-3 bg-gradient-to-br from-green-500/10 to-amber-500/10">
        <Icon className="w-6 h-6 text-green-700" />
      </div>
      <div>
        <div className="inline-flex items-center gap-2 mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          {tag && (
            <span className="text-[10px] uppercase tracking-wider bg-green-600/10 text-green-700 px-2 py-0.5 rounded-full ring-1 ring-green-600/20">
              {tag}
            </span>
          )}
        </div>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

const Step = ({ step, title, desc, icon: Icon }) => (
  <div className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
    <div className="absolute -top-3 -left-3 h-8 w-8 rounded-lg bg-green-600 text-white text-sm font-bold grid place-items-center shadow">
      {step}
    </div>
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-green-50">
        <Icon className="w-6 h-6 text-green-700" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  </div>
);

const Testimonial = ({ name, text, rating = 5, role = "Patient" }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-200 to-amber-200 grid place-items-center">
          <Users className="w-5 h-5 text-green-700" />
        </div>
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-xs text-gray-500">{role}</div>
        </div>
      </div>
      <div className="flex">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
        ))}
      </div>
    </div>
    <p className="mt-4 text-gray-700 italic leading-relaxed">“{text}”</p>
  </div>
);

const AyurvedaLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const services = [
    {
      icon: Leaf,
      title: "Herbal Formulations",
      desc: "Classical Ayurvedic herbs curated for dosha balance and long-term wellness."
    },
    {
      icon: Heart,
      title: "Wellness Consultation",
      desc: "Personalized prakriti assessment and lifestyle guidance by certified practitioners."
    },
    {
      icon: Stethoscope,
      title: "Panchakarma Therapy",
      desc: "End-to-end detox & rejuvenation with digital progress tracking and safety checks."
    }
  ];

  const features = [
    {
      icon: CalendarCheck2,
      title: "AI Smart Scheduling",
      desc: "Reduces clashes & overload using therapist capacity, therapy durations, rest gaps, and patient priority.",
      tag: "Core"
    },
    {
      icon: ClipboardList,
      title: "Digital Patient Records",
      desc: "Structured EMR with vitals, allergies, dosha profile, therapy notes & follow-ups. Export/share securely."
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      desc: "FCM/SMS reminders for sessions, hydration, diet, and post-therapy care to improve adherence."
    },
    {
      icon: FileText,
      title: "Consent & Compliance",
      desc: "Blockchain-ready consent logs and immutable audit trails to ensure trust and traceability.",
      tag: "Trust"
    },
    {
      icon: BrainCircuit,
      title: "AI Wellness Insights",
      desc: "Pattern detection from vitals & symptoms to suggest lifestyle tweaks and red-flag escalations."
    },
    {
      icon: ShieldCheck,
      title: "Secure & Scalable",
      desc: "Role-based access, encrypted data, HIPAA-inspired controls, and cloud-native performance."
    }
  ];

  const testimonials = [
    { name: "Priya Sharma", text: "Seamless booking and caring follow-ups. Panchakarma experience felt organized and safe.", rating: 5, role: "Patient" },
    { name: "Dr. Meera S.", text: "Therapy planning & records are precise. My clinic reduced no-shows by 35% with reminders.", rating: 5, role: "Ayurveda Doctor" },
    { name: "Rajesh Kumar", text: "Progress tracking motivated me daily. Felt the balance returning within weeks.", rating: 5, role: "Patient" },
  ];

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-green-50 via-white to-amber-50 text-gray-900">
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r from-green-600 via-emerald-500 to-amber-500 z-[60]"
      />

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl grid place-items-center bg-gradient-to-br from-green-100 to-amber-100">
                <Leaf className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-green-700 to-amber-600 bg-clip-text text-transparent">
                  AyurSutra
                </div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500">
                  Panchakarma OS
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium hover:text-green-700">Home</a>
              <a href="#about" className="text-sm font-medium hover:text-green-700">About</a>
              <a href="#features" className="text-sm font-medium hover:text-green-700">Features</a>
              <a href="#workflow" className="text-sm font-medium hover:text-green-700">Workflow</a>
              <a href="#services" className="text-sm font-medium hover:text-green-700">Services</a>
              <a href="#contact" className="text-sm font-medium hover:text-green-700">Contact</a>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2.5 text-sm font-semibold shadow hover:shadow-lg transition"
              >
                Login
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <button className="md:hidden p-2 rounded-lg hover:bg-black/5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t">
            <div className="px-4 py-2 grid gap-3">
              {[
                ["#home", "Home"],
                ["#about", "About"],
                ["#features", "Features"],
                ["#workflow", "Workflow"],
                ["#services", "Services"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="py-2 text-gray-700 hover:text-green-700" onClick={() => setIsMobileMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <Link
                to="/login"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 text-sm font-semibold shadow"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
                <ChevronRight className="w-4 h-4" />
              </Link>
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
              <button 
              onClick={() => {
                window.location.href = "/login";
              }}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 group">
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

  <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
    {/* Left content */}
    <FadeIn delay={0.05} className="order-2 md:order-1">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 ring-1 ring-black/5 shadow-sm mb-6">
        <Sparkles className="w-4 h-4 text-green-700" />
        <span className="text-sm font-medium text-gray-700">
          Digital Ayurveda • Smart Panchakarma
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
        Ancient Healing,{" "}
        <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
          Reinvented for You
        </span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-xl">
        AyurSutra blends 5000 years of Ayurveda with digital ease — secure EMRs,
        smart scheduling, and personalized Panchakarma made simple.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <a
          href="#features"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white px-7 py-3 text-lg font-semibold shadow hover:shadow-lg transition"
        >
          Explore Features <ChevronRight className="w-5 h-5" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border-2 border-green-600 text-green-700 px-7 py-3 text-lg font-semibold hover:bg-green-600 hover:text-white transition"
        >
          Book Therapy
        </a>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-3 gap-6">
        <Stat icon={Activity} value="98%" label="On-time Sessions" sub="Smart conflict-free flow" />
        <Stat icon={Users} value="120+" label="Practitioners" sub="Across clinics" />
        <Stat icon={ShieldCheck} value="100%" label="Secure Access" sub="Consent + audit trails" />
      </div>
    </FadeIn>

    {/* Right content */}
    <FadeIn delay={0.15} className="order-1 md:order-2 flex justify-center">
      <div className="relative">
        <div className="aspect-[4/5] max-w-sm rounded-3xl bg-gradient-to-br from-green-200 to-amber-200 p-2 shadow-lg rotate-1">
          <div className="h-full w-full rounded-[22px] bg-white grid p-6">
            {/* Mocked App Preview Cards */}
            <div className="grid gap-4">
              <div className="rounded-2xl p-4 ring-1 ring-black/5 bg-gradient-to-br from-green-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900">Today’s Schedule</div>
                  <CalendarCheck2 className="w-5 h-5 text-green-700" />
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  08:30 – Abhyanga <span className="ml-2 inline-flex items-center text-green-700"><CheckCircle2 className="w-4 h-4 mr-1" /> Optimized</span>
                </div>
                <div className="mt-1 text-sm text-gray-600">10:00 – Swedana</div>
                <div className="mt-1 text-sm text-gray-600">11:30 – Basti</div>
              </div>

              <div className="rounded-2xl p-4 ring-1 ring-black/5 bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900">Patient Snapshot</div>
                  <FileText className="w-5 h-5 text-amber-700" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-amber-50 p-3">
                    <div className="text-xs text-amber-700">Dosha</div>
                    <div className="font-semibold">Pitta-Vata</div>
                  </div>
                  <div className="rounded-xl bg-green-50 p-3">
                    <div className="text-xs text-green-700">Pulse</div>
                    <div className="font-semibold">72 bpm</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-4 ring-1 ring-black/5 bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900">Security</div>
                  <Lock className="w-5 h-5 text-green-700" />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Encrypted records, role-based access, immutable consents.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating badge (updated: Trust Badge instead of AI) */}
        <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white px-4 py-3 shadow ring-1 ring-black/5 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          <div className="text-sm">
            <div className="font-semibold">Trusted by 100+ Clinics</div>
            <div className="text-gray-500 text-xs">NABH Inspired Standards</div>
          </div>
      </div>
    </div>
  </FadeIn>
</div>


      {/* About */}
      <section id="about" className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
          <FadeIn delay={0.05}>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              5000 Years of <span className="text-green-700">Wisdom</span>, Reinvented
            </h2>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Ayurveda focuses on root-cause healing through personalized therapies and lifestyle. AyurSutra makes this
              precision scalable with digital records, AI-driven scheduling, and trustworthy consent management.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 bg-gradient-to-br from-green-50 to-white ring-1 ring-black/5">
                <div className="text-3xl font-bold text-green-700">5000+</div>
                <div className="text-gray-600">Years of Tradition</div>
              </div>
              <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-50 to-white ring-1 ring-black/5">
                <div className="text-3xl font-bold text-amber-700">1000+</div>
                <div className="text-gray-600">Patients Served</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-3xl p-8 bg-gradient-to-br from-green-200/40 to-amber-200/40 ring-1 ring-black/5">
              <ul className="space-y-4">
                {[
                  ["Built on MERN + Python", "Modern, scalable, maintainable architecture."],
                  ["AI Scheduling Engine", "Understands durations, rooms, rest gaps, therapist load."],
                  ["Secure Digital EMR", "Vitals, allergies, therapy notes, and longitudinal tracking."],
                  ["FCM/SMS Reminders", "Reduce no-shows, improve adherence and outcomes."],
                ].map(([title, sub], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-700 mt-0.5" />
                    <div>
                      <div className="font-semibold">{title}</div>
                      <div className="text-gray-600 text-sm">{sub}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.05} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold">Platform <span className="text-green-700">Features</span></h2>
            <p className="mt-3 text-lg text-gray-700">Everything a clinic needs to run consistent, compliant Panchakarma at scale.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn delay={0.06 * i} key={i}>
                <FeatureCard icon={f.icon} title={f.title} desc={f.desc} tag={f.tag} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.05} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold">How <span className="text-green-700">AyurSutra</span> Works</h2>
            <p className="mt-3 text-lg text-gray-700">Simple, guided flow for patients and practitioners.</p>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-6">
            <FadeIn delay={0.05}><Step step="1" title="Register" desc="Create patient/clinic profiles with secure onboarding." icon={Users} /></FadeIn>
            <FadeIn delay={0.10}><Step step="2" title="Assess" desc="Dosha profiling, vitals, and health history captured digitally." icon={ClipboardList} /></FadeIn>
            <FadeIn delay={0.15}><Step step="3" title="Schedule" desc="AI schedules therapy sessions without clashes & with rest gaps." icon={CalendarCheck2} /></FadeIn>
            <FadeIn delay={0.20}><Step step="4" title="Track & Heal" desc="Progress, reminders, and follow-ups drive outcomes." icon={Heart} /></FadeIn>
          </div>
        </div>
      </section>

      {/* Services (Traditional) */}
      <section id="services" className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.05} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold">Our <span className="text-green-700">Healing Services</span></h2>
            <p className="mt-3 text-lg text-gray-700">Traditional care enhanced by modern precision.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeIn delay={0.06 * i} key={i}>
                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 hover:shadow-md transition">
                  <div className="mb-5 inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-amber-500/10">
                    <s.icon className="w-8 h-8 text-green-700" />
                  </div>
                  <h3 className="text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-gray-600">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Badges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          <Stat icon={Award} value="Clinic-Ready" label="Built with practitioners" sub="Feedback-driven UX" />
          <Stat icon={ShieldCheck} value="Compliance" label="Consent & audit" sub="Blockchain-ready logs" />
          <Stat icon={Bot} value="AI Inside" label="Scheduling & insights" sub="Safety-first design" />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.05} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold">What People <span className="text-green-700">Say</span></h2>
            <p className="mt-3 text-lg text-gray-700">Real stories of transformation and clinic efficiency.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn delay={0.06 * i} key={i}>
                <Testimonial {...t} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.05} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold">Begin Your <span className="text-green-200">Healing Journey</span></h2>
            <p className="mt-3 text-lg text-green-100">Book a consultation or request a clinic demo.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              [Phone, "Call Us", "+91 98765 43210"],
              [Mail, "Email Us", "hello@ayursutra.health"],
              [MapPin, "Visit Us", "Mathura, Uttar Pradesh"],
            ].map(([Icon, title, value], i) => (
              <FadeIn delay={0.06 * i} key={title}>
                <div className="text-center rounded-2xl bg-white/10 backdrop-blur p-8 ring-1 ring-white/15">
                  <Icon className="w-10 h-10 mx-auto mb-3 text-green-200" />
                  <h3 className="text-xl font-semibold mb-1">{title}</h3>
                  <p className="text-green-100">{value}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="text-center mt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-white text-green-700 px-8 py-3 font-semibold shadow hover:shadow-lg transition"
            >
              Book Free Consultation
              <ChevronRight className="w-5 h-5" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-xl grid place-items-center bg-gradient-to-br from-green-200/30 to-amber-200/30">
                <Leaf className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-2xl font-bold">AyurSutra</span>
            </div>
            <p className="text-gray-400">
              Ancient wisdom, modern care. Panchakarma Patient Management & Therapy Scheduling for the clinics of tomorrow.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-green-400">Home</a></li>
              <li><a href="#about" className="hover:text-green-400">About</a></li>
              <li><a href="#features" className="hover:text-green-400">Features</a></li>
              <li><a href="#workflow" className="hover:text-green-400">Workflow</a></li>
              <li><a href="#services" className="hover:text-green-400">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">For Clinics</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Role-Based Access</li>
              <li>Audit & Consent</li>
              <li>EMR Exports</li>
              <li>AI Insights</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@ayursutra.health</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Mathura, Uttar Pradesh</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} AyurSutra. All rights reserved.
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition z-50 hover:scale-110"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default AyurvedaLanding;
