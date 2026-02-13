
import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { Student } from '../types';

const TeamSection: React.FC = () => {
  const members: Student[] = [
    { sNo: 1, rollNo: "22F11A0503", name: "A. HARSHA CHAITANYA", contact: "6301720569", mail: "Harshaarikatla27@gmail.com" },
    { sNo: 2, rollNo: "22F11A0524", name: "K. PRAVEEN KUMAR", contact: "9014665117", mail: "Kattapraveenkumar24@gmail.com" },
    { sNo: 3, rollNo: "22F11A0599", name: "B. SRIDHAR RAJU", contact: "9640416062", mail: "balarajusridharraju@gmail.com" }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Project Team</h2>
      <p className="text-slate-500 mb-8">Batch No: 17 | Narayana Engineering College</p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {members.map((m) => (
          <div key={m.sNo} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-2 inline-block">ROLL NO: {m.rollNo}</span>
                <h3 className="text-lg font-bold text-slate-800 uppercase">{m.name}</h3>
              </div>
              <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                {m.sNo}
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <Phone size={14} className="text-slate-400" />
                <span>+91 {m.contact}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <Mail size={14} className="text-slate-400" />
                <a href={`mailto:${m.mail}`} className="hover:text-blue-600 underline decoration-blue-200">{m.mail}</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Internal Mentors</h3>
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="h-1 bg-slate-200 mb-4" />
            <h4 className="font-bold text-slate-800">Guide</h4>
          </div>
          <div>
            <div className="h-1 bg-slate-200 mb-4" />
            <h4 className="font-bold text-slate-800">Project Coordinator</h4>
          </div>
          <div>
            <div className="h-1 bg-slate-200 mb-4" />
            <h4 className="font-bold text-slate-800">HOD</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
