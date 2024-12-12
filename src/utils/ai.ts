import { GoogleGenerativeAI } from '@google/generative-ai';
import { quotes } from '../data/quotes';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Quote cache implementation
const quoteCache: string[] = [...quotes];
let isGeneratingBatch = false;

async function generateQuoteBatch() {
  if (isGeneratingBatch) return;
  isGeneratingBatch = true;
  
  try {
    const prompt = "Generate 5 short, minimalistic, and zen-like quotes about peace and mindfulness. Each quote should be under 50 characters. Separate with |";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const newQuotes = response.text().split('|')
      .map(q => q.trim())
      .filter(q => q.length > 0);
    
    quoteCache.push(...newQuotes);
  } catch (error) {
    console.error('Error generating quotes:', error);
  } finally {
    isGeneratingBatch = false;
  }
}

// Pre-generate quotes
generateQuoteBatch();

export async function generateQuote(): Promise<string> {
  if (quoteCache.length < 3) {
    generateQuoteBatch();
  }
  
  if (quoteCache.length === 0) {
    return "Peace comes from within.";
  }
  
  const randomIndex = Math.floor(Math.random() * quoteCache.length);
  return quoteCache.splice(randomIndex, 1)[0];
}

// Chat implementation with improved context
const chatHistory = new Map<string, string>();

export async function getChatResponse(message: string): Promise<string> {
  const prompt = `As a zen master, respond to: "${message}"
    Context: ${chatHistory.get(message.toLowerCase()) || 'None'}
    Rules:
    - Keep response under 100 characters
    - Be calm and minimalistic
    - Focus on peace and mindfulness
    - Use simple language`;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    chatHistory.set(message.toLowerCase(), text);
    if (chatHistory.size > 10) {
      const firstKey = chatHistory.keys().next().value;
      chatHistory.delete(firstKey);
    }
    
    return text;
  } catch (error) {
    console.error('Error:', error);
    return "Find peace in simplicity.";
  }
}