import React from 'react';
import Layout from './components/Layout';
import ThemeToggle from './components/ThemeToggle';
import ChillGuy from './components/ChillGuy';
import Chat from './components/Chat';
import Quote from './components/Quote';
import GridBackground from './components/GridBackground';
import { useTheme } from './hooks/useTheme';
import { Mode } from './types';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = React.useState<Mode>(null);

  return (
    <Layout theme={theme}>
      <GridBackground theme={theme} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <main className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <h1 className={`text-4xl md:text-5xl text-center mb-16 font-display
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
          animate-fade-scale`}>
          Chill Place
        </h1>
        
        <ChillGuy 
          onChatClick={() => setMode('chat')}
          onQuoteClick={() => setMode('quote')}
          theme={theme}
        />

        <div className="mt-16 transition-all duration-500 ease-in-out">
          {mode === 'chat' && <Chat theme={theme} />}
          {mode === 'quote' && <Quote theme={theme} />}
        </div>
      </main>
    </Layout>
  );
}

export default App;