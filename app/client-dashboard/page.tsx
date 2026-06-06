'use client';

import React, { useState } from 'react';
import { FileText, Cpu, CheckCircle2, Download, ArrowRight, MessageSquare, Award } from 'lucide-react';

export default function ClientDashboard() {
  const [chatLog, setChatLog] = useState([
    { role: 'ai', text: 'Based on your long-term profile data, you have 6 years of experience in cloud architecture. Why should we choose you over candidates with deeper infrastructure backgrounds?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setChatLog(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_answer: userMsg, user_id: "test-user-uuid" })
      });
      const data = await response.json();
      if (data.evaluation) {
        setChatLog(prev => [
          ...prev,
          { role: 'ai', text: `[CRITIQUE]: ${data.evaluation.critique}` },
          { role: 'ai', text: `[NEXT QUESTION]: ${data.evaluation.next_question}` }
        ]);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#020C1B] text-slate-100 p-8">
      {/* Dashboard Heading Banner */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">Workspace Management Platform</span>
          <h1 className="text-4xl font-extrabold text-white mt-1 tracking-tight">Executive Candidate Hub</h1>
        </div>
        <div className="flex gap-3">
          <div className="bg-[#1C2541] border border-slate-700 px-4 py-2 rounded-xl text-xs font-mono text-slate-300 flex items-center gap-2">
            <Award className="text-cyan-400 h-4 w-4" /> Account Level: Elite Tier
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Artifact Outputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="text-cyan-400 h-5 w-5" /> Your Generated Portfolios
            </h2>
            
            <div className="space-y-3">
              <div className="bg-[#020C1B]/60 border border-slate-700 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white">ATS_Optimized_CV.pdf</h4>
                  <p className="text-xs text-slate-400">Tailored for Cloud Architecture</p>
                </div>
                <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-cyan-400 transition">
                  <Download className="h-4 w-4" />
                </button>
              </div>

              <div className="bg-[#020C1B]/60 border border-slate-700 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white">Targeted_Cover_Letter.pdf</h4>
                  <p className="text-xs text-slate-400">Executive Structure Template</p>
                </div>
                <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-cyan-400 transition">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1C2541]/40 to-slate-900/10 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">POPIA & GDPR Tracking Statement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your biometric data identification streams and processed CV payloads remain fully encrypted at rest with military-grade AES-256-GCM architecture.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive AI Simulation Matrix with Memory Check */}
        <div className="lg:col-span-7 bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between min-h-[500px]">
          <div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="text-cyan-400 h-5 w-5" /> AI Simulation Coach (Persistent Memory Active)
              </h2>
              <span className="text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 px-2.2 py-1 rounded border border-emerald-800">
                Vector Sync Active
              </span>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {chatLog.map((chat, i) => (
                <div key={i} className={`p-4 rounded-xl text-xs leading-relaxed max-w-[85%] ${chat.role === 'user' ? 'bg-slate-800 text-slate-100 ml-auto' : 'bg-[#020C1B] border border-slate-800 text-cyan-300'}`}>
                  <strong>{chat.role === 'user' ? 'You: ' : 'Coach Engine: '}</strong>
                  <p className="mt-1 font-mono">{chat.text}</p>
                </div>
              ))}
              {loading && <p className="text-xs font-mono text-slate-500 animate-pulse">AI Coach is consulting historical long-term memory vectors...</p>}
            </div>
          </div>

          <div className="flex gap-2 mt-6 pt-4 border-t border-slate-800">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Provide your strategic corporate counter response..."
              className="flex-1 bg-[#020C1B] border border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400 transition"
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-5 rounded-xl text-xs transition flex items-center gap-1">
              Transmit Response <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
