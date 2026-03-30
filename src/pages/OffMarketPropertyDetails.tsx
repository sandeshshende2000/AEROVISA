
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Send,
  DollarSign,
  Calendar,
  Globe
} from 'lucide-react';

const offMarketProperties = [
  {
    id: 'river-villa',
    title: 'Private River Villa',
    location: 'Portugal',
    description: 'This ultra-exclusive riverfront villa offers unparalleled privacy and luxury. Designed with modern architecture and high-end finishes, it features a private dock, infinity pool, and expansive outdoor living spaces. A rare investment opportunity in one of Portugal\'s most sought-after locations.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    roi: '6-8% Annual',
    eligibility: 'Golden Visa Eligible',
    highlights: [
      'Private River Frontage',
      'Infinity Pool & Private Dock',
      'Smart Home Technology',
      'High ROI Potential',
      'Golden Visa Eligible'
    ]
  },
  {
    id: 'riverside-hotel',
    title: 'Lisbon Riverside Hotel Investment',
    location: 'Lisbon, Portugal',
    description: 'A premium hospitality investment opportunity in the heart of Lisbon\'s revitalized riverside district. This boutique hotel project combines historic charm with contemporary luxury, catering to the high-end tourism market. Investors benefit from a strategic location and professional management.',
    image: 'https://images.unsplash.com/photo-1555854816-802f188095e4?auto=format&fit=crop&q=80&w=1200',
    roi: '7-9% Annual',
    eligibility: 'Investment Fund Eligible',
    highlights: [
      'Prime Lisbon Location',
      'Boutique Luxury Project',
      'Professional Management',
      'Strong Tourism Demand',
      'Investment Fund Eligible'
    ]
  },
  {
    id: 'coastal-apartment',
    title: 'Coastal Luxury Apartment',
    location: 'Greece',
    description: 'Experience the best of Mediterranean living in this high-demand coastal apartment. Located in a prestigious development with direct beach access, this property offers stunning sea views and world-class amenities. Perfect for both personal use and high-yield short-term rentals.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
    roi: '5-7% Annual',
    eligibility: 'Greece Golden Visa Eligible',
    highlights: [
      'Direct Beach Access',
      'Panoramic Sea Views',
      'High Rental Demand',
      'Modern Luxury Finishes',
      'Greece Golden Visa Eligible'
    ]
  }
];

const OffMarketPropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const property = offMarketProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-display font-bold mb-4">Property Not Found</h1>
        <button 
          onClick={() => navigate('/off-market')}
          className="bg-gold-500 text-navy-950 px-8 py-3 font-bold uppercase tracking-widest"
        >
          Back to Off-Market
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('propertyId', property.id);
    formData.append('propertyName', property.title);

    try {
      const response = await fetch('https://formspree.io/f/xkoqnwbq', {
        method: 'POST',
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
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gold-500 font-bold uppercase tracking-widest text-xs mb-12 hover:text-gold-400 transition-colors group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="aspect-[16/9] bg-navy-800 border border-gold-500/20 overflow-hidden relative rounded-sm shadow-2xl">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-gold-500 mb-8">
                <MapPin size={18} />
                <span className="text-base sm:text-lg font-medium">{property.location}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-12">
                <div className="bg-navy-800 p-6 border border-gold-500/10">
                  <TrendingUp className="text-gold-500 mb-2" size={24} />
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Expected ROI</p>
                  <p className="text-white font-bold">{property.roi}</p>
                </div>
                <div className="bg-navy-800 p-6 border border-gold-500/10">
                  <ShieldCheck className="text-gold-500 mb-2" size={24} />
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Residency Status</p>
                  <p className="text-white font-bold">{property.eligibility}</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-display font-bold text-white mb-4">Property Description</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  {property.description}
                </p>
                
                <h3 className="text-2xl font-display font-bold text-white mb-4">Key Highlights</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {property.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-400">
                      <CheckCircle2 size={18} className="text-gold-500" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="bg-navy-800 p-8 md:p-10 border border-gold-500/20 rounded-sm shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Globe size={100} className="text-gold-500" />
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="text-gold-500 mx-auto mb-6" size={64} />
                  <h3 className="text-white text-2xl font-bold mb-4">Inquiry Received</h3>
                  <p className="text-slate-300 mb-8">
                    Thank you. Your request has been submitted successfully. Our team will contact you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-gold-500 font-bold text-sm uppercase tracking-widest hover:underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-display font-bold text-white mb-2">Request Private Details</h3>
                    <p className="text-slate-400 text-sm">
                      Submit your information for a confidential investment memorandum.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Investment Budget</label>
                      <select 
                        name="budget" 
                        required 
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
                      <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Message (Optional)</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                      ></textarea>
                    </div>

                    {error && (
                      <div className="text-red-500 text-sm font-bold text-center">{error}</div>
                    )}

                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 py-5 rounded-sm font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Request Private Details'}
                      <Send size={18} />
                    </button>
                    <p className="text-center text-slate-500 text-[10px] uppercase tracking-widest">
                      Strictly confidential advisory service
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OffMarketPropertyDetails;
