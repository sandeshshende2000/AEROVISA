import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, TrendingUp, ShieldCheck, Globe } from 'lucide-react';
import { countries, properties } from '../data/properties';
import { Country, Property } from '../types';
import PropertyCard from '../components/PropertyCard';
import Breadcrumbs from '../components/Breadcrumbs';

interface CountryDetailProps {
  slugOverride?: string;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ slugOverride }) => {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const slug = slugOverride || routeSlug;
  const [country, setCountry] = useState<Country | null>(null);
  const [countryProperties, setCountryProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filterType, setFilterType] = useState<string>('All');
  const [filterBudget, setFilterBudget] = useState<string>('All');

  useEffect(() => {
    const foundCountry = countries.find(c => c.slug === slug);
    if (foundCountry) {
      setCountry(foundCountry);
      const initialProperties = properties.filter(p => p.country === foundCountry.name);
      setCountryProperties(initialProperties);
      setFilteredProperties(initialProperties);
    }
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let result = countryProperties;

    if (filterType !== 'All') {
      result = result.filter(p => p.type === filterType);
    }

    if (filterBudget !== 'All') {
      // Simple budget filtering logic
      result = result.filter(p => {
        const priceNum = parseInt(p.price.replace(/[^0-9]/g, ''));
        if (filterBudget === 'Under 1M') return priceNum < 1000000;
        if (filterBudget === '1M - 5M') return priceNum >= 1000000 && priceNum <= 5000000;
        if (filterBudget === 'Over 5M') return priceNum > 5000000;
        return true;
      });
    }

    setFilteredProperties(result);
  }, [filterType, filterBudget, countryProperties]);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-navy">
        <div className="text-center">
          <h2 className="text-white font-serif text-3xl mb-4 italic gold-text-gradient">Country Not Found</h2>
          <Link to="/opportunities" className="text-luxury-gold text-sm font-bold uppercase tracking-widest flex items-center gap-2 justify-center">
            <ArrowLeft size={16} /> Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={country.heroImage}
            alt={country.name}
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
            <h1 className="text-4xl sm:text-7xl md:text-9xl font-serif text-white mb-8 leading-[1.3] sm:leading-tight tracking-tight">
              {country.name}
            </h1>
            <p className="text-white/60 text-sm sm:text-xl max-w-2xl mx-auto mb-12 font-sans leading-[1.6]">
              {country.description}
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
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">Average ROI</p>
              <p className="text-white font-serif text-xl">6.5% - 9.2%</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-luxury-gold">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">Residency Status</p>
              <p className="text-white font-serif text-xl">Golden Visa Eligible</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-luxury-gold">
              <Globe size={24} />
            </div>
            <div>
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">Market Status</p>
              <p className="text-white font-serif text-xl">High Demand</p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-24 px-8 bg-luxury-navy">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-luxury-gold text-xs font-bold uppercase tracking-widest mb-4 block">Off Market Real Estate Europe Assets</span>
              <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                Investment <span className="italic gold-text-gradient">Portfolio</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-6 py-3 glass text-white text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all outline-none border-none appearance-none cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Villa">Villas</option>
                <option value="Hotel">Hotels</option>
                <option value="Apartment">Apartments</option>
                <option value="Redevelopment">Redevelopment</option>
                <option value="Commercial">Commercial</option>
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
              <p className="text-white/40 font-serif text-2xl italic mb-8">No properties match your current filters for {country.name}.</p>
              <button 
                onClick={() => { setFilterType('All'); setFilterBudget('All'); }}
                className="px-10 py-5 gold-gradient text-luxury-navy text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform inline-block"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* List Property CTA */}
      <section className="py-24 px-8 bg-luxury-navy/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">
            Luxury Villas Europe <span className="gold-text-gradient italic">Investment in {country.name}</span>
          </h2>
          <p className="text-white/60 text-lg mb-12">
            List your asset with AeroVisa Global and gain direct access to our exclusive network of off market real estate Europe investors.
          </p>
          <Link to="/list-property" className="px-12 py-5 border border-luxury-gold text-luxury-gold text-sm font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-navy transition-all duration-500 inline-block">
            List Your Property Globally
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CountryDetail;
