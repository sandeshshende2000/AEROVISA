import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Upload, Globe, Video, Instagram, Youtube, Loader2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { submitToFormspree } from '../lib/formSubmission';

const ListProperty: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    // Add selected plan to form data
    formData.append('selected_plan', selectedPlan);

    const result = await submitToFormspree(formData);

    if (result.success) {
      navigate('/thank-you');
    } else {
      setError(result.error || "Something went wrong. Please try again or contact us via WhatsApp.");
      setIsSubmitting(false);
    }
  };

  const plans = [
    {
      id: 'standard',
      name: 'Standard Listing',
      price: '$99',
      period: '/month',
      features: [
        'Property listing on platform',
        'Global investor exposure',
        'Basic analytics',
        'Direct lead notifications'
      ],
      icon: Globe
    },
    {
      id: 'premium',
      name: 'Premium Promotion',
      price: '$249',
      period: '/month',
      features: [
        'Everything in Standard',
        'Priority placement in search',
        '1 short video per week',
        'Instagram & YouTube promotion',
        'Dedicated account manager'
      ],
      icon: Video
    }
  ];

  return (
    <div className="bg-luxury-navy min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop"
            alt="Luxury Property"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/80 via-luxury-navy/40 to-luxury-navy" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center pt-24 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <Breadcrumbs />
            </div>
            <span className="text-luxury-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Monetization & Exposure</span>
            <h1 className="text-3xl sm:text-7xl font-serif text-white mb-8 leading-[1.3] sm:leading-tight">
              List Your Luxury <br />
              <span className="gold-text-gradient italic">Property Globally</span>
            </h1>
            <p className="text-white/40 text-sm sm:text-lg max-w-2xl mx-auto font-sans leading-[1.6]">
              Access global investors and premium exposure for your high-value assets.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-24">
        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedPlan(plan.id as any)}
              className={`relative p-10 cursor-pointer transition-all duration-500 border-2 ${
                selectedPlan === plan.id ? 'border-luxury-gold bg-white/5' : 'border-white/5 glass hover:border-white/20'
              } rounded-sm`}
            >
              {selectedPlan === plan.id && (
                <div className="absolute top-0 right-0 gold-gradient px-4 py-1 text-luxury-navy text-[10px] font-bold uppercase tracking-widest rounded-bl-sm">
                  Selected
                </div>
              )}
              
              <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-luxury-gold mb-8">
                <plan.icon size={24} />
              </div>
              
              <h3 className="text-white font-serif text-2xl mb-2 tracking-wide">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-white text-4xl font-serif">{plan.price}</span>
                <span className="text-white/40 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3 text-white/60 text-sm">
                    <Check size={16} className="text-luxury-gold mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                selectedPlan === plan.id ? 'gold-gradient text-luxury-navy' : 'border border-white/20 text-white hover:bg-white/5'
              }`}>
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Submission Form */}
        <div className="max-w-4xl mx-auto glass p-12 rounded-sm border-luxury-gold/10">
          <div className="text-center mb-12">
            <span className="text-luxury-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Seller Access</span>
            <h2 className="text-3xl font-serif text-white mb-4">Property Details</h2>
            <p className="text-white/40 text-sm">List your property and connect with global investors</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input type="hidden" name="form_type" value="seller" />
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
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Property Country</label>
                <input name="property_country" type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="e.g. Greece" required />
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
              <div>
                <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Investment Value (€)</label>
                <input name="investment_value" type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="e.g. 2,500,000" required />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Property Description</label>
              <textarea name="message" rows={4} className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-luxury-gold outline-none transition-all" placeholder="Describe the key highlights of the asset..." required></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Upload Images</label>
              <div className="border-2 border-dashed border-white/10 p-12 text-center rounded-sm hover:border-luxury-gold/50 transition-all cursor-pointer group">
                <Upload className="mx-auto text-white/20 mb-4 group-hover:text-luxury-gold transition-colors" size={32} />
                <p className="text-white/40 text-xs uppercase tracking-widest">Drag and drop or click to upload high-resolution property images</p>
                <input type="file" name="property_images" multiple className="hidden" />
              </div>
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
                    List My Property
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
              <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-6">
                By submitting, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
