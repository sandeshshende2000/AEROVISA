import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, Briefcase, ArrowRight, MapPin, TrendingUp, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { submitToFormspree } from '../lib/formSubmission';

const InvestorAccess: React.FC = () => {
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
    <div className="pt-32 sm:pt-40 pb-24 px-8 bg-luxury-navy min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-8">
              <Breadcrumbs />
            </div>
            <span className="text-luxury-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 block">HNI & Family Office Access</span>
            <h1 className="text-3xl sm:text-7xl font-serif text-white mb-8 leading-[1.3] sm:leading-tight">
              Access <br />
              <span className="gold-text-gradient italic">Off-Market Opportunities</span>
            </h1>
            <h2 className="text-white/40 text-sm sm:text-lg max-w-2xl mx-auto font-sans leading-[1.6]">
              Tell us your investment requirements to gain access to our exclusive, non-public portfolio.
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Benefits Column */}
          <div className="lg:col-span-1 space-y-12">
            <div className="glass p-8 rounded-sm">
              <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center text-luxury-navy mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-white font-serif text-xl mb-4">Discreet Access</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Gain entry to a curated selection of properties that are never listed on the open market.
              </p>
            </div>

            <div className="glass p-8 rounded-sm">
              <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center text-luxury-navy mb-6">
                <UserCheck size={24} />
              </div>
              <h3 className="text-white font-serif text-xl mb-4">Personal Advisor</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Work directly with a dedicated investment advisor to find assets that match your specific ROI and residency goals.
              </p>
            </div>

            <div className="glass p-8 rounded-sm">
              <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center text-luxury-navy mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-white font-serif text-xl mb-4">Bespoke Sourcing</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                If the right asset isn't in our portfolio, we will source it specifically for you through our global network.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 glass p-12 rounded-sm border-luxury-gold/10">
            <div className="text-center mb-12">
              <span className="text-luxury-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Investor Access</span>
              <h2 className="text-3xl font-serif text-white mb-4">Investment Requirement</h2>
              <p className="text-white/40 text-sm">Share your requirements to access curated opportunities</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="hidden" name="form_type" value="investor" />
              <div className="space-y-6">
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Full Name</label>
                  <input name="name" type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Email Address</label>
                  <input name="email" type="email" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="john@example.com" required />
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Phone / WhatsApp</label>
                  <input name="phone" type="tel" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="+1 (234) 567-890" required />
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Timeline</label>
                  <select name="timeline" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all appearance-none">
                    <option className="bg-luxury-navy">Immediate</option>
                    <option className="bg-luxury-navy">3 Months</option>
                    <option className="bg-luxury-navy">6 Months</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Investment Budget (€)</label>
                  <select name="budget" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all appearance-none">
                    <option className="bg-luxury-navy">€500K – €1M</option>
                    <option className="bg-luxury-navy">€1M – €3M</option>
                    <option className="bg-luxury-navy">€3M – €10M</option>
                    <option className="bg-luxury-navy">€10M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Preferred Country</label>
                  <select name="preferred_country" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all appearance-none">
                    <option className="bg-luxury-navy">Greece</option>
                    <option className="bg-luxury-navy">Portugal</option>
                    <option className="bg-luxury-navy">Latvia</option>
                    <option className="bg-luxury-navy">UK</option>
                    <option className="bg-luxury-navy">Other / Global</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Property Type</label>
                  <select name="property_type" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all appearance-none">
                    <option className="bg-luxury-navy">Villa</option>
                    <option className="bg-luxury-navy">Hotel</option>
                    <option className="bg-luxury-navy">Apartment</option>
                    <option className="bg-luxury-navy">Redevelopment Project</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Message</label>
                <textarea name="message" rows={4} className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="Tell us more about your investment goals..."></textarea>
              </div>

              <div className="md:col-span-2 pt-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs uppercase tracking-widest text-center">
                    {error}
                  </div>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 gold-gradient text-luxury-navy text-sm font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Investment Options
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-6">
                  Your information is handled with the highest level of confidentiality.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorAccess;
