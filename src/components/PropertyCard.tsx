import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';
import { MapPin, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const fallbackImages: Record<string, string> = {
    Villa: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
    Hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    Apartment: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop',
    Redevelopment: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    Commercial: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
  };

  const propertyImage = property.image || fallbackImages[property.type] || fallbackImages.Villa;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative glass rounded-sm overflow-hidden flex flex-col h-full border border-white/5 hover:border-luxury-gold/30 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={propertyImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {property.isOffMarket && (
            <span className="bg-luxury-gold text-luxury-navy text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-lg">
              Off-Market
            </span>
          )}
          {property.residency && (
            <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border border-white/20 shadow-lg">
              Residency Eligible
            </span>
          )}
          {property.roi && (
            <span className="bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border border-emerald-500/30 shadow-lg">
              High ROI: {property.roi}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-luxury-gold text-[10px] font-bold uppercase tracking-widest mb-3">
          <MapPin size={12} />
          <span>{property.location}</span>
        </div>
        
        <h3 className="text-white font-serif text-xl mb-2 group-hover:text-luxury-gold transition-colors duration-300">
          {property.title}
        </h3>
        
        <p className="text-white/40 text-xs mb-6 font-sans uppercase tracking-wider">
          {property.type} • {property.country}
        </p>

        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
          <div>
            <p className="text-white/20 text-[9px] uppercase tracking-widest mb-1">Investment Value</p>
            <p className="text-white font-serif text-lg">{property.price}</p>
          </div>
          <Link 
            to={`/request-details?property=${encodeURIComponent(property.title)}&country=${encodeURIComponent(property.country)}`}
            className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-navy transition-all duration-500 group/btn"
          >
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
