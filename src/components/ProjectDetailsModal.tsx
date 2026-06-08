import { useState } from "react";
import { X, ExternalLink, Github, Sparkles, Terminal, Smartphone, Zap, Check, PlaySquare } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "../types";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "emulator">("specs");
  const [emulatorState, setEmulatorState] = useState<"idle" | "booting" | "running">("idle");
  const [emulatorLogs, setEmulatorLogs] = useState<string[]>([]);
  const [qrValue, setQrValue] = useState("VORTEX-TX-88219-F");
  const [equalizerSpeed, setEqualizerSpeed] = useState<"normal" | "fast">("normal");

  // Run a mock device initialization simulation inside the project view
  const runEmulatorSimulation = () => {
    setEmulatorState("booting");
    setEmulatorLogs(["Initializing Android Runtime (ART)...", "Linking native shared library: liboboe.so", "Resolving DI with Dagger/Hilt...", "RoomDB database version 3 successfully mounted.", "Launching Activity: MainActivity..."]);
    
    setTimeout(() => {
      setEmulatorState("running");
      setEmulatorLogs(prev => [...prev, "✓ UI loaded. Layout hierarchy inflated successfully.", "Listening for sensory loops..."]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md cursor-pointer"
        onClick={onClose}
        id="modal-backdrop"
      />

      {/* Frame Container */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-y-auto shadow-2xl overflow-hidden z-10 flex flex-col border border-white/10"
        id="project-modal-container"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0c10]">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" /> Project Dossier
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">{project.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{project.subtitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="close-modal-btn"
          >
            <X className="w-5.5 h-4.5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5 bg-[#08090d]/60 px-6">
          <button
            onClick={() => setActiveTab("specs")}
            className={`py-3 px-4 text-xs font-mono font-medium border-b-2 mr-4 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "specs" 
                ? "border-amber-400 text-amber-400 font-semibold" 
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
            id="tab-specs"
          >
            <Zap className="w-3.5 h-3.5" /> Architecture Specs
          </button>
          <button
            onClick={() => setActiveTab("emulator")}
            className={`py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "emulator" 
                ? "border-amber-400 text-amber-400 font-semibold" 
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
            id="tab-emulator"
          >
            <Terminal className="w-3.5 h-3.5" /> Live Sandbox Emulator
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#07080b]">
          {activeTab === "specs" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Column 1 - Overview & Visual */}
              <div className="space-y-6">
                {project.imageUrl && project.imageUrl.startsWith("/") ? (
                  <div className="relative group rounded-2xl overflow-hidden aspect-video border border-white/10 bg-[#0d0f14]">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {project.metrics && (
                      <span className="absolute bottom-4 left-4 text-[11px] font-mono glass-pill px-3 py-1 text-amber-400 border border-amber-500/20 font-semibold">
                        {project.metrics}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="relative flex flex-col justify-center items-center rounded-2xl aspect-video border border-dashed border-white/10 bg-white/2 p-6 text-center">
                    <Smartphone className="w-12 h-12 text-amber-500/40 mb-3" />
                    <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">{project.metrics || "Interactive Code Module"}</span>
                    <p className="text-gray-400 text-xs mt-1.5 max-w-xs">Compiled on-device sandbox. No decorative static imagery required.</p>
                  </div>
                )}

                <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#0a0c10]/40">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-2 font-semibold">Role & Scope</h4>
                  <p className="text-sm font-semibold text-white mb-2">{project.role}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{project.description}</p>
                </div>
              </div>

              {/* Column 2 - Technical breakdown */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-3 font-semibold">Advanced Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-xs font-mono glass-pill px-3 py-1.5 text-white/90 border border-white/5 hover:border-amber-500/25 hover:text-amber-300 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 font-semibold">Performance Engineering Details</h4>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex gap-2.5 items-start">
                      <div className="mt-0.5 w-4 h-4 rounded bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <div>
                        <strong className="text-gray-300 font-medium font-sans">Memory Optimization</strong>
                        <p className="text-gray-400 mt-0.5 font-sans">Implemented custom flow buffers with backpressure prevention to guarantee 60FPS list rendering matching low-end chipsets.</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="mt-0.5 w-4 h-4 rounded bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <div>
                        <strong className="text-gray-300 font-medium font-sans">Local Synchronizer</strong>
                        <p className="text-gray-400 mt-0.5 font-sans">Configured custom SQLite cursor queries leveraging indices to cut loading speed down to &lt;12ms for a 10,000 element manifest.</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="mt-0.5 w-4 h-4 rounded bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <div>
                        <strong className="text-gray-300 font-medium font-sans">Architecture Pattern</strong>
                        <p className="text-gray-400 mt-0.5 font-sans">Strict dynamic unidirectional data flow (UDF) through immutable ViewStates in Kotlin Coroutines to isolate UI render passes.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* External links */}
                <div className="pt-2 flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-pill px-4 py-2.5 rounded-xl text-gray-300 hover:text-white hover:border-amber-500/30 transition-all font-mono text-xs flex items-center gap-2 border border-white/5 cursor-pointer"
                    >
                      <Github className="w-4 h-4" /> Code Repository
                    </a>
                  )}
                  {project.playStoreUrl ? (
                    <a 
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-white hover:bg-white/90 text-black font-semibold rounded-full font-mono text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all scale-102 hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Play Store
                    </a>
                  ) : (
                    <span className="glass-pill px-4 py-2.5 rounded-xl text-amber-500/60 font-mono text-xs flex items-center gap-1.5 border border-amber-500/10">
                      <Lock className="w-3.5 h-3.5" /> Enterprise Proprietary
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Live Sandbox Emulator Section */
            <div className="space-y-6">
              <div className="border border-white/5 bg-[#030406] rounded-2xl p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Column 1: Emulator Screen Frame */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-[245px] h-[480px] bg-[#0c0e12] rounded-[36px] p-3 border-4 border-slate-700/60 shadow-2xl relative flex flex-col justify-between items-center overflow-hidden">
                    {/* Device Ear Speaker Notch */}
                    <div className="absolute top-2 w-16 h-4 bg-black rounded-full z-20 flex justify-center items-center">
                      <div className="w-8 h-1 bg-gray-800 rounded-full" />
                    </div>

                    {/* Simulator inner body */}
                    <div className="w-full h-full bg-[#07080b] rounded-[26px] overflow-hidden flex flex-col pt-6 relative border border-white/5">
                      {emulatorState === "idle" && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                          <Smartphone className="w-12 h-12 text-gray-600 mb-2 animate-bounce" />
                          <h5 className="text-[13px] font-bold text-gray-300 font-display">Sandbox Offline</h5>
                          <p className="text-[10px] text-gray-400 mt-1 max-w-40 font-sans leading-normal">Start the compilation to load this application bundle interactively.</p>
                          <button 
                            onClick={runEmulatorSimulation}
                            className="mt-4 px-4 py-2 bg-white text-black font-semibold hover:bg-white/90 rounded-full text-[10px] font-serif tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <PlaySquare className="w-3.5 h-3.5" /> SIMULATE RUN
                          </button>
                        </div>
                      )}

                      {emulatorState === "booting" && (
                        <div className="absolute inset-0 bg-[#07080b] flex flex-col items-center justify-center p-4">
                          <div className="w-8 h-8 rounded-full border-2 border-amber-500/10 border-t-amber-500 animate-spin mb-3" />
                          <span className="text-[10px] font-mono text-amber-400 tracking-widest animate-pulse">BOOTING OS...</span>
                        </div>
                      )}

                      {emulatorState === "running" && (
                        <div className="absolute inset-0 bg-[#090b10] flex flex-col justify-between p-4.5">
                          {/* Top Status Bar */}
                          <div className="flex justify-between items-center text-[9px] font-mono text-gray-400">
                            <span>VortexOS v26</span>
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              LTE 99%
                            </span>
                          </div>

                          {/* Dynamic Custom App Interface Screen */}
                          <div className="flex-1 flex flex-col justify-center items-center my-4 space-y-4">
                            {project.id === "vortex-pay" ? (
                              <div className="w-full space-y-3.5 text-center">
                                <div className="glass-pill p-2 rounded-xl border border-white/5">
                                  <span className="text-[9px] font-mono text-gray-400">AVAILABLE BALANCE</span>
                                  <div className="text-lg font-bold text-amber-400 font-display mt-0.5">$9,402.15</div>
                                </div>
                                <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/15 flex flex-col items-center space-y-2">
                                  <span className="text-[8px] font-mono text-amber-350">INTERACTIVE NFC PAYLOAD</span>
                                  <input 
                                    type="text" 
                                    value={qrValue} 
                                    onChange={(e) => setQrValue(e.target.value)}
                                    className="w-full bg-[#050608] text-center border border-white/10 rounded px-1.5 py-1 text-[10px] font-mono text-white focus:outline-none focus:border-amber-500"
                                  />
                                  <span className="text-[8px] text-gray-400">Double click QR to broadcast.</span>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full space-y-3 text-center">
                                <span className="text-[9px] font-mono text-amber-400 font-semibold uppercase tracking-widest block font-sans">OBOE AUDIO SPECTRUM</span>
                                <div className="flex justify-center items-end space-x-1 h-20 px-3 bg-white/2 rounded-xl">
                                  <div className={`w-3.5 bg-amber-500 rounded-t ${emulatorState === 'running' ? equalizerSpeed === 'fast' ? 'animate-[bounce_0.6s_infinite]' : 'animate-[bounce_1.2s_infinite]' : ''}`} />
                                  <div className={`w-3.5 bg-amber-400 rounded-t ${emulatorState === 'running' ? equalizerSpeed === 'fast' ? 'animate-[bounce_0.4s_infinite]' : 'animate-[bounce_0.8s_infinite]' : ''}`} />
                                  <div className={`w-3.5 bg-amber-500/80 rounded-t ${emulatorState === 'running' ? equalizerSpeed === 'fast' ? 'animate-[bounce_0.5s_infinite]' : 'animate-[bounce_1s_infinite]' : ''}`} />
                                  <div className={`w-3.5 bg-amber-600 rounded-t ${emulatorState === 'running' ? equalizerSpeed === 'fast' ? 'animate-[bounce_0.3s_infinite]' : 'animate-[bounce_0.7s_infinite]' : ''}`} />
                                </div>
                                <div className="flex gap-2 justify-center">
                                  <button 
                                    onClick={() => setEqualizerSpeed("normal")} 
                                    className={`px-1.5 py-0.5 text-[8px] rounded border cursor-pointer ${equalizerSpeed === "normal" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-transparent text-gray-500 border-white/5"}`}
                                  >
                                    1.0x
                                  </button>
                                  <button 
                                    onClick={() => setEqualizerSpeed("fast")} 
                                    className={`px-1.5 py-0.5 text-[8px] rounded border cursor-pointer ${equalizerSpeed === "fast" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-transparent text-gray-500 border-white/5"}`}
                                  >
                                    2.0x
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Home Navigation button bar */}
                          <div className="flex gap-4 justify-between border-t border-white/5 pt-1.5">
                            <span className="text-[8px] text-gray-500">Log: Active</span>
                            <span className="text-[8px] text-amber-400 font-semibold font-mono animate-pulse">COMPILE-OK</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Virtual Home Button Bar notch */}
                    <div className="w-20 h-1 bg-gray-500 rounded-full mt-1.5" />
                  </div>
                </div>

                {/* Column 2: Terminal Logs */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <h5 className="font-mono text-sm text-white font-semibold flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-amber-400" /> Logcat Diagnostics Console
                    </h5>
                    <p className="text-xs text-gray-400 mt-1">Select simulated actions in the phone display on the left. The compiler dumps active trace telemetry down below.</p>
                  </div>

                  <div className="bg-[#050608] rounded-xl border border-white/10 p-4 font-mono text-[11px] h-60 overflow-y-auto space-y-1.5 shadow-inner text-gray-400">
                    <div className="text-gray-500 tracking-wide">// Android Virtual Emulator Session Logs</div>
                    {emulatorLogs.map((log, index) => (
                      <div key={index} className="flex gap-2.5 items-start leading-relaxed animate-none">
                        <span className="text-[9px] text-gray-600 select-none">[{index + 1}]</span>
                        <span className={`${log.startsWith("✓") || log.startsWith("Link") ? "text-amber-400 font-semibold" : log.includes("Error") ? "text-rose-400" : "text-gray-300"}`}>
                          {log}
                        </span>
                      </div>
                    ))}
                    {emulatorState === "idle" && (
                      <div className="text-gray-600 italic">No console socket connected. Run virtual app above.</div>
                    )}
                  </div>

                  {emulatorState === "running" && (
                    <div className="flex gap-2">
                       <button 
                         onClick={() => {
                           setEmulatorState("idle");
                           setEmulatorLogs([]);
                         }}
                         className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500 hover:text-slate-950 border border-rose-500/20 text-rose-400 text-xs font-mono rounded-lg transition-all cursor-pointer"
                       >
                         Terminate App
                       </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

interface LockProps {
  className?: string;
}

function Lock({ className }: LockProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
