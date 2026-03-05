import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message Sent. Our advisory team will contact you shortly.');
  };

  return (
    <div className="bg-navy-900 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Connect With Us</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Contact Advisory</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Our global advisory team is available to discuss your private aviation and investment migration requirements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-navy-800 p-10 border border-gold-500/10 rounded-sm">
              <h2 className="text-2xl font-display font-bold text-white mb-8">Global Support</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-gold-500" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Phone</p>
                    <p className="text-white font-medium">+1 (234) 567-890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-gold-500" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Email</p>
                    <p className="text-white font-medium">advisor@aerovisa.global</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-gold-500" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Office</p>
                    <p className="text-white font-medium">Global Advisory Hub, Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gold-500/5 p-8 border border-gold-500/20 rounded-sm">
              <MessageSquare className="text-gold-500 mb-4" size={32} />
              <h3 className="text-white font-bold mb-2">Confidential Inquiry</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                All communications are handled with the highest level of confidentiality and professional discretion.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-navy-800 p-10 md:p-12 border border-gold-500/20 rounded-sm">
              <h2 className="text-3xl font-display font-bold text-white mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                  <input 
                    type="text" required
                    className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email Address</label>
                  <input 
                    type="email" required
                    className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Phone Number</label>
                  <input 
                    type="tel" required
                    className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Subject</label>
                  <input 
                    type="text" required
                    className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Message</label>
                  <textarea 
                    rows={6} required
                    className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="md:col-span-2 bg-gold-500 hover:bg-gold-600 text-navy-900 py-5 rounded-sm font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  Send Inquiry
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
