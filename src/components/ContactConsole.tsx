import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Terminal, Send, CheckSquare, Mail, Layers, FileCode2, Clock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SavedMessage {
  id: string;
  name: string;
  email: string;
  category: string;
  body: string;
  timestamp: string;
}

export function ContactConsole() {
  const [activePane, setActivePane] = useState<"compose" | "database">("compose");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Contract Engagement",
    timeline: "3-6 Months",
    body: ""
  });
  const [isSending, setIsSending] = useState(false);
  const [sendLogs, setSendLogs] = useState<string[]>([]);
  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([]);

  // Load from local storage
  useEffect(() => {
    try {
      const existing = localStorage.getItem("chauhan_portfolio_msgs");
      if (existing) {
        setSavedMessages(JSON.parse(existing));
      }
    } catch (e) {
      console.error("Local storage lookup failed", e);
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDispatch = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.body) {
      return;
    }

    setIsSending(true);
    setSendLogs([
      "Configuring SMTP parameters...",
      "Encrypting package metadata with GPG 2048...",
      "Negotiating secure pipeline over dev.sushantchauhan.dev:443...",
      "Sending metadata packet (application/json)..."
    ]);

    // Simulate logs staggering
    setTimeout(() => {
      setSendLogs(prev => [...prev, "✓ Server handshakes completed. HTTP-201 Created."]);
    }, 1000);

    setTimeout(() => {
      setSendLogs(prev => [...prev, "✓ Broadcast OK. Sushant alerted via push notifier socket!"]);
      
      const newMsg: SavedMessage = {
        id: "msg-" + Date.now(),
        name: formData.name,
        email: formData.email,
        category: formData.category,
        body: formData.body,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      const updated = [newMsg, ...savedMessages];
      setSavedMessages(updated);
      localStorage.setItem("chauhan_portfolio_msgs", JSON.stringify(updated));

      // Reset
      setFormData({
        name: "",
        email: "",
        category: "Contract Engagement",
        timeline: "3-6 Months",
        body: ""
      });
      setIsSending(false);
      setActivePane("database");
    }, 2400);
  };

  const deleteMessage = (id: string) => {
    const filtered = savedMessages.filter(m => m.id !== id);
    setSavedMessages(filtered);
    localStorage.setItem("chauhan_portfolio_msgs", JSON.stringify(filtered));
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/10" id="contact-console-container">
      {/* IDE Top Navigation bar */}
      <div className="bg-[#0b0c10] px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
        <div className="flex items-center space-x-2">
          {/* Virtual Window Close/Minimize buttons */}
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <span className="text-[10px] font-mono text-gray-400 ml-4 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-amber-400" /> send_inquiry_process.kt
          </span>
        </div>
        
        {/* Toggle Panes */}
        <div className="flex bg-white/2 rounded-lg p-0.5 border border-white/5 text-[11px] font-mono">
          <button
            onClick={() => setActivePane("compose")}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activePane === "compose"
                ? "bg-amber-600/10 text-amber-400 font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
            id="pane-compose-btn"
          >
            IDE Editor
          </button>
          <button
            onClick={() => setActivePane("database")}
            className={`relative px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activePane === "database"
                ? "bg-amber-600/10 text-amber-400 font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
            id="pane-db-btn"
          >
            In-Browser DB 
            {savedMessages.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 absolute top-1 right-1 animate-pulse" />
            )}
          </button>
        </div>
      </div>
      <div className="p-5 md:p-8 bg-[#07080b]">
        {activePane === "compose" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <form onSubmit={handleDispatch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">
                      Inquirer Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSending}
                        placeholder="John Doe"
                        className="w-full bg-[#0d0f14] border border-white/5 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
                        id="form-input-name"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">
                      Inquirer Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSending}
                      placeholder="john@example.com"
                      className="w-full bg-[#0d0f14] border border-white/5 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
                      id="form-input-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">
                      Inquiry Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      disabled={isSending}
                      className="w-full bg-[#0d0f14] border border-white/5 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none transition-colors cursor-pointer"
                      id="form-select-category"
                    >
                      <option value="Contract Engagement">Contract Engagement</option>
                      <option value="Full-time Role Inquiry">Full-time Role Inquiry</option>
                      <option value="Technical Advisory / Consulting">Technical Advisory / Consulting</option>
                      <option value="Coffee & Chat">Coffee & Chat</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">
                      Project Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      disabled={isSending}
                      className="w-full bg-[#0d0f14] border border-white/5 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none transition-colors cursor-pointer"
                      id="form-select-timeline"
                    >
                      <option value="Urgent (< 1 Month)">Urgent (&lt; 1 Month)</option>
                      <option value="1-3 Months">1-3 Months</option>
                      <option value="3-6 Months">3-6 Months</option>
                      <option value="Flexible Schedule">Flexible Schedule</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">
                    Payload Message Body
                  </label>
                  <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    required
                    disabled={isSending}
                    rows={4}
                    placeholder="Enter project specifications, engineering scope, or general message..."
                    className="w-full bg-[#0d0f14] border border-white/5 focus:border-amber-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors resize-none"
                    id="form-input-body"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending || !formData.name || !formData.email || !formData.body}
                    className="w-full py-3 bg-white hover:bg-[#eaeaea] disabled:bg-gray-800 disabled:text-gray-500 disabled:opacity-55 text-slate-950 font-serif font-semibold text-xs rounded-full flex items-center justify-center space-x-2 shadow-lg shadow-white/5 cursor-pointer transition-colors"
                    id="submit-form-btn"
                  >
                    {isSending ? (
                      <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-ping" />
                        COMPILING AND DISPATCHING...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Secure Packet</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Simulated Live Diagnostic Output Column */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-4 bg-[#0d0f14] border border-white/5 rounded-2xl">
                  <h4 className="text-[11px] font-mono text-amber-400 tracking-wide flex items-center gap-1 font-semibold uppercase">
                    <FileCode2 className="w-3.5 h-3.5" /> Code Block Sync
                  </h4>
                  <pre className="text-[9px] font-mono text-gray-400 mt-2 filter-none whitespace-pre-wrap leading-normal">
                    {`var inquirer = Chauhan.Inquirer(
  name = "${formData.name || "?"}",
  email = "${formData.email || "?"}",
  category = "${formData.category}"
)

val task = TaskScope(
  duration = "${formData.timeline}",
  active = true
)

// Dispatcher invoke
val status = inquirer.sendAsync(task)
`}
                  </pre>
                </div>

                {isSending && (
                  <div className="p-4 bg-[#050608] rounded-xl border border-amber-500/20 text-[9.5px] font-mono text-gray-300 space-y-1">
                    {sendLogs.map((log, idx) => (
                      <div key={idx} className={log.startsWith("✓") ? "text-amber-400 animate-pulse" : ""}>
                        &gt; {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-[10px] text-gray-500 flex items-center gap-1.5 mt-4">
                <Clock className="w-3.5 h-3.5 text-gray-600" />
                <span>Socket timeout: 3000ms. SSL encryption active.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {/* Save local storage custom view database inbox */}
            <div className="flex justify-between items-center bg-[#0d0f14] p-3 rounded-xl border border-white/5">
              <span className="text-xs font-mono text-amber-400 font-semibold">Simulated Sqlite Database / Local Storage Buffer</span>
              <span className="text-[10px] bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded font-mono font-semibold">
                {savedMessages.length} Messages
              </span>
            </div>

            <AnimatePresence>
              {savedMessages.length > 0 ? (
                savedMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-xl bg-[#090b0e] border border-white/5 space-y-2 relative group hover:border-amber-500/20 transition-all"
                  >
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="absolute right-3 top-3 p-1.5 rounded bg-white/2 hover:bg-rose-500/10 text-gray-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Purge record"
                      id={`delete-msg-${msg.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex flex-wrap items-center gap-2 pr-8 text-xs font-mono">
                      <span className="text-gray-300 font-semibold">{msg.name}</span>
                      <span className="text-gray-500">({msg.email})</span>
                      <span className="text-[10px] text-amber-400 uppercase bg-amber-400/5 px-2 py-0.5 rounded border border-amber-500/10">
                        {msg.category}
                      </span>
                      <span className="text-[9px] text-gray-600 ml-auto">{msg.timestamp}</span>
                    </div>

                    <p className="text-xs text-gray-400 whitespace-pre-wrap leading-relaxed select-text font-serif italic py-1 italic">
                      "{msg.body}"
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="py-12 text-center text-gray-500 space-y-3">
                  <Layers className="w-10 h-10 mx-auto text-gray-700 animate-pulse" />
                  <p className="text-xs font-mono">Local buffer is empty. Dispatch an inquiry to index the database.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
