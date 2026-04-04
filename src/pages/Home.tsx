import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Globe, Briefcase, TrendingUp, MapPin, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { countries, properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import { submitToFormspree } from '../lib/formSubmission';

const Home: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitToFormspree(formData);

    if (result.success) {
      navigate('/thank-you');
    } else {
      setError(result.error || "Something went wrong. Please try again or contact us via WhatsApp.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop"
            alt="Luxury Villa"
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/80 via-luxury-navy/40 to-luxury-navy" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center pt-24 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-luxury-gold text-[10px] sm:text-sm font-bold uppercase tracking-[0.3em] mb-6 block">
              Exclusive Off-Market Opportunities
            </span>
            <h1 className="text-3xl sm:text-6xl md:text-8xl font-serif text-white mb-8 leading-[1.3] sm:leading-[1.1] tracking-tight">
              Access Global <br />
              <span className="gold-text-gradient italic">Off-Market</span> Real Estate
            </h1>
            <p className="text-white/60 text-sm sm:text-xl max-w-2xl mx-auto mb-12 font-sans leading-[1.6]">
              Curated investment-grade properties across Europe for HNI investors, family offices, and global buyers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/opportunities" className="w-full sm:w-auto px-10 py-5 gold-gradient text-luxury-navy text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
                Explore Opportunities
                <ArrowRight size={18} />
              </Link>
              <Link to="/investor-access" className="w-full sm:w-auto px-10 py-5 border border-white/20 hover:bg-white/5 text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2">
                Submit Requirement
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-white/20 text-[10px] uppercase tracking-[0.4em] rotate-90 mb-8">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-gold to-transparent" />
        </motion.div>
      </section>

      {/* Mobile-Optimized Option Boxes */}
      <section className="px-4 -mt-8 sm:-mt-12 relative z-20">
        <div className="max-w-5xl mx-auto flex flex-row justify-between gap-2 sm:gap-4">
          <Link 
            to="/opportunities"
            className="flex-1 glass border border-luxury-gold/30 rounded-[12px] p-3 sm:p-6 text-center hover:border-luxury-gold transition-all duration-300 shadow-xl group"
          >
            <h3 className="text-white font-serif font-bold text-[12px] sm:text-lg mb-1 group-hover:text-luxury-gold transition-colors uppercase tracking-wider">Global Deals</h3>
            <p className="text-white/40 text-[10px] sm:text-sm font-sans leading-tight">Off-market opportunities</p>
          </Link>
          
          <Link 
            to="/investor-access"
            className="flex-1 glass border border-luxury-gold/30 rounded-[12px] p-3 sm:p-6 text-center hover:border-luxury-gold transition-all duration-300 shadow-xl group"
          >
            <h3 className="text-white font-serif font-bold text-[12px] sm:text-lg mb-1 group-hover:text-luxury-gold transition-colors uppercase tracking-wider">HNI Access</h3>
            <p className="text-white/40 text-[10px] sm:text-sm font-sans leading-tight">Curated investments</p>
          </Link>
          
          <Link 
            to="/investor-access"
            className="flex-1 glass border border-luxury-gold/30 rounded-[12px] p-3 sm:p-6 text-center hover:border-luxury-gold transition-all duration-300 shadow-xl group"
          >
            <h3 className="text-white font-serif font-bold text-[12px] sm:text-lg mb-1 group-hover:text-luxury-gold transition-colors uppercase tracking-wider">Confidential</h3>
            <p className="text-white/40 text-[10px] sm:text-sm font-sans leading-tight">Private transactions</p>
          </Link>
        </div>
      </section>

      {/* Featured Opportunities Section */}
      <section className="py-24 px-8 bg-luxury-navy/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Global Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Featured <span className="italic gold-text-gradient">Opportunities</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              A curated selection of high-yield assets and luxury residences across our primary markets, grouped by investment category.
            </p>
          </div>

          <div className="space-y-32">
            {/* Luxury Villas Section */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                <div>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-2">
                    Luxury <span className="gold-text-gradient italic">Villas</span>
                  </h3>
                  <p className="text-white/40 text-sm uppercase tracking-widest">Exclusive beachfront and hillside estates across the Mediterranean and beyond.</p>
                </div>
                <Link 
                  to="/villas"
                  className="text-luxury-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-all flex items-center gap-2 group relative"
                >
                  View All Villas 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-gold group-hover:w-full transition-all duration-500 shadow-[0_0_8px_rgba(212,175,55,0.5)]"></span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties
                  .filter(p => p.type === 'Villa')
                  .slice(0, 3)
                  .map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
              </div>
            </div>

            {/* Hotels & Resorts Section */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                <div>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-2">
                    Hotels & <span className="gold-text-gradient italic">Resorts</span>
                  </h3>
                  <p className="text-white/40 text-sm uppercase tracking-widest">High-yield hospitality assets and boutique retreats in strategic global locations.</p>
                </div>
                <Link 
                  to="/hotels"
                  className="text-luxury-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-all flex items-center gap-2 group relative"
                >
                  View All Hotels 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-gold group-hover:w-full transition-all duration-500 shadow-[0_0_8px_rgba(212,175,55,0.5)]"></span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties
                  .filter(p => p.type === 'Hotel')
                  .slice(0, 3)
                  .map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
              </div>
            </div>

            {/* Apartments & Redevelopment Section */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                <div>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-2">
                    Apartments & <span className="gold-text-gradient italic">Projects</span>
                  </h3>
                  <p className="text-white/40 text-sm uppercase tracking-widest">Prime urban residences and high-potential redevelopment opportunities.</p>
                </div>
                <Link 
                  to="/apartments"
                  className="text-luxury-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-all flex items-center gap-2 group relative"
                >
                  View All Apartments 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-gold group-hover:w-full transition-all duration-500 shadow-[0_0_8px_rgba(212,175,55,0.5)]"></span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties
                  .filter(p => (p.type === 'Apartment' || p.type === 'Redevelopment') && !p.title.toLowerCase().includes('penthouse'))
                  .slice(0, 3)
                  .map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Off-Market Penthouse Section */}
      <section className="py-24 px-8 bg-luxury-navy relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-luxury-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Off-Market Access</span>
            <h2 className="text-4xl md:text-6xl font-serif text-luxury-gold mb-6">
              Off-Market <span className="italic text-white">Penthouse Opportunities</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Access exclusive off-market opportunities
            </p>
          </div>

          <div className="glass p-8 md:p-12 rounded-sm border border-luxury-gold/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="hidden" name="form_type" value="offmarket" />
              <div className="space-y-6">
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    name="name"
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" 
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Phone / WhatsApp</label>
                  <input 
                    name="phone"
                    type="tel" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" 
                    placeholder="+1 (234) 567-890" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Preferred Location</label>
                  <input 
                    name="preferred_location"
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" 
                    placeholder="e.g. London, Mykonos, Lisbon" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Budget Range (€)</label>
                  <select name="budget_range" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all appearance-none cursor-pointer">
                    <option className="bg-luxury-navy">€1M – €3M</option>
                    <option className="bg-luxury-navy">€3M – €5M</option>
                    <option className="bg-luxury-navy">€5M – €10M</option>
                    <option className="bg-luxury-navy">€10M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    name="message"
                    rows={1} 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" 
                    placeholder="Specific requirements..."
                  ></textarea>
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs uppercase tracking-widest text-center">
                    {error}
                  </div>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 gold-gradient text-luxury-navy text-sm font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Access Deals
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                  <ShieldCheck size={12} />
                  Your inquiry is handled with complete global discretion.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop"
            alt="Luxury Interior"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-luxury-navy/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center glass p-16 rounded-sm border-luxury-gold/20">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
            Ready to Secure Your Next <br />
            <span className="gold-text-gradient italic">High-Value</span> Investment?
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
            Our advisors are ready to assist you with bespoke investment strategies and exclusive off-market access.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/investor-access" className="w-full sm:w-auto px-12 py-5 gold-gradient text-luxury-navy text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              Get Started
            </Link>
            <Link 
              to="/advisor-contact" 
              className="w-full sm:w-auto px-12 py-5 border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Speak to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section (Global Partnerships / Confidential / Investor-Focused) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-luxury-navy/30 mb-8 sm:mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row justify-between gap-2 sm:gap-4">
            {/* Box 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 glass border border-luxury-gold/30 rounded-[12px] sm:rounded-[16px] p-3 sm:p-8 text-center shadow-xl flex flex-col justify-center"
            >
              <h3 className="text-white font-serif font-bold text-[12px] sm:text-base mb-2 uppercase tracking-wider leading-tight">Global Partnerships</h3>
              <p className="text-white/40 text-[9px] sm:text-xs font-sans leading-tight">Direct access to exclusive networks and off-market opportunities worldwide.</p>
            </motion.div>
            
            {/* Box 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-1 glass border border-luxury-gold/30 rounded-[12px] sm:rounded-[16px] p-3 sm:p-8 text-center shadow-xl flex flex-col justify-center"
            >
              <h3 className="text-white font-serif font-bold text-[12px] sm:text-base mb-2 uppercase tracking-wider leading-tight">Confidential Transactions</h3>
              <p className="text-white/40 text-[9px] sm:text-xs font-sans leading-tight">Every investment is handled with complete discretion and security.</p>
            </motion.div>
            
            {/* Box 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 glass border border-luxury-gold/30 rounded-[12px] sm:rounded-[16px] p-3 sm:p-8 text-center shadow-xl flex flex-col justify-center"
            >
              <h3 className="text-white font-serif font-bold text-[12px] sm:text-base mb-2 uppercase tracking-wider leading-tight">Investor-Focused</h3>
              <p className="text-white/40 text-[9px] sm:text-xs font-sans leading-tight">Tailored strategies aligned with ROI and long-term investment goals.</p>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
