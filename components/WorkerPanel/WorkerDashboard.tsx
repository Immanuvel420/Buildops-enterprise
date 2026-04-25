
import React, { useState } from 'react';
import { Issue } from '../../types';
import { Play, CheckCircle, Camera, Clock, MapPin, Wrench } from 'lucide-react';

interface WorkerDashboardProps {
  issues: Issue[];
  onUpdateIssue: (issue: Issue) => void;
}

const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ issues, onUpdateIssue }) => {
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);
  const [resolutionLog, setResolutionLog] = useState('');
  const [afterImage, setAfterImage] = useState<string | null>(null);

  const startWork = (id: string) => {
    const issue = issues.find(i => i.id === id);
    if (issue) {
      onUpdateIssue({ ...issue, status: 'IN_PROGRESS' });
      setActiveIssueId(id);
    }
  };

  const finalizeIssue = () => {
    const issue = issues.find(i => i.id === activeIssueId);
    if (issue) {
      onUpdateIssue({ 
        ...issue, 
        status: 'RESOLVED', 
        logs: resolutionLog, 
        resolvedImageUrl: afterImage || undefined 
      });
      setActiveIssueId(null);
      setResolutionLog('');
      setAfterImage(null);
    }
  };

  return (
    <div className="w-full max-w-5xl space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-8 rounded-[2rem]">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-poppins">Fleet Staff Terminal</h2>
          <p className="text-slate-500">Assigned maintenance backlog for current rotation</p>
        </div>
        <div className="flex gap-4">
           <div className="text-center px-6 py-3 glass rounded-2xl bg-white/40">
              <p className="text-xs font-bold text-slate-400 uppercase">Pending</p>
              <p className="text-2xl font-bold text-slate-800">{issues.filter(i => i.status === 'PENDING').length}</p>
           </div>
           <div className="text-center px-6 py-3 glass rounded-2xl bg-white/40">
              <p className="text-xs font-bold text-slate-400 uppercase">Resolved</p>
              <p className="text-2xl font-bold text-emerald-500">{issues.filter(i => i.status === 'RESOLVED').length}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-2">Active Queue</h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto hide-scrollbar pr-2">
            {issues.filter(i => i.status !== 'RESOLVED').map(issue => (
              <div key={issue.id} className={`glass p-6 rounded-3xl transition-all duration-500 ${activeIssueId === issue.id ? 'ring-2 ring-violet-500 scale-[1.02] shadow-xl' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      issue.category === 'Electrical' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {issue.category}
                    </span>
                    <h4 className="text-lg font-bold text-slate-800 mt-2">{issue.description}</h4>
                  </div>
                  <Clock size={16} className="text-slate-300" />
                </div>
                
                <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                    <MapPin size={14} />
                    {issue.floor} • {issue.block}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {issue.status === 'PENDING' ? (
                    <button 
                      onClick={() => startWork(issue.id)}
                      className="flex-1 bg-violet-600 text-white font-bold py-3 rounded-2xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={16} /> Start Work
                    </button>
                  ) : (
                    <div className="flex-1 bg-emerald-100 text-emerald-700 font-bold py-3 rounded-2xl flex items-center justify-center gap-2">
                      <Wrench size={16} /> In Progress
                    </div>
                  )}
                  {issue.imageUrl && (
                    <img src={issue.imageUrl} className="w-12 h-12 rounded-xl object-cover" alt="issue" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-2">Resolution Node</h3>
          {activeIssueId ? (
            <div className="glass p-8 rounded-[2rem] shadow-2xl space-y-6 animate-in slide-in-from-right-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Documentation</label>
                <textarea 
                  placeholder="Mechanical Resolution Logs..."
                  rows={6}
                  value={resolutionLog}
                  onChange={(e) => setResolutionLog(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium text-slate-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Resolution Proof</label>
                <div 
                  className="aspect-video bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors overflow-hidden"
                  onClick={() => {/* Mock camera trigger */ setAfterImage('https://picsum.photos/seed/resolve/400/300')}}
                >
                  {afterImage ? (
                    <img src={afterImage} className="w-full h-full object-cover" alt="resolved" />
                  ) : (
                    <>
                      <Camera className="text-slate-400" size={32} />
                      <p className="text-xs font-bold text-slate-400 mt-2">Upload After-Work Proof</p>
                    </>
                  )}
                </div>
              </div>

              <button 
                onClick={finalizeIssue}
                className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
              >
                <CheckCircle size={20} /> Finalize & Resolve
              </button>
            </div>
          ) : (
            <div className="glass h-[400px] rounded-[2rem] flex flex-col items-center justify-center text-slate-400 border-dashed border-2">
              <Wrench size={48} className="mb-4 opacity-30" />
              <p className="font-bold">Select a node from queue to begin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
