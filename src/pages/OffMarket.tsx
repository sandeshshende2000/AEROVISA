
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, TrendingUp, ShieldCheck } from 'lucide-react';
import BackButton from '../components/BackButton';

const offMarketProperties = [
  {
    id: 'river-villa',
    title: 'Private River Villa',
    location: 'Portugal',
    description: 'Luxury villa with river view, high ROI potential',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    roi: '6-8% Annual',
    eligibility: 'Golden Visa Eligible'
  },
  {
    id: 'riverside-hotel',
    title: 'Lisbon Riverside Hotel Investment',
    location: 'Lisbon, Portugal',
    description: 'Premium hospitality investment in Lisbon',
    image: 'https://images.unsplash.com/photo-1555854816-802f188095e4?auto=format&fit=crop&q=80&w=1200',
    roi: '7-9% Annual',
    eligibility: 'Investment Fund Eligible'
  },
  {
    id: 'coastal-apartment',
    title: 'Coastal Luxury Apartment',
    location: 'Greece',
    description: 'High-demand coastal property with residency eligibility',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
    roi: '5-7% Annual',
    eligibility: 'Greece Golden Visa Eligible'
  }
];

const OffMarketPage = () => {
  return (
    <div className="bg-navy-900 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <BackButton label="Back to Home" fallbackPath="/" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-sm mb-4 block">
            Exclusive Opportunities
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Access Rare & <br className="sm:hidden" /> Off-Market Opportunities
          </h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Exclusive, high-value real estate opportunities for global investors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {offMarketProperties.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-navy-800 border border-gold-500/10 rounded-sm overflow-hidden group hover:border-gold-500/30 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/10 transition-colors"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-gold-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                  <MapPin size={12} />
                  {property.location}
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  {property.title}
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  {property.description}
                </p>
                <Link
                  to={`/off-market/${property.id}`}
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-xs transition-all w-full justify-center"
                >
                  View Details
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffMarketPage;
