import React, { useState } from 'react';
import { generateQuote } from '../utils/ai';
import { RefreshCw } from 'lucide-react';
import { Theme } from '../types';
import AnimatedText from './AnimatedText';

interface QuoteProps {
  theme: Theme;
}

export default function Quote({ theme }: QuoteProps) {
  const [quote, setQuote] = useState("Find peace in the present moment.");
  const [loading, setLoading] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const getNewQuote = async () => {
    setLoading(true);
    setIsChanging(true);
    
    try {
      const newQuote = await generateQuote();
      setTimeout(() => {
        setQuote(newQuote);
        setIsChanging(false);
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      setIsChanging(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`transform transition-all duration-500 
        ${loading ? 'scale-98 opacity-90' : 'scale-100 opacity-100'}`}>
        <div className={`p-8 rounded-2xl backdrop-blur-sm
          ${theme === 'dark' 
            ? 'bg-white/5 shadow-[0_0_15px_rgba(0,0,0,0.1)]' 
            : 'bg-black/5 shadow-[0_0_15px_rgba(0,0,0,0.05)]'}`}>
          
          <div className={`mb-8 transition-all duration-500 ${isChanging ? 'animate-disintegrate' : 'animate-reintegrate'}`}>
            <AnimatedText 
              text={quote}
              theme={theme}
              isLoading={loading}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={getNewQuote}
              disabled={loading}
              className={`group px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2
                transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-teal-500/20 to-purple-500/20 hover:from-teal-500/30 hover:to-purple-500/30'
                    : 'bg-gradient-to-r from-teal-500/10 to-purple-500/10 hover:from-teal-500/20 hover:to-purple-500/20'
                }`}
            >
              <RefreshCw className={`w-5 h-5 transition-transform duration-300
                ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
              <span>New Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}