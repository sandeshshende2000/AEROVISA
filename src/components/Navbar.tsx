import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Home, Briefcase, MapPin, PlusCircle, UserCheck, Phone, BookOpen, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Opportunities', path: '/opportunities', icon: Globe },
    { name: 'Greece', path: '/country/greece', icon: MapPin },
    { name: 'Portugal', path: '/country/portugal', icon: MapPin },
    { name: 'Latvia', path: '/country/latvia', icon: MapPin },
    { name: 'UK', path: '/country/uk', icon: MapPin },
    { name: 'Blog', path: '/blog', icon: BookOpen },
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
          {/* Left-Side Branding */}
          <div className={`flex items-center transition-all duration-500 ${!isHome ? 'pl-16 sm:pl-24' : ''}`}>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <Shield className="absolute text-luxury-gold w-full h-full transform group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                <Globe className="text-luxury-gold w-5 h-5 sm:w-6 sm:h-6 relative z-10" strokeWidth={1.5} />
                <div className="absolute bottom-2 right-1 w-4 h-0.5 bg-luxury-gold rounded-full transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-luxury-gold font-serif text-lg sm:text-xl font-bold tracking-[0.1em] uppercase leading-none">
                  AEROVISA <span className="text-white">GLOBAL</span>
                </span>
                <span className="text-[8px] sm:text-[10px] text-white/40 font-sans tracking-[0.2em] uppercase mt-1 hidden xs:block">
                  Global Residency & Investment Advisory
                </span>
              </div>
            </Link>
          </div>

          {/* Right-Side Menu Trigger */}
          <button
            onClick={toggleMenu}
            className="w-10 h-10 sm:w-12 sm:h-12 glass rounded-full flex items-center justify-center text-luxury-gold hover:text-white transition-colors duration-300 group z-50"
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
            className="fixed inset-0 z-40 bg-luxury-navy/95 backdrop-blur-xl overflow-y-auto max-h-screen"
          >
            <div className="min-h-full flex flex-col items-center justify-center py-24 px-6">
              <nav className="flex flex-col items-center gap-6 mb-16">
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

              <div className="flex gap-8 text-white/40 font-serif text-sm tracking-widest uppercase mt-auto">
                <a href="#" className="hover:text-luxury-gold transition-colors">Instagram</a>
                <a href="#" className="hover:text-luxury-gold transition-colors">YouTube</a>
                <a href="https://www.linkedin.com/in/sandesh-shende-975699318" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
