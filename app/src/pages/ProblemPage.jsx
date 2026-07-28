import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

function Arrow({ label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 shrink-0 w-14">
      <span className="text-[9px] text-slate-600 font-medium text-center leading-tight whitespace-nowrap">{label}</span>
      <svg width="48" height="14" viewBox="0 0 48 14" fill="none">
        <line x1="0" y1="7" x2="36" y2="7" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3" />
        <polygon points="48,7 34,1 34,13" fill="#334155" />
      </svg>
    </div>
  );
}

export default function ProblemPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050a10] text-white">

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(5,10,16,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={() => navigate('/')} className="flex items-center">
          <img src="/zoneproof-wordmark.svg" alt="ZoneProof" className="h-9 w-auto" />
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/tech')}
            className="px-4 py-1.5 rounded-lg text-sm font-semibold text-sky-300 hover:text-white transition-colors"
            style={{ border: '1px solid rgba(14,165,233,0.3)' }}>
            How It Works
          </button>
          <button onClick={() => navigate('/map')}
            className="px-4 py-1.5 rounded-lg text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
            Open Map
          </button>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-8 flex flex-col min-h-screen">

        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="text-center mb-14">
          <motion.div variants={fade}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
            The Problem
          </motion.div>
          <motion.h1 variants={fade} className="text-4xl md:text-5xl font-black leading-tight mb-4">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Web3 Lending is Blocked by
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Paper-Based Due Diligence
            </span>
          </motion.h1>
          <motion.p variants={fade} className="text-slate-400 text-base max-w-2xl mx-auto">
            Before a single token is minted or a dollar is lent, Web3 companies pay legacy
            vendors <strong className="text-white">$12K–$20K</strong> and wait <strong className="text-white">over a week</strong> just to verify zoning.
          </motion.p>
        </motion.div>

        {/* ── Full-width horizontal flowchart ── */}
        <motion.div initial="hidden" animate="show" variants={stagger}
          className="flex items-center w-full gap-0">

          {/* Node 1 — Web3 Company */}
          <motion.div variants={fade} className="flex-1 min-w-0">
            <div className="rounded-2xl p-4 h-full text-center"
              style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.3)' }}>
              <div className="text-3xl mb-2">🏦</div>
              <div className="font-bold text-sm leading-snug text-white mb-1">Web3 Lending Company</div>
              <div className="text-[11px] text-slate-500 leading-tight">RealT · Propy · Maple Finance · Centrifuge</div>
            </div>
          </motion.div>

          <motion.div variants={fade}><Arrow label="wants to fund" /></motion.div>

          {/* Node 2 — Real estate deal */}
          <motion.div variants={fade} className="flex-1 min-w-0">
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <div className="text-3xl mb-2">🏗️</div>
              <div className="font-bold text-sm leading-snug text-white mb-1">Real Estate Project</div>
              <div className="text-[11px] text-slate-500 leading-tight">Land loan · RWA tokenization · Fractional</div>
            </div>
          </motion.div>

          <motion.div variants={fade}><Arrow label="requires" /></motion.div>

          {/* Node 3 — DD needed */}
          <motion.div variants={fade} className="flex-1 min-w-0">
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <div className="text-3xl mb-2">📋</div>
              <div className="font-bold text-sm leading-snug text-white mb-1">Zoning Due Diligence</div>
              <div className="text-[11px] text-slate-500 leading-tight">Zoning history · Petitions · Rezoning risk</div>
            </div>
          </motion.div>

          <motion.div variants={fade}><Arrow label="so they hire" /></motion.div>

          {/* Node 4 — Legacy Vendor BOTTLENECK — stats live inside */}
          <motion.div variants={fade} className="flex-1 min-w-0 relative">
            {/* Red glow */}
            <div className="absolute -inset-3 rounded-3xl opacity-20 blur-xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, #ef4444, transparent)' }} />
            <div className="relative rounded-2xl p-4 text-center"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.45)' }}>
              {/* Badge */}
              <div className="inline-flex items-center px-2 py-0.5 rounded-full mb-2 text-[10px] font-bold"
                style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.4)' }}>
                BOTTLENECK
              </div>
              <div className="text-3xl mb-2">🏢</div>
              <div className="font-bold text-sm leading-snug text-red-200 mb-1">Legacy Vendor</div>
              <div className="text-[11px] text-slate-500 leading-tight mb-3">Manual aggregation · County portals</div>
              {/* Pain stats inline */}
              <div className="flex gap-2 justify-center">
                <div className="flex-1 rounded-xl py-2 px-1"
                  style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <div className="text-lg font-black text-red-400">$20K</div>
                  <div className="text-[9px] text-slate-500">per report</div>
                </div>
                <div className="flex-1 rounded-xl py-2 px-1"
                  style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                  <div className="text-lg font-black text-orange-400">2 wks</div>
                  <div className="text-[9px] text-slate-500">to deliver</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fade}><Arrow label="delivers" /></motion.div>

          {/* Node 5 — Unverifiable PDF */}
          <motion.div variants={fade} className="flex-1 min-w-0">
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(100,116,139,0.07)', border: '1px solid rgba(100,116,139,0.2)' }}>
              <div className="text-3xl mb-2">📄</div>
              <div className="font-bold text-sm leading-snug text-slate-400 mb-1">Unverifiable PDF</div>
              <div className="text-[11px] text-slate-600 leading-tight">No on-chain proof · Trusted blindly</div>
            </div>
          </motion.div>

          <motion.div variants={fade}><Arrow label="finally allows" /></motion.div>

          {/* Node 6 — Deal proceeds */}
          <motion.div variants={fade} className="flex-1 min-w-0">
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(100,116,139,0.04)', border: '1px solid rgba(100,116,139,0.12)' }}>
              <div className="text-3xl mb-2">✅</div>
              <div className="font-bold text-sm leading-snug text-slate-500 mb-1">Deal Proceeds</div>
              <div className="text-[11px] text-slate-700 leading-tight">Token minted · Loan originated</div>
            </div>
          </motion.div>

        </motion.div>

        {/* Root cause + CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="mt-14 rounded-2xl p-7 text-center max-w-3xl mx-auto w-full"
          style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.16)' }}>
          <div className="text-xs font-bold tracking-widest text-red-400 mb-3 uppercase">Root Cause</div>
          <p className="text-slate-300 text-sm leading-relaxed">
            Zoning history is <strong className="text-white">siloed at the county level</strong>, unstructured,
            and requires manual aggregation. There is no cryptographic proof a report is authentic,
            current, or untampered — so every counterparty blindly trusts an expensive vendor.
          </p>
          <button onClick={() => navigate('/tech')}
            className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
            See How ZoneProof Fixes This →
          </button>
        </motion.div>

      </div>
    </div>
  );
}