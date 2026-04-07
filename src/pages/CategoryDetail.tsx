import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, ShieldCheck, Globe } from 'lucide-react';
import { properties } from '../data/properties';
import { Property } from '../types';
import PropertyCard from '../components/PropertyCard';
import Breadcrumbs from '../components/Breadcrumbs';

interface CategoryInfo {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
}

const categoryData: Record<string, CategoryInfo> = {
  villas: {
    title: 'Luxury Villas Europe Investment',
    subtitle: 'Global Collection',
    description: 'Exclusive off market real estate Europe: beachfront and hillside estates curated for luxury villas Europe investment.',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop'
  },
  hotels: {
    title: 'Hotel Investment Europe ROI',
    subtitle: 'Hospitality Assets',
    description: 'High-yield hotel investment Europe ROI assets and boutique retreats in strategic global locations.',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop'
  },
  apartments: {
    title: 'Apartments & Projects',
    subtitle: 'Urban Investments',
    description: 'Prime urban residences and high-potential redevelopment opportunities in the world\'s most sought-after metropolitan hubs.',
    heroImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1920&auto=format&fit=crop'
  }
};

interface CategoryDetailProps {
  categoryOverride?: string;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ categoryOverride }) => {
  const { category: routeCategory } = useParams<{ category: string }>();
  const location = useLocation();
  
  // Determine category from prop, route param, or path
  const category = categoryOverride || routeCategory || location.pathname.substring(1);
  
  const [info, setInfo] = useState<CategoryInfo | null>(null);
  const [categoryProperties, setCategoryProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filterCountry, setFilterCountry] = useState<string>('All');
  const [filterBudget, setFilterBudget] = useState<string>('All');

  useEffect(() => {
    if (category && categoryData[category]) {
      setInfo(categoryData[category]);
      
      let initialProperties: Property[] = [];
      if (category === 'villas') {
        initialProperties = properties.filter(p => p.type === 'Villa');
      } else if (category === 'hotels') {
        initialProperties = properties.filter(p => p.type === 'Hotel');
      } else if (category === 'apartments') {
        initialProperties = properties.filter(p => p.type === 'Apartment' || p.type === 'Redevelopment');
      }
      
      setCategoryProperties(initialProperties);
      setFilteredProperties(initialProperties);
    }
    window.scrollTo(0, 0);
  }, [category]);

  useEffect(() => {
    let result = categoryProperties;

    if (filterCountry !== 'All') {
      result = result.filter(p => p.country === filterCountry);
    }

    if (filterBudget !== 'All') {
      result = result.filter(p => {
        const priceNum = parseInt(p.price.replace(/[^0-9]/g, ''));
        if (filterBudget === 'Under 1M') return priceNum < 1000000;
        if (filterBudget === '1M - 5M') return priceNum >= 1000000 && priceNum <= 5000000;
        if (filterBudget === 'Over 5M') return priceNum > 5000000;
        return true;
      });
    }

    setFilteredProperties(result);
  }, [filterCountry, filterBudget, categoryProperties]);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-navy">
        <div className="text-center">
          <h2 className="text-white font-serif text-3xl mb-4 italic gold-text-gradient">Category Not Found</h2>
          <Link to="/opportunities" className="text-luxury-gold text-sm font-bold uppercase tracking-widest flex items-center gap-2 justify-center">
            <ArrowLeft size={16} /> Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  const countries = Array.from(new Set(categoryProperties.map(p => p.country)));

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={info.heroImage}
            alt={info.title}
            className="w-full h-full object-cover opacity-60"
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
            <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              {info.subtitle}
            </span>
            <h1 className="text-4xl sm:text-7xl md:text-9xl font-serif text-white mb-8 leading-[1.3] sm:leading-tight tracking-tight">
              {info.title}
            </h1>
            <p className="text-white/60 text-sm sm:text-xl max-w-2xl mx-auto mb-12 font-sans leading-[1.6]">
              {info.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Highlights */}
      <section className="py-12 px-8 bg-luxury-navy border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-luxury-gold">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">Target ROI</p>
              <p className="text-white font-serif text-xl">Up to 9.5%</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-luxury-gold">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">Confidentiality</p>
              <p className="text-white font-serif text-xl">100% Private Access</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-luxury-gold">
              <Globe size={24} />
            </div>
            <div>
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">Global Reach</p>
              <p className="text-white font-serif text-xl">Multiple Jurisdictions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-24 px-8 bg-luxury-navy">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-luxury-gold text-xs font-bold uppercase tracking-widest mb-4 block">Global Inventory</span>
              <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                Featured <span className="italic gold-text-gradient">Assets</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <select 
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="px-6 py-3 glass text-white text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all outline-none border-none appearance-none cursor-pointer"
              >
                <option value="All">All Countries</option>
                {countries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select 
                value={filterBudget}
                onChange={(e) => setFilterBudget(e.target.value)}
                className="px-6 py-3 glass text-white text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all outline-none border-none appearance-none cursor-pointer"
              >
                <option value="All">All Budgets</option>
                <option value="Under 1M">Under €1M</option>
                <option value="1M - 5M">€1M - €5M</option>
                <option value="Over 5M">Over €5M</option>
              </select>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="glass p-24 text-center rounded-sm">
              <p className="text-white/40 font-serif text-2xl italic mb-8">No properties match your current filters for this category.</p>
              <button 
                onClick={() => { setFilterCountry('All'); setFilterBudget('All'); }}
                className="px-10 py-5 gold-gradient text-luxury-navy text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform inline-block"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-luxury-navy/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
            Seeking a Specific <span className="gold-text-gradient italic">Investment</span>?
          </h2>
          <p className="text-white/60 text-lg mb-12">
            Our advisors can source bespoke off-market assets tailored to your exact requirements and investment goals.
          </p>
          <Link to="/advisor-contact" className="px-12 py-5 gold-gradient text-luxury-navy text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform inline-block">
            Speak to an Advisor
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CategoryDetail;
