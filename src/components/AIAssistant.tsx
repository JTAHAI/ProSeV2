"use client"
import { useState } from 'react'

export default function AIAssistant({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your Maine Family Law assistant. How can I help you with your case today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = { role: 'ai', content: 'Based on Maine law, that\'s a great question. You\'ll likely need to reference your FM-040 for that. Would you like me to walk you through the filing requirements for the District Court?' };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className='h-full flex flex-col animate-in slide-in-from-bottom-8 duration-500'>
      <div className='flex items-center gap-4 mb-6'>
        <button onClick={onBack} className='text-slate-400 hover:text-white transition-colors'>← Back</button>
        <h2 className='text-xl font-serif text-white italic'>Legal Strategist</h2>
      </div>

      <div className='flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar pr-2'>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
              msg.role === 'user' 
              ? 'bg-indigo-600 text-white rounded-tr-none' 
              : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className='flex justify-start'>
            <div className='bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 animate-pulse'>
              <div className='flex gap-1'>
                <div className='w-1.5 h-1.5 bg-slate-500 rounded-full'></div>
                <div className='w-1.5 h-1.5 bg-slate-500 rounded-full'></div>
                <div className='w-1.5 h-1.5 bg-slate-500 rounded-full'></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='relative'>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder='Ask about Maine law...'
          className='w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 pr-12 text-white text-sm focus:border-indigo-500 outline-none'
        />
        <button 
          onClick={sendMessage}
          className='absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold'
        >
          ↑
        </button>
      </div>
    </div>
  );
}
