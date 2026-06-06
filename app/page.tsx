'use client';

import React, { useState } from 'react';
import { Upload, Cpu, ShieldCheck, CreditCard, Sparkles, Send, FileText, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  // Application State Management
  const [file, setFile] = useState<File | null>(null);
  const [industry, setIndustry] = useState('Technology');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);
  
  // Interactive Coach States
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<Array<{role: string, text: string}>>([
    { role: 'system', text: 'Welcome candidate. Give me your targeted answer for: "Why should we hire you for this role?"' }
  ]);

  // Handle Dynamic File Processing
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  // Connects Directly to the App Router Python API
  const triggerAtgOptimization = async () => {
    if (!file) return alert('Please upload a standard document file format.');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_industry', industry);

    try {
      const res = await fetch('/api/rewrite-cv', { method: 'POST', body: formData });
      const data = await res.json();
      setAiResponse(data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const triggerTutorTurn = async () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    setChatLog(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_context: industry, user_answer: userMessage, interview_stage: "Technical Screening" })
      });
      const data = await res.json();
      if (data.evaluation) {
        setChatLog(prev => [
          ...prev, 
          { role: 'critique', text: `Critique: ${data.evaluation.critique}` },
          { role: 'system', text: `Next Question: ${data.evaluation.next_question}` }
        ]);
      }
    } catch (err) { console.error(err); }
  };

  // Triggers Payment Routing Logic
  const executeGatewayCheckout = async (gateway: string) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: "user_prod_99", gateway_choice: gateway, total_zar: 450.00 })
    });
    const data = await res.json();
    if (data.checkout_url) window.location.href = data.checkout_url;
    else alert(`EFT Payment Reference: ${data.payment_instructions}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020C1B] to-[#0B132B]">
      {/* Dynamic Navigation */}
      <nav className="border-b border-slate-800 bg-[#020C1B]/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <Cpu className="text-white h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-wider text-white">CAREER<span className="text-cyan-400">NEXUS</span></span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <span className="flex items-center gap-1"><ShieldCheck className="text-cyan-400 h-4 w-4" /> POPIA Compliant</span>
          <span className="border-l border-slate-700 pl-4 text-emerald-400">Bank Grade Secure</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: AI Engine Processing */}
          <section className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-cyan-400 h-6 w-6" />
              <h2 className="text-2xl font-bold text-white">ATS Professional AI Engine</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Target Corporate Domain</label>
                <select 
                  value={industry} 
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#020C1B] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-cyan-400 transition"
                >
                  <option value="Fintech / Banking">Fintech / Banking</option>
                  <option value="Executive Management">Executive Management</option>
                  <option value="Cloud Architecture">Cloud Architecture</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center bg-[#020C1B]/50 hover:border-cyan-400/50 transition relative">
                <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                <Upload className="mx-auto text-slate-500 h-10 w-10 mb-3" />
                <p className="text-sm text-slate-300 font-medium">{file ? file.name : "Drop raw CV file here or browse computer"}</p>
                <p className="text-xs text-slate-500 mt-1">Accepts document or plain text source streams</p>
              </div>

              <button 
                onClick={triggerAtgOptimization}
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(0,229,255,0.25)] transition flex items-center justify-center gap-2"
              >
                {loading ? "Re-engineering Strategy Matrix..." : "Rewrite ATS Optimized Portfolio"}
              </button>
            </div>

            {aiResponse && (
              <div className="mt-6 bg-[#020C1B] border border-slate-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Generation Complete</span>
                  <span className="text-xs text-slate-400">Bundle size: {aiResponse.zip_bundle_size_bytes} bytes</span>
                </div>
                <p className="text-sm text-slate-300 line-clamp-3 italic">"{aiResponse.markdown_preview}"</p>
              </div>
            )}
          </section>

          {/* Section 2: Real-time AI Simulator Coach */}
          <section className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-cyan-400 h-6 w-6" />
              <h2 className="text-2xl font-bold text-white">AI Simulator & Executive Coach</h2>
            </div>

            <div className="bg-[#020C1B] rounded-xl border border-slate-800 p-4 h-64 overflow-y-auto space-y-3 font-mono text-xs">
              {chatLog.map((log, idx) => (
                <div key={idx} className={`p-3 rounded-lg ${log.role === 'user' ? 'bg-slate-800 text-right ml-12' : log.role === 'critique' ? 'bg-amber-950/40 border border-amber-800/60 text-amber-200' : 'bg-blue-950/40 border border-blue-900/60 text-cyan-200'}`}>
                  <p>{log.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <input 
                type="text" 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Type precise strategic verbal response..."
                className="flex-1 bg-[#020C1B] border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400"
              />
              <button onClick={triggerTutorTurn} className="bg-slate-800 hover:bg-slate-700 px-4 rounded-xl text-cyan-400 transition">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Checkout Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-gradient-to-b from-[#1C2541]/80 to-[#1C2541]/20 border border-slate-700 rounded-2xl p-6 relative overflow-hidden sticky top-28">
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 h-32 w-32 bg-cyan-400/10 rounded-full blur-2xl"></div>
            
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">Premium Tier Package</h3>
            <h2 className="text-3xl font-extrabold text-white mb-4">Enterprise Hub Pass</h2>
            
            <div className="border-t border-b border-slate-700 py-4 my-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-400">AI Rewriter Core License</span><span className="text-white font-medium">Included</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">PDF / Document Automated Zip Pack</span><span className="text-white font-medium">Included</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">South African Compliance Guard</span><span className="text-white font-medium">Enforced</span></div>
            </div>

            <div className="flex justify-between items-baseline mb-6">
              <span className="text-slate-400 text-sm font-medium">Total Execution Cost:</span>
              <span className="text-4xl font-black text-white">R 450<span className="text-xs font-normal text-slate-400">.00 ZAR</span></span>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Select Transaction Gateway</p>
              
              {/* South African Payment Rails */}
              <button onClick={() => executeGatewayCheckout('ozow')} className="w-full bg-[#E2E8F0] hover:bg-white text-[#0B132B] font-bold py-3 px-4 rounded-xl transition flex justify-between items-center text-sm">
                <span>Instant EFT via <strong>Ozow</strong></span>
                <CreditCard className="h-4 w-4 text-slate-700" />
              </button>

              <button onClick={() => executeGatewayCheckout('payfast')} className="w-full bg-[#1A365D] hover:bg-[#2A4D7C] text-white font-bold py-3 px-4 rounded-xl transition flex justify-between items-center text-sm border border-slate-600">
                <span>Pay with <strong>PayFast</strong></span>
                <CreditCard className="h-4 w-4 text-cyan-400" />
              </button>

              {/* Global Alternative Processing */}
              <button onClick={() => executeGatewayCheckout('stripe')} className="w-full bg-[#635BFF] hover:bg-[#7A73FF] text-white font-bold py-3 px-4 rounded-xl transition flex justify-between items-center text-sm">
                <span>Global Cards (<strong>Stripe</strong>)</span>
                <CreditCard className="h-4 w-4 text-white" />
              </button>

              {/* Direct Secure EFT */}
              <button onClick={() => executeGatewayCheckout('eft')} className="w-full bg-slate-900/60 hover:bg-slate-900 border border-slate-700 text-slate-300 font-bold py-3 px-4 rounded-xl transition flex justify-between items-center text-sm">
                <span>Direct Manual FNB EFT Ledger</span>
                <FileText className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
