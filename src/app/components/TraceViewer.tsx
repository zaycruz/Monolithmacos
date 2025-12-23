import { useState } from 'react';
import { AlertCircle, CheckCircle, Copy, Download, Eye, Pause, Wrench, Zap } from 'lucide-react';
import { Trace, TraceStep, TraceStepType } from '../lib/mock-data';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface TraceViewerProps {
  trace: Trace;
  onClose: () => void;
}

const stepIcons: Record<TraceStepType, { icon: any; color: string; bg: string }> = {
  observation: { icon: Eye, color: 'text-blue-400', bg: 'bg-blue-400/20' },
  thinking: { icon: Brain, color: 'text-purple-400', bg: 'bg-purple-400/20' },
  action: { icon: Wrench, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
  result: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/20' },
  error: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/20' }
};

function Brain({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

export function TraceViewer({ trace, onClose }: TraceViewerProps) {
  const [selectedStep, setSelectedStep] = useState<TraceStep | null>(trace.steps[0] || null);
  const [filter, setFilter] = useState<'all' | 'errors' | 'actions'>('all');

  const filteredSteps = trace.steps.filter(step => {
    if (filter === 'errors') return step.type === 'error';
    if (filter === 'actions') return step.type === 'action';
    return true;
  });

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-surface-raised p-4 flex items-center justify-between">
        <div>
          <div className="text-[16px]">Trace Viewer</div>
          <div className="text-[11px] text-muted-text mt-0.5">
            Task ID: {trace.taskId} • Agent ID: {trace.agentId}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-7 text-[11px]">
            <Pause className="w-3.5 h-3.5 mr-1.5" />
            Pause Agent
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-[11px]">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-[11px]" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-surface p-3 flex items-center gap-2">
        <div className="text-[11px] text-muted-text mr-2">Filter:</div>
        <Button
          variant={filter === 'all' ? 'default' : 'ghost'}
          size="sm"
          className="h-6 text-[11px]"
          onClick={() => setFilter('all')}
        >
          All ({trace.steps.length})
        </Button>
        <Button
          variant={filter === 'errors' ? 'default' : 'ghost'}
          size="sm"
          className="h-6 text-[11px]"
          onClick={() => setFilter('errors')}
        >
          Errors ({trace.steps.filter(s => s.type === 'error').length})
        </Button>
        <Button
          variant={filter === 'actions' ? 'default' : 'ghost'}
          size="sm"
          className="h-6 text-[11px]"
          onClick={() => setFilter('actions')}
        >
          Actions ({trace.steps.filter(s => s.type === 'action').length})
        </Button>
        <div className="flex-1" />
        <Button variant="outline" size="sm" className="h-6 text-[11px]">
          Jump to Latest
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Step Timeline */}
        <div className="w-80 border-r border-border bg-surface overflow-y-auto">
          {filteredSteps.map((step, index) => {
            const config = stepIcons[step.type];
            const Icon = config.icon;
            const isSelected = selectedStep?.id === step.id;

            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className={`border-b border-border p-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-surface-raised border-l-2 border-l-primary-accent' : 'hover:bg-surface-raised'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`${config.bg} rounded-full p-1.5 ${config.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px] h-4 px-1.5 capitalize">
                        {step.type}
                      </Badge>
                      <span className="text-[10px] text-muted-text">{formatTime(step.timestamp)}</span>
                    </div>
                    <div className="text-[13px] line-clamp-2">{step.content}</div>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredSteps.length === 0 && (
            <div className="p-8 text-center text-[13px] text-muted-text">No steps match the filter</div>
          )}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedStep ? (
            <div className="max-w-3xl space-y-6">
              {/* Step Header */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {(() => {
                    const config = stepIcons[selectedStep.type];
                    const Icon = config.icon;
                    return (
                      <div className={`${config.bg} rounded-full p-2 ${config.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    );
                  })()}
                  <div>
                    <Badge variant="outline" className="text-[11px] capitalize">
                      {selectedStep.type}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-muted-text">{formatTime(selectedStep.timestamp)}</div>
                </div>
                <div className="text-[16px]">{selectedStep.content}</div>
              </div>

              {/* Tool Call */}
              {selectedStep.toolCall && (
                <div className="space-y-2">
                  <div className="text-[11px] text-muted-text">TOOL CALL</div>
                  <div className="bg-surface-raised rounded-lg border border-border">
                    <div className="flex items-center justify-between p-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-warning" />
                        <span className="text-[13px] font-mono">{selectedStep.toolCall.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                        onClick={() => copyToClipboard(JSON.stringify(selectedStep.toolCall, null, 2))}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <pre className="p-3 text-[11px] font-mono overflow-x-auto">
                      {JSON.stringify(selectedStep.toolCall.args, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Output */}
              {selectedStep.output && (
                <div className="space-y-2">
                  <div className="text-[11px] text-muted-text">OUTPUT</div>
                  <div className="bg-success/10 border border-success/30 rounded-lg p-3">
                    <div className="text-[13px] font-mono text-success">{selectedStep.output}</div>
                  </div>
                </div>
              )}

              {/* Error */}
              {selectedStep.error && (
                <div className="space-y-2">
                  <div className="text-[11px] text-muted-text">ERROR</div>
                  <div className="bg-error/10 border border-error/30 rounded-lg p-3 flex gap-2">
                    <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
                    <div className="text-[13px] font-mono text-error">{selectedStep.error}</div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-text text-[13px]">
              Select a step to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
