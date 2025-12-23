import { useState } from 'react';
import { Copy, Download, ExternalLink, File, FileCode, Link } from 'lucide-react';
import { Artifact } from '../lib/mock-data';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ArtifactsViewerProps {
  artifacts: Artifact[];
  onClose: () => void;
}

export function ArtifactsViewer({ artifacts, onClose }: ArtifactsViewerProps) {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(artifacts[0] || null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'diff':
        return FileCode;
      case 'file':
        return File;
      case 'url':
        return Link;
      default:
        return File;
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-surface-raised p-4 flex items-center justify-between">
        <div>
          <div className="text-[16px]">Artifacts</div>
          <div className="text-[11px] text-muted-text mt-0.5">{artifacts.length} artifacts produced</div>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-[11px]" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Artifacts List */}
        <div className="w-80 border-r border-border bg-surface overflow-y-auto">
          {artifacts.map(artifact => {
            const Icon = getIcon(artifact.type);
            const isSelected = selectedArtifact?.id === artifact.id;

            return (
              <div
                key={artifact.id}
                onClick={() => setSelectedArtifact(artifact)}
                className={`border-b border-border p-4 cursor-pointer transition-colors ${
                  isSelected ? 'bg-surface-raised border-l-2 border-l-primary-accent' : 'hover:bg-surface-raised'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-primary-accent/20 rounded-lg p-2 text-primary-accent">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] truncate mb-1">{artifact.name}</div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px] h-4 px-1.5 capitalize">
                        {artifact.type}
                      </Badge>
                      <span className="text-[10px] text-muted-text">{formatTime(artifact.timestamp)}</span>
                    </div>
                    <div className="text-[11px] text-muted-text">by {artifact.agentId}</div>
                  </div>
                </div>
              </div>
            );
          })}
          {artifacts.length === 0 && (
            <div className="p-8 text-center text-[13px] text-muted-text">No artifacts yet</div>
          )}
        </div>

        {/* Artifact Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedArtifact ? (
            <div className="max-w-4xl space-y-6">
              {/* Artifact Header */}
              <div className="flex items-start justify-between">
                <div>
                  {(() => {
                    const Icon = getIcon(selectedArtifact.type);
                    return (
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary-accent/20 rounded-lg p-2 text-primary-accent">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[16px]">{selectedArtifact.name}</div>
                          <div className="text-[11px] text-muted-text">
                            {formatTime(selectedArtifact.timestamp)} • {selectedArtifact.agentId}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-[11px]">
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy
                  </Button>
                  {selectedArtifact.type === 'url' && (
                    <Button variant="outline" size="sm" className="h-7 text-[11px]">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Open
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="h-7 text-[11px]">
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Download
                  </Button>
                </div>
              </div>

              {/* File Content */}
              {selectedArtifact.type === 'file' && selectedArtifact.content && (
                <div className="space-y-2">
                  <div className="text-[11px] text-muted-text">FILE CONTENT</div>
                  <div className="bg-surface-raised rounded-lg border border-border overflow-hidden">
                    <div className="border-b border-border p-3 bg-surface">
                      <div className="text-[11px] font-mono text-muted-text">{selectedArtifact.name}</div>
                    </div>
                    <pre className="p-4 text-[13px] font-mono overflow-x-auto">
                      {selectedArtifact.content}
                    </pre>
                  </div>
                </div>
              )}

              {/* Diff View */}
              {selectedArtifact.type === 'diff' && selectedArtifact.diffBefore && selectedArtifact.diffAfter && (
                <div className="space-y-2">
                  <div className="text-[11px] text-muted-text">CHANGES</div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Before */}
                    <div className="space-y-2">
                      <div className="text-[11px] text-muted-text">BEFORE</div>
                      <div className="bg-error/10 border border-error/30 rounded-lg overflow-hidden">
                        <pre className="p-4 text-[13px] font-mono overflow-x-auto text-error/80">
                          {selectedArtifact.diffBefore}
                        </pre>
                      </div>
                    </div>
                    {/* After */}
                    <div className="space-y-2">
                      <div className="text-[11px] text-muted-text">AFTER</div>
                      <div className="bg-success/10 border border-success/30 rounded-lg overflow-hidden">
                        <pre className="p-4 text-[13px] font-mono overflow-x-auto text-success/80">
                          {selectedArtifact.diffAfter}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* URL */}
              {selectedArtifact.type === 'url' && selectedArtifact.url && (
                <div className="space-y-2">
                  <div className="text-[11px] text-muted-text">URL</div>
                  <div className="bg-surface-raised rounded-lg border border-border p-4">
                    <a
                      href={selectedArtifact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-accent hover:underline text-[13px] font-mono break-all"
                    >
                      {selectedArtifact.url}
                    </a>
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-2">
                <div className="text-[11px] text-muted-text">METADATA</div>
                <div className="bg-surface-raised rounded-lg border border-border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px]">Task ID</span>
                    <span className="text-[13px] text-muted-text font-mono">{selectedArtifact.taskId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px]">Agent ID</span>
                    <span className="text-[13px] text-muted-text font-mono">{selectedArtifact.agentId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px]">Type</span>
                    <Badge variant="outline" className="text-[11px] capitalize">
                      {selectedArtifact.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px]">Created</span>
                    <span className="text-[13px] text-muted-text">
                      {new Date(selectedArtifact.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-text text-[13px]">
              Select an artifact to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
