
import React, { useState } from 'react';
import { Layout, Monitor, Users, Cpu, PlayCircle, Info } from 'lucide-react';
import Header from './components/Header';
import ProjectOverview from './components/ProjectOverview';
import SimulationRoom from './components/SimulationRoom';
import TeamSection from './components/TeamSection';
import TechStack from './components/TechStack';
import { AppView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('overview');

  const renderView = () => {
    switch (activeView) {
      case 'overview': return <ProjectOverview />;
      case 'simulation': return <SimulationRoom />;
      case 'tech': return <TechStack />;
      case 'team': return <TeamSection />;
      default: return <ProjectOverview />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="md:w-64 flex flex-col gap-2">
            <NavButton 
              active={activeView === 'overview'} 
              onClick={() => setActiveView('overview')}
              icon={<Info size={20} />}
              label="Overview"
            />
            <NavButton 
              active={activeView === 'simulation'} 
              onClick={() => setActiveView('simulation')}
              icon={<PlayCircle size={20} />}
              label="Live Interaction"
            />
            <NavButton 
              active={activeView === 'tech'} 
              onClick={() => setActiveView('tech')}
              icon={<Cpu size={20} />}
              label="Technologies"
            />
            <NavButton 
              active={activeView === 'team'} 
              onClick={() => setActiveView('team')}
              icon={<Users size={20} />}
              label="Project Team"
            />
          </nav>

          {/* Content Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {renderView()}
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-6 text-center text-sm">
        <p>© 2024 Department of Computer Science & Engineering | Narayana Engineering College</p>
      </footer>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default App;
