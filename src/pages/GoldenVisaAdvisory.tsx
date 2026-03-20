import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  type: 'Golden Visa / Citizenship' | 'Residency / Start-Up';
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
    type: 'Golden Visa / Citizenship',
    shortDesc: 'One of the most popular residency-by-investment programs in Europe.',
    overview: 'The Portugal Golden Visa program is a residency-by-investment program for non-EU nationals. It offers a pathway to permanent residency and citizenship after five years.',
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
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'greece',
    country: 'Greece',
    type: 'Golden Visa / Citizenship',
    shortDesc: 'Fast-track residency with a relatively low investment threshold.',
    overview: 'The Greece Golden Visa offers immediate five-year residency to investors and their families, with no stay requirement to maintain the status.',
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
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'malta',
    country: 'Malta',
    type: 'Golden Visa / Citizenship',
    shortDesc: 'A prestigious EU program offering both residency and citizenship paths.',
    overview: 'Malta offers the Permanent Residence Programme (MPRP) and the Exceptional Services by Direct Investment (ESDI) for citizenship.',
    investment: '€150,000+ (Residency) or €600,000+ (Citizenship path).',
    benefits: [
      'Right to live and work in Malta',
      'Visa-free travel in Schengen (Residency) or 180+ countries (Citizenship)',
      'Stable political and economic environment',
      'High standard of living and healthcare'
    ],
    eligibility: [
      'Strict due diligence process',
      'Proof of significant assets',
      'Contribution to the national development fund',
      'Property lease or purchase'
    ],
    timeline: '6–8 months (Residency) or 12–36 months (Citizenship).',
    image: 'https://images.unsplash.com/photo-1527016021513-b09758b777bd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hungary',
    country: 'Hungary',
    type: 'Golden Visa / Citizenship',
    shortDesc: 'New Guest Investor Program offering long-term EU residency.',
    overview: 'Hungary recently relaunched its residency-by-investment program, providing a 10-year residency permit for investors.',
    investment: '€250,000 (Real Estate Fund) or €500,000 (Residential Property).',
    benefits: [
      '10-year residency permit (renewable)',
      'Visa-free travel in the Schengen Area',
      'Strategic location in Central Europe',
      'Business-friendly environment'
    ],
    eligibility: [
      'Non-EU national',
      'Investment in qualifying funds or property',
      'Clean criminal record',
      'Proof of legal source of funds'
    ],
    timeline: '3–5 months.',
    image: 'https://images.unsplash.com/photo-1517713982677-4b66332f98de?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'antigua',
    country: 'Antigua & Barbuda',
    type: 'Golden Visa / Citizenship',
    shortDesc: 'Fast-track citizenship with excellent global mobility.',
    overview: 'The Antigua & Barbuda Citizenship by Investment Program is one of the most cost-effective options for families.',
    investment: '$100,000+ (National Development Fund contribution).',
    benefits: [
      'Citizenship for life',
      'Visa-free travel to 150+ countries including UK & Schengen',
      'No global income tax for non-residents',
      'Fast processing time'
    ],
    eligibility: [
      'Main applicant must be 18+',
      'Pass stringent due diligence',
      'Make a qualifying investment',
      '5-day stay requirement over 5 years'
    ],
    timeline: '3–4 months.',
    image: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'dominica',
    country: 'Dominica',
    type: 'Golden Visa / Citizenship',
    shortDesc: 'Known as the "Nature Isle," offering a robust citizenship program.',
    overview: 'Dominica offers citizenship through a contribution to the government or investment in approved real estate.',
    investment: '$100,000+ (Economic Diversification Fund).',
    benefits: [
      'Visa-free travel to 140+ countries',
      'No physical residency requirement',
      'Right to live and work in Dominica',
      'Confidential application process'
    ],
    eligibility: [
      'Outstanding character and health',
      'No criminal record',
      'Qualifying investment',
      'Interview requirement'
    ],
    timeline: '3–6 months.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'grenada',
    country: 'Grenada',
    type: 'Golden Visa / Citizenship',
    shortDesc: 'The only Caribbean program with E-2 Visa treaty with the USA.',
    overview: 'Grenada citizenship offers unique access to the USA through the E-2 Investor Visa treaty.',
    investment: '$150,000+ (National Transformation Fund).',
    benefits: [
      'Visa-free travel to 140+ countries including China',
      'Eligibility for USA E-2 Investor Visa',
      'No residency requirement',
      'Includes siblings and grandparents'
    ],
    eligibility: [
      'High net worth individuals',
      'Clean background check',
      'Investment in NTF or Real Estate',
      'Source of funds verification'
    ],
    timeline: '4–6 months.',
    image: 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'canada',
    country: 'Canada',
    type: 'Residency / Start-Up',
    shortDesc: 'Start-Up Visa program for innovative entrepreneurs.',
    overview: 'The Canada Start-Up Visa Program targets immigrant entrepreneurs with the skills to build businesses in Canada.',
    investment: 'Support from a designated organization (Angel group, VC, or Incubator).',
    benefits: [
      'Direct pathway to Permanent Residency',
      'Access to North American markets',
      'Support from top-tier Canadian investors',
      'High quality of life and education'
    ],
    eligibility: [
      'Qualifying business',
      'Letter of Support from designated entity',
      'Language proficiency (English/French)',
      'Sufficient settlement funds'
    ],
    timeline: '12–31 months.',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800'
  }
];

