// Mock data for AssistantOS

export type TaskStatus = 'running' | 'queued' | 'blocked' | 'completed' | 'failed';
export type TaskPriority = 'high' | 'medium' | 'low';
export type AgentStatus = 'active' | 'idle' | 'offline';
export type TraceStepType = 'observation' | 'thinking' | 'action' | 'result' | 'error';
export type ArtifactType = 'diff' | 'file' | 'url' | 'data';

export interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  status: AgentStatus;
  currentTask?: string;
  currentTaskId?: string;
  uptime: number; // minutes
  queueLength: number;
  successRate: number;
  cpuUsage: number;
  ramUsage: number;
  tokenUsage: number;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedAgent?: string;
  agentId?: string;
  progress: number;
  currentStep: number;
  estimatedSteps: number;
  timeRunning?: number; // minutes
  dependencies: string[];
  blockedReason?: string;
  artifacts: string[];
}

export interface TraceStep {
  id: string;
  type: TraceStepType;
  timestamp: number;
  content: string;
  toolCall?: {
    name: string;
    args: Record<string, any>;
  };
  output?: string;
  error?: string;
}

export interface Trace {
  id: string;
  taskId: string;
  agentId: string;
  steps: TraceStep[];
  startTime: number;
  status: 'running' | 'completed' | 'failed';
}

export interface Artifact {
  id: string;
  name: string;
  type: ArtifactType;
  taskId: string;
  agentId: string;
  timestamp: number;
  content?: string;
  url?: string;
  diffBefore?: string;
  diffAfter?: string;
}

export interface SystemMetrics {
  cpuUsage: number;
  ramUsed: number;
  ramTotal: number;
  gpuUsage: number;
  vramUsed: number;
  vramTotal: number;
  queueDepth: number;
  errorCount: number;
  kernelStatus: 'connected' | 'disconnected' | 'degraded';
}

export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Architect',
    role: 'System Design',
    model: 'GPT-4',
    status: 'active',
    currentTask: 'Implementing authentication flow',
    currentTaskId: 'task-1',
    uptime: 142,
    queueLength: 2,
    successRate: 0.94,
    cpuUsage: 45,
    ramUsage: 28,
    tokenUsage: 1847,
    avatar: '🏗️'
  },
  {
    id: 'agent-2',
    name: 'Researcher',
    role: 'Data Analysis',
    model: 'Claude 3.5',
    status: 'active',
    currentTask: 'Analyzing user feedback patterns',
    currentTaskId: 'task-2',
    uptime: 89,
    queueLength: 3,
    successRate: 0.98,
    cpuUsage: 62,
    ramUsage: 31,
    tokenUsage: 2934,
    avatar: '🔬'
  },
  {
    id: 'agent-3',
    name: 'Optimizer',
    role: 'Performance',
    model: 'GPT-4',
    status: 'idle',
    uptime: 203,
    queueLength: 0,
    successRate: 0.91,
    cpuUsage: 8,
    ramUsage: 12,
    tokenUsage: 456,
    avatar: '⚡'
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Implementing authentication flow',
    status: 'running',
    priority: 'high',
    assignedAgent: 'Architect',
    agentId: 'agent-1',
    progress: 0.48,
    currentStep: 6,
    estimatedSteps: 12,
    timeRunning: 23,
    dependencies: [],
    artifacts: ['artifact-1', 'artifact-2']
  },
  {
    id: 'task-2',
    title: 'Analyzing user feedback patterns',
    status: 'running',
    priority: 'medium',
    assignedAgent: 'Researcher',
    agentId: 'agent-2',
    progress: 0.72,
    currentStep: 8,
    estimatedSteps: 11,
    timeRunning: 18,
    dependencies: [],
    artifacts: ['artifact-3']
  },
  {
    id: 'task-3',
    title: 'Optimize database queries',
    status: 'queued',
    priority: 'high',
    assignedAgent: 'Optimizer',
    agentId: 'agent-3',
    progress: 0,
    currentStep: 0,
    estimatedSteps: 8,
    dependencies: ['task-1'],
    artifacts: []
  },
  {
    id: 'task-4',
    title: 'Generate API documentation',
    status: 'queued',
    priority: 'medium',
    progress: 0,
    currentStep: 0,
    estimatedSteps: 5,
    dependencies: [],
    artifacts: []
  },
  {
    id: 'task-5',
    title: 'Setup CI/CD pipeline',
    status: 'queued',
    priority: 'low',
    progress: 0,
    currentStep: 0,
    estimatedSteps: 10,
    dependencies: ['task-1', 'task-3'],
    artifacts: []
  },
  {
    id: 'task-6',
    title: 'Configure production environment',
    status: 'blocked',
    priority: 'high',
    progress: 0.15,
    currentStep: 2,
    estimatedSteps: 15,
    dependencies: [],
    blockedReason: 'Awaiting API credentials from DevOps',
    artifacts: []
  }
];

