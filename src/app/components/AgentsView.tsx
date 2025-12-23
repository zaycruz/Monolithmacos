import { Activity, Cpu, MemoryStick, Zap } from 'lucide-react';
import { Agent } from '../lib/mock-data';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

interface AgentsViewProps {
  agents: Agent[];
  onAgentSelect: (agentId: string) => void;
}

export function AgentsView({ agents, onAgentSelect }: AgentsViewProps) {
  const activeAgents = agents.filter(a => a.status === 'active');
  const idleAgents = agents.filter(a => a.status === 'idle');

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="text-[20px] mb-2">Agents</div>
          <div className="text-[13px] text-muted-text">
            {activeAgents.length} active • {idleAgents.length} idle
          </div>
        </div>

        {/* Active Agents */}
        {activeAgents.length > 0 && (
          <div className="mb-8">
            <div className="text-[13px] text-muted-text mb-3">ACTIVE</div>
            <div className="grid gap-4">
              {activeAgents.map(agent => (
                <div
                  key={agent.id}
                  onClick={() => onAgentSelect(agent.id)}
                  className="bg-surface rounded-[10px] p-6 border border-border hover:border-primary-accent/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{agent.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-[16px] mb-1">{agent.name}</div>
                          <div className="text-[13px] text-muted-text">{agent.role} • {agent.model}</div>
                        </div>
                        <Badge variant="default" className="bg-success/20 text-success">
                          <Activity className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      </div>

                      {agent.currentTask && (
                        <div className="bg-surface-raised rounded-lg p-3 mb-4 border border-border">
                          <div className="text-[11px] text-muted-text mb-1">CURRENT TASK</div>
                          <div className="text-[13px]">{agent.currentTask}</div>
                        </div>
                      )}

                      <div className="grid grid-cols-4 gap-6">
                        <div>
                          <div className="text-[11px] text-muted-text mb-1">Uptime</div>
                          <div className="text-[13px]">{agent.uptime}m</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-muted-text mb-1">Queue</div>
                          <div className="text-[13px]">{agent.queueLength} tasks</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-muted-text mb-1">Success Rate</div>
                          <div className="text-[13px] text-success">{(agent.successRate * 100).toFixed(0)}%</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-muted-text mb-1">Tokens</div>
                          <div className="text-[13px]">{agent.tokenUsage.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="flex items-center gap-1">
                              <Cpu className="w-3 h-3" />
                              CPU
                            </span>
                            <span className="text-muted-text">{agent.cpuUsage}%</span>
                          </div>
                          <Progress value={agent.cpuUsage} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="flex items-center gap-1">
                              <MemoryStick className="w-3 h-3" />
                              RAM
                            </span>
                            <span className="text-muted-text">{agent.ramUsage}%</span>
                          </div>
                          <Progress value={agent.ramUsage} className="h-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Idle Agents */}
        {idleAgents.length > 0 && (
          <div>
            <div className="text-[13px] text-muted-text mb-3">IDLE</div>
            <div className="grid gap-4">
              {idleAgents.map(agent => (
                <div
                  key={agent.id}
                  onClick={() => onAgentSelect(agent.id)}
                  className="bg-surface rounded-[10px] p-6 border border-border hover:border-primary-accent/50 cursor-pointer transition-colors opacity-60"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl grayscale">{agent.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-[16px] mb-1">{agent.name}</div>
                          <div className="text-[13px] text-muted-text">{agent.role} • {agent.model}</div>
                        </div>
                        <Badge variant="secondary">Idle</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <div className="text-[11px] text-muted-text mb-1">Uptime</div>
                          <div className="text-[13px]">{agent.uptime}m</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-muted-text mb-1">Success Rate</div>
                          <div className="text-[13px] text-success">{(agent.successRate * 100).toFixed(0)}%</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-muted-text mb-1">Tokens</div>
                          <div className="text-[13px]">{agent.tokenUsage.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
