import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, MapPin, TrendingUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { countries } from '../data/properties';
import Breadcrumbs from '../components/Breadcrumbs';

const Opportunities: React.FC = () => {
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
            <span className="text-luxury-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Global Portfolio</span>
            <h1 className="text-3xl sm:text-7xl font-serif text-white mb-8 leading-[1.3] sm:leading-tight">
              Investment <br />
              <span className="gold-text-gradient italic">Opportunities</span>
            </h1>
            <p className="text-white/40 text-sm sm:text-lg max-w-2xl mx-auto font-sans leading-[1.6]">
              Curated investment-grade properties across Europe for HNI investors, family offices, and global buyers.
            </p>
          </motion.div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {countries.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[600px] overflow-hidden rounded-sm"
            >
              <Link to={`/country/${country.slug}`}>
                <img
                  src={country.heroImage}
                  alt={country.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className="flex items-center gap-2 text-luxury-gold text-xs font-bold uppercase tracking-widest mb-4">
                    <MapPin size={14} />
                    <span>Europe</span>
                  </div>
                  <h3 className="text-white font-serif text-5xl mb-6 group-hover:text-luxury-gold transition-colors">{country.name}</h3>
                  <p className="text-white/60 text-lg mb-8 max-w-md font-sans leading-relaxed">
                    {country.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-10">
                    {country.categories.map(cat => (
                      <span key={cat} className="px-4 py-2 glass text-white/80 text-[10px] uppercase tracking-widest rounded-full border border-white/10">
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-luxury-gold text-sm font-bold uppercase tracking-widest group-hover:gap-5 transition-all duration-500">
                    Explore Opportunities <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-24">
          <div className="text-center">
            <h4 className="text-white font-serif text-xl mb-4 tracking-wide">Golden Visa Eligibility</h4>
            <p className="text-white/40 text-sm leading-relaxed">
              Many of our properties in Greece and Portugal qualify for residency-by-investment programs.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-white font-serif text-xl mb-4 tracking-wide">Off-Market Access</h4>
            <p className="text-white/40 text-sm leading-relaxed">
              Access assets that are never listed publicly, ensuring exclusivity and better negotiation power.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-white font-serif text-xl mb-4 tracking-wide">High ROI Assets</h4>
            <p className="text-white/40 text-sm leading-relaxed">
              We focus on properties with strong rental yields and significant capital appreciation potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
