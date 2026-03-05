/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  Globe, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  Users, 
  MapPin, 
  Calendar, 
  DollarSign, 
  MessageSquare,
  ChevronRight,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';

// Import Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdvisoryDisclaimer from './pages/AdvisoryDisclaimer';
import ClientConfidentiality from './pages/ClientConfidentiality';
import AboutPage from './pages/About';
import HowItWorksPage from './pages/HowItWorks';
import ContactPage from './pages/Contact';
import PrivateJetCharterPage from './pages/PrivateJetCharter';
import GoldenVisaAdvisoryPage from './pages/GoldenVisaAdvisory';

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Aircraft', href: '#aircraft' },
    { name: 'How It Works', href: '#how-it-works' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '#home') {
      if (isHome) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    if (isHome) {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // Navbar height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate('/' + href);
    }
  };

  // Handle cross-page anchor links after navigation
  useEffect(() => {
    if (isHome && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [isHome, location.hash]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" onClick={(e) => handleNavClick(e as any, '#home')} className="flex items-center">
            <span className="text-2xl font-display font-bold text-gold-500 tracking-wider">AEROVISA</span>
            <span className="ml-2 text-xs font-sans text-slate-400 tracking-[0.3em] uppercase hidden sm:block">Global</span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[10px] font-bold text-slate-300 hover:text-gold-400 transition-colors uppercase tracking-[0.15em] whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gold-500 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-navy-900 border-b border-gold-500/20 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xl font-display font-bold text-slate-200 hover:text-gold-500 transition-colors py-2 border-b border-gold-500/5 last:border-0"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000" 
          alt="Private Jet" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block text-gold-500 font-semibold tracking-[0.4em] uppercase text-sm mb-4">
            Private Jet Charter & Golden Visa Advisory
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
            Secure Your <br />
            <span className="text-gold-500 italic">Global Mobility</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Bespoke Private Jet Charter & Golden Visa Advisory for International Investors and High-Net-Worth Clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#jet-form" 
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-8 py-4 rounded-sm font-bold text-center transition-all flex items-center justify-center gap-2 group"
            >
              Request Private Jet Charter
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#visa-form" 
              className="border border-gold-500/50 hover:border-gold-500 text-gold-500 px-8 py-4 rounded-sm font-bold text-center transition-all"
            >
              Explore Golden Visa Options
            </a>
          </div>
        </motion.div>
      </div>

      {/* World Map Background Decoration */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
        <Globe size={600} className="text-gold-500" />
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Private Jet Charter Coordination",
      description: "Clients can request private jet charter options through our verified aviation partner network.",
      features: [
        "Global private jet charter requests",
        "Access to licensed aviation operators",
        "Fast charter coordination",
        "Confidential travel planning"
      ],
      cta: "Request Private Jet Quote",
      href: "#jet-form",
      icon: <Plane className="text-gold-500" size={40} />
    },
    {
      title: "Golden Visa & Residency by Investment",
      description: "Explore residency by investment programs through our verified immigration partners.",
      features: [
        "Residency by investment programs",
        "Global relocation support",
        "Investment migration advisory",
        "Verified residency consultants"
      ],
      cta: "Request Golden Visa Consultation",
      href: "#visa-form",
      icon: <Globe className="text-gold-500" size={40} />
    }
  ];

  return (
    <section id="services" className="py-24 bg-navy-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Our Advisory Services</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-navy-900 p-10 border border-gold-500/10 rounded-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                {service.icon}
              </div>
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">{service.description}</p>
              <ul className="space-y-4 mb-10">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href={service.href} 
                className="inline-flex items-center gap-2 text-gold-500 font-bold border-b border-gold-500/30 pb-1 hover:border-gold-500 transition-all"
              >
                {service.cta}
                <ChevronRight size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AircraftTypes = () => {
  const types = [
    {
      name: "Light Jet",
      passengers: "4–6",
      bestFor: "Short regional trips",
      description: "Agile and efficient, perfect for short-range travel and accessing smaller airports.",
      examples: "Cessna Citation CJ3, Embraer Phenom 300",
      routes: ["Mumbai → Dubai", "Dubai → Riyadh"],
      image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Midsize Jet",
      passengers: "7–9 passengers",
      bestFor: "Medium distance travel",
      description: "Midsize private jets provide greater range and comfort for medium-distance international flights.",
      examples: "Citation XLS, Hawker 800XP, Learjet 60",
      routes: ["Dubai → London", "Singapore → Dubai"],
      image: "https://images.unsplash.com/photo-1626244842344-b5042bb2fd97?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Heavy Jet",
      passengers: "10–16",
      bestFor: "Long international flights",
      description: "Ultimate luxury for transcontinental travel, featuring full galleys and sleeping arrangements.",
      examples: "Gulfstream G650, Bombardier Global 6000",
      routes: ["Dubai → New York", "London → Singapore"],
      image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="aircraft" className="py-24 bg-navy-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Private Jet Aircraft Types</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {types.map((type, idx) => (
            <div key={idx} className="bg-navy-800 rounded-sm overflow-hidden border border-gold-500/10 group flex flex-col">
              <div className="h-56 overflow-hidden">
                <img 
                  src={type.image} 
                  alt={type.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-display font-bold text-gold-500 mb-2">{type.name}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed italic">{type.description}</p>
                
                <div className="space-y-4 text-slate-300 mb-6 mt-auto">
                  <p className="flex justify-between border-b border-slate-700 pb-2">
                    <span className="text-slate-500 uppercase text-[10px] tracking-widest font-bold">Capacity</span>
                    <span className="font-bold text-sm">{type.passengers.includes('passengers') ? type.passengers : `${type.passengers} Passengers`}</span>
                  </p>
                  <p className="flex flex-col border-b border-slate-700 pb-2">
                    <span className="text-slate-500 uppercase text-[10px] tracking-widest font-bold mb-1">Example Models</span>
                    <span className="font-medium text-xs text-slate-400">{type.examples}</span>
                  </p>
                </div>
                
                <div className="mb-4">
                  <span className="text-slate-500 uppercase text-[10px] tracking-widest font-bold block mb-2">Popular Routes</span>
                  <ul className="space-y-1">
                    {type.routes.map((route, i) => (
                      <li key={i} className="text-xs font-medium italic text-slate-400">• {route}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#jet-form" 
            className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-10 py-4 rounded-sm font-bold transition-all inline-block uppercase tracking-widest text-sm"
          >
            Request Private Jet Charter
          </a>
        </div>
      </div>
    </section>
  );
};

const PopularRoutes = () => {
  const routes = [
    "Dubai → London",
    "Mumbai → Dubai",
    "London → New York",
    "Singapore → Dubai",
    "Doha → Paris"
  ];

  return (
    <section className="py-16 bg-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-navy-900">
            <h2 className="text-3xl font-display font-bold mb-2">Popular Charter Routes</h2>
            <p className="font-medium opacity-80">Connecting global hubs with seamless luxury travel.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {routes.map((route, idx) => (
              <span 
                key={idx} 
                className="bg-navy-900 text-gold-500 px-6 py-3 rounded-full text-sm font-bold tracking-wider"
              >
                {route}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Submit your request",
      description: "Fill out our confidential inquiry form for private jet charter or residency advisory."
    },
    {
      number: "02",
      title: "Verified Partner Connection",
      description: "We connect you with our vetted network of aviation brokers or immigration consultants."
    },
    {
      number: "03",
      title: "Bespoke Solutions",
      description: "Our partners provide tailored travel itineraries or investment migration pathways."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-navy-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">How It Works</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <span className="text-8xl font-display font-bold text-gold-500/10 absolute -top-10 -left-4">
                {step.number}
              </span>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BookingForms = () => {
  const [jetForm, setJetForm] = useState({
    name: '', email: '', phone: '', departure: '', destination: '', date: '', passengers: '', budget: '', message: ''
  });

  const [visaForm, setVisaForm] = useState({
    name: '', email: '', phone: '', nationality: '', budget: '', country: '', timeline: '', message: ''
  });

  const handleJetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Private Jet Charter Request Sent. Our advisor will contact you shortly.');
  };

  const handleVisaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Golden Visa Consultation Request Sent. Our advisor will contact you shortly.');
  };

  return (
    <section id="contact" className="py-24 bg-navy-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Jet Form */}
          <div id="jet-form" className="bg-navy-800 p-8 md:p-12 border border-gold-500/20 rounded-sm scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <Plane className="text-gold-500" size={32} />
              <h2 className="text-3xl font-display font-bold text-white">Private Jet Booking</h2>
            </div>
            <form onSubmit={handleJetSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                <input 
                  type="text" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setJetForm({...jetForm, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email</label>
                <input 
                  type="email" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setJetForm({...jetForm, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Phone / WhatsApp</label>
                <input 
                  type="tel" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setJetForm({...jetForm, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Departure Date</label>
                <input 
                  type="date" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setJetForm({...jetForm, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Departure City</label>
                <input 
                  type="text" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setJetForm({...jetForm, departure: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Destination City</label>
                <input 
                  type="text" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setJetForm({...jetForm, destination: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Passengers</label>
                <input 
                  type="number" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setJetForm({...jetForm, passengers: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Estimated Budget</label>
                <input 
                  type="text" placeholder="e.g. $50,000"
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setJetForm({...jetForm, budget: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setJetForm({...jetForm, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="md:col-span-2 bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 rounded-sm font-bold transition-all uppercase tracking-widest"
              >
                Request Private Jet Charter
              </button>
            </form>
          </div>

          {/* Visa Form */}
          <div id="visa-form" className="bg-navy-800 p-8 md:p-12 border border-gold-500/20 rounded-sm scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <Globe className="text-gold-500" size={32} />
              <h2 className="text-3xl font-display font-bold text-white">Golden Visa Consultation</h2>
            </div>
            <form onSubmit={handleVisaSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                <input 
                  type="text" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setVisaForm({...visaForm, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email</label>
                <input 
                  type="email" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setVisaForm({...visaForm, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Phone</label>
                <input 
                  type="tel" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setVisaForm({...visaForm, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Nationality</label>
                <input 
                  type="text" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setVisaForm({...visaForm, nationality: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Investment Budget</label>
                <input 
                  type="text" required placeholder="e.g. $500,000+"
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setVisaForm({...visaForm, budget: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Preferred Country</label>
                <input 
                  type="text" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setVisaForm({...visaForm, country: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Timeline</label>
                <select 
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setVisaForm({...visaForm, timeline: e.target.value})}
                >
                  <option value="">Select Timeline</option>
                  <option value="immediate">Immediate</option>
                  <option value="3-6-months">3-6 Months</option>
                  <option value="6-12-months">6-12 Months</option>
                  <option value="planning">Just Planning</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setVisaForm({...visaForm, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="md:col-span-2 bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 rounded-sm font-bold transition-all uppercase tracking-widest"
              >
                Request Golden Visa Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const PartnerNetwork = () => {
  const categories = [
    { name: "Private Jet Charter Brokers", icon: <Plane size={24} /> },
    { name: "Licensed Aviation Operators", icon: <ShieldCheck size={24} /> },
    { name: "Golden Visa Consultants", icon: <Globe size={24} /> },
    { name: "International Mobility Advisors", icon: <Users size={24} /> }
  ];

  return (
    <section className="py-24 bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold text-white mb-6">Verified Partner Network</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              AeroVisa Global connects clients with trusted global partners. We act as your dedicated advisory and coordination platform, ensuring you reach the right experts for your specific needs.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {categories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-navy-900 p-4 border border-gold-500/10 rounded-sm">
                  <div className="text-gold-500">{cat.icon}</div>
                  <span className="text-sm font-medium text-slate-300">{cat.name}</span>
                </div>
              ))}
            </div>
            <div className="bg-gold-500/10 border-l-4 border-gold-500 p-6">
              <p className="text-gold-500 font-medium italic">
                "All aviation services, charter agreements and flight operations are handled directly by licensed aviation operators or charter brokers."
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000" 
              alt="Partners" 
              className="rounded-sm shadow-2xl border border-gold-500/20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -right-8 bg-navy-900 p-8 border border-gold-500/20 hidden md:block">
              <div className="text-4xl font-display font-bold text-gold-500 mb-1">500+</div>
              <div className="text-xs uppercase tracking-widest text-slate-500">Verified Partners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Compliance = () => {
  const docs = [
    "Non-Disclosure Agreement (NDA)",
    "Private Jet Advisory & Coordination Agreement",
    "Professional Service / Advisory Agreement",
    "Charter agreements issued by licensed aviation operators",
    "Partner referral agreements with verified aviation and immigration partners"
  ];

  return (
    <section id="compliance" className="py-24 bg-navy-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Client Documentation & Compliance</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              {docs.slice(0, 3).map((doc, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-navy-800 border border-slate-700 rounded-sm">
                  <FileText className="text-gold-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-300 font-medium">{doc}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {docs.slice(3).map((doc, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-navy-800 border border-slate-700 rounded-sm">
                  <FileText className="text-gold-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-300 font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center p-8 bg-navy-800 border border-gold-500/10 rounded-sm">
            <p className="text-slate-400 italic">
              These documents ensure confidentiality, transparency and professional advisory standards for all our clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const LegalDisclaimer = () => {
  return (
    <section className="py-16 bg-navy-800 border-y border-gold-500/10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-xs uppercase tracking-[0.3em] text-gold-500 font-bold mb-6">Legal Disclaimer</h3>
        <div className="space-y-4 text-sm text-slate-500 leading-relaxed">
          <p>We act solely as an advisory and coordination platform connecting clients with verified aviation and immigration partners worldwide.</p>
          <p>All aviation services are provided by licensed operators and charter brokers.</p>
          <p>Charter contracts, invoices and aviation services are issued directly by the aviation operators or charter brokers.</p>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1464037862646-647f1856d5ec?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">Start Your Global Mobility Journey</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a 
            href="#jet-form" 
            className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-10 py-5 rounded-sm font-bold transition-all uppercase tracking-widest"
          >
            Request Private Jet Charter
          </a>
          <a 
            href="#visa-form" 
            className="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-900 px-10 py-5 rounded-sm font-bold transition-all uppercase tracking-widest"
          >
            Request Golden Visa Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-900 pt-20 pb-10 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-display font-bold text-gold-500 tracking-wider">AEROVISA</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Global advisory and coordination platform for private aviation and investment migration.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/about" className="hover:text-gold-500 transition-colors cursor-pointer">About</Link></li>
              <li><Link to="/how-it-works" className="hover:text-gold-500 transition-colors cursor-pointer">How It Works</Link></li>
              <li><Link to="/contact" className="hover:text-gold-500 transition-colors cursor-pointer">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/private-jet-charter" className="hover:text-gold-500 transition-colors cursor-pointer">Private Jet Charter</Link></li>
              <li><Link to="/golden-visa-advisory" className="hover:text-gold-500 transition-colors cursor-pointer">Golden Visa Advisory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/privacy-policy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-gold-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/advisory-disclaimer" className="hover:text-gold-500 transition-colors">Advisory Disclaimer</Link></li>
              <li><Link to="/client-confidentiality" className="hover:text-gold-500 transition-colors">Client Confidentiality</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} AeroVisa Global. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs italic">
            Advisory & Coordination Platform
          </p>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <PopularRoutes />
      <Services />
      <HowItWorks />
      <AircraftTypes />
      <BookingForms />
      <PartnerNetwork />
      <Compliance />
      <LegalDisclaimer />
      <FinalCTA />
    </>
  );
};

// --- Main App ---

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-gold-500 selection:text-navy-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/private-jet-charter" element={<PrivateJetCharterPage />} />
            <Route path="/golden-visa-advisory" element={<GoldenVisaAdvisoryPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/advisory-disclaimer" element={<AdvisoryDisclaimer />} />
            <Route path="/client-confidentiality" element={<ClientConfidentiality />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
