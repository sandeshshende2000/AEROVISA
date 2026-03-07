import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, ShieldCheck, DollarSign, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

const GoldenVisaAdvisory = () => {
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Investment Migration</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Golden Visa Advisory</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Secure your future with residency by investment. We connect you with verified immigration consultants to navigate the world's most prestigious Golden Visa programs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Strategic Global Mobility</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                A Golden Visa provides more than just residency; it offers global access, security, and a plan for your family's future. Our advisory platform ensures you work with the best experts in the field.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <Globe size={20} />, title: "Global Access", desc: "Visa-free travel across major regions." },
                  { icon: <ShieldCheck size={20} />, title: "Security", desc: "A safe haven for your family and assets." },
                  { icon: <DollarSign size={20} />, title: "Investment", desc: "Strategic real estate or fund investments." },
                  { icon: <FileText size={20} />, title: "Compliance", desc: "Full legal and regulatory adherence." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-navy-800 p-6 border border-gold-500/10 rounded-sm">
                    <div className="text-gold-500 mb-3">{item.icon}</div>
                    <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy-800 p-8 border border-gold-500/10 rounded-sm">
              <h3 className="text-white font-bold mb-4">Popular Programs</h3>
              <ul className="space-y-4">
                {["Portugal Golden Visa", "Greece Residency by Investment", "UAE Golden Visa", "Spain Golden Visa"].map((program, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-gold-500" />
                    <span>{program}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-navy-800 p-8 md:p-12 border border-gold-500/20 rounded-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <Globe className="text-gold-500" size={32} />
              <h2 className="text-3xl font-display font-bold text-white">Consultation Request</h2>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gold-500/10 border border-gold-500/50 p-8 text-center rounded-sm"
              >
                <CheckCircle2 className="text-gold-500 mx-auto mb-4" size={48} />
                <h3 className="text-white text-xl font-bold mb-2">Request Received</h3>
                <p className="text-slate-300">Thank you for your consultation request. Our residency advisors will contact you shortly.</p>
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
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Investment Budget</label>
                  <input 
                    type="text" name="budget" placeholder="e.g. $500,000+"
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Preferred Country</label>
                  <input 
                    type="text" name="country"
                    className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  />
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
                  className="md:col-span-2 bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 rounded-sm font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  Request Golden Visa Consultation
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

export default GoldenVisaAdvisory;
