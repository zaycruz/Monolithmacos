import { Clock, User } from 'lucide-react';
import { Task } from '../lib/mock-data';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface TasksViewProps {
  tasks: Task[];
  onTaskSelect: (taskId: string) => void;
}

export function TasksView({ tasks, onTaskSelect }: TasksViewProps) {
  const tasksByStatus = {
    running: tasks.filter(t => t.status === 'running'),
    queued: tasks.filter(t => t.status === 'queued'),
    blocked: tasks.filter(t => t.status === 'blocked'),
    completed: tasks.filter(t => t.status === 'completed'),
    failed: tasks.filter(t => t.status === 'failed')
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="text-[20px] mb-2">Tasks Board</div>
          <div className="text-[13px] text-muted-text">{tasks.length} total tasks</div>
        </div>

        {/* Kanban Layout */}
        <div className="grid grid-cols-3 gap-4">
          {/* Running */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px]">Running</div>
              <Badge variant="secondary" className="bg-primary-accent/20 text-primary-accent">
                {tasksByStatus.running.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {tasksByStatus.running.map(task => (
                <div
                  key={task.id}
                  onClick={() => onTaskSelect(task.id)}
                  className="bg-surface rounded-[10px] p-4 border border-border hover:border-primary-accent/50 cursor-pointer transition-colors"
                >
                  <div className="text-[13px] mb-2">{task.title}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className={`text-[10px] h-4 px-1.5 ${
                        task.priority === 'high'
                          ? 'border-error text-error'
                          : task.priority === 'medium'
                          ? 'border-warning text-warning'
                          : ''
                      }`}
                    >
                      {task.priority}
                    </Badge>
                    {task.assignedAgent && (
                      <div className="flex items-center gap-1 text-[11px] text-muted-text">
                        <User className="w-3 h-3" />
                        {task.assignedAgent}
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-muted-text mb-1">
                    Step {task.currentStep} / ~{task.estimatedSteps}
                  </div>
                  <Progress value={task.progress * 100} className="h-1.5" />
                  {task.timeRunning && (
                    <div className="flex items-center gap-1 text-[11px] text-muted-text mt-2">
                      <Clock className="w-3 h-3" />
                      {task.timeRunning}m
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Queued */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px]">Queued</div>
              <Badge variant="secondary" className="bg-warning/20 text-warning">
                {tasksByStatus.queued.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {tasksByStatus.queued.map(task => (
                <div
                  key={task.id}
                  onClick={() => onTaskSelect(task.id)}
                  className="bg-surface rounded-[10px] p-4 border border-border hover:border-primary-accent/50 cursor-pointer transition-colors"
                >
                  <div className="text-[13px] mb-2">{task.title}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={`text-[10px] h-4 px-1.5 ${
                        task.priority === 'high'
                          ? 'border-error text-error'
                          : task.priority === 'medium'
                          ? 'border-warning text-warning'
                          : ''
                      }`}
                    >
                      {task.priority}
                    </Badge>
                    {task.assignedAgent && (
                      <div className="flex items-center gap-1 text-[11px] text-muted-text">
                        <User className="w-3 h-3" />
                        {task.assignedAgent}
                      </div>
                    )}
                  </div>
                  {task.dependencies.length > 0 && (
                    <div className="text-[11px] text-muted-text">
                      Waiting on {task.dependencies.length} task{task.dependencies.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Blocked */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px]">Blocked</div>
              <Badge variant="destructive" className="bg-error/20 text-error">
                {tasksByStatus.blocked.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {tasksByStatus.blocked.map(task => (
                <div
                  key={task.id}
                  onClick={() => onTaskSelect(task.id)}
                  className="bg-surface rounded-[10px] p-4 border border-error/30 hover:border-error/50 cursor-pointer transition-colors"
                >
                  <div className="text-[13px] mb-2">{task.title}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={`text-[10px] h-4 px-1.5 ${
                        task.priority === 'high'
                          ? 'border-error text-error'
                          : task.priority === 'medium'
                          ? 'border-warning text-warning'
                          : ''
                      }`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  {task.blockedReason && (
                    <div className="text-[11px] text-error bg-error/10 rounded p-2">
                      {task.blockedReason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
