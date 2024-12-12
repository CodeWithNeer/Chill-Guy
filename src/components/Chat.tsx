import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { getChatResponse } from '../utils/ai';
import { Theme, Message } from '../types';

interface ChatProps {
  theme: Theme;
}

export default function Chat({ theme }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey there! I'm your chill friend. What's on your mind?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await getChatResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-lg mx-auto rounded-2xl overflow-hidden backdrop-blur-sm
      ${theme === 'dark' 
        ? 'bg-white/5 shadow-[0_0_15px_rgba(0,0,0,0.1)]' 
        : 'bg-black/5 shadow-[0_0_15px_rgba(0,0,0,0.05)]'}`}>
      <div className="h-[400px] overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl
              ${message.isUser
                ? theme === 'dark'
                  ? 'bg-teal-500/20 text-teal-100'
                  : 'bg-teal-500/10 text-teal-900'
                : theme === 'dark'
                  ? 'bg-purple-500/20 text-purple-100'
                  : 'bg-purple-500/10 text-purple-900'
              } animate-fade-scale`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-2 rounded-xl outline-none transition-colors duration-300
              ${theme === 'dark'
                ? 'bg-white/5 focus:bg-white/10 text-white placeholder:text-white/50'
                : 'bg-black/5 focus:bg-black/10 text-gray-900 placeholder:text-gray-500'
              }`}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`p-2 rounded-xl transition-all duration-300 
              ${theme === 'dark'
                ? 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300'
                : 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-700'
              } disabled:opacity-50`}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}