
import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';

interface BlockSelectorProps {
  floor: string;
  onSelect: (block: string) => void;
  onBack: () => void;
}

const rooms = [
  { id: 'Bedroom 01', label: 'BEDROOM 01', pos: 'bottom-0 left-0 w-[38%] h-[42%]' },
  { id: 'Bedroom 02', label: 'BEDROOM 02', pos: 'top-0 left-[28%] w-[32%] h-[48%]' },
  { id: 'Bathroom 01', label: 'BATHROOM 01', pos: 'top-[38%] left-0 w-[28%] h-[20%]' },
  { id: 'Bathroom 02', label: 'BATHROOM 02', pos: 'top-0 left-0 w-[28%] h-[38%]' },
  { id: 'Kitchen', label: 'KITCHEN', pos: 'top-0 right-0 w-[40%] h-[48%]' },
  { id: 'Living Room', label: 'LIVING ROOM', pos: 'bottom-0 right-0 w-[62%] h-[52%]' },
  { id: 'Terrace', label: 'TERRACE', pos: 'bottom-0 right-0 w-[28%] h-[22%] border-l border-t' },
];

const BlockSelector: React.FC<BlockSelectorProps> = ({ floor, onSelect, onBack }) => {
  return (
    <div className="w-full max-w-5xl space-y-8 animate-slide-up px-4 py-12">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="glass p-3 rounded-xl hover:bg-white transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 font-poppins">{floor} Schematic</h2>
            <p className="text-slate-500 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
              <MapPin size={12} className="text-blue-500" /> Room-Level Identification
            </p>
          </div>
        </div>
      </div>

      <div className="relative aspect-[16/10] w-full bg-[#1e40af] rounded-2xl border-[10px] border-slate-900 shadow-2xl overflow-hidden group/plan">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" 
             style={{ 
               backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
               backgroundSize: '24px 24px' 
             }} />
        
        {/* Blueprint Elements */}
        <div className="absolute inset-4 border border-white/30 pointer-events-none" />
        
        {/* Dimension Indicators */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/40 text-[9px] font-mono">
          <div className="w-16 h-px bg-white/30" /> REF: SCH-001 <div className="w-16 h-px bg-white/30" />
        </div>

        {/* Room Grid */}
        <div className="absolute inset-12 md:inset-16">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onSelect(room.id)}
              className={`absolute border-2 border-white/90 transition-all duration-300 group flex items-center justify-center
                hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:z-20
                ${room.pos}
              `}
            >
              {/* Corner markings */}
              <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-white/50" />
              <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-white/50" />

              <span className="text-white font-bold text-[8px] md:text-xs tracking-[0.2em] font-mono text-center px-4 group-hover:scale-105 transition-transform uppercase leading-relaxed">
                {room.label}
              </span>
            </button>
          ))}
        </div>

        {/* Legend Box */}
        <div className="absolute bottom-6 right-6 w-40 border border-white/20 p-3 bg-blue-900/60 backdrop-blur-md pointer-events-none rounded-sm">
          <div className="text-[7px] text-white/50 font-mono uppercase border-b border-white/10 pb-1 mb-1">Architecture Metadata</div>
          <div className="text-[9px] text-white font-bold font-mono truncate">{floor} Model</div>
          <div className="text-[7px] text-white/40 font-mono mt-2">Scale 1:50</div>
          <div className="text-[7px] text-white/40 font-mono italic">Nexus Build v4.2</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass p-5 rounded-2xl flex items-center gap-4 bg-white/60">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600 font-mono text-xs font-bold">A1</div>
          <p className="text-xs text-slate-600 font-bold uppercase tracking-tight">Tap any highlighted structural node to report a localized fault.</p>
        </div>
        <div className="glass p-5 rounded-2xl flex items-center gap-4 bg-white/60">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600 font-mono text-xs font-bold">A2</div>
          <p className="text-xs text-slate-600 font-bold uppercase tracking-tight">Precision mapping ensures 98.4% technician dispatch accuracy.</p>
        </div>
      </div>
    </div>
  );
};

export default BlockSelector;
