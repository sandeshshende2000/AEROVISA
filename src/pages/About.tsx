import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Globe, Users, Plane } from 'lucide-react';
import BackButton from '../components/BackButton';

const About = () => {
  return (
    <div className="bg-navy-900 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton label="Back to Home" fallbackPath="/" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">About AeroVisa Global</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Excellence in Global Mobility</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            AeroVisa Global is a premier advisory and coordination platform dedicated to providing bespoke solutions for private aviation and investment migration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-6">Our Mission</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Our mission is to simplify the complexities of international travel and residency for high-net-worth individuals and corporate clients. We act as a bridge between our clients and a global network of verified partners, ensuring transparency, confidentiality, and professional excellence in every interaction.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Whether you require a last-minute private jet charter or a long-term residency strategy, AeroVisa Global provides the coordination and advisory services necessary to achieve your global mobility goals.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1000" 
              alt="Luxury Travel" 
              className="rounded-sm shadow-2xl border border-gold-500/20"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <ShieldCheck size={32} />, title: "Verified Partners", desc: "Access to a vetted network of aviation and immigration experts." },
            { icon: <Globe size={32} />, title: "Global Reach", desc: "Advisory services spanning across major international hubs." },
            { icon: <Users size={32} />, title: "Bespoke Service", desc: "Tailored solutions designed for your unique requirements." },
            { icon: <Plane size={32} />, title: "Seamless Travel", desc: "Coordinated private aviation for maximum efficiency." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-navy-800 p-8 border border-gold-500/10 rounded-sm text-center"
            >
              <div className="text-gold-500 mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
