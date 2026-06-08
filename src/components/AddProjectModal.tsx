import React, { useState } from "react";
import { X, Plus, Terminal, Check, Sparkles, Image as ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "../types";

interface AddProjectModalProps {
  onClose: () => void;
  onAdd: (project: Project) => void;
}

const PRESET_IMAGES = [
  {
    id: "preset-1",
    name: "Cyber Stream",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    desc: "Neon purple abstracts"
  },
  {
    id: "preset-2",
    name: "Dark Mobile",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    desc: "Sleek lines and terminal tech"
  },
  {
    id: "preset-3",
    name: "Hologram UI",
    url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    desc: "Glowing futuristic blueprint"
  }
];

export function AddProjectModal({ onClose, onAdd }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    role: "",
    metrics: "",
    techStack: "",
    description: "",
    githubUrl: "",
    playStoreUrl: "",
    imageUrl: PRESET_IMAGES[0].url,
    featured: false
  });

  const [customImage, setCustomImage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.techStack.trim()) newErrors.techStack = "At least one technical skill stack is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Parse technical stack
    const techArray = formData.techStack
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newProject: Project = {
      id: "project-" + Date.now(),
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      role: formData.role.trim(),
      description: formData.description.trim(),
      techStack: techArray,
      metrics: formData.metrics.trim() || undefined,
      githubUrl: formData.githubUrl.trim() || undefined,
      playStoreUrl: formData.playStoreUrl.trim() || undefined,
      imageUrl: formData.imageUrl,
      featured: formData.featured
    };

    onAdd(newProject);
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
      />

      {/* Frame Container */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="relative w-full max-w-2xl max-h-[90vh] glass-panel rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col border border-white/10"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0c10]">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" /> System Registry
            </span>
            <h3 className="text-xl font-serif font-bold text-white mt-1">Deploy New Project Code</h3>
            <p className="text-xs text-gray-400 mt-0.5">Initialize a custom repository milestone directly to the visual index.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5.5 h-4.5" />
          </button>
        </div>

        {/* Content Area Form */}
        <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto bg-[#07080b] space-y-5 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Title *</label>
              <input
                type="text"
                placeholder="e.g. Jetpack Audio Engine"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#0b0c10]/60 border border-white/10 hover:border-white/15 focus:border-amber-500 rounded-xl px-4.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              />
              {errors.title && <span className="text-[10px] font-mono text-red-400 block">{errors.title}</span>}
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Subtitle *</label>
              <input
                type="text"
                placeholder="e.g. Low-latency FFT synthesizer"
                value={formData.subtitle}
                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full bg-[#0b0c10]/60 border border-white/10 hover:border-white/15 focus:border-amber-500 rounded-xl px-4.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              />
              {errors.subtitle && <span className="text-[10px] font-mono text-red-400 block">{errors.subtitle}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Role */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Engineering Role *</label>
              <input
                type="text"
                placeholder="e.g. Lead Core Architecture Developer"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#0b0c10]/60 border border-white/10 hover:border-white/15 focus:border-amber-500 rounded-xl px-4.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              />
              {errors.role && <span className="text-[10px] font-mono text-red-400 block">{errors.role}</span>}
            </div>

            {/* Metrics */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Metrics Tag (Optional)</label>
              <input
                type="text"
                placeholder="e.g. 60FPS Render Cycle or 4.9★ (3M+ Users)"
                value={formData.metrics}
                onChange={e => setFormData({ ...formData, metrics: e.target.value })}
                className="w-full bg-[#0b0c10]/60 border border-white/10 hover:border-white/15 focus:border-amber-500 rounded-xl px-4.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Technical Stack Tags */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Technical Stack (Comma-Separated) *</label>
            <input
              type="text"
              placeholder="e.g. Kotlin, Jetpack Compose, WebRTC, Coroutines, Flow"
              value={formData.techStack}
              onChange={e => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full bg-[#0b0c10]/60 border border-white/10 hover:border-white/15 focus:border-amber-500 rounded-xl px-4.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
            />
            <p className="text-[9px] text-gray-500 font-mono mt-0.5">Break up libraries or frameworks using simple commas. Each segment represents an independent badge.</p>
            {errors.techStack && <span className="text-[10px] font-mono text-red-400 block">{errors.techStack}</span>}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Milestone Engineering Summary *</label>
            <textarea
              rows={3}
              placeholder="Report specific architecture goals, memory allocations, low-latency threading metrics, and core code contributions implemented for this project system..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#0b0c10]/60 border border-white/10 hover:border-white/15 focus:border-amber-500 rounded-xl px-4.5 py-3 text-xs text-white focus:outline-none transition-colors resize-none leading-relaxed"
            />
            {errors.description && <span className="text-[10px] font-mono text-red-400 block">{errors.description}</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Github URL */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Github URL (Optional)</label>
              <input
                type="url"
                placeholder="https://github.com/sushantchauhan08/..."
                value={formData.githubUrl}
                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full bg-[#0b0c10]/60 border border-white/10 hover:border-white/15 focus:border-amber-500 rounded-xl px-4.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              />
            </div>

            {/* PlayStore URL */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Play Store URL (Optional)</label>
              <input
                type="url"
                placeholder="https://play.google.com/store/apps/details?id=..."
                value={formData.playStoreUrl}
                onChange={e => setFormData({ ...formData, playStoreUrl: e.target.value })}
                className="w-full bg-[#0b0c10]/60 border border-white/10 hover:border-white/15 focus:border-amber-500 rounded-xl px-4.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Image Selection Block */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Mockup Artwork & Frame Source</label>
              <button
                type="button"
                onClick={() => setCustomImage(!customImage)}
                className="text-[10px] font-mono text-amber-400 hover:text-amber-300 font-bold transition-all cursor-pointer"
              >
                {customImage ? "Use High-End UI Presets" : "Use Custom Image URL"}
              </button>
            </div>

            {customImage ? (
              <div className="space-y-1.5">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-[#0b0c10]/60 border border-white/10 hover:border-white/15 focus:border-amber-500 rounded-xl px-4.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {PRESET_IMAGES.map(img => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: img.url })}
                    className={`p-1.5 rounded-xl border relative text-left overflow-hidden group transition-all cursor-pointer ${
                      formData.imageUrl === img.url 
                        ? "border-amber-500 bg-amber-500/5 shadow-md shadow-amber-500/5 scale-102" 
                        : "border-white/5 bg-[#0b0c10]/40 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="rounded-lg overflow-hidden aspect-video relative">
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      {formData.imageUrl === img.url && (
                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center backdrop-blur-[1px]">
                          <Check className="w-4 h-4 text-white drop-shadow-md bg-amber-500 rounded-full p-0.5" />
                        </div>
                      )}
                    </div>
                    <div className="mt-1 px-1">
                      <div className="text-[9px] font-bold text-white leading-none tracking-wide">{img.name}</div>
                      <div className="text-[7.5px] text-gray-500 line-clamp-1 mt-0.5 leading-none">{img.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-[#0a0c10]/50 border border-white/5 rounded-2xl">
            <div className="space-y-0.5">
              <span className="text-xs text-white font-bold block">Highlight as Featured Work</span>
              <p className="text-[10px] text-gray-500">Enable this variable to force critical dashboard indexing inside initial showcase queries.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-500 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-white peer-checked:after:border-amber-600 font-sans"></div>
            </label>
          </div>

          {/* Bottom Actions footer */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-end space-x-3 bg-transparent">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/5 hover:bg-white/5 text-xs text-gray-400 hover:text-white transition-all cursor-pointer font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#050505] font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer scale-102 hover:scale-105 active:scale-98 shadow-md shadow-amber-500/10"
            >
              <Plus className="w-4 h-4 text-black stroke-[3px]" /> Complete Deployment
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
