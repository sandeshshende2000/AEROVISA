import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitToFormspree } from '../lib/formSubmission';

const HNIListingSection: React.FC = () => {
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
    <section className="py-24 px-8 bg-luxury-navy border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-luxury-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Seller Access</span>
          <h2 className="text-4xl md:text-6xl font-serif text-luxury-gold font-bold mb-6">
            List Your Luxury Property for <br />
            <span className="italic text-white">Global HNI Investors</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            List your property and connect with global investors
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-8 md:p-12 rounded-sm border border-luxury-gold/20 shadow-2xl text-left"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input type="hidden" name="form_type" value="seller" />
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
              <div>
                <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Property Location</label>
                <input 
                  name="property_location"
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" 
                  placeholder="City, Country" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Property Type</label>
                <select name="property_type" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all appearance-none cursor-pointer">
                  <option className="bg-luxury-navy">Villa</option>
                  <option className="bg-luxury-navy">Hotel</option>
                  <option className="bg-luxury-navy">Apartment</option>
                  <option className="bg-luxury-navy">Project</option>
                </select>
              </div>
              <div>
                <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Investment Value (€)</label>
                <input 
                  name="investment_value"
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" 
                  placeholder="e.g. €5,000,000" 
                  required 
                />
              </div>
              <div>
                <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Upload Images</label>
                <input 
                  name="property_images"
                  type="file" 
                  multiple
                  className="w-full bg-white/5 border border-white/10 p-3 text-white text-xs file:bg-luxury-gold file:border-none file:text-luxury-navy file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:px-4 file:py-2 file:mr-4 file:cursor-pointer focus:border-luxury-gold outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  name="message"
                  rows={1} 
                  className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" 
                  placeholder="Brief description of the asset..."
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
                    List My Property
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
              <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                <ShieldCheck size={12} />
                All listings are handled with complete confidentiality.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default HNIListingSection;
