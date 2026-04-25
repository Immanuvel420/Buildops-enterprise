
import React, { useState, useRef } from 'react';
import { Camera, Send, X, Loader2, ChevronDown } from 'lucide-react';
import { Issue } from '../../types';

interface IssueReportProps {
  floor: string;
  block: string;
  onSubmit: (issue: Issue) => void;
  onCancel: () => void;
}

const categories = ['Electrical', 'Water', 'Plumbing', 'Cleaning', 'Structural'];

const IssueReport: React.FC<IssueReportProps> = ({ floor, block, onSubmit, onCancel }) => {
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const newIssue: Issue = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      floor,
      block,
      category: category as any,
      description,
      status: 'PENDING',
      imageUrl: image || undefined,
      timestamp: new Date().toISOString()
    };
    onSubmit(newIssue);
  };

  if (isSubmitting) {
    return (
      <div className="w-full max-w-sm glass p-10 rounded-2xl text-center space-y-6 animate-slide-up shadow-2xl">
        <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-10" />
          <div className="relative z-10 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Loader2 className="text-white animate-spin" size={28} />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Nexus Dispatch</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Broadcasting data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl px-4 animate-slide-up">
      <div className="glass p-8 rounded-2xl shadow-2xl space-y-8 border-t-4 border-blue-600">
        <div className="flex justify-between items-start border-b border-white/40 pb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 font-poppins">Incident Dispatch</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Local: <span className="text-blue-600">{floor} • {block}</span></p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-white/40 rounded-xl transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Category</label>
              <div className="relative">
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/50 border border-white/60 rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-bold text-slate-700 text-sm"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Observational Notes</label>
              <textarea 
                placeholder="Describe the detected anomaly..."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white/50 border border-white/60 rounded-xl py-4 px-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none font-medium text-sm text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Visual Capture</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer aspect-[4/3] bg-white/40 rounded-xl border-2 border-dashed border-white/60 flex flex-col items-center justify-center overflow-hidden hover:border-blue-500 hover:bg-white/60 transition-all shadow-inner"
              >
                {image ? (
                  <img src={image} className="w-full h-full object-cover" alt="Capture" />
                ) : (
                  <>
                    <Camera className="text-slate-300 group-hover:text-blue-500 transition-colors" size={32} />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Initialize Camera</p>
                  </>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={!image || !description || isSubmitting}
          className="w-full neon-glow bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-40"
        >
          <Send size={18} />
          <span className="uppercase tracking-widest text-sm">Broadcast to Nexus</span>
        </button>
      </div>
    </div>
  );
};

export default IssueReport;
