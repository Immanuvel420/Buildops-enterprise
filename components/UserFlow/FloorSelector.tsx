
import React, { useState } from 'react';
import { Layers, Activity, ChevronRight, Info } from 'lucide-react';

interface FloorSelectorProps {
  onSelect: (floor: string) => void;
}

interface FloorItem {
  name: string;
  status: 'normal' | 'progress' | 'issue';
  activeNodes: number;
}

const floors: FloorItem[] = [
  { name: '4th Floor', status: 'normal', activeNodes: 12 },
  { name: '3rd Floor', status: 'issue', activeNodes: 8 },
  { name: '2nd Floor', status: 'progress', activeNodes: 15 },
  { name: '1st Floor', status: 'normal', activeNodes: 24 },
  { name: 'Ground Floor', status: 'normal', activeNodes: 32 }
];

const FloorSelector: React.FC<FloorSelectorProps> = ({ onSelect }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-emerald-500';
      case 'progress': return 'bg-amber-400';
      case 'issue': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="w-full max-w-xl px-4 py-12 animate-slide-up">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass bg-white/40 border-white/60 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
          <Activity size={12} /> Live Hub
        </div>
        <h2 className="text-4xl font-bold text-slate-900 font-poppins tracking-tight">Facility Navigation</h2>
        <p className="text-slate-600 text-sm font-medium">Select a structural node to access real-time diagnostics.</p>
      </div>

      <div className="relative">
        {/* Vertical Progress Line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/50 via-blue-500/20 to-transparent z-0" />

        <div className="space-y-6 relative z-10">
          {floors.map((floor, idx) => (
            <button
              key={floor.name}
              onClick={() => onSelect(floor.name)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative w-full flex items-center gap-6 p-0.5 transition-all duration-300 outline-none`}
            >
              {/* Floor Circle Connector */}
              <div className={`
                relative flex-shrink-0 w-12 h-12 rounded-full glass flex items-center justify-center z-10 transition-all duration-500 border-2
                ${hoveredIndex === idx ? 'border-blue-500 bg-white scale-110 shadow-lg' : 'border-white/80'}
              `}>
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${getStatusColor(floor.status)} ${floor.status !== 'normal' ? 'animate-pulse' : ''}`} />
              </div>

              {/* Floor Card */}
              <div className={`
                flex-1 glass rounded-2xl p-5 flex items-center justify-between transition-all duration-300
                ${hoveredIndex === idx 
                  ? 'bg-white shadow-xl -translate-y-1' 
                  : 'bg-white/40 shadow-sm'}
              `}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${hoveredIndex === idx ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Layers size={18} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                      {floor.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Info size={10} /> {floor.activeNodes} Nodes
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        floor.status === 'issue' ? 'text-rose-500' : 
                        floor.status === 'progress' ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        {floor.status === 'issue' ? 'Fault' : 
                         floor.status === 'progress' ? 'Processing' : 'Optimal'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`p-2 rounded-lg transition-all duration-300 ${hoveredIndex === idx ? 'text-blue-600 translate-x-1' : 'text-slate-300'}`}>
                  <ChevronRight size={20} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] select-none pointer-events-none">
        <div className="w-[450px] h-[650px] border-x-8 border-t-8 border-slate-900 rounded-t-[100px]" />
      </div>
    </div>
  );
};

export default FloorSelector;
