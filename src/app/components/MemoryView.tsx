import { Database, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function MemoryView() {
  const memoryEntries = [
    {
      id: '1',
      type: 'context',
      content: 'User prefers TypeScript over JavaScript for all code generation',
      timestamp: Date.now() - 3600000,
      source: 'user-preference'
    },
    {
      id: '2',
      type: 'fact',
      content: 'Project uses React 18.3.1 with Vite as build tool',
      timestamp: Date.now() - 7200000,
      source: 'environment-scan'
    },
    {
      id: '3',
      type: 'context',
      content: 'Authentication system uses JWT tokens with 15-minute expiration',
      timestamp: Date.now() - 1380000,
      source: 'task-1'
    },
    {
      id: '4',
      type: 'fact',
      content: 'Database schema includes users, sessions, and refresh_tokens tables',
      timestamp: Date.now() - 10800000,
      source: 'agent-1'
    }
  ];

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="text-[20px] mb-2">Memory</div>
          <div className="text-[13px] text-muted-text">
            Read-only view • {memoryEntries.length} entries
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
            <input
              type="text"
              placeholder="Search memory..."
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary-accent"
            />
          </div>
        </div>

        {/* Memory Entries */}
        <div className="space-y-3">
          {memoryEntries.map(entry => (
            <div
              key={entry.id}
              className="bg-surface rounded-[10px] p-4 border border-border"
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary-accent/20 rounded-lg p-2 text-primary-accent">
                  <Database className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] h-4 px-1.5 capitalize">
                      {entry.type}
                    </Badge>
                    <span className="text-[10px] text-muted-text">{formatTime(entry.timestamp)}</span>
                  </div>
                  <div className="text-[13px] mb-2">{entry.content}</div>
                  <div className="text-[11px] text-muted-text">Source: {entry.source}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-primary-accent/10 border border-primary-accent/30 rounded-lg p-4">
          <div className="text-[13px] text-primary-accent">
            Memory is automatically populated by agents during task execution. This view is read-only.
          </div>
        </div>
      </div>
    </div>
  );
}
