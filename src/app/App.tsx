import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Console } from './components/Console';
import { Inspector } from './components/Inspector';
import { MissionControl } from './components/MissionControl';
import { TraceViewer } from './components/TraceViewer';
import { ArtifactsViewer } from './components/ArtifactsViewer';
import { TasksView } from './components/TasksView';
import { AgentsView } from './components/AgentsView';
import { MemoryView } from './components/MemoryView';
import { SettingsView } from './components/SettingsView';
import {
  mockAgents,
  mockTasks,
  mockTraces,
  mockArtifacts,
  mockSystemMetrics,
  Task,
  Agent,
  TraceStep
} from './lib/mock-data';

type ViewType =
  | 'mission-control'
  | 'tasks'
  | 'agents'
  | 'traces'
  | 'artifacts'
  | 'memory'
  | 'settings';

type InspectorType = 'task' | 'agent' | 'step' | null;

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('mission-control');
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);
  const [inspectorType, setInspectorType] = useState<InspectorType>(null);
  const [inspectorData, setInspectorData] = useState<Task | Agent | TraceStep | null>(null);

  // Apply dark class to html element
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleTaskSelect = (taskId: string) => {
    const task = mockTasks.find(t => t.id === taskId);
    if (task) {
      setInspectorType('task');
      setInspectorData(task);
    }
  };

  const handleAgentSelect = (agentId: string) => {
    const agent = mockAgents.find(a => a.id === agentId);
    if (agent) {
      setInspectorType('agent');
      setInspectorData(agent);
    }
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view as ViewType);
    // Clear inspector when changing views
    if (view !== 'mission-control') {
      setInspectorType(null);
      setInspectorData(null);
    }
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'mission-control':
        return (
          <MissionControl
            agents={mockAgents}
            tasks={mockTasks}
            systemMetrics={mockSystemMetrics}
            onTaskSelect={handleTaskSelect}
            onAgentSelect={handleAgentSelect}
          />
        );
      case 'tasks':
        return <TasksView tasks={mockTasks} onTaskSelect={handleTaskSelect} />;
      case 'agents':
        return <AgentsView agents={mockAgents} onAgentSelect={handleAgentSelect} />;
      case 'traces':
        return (
          <TraceViewer
            trace={mockTraces[0]}
            onClose={() => setCurrentView('mission-control')}
          />
        );
      case 'artifacts':
        return (
          <ArtifactsViewer
            artifacts={mockArtifacts}
            onClose={() => setCurrentView('mission-control')}
          />
        );
      case 'memory':
        return <MemoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <MissionControl
            agents={mockAgents}
            tasks={mockTasks}
            systemMetrics={mockSystemMetrics}
            onTaskSelect={handleTaskSelect}
            onAgentSelect={handleAgentSelect}
          />
        );
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Main Layout: Sidebar + Content + Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onViewChange={handleViewChange}
          agents={mockAgents}
          tasks={mockTasks}
          systemMetrics={mockSystemMetrics}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {renderMainContent()}

          {/* Inspector Panel (only shown on mission-control) */}
          {currentView === 'mission-control' && (
            <Inspector type={inspectorType} data={inspectorData} />
          )}
        </div>
      </div>

      {/* Console (Docked at Bottom) */}
      <Console
        isCollapsed={isConsoleCollapsed}
        onToggleCollapse={() => setIsConsoleCollapsed(!isConsoleCollapsed)}
        onTaskSelect={handleTaskSelect}
      />
    </div>
  );
}
