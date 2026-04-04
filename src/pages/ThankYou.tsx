import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-luxury-navy flex items-center justify-center px-8 pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-luxury-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-luxury-gold/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full glass p-12 text-center rounded-sm border-luxury-gold/20 relative z-10"
      >
        <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="text-luxury-gold" size={40} />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-serif text-white mb-6">Request Submitted</h1>
        
        <p className="text-white/60 text-lg mb-12 leading-relaxed">
          Your request has been submitted successfully. Our team of senior investment advisors will review your requirements and contact you shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/')}
            className="px-12 py-5 gold-gradient text-luxury-navy text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Return to Homepage
          </button>
          <Link 
            to="/opportunities"
            className="px-12 py-5 border border-luxury-gold text-luxury-gold text-sm font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-navy transition-all duration-500"
          >
            View Opportunities
          </Link>
        </div>

        <div className="mt-12 pt-12 border-t border-white/5 flex items-center justify-center gap-3 text-white/20 text-[10px] uppercase tracking-[0.2em]">
          <ShieldCheck size={16} />
          <span>Confidentiality Guaranteed</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
