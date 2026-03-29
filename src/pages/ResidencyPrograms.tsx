import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Globe, MapPin, ShieldCheck, DollarSign } from 'lucide-react';
import { programs } from '../data/programs';

const ResidencyPrograms = () => {
  return (
    <div className="bg-navy-900 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors font-bold uppercase tracking-widest text-sm group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-gold-500 font-bold uppercase tracking-[0.4em] text-sm mb-4 block">Investment Migration</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Residency by Investment Programs</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Secure your global mobility and future with the world's most prestigious residency programs. 
            Strategic investments for long-term freedom and security.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {programs.map((program, idx) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-navy-800 border border-gold-500/20 rounded-sm overflow-hidden group flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.country} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors duration-500"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-gold-500 text-navy-900 px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
                    {program.country}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-display font-bold text-white mb-3">
                  {program.country} Residency by Investment
                </h2>
                <p className="text-gold-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                  {program.type}
                </p>
                <p className="text-slate-300 leading-relaxed mb-8 flex-grow">
                  {program.shortDesc}
                </p>

                {/* Features/Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <DollarSign size={16} className="text-gold-500" />
                    <span>{program.startingPrice.split('/')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Globe size={16} className="text-gold-500" />
                    <span>Schengen Access</span>
                  </div>
                </div>

                <Link 
                  to={`/program/${program.slug}`}
                  className="w-full bg-transparent border border-gold-500/50 hover:bg-gold-500 hover:text-navy-900 text-gold-500 py-4 rounded-sm font-bold transition-all uppercase tracking-widest text-center flex items-center justify-center gap-2 group/btn"
                >
                  Explore Program
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-24 pt-20 border-t border-gold-500/10 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
            <div className="flex flex-col items-center gap-3">
              <ShieldCheck size={32} className="text-gold-500" />
              <span className="text-white text-xs font-bold uppercase tracking-widest">Verified Partners</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Globe size={32} className="text-gold-500" />
              <span className="text-white text-xs font-bold uppercase tracking-widest">Global Reach</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <DollarSign size={32} className="text-gold-500" />
              <span className="text-white text-xs font-bold uppercase tracking-widest">Secure Investment</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <MapPin size={32} className="text-gold-500" />
              <span className="text-white text-xs font-bold uppercase tracking-widest">Strategic Locations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidencyPrograms;
