import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Home, Briefcase, MapPin, PlusCircle, UserCheck, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Opportunities', path: '/opportunities', icon: Globe },
    { name: 'Greece', path: '/country/greece', icon: MapPin },
    { name: 'Portugal', path: '/country/portugal', icon: MapPin },
    { name: 'Latvia', path: '/country/latvia', icon: MapPin },
    { name: 'UK', path: '/country/uk', icon: MapPin },
    { name: 'List Property', path: '/list-property', icon: PlusCircle },
    { name: 'Investor Access', path: '/investor-access', icon: UserCheck },
    { name: 'Speak to Advisor', path: '/advisor-contact', icon: Phone },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-luxury-navy/80 backdrop-blur-md border-b border-white/5 pt-[env(safe-area-inset-top)]">
        <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 flex items-center justify-between relative">
          {/* Left Spacer for Back Button on subpages */}
          <div className="w-12 sm:w-24" />

          {/* Centered Brand Name */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 gold-gradient rounded-sm flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500 hidden xs:flex">
                <span className="text-luxury-navy font-serif font-bold text-lg sm:text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-500">A</span>
              </div>
              <span className="text-luxury-gold font-serif text-xl sm:text-2xl font-bold tracking-[0.05em] uppercase whitespace-nowrap">
                AEROVISA <span className="text-white sm:text-luxury-gold">GLOBAL</span>
              </span>
            </Link>
          </div>

          {/* Right-Side Menu Trigger */}
          <button
            onClick={toggleMenu}
            className="w-10 h-10 sm:w-12 sm:h-12 glass rounded-full flex items-center justify-center text-luxury-gold hover:text-white transition-colors duration-300 group"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} className="group-hover:scale-110 transition-transform" />}
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-luxury-navy/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center gap-4 text-2xl sm:text-4xl font-serif tracking-widest transition-all duration-300 ${
                      location.pathname === item.path ? 'text-luxury-gold' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${location.pathname === item.path ? 'text-luxury-gold' : 'text-white/20 group-hover:text-luxury-gold'} transition-colors`} />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="absolute bottom-12 flex gap-8 text-white/40 font-serif text-sm tracking-widest uppercase">
              <a href="#" className="hover:text-luxury-gold transition-colors">Instagram</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">YouTube</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">LinkedIn</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
