import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCheck, Paperclip } from 'lucide-react';
import { Specialist, ChatMessage } from '../types';
import { USER_PROFILE } from '../data/mockData';

interface ChatModalProps {
  specialist: Specialist | null;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ specialist, onClose }) => {
  if (!specialist) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderId: specialist.id,
      senderName: specialist.name,
      avatarUrl: specialist.avatarUrl,
      text: `Olá ${USER_PROFILE.name}! Vi sua demanda e estou disponível para ajudar no seu projeto. Podemos alinhar os detalhes?`,
      timestamp: '14:22',
      isUser: false,
    },
    {
      id: 'm2',
      senderId: 'user',
      senderName: USER_PROFILE.name,
      avatarUrl: USER_PROFILE.avatarUrl,
      text: `Olá ${specialist.name}! Qual é o seu prazo estimado para dar início?`,
      timestamp: '14:25',
      isUser: true,
    },
    {
      id: 'm3',
      senderId: specialist.id,
      senderName: specialist.name,
      avatarUrl: specialist.avatarUrl,
      text: `Consigo iniciar imediatamente hoje mesmo! Assim que aprovar a proposta, enviamos o cronograma completo no painel do projeto.`,
      timestamp: '14:26',
      isUser: false,
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: USER_PROFILE.name,
      avatarUrl: USER_PROFILE.avatarUrl,
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    // Auto simulated response
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: specialist.id,
        senderName: specialist.name,
        avatarUrl: specialist.avatarUrl,
        text: `Excelente! Registrei suas observações sobre "${currentInput.substring(0, 30)}...". Estão perfeitamente alinhadas com as diretrizes do NEXO.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false,
      };
      setMessages(prev => [...prev, autoReply]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[85vh] flex flex-col text-[#1c1a25] relative shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#5b3df5] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={specialist.avatarUrl}
                alt={specialist.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-white"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#42e09a] border-2 border-[#5b3df5] rounded-full" />
            </div>

            <div>
              <h3 className="font-headline font-bold text-base leading-tight">
                {specialist.name}
              </h3>
              <p className="text-[11px] text-white/80 font-medium">
                {specialist.role} • <span className="text-[#42e09a] font-bold">Online agora</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#fcf8ff]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-end gap-2 ${m.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!m.isUser && (
                <img
                  src={m.avatarUrl}
                  alt={m.senderName}
                  className="w-7 h-7 rounded-full object-cover border border-[#5b3df5]/30 mb-1"
                />
              )}

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  m.isUser
                    ? 'bg-[#5b3df5] text-white rounded-br-none'
                    : 'bg-white text-[#1c1a25] border border-[#c8c4d9]/50 rounded-bl-none'
                }`}
              >
                <p>{m.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                    m.isUser ? 'text-white/70' : 'text-[#787588]'
                  }`}
                >
                  <span>{m.timestamp}</span>
                  {m.isUser && <CheckCheck className="w-3 h-3 text-[#42e09a]" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t border-[#e5e0ef] flex items-center gap-2">
          <button
            type="button"
            className="p-2.5 rounded-xl hover:bg-[#f6f1ff] text-[#787588] transition-colors"
            title="Anexar arquivo"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enviar mensagem para ${specialist.name}...`}
            className="flex-1 px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/60 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
          />

          <button
            type="submit"
            className="p-3 bg-[#5b3df5] hover:bg-[#4212de] text-white rounded-xl active:scale-95 transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
