import React from 'react';
import { Mail, Phone, Instagram, Youtube, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-navy border-t border-white/5 py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 gold-gradient rounded-sm flex items-center justify-center">
              <span className="text-luxury-navy font-serif font-bold text-sm">A</span>
            </div>
            <span className="text-white font-serif text-xl tracking-widest uppercase">
              AeroVisa <span className="gold-text-gradient">Global</span>
            </span>
          </div>
          <p className="text-white/40 max-w-md mb-8 font-sans leading-relaxed">
            Exclusive off-market investment opportunities in high-demand coastal locations for high-net-worth investors and family offices.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-luxury-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/40 hover:text-luxury-gold transition-colors"><Youtube size={20} /></a>
            <a href="#" className="text-white/40 hover:text-luxury-gold transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-serif text-lg mb-6 tracking-widest uppercase">Quick Links</h4>
          <ul className="space-y-4 text-white/40 font-sans text-sm tracking-wide">
            <li><a href="/opportunities" className="hover:text-white transition-colors">Global Opportunities</a></li>
            <li><a href="/list-property" className="hover:text-white transition-colors">List Your Property</a></li>
            <li><a href="/investor-access" className="hover:text-white transition-colors">Investor Access</a></li>
            <li><a href="/advisor-contact" className="hover:text-white transition-colors">Speak to an Advisor</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-serif text-lg mb-6 tracking-widest uppercase">Contact</h4>
          <ul className="space-y-4 text-white/40 font-sans text-sm tracking-wide">
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-luxury-gold" />
              <a href="mailto:concierge@aerovisa.global" className="hover:text-white transition-colors">concierge@aerovisa.global</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-luxury-gold" />
              <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-luxury-gold text-xs font-bold uppercase tracking-widest">WhatsApp</span>
              <a 
                href="https://wa.me/1234567890" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                +1 (234) 567-890
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs tracking-widest uppercase">
        <p>&copy; {currentYear} AeroVisa Global. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
