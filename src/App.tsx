import { useState, useEffect } from 'react';
import './index.css';

interface Task {
  id: string;
  name: string;
  status: 'Todo' | 'In Progress' | 'Done' | 'Review' | 'No Status';
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  project: string;
  dueDate?: string;
}

const SAMPLE_TASKS: Task[] = [
  { id: '1', name: 'Review grant application', status: 'In Progress', priority: 'P1', project: 'Oilyburger', dueDate: '2026-02-19' },
  { id: '2', name: 'Fix heartbeat automation', status: 'Todo', priority: 'P0', project: 'Woojoosnt', dueDate: '2026-02-18' },
  { id: '3', name: 'Ark Academy landing page', status: 'Todo', priority: 'P1', project: 'Ark Academy', dueDate: '2026-02-20' },
  { id: '4', name: 'Client proposal draft', status: 'Review', priority: 'P2', project: 'Woojoosnt' },
  { id: '5', name: 'Update Notion templates', status: 'Done', priority: 'P2', project: 'Ops' },
  { id: '6', name: 'Team sync preparation', status: 'Todo', priority: 'P3', project: 'Ark Academy', dueDate: '2026-02-21' },
  { id: '7', name: 'API integration test', status: 'In Progress', priority: 'P1', project: 'Woojoosnt' },
  { id: '8', name: 'Documentation update', status: 'Todo', priority: 'P3', project: 'Ops' },
];

const priorityColors = {
  P0: 'bg-rose-500 shadow-rose-500/50',
  P1: 'bg-amber-500 shadow-amber-500/50',
  P2: 'bg-emerald-500 shadow-emerald-500/50',
  P3: 'bg-slate-500 shadow-slate-500/50',
};

const statusIcons = {
  'Todo': '○',
  'In Progress': '◐',
  'Review': '◑',
  'Done': '●',
  'No Status': '○',
};

function OrbitRing({ radius, tasks, offset = 0 }: { radius: number; tasks: Task[]; offset?: number }) {
  return (
    <div 
      className="absolute rounded-full border border-white/5"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {tasks.map((task, i) => {
        const angle = ((360 / tasks.length) * i + offset) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <div
            key={task.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 hover:scale-110`}
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
          >
            <div className={`w-4 h-4 rounded-full ${priorityColors[task.priority]} shadow-lg animate-pulse-glow`} />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <div className="glass-strong px-3 py-2 rounded-lg whitespace-nowrap">
                <p className="text-xs font-semibold text-white">{task.name}</p>
                <p className="text-[10px] text-white/60">{task.project} • {task.status}</p>
                {task.dueDate && <p className="text-[10px] text-amber-400">Due: {task.dueDate}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [tasks] = useState<Task[]>(SAMPLE_TASKS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'P0' | 'P1' | 'P2' | 'P3'>('all');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredTasks = selectedFilter === 'all' ? tasks : tasks.filter(t => t.priority === selectedFilter);
  
  const p0Tasks = filteredTasks.filter(t => t.priority === 'P0');
  const p1Tasks = filteredTasks.filter(t => t.priority === 'P1');
  const p2Tasks = filteredTasks.filter(t => t.priority === 'P2');
  const p3Tasks = filteredTasks.filter(t => t.priority === 'P3');

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'Done').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date()).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 overflow-hidden relative">
      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Orbital Command
          </h1>
          <p className="text-white/50 text-sm mt-1">Notion Tasks Visualizer</p>
        </div>
        <div className="glass px-4 py-2 rounded-xl text-right">
          <p className="text-2xl font-mono font-bold">{time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-white/50 text-xs">{time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
        </div>
      </header>

      {/* Main orbit visualization */}
      <main className="relative z-10 flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="relative flex items-center justify-center">
          {/* Orbit rings */}
          <OrbitRing radius={300} tasks={p3Tasks} offset={270} />
          <OrbitRing radius={240} tasks={p2Tasks} offset={180} />
          <OrbitRing radius={180} tasks={p1Tasks} offset={90} />
          <OrbitRing radius={120} tasks={p0Tasks} offset={0} />
          
          {/* Center - David's focus */}
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse-glow flex items-center justify-center animate-float">
            <div className="text-center">
              <span className="text-2xl">🎯</span>
              <p className="text-[10px] font-bold text-white mt-0.5">FOCUS</p>
            </div>
          </div>
        </div>
      </main>

      {/* Stats bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-20">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            {/* Filter tabs */}
            <div className="flex gap-2">
              {(['all', 'P0', 'P1', 'P2', 'P3'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedFilter === filter 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/5 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {filter === 'all' ? 'ALL' : filter}
                  <span className="ml-1.5 text-[10px] opacity-60">
                    ({filter === 'all' ? tasks.length : tasks.filter(t => t.priority === filter).length})
                  </span>
                </button>
              ))}
            </div>

            {/* Quick stats */}
            <div className="flex gap-6 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">{stats.done}</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Done</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-400">{stats.inProgress}</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Active</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-rose-400">{stats.overdue}</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Overdue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Total</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-3 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-white/60">P0 Critical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-white/60">P1 High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-white/60">P2 Normal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-500" />
                <span className="text-white/60">P3 Low</span>
              </div>
            </div>
          </div>

          {/* Task list preview */}
          <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-4 gap-3">
            {filteredTasks.slice(0, 8).map(task => (
              <div key={task.id} className="glass px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-xs">{statusIcons[task.status]}</span>
                <span className="text-xs truncate flex-1">{task.name}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${priorityColors[task.priority].split(' ')[0]}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;