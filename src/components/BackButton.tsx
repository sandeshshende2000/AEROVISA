import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  fallbackPath?: string;
  className?: string;
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  label = "Back to Programs", 
  fallbackPath = "/#programs",
  className = "",
  onClick
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) {
      onClick();
      return;
    }
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
      className={`flex items-center text-white/70 hover:text-gold-500 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 group py-2 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
      {label}
    </button>
  );
};

export default BackButton;
