
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            N
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900 uppercase tracking-tight leading-tight">
              Narayana Engineering College
            </h1>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">
              Department of Computer Science & Engineering
            </p>
          </div>
        </div>
        
        <div className="text-right hidden lg:block">
          <div className="px-4 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 border border-slate-200">
            BATCH NO: 17
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
