import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Phone, Mail, Globe, ShieldCheck, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { submitToFormspree } from '../lib/formSubmission';

const AdvisorContact: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen bg-luxury-navy pt-32 pb-24 px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-luxury-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-luxury-gold/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Private Consultation</span>
            <h1 className="text-4xl md:text-7xl font-serif text-white mb-8 leading-tight">
              Speak to an <br />
              <span className="gold-text-gradient italic">Advisor</span>
            </h1>
            <p className="text-white/60 text-xl mb-12 leading-relaxed max-w-xl">
              Connect with our elite team for personalized investment guidance and exclusive access to off-market global opportunities.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-luxury-gold shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Global Network</h4>
                  <p className="text-white/40 text-sm">Direct access to off-market assets in Greece, Portugal, Latvia, and the UK.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-luxury-gold shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Total Discretion</h4>
                  <p className="text-white/40 text-sm">Every consultation and transaction is handled with absolute confidentiality.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass p-8 md:p-12 rounded-sm border-luxury-gold/20"
          >
            <div className="text-center mb-8">
              <span className="text-luxury-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Consultation</span>
              <p className="text-white/40 text-sm">Speak with our team for personalized guidance</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form_type" value="advisor" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-1">Full Name</label>
                  <input 
                    name="name"
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white placeholder:text-white/10 focus:border-luxury-gold/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-1">Email Address</label>
                  <input 
                    name="email"
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white placeholder:text-white/10 focus:border-luxury-gold/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-1">Phone / WhatsApp</label>
                  <input 
                    name="phone"
                    required
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white placeholder:text-white/10 focus:border-luxury-gold/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-1">Investment Budget</label>
                  <select 
                    name="budget"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white focus:border-luxury-gold/50 outline-none transition-all appearance-none"
                  >
                    <option value="" className="bg-luxury-navy">Select Budget</option>
                    <option value="under-1m" className="bg-luxury-navy">Under €1M</option>
                    <option value="1m-5m" className="bg-luxury-navy">€1M - €5M</option>
                    <option value="5m-10m" className="bg-luxury-navy">€5M - €10M</option>
                    <option value="over-10m" className="bg-luxury-navy">Over €10M</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-1">Preferred Country</label>
                <select 
                  name="preferred_country"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white focus:border-luxury-gold/50 outline-none transition-all appearance-none"
                >
                  <option value="" className="bg-luxury-navy">Select Country</option>
                  <option value="greece" className="bg-luxury-navy">Greece</option>
                  <option value="portugal" className="bg-luxury-navy">Portugal</option>
                  <option value="latvia" className="bg-luxury-navy">Latvia</option>
                  <option value="uk" className="bg-luxury-navy">United Kingdom</option>
                  <option value="other" className="bg-luxury-navy">Other / Multiple</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-1">Your Message</label>
                <textarea 
                  name="message"
                  rows={4}
                  placeholder="Tell us about your investment goals..."
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white placeholder:text-white/10 focus:border-luxury-gold/50 outline-none transition-all resize-none"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs uppercase tracking-widest text-center">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 gold-gradient text-luxury-navy text-sm font-bold uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Request a Call
                    <Send size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-6">
                By submitting, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorContact;