const GoldenVisaAdvisory = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/xkoqnwbq", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      alert('There was an error submitting your request. Please try again.');
    }
  };

  const goldenVisaPrograms = programs.filter(p => p.type === 'Golden Visa / Citizenship');
  const residencyPrograms = programs.filter(p => p.type === 'Residency / Start-Up');

  return (
    <div className="bg-navy-900 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton label="Back to Home" fallbackPath="/" />
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
                <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Investment Migration</span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Global Residency & Citizenship</h1>
                <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                  Secure your future with residency and citizenship by investment. We connect you with verified immigration consultants to navigate the world's most prestigious programs.
                </p>
              </div>

              {/* Section 1: Golden Visa / Citizenship */}
              <div className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                  <Globe className="text-gold-500" size={32} />
                  <h2 className="text-3xl font-display font-bold text-white">Golden Visa / Citizenship by Investment</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {goldenVisaPrograms.map((program) => (
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
              <button 
                onClick={() => setSelectedProgram(null)}
                className="flex items-center gap-2 text-gold-500 font-bold uppercase tracking-widest text-sm mb-10 hover:gap-3 transition-all"
              >
                <ChevronLeft size={20} /> Back to Programs
              </button>

              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div>
                  <div className="mb-8">
                    <span className="text-gold-500 font-bold uppercase tracking-[0.2em] text-xs mb-2 block">{selectedProgram.type}</span>
                    <h2 className="text-5xl font-display font-bold text-white mb-6">{selectedProgram.country}</h2>
                    <p className="text-xl text-slate-300 leading-relaxed">{selectedProgram.overview}</p>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <DollarSign className="text-gold-500" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">Investment Options</h4>
                        <p className="text-slate-400">{selectedProgram.investment}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="text-gold-500" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">Timeline</h4>
                        <p className="text-slate-400">{selectedProgram.timeline}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={scrollToForm}
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
                          <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
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
                          <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
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

        {/* Consultation Form Section */}
        <div id="consultation-form" ref={formRef} className="mt-20 scroll-mt-32">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-6">Strategic Global Mobility</h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  A Golden Visa provides more than just residency; it offers global access, security, and a plan for your family's future. Our advisory platform ensures you work with the best experts in the field.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: <Globe size={20} />, title: "Global Access", desc: "Visa-free travel across major regions." },
                    { icon: <ShieldCheck size={20} />, title: "Security", desc: "A safe haven for your family and assets." },
                    { icon: <DollarSign size={20} />, title: "Investment", desc: "Strategic real estate or fund investments." },
                    { icon: <FileText size={20} />, title: "Compliance", desc: "Full legal and regulatory adherence." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-navy-800 p-6 border border-gold-500/10 rounded-sm">
                      <div className="text-gold-500 mb-3">{item.icon}</div>
                      <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-navy-800 p-8 border border-gold-500/10 rounded-sm">
                <h3 className="text-white font-bold mb-4">Why Choose AeroVisa?</h3>
                <ul className="space-y-4">
                  {[
                    "Direct access to verified immigration consultants",
                    "Confidential and discrete advisory services",
                    "Comprehensive program comparison and analysis",
                    "End-to-end coordination for high-net-worth clients"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 size={18} className="text-gold-500" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-navy-800 p-8 md:p-12 border border-gold-500/20 rounded-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <Globe className="text-gold-500" size={32} />
                <h2 className="text-3xl font-display font-bold text-white">Consultation Request</h2>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gold-500/10 border border-gold-500/50 p-8 text-center rounded-sm"
                >
                  <CheckCircle2 className="text-gold-500 mx-auto mb-4" size={48} />
                  <h3 className="text-white text-xl font-bold mb-2">Request Received</h3>
                  <p className="text-slate-300">Thank you for your consultation request. Our residency advisors will contact you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-gold-500 font-bold text-sm uppercase tracking-widest hover:underline"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              ) : (
                <form 
                  action="https://formspree.io/f/xkoqnwbq" 
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                    <input 
                      type="text" name="name" required
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email</label>
                    <input 
                      type="email" name="email" required
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Phone</label>
                    <input 
                      type="tel" name="phone"
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Nationality</label>
                    <input 
                      type="text" name="nationality"
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Investment Budget</label>
                    <input 
                      type="text" name="budget" placeholder="e.g. $500,000+"
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Preferred Country</label>
                    <input 
                      key={selectedProgram?.id || 'none'}
                      type="text" name="country"
                      defaultValue={selectedProgram?.country || ''}
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Timeline</label>
                    <input 
                      type="text" name="timeline" placeholder="e.g. 3-6 months"
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Message</label>
                    <textarea 
                      name="message"
                      rows={4}
                      className="w-full bg-navy-900 border border-slate-700 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="md:col-span-2 bg-gold-500 hover:bg-gold-600 text-navy-900 py-4 rounded-sm font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                  >
                    Request Free Consultation
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldenVisaAdvisory;
