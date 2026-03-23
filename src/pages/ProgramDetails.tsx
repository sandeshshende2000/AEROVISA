
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  Calendar, 
  Globe, 
  CheckCircle2 
} from 'lucide-react';
import BackButton from '../components/BackButton';
import { programs } from '../data/programs';

const ProgramDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const program = programs.find(p => p.slug === slug);

  if (!program) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-display font-bold mb-4">Program Not Found</h1>
        <p className="text-slate-400 mb-8">The residency or citizenship program you are looking for does not exist.</p>
        <Link to="/" className="bg-gold-500 text-navy-950 px-8 py-3 font-bold uppercase tracking-widest">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleBookConsultation = () => {
    navigate('/golden-visa-advisory');
    setTimeout(() => {
      const element = document.getElementById('consultation-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="pt-20 bg-navy-950 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="mb-12">
          <BackButton 
            label="Back to Programs"
          />
        </div>

        <div className="bg-navy-800 border border-slate-800 overflow-hidden">
          <div className="relative h-[60vh]">
            <img 
              src={program.image} 
              alt={program.country}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-800"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">{program.country}</h2>
              <p className="text-gold-500 text-xl font-display italic">{program.type} Program</p>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                <div className="bg-navy-900/80 backdrop-blur-md p-6 border border-slate-700">
                  <DollarSign className="w-6 h-6 text-gold-500 mx-auto mb-3" />
                  <p className="text-white font-bold">{program.startingPrice}</p>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Investment</p>
                </div>
                <div className="bg-navy-900/80 backdrop-blur-md p-6 border border-slate-700">
                  <Calendar className="w-6 h-6 text-gold-500 mx-auto mb-3" />
                  <p className="text-white font-bold">{program.timeline}</p>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Timeline</p>
                </div>
                <div className="bg-navy-900/80 backdrop-blur-md p-6 border border-slate-700">
                  <Globe className="w-6 h-6 text-gold-500 mx-auto mb-3" />
                  <p className="text-white font-bold">Yes</p>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Family Inclusion</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                    <span className="w-8 h-[1px] bg-gold-50 mr-4"></span> Program Overview
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {program.overview}
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                    <span className="w-8 h-[1px] bg-gold-50 mr-4"></span> Investment Options
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {program.investment}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {program.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-3 bg-navy-900 p-4 border border-slate-800">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-1" />
                        <span className="text-slate-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                    <span className="w-8 h-[1px] bg-gold-50 mr-4"></span> Eligibility Criteria
                  </h3>
                  <ul className="space-y-4">
                    {program.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-center text-slate-400">
                        <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-4"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="space-y-8">
                <div className="bg-navy-900 p-8 border border-gold-500/20">
                  <h4 className="text-xl font-display font-bold text-white mb-6">Ready to Begin?</h4>
                  <p className="text-slate-400 text-sm mb-8">
                    Our expert advisors are ready to guide you through every step of your global residency or citizenship journey.
                  </p>
                  <button 
                    onClick={handleBookConsultation}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 py-4 text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    Book a Free Consultation
                  </button>
                </div>

                <div className="relative aspect-video group overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1513735539099-cf6e5d559d82?auto=format&fit=crop&q=80&w=1200" 
                    alt="European Architecture"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gold-500/5 mix-blend-soft-light"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgramDetailsPage;
