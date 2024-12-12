import { ThemeColors } from '../types';

export const themeColors: Record<'light' | 'dark', ThemeColors> = {
  light: {
    background: 'bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50',
    text: 'text-gray-800',
    primary: 'bg-teal-500 hover:bg-teal-600',
    secondary: 'bg-gray-100',
    accent: 'bg-white/80'
  },
  dark: {
    background: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    text: 'text-gray-100',
    primary: 'bg-teal-600 hover:bg-teal-700',
    secondary: 'bg-gray-700',
    accent: 'bg-gray-800/80'
  }
};