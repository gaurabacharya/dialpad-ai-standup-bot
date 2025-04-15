import React, { useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type 'run standup' to generate summary..."
            className="flex-1 bg-transparent text-sm focus:outline-none"
            disabled={disabled}
          />
          <button
            type="button"
            className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500"
            disabled={disabled}
          >
            <Smile className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500"
            disabled={disabled}
          >
            <Paperclip className="w-5 h-5" />
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};