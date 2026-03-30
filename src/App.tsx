/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
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
  CheckCircle2,
  Upload,
  Camera,
  Tag,
  Info
} from 'lucide-react';
import { db, auth } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';


// --- Components ---




// Import Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdvisoryDisclaimer from './pages/AdvisoryDisclaimer';
import ClientConfidentiality from './pages/ClientConfidentiality';
import AboutPage from './pages/About';
import HowItWorksPage from './pages/HowItWorks';
import ContactPage from './pages/Contact';
import ConsultationPage from './pages/Consultation';
import ResidencyByInvestmentAdvisoryPage from './pages/ResidencyByInvestmentAdvisory';
import ResidencyProgramsPage from './pages/ResidencyPrograms';
import ProgramDetailsPage from './pages/ProgramDetails';
import PropertyDetailsPage from './pages/PropertyDetails';
import AdminPage from './pages/Admin';
import OffMarketPage from './pages/OffMarket';
import OffMarketPropertyDetails from './pages/OffMarketPropertyDetails';

// Import Utils
import { handleFirestoreError, OperationType } from './lib/utils';

// Import Data
import { programs } from './data/programs';
import { featuredProperties, Property } from './data/properties';

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
    { name: 'Programs', href: '/residency-programs' },
    { name: 'List Property', href: '#list-property' },
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Advisory', href: '/consultation' },
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

    if (href.startsWith('/')) {
      navigate(href);
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
          <Link to="/" onClick={(e) => handleNavClick(e as any, '#home')} className="flex flex-col sm:flex-row sm:items-center leading-none sm:leading-normal">
            <span className="text-xl sm:text-2xl font-display font-bold text-gold-500 tracking-wider uppercase">AEROVISA</span>
            <span className="sm:ml-2 text-xl sm:text-2xl font-display font-bold text-white tracking-wider uppercase">GLOBAL</span>
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
  const navigate = useNavigate();
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Modern Architecture" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-gold-500 font-semibold tracking-[0.4em] uppercase text-[10px] sm:text-sm mb-4">
            Residency & Investment Advisory
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
            Secure Your <br />
            <span className="text-gold-500 italic">Global Freedom</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl">
            Elite Residency & Investment Solutions for Global Investors and High-Net-Worth Individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={() => navigate('/consultation')}
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-8 py-4 rounded-sm font-bold text-center transition-all flex items-center justify-center gap-2 group"
            >
              Schedule Private Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link 
              to="/residency-programs" 
              className="border border-gold-500/50 hover:border-gold-500 text-gold-500 px-8 py-4 rounded-sm font-bold text-center transition-all"
            >
              Explore Investment Programs
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center gap-3 text-slate-400 border-l border-gold-500/30 pl-6"
          >
            <ShieldCheck size={20} className="text-gold-500" />
            <span className="text-sm font-medium uppercase tracking-widest">
              Trusted by Global Investors & High-Net-Worth Clients
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* World Map Background Decoration */}
      <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
        <Globe size={700} className="text-gold-500" />
      </div>
    </section>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: "Strategic Residency & Investment Advisory",
      description: "Comprehensive guidance on the world's most prestigious residency-by-investment programs.",
      features: [
        "Strategic investment migration advisory",
        "Global relocation & tax structuring",
        "Verified legal & immigration partners",
        "High-net-worth portfolio management"
      ],
      cta: "Explore Programs",
      href: "/residency-by-investment-advisory",
      icon: <Globe className="text-gold-500" size={40} />
    },
    {
      title: "High-Value Investment Structuring",
      description: "Access to exclusive, high-value real estate and strategic investment opportunities in key global markets.",
      features: [
        "Off-market luxury real estate assets",
        "Verified Global Advisory Partners",
        "Strategic investment fund access",
        "Private wealth preservation solutions"
      ],
      cta: "Contact Advisory",
      href: "/consultation",
      icon: <ShieldCheck className="text-gold-500" size={40} />
    }
  ];

  const handleCtaClick = (e: React.MouseEvent, href: string) => {
    if (href === '/consultation') {
      e.preventDefault();
      navigate('/consultation');
    }
  };

  return (
    <section id="services" className="relative py-20 mb-20 bg-navy-800 scroll-mt-20 block clear-both z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">Strategic Residency & Investment Advisory</h2>
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
              <p className="text-slate-300 mb-8 leading-relaxed">{service.description}</p>
              <ul className="space-y-4 mb-10">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-200">
                    <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {service.href.startsWith('/') ? (
                <Link 
                  to={service.href} 
                  className="inline-flex items-center gap-2 text-gold-500 font-bold border-b border-gold-500/30 pb-1 hover:border-gold-500 transition-all"
                >
                  {service.cta}
                  <ChevronRight size={18} />
                </Link>
              ) : (
                <a 
                  href={service.href} 
                  onClick={(e) => handleCtaClick(e, service.href)}
                  className="inline-flex items-center gap-2 text-gold-500 font-bold border-b border-gold-500/30 pb-1 hover:border-gold-500 transition-all"
                >
                  {service.cta}
                  <ChevronRight size={18} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};





const HowItWorks = () => {
  const navigate = useNavigate();
  const steps = [
    {
      number: "01",
      title: "Submit your request",
      description: "Fill out our confidential inquiry form for residency advisory or investment opportunities."
    },
    {
      number: "02",
      title: "Advisory Consultation",
      description: "Our experts will review your profile and requirements to provide tailored strategic advice."
    },
    {
      number: "03",
      title: "Partner Matching",
      description: "We connect you with verified legal and investment partners to execute your chosen strategy."
    }
  ];

  return (
    <section id="how-it-works" className="relative py-20 mb-20 bg-navy-800 scroll-mt-20 block clear-both z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">How It Works</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <span className="text-8xl font-display font-bold text-gold-500/10 absolute -top-10 -left-4">
                {step.number}
              </span>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/consultation')}
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 px-10 py-4 rounded-sm font-bold transition-all uppercase tracking-widest text-sm"
          >
            Start Your Advisory Process
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Data ---
// Moved to external file src/data/programs.ts

const InvestmentPrograms = () => {
  const navigate = useNavigate();

  return (
    <section id="programs" className="relative py-20 mb-20 bg-navy-900 scroll-mt-20 overflow-hidden block clear-both z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-wider leading-tight">Residency by Investment Programs</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-24">
            {programs.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/program/${program.slug}`)}
                className="relative w-full max-w-md aspect-[3/4] cursor-pointer overflow-hidden group border border-gold-500/20 shadow-2xl rounded-sm"
              >
                <img 
                  src={program.image} 
                  alt={program.country}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {program.tag && (
                  <div className="absolute top-6 right-6 z-20">
                    <span className="bg-gold-500 text-navy-900 px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-xl">
                      {program.tag}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="w-16 h-[2px] bg-gold-500 mb-6 transform origin-left transition-all duration-500 group-hover:w-full"></div>
                  <h3 className="text-3xl font-display font-bold text-white mb-2">{program.country}</h3>
                  <p className="text-gold-500 text-sm uppercase tracking-[0.2em] font-bold mb-4">{program.type}</p>
                  
                  <div className="mt-4 h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                    <p className="text-slate-200 text-base leading-relaxed mb-6">
                      {program.shortDesc}
                    </p>
                    <div className="inline-flex items-center text-white text-sm font-bold uppercase tracking-[0.2em] border-b border-gold-500/50 pb-1">
                      Explore Program <ChevronRight className="w-5 h-5 ml-1 text-gold-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const WhyInvest = () => {
  const navigate = useNavigate();

  const handleBookConsultation = () => {
    navigate('/consultation');
  };

  return (
    <section className="relative py-20 mb-20 bg-navy-900 border-t border-gold-500/10 block clear-both z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold text-white mb-8">Why Invest in Global Residency & Citizenship?</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-12">
              In an increasingly interconnected yet unpredictable world, a second residency or citizenship is the ultimate insurance policy. It provides your family with security, mobility, and access to global opportunities.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <Globe className="w-5 h-5" />, title: "Global Mobility", desc: "Visa-free access to the world's most important business and travel hubs." },
                { icon: <ShieldCheck className="w-5 h-5" />, title: "Family Security", desc: "Access to world-class healthcare, education, and a safe environment." },
                { icon: <DollarSign className="w-5 h-5" />, title: "Tax Advantages", desc: "Optimize your wealth with favorable tax regimes and international structures." },
                { icon: <ArrowRight className="w-5 h-5" />, title: "Business Expansion", desc: "Establish a presence in major markets like the EU and North America." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-3 p-6 bg-navy-800/50 border border-gold-500/5 rounded-sm hover:border-gold-500/20 transition-colors">
                  <div className="text-gold-500">{item.icon}</div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">{item.title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-navy-800 border border-gold-500/10 p-2 rounded-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200" 
                alt="Luxury Lifestyle and Investment"
                className="w-full h-auto min-h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <button 
            onClick={handleBookConsultation}
            className="bg-gold-500 hover:bg-gold-600 text-navy-950 px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] transition-all transform hover:scale-105"
          >
            Book a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

const OffMarketSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 mb-20 bg-navy-900 border-t border-b border-gold-500/10 block clear-both z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div 
          onClick={() => navigate('/off-market')}
          className="aspect-[16/9] md:aspect-[21/9] bg-black border border-gold-500/20 relative group overflow-hidden rounded-sm shadow-2xl z-10 cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2000" 
            alt="Elite Private Riverfront Villa at Sunset"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Enhanced Dark Overlay for Premium Readability */}
          <div className="absolute inset-0 bg-navy-950/60 group-hover:bg-navy-950/50 transition-all duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/40 to-transparent"></div>
          
          {/* Elegant Text Overlay - Aligned for the new composition */}
          <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-12 md:p-20 z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <span className="text-gold-500 font-sans text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.4em] font-bold mb-4 sm:mb-6 block drop-shadow-lg">
                Exclusive Advisory Access
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                Access Rare & <br className="hidden sm:block" />
                <span className="text-gold-500 italic">Off-Market Opportunities</span>
              </h3>
              <p className="text-slate-200 font-sans text-xs sm:text-sm md:text-lg max-w-lg mb-6 sm:mb-10 leading-relaxed opacity-90">
                Private Access to Curated Global Investment Opportunities for High-Net-Worth Individuals.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-gold-500"></div>
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs group-hover:text-gold-500 transition-colors">
                  Explore Private Listings
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedProperties = () => {
  const navigate = useNavigate();

  return (
    <section id="properties" className="relative py-20 mb-20 bg-navy-950 scroll-mt-20 border-t border-gold-500/10 block clear-both z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">Featured Global Properties</h2>
            <div className="w-24 h-1 bg-gold-500 mb-8"></div>
            <p className="text-slate-300">
              Exclusive off-market and rare investment opportunities curated for our elite clientele. 
              <span className="block mt-2 text-gold-500 italic text-sm">
                * All opportunities are shared through private consultation only to protect lead ownership and ensure exclusivity.
              </span>
            </p>
          </div>
          <button 
            onClick={() => navigate('/consultation')}
            className="flex items-center gap-2 text-gold-500 font-bold uppercase tracking-widest text-xs border border-gold-500/30 px-6 py-3 hover:bg-gold-500 hover:text-navy-900 transition-all"
          >
            <Calendar size={16} />
            Schedule Consultation
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProperties.map((property, idx) => (
            <motion.div 
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-navy-900 border border-slate-800 group overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-navy-950/80 backdrop-blur-sm text-gold-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-gold-500/20">
                  {property.type}
                </div>
                {property.label && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gold-500 text-navy-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                      {property.label}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-1">{property.title}</h3>
                    <p className="text-slate-300 text-sm flex items-center gap-1">
                      <MapPin size={14} className="text-gold-500" />
                      {property.location}
                    </p>
                  </div>
                  <div className="text-gold-500 font-bold">{property.price}</div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {property.features.map((feature, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider text-slate-300 bg-navy-800 px-2 py-1 rounded-sm">
                      {feature}
                    </span>
                  ))}
                </div>

                <Link 
                  to={`/property/${property.id}`}
                  className="w-full py-3 bg-transparent border border-gold-500 text-gold-500 font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-navy-900 transition-all block text-center"
                >
                  Request Private Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm italic mb-8">
            Looking for something specific? Our global network provides access to thousands of off-market assets.
          </p>
          <Link 
            to="/consultation"
            className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm hover:text-gold-500 transition-all"
          >
            View Full Portfolio via Advisory <ChevronRight size={18} className="text-gold-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const PublicProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'approvedProperties'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const props = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(props);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'approvedProperties');
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;
  if (properties.length === 0) return null;

  return (
    <section id="public-properties" className="relative py-20 mb-20 bg-navy-950 scroll-mt-20 block clear-both z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-wider leading-tight">Global Listings</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Verified properties from our global network of owners and investment partners.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((property, idx) => (
            <motion.div 
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-navy-900 border border-slate-800 group overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={property.imageUrl} 
                  alt={property.propertyType}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-sm text-gold-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-gold-500/20">
                  {property.propertyType}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-1">{property.propertyType} in {property.location}</h3>
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                      <MapPin size={14} className="text-gold-500" />
                      {property.location}
                    </p>
                  </div>
                  <div className="text-gold-500 font-bold">{property.price}</div>
                </div>
                
                <p className="text-slate-400 text-sm mb-8 line-clamp-3 leading-relaxed">
                  {property.description}
                </p>

                <Link 
                  to={`/property/${property.id}`}
                  className="w-full py-3 bg-transparent border border-gold-500 text-gold-500 font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-navy-900 transition-all block text-center"
                >
                  Request Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PropertyListing = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/xkoqnwbq", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const tiers = [
    {
      name: "Basic",
      price: "$49",
      features: [
        "Website Listing",
        "Exposure to Global Investors",
        "Standard Support"
      ]
    },
    {
      name: "Premium",
      price: "$199",
      popular: true,
      features: [
        "Website Listing",
        "Featured Placement",
        "Weekly 2 Promotional Videos",
        "Exposure to Global Investors",
        "Priority Support"
      ]
    },
    {
      name: "Elite",
      price: "$499",
      features: [
        "Website Listing",
        "Featured Placement",
        "Direct Investor Introductions",
        "Weekly 2 Promotional Videos",
        "Dedicated Account Manager",
        "Professional Photography Coordination"
      ]
    }
  ];

  return (
    <section id="list-property" className="relative py-20 mb-20 bg-navy-900 scroll-mt-20 block clear-both z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info & Pricing */}
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-wider">List Your Property with Global Exposure</h2>
            <div className="w-24 h-1 bg-gold-500 mb-8"></div>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Connect your high-value assets with our network of elite global investors. Our specialized marketing ensures your property receives the attention it deserves.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {tiers.map((tier, idx) => (
                <div key={idx} className={`p-6 border ${tier.popular ? 'border-gold-500 bg-gold-500/5' : 'border-slate-800 bg-navy-800'} relative`}>
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-navy-950 text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                      Most Popular
                    </span>
                  )}
                  <h4 className="text-white font-bold mb-1">{tier.name}</h4>
                  <div className="text-2xl font-display font-bold text-gold-500 mb-4">{tier.price}</div>
                  <ul className="space-y-2">
                    {tier.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="text-[10px] text-slate-400 flex items-center gap-2">
                        <CheckCircle2 size={10} className="text-gold-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-sm bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <Camera className="text-gold-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Professional Content</h4>
                  <p className="text-slate-500 text-sm">Weekly promotional videos and high-end photography coordination.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-sm bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="text-gold-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Global Network</h4>
                  <p className="text-slate-500 text-sm">Direct access to verified investors from UAE, Europe, and North America.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-navy-800 p-8 md:p-10 border border-gold-500/10 relative">
            {submitted ? (
              <div className="py-20 text-center">
                <CheckCircle2 className="text-gold-500 mx-auto mb-6" size={64} />
                <h3 className="text-3xl font-display font-bold text-white mb-4">Submission Received</h3>
                <p className="text-slate-400 mb-8">Thank you. Your request has been submitted successfully. Our team will contact you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-gold-500 font-bold uppercase tracking-widest text-sm border-b border-gold-500/30 pb-1"
                >
                  Submit Another Property
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-display font-bold text-white mb-8">Property Submission</h3>
                <form 
                  action="https://formspree.io/f/xkoqnwbq"
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" name="name" required
                        className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" name="email" required
                        className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" name="phone" required
                        className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Property Type</label>
                      <select 
                        name="propertyType" required
                        className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-all appearance-none"
                      >
                        <option value="">Select Type</option>
                        <option value="Villa">Luxury Villa</option>
                        <option value="Apartment">Penthouse / Apartment</option>
                        <option value="Commercial">Commercial Asset</option>
                        <option value="Land">Investment Land</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Location</label>
                      <input 
                        type="text" name="location" required placeholder="City, Country"
                        className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Asking Price</label>
                      <input 
                        type="text" name="price" required placeholder="e.g. $2,500,000"
                        className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Image URL</label>
                    <input 
                      type="url" name="imageUrl" required placeholder="https://..."
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                    <textarea 
                      name="description" required rows={4}
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm font-bold text-center">
                      {error}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 py-4 font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Processing...' : 'Submit for Review'}
                    {!submitting && <ArrowRight size={18} />}
                  </button>
                  <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest">
                    * All listings are subject to admin approval before going live.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const BookingForms = () => {
  const navigate = useNavigate();
  const [visaSubmitted, setVisaSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVisaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/xkoqnwbq", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setVisaSubmitted(true);
        form.reset();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 mb-20 bg-navy-900 scroll-mt-20 block clear-both z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">Get In Touch</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Our global advisory team is available to discuss your residency and investment requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Visa Form */}
          <div id="visa-form" className="bg-navy-800 p-8 md:p-12 border border-gold-500/20 rounded-sm scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <Globe className="text-gold-500 flex-shrink-0" size={32} />
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">Residency by Investment Consultation</h2>
            </div>
            
            {visaSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gold-500/10 border border-gold-500/50 p-8 text-center rounded-sm"
              >
                <CheckCircle2 className="text-gold-500 mx-auto mb-4" size={48} />
                <h3 className="text-white text-xl font-bold mb-2">Request Received</h3>
                <p className="text-slate-300">Thank you. Your request has been submitted successfully. Our team will contact you shortly.</p>
                <button 
                  onClick={() => setVisaSubmitted(false)}
                  className="mt-6 text-gold-500 font-bold text-sm uppercase tracking-widest hover:underline"
                >
                  Send Another Request
                </button>
              </motion.div>
            ) : (
              <form 
                action="https://formspree.io/f/xkoqnwbq" 
                method="POST"
                onSubmit={handleVisaSubmit} 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                  <input 
                    type="text" name="name" required
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email</label>
                  <input 
                    type="email" name="email" required
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Phone</label>
                  <input 
                    type="tel" name="phone"
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Nationality</label>
                  <input 
                    type="text" name="nationality"
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Investment Goal</label>
                  <select 
                    name="investment_goal" required
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors appearance-none"
                  >
                    <option value="">Select Goal</option>
                    <option value="Residency">Residency / Citizenship</option>
                    <option value="Yield">High-Yield Investment</option>
                    <option value="Lifestyle">Lifestyle / Vacation Home</option>
                    <option value="Diversification">Portfolio Diversification</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Preferred Residency Country</label>
                  <select 
                    name="preferred_country" required
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors appearance-none"
                  >
                    <option value="">Select Country</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Greece">Greece</option>
                    <option value="Spain">Spain</option>
                    <option value="UAE">UAE</option>
                    <option value="Other">Other / Undecided</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Timeline</label>
                  <input 
                    type="text" name="timeline" placeholder="e.g. 3-6 months"
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  ></textarea>
                </div>
                {error && (
                  <div className="md:col-span-2 text-red-500 text-sm font-bold text-center">
                    {error}
                  </div>
                )}
                <button 
                  type="submit"
                  disabled={submitting}
                  className="md:col-span-2 bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 rounded-sm font-bold transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Request Residency by Investment Consultation'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const PartnerNetwork = () => {
  const categories = [
    { name: "Global Investment Funds", icon: <DollarSign size={24} /> },
    { name: "Licensed Real Estate Partners", icon: <MapPin size={24} /> },
    { name: "Residency by Investment Consultants", icon: <Globe size={24} /> },
    { name: "International Mobility Advisors", icon: <Users size={24} /> }
  ];

  return (
    <section className="relative py-20 mb-20 bg-navy-800 block clear-both z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Verified Partner Network</h2>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">
            AeroVisa Global connects clients with trusted global partners. We act as your dedicated advisory and coordination platform, ensuring you reach the right experts for your specific needs.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-center gap-4 bg-navy-900 p-6 border border-gold-500/10 rounded-sm">
                <div className="text-gold-500">{cat.icon}</div>
                <span className="text-base font-medium text-slate-300">{cat.name}</span>
              </div>
            ))}
          </div>
          <div className="bg-gold-500/10 border-l-4 border-gold-500 p-8 text-center">
            <p className="text-gold-500 font-display font-bold italic text-lg">
              "We connect you with verified legal and investment partners to execute your chosen global mobility strategy."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Compliance = () => {
  const docs = [
    "Non-Disclosure Agreement (NDA)",
    "Professional Service / Advisory Agreement",
    "Investment Advisory & Coordination Agreement",
    "Partner referral agreements with verified immigration partners",
    "Compliance & Due Diligence Documentation"
  ];

  return (
    <section id="compliance" className="relative py-20 mb-20 bg-navy-900 scroll-mt-20 block clear-both z-10">
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
    <section className="relative py-16 mb-20 bg-navy-800 border-y border-gold-500/10 block clear-both z-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-xs uppercase tracking-[0.3em] text-gold-500 font-bold mb-6">Legal Disclaimer</h3>
        <div className="space-y-4 text-sm text-slate-500 leading-relaxed">
          <p>We act solely as an advisory and coordination platform connecting clients with verified legal and investment partners worldwide.</p>
          <p>All residency and investment programs are executed by licensed professionals and authorized partners.</p>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 mb-20 bg-navy-900 overflow-hidden block clear-both z-10">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Business Architecture" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">Start Your Global Mobility Journey</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link 
            to="/residency-programs" 
            className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-10 py-5 rounded-sm font-bold transition-all uppercase tracking-widest"
          >
            Explore Residency by Investment Programs
          </Link>
          <button 
            onClick={() => navigate('/consultation')}
            className="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-900 px-10 py-5 rounded-sm font-bold transition-all uppercase tracking-widest"
          >
            Contact Advisory
          </button>
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
              <span className="text-2xl font-display font-bold text-gold-500 tracking-wider uppercase">AEROVISA</span>
              <span className="ml-2 text-2xl font-display font-bold text-white tracking-wider uppercase">GLOBAL</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Global advisory and coordination platform for residency and investment migration.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-gold-500 transition-colors cursor-pointer">About</Link></li>
              <li><Link to="/how-it-works" className="hover:text-gold-500 transition-colors cursor-pointer">How It Works</Link></li>
              <li><Link to="/consultation" className="hover:text-gold-500 transition-colors cursor-pointer">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/residency-by-investment-advisory" className="hover:text-gold-500 transition-colors cursor-pointer">Residency by Investment Advisory</Link></li>
              <li><Link to="/consultation" className="hover:text-gold-500 transition-colors cursor-pointer">Investment Advisory</Link></li>
              <li><a href="#list-property" className="hover:text-gold-500 transition-colors cursor-pointer">List Your Property</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-400">
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
      <FeaturedProperties />
      <InvestmentPrograms />
      <OffMarketSection />
      <Services />
      <HowItWorks />
      <WhyInvest />
      <PublicProperties />
      <PropertyListing />
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
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/residency-by-investment-advisory" element={<ResidencyByInvestmentAdvisoryPage />} />
            <Route path="/residency-programs" element={<ResidencyProgramsPage />} />
            <Route path="/program/:slug" element={<ProgramDetailsPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/off-market" element={<OffMarketPage />} />
            <Route path="/off-market/:id" element={<OffMarketPropertyDetails />} />
            <Route path="/admin" element={<AdminPage />} />
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
