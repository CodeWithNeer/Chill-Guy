import React from 'react';
import { MessageCircle, Quote } from 'lucide-react';
import { Theme } from '../types';

interface ChillGuyProps {
  onChatClick: () => void;
  onQuoteClick: () => void;
  theme: Theme;
}

export default function ChillGuy({ onChatClick, onQuoteClick, theme }: ChillGuyProps) {
  const buttonBaseClass = `flex items-center gap-3 px-6 py-3 rounded-xl font-medium 
    transition-all duration-300 transform hover:scale-105 active:scale-95`;

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative group">
        <div className={`absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75
          transition-opacity duration-500 ${theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-500/30'}`} />
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 
          shadow-xl transition-transform duration-300 group-hover:scale-105"
          style={{ borderColor: theme === 'dark' ? '#1E293B' : '#FFFFFF' }}>
          <img 
            src="https://i.pinimg.com/736x/a0/74/6a/a0746adcdfe890a901e69b9d8b6317f9.jpg"
            alt="Chill Guide"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={onChatClick}
          className={`${buttonBaseClass} ${
            theme === 'dark' 
              ? 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300' 
              : 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-700'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Let's Chat</span>
        </button>

        <button
          onClick={onQuoteClick}
          className={`${buttonBaseClass} ${
            theme === 'dark'
              ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300'
              : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-700'
          }`}
        >
          <Quote className="w-5 h-5" />
          <span>Get Inspired</span>
        </button>
      </div>
    </div>
  );
}