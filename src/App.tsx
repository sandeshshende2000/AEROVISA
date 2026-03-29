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

// --- Error Handling ---
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

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
import AdminPage from './pages/Admin';

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
            <span className="text-lg sm:text-2xl font-display font-bold text-gold-500 tracking-wider uppercase">AEROVISA</span>
            <span className="sm:ml-2 text-lg sm:text-2xl font-display font-bold text-white tracking-wider uppercase">GLOBAL</span>
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
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Waterfront Property" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-gold-500 font-semibold tracking-[0.4em] uppercase text-sm mb-4">
            Residency & Investment Advisory
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
            Secure Your <br />
            <span className="text-gold-500 italic">Global Freedom</span>
          </h1>
          <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl">
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
      href: "#contact",
      icon: <ShieldCheck className="text-gold-500" size={40} />
    }
  ];

  const handleCtaClick = (e: React.MouseEvent, href: string) => {
    if (href === '#contact') {
      e.preventDefault();
      const element = document.getElementById('contact');
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-navy-800 scroll-mt-20">
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
    <section id="how-it-works" className="py-24 bg-navy-800 scroll-mt-20">
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
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
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
    <section id="programs" className="py-24 bg-navy-900 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-wider">Residency by Investment Programs</h2>
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
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-32 bg-navy-900 relative z-10 border-t border-gold-500/10">
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
                src="https://images.unsplash.com/photo-1578683316226-999de144ce1f?auto=format&fit=crop&q=80&w=1200" 
                alt="Luxury Lifestyle"
                className="w-full h-full object-cover opacity-80"
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
  return (
    <section className="py-32 bg-navy-900 relative z-10 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-[16/9] md:aspect-[21/9] bg-black border border-gold-500/20 relative group overflow-hidden rounded-sm shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury tropical private island villa with modern architecture at golden sunset"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Dark Overlay for Readability - Black Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-1000"></div>
          
          {/* Elegant Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                Access Rare & <span className="text-gold-500 italic">Off-Market Opportunities</span>
              </h3>
              <p className="text-gold-500 font-sans text-sm md:text-base uppercase tracking-[0.3em] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                Private Access to Curated Global Investment Opportunities
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedProperties = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRequestDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      alert('Error submitting request.');
    }
  };

  return (
    <section id="properties" className="py-32 bg-navy-950 scroll-mt-20 relative z-10 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Featured Global Properties</h2>
            <div className="w-24 h-1 bg-gold-500 mb-8"></div>
            <p className="text-slate-300">
              Exclusive off-market and rare investment opportunities curated for our elite clientele. 
              <span className="block mt-2 text-gold-500 italic text-sm">
                * All opportunities are shared through private consultation only to protect lead ownership and ensure exclusivity.
              </span>
            </p>
          </div>
          <button 
            onClick={() => {
              const element = document.getElementById('consultation-form');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
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

                <button 
                  onClick={() => handleRequestDetails(property)}
                  className="w-full py-3 bg-transparent border border-gold-500 text-gold-500 font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-navy-900 transition-all"
                >
                  Request Private Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm italic mb-8">
            Looking for something specific? Our global network provides access to thousands of off-market assets.
          </p>
          <a 
            href="#consultation-form"
            className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm hover:text-gold-500 transition-all"
          >
            View Full Portfolio via Advisory <ChevronRight size={18} className="text-gold-500" />
          </a>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-navy-900 border border-gold-500/30 w-full max-w-lg p-8 relative overflow-hidden"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="text-gold-500 mx-auto mb-4" size={64} />
                <h3 className="text-2xl font-display font-bold text-white mb-2">Request Sent</h3>
                <p className="text-slate-400">An advisor will contact you shortly with the full investment memorandum for {selectedProperty?.title}.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Request Investment Info</h3>
                  <p className="text-slate-400 text-sm">
                    Property: <span className="text-gold-500 font-bold">{selectedProperty?.title}</span>
                  </p>
                </div>

                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <input type="hidden" name="property_interest" value={selectedProperty?.title || ''} />
                  <input type="hidden" name="subject" value={`Property Inquiry: ${selectedProperty?.title}`} />
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                    <input 
                      type="text" name="name" required
                      className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Email</label>
                      <input 
                        type="email" name="email" required
                        className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Phone</label>
                      <input 
                        type="tel" name="phone" required
                        className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Investment Budget</label>
                      <select 
                        name="budget" required
                        className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none text-sm appearance-none"
                      >
                        <option value="">Select Range</option>
                        <option value="Under $1M">Under $1M</option>
                        <option value="$1M - $5M">$1M - $5M</option>
                        <option value="$5M - $10M">$5M - $10M</option>
                        <option value="$10M+">$10M+</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Preferred Location</label>
                      <input 
                        type="text" name="preferred_location" required placeholder="e.g. Europe, UAE"
                        className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 font-bold uppercase tracking-widest text-xs transition-all"
                    >
                      Request Details
                    </button>
                    <p className="text-[10px] text-slate-500 mt-4 text-center leading-relaxed">
                      By submitting, you agree to our privacy policy. Your information is strictly confidential and will only be used for advisory purposes.
                    </p>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};

const PublicProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const handleRequestDetails = (property: any) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const inquiryData = {
      propertyId: selectedProperty.id,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      createdAt: Timestamp.now()
    };

    try {
      await addDoc(collection(db, 'propertyInquiries'), inquiryData);
      setSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'propertyInquiries');
    }
  };

  if (loading) return null;
  if (properties.length === 0) return null;

  return (
    <section id="public-properties" className="py-24 bg-navy-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-wider">Global Listings</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">
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

                <button 
                  onClick={() => handleRequestDetails(property)}
                  className="w-full py-3 bg-transparent border border-gold-500 text-gold-500 font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-navy-900 transition-all"
                >
                  Request Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Inquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-navy-900 border border-gold-500/30 w-full max-w-lg p-8 relative overflow-hidden"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="text-gold-500 mx-auto mb-4" size={64} />
                <h3 className="text-2xl font-display font-bold text-white mb-2">Inquiry Sent</h3>
                <p className="text-slate-400">Our advisory team will contact you shortly with more information about this property.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Request Property Details</h3>
                  <p className="text-slate-400 text-sm">
                    Location: <span className="text-gold-500 font-bold">{selectedProperty?.location}</span>
                  </p>
                </div>

                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                    <input 
                      type="text" name="name" required
                      className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Email</label>
                      <input 
                        type="email" name="email" required
                        className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Phone</label>
                      <input 
                        type="tel" name="phone" required
                        className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Message (Optional)</label>
                    <textarea 
                      name="message" rows={3}
                      className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none text-sm resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 font-bold uppercase tracking-widest text-xs transition-all"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};

const PropertyListing = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const submissionData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      propertyType: formData.get('propertyType') as string,
      location: formData.get('location') as string,
      price: formData.get('price') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      status: 'pending',
      createdAt: Timestamp.now()
    };

    try {
      await addDoc(collection(db, 'propertySubmissions'), submissionData);
      setSubmitted(true);
      form.reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'propertySubmissions');
    } finally {
      setLoading(false);
    }
  };

  const tiers = [
    {
      name: "Basic",
      price: "$999",
      features: [
        "Website Listing",
        "Exposure to Global Investors",
        "Standard Support"
      ]
    },
    {
      name: "Premium",
      price: "$2,499",
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
      price: "$4,999",
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
    <section id="list-property" className="py-24 bg-navy-900 scroll-mt-20">
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
                <p className="text-slate-400 mb-8">Our team will review your property details and contact you within 24-48 hours for the next steps.</p>
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
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 py-4 font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? 'Processing...' : 'Submit for Review'}
                    {!loading && <ArrowRight size={18} />}
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
  const [visaSubmitted, setVisaSubmitted] = useState(false);

  const handleVisaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-navy-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our global advisory team is available to discuss your residency and investment requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Visa Form */}
          <div id="visa-form" className="bg-navy-800 p-8 md:p-12 border border-gold-500/20 rounded-sm scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <Globe className="text-gold-500" size={32} />
              <h2 className="text-3xl font-display font-bold text-white">Residency by Investment Consultation</h2>
            </div>
            
            {visaSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gold-500/10 border border-gold-500/50 p-8 text-center rounded-sm"
              >
                <CheckCircle2 className="text-gold-500 mx-auto mb-4" size={48} />
                <h3 className="text-white text-xl font-bold mb-2">Request Received</h3>
                <p className="text-slate-300">Thank you for your consultation request. Our residency advisors will contact you shortly.</p>
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
                <button 
                  type="submit"
                  className="md:col-span-2 bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 rounded-sm font-bold transition-all uppercase tracking-widest"
                >
                  Request Residency by Investment Consultation
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
    <section className="py-24 bg-navy-800">
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
      <Services />
      <HowItWorks />
      <InvestmentPrograms />
      <WhyInvest />
      <OffMarketSection />
      <FeaturedProperties />
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
