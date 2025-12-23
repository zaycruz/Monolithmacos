import { AlertCircle, Pause, RefreshCw, Trash2, User } from 'lucide-react';
import { Task, Agent, TraceStep } from '../lib/mock-data';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface InspectorProps {
  type: 'task' | 'agent' | 'step' | null;
  data: Task | Agent | TraceStep | null;
}

export function Inspector({ type, data }: InspectorProps) {
  if (!type || !data) {
    return (
      <div className="w-80 bg-surface border-l border-border flex items-center justify-center">
        <div className="text-center text-muted-text text-[13px]">
          <div className="mb-2">Select something to inspect</div>
          <div className="text-[11px]">Click on a task, agent, or trace step</div>
        </div>
      </div>
    );
  }

  if (type === 'task') {
    const task = data as Task;
    return (
      <div className="w-80 bg-surface border-l border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="text-[11px] text-muted-text mb-2">TASK INSPECTOR</div>
          <div className="text-[16px]">{task.title}</div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Summary */}
          <div className="space-y-3">
            <div className="text-[11px] text-muted-text">SUMMARY</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px]">Status</span>
                <Badge
                  variant={task.status === 'running' ? 'default' : 'secondary'}
                  className={
                    task.status === 'blocked'
                      ? 'bg-error/20 text-error'
                      : task.status === 'completed'
                      ? 'bg-success/20 text-success'
                      : ''
                  }
                >
                  {task.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px]">Priority</span>
                <Badge
                  variant="outline"
                  className={
                    task.priority === 'high'
                      ? 'border-error text-error'
                      : task.priority === 'medium'
                      ? 'border-warning text-warning'
                      : 'border-muted-text text-muted-text'
                  }
                >
                  {task.priority}
                </Badge>
              </div>
              {task.assignedAgent && (
                <div className="flex items-center justify-between">
                  <span className="text-[13px]">Agent</span>
                  <span className="text-[13px] text-primary-accent">{task.assignedAgent}</span>
                </div>
              )}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-muted-text">Progress</span>
                  <span className="text-[11px] text-muted-text">
                    Step {task.currentStep} / ~{task.estimatedSteps}
                  </span>
                </div>
                <Progress value={task.progress * 100} className="h-1.5" />
              </div>
            </div>
          </div>

          {/* Blocked Reason */}
          {task.blockedReason && (
            <div className="space-y-2">
              <div className="text-[11px] text-muted-text">BLOCKED REASON</div>
              <div className="bg-error/10 border border-error/30 rounded-lg p-3 flex gap-2">
                <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
                <span className="text-[13px] text-error">{task.blockedReason}</span>
              </div>
            </div>
          )}

          {/* Dependencies */}
          {task.dependencies.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] text-muted-text">DEPENDENCIES</div>
              <div className="space-y-1">
                {task.dependencies.map(dep => (
                  <div key={dep} className="text-[13px] bg-surface-raised rounded px-2 py-1.5 border border-border">
                    {dep}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artifacts */}
          {task.artifacts.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] text-muted-text">ARTIFACTS</div>
              <div className="space-y-1">
                {task.artifacts.map(artifact => (
                  <div
                    key={artifact}
                    className="text-[13px] bg-surface-raised rounded px-2 py-1.5 border border-border flex items-center justify-between"
                  >
                    <span>{artifact}</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px]">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2" size="sm">
            <Pause className="w-4 h-4" />
            Pause Task
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" size="sm">
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" size="sm">
            <User className="w-4 h-4" />
            Reassign
          </Button>
          <Button variant="destructive" className="w-full justify-start gap-2" size="sm">
            <Trash2 className="w-4 h-4" />
            Kill Task
          </Button>
        </div>
      </div>
    );
  }

  if (type === 'agent') {
    const agent = data as Agent;
    return (
      <div className="w-80 bg-surface border-l border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="text-[11px] text-muted-text mb-2">AGENT INSPECTOR</div>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{agent.avatar}</div>
            <div>
              <div className="text-[16px]">{agent.name}</div>
              <div className="text-[11px] text-muted-text">{agent.role}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px]">Model</span>
              <span className="text-[13px] text-muted-text">{agent.model}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px]">Status</span>
              <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                {agent.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px]">Uptime</span>
              <span className="text-[13px] text-muted-text">{agent.uptime}m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px]">Queue Length</span>
              <span className="text-[13px] text-muted-text">{agent.queueLength}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px]">Success Rate</span>
              <span className="text-[13px] text-success">{(agent.successRate * 100).toFixed(0)}%</span>
            </div>
          </div>

          {agent.currentTask && (
            <div className="space-y-2">
              <div className="text-[11px] text-muted-text">CURRENT TASK</div>
              <div className="bg-surface-raised rounded-lg p-3 border border-border">
                <div className="text-[13px]">{agent.currentTask}</div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-[11px] text-muted-text">RESOURCE USAGE</div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>CPU</span>
                  <span className="text-muted-text">{agent.cpuUsage}%</span>
                </div>
                <Progress value={agent.cpuUsage} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>RAM</span>
                  <span className="text-muted-text">{agent.ramUsage}%</span>
                </div>
                <Progress value={agent.ramUsage} className="h-1.5" />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px]">Tokens Used</span>
                <span className="text-[11px] text-muted-text">{agent.tokenUsage.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2" size="sm">
            <Pause className="w-4 h-4" />
            Pause Agent
          </Button>
          <Button variant="destructive" className="w-full justify-start gap-2" size="sm">
            <Trash2 className="w-4 h-4" />
            Terminate Agent
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
