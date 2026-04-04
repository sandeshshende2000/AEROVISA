import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans mb-8">
      <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <React.Fragment key={to}>
            <ChevronRight size={10} className="text-white/20" />
            {last ? (
              <span className="text-luxury-gold font-bold">{value.replace(/-/g, ' ')}</span>
            ) : (
              <Link to={to} className="hover:text-luxury-gold transition-colors">
                {value.replace(/-/g, ' ')}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
