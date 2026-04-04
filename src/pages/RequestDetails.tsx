import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Lock, UserCheck, Loader2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { submitToFormspree } from '../lib/formSubmission';

const RequestDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [propertyName, setPropertyName] = useState('');
  const [country, setCountry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setPropertyName(params.get('property') || '');
    setCountry(params.get('country') || '');
    window.scrollTo(0, 0);
  }, [location]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    // Add property details to the form data
    formData.append('asset_name', propertyName);
    formData.append('location', country);

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
            <span className="text-luxury-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Confidential Inquiry</span>
            <h1 className="text-3xl sm:text-7xl font-serif text-white mb-8 leading-[1.3] sm:leading-tight">
              Request <br />
              <span className="gold-text-gradient italic">Private Details</span>
            </h1>
            <p className="text-white/40 text-sm sm:text-lg max-w-2xl mx-auto font-sans leading-[1.6]">
              Please complete the form below to receive the full investment memorandum and confidential details for this asset.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Trust Indicators */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass p-8 rounded-sm border-l-2 border-luxury-gold">
              <div className="flex items-center gap-4 mb-4">
                <Lock className="text-luxury-gold" size={20} />
                <h3 className="text-white font-serif text-lg">Secure & Private</h3>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Your inquiry is handled with the highest level of discretion. We do not share your data with third parties.
              </p>
            </div>

            <div className="glass p-8 rounded-sm border-l-2 border-luxury-gold">
              <div className="flex items-center gap-4 mb-4">
                <UserCheck className="text-luxury-gold" size={20} />
                <h3 className="text-white font-serif text-lg">Direct Advisor</h3>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                A dedicated investment advisor will contact you within 24 hours with the requested information.
              </p>
            </div>

            <div className="glass p-8 rounded-sm border-l-2 border-luxury-gold">
              <div className="flex items-center gap-4 mb-4">
                <ShieldCheck className="text-luxury-gold" size={20} />
                <h3 className="text-white font-serif text-lg">Verified Assets</h3>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                All off-market opportunities are pre-vetted for legal and financial compliance.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 glass p-12 rounded-sm border-luxury-gold/10">
            <div className="text-center mb-12">
              <span className="text-luxury-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Private Inquiry</span>
              <h2 className="text-3xl font-serif text-white mb-4">Request Details</h2>
              <p className="text-white/40 text-sm">Request detailed information about this property</p>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="hidden" name="form_type" value="inquiry" />
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white/5 border border-white/10 rounded-sm mb-4">
                <div>
                  <label className="block text-white/20 text-[10px] uppercase tracking-widest mb-2">Asset Name</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={propertyName} 
                    className="w-full bg-transparent text-luxury-gold font-serif text-lg outline-none cursor-default" 
                  />
                </div>
                <div>
                  <label className="block text-white/20 text-[10px] uppercase tracking-widest mb-2">Location</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={country} 
                    className="w-full bg-transparent text-luxury-gold font-serif text-lg outline-none cursor-default" 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Full Name</label>
                  <input name="name" type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Email Address</label>
                  <input name="email" type="email" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Phone / WhatsApp</label>
                  <input name="phone" type="tel" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="+91 00000 00000" required />
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Budget Range (€)</label>
                  <select name="budget" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all appearance-none">
                    <option className="bg-luxury-navy">€500K – €1M</option>
                    <option className="bg-luxury-navy">€1M – €3M</option>
                    <option className="bg-luxury-navy">€3M – €10M</option>
                    <option className="bg-luxury-navy">€10M+</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Message (Optional)</label>
                <textarea name="message" rows={4} className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="Any specific questions regarding this asset?"></textarea>
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
                      Request Details
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-6">
                  By submitting, you agree to our confidentiality agreement.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
