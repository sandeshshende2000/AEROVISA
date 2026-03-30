import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Consultation = () => {
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

  return (
    <div className="bg-navy-900 min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 font-bold uppercase tracking-widest text-xs transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Confidential Advisory</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Private Consultation</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Confidential advisory for global investors and residency planning.
          </p>
        </motion.div>

        <div className="bg-navy-800 p-8 md:p-12 border border-gold-500/20 rounded-sm shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck size={120} className="text-gold-500" />
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle2 className="text-gold-500 mx-auto mb-6" size={64} />
              <h3 className="text-white text-2xl font-bold mb-4">Consultation Requested</h3>
              <p className="text-slate-300 text-lg mb-8">
                Thank you. Your request has been submitted successfully. Our team will contact you shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-gold-500 font-bold text-sm uppercase tracking-widest hover:underline"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
          <form 
            action="https://formspree.io/f/xkoqnwbq" 
            method="POST"
            onSubmit={handleSubmit} 
            className="grid md:grid-cols-2 gap-8 relative z-10"
          >
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Full Name</label>
                <input 
                  type="text" name="name" required
                  placeholder="John Doe"
                  className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Email Address</label>
                <input 
                  type="email" name="email" required
                  placeholder="john@example.com"
                  className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Phone Number</label>
                <input 
                  type="tel" name="phone" required
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Nationality</label>
                <input 
                  type="text" name="nationality" required
                  placeholder="e.g. United States"
                  className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Investment Budget</label>
                <select 
                  name="budget" required
                  defaultValue=""
                  className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>Select Budget Range</option>
                  <option value="€250k - €500k">€250,000 - €500,000</option>
                  <option value="€500k - €1M">€500,000 - €1,000,000</option>
                  <option value="€1M - €5M">€1,000,000 - €5,000,000</option>
                  <option value="€5M+">€5,000,000+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Preferred Country</label>
                <select 
                  name="country" required
                  defaultValue=""
                  className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>Select Country</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Greece">Greece</option>
                  <option value="Other">Other / Undecided</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Timeline</label>
                <select 
                  name="timeline" required
                  defaultValue=""
                  className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>Expected Timeline</option>
                  <option value="Immediate">Immediate (Next 3 months)</option>
                  <option value="3-6 Months">3 - 6 Months</option>
                  <option value="6-12 Months">6 - 12 Months</option>
                  <option value="Planning Phase">Planning Phase (12+ months)</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Message (Optional)</label>
                <textarea 
                  name="message"
                  rows={4}
                  placeholder="Tell us more about your requirements..."
                  className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                ></textarea>
              </div>
              {error && (
                <div className="md:col-span-2 text-red-500 text-sm font-bold text-center">
                  {error}
                </div>
              )}
              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 py-5 rounded-sm font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Schedule Private Consultation'}
                  <Send size={18} />
                </button>
                <p className="text-center text-slate-400 text-[10px] mt-4 uppercase tracking-widest">
                  Your information is secured with industry-standard encryption.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consultation;
