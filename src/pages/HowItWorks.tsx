import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import BackButton from '../components/BackButton';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "Submit your inquiry through our confidential platform. Our advisors will review your requirements for residency advisory or investment opportunities.",
      details: ["Confidential data handling", "Expert initial assessment", "Clear communication channels"]
    },
    {
      number: "02",
      title: "Partner Matching",
      description: "We identify and connect you with the most suitable verified partners from our global network of legal and investment partners.",
      details: ["Vetted partner network", "Direct expert connections", "Tailored matching process"]
    },
    {
      number: "03",
      title: "Solution Design",
      description: "Our partners work with you to design a comprehensive residency by investment strategy.",
      details: ["Strategic investment advice", "Detailed proposal review", "Risk assessment & planning"]
    },
    {
      number: "04",
      title: "Execution & Support",
      description: "Once a solution is agreed upon, our partners handle the execution while we provide ongoing coordination support.",
      details: ["Seamless coordination", "Documentation assistance", "Post-service support"]
    }
  ];

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
          <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Our Process</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">How It Works</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Our streamlined four-step process ensures that your global mobility needs are met with precision and professionalism.
          </p>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1 text-center md:text-left">
                <span className="text-6xl font-display font-bold text-gold-500/20 mb-4 block">{step.number}</span>
                <h2 className="text-3xl font-display font-bold text-white mb-6">{step.title}</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">{step.description}</p>
                <ul className="space-y-4 inline-block text-left">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 size={18} className="text-gold-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-navy-800 p-1 border border-gold-500/10 rounded-sm">
                  <div className="bg-navy-900 p-12 text-center border border-gold-500/5">
                    <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-gold-500 text-2xl font-bold">{step.number}</span>
                    </div>
                    <p className="text-slate-500 italic">Step {idx + 1} of the AeroVisa Coordination Process</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 bg-gold-500 p-12 rounded-sm text-center"
        >
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">Ready to get started?</h2>
          <p className="text-navy-900/80 mb-8 max-w-2xl mx-auto font-medium">
            Contact our advisory team today to begin your journey towards seamless global mobility.
          </p>
          <Link 
            to="/#contact" 
            className="inline-flex items-center gap-2 bg-navy-900 text-gold-500 px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-navy-800 transition-colors"
          >
            Contact Advisor
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
