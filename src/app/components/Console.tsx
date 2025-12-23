import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Task } from '../lib/mock-data';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface ConsoleProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onTaskSelect: (taskId: string) => void;
}

interface ConsoleMessage {
  id: string;
  type: 'user' | 'system' | 'task';
  content: string;
  timestamp: number;
  task?: Task;
}

export function Console({ isCollapsed, onToggleCollapse, onTaskSelect }: ConsoleProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ConsoleMessage[]>([
    {
      id: '1',
      type: 'system',
      content: 'AssistantOS v2.1.0 initialized. 2 agents active, 3 tasks queued.',
      timestamp: Date.now() - 300000
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keyboard shortcut for focusing console
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isCollapsed) {
          onToggleCollapse();
        }
        document.getElementById('console-input')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCollapsed, onToggleCollapse]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ConsoleMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate system response
    setTimeout(() => {
      const systemMessage: ConsoleMessage = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: `Processing: "${input}". Command acknowledged.`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, systemMessage]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`border-t border-border bg-surface transition-all duration-200 flex flex-col ${
        isCollapsed ? 'h-12' : 'h-48'
      }`}
      style={{ resize: isCollapsed ? 'none' : 'vertical', overflow: 'hidden', minHeight: '48px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-raised">
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-muted-text">Console</span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
            Command Mode
          </Badge>
        </div>
        <button
          onClick={onToggleCollapse}
          className="text-muted-text hover:text-foreground transition-colors"
        >
          {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Messages */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-[13px]">
          {messages.map(msg => (
            <div key={msg.id} className="flex gap-2">
              <span className="text-muted-text text-[10px] w-12 flex-shrink-0">
                {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <div className="flex-1">
                {msg.type === 'user' && (
                  <div>
                    <span className="text-primary-accent">→</span> {msg.content}
                  </div>
                )}
                {msg.type === 'system' && (
                  <div className="text-muted-text">{msg.content}</div>
                )}
                {msg.type === 'task' && msg.task && (
                  <div className="bg-surface-raised rounded-lg p-3 space-y-2 border border-border">
                    <div className="flex items-center justify-between">
                      <span>{msg.task.title}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {msg.task.status}
                      </Badge>
                    </div>
                    <Progress value={msg.task.progress * 100} className="h-1" />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-6 text-[11px]">
                        Watch
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 text-[11px]">
                        Pause
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      {!isCollapsed && (
        <div className="border-t border-border p-3 bg-surface-raised">
          <div className="flex gap-2">
            <input
              id="console-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Command MonolithOS… (⌘K)"
              className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary-accent"
            />
            <Button
              size="sm"
              onClick={handleSend}
              className="bg-primary-accent hover:bg-primary-accent/90 h-8"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
