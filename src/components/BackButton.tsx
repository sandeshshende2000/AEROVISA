import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  fallbackPath?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  label = "Back to Programs", 
  fallbackPath = "/#programs",
  className = ""
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // The user specifically requested window.history.back()
    // We check if history length is greater than 1 as a basic heuristic for "has history"
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center text-white/70 hover:text-gold-500 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" /> 
      {label}
    </button>
  );
};

export default BackButton;
