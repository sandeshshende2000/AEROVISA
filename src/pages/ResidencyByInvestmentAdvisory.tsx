import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { 
  Globe, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronLeft,
  Briefcase,
  UserCheck
} from 'lucide-react';

interface Program {
  id: string;
  country: string;
  type: 'Residency by Investment' | 'Residency / Start-Up';
  shortDesc: string;
  overview: string;
  investment: string;
  benefits: string[];
  eligibility: string[];
  timeline: string;
  image: string;
}

const programs: Program[] = [
  {
    id: 'portugal',
    country: 'Portugal',
    type: 'Residency by Investment',
    shortDesc: 'One of the most popular residency-by-investment programs in Europe.',
    overview: 'The Portugal Residency by Investment program is a residency-by-investment program for non-EU nationals. It offers a pathway to permanent residency and citizenship after five years.',
    investment: '€500,000+ in qualifying investment funds (Real estate no longer qualifies for most applicants).',
    benefits: [
      'Visa-free travel within the Schengen Area',
      'Right to live, work, and study in Portugal',
      'Pathway to EU citizenship after 5 years',
      'Minimal stay requirement (7 days per year)'
    ],
    eligibility: [
      'Non-EU/EEA/Swiss national',
      'Clean criminal record',
      'Proof of funds for investment',
      'Valid health insurance'
    ],
    timeline: '12–18 months for initial residency permit.',
    image: 'https://images.unsplash.com/photo-1555854816-802f188095e4?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'greece',
    country: 'Greece',
    type: 'Residency by Investment',
    shortDesc: 'Fast-track residency with a relatively low investment threshold.',
    overview: 'The Greece Residency by Investment program offers immediate five-year residency to investors and their families, with no stay requirement to maintain the status.',
    investment: '€250,000 – €800,000 in real estate (varies by region).',
    benefits: [
      'Immediate 5-year residency permit',
      'Visa-free travel to the Schengen Area',
      'No stay requirement',
      'Includes spouse, children under 21, and parents'
    ],
    eligibility: [
      'Non-EU national',
      'Investment in Greek real estate',
      'Full health insurance coverage',
      'No criminal record'
    ],
    timeline: '4–6 months for permit issuance.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200'
  }
];

const ResidencyByInvestmentAdvisory = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const residencyByInvestmentPrograms = programs.filter(p => p.type === 'Residency by Investment');
  const residencyPrograms = programs.filter(p => p.type === 'Residency / Start-Up');

  return (
    <div className="bg-navy-900 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {selectedProgram ? (
            <BackButton 
              label="Back to Programs" 
              onClick={() => setSelectedProgram(null)} 
            />
          ) : (
            <BackButton label="Back to Home" fallbackPath="/" />
          )}
        </div>
        <AnimatePresence mode="wait">
          {!selectedProgram ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-16">
                <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-sm mb-4 block">Investment Migration</span>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">Global Residency & Citizenship</h1>
                <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
                <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Secure your future with residency and citizenship by investment. We connect you with verified immigration consultants to navigate the world's most prestigious programs.
                </p>
              </div>

              {/* Section 1: Residency by Investment */}
              <div className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                  <Globe className="text-gold-500" size={32} />
                  <h2 className="text-3xl font-display font-bold text-white">Residency by Investment</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {residencyByInvestmentPrograms.map((program) => (
                    <motion.div
                      key={program.id}
                      whileHover={{ y: -10 }}
                      onClick={() => setSelectedProgram(program)}
                      className="bg-navy-800 rounded-sm overflow-hidden border border-gold-500/10 group cursor-pointer"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={program.image} 
                          alt={program.country} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-display font-bold text-white mb-2">{program.country}</h3>
                        <p className="text-gold-500 text-[10px] uppercase tracking-widest font-bold mb-3">{program.type}</p>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{program.shortDesc}</p>
                        <div className="mt-4 flex items-center text-gold-500 text-xs font-bold uppercase tracking-widest gap-2">
                          View Details <ArrowRight size={14} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Section 2: Residency / Start-Up */}
              <div className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                  <Briefcase className="text-gold-500" size={32} />
                  <h2 className="text-3xl font-display font-bold text-white">Residency / Start-Up Visa Programs</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {residencyPrograms.map((program) => (
                    <motion.div
                      key={program.id}
                      whileHover={{ y: -10 }}
                      onClick={() => setSelectedProgram(program)}
                      className="bg-navy-800 rounded-sm overflow-hidden border border-gold-500/10 group cursor-pointer"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={program.image} 
                          alt={program.country} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-display font-bold text-white mb-2">{program.country}</h3>
                        <p className="text-gold-500 text-[10px] uppercase tracking-widest font-bold mb-3">{program.type}</p>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{program.shortDesc}</p>
                        <div className="mt-4 flex items-center text-gold-500 text-xs font-bold uppercase tracking-widest gap-2">
                          View Details <ArrowRight size={14} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div>
                  <div className="mb-8">
                    <span className="text-gold-500 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-2 block">{selectedProgram.type}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">{selectedProgram.country}</h2>
                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">{selectedProgram.overview}</p>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <DollarSign className="text-gold-500" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">Investment Options</h4>
                        <p className="text-slate-300">{selectedProgram.investment}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="text-gold-500" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">Timeline</h4>
                        <p className="text-slate-300">{selectedProgram.timeline}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/consultation')}
                    className="mt-12 bg-gold-500 hover:bg-gold-600 text-navy-900 px-10 py-5 rounded-sm font-bold transition-all uppercase tracking-widest flex items-center gap-3"
                  >
                    Book a Free Consultation
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="rounded-sm overflow-hidden border border-gold-500/20 aspect-video">
                    <img 
                      src={selectedProgram.image} 
                      alt={selectedProgram.country} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-navy-800 p-6 border border-gold-500/10 rounded-sm">
                      <h4 className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                        <CheckCircle2 size={14} /> Key Benefits
                      </h4>
                      <ul className="space-y-3">
                        {selectedProgram.benefits.map((benefit, i) => (
                          <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                            <span className="text-gold-500 mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-navy-800 p-6 border border-gold-500/10 rounded-sm">
                      <h4 className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                        <UserCheck size={14} /> Eligibility
                      </h4>
                      <ul className="space-y-3">
                        {selectedProgram.eligibility.map((item, i) => (
                          <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                            <span className="text-gold-500 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResidencyByInvestmentAdvisory;
