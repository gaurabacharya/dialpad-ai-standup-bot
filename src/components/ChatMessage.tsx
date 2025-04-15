import React from 'react';
import { User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  type: 'user' | 'assistant';
  timestamp?: string;
  userName?: string;
  isStandupSummary?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  type, 
  timestamp = '4:54 PM',
  userName = 'You',
  isStandupSummary
}) => {
  return (
    <div className={`flex flex-col gap-1 mb-4 ${type === 'user' ? 'items-end' : 'items-start'}`}>
      {/* Message header with user info */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
          {type === 'user' ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <span className="text-white text-xs font-medium">AI</span>
          )}
        </div>
        <span className="text-sm font-medium text-gray-900">{type === 'user' ? userName : 'Standup AI'}</span>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>

      {/* Message content */}
      <div className={`px-4 py-2 rounded-lg max-w-[80%] ${
        type === 'user' 
          ? 'bg-purple-100 text-gray-900' 
          : 'bg-white border border-gray-200 text-gray-900'
      }`}>
        {isStandupSummary ? (
          <div className="space-y-4">
            <div className="font-medium">Summary</div>
            <div className="space-y-2">
              {message.split('\n').map((line, i) => (
                <div key={i} className="flex gap-2">
                  {line.startsWith('•') ? (
                    <>
                      <span className="text-gray-400">•</span>
                      <span>{line.substring(1).trim()}</span>
                    </>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
            </div>
            {/* Action items section */}
            <div>
              <div className="font-medium mt-4 mb-2">Action items</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">1.</span>
                  <span>Review standup summary and follow up on action items</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>{message}</div>
        )}
      </div>
    </div>
  );
};