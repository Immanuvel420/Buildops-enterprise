
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Soft Ambient Background Elements */}
      <div className="fixed -top-48 -left-48 w-[600px] h-[600px] bg-violet-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed top-1/2 -right-64 w-[800px] h-[800px] bg-sky-400/10 blur-[200px] rounded-full pointer-events-none" />
      <div className="fixed -bottom-64 left-1/4 w-[700px] h-[700px] bg-white/20 blur-[180px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
};
