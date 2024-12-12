import React from 'react';
import { Theme } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  theme: Theme;
}

export default function Layout({ children, theme }: LayoutProps) {
  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out overflow-x-hidden
      ${theme === 'dark' 
        ? 'bg-[#0F172A] text-white' 
        : 'bg-[#F8FAFC] text-gray-900'}
    `}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}