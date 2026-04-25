
import React, { useState } from 'react';
import { UserRole } from '../types';
import { Mail, Lock, Chrome, User, HardHat, ShieldBan } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const TABS = [
  { id: UserRole.CUSTOMER, label: 'Customer', icon: User },
  { id: UserRole.WORKER, label: 'Staff', icon: HardHat },
  { id: UserRole.ADMIN, label: 'Admin', icon: ShieldBan },
];

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<UserRole>(UserRole.CUSTOMER);

  const activeTabData = TABS.find(t => t.id === activeTab);
  const ActiveIcon = activeTabData ? activeTabData.icon : User;

  return (
    <div className="w-full max-w-md p-6 animate-slide-up">
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-6xl font-bold tracking-tighter text-slate-900 font-poppins drop-shadow-sm">
          BuildOps<span className="text-blue-600">Nexus</span>
        </h1>
        <p className="text-slate-600 font-medium tracking-tight">Smart Facility Infrastructure Monitoring</p>
      </div>

      <div className="glass rounded-2xl p-1.5 flex gap-1 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:bg-white/20'
            }`}
          >
            <tab.icon size={16} />
            <span className="text-sm font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="glass p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <ActiveIcon size={160} />
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Identity Access</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder={activeTab === UserRole.WORKER ? "Fleet ID Number" : activeTab === UserRole.ADMIN ? "Admin ID" : "Email / Username"}
                className="w-full bg-white/50 border border-white/60 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Secure Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/50 border border-white/60 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={() => onLogin(activeTab)}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all duration-300 neon-glow flex items-center justify-center gap-2"
        >
          Initialize Session
        </button>

        <div className="relative flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-slate-200"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">or</span>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <button className="w-full bg-white/60 border border-white/40 py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-3 font-bold text-slate-700 text-sm">
          <Chrome size={18} className="text-blue-500" />
          Single Sign-On
        </button>
      </div>

      <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-8">
        © 2025 BuildOps Nexus Terminal v4.2.0
      </p>
    </div>
  );
};

export default Login;
