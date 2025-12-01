'use client';
import { useState } from 'react';
import { MessageCircle, Send, Bot, User, X } from 'lucide-react';
import { colors } from '@/app/design-system/colors';

export default function DentalChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Welcome to Avanty Dental Lab 👋 How can I help you today?',
      time: '10:30'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatbotColors = colors.chatbot;




// Fetch RAG answer from backend

const fetchRagAnswer = async (question: string) => {
  try {
    const res = await fetch('http://localhost:3001/api/rag/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });

    const { data } = await res.json();
    return data;
  } catch {
    return {
      answer: 'Error .',
      sources: [],
      responseTime: null
    };
  }
};
////////////////////////////////






  // Handle sending message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    const ragResponse = await fetchRagAnswer(currentInput);
    setIsLoading(false);

    const botResponse = {
      id: messages.length + 2,
      type: 'bot',
      text: ragResponse.answer,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      sources: ragResponse.sources
    };
    setMessages(prev => [...prev, botResponse]);

  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover z-50"
          style={{ background: chatbotColors.goldDark }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
          )}

          {isOpen && (
            <div className="fixed bottom-6 right-6 w-96 h-[500px] rounded-3xl shadow-2xl overflow-hidden flex flex-col z-50" style={{ border: `2px solid ${chatbotColors.goldDark}` }}>
              <div className="text-white p-4 flex items-center justify-between" style={{ background: chatbotColors.navy }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: chatbotColors.goldDark }}>
                    <Bot className="w-6 h-6" style={{ color: chatbotColors.navy }} />
                  </div>
                  <div>
                    <h2 className="font-bold">Avanty Dental Lab</h2>
                    <p className="text-xs" style={{ color: chatbotColors.goldDark }}>Online now</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5" style={{ color: chatbotColors.goldDark }} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4" style={{ background: `${chatbotColors.navy}E5` }}>
                {messages.map(msg => (
                  <div key={msg.id} className={`flex gap-2 mb-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: chatbotColors.goldDark }}>
                      {msg.type === 'bot' ? <Bot className="w-5 h-5" style={{ color: chatbotColors.navy }} /> : <User className="w-5 h-5" style={{ color: chatbotColors.navy }} />}
                    </div>
                    <div className="max-w-[70%] px-4 py-2 rounded-2xl" style={{
                      border: msg.type === 'bot' ? `2px solid ${chatbotColors.goldDark}` : 'none',
                      background: msg.type === 'bot' ? chatbotColors.beige : chatbotColors.navy,
                      color: msg.type === 'bot' ? chatbotColors.textDark : chatbotColors.textLight,
                      textAlign: msg.type === 'user' ? 'right' : 'left'
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: chatbotColors.goldDark }}>
                      <Bot className="w-5 h-5" style={{ color: chatbotColors.navy }} />
                    </div>
                    <div className="max-w-[70%] px-4 py-2 rounded-2xl" style={{ border: `2px solid ${chatbotColors.goldDark}`, background: chatbotColors.beige, color: chatbotColors.textDark }}>
                      Typing...
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4" style={{ background: chatbotColors.navy, borderTop: `2px solid ${chatbotColors.goldDark}` }}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-2 rounded-full focus:outline-none text-sm"
                    style={{ border: `2px solid ${chatbotColors.goldDark}`, backgroundColor: chatbotColors.textLight, color: chatbotColors.textDark }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    className="w-10 h-10 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-50"
                    style={{ background: chatbotColors.goldDark }}
                    disabled={isLoading}
                  >
                    <Send className="w-4 h-4" style={{ color: chatbotColors.navy }} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      );
}