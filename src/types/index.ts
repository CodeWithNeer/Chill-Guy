export type Theme = 'light' | 'dark';
export type Mode = 'chat' | 'quote' | null;

export interface Message {
  text: string;
  isUser: boolean;
}

export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
}