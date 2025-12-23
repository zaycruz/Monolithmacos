import { Activity, Box, Brain, Database, Settings, Target, Zap } from 'lucide-react';
import { Agent, Task, SystemMetrics } from '../lib/mock-data';
import { Badge } from './ui/badge';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  agents: Agent[];
  tasks: Task[];
  systemMetrics: SystemMetrics;
}

export function Sidebar({ currentView, onViewChange, agents, tasks, systemMetrics }: SidebarProps) {
  const activeAgents = agents.filter(a => a.status === 'active').length;
  const queuedTasks = tasks.filter(t => t.status === 'queued').length;
  const blockedTasks = tasks.filter(t => t.status === 'blocked').length;

  const navItems = [
    { id: 'mission-control', label: 'Mission Control', icon: Target },
    { id: 'tasks', label: 'Tasks', icon: Activity },
    { id: 'agents', label: 'Agents', icon: Brain },
    { id: 'traces', label: 'Traces', icon: Zap },
    { id: 'artifacts', label: 'Artifacts', icon: Box },
    { id: 'memory', label: 'Memory', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-60 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Product Title */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="text-[20px] text-primary-accent">AssistantOS</div>
        <div className="text-[11px] text-muted-text mt-1">Connected to MonolithOS</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full px-6 py-2.5 flex items-center gap-3 transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[13px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Status Badges */}
      <div className="px-6 py-4 border-y border-sidebar-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-text">Active Agents</span>
          <Badge variant="secondary" className="bg-primary-accent/20 text-primary-accent border-0 h-5 px-2 text-[11px]">
            {activeAgents}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-text">Queued Tasks</span>
          <Badge variant="secondary" className="bg-warning/20 text-warning border-0 h-5 px-2 text-[11px]">
            {queuedTasks}
          </Badge>
        </div>
        {blockedTasks > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-text">Blocked</span>
            <Badge variant="destructive" className="bg-error/20 text-error border-0 h-5 px-2 text-[11px] gap-1">
              ⚠️ {blockedTasks}
            </Badge>
          </div>
        )}
      </div>

      {/* System Health */}
      <div className="px-6 py-4 space-y-2">
        <div className="text-[11px] text-muted-text mb-3">System Health</div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px]">Kernel</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${
                systemMetrics.kernelStatus === 'connected' ? 'bg-success' : 'bg-error'
              }`} />
              <span className="text-[11px] text-muted-text capitalize">{systemMetrics.kernelStatus}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px]">CPU</span>
            <span className="text-[11px] text-muted-text">{systemMetrics.cpuUsage}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px]">RAM</span>
            <span className="text-[11px] text-muted-text">
              {systemMetrics.ramUsed}GB / {systemMetrics.ramTotal}GB
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px]">GPU</span>
            <span className="text-[11px] text-muted-text">{systemMetrics.gpuUsage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
