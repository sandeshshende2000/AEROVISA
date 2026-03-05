import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-navy-900 pt-32 pb-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 font-bold mb-12 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">{title}</h1>
          <div className="w-24 h-1 bg-gold-500"></div>
        </header>

        <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed space-y-8">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default LegalPageLayout;
