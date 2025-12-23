import { AlertTriangle, ArrowRight, ChevronRight, Cpu, Eye, MemoryStick, Zap } from 'lucide-react';
import { Agent, Task, SystemMetrics } from '../lib/mock-data';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface MissionControlProps {
  agents: Agent[];
  tasks: Task[];
  systemMetrics: SystemMetrics;
  onTaskSelect: (taskId: string) => void;
  onAgentSelect: (agentId: string) => void;
}

export function MissionControl({
  agents,
  tasks,
  systemMetrics,
  onTaskSelect,
  onAgentSelect
}: MissionControlProps) {
  const runningTasks = tasks.filter(t => t.status === 'running');
  const queuedTasks = tasks.filter(t => t.status === 'queued');
  const blockedTasks = tasks.filter(t => t.status === 'blocked');
  const activeAgents = agents.filter(a => a.status === 'active');

  return (
    <div className="flex-1 overflow-y-auto">
      {/* NOW / NEXT / BLOCKED Strip */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="grid grid-cols-3 gap-4 p-4">
          {/* NOW */}
          <div className="bg-surface rounded-[10px] p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px]">NOW</div>
              <Badge variant="secondary" className="bg-primary-accent/20 text-primary-accent">
                {runningTasks.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {runningTasks.map(task => {
                const agent = agents.find(a => a.id === task.agentId);
                return (
                  <div
                    key={task.id}
                    onClick={() => onTaskSelect(task.id)}
                    className="space-y-2 cursor-pointer hover:bg-surface-raised rounded-[8px] p-2 -m-2 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      {agent && <div className="text-lg">{agent.avatar}</div>}
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] truncate">{agent?.name}</div>
                        <div className="text-[11px] text-muted-text truncate">{task.title}</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-text">
                      Step {task.currentStep} / ~{task.estimatedSteps}
                    </div>
                    <Progress value={task.progress * 100} className="h-1" />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-6 text-[11px] mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        // View trace action
                      }}
                    >
                      View Trace
                    </Button>
                  </div>
                );
              })}
              {runningTasks.length === 0 && (
                <div className="text-[11px] text-muted-text text-center py-4">No active tasks</div>
              )}
            </div>
          </div>

          {/* NEXT */}
          <div className="bg-surface rounded-[10px] p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px]">NEXT</div>
              <Badge variant="secondary" className="bg-warning/20 text-warning">
                {queuedTasks.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {queuedTasks.slice(0, 3).map(task => (
                <div
                  key={task.id}
                  onClick={() => onTaskSelect(task.id)}
                  className="flex items-start justify-between gap-2 cursor-pointer hover:bg-surface-raised rounded-[8px] p-2 -m-2 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] truncate">{task.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={`text-[10px] h-4 px-1.5 ${
                          task.priority === 'high'
                            ? 'border-error text-error'
                            : task.priority === 'medium'
                            ? 'border-warning text-warning'
                            : 'border-muted-text text-muted-text'
                        }`}
                      >
                        {task.priority}
                      </Badge>
                      {task.assignedAgent && (
                        <span className="text-[10px] text-muted-text">{task.assignedAgent}</span>
                      )}
                      {!task.assignedAgent && (
                        <span className="text-[10px] text-muted-text">Unassigned</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-text flex-shrink-0 mt-1" />
                </div>
              ))}
              {queuedTasks.length === 0 && (
                <div className="text-[11px] text-muted-text text-center py-4">Queue empty</div>
              )}
            </div>
          </div>

          {/* BLOCKED */}
          <div className="bg-surface rounded-[10px] p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px] flex items-center gap-1.5">
                BLOCKED {blockedTasks.length > 0 && <AlertTriangle className="w-3.5 h-3.5 text-error" />}
              </div>
              {blockedTasks.length > 0 && (
                <Badge variant="destructive" className="bg-error/20 text-error">
                  {blockedTasks.length}
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              {blockedTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => onTaskSelect(task.id)}
                  className="cursor-pointer hover:bg-surface-raised rounded-[8px] p-2 -m-2 transition-colors"
                >
                  <div className="text-[13px] mb-1">{task.title}</div>
                  <div className="text-[11px] text-error mb-2">{task.blockedReason}</div>
                  <Button variant="outline" size="sm" className="w-full h-6 text-[11px] border-error text-error">
                    Provide Input
                  </Button>
                </div>
              ))}
              {blockedTasks.length === 0 && (
                <div className="text-[11px] text-muted-text text-center py-4">No blocked tasks</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Active Work Panel */}
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[16px]">Active Work</div>
          <div className="text-[11px] text-muted-text">{activeAgents.length} agents running</div>
        </div>
        <div className="space-y-3">
          {activeAgents.map(agent => (
            <div
              key={agent.id}
              onClick={() => onAgentSelect(agent.id)}
              className="bg-surface rounded-[10px] p-4 border border-border hover:border-primary-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{agent.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <div className="text-[13px]">{agent.name}</div>
                      <div className="text-[11px] text-muted-text">{agent.role}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px]">
                        Pause
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px]">
                        Kill
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 px-2 text-[11px]">
                        Inspect
                      </Button>
                    </div>
                  </div>
                  {agent.currentTask && (
                    <>
                      <div className="text-[13px] mt-3 mb-1">{agent.currentTask}</div>
                      <div className="text-[11px] text-muted-text mb-2">
                        Latest: Implementing JWT token generation...
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="text-[11px] text-muted-text">
                      ⏱️ {agent.uptime}m running
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-muted-text">
                      <div className="flex items-center gap-1">
                        <Cpu className="w-3 h-3" />
                        {agent.cpuUsage}%
                      </div>
                      <div className="flex items-center gap-1">
                        <MemoryStick className="w-3 h-3" />
                        {agent.ramUsage}%
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {agent.tokenUsage}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Telemetry Bar */}
      <div className="border-t border-border bg-surface-raised p-4">
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="text-[11px] text-muted-text mb-2">CPU Usage</div>
            <div className="flex items-end gap-2">
              <div className="text-[20px]">{systemMetrics.cpuUsage}%</div>
              <div className="flex-1 h-8 flex items-end gap-0.5">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary-accent/20 rounded-t-sm"
                    style={{
                      height: `${Math.random() * 100}%`,
                      opacity: i > 15 ? 1 : 0.3
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-muted-text mb-2">RAM Usage</div>
            <div className="text-[20px] mb-1">
              {systemMetrics.ramUsed}GB / {systemMetrics.ramTotal}GB
            </div>
            <Progress value={(systemMetrics.ramUsed / systemMetrics.ramTotal) * 100} className="h-1.5" />
          </div>
          <div>
            <div className="text-[11px] text-muted-text mb-2">GPU / VRAM</div>
            <div className="text-[20px] mb-1">{systemMetrics.gpuUsage}%</div>
            <div className="text-[11px] text-muted-text">
              {systemMetrics.vramUsed}GB / {systemMetrics.vramTotal}GB VRAM
            </div>
          </div>
          <div>
            <div className="text-[11px] text-muted-text mb-2">System Health</div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px]">Queue Depth</span>
                <span className="text-[13px]">{systemMetrics.queueDepth}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px]">Errors</span>
                <span className={`text-[13px] ${systemMetrics.errorCount > 0 ? 'text-error' : 'text-success'}`}>
                  {systemMetrics.errorCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
