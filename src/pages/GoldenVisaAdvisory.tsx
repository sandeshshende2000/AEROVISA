import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, ShieldCheck, DollarSign, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

const GoldenVisaAdvisory = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', nationality: '', budget: '', country: '', timeline: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Golden Visa Consultation Request Sent. Our advisor will contact you shortly.');
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
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                <input 
                  type="text" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email</label>
                <input 
                  type="email" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Phone</label>
                <input 
                  type="tel" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Nationality</label>
                <input 
                  type="text" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Investment Budget</label>
                <input 
                  type="text" required placeholder="e.g. $500,000+"
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Preferred Country</label>
                <input 
                  type="text" required
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Timeline</label>
                <select 
                  className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="md:col-span-2 bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 rounded-sm font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-3"
              >
                Request Consultation
                <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GoldenVisaAdvisory;
