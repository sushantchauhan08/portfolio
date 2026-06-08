import { useState, useMemo, useEffect } from "react";
import { 
  Award, ShieldCheck, CheckCircle, Github, Linkedin, Mail, 
  Smartphone, ChevronRight, Download, Terminal, Sliders, 
  Search, Sparkles, Activity, FileText, Check, AlertCircle, RefreshCw,
  Trash2, FolderPlus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { ProjectDetailsModal } from "./components/ProjectDetailsModal";
import { AddProjectModal } from "./components/AddProjectModal";
import { ContactConsole } from "./components/ContactConsole";
import { ExperienceTree } from "./components/ExperienceTree";
import { 
  PROJECTS, SKILL_CATEGORIES, EXPERIENCE_HISTORY, CERTIFICATIONS,
  DEV_NAME, DEV_TITLE, DEV_TAGLINE, DEV_BIO 
} from "./data";
import { Project } from "./types";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("chauhan_portfolio_projects");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return PROJECTS;
  });
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const [activeSkillCategory, setActiveSkillCategory] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  
  // Resume download compiler state
  const [isCompilingResume, setIsCompilingResume] = useState(false);
  const [resumeSteps, setResumeSteps] = useState<string[]>([]);
  const [resumeProgress, setResumeProgress] = useState(0);

  // Avatar path to reference the generated file
  const avatarUrl = "/src/assets/images/developer_avatar_1780890737977.png";
  const mockupUrl = "/src/assets/images/android_mockup_1780890722604.png";

  // Filter projects by search queries
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchQuery = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchFeatured = !featuredOnly || project.featured;
      return matchQuery && matchFeatured;
    });
  }, [projects, searchQuery, featuredOnly]);

  const handleAddProject = (newProj: Project) => {
    const updated = [newProj, ...projects];
    setProjects(updated);
    localStorage.setItem("chauhan_portfolio_projects", JSON.stringify(updated));
    setIsAddingProject(false);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem("chauhan_portfolio_projects", JSON.stringify(updated));
    setProjectToDelete(null);
  };

  // Triggers the simulated dynamic resume compilation before download
  const handleDownloadResume = () => {
    if (isCompilingResume) return;
    setIsCompilingResume(true);
    setResumeSteps([]);
    setResumeProgress(0);

    const steps = [
      "Securing connection pipeline to build server...",
      "Resolving profile assets (bio, skills, history)...",
      "Compiling resume markdown tree to PDF stream...",
      "Injecting cryptographic credential keys (SHA-256)...",
      "Optimizing PDF layers for printing & screen readers...",
      "Dossier ready! Generating local stream download..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setResumeSteps(prev => [...prev, steps[currentStep]]);
        setResumeProgress(prev => Math.min(prev + (100 / steps.length), 100));
        currentStep++;
      } else {
        clearInterval(interval);
        
        // Concurrently run the actual download of our beautifully formatted markdown resume!
        triggerActualDownload();
        
        setTimeout(() => {
          setIsCompilingResume(false);
        }, 1200);
      }
    }, 600);
  };

  const triggerActualDownload = () => {
    const resumeText = `
============================================================
${DEV_NAME.toUpperCase()} - RESUME
${DEV_TITLE}
============================================================
Email: sushantchauhan08@gmail.com | Portfolio: Rivera.dev
Focus: Android SDK, Jetpack Compose, Kotlin, KMP, High-Perf UI

PROFESSIONAL BIO
------------------------------------------------------------
${DEV_BIO}

KEY COMPETENCIES
------------------------------------------------------------
- Architecture: MVI, MVVM, Clean Architecture, UDF
- Libraries: Jetpack Compose, Coroutines, Flow, Room, Hilt
- Optimization: Memory profiling, custom canvases, background telemetry, LeakCanary
- Multiplatform: Kotlin Multiplatform (KMP), Ktor

EXPERIENCE SUMMARY
------------------------------------------------------------
${EXPERIENCE_HISTORY.map(exp => `
* ${exp.role} | ${exp.company} (${exp.period})
  - ${exp.achievements.join("\n  - ")}
  - Tech: ${exp.techUsed.join(", ")}
`).join("\n")}

CERTIFICATIONS
------------------------------------------------------------
${CERTIFICATIONS.map(cert => `
* ${cert.name} - Issued by ${cert.issuer} (${cert.date})
  Credential ID: ${cert.credentialId || "N/A"}
`).join("\n")}

============================================================
Document assembled dynamically via Secure Portfolio API.
============================================================
    `;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${DEV_NAME.replace(" ", "_")}_Android_Engineer_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 selection:bg-amber-500/25 selection:text-white antialiased">
      
      {/* Sticky Translucent Navbar */}
      <Navbar onDownloadResume={handleDownloadResume} />

      {/* Main Content Containers */}
      <main className="relative pt-24 md:pt-32 pb-16 space-y-24 md:space-y-36">

        {/* Ambient background subtle lighting effects */}
        <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-[80vh] right-[10%] w-[30vw] h-[30vw] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

        {/* 1. HERO SECTION */}
        <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text Content (col-span-7) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Profile Badge Status */}
              <div className="inline-flex items-center space-x-2 bg-amber-500/5 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-400 font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Available for Elite Android Roles</span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.05]">
                  Hi, I'm <span className="text-gradient font-serif italic font-bold">{DEV_NAME}</span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-display text-gray-350 tracking-wide font-sans mt-1">
                  {DEV_TITLE}
                </h2>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans max-w-2xl font-light">
                  {DEV_TAGLINE}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById("projects");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-full bg-white hover:bg-white/95 text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 group scale-102 hover:scale-105 cursor-pointer shadow-lg shadow-white/5"
                  id="view-work-btn"
                >
                  <span>Explore Portfolio</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleDownloadResume}
                  className="px-6 py-3 rounded-full border border-white/10 hover:border-amber-500/35 bg-white/2 hover:bg-amber-500/5 text-xs text-white font-mono tracking-wider uppercase transition-all flex items-center space-x-2 cursor-pointer"
                  id="download-resume-hero"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download CV</span>
                </button>
              </div>

              {/* Brief bio text details */}
              <p className="text-xs text-gray-500 block leading-relaxed max-w-xl font-sans mt-4 italic">
                "{DEV_BIO}"
              </p>
            </div>

            {/* Profile Avatar Overlay and Smartphone Frame Mockup Column (col-span-5) */}
            <div className="lg:col-span-5 flex justify-center items-center relative select-none">
              
              {/* Outer decorative orbit rings */}
              <div className="absolute w-[360px] h-[360px] border border-dashed border-white/5 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
              <div className="absolute w-[440px] h-[440px] border border-dotted border-white/5 rounded-full animate-[spin_100s_linear_infinite] pointer-events-none" />

              {/* Avatar Picture Overlapping Mask */}
              <div className="absolute -left-12 bottom-6 z-20 w-44 h-44 rounded-2xl overflow-hidden shadow-2xl glass-panel p-1 border border-white/15 animate-float hidden sm:block">
                <div className="w-full h-full rounded-[14px] bg-[#0c0d12] overflow-hidden relative">
                  <img 
                    src={avatarUrl} 
                    alt={DEV_NAME} 
                    className="w-full h-full object-cover scale-102 filter-none saturate-[1.1]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-[#050505]/70 border border-white/5 backdrop-blur-md rounded-lg py-1 px-2">
                    <span className="text-[9px] font-mono font-bold tracking-wide text-white">Sushant Chauhan</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Isometric Smartphone rendering visually (glowing Android mockup generated app) */}
              <div className="relative z-10 w-[240px] h-[430px] rounded-[36px] bg-[#0c0d12] p-2.5 border border-white/10 shadow-amber-500/5 shadow-2xl animate-float-delayed flex items-center justify-center">
                <div className="w-full h-full bg-[#030406] rounded-[28px] overflow-hidden relative flex flex-col justify-between items-center p-3 text-center border border-white/5">
                  <img 
                    src={mockupUrl} 
                    alt="Neobank Application Interface Artwork" 
                    className="w-full h-[65%] object-cover rounded-2xl pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="w-full h-[32%] flex flex-col justify-center items-center px-1 text-center bg-white/2 rounded-xl border border-white/5">
                    <span className="text-[10px] font-display font-medium tracking-wide text-white block">Vortex Engine v12</span>
                    <p className="text-[8px] text-gray-500 leading-normal max-w-[150px] font-sans mt-1">Rendered with pure Android Jetpack Compose custom shader protocols.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 2. STATS OVERVIEW SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" id="stats-grid-container">
            {[
              { val: "8+ Years", label: "Dev Tenure", desc: "Native SDK Focus" },
              { val: "3M+ Installs", label: "Global Reach", desc: "Play Store Apps" },
              { val: "99.92%", label: "Crash-Free", desc: "Live Stability Metrics" },
              { val: "100%", label: "Kotlin", desc: "Enterprise Standard" }
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all text-center group">
                <div className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                  {stat.val}
                </div>
                <div className="text-xs font-mono font-semibold text-gray-300 mt-1 uppercase tracking-wide">
                  {stat.label}
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SKILLS MATRIX SECTION */}
        <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Section Header */}
            <div className="text-center md:text-left space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-400 font-semibold block">
                Technical Stack Index
              </span>
              <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                Skills Matrix
              </h3>
              <p className="text-sm text-gray-400 font-sans max-w-xl">
                Expert knowledge metrics across specialized mobile modules. Select a stack index to preview levels.
              </p>
            </div>

            {/* Interactive Section Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Category tabs selection (col-span-4) */}
              <div className="lg:col-span-4 flex flex-col space-y-2">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.title}
                    onClick={() => setActiveSkillCategory(idx)}
                    className={`w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs font-semibold ${
                      activeSkillCategory === idx 
                        ? "glass-panel-heavy text-amber-400 shadow-md border-amber-500/20" 
                        : "bg-[#0b0c10]/40 border-white/5 text-gray-400 hover:text-white hover:bg-[#0b0c10]/60"
                    }`}
                    id={`skill-cat-${idx}`}
                  >
                    <span>{cat.title}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeSkillCategory === idx ? "translate-x-1" : ""}`} />
                  </button>
                ))}
              </div>

              {/* Skills gauges visualization container (col-span-8) */}
              <div className="lg:col-span-8 bg-[#0b0c10]/50 border border-white/5 rounded-3xl p-6 md:p-8 min-h-[310px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSkillCategory}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-xs uppercase font-mono text-amber-400 font-bold tracking-widest block mb-1">
                        Active Subsystems: {SKILL_CATEGORIES[activeSkillCategory].title}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-sans">Self-reported core knowledge level derived from production-grade code deployments.</p>
                    </div>

                    <div className="space-y-5">
                      {SKILL_CATEGORIES[activeSkillCategory].skills.map((skill, sIdx) => (
                        <div key={skill.name} className="space-y-1.5 focus-mode-class">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono text-white text-[12px] font-semibold flex items-center gap-1.5">
                              <span className="w-1 h-1.5 rounded-full bg-amber-400" />
                              {skill.name}
                            </span>
                            <span className="font-mono text-amber-400 font-semibold">{skill.level}% Proficiency</span>
                          </div>

                          {/* Glow Progress level track */}
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 glow-amber"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* 4. WORK SHOWCASE (PROJECTS) SECTION */}
        <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Headers, Searh Filter elements */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 text-left">
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-400 font-semibold block">
                  Showcase Repository
                </span>
                <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                  Featured Work
                </h3>
                <p className="text-sm text-gray-400 max-w-xl">
                  Inspect real applications, compiled files, and architecture frameworks engineered from pure source logic.
                </p>
              </div>

              {/* Filtering mechanism search controls */}
              <div className="w-full md:w-auto flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => setIsAddingProject(true)}
                  className="px-4 py-2.5 rounded-xl border border-amber-500/25 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-mono text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 focus:outline-none"
                  id="add-project-btn"
                >
                  <FolderPlus className="w-3.5 h-3.5 stroke-[2.5px]" /> Deploy Project
                </button>

                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stack or title..."
                    className="w-full pl-9 pr-4 py-2.5 bg-[#0b0c10]/40 border border-white/10 hover:border-white/15 focus:border-amber-500 rounded-xl text-xs text-white focus:outline-none transition-colors"
                    id="project-search-input"
                  />
                </div>

                <button
                  onClick={() => setFeaturedOnly(!featuredOnly)}
                  className={`px-4 py-2.5 rounded-xl border font-mono text-xs font-medium cursor-pointer transition-colors ${
                    featuredOnly
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-transparent text-gray-400 border-white/10 hover:text-white"
                  }`}
                  id="featured-filter-btn"
                >
                  Featured Only
                </button>
              </div>
            </div>

            {/* Grid layout containing cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="projects-render-grid">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="glass-panel hover:border-white/20 hover:shadow-lg hover:shadow-white/5 rounded-3xl p-5 hover:translate-y-[-4px] transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      {/* Image Frame block */}
                      {project.imageUrl && project.imageUrl.startsWith("/") ? (
                        <div className="rounded-2xl overflow-hidden aspect-video relative border border-white/5 bg-[#0b0c10]">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020305]/95 via-transparent to-transparent" />
                        </div>
                      ) : (
                        <div className="rounded-2xl aspect-video border border-dashed border-white/5 bg-white/2 p-6 flex flex-col justify-center items-center text-center">
                          <Smartphone className="w-10 h-10 text-amber-500/40 mb-2" />
                          <span className="text-[10px] font-mono text-amber-400 block font-semibold uppercase">{project.metrics || "Active App Suite"}</span>
                        </div>
                      )}

                      {/* Info elements */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-lg font-serif font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                              {project.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{project.subtitle}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            {project.metrics && (
                              <span className="text-[10px] font-mono bg-amber-500/5 border border-amber-500/20 px-2 py-0.5 rounded text-amber-400">
                                {project.metrics}
                              </span>
                            )}
                            
                            {projectToDelete === project.id ? (
                              <div className="flex items-center gap-1 bg-[#12080a] border border-red-500/20 rounded px-1.5 py-0.5" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteProject(project.id);
                                  }}
                                  className="text-[9px] font-mono font-bold text-red-400 hover:text-red-300 cursor-pointer focus:outline-none"
                                  title="Confirm delete"
                                >
                                  Delete
                                </button>
                                <span className="text-[8px] text-gray-650">|</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setProjectToDelete(null);
                                  }}
                                  className="text-[9px] font-mono font-bold text-gray-400 hover:text-white cursor-pointer focus:outline-none"
                                  title="Cancel delete"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProjectToDelete(project.id);
                                }}
                                className="p-1 rounded bg-white/2 border border-white/5 hover:border-red-500/20 hover:bg-red-500/10 text-gray-500 hover:text-red-400 cursor-pointer transition-all focus:outline-none"
                                title="Delete project code record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom row actions */}
                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[9px] font-mono bg-white/2 border border-white/5 px-2 py-0.5 rounded text-gray-400">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[9px] font-mono text-gray-500 px-1 py-0.5">+{project.techStack.length - 3}</span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1 group-hover:text-amber-300 cursor-pointer"
                        id={`project-details-${project.id}`}
                      >
                        Inspect Dossier <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredProjects.length === 0 && (
                <div className="col-span-1 md:col-span-2 py-16 text-center text-gray-500 space-y-4">
                  <AlertCircle className="w-12 h-12 text-gray-700 mx-auto animate-pulse" />
                  <p className="text-sm font-mono leading-relaxed">No matching repositories found. Clear filter criteria to index the source manifest.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setFeaturedOnly(false); }}
                    className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-amber-500/35 text-xs font-mono text-amber-400 cursor-pointer"
                  >
                    Restore Matrix Index
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* 5. PROFESSIONAL MILESTONES (EXPERIENCE TIMELINE) SECTION */}
        <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Section Header */}
            <div className="text-center md:text-left space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-400 font-semibold block">
                Engineering Chronicle
              </span>
              <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                Work Milestones
              </h3>
              <p className="text-sm text-gray-400 max-w-xl">
                A historical log of engineering contributions, metrics achieved, and libraries managed during corporate tenures.
              </p>
            </div>

            {/* Dynamic visual vertical timeline list switcher */}
            <ExperienceTree history={EXPERIENCE_HISTORY} />

          </div>
        </section>

        {/* 6. VERIFIABLE CERTIFICATIONS */}
        <section id="certifications" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Section Header */}
            <div className="text-center md:text-left space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-400 font-semibold block">
                Google & Alliance Verifications
              </span>
              <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                Certifications
              </h3>
              <p className="text-sm text-gray-400 max-w-xl">
                Legitimately issued and verifiable technical achievements within global software ecosystem councils.
              </p>
            </div>

            {/* Grid Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="cert-grid-layout">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="glass-panel p-5.5 rounded-2xl flex items-start space-x-4 border border-white/5 hover:border-white/10 hover:bg-[#07090d] transition-colors">
                  <div className="p-2.5 rounded-xl bg-amber-500/5 text-amber-400 shrink-0 border border-amber-500/10">
                    {cert.iconName === "Award" ? <Award className="w-5 h-5" /> : cert.iconName === "ShieldCheck" ? <ShieldCheck className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-white font-display leading-tight">{cert.name}</h4>
                    <p className="text-xs text-gray-400 font-semibold">{cert.issuer}</p>
                    <div className="flex gap-2 items-center text-[10px] font-mono text-gray-500 pt-0.5">
                      <span>Ref ID: {cert.credentialId}</span>
                      <span>•</span>
                      <span>Verified: {cert.date}</span>
                    </div>

                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-amber-400 hover:text-amber-300 font-bold block pt-1 flex items-center gap-0.5 cursor-pointer"
                      >
                        Launch Verification Check
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 7. CONTACT / DISPATCH INBOX */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-400 font-semibold block">
                Socket Dispatcher
              </span>
              <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                Establish Connection
              </h3>
              <p className="text-sm text-gray-400 max-w-xl mx-auto">
                Need a principal-level software engineer for architecture design, performance advisory, or core building? Feed parameters below.
              </p>
            </div>

            {/* Form Console Component */}
            <ContactConsole />

          </div>
        </section>

      </main>      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 bg-[#030406] select-none text-center sm:text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <span className="font-display font-bold text-lg tracking-wide text-white">Chauhan<span className="text-amber-400">.dev</span></span>
            </div>
            <p className="text-xs text-gray-500 font-sans max-w-xs leading-normal">
              Premium Android Software Engineering portfolio crafted in React & Tailwind CSS. Designed with aesthetic precision.
            </p>
          </div>

          <div className="flex flex-col sm:items-end space-y-4">
            <div className="flex justify-center sm:justify-end space-x-4">
              <a 
                href="https://github.com/sushantchauhan08" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-white/2 hover:bg-amber-500/10 rounded-xl text-gray-455 hover:text-white border border-white/5 hover:border-amber-500/20 transition-all cursor-pointer" 
                aria-label="GitHub profile"
                id="footer-github"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com/in/sushant-chauhan-187abb108" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-white/2 hover:bg-amber-500/10 rounded-xl text-gray-455 hover:text-white border border-white/5 hover:border-amber-500/20 transition-all cursor-pointer" 
                aria-label="LinkedIn profile"
                id="footer-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="mailto:sushantchauhan08@gmail.com" 
                className="p-2 bg-white/2 hover:bg-amber-500/10 rounded-xl text-gray-455 hover:text-white border border-white/5 hover:border-amber-500/20 transition-all cursor-pointer" 
                aria-label="Email dispatch"
                id="footer-email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <span className="text-[10px] text-gray-655 font-mono tracking-wider block">
              © {new Date().getFullYear()} Sushant Chauhan. Structured with absolute Clean Code specs.
            </span>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAILS MODAL DIALOG OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* ADD/DEPLOY NEW PROJECT MODAL OVERLAY */}
      <AnimatePresence>
        {isAddingProject && (
          <AddProjectModal
            onClose={() => setIsAddingProject(false)}
            onAdd={handleAddProject}
          />
        )}
      </AnimatePresence>

      {/* SIMULATED DOSSIER/RESUME COMPILATION OVERLAY */}
      <AnimatePresence>
        {isCompilingResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full glass-panel-heavy rounded-3xl p-6 md:p-8 space-y-6 text-center border border-white/10 shadow-2xl relative"
              id="resume-compilation-overlay"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-amber-400 tracking-[0.25em] font-semibold uppercase block">SECURE CREDENTIAL STREAM</span>
                <h3 className="text-lg font-display font-bold text-white leading-snug">Assembling Professional Resume</h3>
                <p className="text-xs text-gray-400 leading-normal font-sans">Connecting to compilation compiler. Bundling historical telemetry metrics.</p>
              </div>

              {/* Terminal Logs block */}
              <div className="p-4 bg-[#050505] rounded-xl text-left border border-white/5 font-mono text-[9px] h-32 overflow-y-auto space-y-1 leading-normal text-gray-505">
                {resumeSteps.map((step, idx) => (
                  <div key={idx} className={idx === resumeSteps.length - 1 ? "text-amber-400 animate-pulse" : "text-gray-300"}>
                    &gt; {step}
                  </div>
                ))}
              </div>

              {/* Progress gauge */}
              <div className="space-y-1.5 text-center">
                <div className="flex justify-between text-[9px] font-mono text-amber-400">
                  <span>Assembling bytes</span>
                  <span>{Math.round(resumeProgress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 transition-all duration-300" style={{ width: `${resumeProgress}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[9px] text-gray-655 font-mono">
                <Activity className="w-3.5 h-3.5 text-gray-600 animate-pulse" />
                <span>SSL Link Active. Build: OK.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
