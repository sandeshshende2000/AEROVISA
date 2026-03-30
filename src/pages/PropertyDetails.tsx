
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, ArrowLeft, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  Timestamp 
} from 'firebase/firestore';
import { featuredProperties } from '../data/properties';
import { handleFirestoreError, OperationType } from '../lib/utils';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      // Check static data first
      const staticProp = featuredProperties.find(p => p.id === id);
      if (staticProp) {
        setProperty({
          ...staticProp,
          imageUrl: staticProp.image,
          propertyType: staticProp.type,
          description: "This exclusive property offers unparalleled luxury and sophistication. Contact our advisory team for a full investment memorandum and private viewing arrangements."
        });
        setLoading(false);
      } else {
        // Check Firestore
        try {
          const docRef = doc(db, 'approvedProperties', id!);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProperty({ id: docSnap.id, ...docSnap.data() });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, 'approvedProperties');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProperty();
  }, [id]);

  const [error, setError] = useState<string | null>(null);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Add property info to formData
    formData.append('propertyId', id || '');
    formData.append('propertyName', property.title || property.propertyType);
    formData.append('propertyLocation', property.location);
    formData.append('propertyPrice', property.price);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-gold-500 font-display text-2xl animate-pulse">Loading Property Details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-display font-bold text-white mb-4">Property Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="text-gold-500 font-bold uppercase tracking-widest border-b border-gold-500 pb-1"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gold-500 font-bold uppercase tracking-widest text-sm mb-12 hover:text-gold-400 transition-colors group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> Back to Listings
        </button>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Image & Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="aspect-[16/9] bg-navy-800 border border-gold-500/20 overflow-hidden relative rounded-sm shadow-2xl">
              <img 
                src={property.imageUrl || property.image} 
                alt={property.title || property.propertyType}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-gold-500 text-navy-900 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg">
                  {property.propertyType || property.type}
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                {property.title || `${property.propertyType} in ${property.location}`}
              </h1>
              <div className="flex items-center gap-2 text-gold-500 mb-8">
                <MapPin size={20} />
                <span className="text-lg font-medium">{property.location}</span>
              </div>
              
              <div className="text-3xl font-display font-bold text-white mb-8">
                {property.price}
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  {property.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {property.features?.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-400">
                      <CheckCircle2 size={18} className="text-gold-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="bg-navy-800 p-8 md:p-10 border border-gold-500/20 rounded-sm shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <ShieldCheck size={100} className="text-gold-500" />
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
                    <p className="text-slate-400 text-sm">Submit your information for a confidential investment memorandum.</p>
                  </div>

                  <form 
                    action="https://formspree.io/f/xkoqnwbq"
                    method="POST"
                    onSubmit={handleSubmitInquiry} 
                    className="space-y-6 relative z-10"
                  >
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Full Name</label>
                      <input 
                        type="text" name="name" required
                        className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Email Address</label>
                      <input 
                        type="email" name="email" required
                        className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Phone Number</label>
                      <input 
                        type="tel" name="phone" required
                        className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Message (Optional)</label>
                      <textarea 
                        name="message" rows={4}
                        className="w-full bg-navy-900 border border-slate-700 p-4 text-white focus:border-gold-500 outline-none transition-colors"
                      ></textarea>
                    </div>
                    {error && (
                      <div className="text-red-500 text-sm font-bold text-center">
                        {error}
                      </div>
                    )}
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 py-5 rounded-sm font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Request Private Access'}
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

export default PropertyDetailsPage;
