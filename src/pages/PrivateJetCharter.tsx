import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plane, Calendar, MapPin, Users, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import BackButton from '../components/BackButton';

const PrivateJetCharter = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="bg-navy-900 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton label="Back to Home" fallbackPath="/" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Bespoke Aviation</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Private Jet Charter</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Experience the ultimate in travel efficiency and luxury. Our platform coordinates private jet charter requests through a global network of licensed operators.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Why Choose Private Charter?</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Private aviation offers unparalleled flexibility, privacy, and time savings. Avoid crowded terminals and fly on your own schedule to thousands of airports worldwide.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <Calendar size={20} />, title: "On-Demand", desc: "Fly when you want, where you want." },
                  { icon: <ShieldCheck size={20} />, title: "Secure", desc: "Full privacy and confidential travel." },
                  { icon: <MapPin size={20} />, title: "Direct Access", desc: "Reach remote locations directly." },
                  { icon: <Users size={20} />, title: "Group Travel", desc: "Perfect for corporate or family trips." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-navy-800 p-6 border border-gold-500/10 rounded-sm">
                    <div className="text-gold-500 mb-3">{item.icon}</div>
                    <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gold-500/10 p-8 border-l-4 border-gold-500">
              <h3 className="text-gold-500 font-bold mb-2 uppercase tracking-widest text-xs">Aviation Compliance</h3>
              <p className="text-slate-300 text-sm italic">
                "All aviation services, charter agreements and flight operations are handled directly by licensed aviation operators or charter brokers within our verified network."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-navy-800 p-8 md:p-12 border border-gold-500/20 rounded-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <Plane className="text-gold-500" size={32} />
              <h2 className="text-3xl font-display font-bold text-white">Charter Inquiry</h2>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gold-500/10 border border-gold-500/50 p-8 text-center rounded-sm"
              >
                <CheckCircle2 className="text-gold-500 mx-auto mb-4" size={48} />
                <h3 className="text-white text-xl font-bold mb-2">Request Received</h3>
                <p className="text-slate-300">Thank you. Your request has been submitted. Our advisory team will contact you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-gold-500 font-bold text-sm uppercase tracking-widest hover:underline"
                >
                  Send Another Request
                </button>
              </motion.div>
            ) : (
              <form 
                action="https://formspree.io/f/xkoqnwbq" 
                method="POST"
                onSubmit={handleSubmit} 
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
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Phone / WhatsApp</label>
                  <input 
                    type="tel" name="phone"
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Departure City</label>
                    <input 
                      type="text" name="departure" required
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Destination City</label>
                    <input 
                      type="text" name="destination" required
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Travel Date</label>
                    <input 
                      type="date" name="travel_date" required
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Passengers</label>
                    <input 
                      type="number" name="passengers" min="1" max="20" required
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Estimated Budget</label>
                  <input 
                    type="text" name="budget" placeholder="e.g. $50,000"
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Additional Requirements</label>
                  <textarea 
                    name="message"
                    rows={4}
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="md:col-span-2 bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 rounded-sm font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  Request Charter Quote
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivateJetCharter;
