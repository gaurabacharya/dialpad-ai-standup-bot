import React, { useState, useEffect, useRef } from 'react';
import { StandupCard } from './components/StandupCard';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { Sidebar } from './components/Sidebar';
import { processData, formatActivityForLLM } from './utils/dataProcessor';
import { generateStandupSummary } from './utils/gemini';
import { StandupSummary, ChatMessage as ChatMessageType } from './types';
import { Loader2, Search, Settings } from 'lucide-react';

function App() {
  const [summary, setSummary] = useState<StandupSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! Type "run standup" to generate the daily standup summary.'
    }
  ]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const generateSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const activity = processData();
      const formattedActivity = formatActivityForLLM(activity);
      const result = await generateStandupSummary(formattedActivity);
      setSummary(result);
      
      // Format the summary as a bullet-point list
      const summaryText = Object.entries(result.summaries)
        .map(([member, data]) => {
          return `${member}:\n` +
            `• Completed: ${(data as { completed: string[] }).completed.join(', ')}\n` +
            `• Working on: ${(data as { working: string[] }).working.join(', ')}\n` +
            `• Blockers: ${(data as { blockers: string[] }).blockers.join(', ')}`;
        })
        .join('\n\n');

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: summaryText,
        isStandupSummary: true
      }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate standup summary';
      setError(errorMessage);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}`
      }]);
      console.error('Standup generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content: message
    }]);

    if (message.toLowerCase() === 'run standup') {
      generateSummary();
    } else {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'To generate a standup summary, please type "run standup"'
      }]);
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
          <div className="flex items-center gap-4">
            <h1 className="font-medium">Team Standup</h1>
            <span className="text-sm text-gray-500">Available</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Dialpad"
                className="pl-10 pr-4 py-1.5 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Chat container */}
        <div className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                type={message.type}
                isStandupSummary={message.isStandupSummary}
              />
            ))}
            {loading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
                <span className="ml-3 text-sm text-gray-600">Generating summary...</span>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 bg-white p-4">
            <ChatInput onSend={handleSendMessage} disabled={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;