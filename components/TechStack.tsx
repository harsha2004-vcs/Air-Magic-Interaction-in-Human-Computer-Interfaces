
import React from 'react';
// Added Cpu to imports
import { Terminal, Globe, Code2, Database, Network, Box, Cpu } from 'lucide-react';

const TechStack: React.FC = () => {
  const techs = [
    { title: "Python 3.x", desc: "Core backend & processing logic", icon: <Terminal className="text-blue-500" /> },
    { title: "OpenCV", desc: "Computer vision & image processing", icon: <Box className="text-green-500" /> },
    { title: "MediaPipe", desc: "Lightweight ML for hand tracking", icon: <Cpu className="text-red-500" /> },
    { title: "Flask", desc: "Minimal web server for data transfer", icon: <Globe className="text-orange-500" /> },
    { title: "PyAutoGUI", desc: "System-level screenshot automation", icon: <Code2 className="text-indigo-500" /> },
    { title: "HTTP over LAN", desc: "Data transfer protocol", icon: <Network className="text-cyan-500" /> },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Technologies Required</h2>
      <p className="text-slate-500 mb-8">Standard stack used in the development of Air Magic Interaction</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techs.map((t, i) => (
          <div key={i} className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all group">
            <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
              {t.icon}
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{t.title}</h3>
            <p className="text-sm text-slate-500">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-slate-900 rounded-2xl text-white">
        <h3 className="text-xl font-bold mb-4">Development Tools</h3>
        <div className="flex flex-wrap gap-4">
          <span className="px-4 py-2 bg-slate-800 rounded-lg text-sm">Visual Studio Code</span>
          <span className="px-4 py-2 bg-slate-800 rounded-lg text-sm">PowerShell / Cmd</span>
          <span className="px-4 py-2 bg-slate-800 rounded-lg text-sm">NumPy</span>
          <span className="px-4 py-2 bg-slate-800 rounded-lg text-sm">Requests Library</span>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
