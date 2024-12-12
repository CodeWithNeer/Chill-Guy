import React from 'react';
import { Theme } from '../types';

interface AnimatedTextProps {
  text: string;
  theme: Theme;
  isLoading?: boolean;
}

export default function AnimatedText({ text, theme, isLoading = false }: AnimatedTextProps) {
  return (
    <div className="relative overflow-hidden">
      <p
        className={`text-2xl md:text-3xl text-center leading-relaxed font-display tracking-wide
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
          ${isLoading ? 'animate-pulse opacity-50' : 'animate-fade-in'}
          transition-all duration-500`}
      >
        {text.split(' ').map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            {word.split('').map((char, charIndex) => (
              <span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block animate-float"
                style={{
                  animationDelay: `${(wordIndex * word.length + charIndex) * 50}ms`,
                  animationDuration: '2s',
                }}
              >
                {char}
              </span>
            ))}
            {wordIndex < text.split(' ').length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}