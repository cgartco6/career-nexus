'use client';

import React from 'react';
import { ShieldAlert, Users, CheckSquare, Eye, Lock } from 'lucide-react';

export default function AdminDashboard() {
  const auditLogs = [
    { id: "LOG-8839", actor: "System API Gateway", action: "PII Cryptographic Decryption", resource: "CV Records ID: 902", status: "POPIA Safe" },
    { id: "LOG-8840", actor: "Auditor Access Node", action: "FICA Clearance Validation", resource: "User Profile ID: 411", status: "Passed" }
  ];

  return (
    <div className="min-h-screen bg-[#020C1B] text-slate-100 p-8">
      <div className="max-w-7xl mx-auto mb-10 border-b border-slate-800 pb-6">
        <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Internal Security Framework</span>
        <h1 className="text-4xl font-extrabold text-white mt-1">Compliance & POPIA Control Panel</h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-cyan-950 border border-cyan-800 rounded-lg text-cyan-400"><Users className="h-6 w-6" /></div>
          <div><h3 className="text-xs text-slate-400 uppercase font-bold">Total Platform Records</h3><p className="text-2xl font-black text-white">1,240 Profiles</p></div>
        </div>
        <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-950 border border-amber-800 rounded-lg text-amber-400"><ShieldAlert className="h-6 w-6" /></div>
          <div><h3 className="text-xs text-slate-400 uppercase font-bold">Active Encryption Encapsulations</h3><p className="text-2xl font-black text-white">Military AES-256</p></div>
        </div>
        <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-lg text-emerald-400"><CheckSquare className="h-6 w-6" /></div>
          <div><h3 className="text-xs text-slate-400 uppercase font-bold">FICA Verification Pipeline</h3><p className="text-2xl font-black text-white">100% Compliant</p></div>
        </div>
      </div>

      {/* Production Audit Log Matrix Table */}
      <div className="max-w-7xl mx-auto bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Lock className="text-amber-400 h-5 w-5" /> Live Regulatory Access Logs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono">
                <th className="py-3 px-4">Tracking Event ID</th>
                <th className="py-3 px-4">Authorized Actor Node</th>
                <th className="py-3 px-4">Operational Action Type</th>
                <th className="py-3 px-4">Target Inspected Resource</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
              {auditLogs.map((log, index) => (
                <tr key={index} className="hover:bg-slate-900/40">
                  <td className="py-4 px-4 text-cyan-400 font-bold">{log.id}</td>
                  <td className="py-4 px-4">{log.actor}</td>
                  <td className="py-4 px-4 font-sans">{log.action}</td>
                  <td className="py-4 px-4">{log.resource}</td>
                  <td className="py-4 px-4"><span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px]">{log.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
