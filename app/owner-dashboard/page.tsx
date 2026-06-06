'use client';

import React from 'react';
import { Landmark, TrendingUp, ShieldCheck, PieChart, RefreshCcw } from 'lucide-react';

export default function OwnerDashboard() {
  // Production Metrics Allocation Calculations (Simulated Aggregate State Engine)
  const systemMetrics = {
    grossRevenueZar: 185000.00,
    ownerStandardBank50: 92500.00,
    africanBank10: 18500.00,
    infrastructureUpgrades40: 74000.00
  };

  return (
    <div className="min-h-screen bg-[#020C1B] text-slate-100 p-8">
      {/* Banner Component Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">System Yield Operations Ledger</span>
          <h1 className="text-4xl font-black text-white mt-1">Platform Settlement Analytics</h1>
        </div>
        <button className="bg-[#1C2541] border border-slate-700 hover:border-cyan-400 p-3 rounded-xl transition text-slate-300 flex items-center gap-2 text-xs font-mono">
          <RefreshCcw className="h-4 w-4 text-cyan-400" /> Instant Reconciliation
        </button>
      </div>

      {/* Main Aggregated Revenue Counter Card */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-950/40 via-[#1C2541]/40 to-slate-900/20 border border-slate-700 rounded-3xl p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div>
          <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="text-cyan-400 h-4 w-4" /> Gross Network Settled Volume
          </h3>
          <p className="text-5xl font-black text-white mt-2">
            R {systemMetrics.grossRevenueZar.toLocaleString('en-ZA', { minimumFractionDigits: 2 })} <span className="text-sm font-normal text-slate-400">ZAR</span>
          </p>
        </div>
        <div className="text-xs text-right font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-800/60 p-3 rounded-xl">
          <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Settlement Rule: Automated 24HR Run-Time Clearance</span>
        </div>
      </div>

      {/* Programmatic Split Tracking Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Core Account Target 1: Standard Bank Setup */}
        <div className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-blue-500"></div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Owner Share (50%)</h3>
            <Landmark className="text-blue-400 h-5 w-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">R {systemMetrics.ownerStandardBank50.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
          <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            Destination: <strong className="text-slate-200">Standard Bank Corporate</strong>
          </div>
        </div>

        {/* Core Account Target 2: African Bank Setup */}
        <div className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-emerald-500"></div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secondary Liquidity (10%)</h3>
            <Landmark className="text-emerald-400 h-5 w-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">R {systemMetrics.africanBank10.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
          <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            Destination: <strong className="text-slate-200">African Bank Vault</strong>
          </div>
        </div>

        {/* Core Account Target 3: Upgrades Reserve Fund Setup */}
        <div className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-cyan-400"></div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Continuous Upgrades (40%)</h3>
            <PieChart className="text-cyan-400 h-5 w-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">R {systemMetrics.infrastructureUpgrades40.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
          <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            Allocation: <strong className="text-slate-200">Dev & Cloud Infrastructure</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