export const mockTraces: Trace[] = [
  {
    id: 'trace-1',
    taskId: 'task-1',
    agentId: 'agent-1',
    startTime: Date.now() - 23 * 60 * 1000,
    status: 'running',
    steps: [
      {
        id: 'step-1',
        type: 'observation',
        timestamp: Date.now() - 23 * 60 * 1000,
        content: 'Task assigned: Implementing authentication flow. Analyzing requirements...'
      },
      {
        id: 'step-2',
        type: 'thinking',
        timestamp: Date.now() - 22 * 60 * 1000,
        content: 'Need to implement JWT-based authentication with refresh tokens. Will use industry standard practices and ensure secure token storage.'
      },
      {
        id: 'step-3',
        type: 'action',
        timestamp: Date.now() - 21 * 60 * 1000,
        content: 'Creating authentication service module',
        toolCall: {
          name: 'create_file',
          args: { path: 'src/services/auth.ts', content: '...' }
        },
        output: 'File created successfully'
      },
      {
        id: 'step-4',
        type: 'action',
        timestamp: Date.now() - 18 * 60 * 1000,
        content: 'Implementing JWT token generation',
        toolCall: {
          name: 'write_code',
          args: { function: 'generateToken', language: 'typescript' }
        },
        output: 'Function implemented with proper type safety'
      },
      {
        id: 'step-5',
        type: 'observation',
        timestamp: Date.now() - 15 * 60 * 1000,
        content: 'Token generation complete. Moving to refresh token logic...'
      },
      {
        id: 'step-6',
        type: 'thinking',
        timestamp: Date.now() - 12 * 60 * 1000,
        content: 'Refresh tokens should be stored in httpOnly cookies for security. Need to implement rotation strategy.'
      },
      {
        id: 'step-7',
        type: 'action',
        timestamp: Date.now() - 10 * 60 * 1000,
        content: 'Setting up refresh token endpoint',
        toolCall: {
          name: 'create_endpoint',
          args: { path: '/api/auth/refresh', method: 'POST' }
        },
        output: 'Endpoint configured with proper middleware'
      },
      {
        id: 'step-8',
        type: 'result',
        timestamp: Date.now() - 5 * 60 * 1000,
        content: 'Authentication flow 60% complete. Core token logic implemented. Next: password hashing and user validation.'
      }
    ]
  }
];

export const mockArtifacts: Artifact[] = [
  {
    id: 'artifact-1',
    name: 'auth.ts',
    type: 'file',
    taskId: 'task-1',
    agentId: 'agent-1',
    timestamp: Date.now() - 21 * 60 * 1000,
    content: `import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};`
  },
  {
    id: 'artifact-2',
    name: 'API Route Changes',
    type: 'diff',
    taskId: 'task-1',
    agentId: 'agent-1',
    timestamp: Date.now() - 10 * 60 * 1000,
    diffBefore: `app.post('/login', (req, res) => {
  // TODO: Implement
  res.json({ success: false });
});`,
    diffAfter: `app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  
  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.json({ token, user });
});`
  },
  {
    id: 'artifact-3',
    name: 'User Feedback Report',
    type: 'url',
    taskId: 'task-2',
    agentId: 'agent-2',
    timestamp: Date.now() - 8 * 60 * 1000,
    url: 'https://docs.internal/reports/feedback-analysis-2024-q4'
  }
];

export const mockSystemMetrics: SystemMetrics = {
  cpuUsage: 42,
  ramUsed: 38,
  ramTotal: 64,
  gpuUsage: 61,
  vramUsed: 14,
  vramTotal: 24,
  queueDepth: 3,
  errorCount: 0,
  kernelStatus: 'connected'
};
