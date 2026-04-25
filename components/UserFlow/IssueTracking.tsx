
import React from 'react';
import { Issue } from '../../types';
import { CheckCircle2, Clock, Wrench, ShieldCheck, MapPin, ArrowLeft } from 'lucide-react';

interface IssueTrackingProps {
  issue: Issue;
  onClose: () => void;
}

const IssueTracking: React.FC<IssueTrackingProps> = ({ issue, onClose }) => {
  const steps = [
    { 
      id: 'PENDING', 
      label: 'Broadcast Received', 
      desc: 'Signal integrated into Nexus fleet.',
      icon: Clock,
      isActive: true,
      isCompleted: issue.status !== 'PENDING'
    },
    { 
      id: 'IN_PROGRESS', 
      label: 'Staff Dispatched', 
      desc: 'Unit 402 investigating spatial node.',
      icon: Wrench,
      isActive: issue.status === 'IN_PROGRESS' || issue.status === 'RESOLVED',
      isCompleted: issue.status === 'RESOLVED'
    },
    { 
      id: 'RESOLVED', 
      label: 'Node Optimized', 
      desc: 'Structural integrity fully restored.',
      icon: ShieldCheck,
      isActive: issue.status === 'RESOLVED',
      isCompleted: issue.status === 'RESOLVED'
    }
  ];

  return (
    <div className="w-full max-w-lg px-4 space-y-8 animate-slide-up">
      <div className="flex items-center gap-4">
        <button onClick={onClose} className="glass p-3 rounded-xl hover:bg-white transition-colors">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">Real-Time Tracker</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Instance ID: <span className="text-blue-600">#{issue.id}</span></p>
        </div>
      </div>

      <div className="glass p-8 rounded-2xl shadow-2xl space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="flex items-start justify-between border-b border-white/40 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Class</span>
            <div className="flex items-center gap-2 text-lg font-bold text-slate-800">
               <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-400/50" />
               {issue.category}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
              <MapPin size={10} /> {issue.floor} • {issue.block}
            </div>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
            issue.status === 'RESOLVED' ? 'bg-emerald-500 text-white' :
            issue.status === 'IN_PROGRESS' ? 'bg-amber-400 text-slate-900' :
            'bg-slate-900 text-white'
          }`}>
            {issue.status.replace('_', ' ')}
          </div>
        </div>

        <div className="relative space-y-10">
          <div className="absolute left-[23px] top-6 bottom-6 w-px bg-slate-200" />

          {steps.map((step) => (
            <div key={step.id} className="relative flex items-start gap-6">
              <div className={`
                relative z-10 w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-500 border-2
                ${step.isCompleted ? 'bg-emerald-500 text-white border-white' : 
                  step.isActive ? 'bg-blue-600 text-white border-white scale-110 shadow-lg' : 
                  'bg-slate-100 text-slate-300 border-slate-50'}
              `}>
                {step.isCompleted ? <CheckCircle2 size={24} /> : <step.icon size={18} className={step.isActive ? 'animate-pulse' : ''} />}
              </div>
              <div className="space-y-0.5 pt-1.5 flex-1">
                <h4 className={`text-sm font-bold tracking-tight uppercase ${step.isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.label}
                </h4>
                <p className={`text-xs font-medium ${step.isActive ? 'text-slate-500' : 'text-slate-300'}`}>
                  {step.desc}
                </p>
                {step.id === 'RESOLVED' && issue.status === 'RESOLVED' && issue.logs && (
                  <div className="mt-4 p-4 glass rounded-xl border-emerald-100 bg-emerald-50/40 animate-slide-up">
                    <p className="text-[9px] font-black text-emerald-600 uppercase mb-1 tracking-widest">Staff Ledger</p>
                    <p className="text-xs text-slate-700 italic font-medium leading-relaxed">"{issue.logs}"</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full glass py-4 rounded-xl text-slate-700 font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-md"
        >
          Return to Hub
        </button>
      </div>

      <p className="text-center text-slate-400 text-[9px] font-bold uppercase tracking-[0.3em]">
        End-to-End Encryption Enabled
      </p>
    </div>
  );
};

export default IssueTracking;
