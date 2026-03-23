import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  Users, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  X,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { jets, JetType } from '../data/jets';
import BackButton from '../components/BackButton';

interface JetDetailsProps {
  slug?: string;
}

const JetDetails: React.FC<JetDetailsProps> = ({ slug: propSlug }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [jet, setJet] = useState<JetType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const currentSlug = propSlug || paramSlug || window.location.pathname.substring(1);
    const foundJet = jets.find(j => j.slug === currentSlug);
    if (foundJet) {
      setJet(foundJet);
    } else {
      navigate('/private-jet-charter');
    }
  }, [propSlug, paramSlug, navigate]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
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
        form.reset();
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      alert('There was an error submitting your request. Please try again.');
    }
  };

  if (!jet) return null;

  return (
    <div className="bg-navy-900 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <BackButton label="Back to Jets" fallbackPath="/private-jet-charter" />
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[60vh] rounded-sm overflow-hidden mb-16"
        >
          <img 
            src={jet.image} 
            alt={jet.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-16">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block"
            >
              Aircraft Type
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
            >
              {jet.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-200 max-w-2xl leading-relaxed italic"
            >
              {jet.description}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Details Section */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-display font-bold text-white mb-8 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-gold-500"></span>
                Aircraft Specifications
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-navy-800 p-8 border border-gold-500/10 rounded-sm">
                  <Users className="text-gold-500 mb-4" size={32} />
                  <h3 className="text-slate-500 uppercase text-[10px] tracking-widest font-bold mb-2">Capacity</h3>
                  <p className="text-white font-bold text-lg">{jet.passengers}</p>
                </div>
                <div className="bg-navy-800 p-8 border border-gold-500/10 rounded-sm">
                  <Plane className="text-gold-500 mb-4" size={32} />
                  <h3 className="text-slate-500 uppercase text-[10px] tracking-widest font-bold mb-2">Range</h3>
                  <p className="text-white font-bold text-lg">{jet.range}</p>
                </div>
                <div className="bg-navy-800 p-8 border border-gold-500/10 rounded-sm">
                  <ShieldCheck className="text-gold-500 mb-4" size={32} />
                  <h3 className="text-slate-500 uppercase text-[10px] tracking-widest font-bold mb-2">Cabin Features</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{jet.cabinFeatures}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-display font-bold text-white mb-8 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-gold-500"></span>
                Example Aircraft Models
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {jet.examples.map((model, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-navy-800 p-6 border border-gold-500/5 hover:border-gold-500/20 transition-colors">
                    <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                    <span className="text-white font-medium">{model}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-navy-800 p-10 border border-gold-500/10 rounded-sm">
              <h2 className="text-3xl font-display font-bold text-white mb-6">The Luxury Experience</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 italic">
                {jet.luxuryDescription}
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="flex gap-4">
                  <CheckCircle2 className="text-gold-500 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-white font-bold mb-1">Absolute Privacy</h4>
                    <p className="text-slate-500 text-sm">Conduct business or relax in complete confidentiality.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="text-gold-500 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-white font-bold mb-1">Bespoke Service</h4>
                    <p className="text-slate-500 text-sm">Tailored catering and cabin arrangements to your preference.</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-navy-900 px-10 py-4 rounded-sm font-bold transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3"
              >
                Book Your Private Jet
                <ArrowRight size={18} />
              </button>
            </section>
          </div>

          {/* Sidebar: Popular Routes & CTA */}
          <div className="space-y-8">
            <div className="bg-navy-800 p-8 border border-gold-500/10 rounded-sm">
              <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <MapPin className="text-gold-500" size={20} />
                Popular Routes
              </h3>
              <ul className="space-y-4">
                {jet.routes.map((route, idx) => (
                  <li key={idx} className="flex items-center justify-between text-slate-400 border-b border-slate-700/50 pb-3 last:border-0">
                    <span className="text-sm font-medium italic">{route}</span>
                    <ChevronRight size={14} className="text-gold-500/50" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gold-500 p-10 rounded-sm text-navy-900">
              <h3 className="text-2xl font-display font-bold mb-4">Ready to Fly?</h3>
              <p className="font-medium mb-8 opacity-80">
                Contact our advisory team to coordinate your next journey on a {jet.name}.
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-navy-900 text-gold-500 py-4 font-bold uppercase tracking-widest hover:bg-navy-950 transition-all flex items-center justify-center gap-3"
              >
                Book Your Private Jet
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-navy-900 border border-gold-500/30 rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-gold-500/10 flex justify-between items-center bg-navy-800">
                <div className="flex items-center gap-3">
                  <Plane className="text-gold-500" size={24} />
                  <h2 className="text-xl font-display font-bold text-white">Book Your {jet.name}</h2>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                {submitted ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="text-gold-500 mx-auto mb-6" size={64} />
                    <h3 className="text-2xl font-display font-bold text-white mb-4">Inquiry Submitted</h3>
                    <p className="text-slate-400 mb-8">
                      Thank you for your interest. Our aviation advisory team will review your requirements and contact you shortly with tailored options.
                    </p>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setIsModalOpen(false);
                      }}
                      className="bg-gold-500 text-navy-900 px-8 py-3 font-bold uppercase tracking-widest"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <input type="hidden" name="aircraft_type" value={jet.name} />
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                        <input 
                          type="text" name="name" required
                          className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Email Address</label>
                        <input 
                          type="email" name="email" required
                          className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Phone Number</label>
                        <input 
                          type="tel" name="phone" required
                          className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Travel Date</label>
                        <input 
                          type="date" name="travel_date" required
                          className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Departure City</label>
                        <input 
                          type="text" name="departure" required
                          className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Destination City</label>
                        <input 
                          type="text" name="destination" required
                          className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Number of Passengers</label>
                      <input 
                        type="number" name="passengers" min="1" max="20" required
                        className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Additional Requirements</label>
                      <textarea 
                        name="message"
                        rows={3}
                        placeholder="Catering, ground transport, etc."
                        className="w-full bg-navy-800 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                    >
                      Submit Charter Request
                      <ArrowRight size={18} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JetDetails;
