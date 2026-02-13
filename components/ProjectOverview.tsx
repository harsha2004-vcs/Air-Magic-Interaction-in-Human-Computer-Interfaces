
import React from 'react';
// Added Monitor icon to imports
import { ShieldCheck, Zap, Hand, HardDrive, Monitor } from 'lucide-react';

const ProjectOverview: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          Air Magic Interaction in Human-Computer Interfaces
        </h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Abstract</h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            We propose a novel visual-interaction-based system for cross-device content transfer that eliminates the need for traditional input peripherals. The system utilizes a lightweight vision-based perception module to detect predefined spatial hand configurations, which act as implicit triggers to initiate screen capture on the source device. Unlike conventional systems, our method introduces a hands-free, vision-driven communication protocol using visual context cues alone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Zap className="text-orange-500" /> Key Features
            </h3>
            <ul className="space-y-3">
              {[
                "Vision-based gesture recognition using OpenCV & MediaPipe",
                "Hands-free screen capture automation",
                "Real-time cross-device transfer over local LAN",
                "Minimal latency HTTP communication protocol",
                "Unconstrained environment performance"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <div className="mt-1.5 h-1.5 w-1.5 bg-blue-500 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ShieldCheck className="text-green-500" /> Advantages
            </h3>
            <ul className="space-y-3">
              {[
                "Hygienic: No physical contact required",
                "Efficient: Instant transfer without manual menus",
                "Low Cost: Uses standard off-the-shelf webcams",
                "Secure: Local network data exchange",
                "Accessible: Friendly for users with limited mobility"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <div className="mt-1.5 h-1.5 w-1.5 bg-green-500 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="border-t border-slate-100 pt-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">System Workflow</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-4 bg-slate-50 rounded-xl">
            <WorkflowStep icon={<Hand />} label="Gesture Detection" sub="Webcam Monitor" />
            <div className="h-0.5 w-8 bg-slate-300 hidden md:block" />
            <WorkflowStep icon={<Zap />} label="Trigger Event" sub="Implicit Action" />
            <div className="h-0.5 w-8 bg-slate-300 hidden md:block" />
            {/* Monitor icon used here */}
            <WorkflowStep icon={<Monitor />} label="Screen Capture" sub="PyAutoGUI" />
            <div className="h-0.5 w-8 bg-slate-300 hidden md:block" />
            <WorkflowStep icon={<HardDrive />} label="LAN Transfer" sub="HTTP Server" />
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkflowStep = ({ icon, label, sub }: { icon: React.ReactNode, label: string, sub: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="h-12 w-12 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600 mb-3 border border-slate-100">
      {icon}
    </div>
    <span className="font-bold text-slate-800 text-sm">{label}</span>
    <span className="text-xs text-slate-500">{sub}</span>
  </div>
);

export default ProjectOverview;
