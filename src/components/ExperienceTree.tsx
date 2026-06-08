import { useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight, Zap, Target, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { Experience } from "../types";

interface ExperienceTreeProps {
  history: Experience[];
}

export function ExperienceTree({ history }: ExperienceTreeProps) {
  const [activeExpId, setActiveExpId] = useState<string>(history[0]?.id || "");

  const activeExp = history.find(e => e.id === activeExpId) || history[0];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="experience-tree-grid">
      {/* Visual Timeline Navigation Panel (Left Side - col-span-5) */}
      <div className="lg:col-span-5 space-y-4">
        <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 font-semibold mb-2">Chronicle of Tenures</h4>
        <div className="relative border-l-2 border-white/5 pl-4 ml-2 space-y-5">
          {history.map((exp, index) => {
            const isActive = exp.id === activeExpId;
            return (
              <div key={exp.id} className="relative">
                {/* Timeline node icon or circle */}
                <span className={`absolute -left-[24px] top-1.5 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                  isActive 
                    ? "bg-amber-400 border-amber-400 glow-amber" 
                    : "bg-[#050505] border-white/20 hover:border-gray-400"
                }`}>
                  {isActive && <span className="w-1.5 h-1.5 bg-[#050505] rounded-full" />}
                </span>

                {/* Card item */}
                <button
                  onClick={() => setActiveExpId(exp.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isActive 
                      ? "glass-panel-heavy shadow-lg shadow-amber-500/5 col-span-5" 
                      : "bg-[#0b0c10]/40 hover:bg-[#0b0c10]/70 border-white/5 hover:border-white/10"
                  }`}
                  id={`exp-node-${exp.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className={`font-display text-sm font-bold transition-all ${
                        isActive ? "text-amber-400" : "text-white"
                      }`}>
                        {exp.role}
                      </h5>
                      <p className="text-xs text-gray-300 font-medium mt-0.5">{exp.company}</p>
                    </div>
                    {exp.isCurrent && (
                      <span className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-mono tracking-wider font-semibold">
                        CURRENT
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 mt-3 text-gray-500 text-[10px] font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Tenure Deliverables (Right Side - col-span-7) */}
      <div className="lg:col-span-7 bg-[#0b0c10]/60 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 min-h-[380px]">
        {activeExp ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4.5">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">Active Milestone Scope</span>
                <h4 className="text-xl font-display font-bold text-white mt-1">{activeExp.role}</h4>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{activeExp.company} — {activeExp.period}</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-400">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            {/* Achievements bullets */}
            <div className="space-y-3.5">
              <h5 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-400" /> Core Contributions & Metrics
              </h5>
              <div className="space-y-3">
                {activeExp.achievements.map((bullet, index) => (
                  <div key={index} className="flex gap-2.5 items-start">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-550 shadow-sm shadow-amber-500/55 shrink-0" />
                    <p className="text-xs text-gray-300 font-sans leading-relaxed tracking-wide select-text">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Libraries compiled during tenure */}
            <div className="space-y-3 border-t border-white/5 pt-4">
              <h5 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Compiled Technologies during Tenure
              </h5>
              <div className="flex flex-wrap gap-2">
                {activeExp.techUsed.map((tech) => (
                  <span key={tech} className="text-[10px] font-mono bg-[#0c0e12] border border-white/5 px-2.5 py-1 text-gray-300 rounded-lg hover:border-amber-500/20 hover:text-white transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
            <BookOpen className="w-12 h-12 text-gray-700 animate-pulse mb-3" />
            <p className="text-sm font-mono">Select a tenure node from the timeline vector to render details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
