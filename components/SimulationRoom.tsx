
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, Send, CheckCircle2, AlertCircle, Info, Monitor } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { CapturedImage } from '../types';

const SimulationRoom: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [lastMessage, setLastMessage] = useState<string>("Ready for Magic Interaction");
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(s);
      setIsCameraActive(true);
      setLastMessage("System Monitoring Activated. Show a 'V' sign or hold fingers together.");
    } catch (err) {
      console.error("Camera error:", err);
      setLastMessage("Error: Could not access camera. Please check permissions.");
    }
  };

  // Effect to attach stream when video element is rendered
  useEffect(() => {
    if (isCameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraActive, stream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const captureAndTransfer = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Use actual video dimensions
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simulate "Screen Capture" by taking current frame
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');

    const newCapture: CapturedImage = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      dataUrl,
      status: 'transferring'
    };

    setCapturedImages(prev => [newCapture, ...prev]);
    setLastMessage("Gesture Detected! Capturing screen...");

    // Simulate Network latency
    setTimeout(() => {
      setCapturedImages(prev => 
        prev.map(img => img.id === newCapture.id ? { ...img, status: 'received' } : img)
      );
      setLastMessage("Image successfully transferred to Node Receiver.");
    }, 1500);
  }, []);

  const runVisionAnalysis = useCallback(async () => {
    if (!isCameraActive || isProcessing || !videoRef.current || !canvasRef.current) return;

    setIsProcessing(true);
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set dimensions for processing
      canvas.width = 320; 
      canvas.height = 240;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
              { text: "Analyze this image for a hand gesture. If you see a 'V' sign (index and middle fingers up) or index and middle fingers touching in a 'pinching' or 'pointing' trigger configuration, respond with 'TRIGGER'. Otherwise respond with 'IDLE'." }
            ]
          }
        ]
      });

      const result = response.text?.trim() || 'IDLE';
      if (result.toUpperCase().includes('TRIGGER')) {
        captureAndTransfer();
      }
    } catch (err) {
      console.error("Vision Analysis failed:", err);
    } finally {
      setIsProcessing(false);
    }
  }, [isCameraActive, isProcessing, captureAndTransfer]);

  // Periodic polling for gesture
  useEffect(() => {
    let interval: any;
    if (isCameraActive) {
      interval = setInterval(() => {
        runVisionAnalysis();
      }, 4000); 
    }
    return () => clearInterval(interval);
  }, [isCameraActive, runVisionAnalysis]);

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Live Interaction Simulation</h2>
          <p className="text-slate-500 text-sm">Vision-driven cross-device communication node</p>
        </div>
        {!isCameraActive && (
          <button 
            onClick={startCamera}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            <Camera size={18} /> Enable Source Node
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 flex-1">
        {/* Source Node */}
        <div className="space-y-4">
          <div className="relative bg-slate-900 rounded-2xl aspect-video overflow-hidden border-4 border-slate-800 shadow-xl flex items-center justify-center">
            {isCameraActive ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 gap-4">
                <Camera size={48} className="opacity-20 animate-pulse" />
                <p className="text-sm font-medium">Source Node Offline</p>
              </div>
            )}
            
            {isCameraActive && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold animate-pulse flex items-center gap-2">
                <div className="h-2 w-2 bg-white rounded-full" /> LIVE FEED
              </div>
            )}

            {isProcessing && (
              <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                <RefreshCw size={12} className="animate-spin" /> Perception Engine Active
              </div>
            )}
          </div>

          <div className={`p-4 rounded-xl border flex items-center gap-3 transition-all duration-500 ${
            lastMessage.includes('Detected') 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-blue-50 border-blue-100 text-blue-700'
          }`}>
            <Info size={18} />
            <span className="text-sm font-medium">{lastMessage}</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">System Logs</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
              <LogItem time={new Date().toLocaleTimeString()} msg="System core initialized." />
              <LogItem time={new Date().toLocaleTimeString()} msg="HTTP Handshake with Node Receiver successful." />
              {isCameraActive && <LogItem time={new Date().toLocaleTimeString()} msg="Perception module: Monitoring spatial configurations." />}
              {capturedImages.map(img => (
                <LogItem key={img.id} time={img.timestamp} msg={`Event: Gesture detected. Capture ID ${img.id} sent.`} success />
              ))}
            </div>
          </div>
        </div>

        {/* Receiver Node */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-100 rounded-2xl flex-1 border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Monitor size={18} className="text-blue-500" /> Receiver Desktop View
              </h3>
              <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase">Online</span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              {capturedImages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
                  <Send size={48} />
                  <p className="text-sm">Waiting for incoming data packets...</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {capturedImages.map((img) => (
                    <div key={img.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm group animate-in fade-in slide-in-from-bottom-2">
                      <div className="relative aspect-video">
                        <img src={img.dataUrl} className="w-full h-full object-cover" alt="Captured" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="bg-white text-slate-900 px-3 py-1 rounded text-xs font-bold">VIEW FULL</button>
                        </div>
                      </div>
                      <div className="p-2 flex justify-between items-center bg-slate-50">
                        <span className="text-[10px] font-mono text-slate-500">{img.timestamp}</span>
                        {img.status === 'received' ? (
                          <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                            <CheckCircle2 size={10} /> RECEIVED
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-orange-600 flex items-center gap-1">
                            <RefreshCw size={10} className="animate-spin" /> TRANSFERRING
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Packets Rcvd" value={capturedImages.length.toString()} color="blue" />
            <StatCard label="Network State" value="Stable" color="green" />
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

const LogItem: React.FC<{ time: string, msg: string, success?: boolean }> = ({ time, msg, success }) => (
  <div className="flex gap-2 text-[10px] font-mono leading-tight">
    <span className="text-slate-400">[{time}]</span>
    <span className={success ? 'text-green-600 font-bold' : 'text-slate-600'}>{msg}</span>
  </div>
);

const StatCard = ({ label, value, color }: { label: string, value: string, color: string }) => {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600'
  };
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-xl font-bold ${colorMap[color] || 'text-slate-900'}`}>{value}</div>
    </div>
  );
};

export default SimulationRoom;
