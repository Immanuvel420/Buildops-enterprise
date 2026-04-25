
import React, { useState, useEffect } from 'react';
import { UserRole, ViewState, Issue, BuildingState } from './types';
import Login from './components/Login';
import FloorSelector from './components/UserFlow/FloorSelector';
import BlockSelector from './components/UserFlow/BlockSelector';
import IssueReport from './components/UserFlow/IssueReport';
import IssueTracking from './components/UserFlow/IssueTracking';
import WorkerDashboard from './components/WorkerPanel/WorkerDashboard';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import { Layout } from './components/Layout';
import { ShieldCheck, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [view, setView] = useState<ViewState>('LOGIN');
  const [buildingState, setBuildingState] = useState<BuildingState>({});
  const [issues, setIssues] = useState<Issue[]>([]);
  const [trackingIssueId, setTrackingIssueId] = useState<string | null>(null);

  // Sample data initialization
  useEffect(() => {
    const mockIssues: Issue[] = [
      {
        id: '1',
        floor: 'Ground Floor',
        block: 'A Block',
        category: 'Electrical',
        description: 'Fluctuating voltage in corridor lighting.',
        status: 'PENDING',
        imageUrl: 'https://picsum.photos/seed/elec/400/300',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        floor: '2nd Floor',
        block: 'Common Washroom',
        category: 'Plumbing',
        description: 'Leak detected in main supply line.',
        status: 'IN_PROGRESS',
        imageUrl: 'https://picsum.photos/seed/water/400/300',
        timestamp: new Date().toISOString()
      }
    ];
    setIssues(mockIssues);
  }, []);

  const handleLogin = (userRole: UserRole) => {
    setRole(userRole);
    if (userRole === UserRole.CUSTOMER) setView('FLOOR_SELECTOR');
    else setView('DASHBOARD');
  };

  const logout = () => {
    setRole(null);
    setView('LOGIN');
    setBuildingState({});
    setTrackingIssueId(null);
  };

  const addIssue = (newIssue: Issue) => {
    setIssues(prev => [newIssue, ...prev]);
    setTrackingIssueId(newIssue.id);
    setView('ISSUE_TRACKING');
  };

  const updateIssue = (updatedIssue: Issue) => {
    setIssues(prev => prev.map(i => i.id === updatedIssue.id ? updatedIssue : i));
  };

  return (
    <Layout>
      {role && (
        <div className="fixed top-6 right-6 z-50 flex gap-2">
           <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
             <ShieldCheck size={16} className="text-violet-600" />
             <span className="capitalize">{role.toLowerCase()} Mode</span>
           </div>
           <button 
            onClick={logout}
            className="glass p-2 rounded-full hover:bg-white/40 transition-colors"
           >
             <LogOut size={16} className="text-red-500" />
           </button>
        </div>
      )}

      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        {view === 'LOGIN' && <Login onLogin={handleLogin} />}

        {view === 'FLOOR_SELECTOR' && (
          <FloorSelector 
            onSelect={(floor) => {
              setBuildingState({ ...buildingState, selectedFloor: floor });
              setView('BLOCK_SELECTOR');
            }} 
          />
        )}

        {view === 'BLOCK_SELECTOR' && (
          <BlockSelector 
            floor={buildingState.selectedFloor!}
            onSelect={(block) => {
              setBuildingState({ ...buildingState, selectedBlock: block });
              setView('ISSUE_REPORT');
            }}
            onBack={() => setView('FLOOR_SELECTOR')}
          />
        )}

        {view === 'ISSUE_REPORT' && (
          <IssueReport 
            floor={buildingState.selectedFloor!}
            block={buildingState.selectedBlock!}
            onSubmit={addIssue}
            onCancel={() => setView('BLOCK_SELECTOR')}
          />
        )}

        {view === 'ISSUE_TRACKING' && trackingIssueId && (
          <IssueTracking 
            issue={issues.find(i => i.id === trackingIssueId)!} 
            onClose={() => setView('FLOOR_SELECTOR')}
          />
        )}

        {view === 'DASHBOARD' && role === UserRole.WORKER && (
          <WorkerDashboard issues={issues} onUpdateIssue={updateIssue} />
        )}

        {view === 'DASHBOARD' && role === UserRole.ADMIN && (
          <AdminDashboard issues={issues} />
        )}
      </main>
    </Layout>
  );
};

export default App;
