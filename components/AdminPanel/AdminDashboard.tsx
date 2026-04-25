
import React, { useState } from 'react';
import { Issue } from '../../types';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Activity, ShieldAlert, Zap, TrendingUp, Clock, Table as TableIcon, LayoutDashboard, Search } from 'lucide-react';

interface AdminDashboardProps {
  issues: Issue[];
}

const COLORS = ['#7c3aed', '#38bdf8', '#fbbf24', '#f472b6', '#4ade80'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ issues }) => {
  const [activeTab, setActiveTab] = useState<'INSIGHTS' | 'LEDGER'>('INSIGHTS');

  // Chart Data preparation
  const categoryData = [
    { name: 'Electrical', value: issues.filter(i => i.category === 'Electrical').length },
    { name: 'Water', value: issues.filter(i => i.category === 'Water').length },
    { name: 'Plumbing', value: issues.filter(i => i.category === 'Plumbing').length },
    { name: 'Cleaning', value: issues.filter(i => i.category === 'Cleaning').length },
    { name: 'Structural', value: issues.filter(i => i.category === 'Structural').length },
  ];

  const trendData = [
    { time: '08:00', incidents: 2, resolved: 1 },
    { time: '10:00', incidents: 5, resolved: 2 },
    { time: '12:00', incidents: 3, resolved: 4 },
    { time: '14:00', incidents: 7, resolved: 3 },
    { time: '16:00', incidents: 4, resolved: 5 },
    { time: '18:00', incidents: 2, resolved: 3 },
  ];

  const mttrData = [
    { floor: 'Ground', mttr: 45 },
    { floor: '1st', mttr: 32 },
    { floor: '2nd', mttr: 65 },
    { floor: '3rd', mttr: 28 },
    { floor: '4th', mttr: 50 },
  ];

  return (
    <div className="w-full max-w-7xl space-y-8 animate-in fade-in zoom-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 blur-[80px] -mr-32 -mt-32 rounded-full" />
        <div className="space-y-2 relative z-10">
          <h1 className="text-4xl font-bold text-slate-900 font-poppins tracking-tight">Admin Command Center</h1>
          <p className="text-slate-500 font-medium">Enterprise Lifecycle & Asset Health Intelligence</p>
        </div>
        <div className="flex gap-2 glass p-1.5 rounded-2xl bg-white/40 relative z-10">
          <button 
            onClick={() => setActiveTab('INSIGHTS')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold ${
              activeTab === 'INSIGHTS' ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:bg-white/50'
            }`}
          >
            <LayoutDashboard size={18} /> Insights Hub
          </button>
          <button 
            onClick={() => setActiveTab('LEDGER')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold ${
              activeTab === 'LEDGER' ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:bg-white/50'
            }`}
          >
            <TableIcon size={18} /> Asset Ledger
          </button>
        </div>
      </header>

      {activeTab === 'INSIGHTS' ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Active Reports', val: issues.length, icon: ShieldAlert, col: 'text-rose-500' },
              { label: 'Fleet Latency', val: '12ms', icon: Zap, col: 'text-amber-500' },
              { label: 'MTTR Rate', val: '42m', icon: Clock, col: 'text-blue-500' },
              { label: 'Asset Health', val: '98.4%', icon: Activity, col: 'text-emerald-500' },
            ].map((stat, i) => (
              <div key={i} className="glass p-6 rounded-3xl hover:-translate-y-1 transition-transform">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-white shadow-sm ${stat.col}`}>
                    <stat.icon size={24} />
                  </div>
                  <TrendingUp size={16} className="text-emerald-500" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stat.val}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] shadow-xl space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Operational Pulse</h3>
                <div className="flex gap-2">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-violet-500" /> Incidents</span>
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-sky-400" /> Resolved</span>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="incidents" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorInc)" />
                    <Area type="monotone" dataKey="resolved" stroke="#38bdf8" strokeWidth={3} fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-slate-800">Asset Failure Mix</h3>
              <div className="h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="text-center">
                     <p className="text-2xl font-black text-slate-800">{issues.length}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                   </div>
                </div>
              </div>
              <div className="space-y-3">
                 {categoryData.map((c, i) => (
                   <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}} />
                        <span className="font-semibold text-slate-600">{c.name}</span>
                      </div>
                      <span className="font-bold text-slate-800">{c.value}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Fleet Response Latency (MTTR by Zone)</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mttrData}>
                   <XAxis dataKey="floor" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                   <Bar dataKey="mttr" fill="#7c3aed" radius={[8, 8, 0, 0]} barSize={40} />
                   <Tooltip cursor={{fill: '#f8fafc'}} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass p-8 rounded-[2.5rem] shadow-xl animate-in slide-in-from-bottom-8 duration-500 overflow-hidden">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-slate-800">Incident Node Ledger</h3>
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input 
                  type="text" 
                  placeholder="Query system metadata..."
                  className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                 />
              </div>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-slate-100">
                   <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Incident Node</th>
                   <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Facility Location</th>
                   <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Service Metadata</th>
                   <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Operational Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {issues.map((issue) => (
                   <tr key={issue.id} className="hover:bg-slate-50/50 transition-colors group">
                     <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-xs">
                             #{issue.id}
                           </div>
                           <div className="font-bold text-slate-800 text-sm">{issue.category} Fault</div>
                        </div>
                     </td>
                     <td className="py-6 px-4">
                        <div className="text-sm font-semibold text-slate-600">{issue.floor}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{issue.block}</div>
                     </td>
                     <td className="py-6 px-4">
                        <div className="text-sm text-slate-600 line-clamp-1 max-w-xs">{issue.description}</div>
                        <div className="text-[10px] font-bold text-violet-500 uppercase mt-1">{new Date(issue.timestamp).toLocaleString()}</div>
                     </td>
                     <td className="py-6 px-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          issue.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-600' : 
                          issue.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {issue.status.replace('_', ' ')}
                        </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
