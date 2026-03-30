import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import BackButton from '../components/BackButton';

const Contact = () => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <BackButton label="Back to Home" fallbackPath="/" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Connect With Us</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Contact Advisory</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Our global advisory team is available to discuss your residency and investment requirements.
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
                    <a href="tel:+917768081438" className="text-white font-medium hover:text-gold-500 transition-colors">+91 7768081438 (International Support Line)</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-gold-500" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Email</p>
                    <a href="mailto:info@aerovisaglobal.com" className="text-white font-medium hover:text-gold-500 transition-colors">info@aerovisaglobal.com</a>
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
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gold-500/10 border border-gold-500/50 p-8 text-center rounded-sm"
                >
                  <CheckCircle2 className="text-gold-500 mx-auto mb-4" size={48} />
                  <h3 className="text-white text-xl font-bold mb-2">Message Sent</h3>
                  <p className="text-slate-300">Thank you. Your request has been submitted successfully. Our team will contact you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-gold-500 font-bold text-sm uppercase tracking-widest hover:underline"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form 
                  action="https://formspree.io/f/xkoqnwbq" 
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                    <input 
                      type="text" name="name" required
                      className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email Address</label>
                    <input 
                      type="email" name="email" required
                      className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Subject</label>
                    <input 
                      type="text" name="subject"
                      className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Message / Question</label>
                    <textarea 
                      name="message"
                      rows={6} required
                      className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
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
                    className="md:col-span-2 bg-gold-500 hover:bg-gold-600 text-navy-900 py-5 rounded-sm font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                    {!submitting && <Send size={18} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
