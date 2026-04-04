import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <AnimatePresence>
      {!isHome && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          onClick={handleBack}
          className="fixed top-0 left-0 z-[60] flex items-center gap-2 text-luxury-gold hover:text-luxury-gold-light transition-all duration-300 group px-6 h-20 sm:h-24 pt-[env(safe-area-inset-top)]"
        >
          <div className="w-10 h-10 glass rounded-full flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="font-serif text-sm tracking-widest uppercase group-hover:underline decoration-luxury-gold/30 underline-offset-4 hidden xs:block">
            Back
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackButton;
