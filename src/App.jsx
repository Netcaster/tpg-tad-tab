import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  Building2,
  Calculator,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Database,
  FileBarChart,
  Globe2,
  Home,
  Landmark,
  Layers3,
  LineChart,
  Map,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  Zap,
  TrendingUp,
  BarChart3,
  Scale,
  Briefcase,
  Sun,
  Moon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ─── PALETTE ────────────────────────────────────────────────────────────────
// Primary dark:  #051525  (deep midnight navy)
// Dark mid:      #0A1E38  (navy)
// Dark card:     #0F2545  (lighter navy)
// Background:    #F5F2EC  (warm ivory)
// Card light:    #FEFCF8  (clean white)
// Gold:          #B8922A  (institutional gold)
// Gold light:    #D4AD45  (accent gold)
// Gold bright:   #E8C55A  (highlight)
// Border light:  #DDD7CB
// Border dark:   #1A3050
// Text primary:  #0B0E17
// Text muted:    #596070
// Text dark muted: #8A9AB0

const REGIONS = [
  { id: "west", name: "Region 1: West Coast", focus: "Seattle, Portland, Los Angeles, Las Vegas", branches: 12, thesis: "Housing, hospitality, entertainment, municipal real estate, and West Coast SMB origination." },
  { id: "southwest", name: "Region 2: Southwest", focus: "Phoenix, Las Vegas, Arizona, New Mexico, Southern California", branches: 12, thesis: "R.I.S.E. expansion, land banking, real estate procurement, and hospitality infrastructure." },
  { id: "central", name: "Region 3: Central", focus: "Tulsa, OKC, Dallas, Houston, Denver", branches: 12, thesis: "Oklahoma pilot expansion, enterprise finance, contractor networks, and public-private deployment." },
  { id: "southeast", name: "Region 4: Southeast", focus: "Atlanta, Miami, Charlotte, Nashville, New Orleans", branches: 12, thesis: "SMB growth, hospitality, events, entertainment, sports, and regional tax advisory consolidation." },
  { id: "northeast", name: "Region 5: Northeast", focus: "New York, Boston, Philadelphia, Washington D.C.", branches: 12, thesis: "Institutional finance, REIT structuring, capital markets, real estate funds, and enterprise advisory." },
];

const SERVICES = [
  { icon: Calculator, title: "Consumer Tax & Financial Services", text: "Entry-level tax preparation, entity setup, personal financial organization, mortgage readiness, and document preparation for individuals moving through TPG ecosystem channels." },
  { icon: FileBarChart, title: "Bookkeeping & Fractional CFO", text: "Monthly bookkeeping, payroll administration, AP/AR, KPI dashboards, merchant reconciliation, cash-flow forecasting, and financial controls for SMBs and branch-level clients." },
  { icon: Home, title: "Real Estate Tax Advisory", text: "Cost segregation coordination, depreciation strategy, land banking, 1031 support, Opportunity Zone alignment, build-to-rent support, and permanent housing accounting architecture." },
  { icon: WalletCards, title: "Treasury & Structured Finance", text: "Hybrid treasury reporting, SPV accounting, reserve tracking, surety-related reporting support, tokenized asset accounting, and asset-backed collateral governance." },
  { icon: Landmark, title: "Enterprise & Institutional Advisory", text: "Audit readiness, capital raise preparation, investor reporting, public-company readiness, transaction support, branch controls, and national financial governance." },
  { icon: Network, title: "Branch Licensing & Operating Systems", text: "Regional branch enablement, training, CRM access, TAB brand standards, compliance playbooks, NALU onboarding, lead routing, and enterprise client origination support." },
];

const FEEDERS = [
  ["R.I.S.E.", "Residents, vendors, landlords, contractors, developers, municipalities, permanent housing and equitable ownership candidates.", TrendingUp],
  ["NALU", "AI intake engine for tax, bookkeeping, entity setup, advisory routing, compliance reminders, and branch-level concierge support.", Sparkles],
  ["EXIAL", "Wallet, loyalty, token, reward, treasury, and collateral support layer for financial governance and asset-backed infrastructure.", WalletCards],
  ["VIBE", "Hospitality, entertainment, event operators, vendors, sponsors, product partners, and room-block participants.", BarChart3],
  ["HTES", "Travel, event, sports, entertainment, and hospitality commerce channels producing SMB and enterprise advisory demand.", Globe2],
  ["TPG Energy", "Developers, contractors, equipment providers, renewable energy participants, SREC-linked projects, and infrastructure operators.", Zap],
];

const PROFORMA = [
  { year: "Year 1", branches: 16, revenue: "$400,000", note: "Pilot market validation and flagship regional recruitment." },
  { year: "Year 2", branches: 32, revenue: "$800,000", note: "Regional acceleration through local tax firms, EAs, bookkeepers, and SMB advisory groups." },
  { year: "Year 3", branches: 56, revenue: "$1,400,000", note: "Near-national coverage across the 5-region, 12-subregion architecture." },
  { year: "Year 4", branches: 60, revenue: "$1,500,000", note: "Full 60-territory branch footprint at $25,000 annual branch fee." },
  { year: "Year 5", branches: 74, revenue: "$1,850,000", note: "Renewals plus expansion branches beyond original 60-territory model." },
];

const SLIDES = [
  { eyebrow: "Enterprise Thesis", title: "TAD/TAB is the financial governance layer of TPG Worldwide.", body: "The Tax Advisory Division is not merely a tax-preparation unit. It is the compliance, accounting, tax, treasury, and real estate advisory infrastructure designed to support the entire TPG ecosystem as it scales across consumers, SMBs, real estate assets, public-private programs, and institutional finance.", bullets: ["Tax + bookkeeping + treasury + real estate finance", "Built for R.I.S.E., NALU, EXIAL, VIBE, HTES, TPGE, and TPGW partners", "Designed to resemble institutional advisory infrastructure, not retail tax prep"], icon: ShieldCheck },
  { eyebrow: "Operating Architecture", title: "TAD is the national division. TAB is the branch deployment system.", body: "TAD provides enterprise standards, technology, compliance playbooks, training, brand governance, advisory leadership, and national client-origination. TAB branches execute locally and regionally across physical, digital, virtual, and ecosystem environments.", bullets: ["National governance and branch-level execution", "Local tax firms can fly the TAB flag", "Branch operators gain TPG systems and ecosystem client flow"], icon: Building2 },
  { eyebrow: "Leadership", title: "Christina Godwin anchors the division buildout.", body: "Christina Godwin will lead TAD as the program-management and deployment executive while pursuing Enrolled Agent and Nevada real estate brokerage credentials. That combination is strategically valuable because TAD/TAB sits directly between tax, real estate, treasury, and client acquisition.", bullets: ["EA path supports tax authority and advisory credibility", "Real estate brokerage path supports asset procurement and equitable ownership", "Leadership profile aligns with R.I.S.E. Equitable phase execution"], icon: Users },
  { eyebrow: "Ecosystem Farming System", title: "Every TPG vertical becomes a client-origination arm.", body: "R.I.S.E., NALU, EXIAL, VIBE, HTES, TPG Energy, hospitality, travel, sports, entertainment, airports, and municipal infrastructure programs all produce individuals, SMBs, vendors, developers, landlords, contractors, and enterprise operators who need tax, bookkeeping, advisory, and treasury support.", bullets: ["The ecosystem manufactures the client base", "NALU routes demand to TAB branches", "TAB monetizes demand across service tiers"], icon: Globe2 },
  { eyebrow: "R.I.S.E. Equitable Phase", title: "Tax governance becomes mandatory as real estate ownership scales.", body: "The Equitable phase of R.I.S.E. requires a formal accounting and advisory infrastructure for land banking, asset procurement, permanent housing, REIT preparation, investor reporting, mortgage readiness, and hybrid treasury reporting.", bullets: ["Land banking and asset procurement support", "Permanent housing and REIT readiness", "Resident, contractor, landlord, and developer financial onboarding"], icon: Home },
  { eyebrow: "NALU + EXIAL Infrastructure", title: "AI intake and token-adjacent treasury reporting create the operating edge.", body: "NALU serves as the client inquiry, intake, routing, document collection, compliance reminder, and advisory concierge layer. EXIAL supports loyalty reward, wallet, collateral, and asset-backed infrastructure reporting where TPG programs require digital value tracking and treasury alignment.", bullets: ["NALU reduces intake friction and labor load", "EXIAL supports loyalty, wallet, and asset-backed reporting", "Together they create a scalable advisory operating system"], icon: Sparkles },
  { eyebrow: "12/365 Expansion Model", title: "Five regions. Twelve territories each. Sixty flagship branches.", body: "The TAB national rollout mirrors TPG's 12/365 branch methodology: five operating regions, twelve territories or sub-regions per region, annual enrollment cycles, limited branch participation, and performance accountability across local and regional operators.", bullets: ["5 regions", "12 territories per region", "60 flagship TAB branch opportunities"], icon: Map },
  { eyebrow: "Revenue Base", title: "Annual branch fees create the first predictable recurring revenue layer.", body: "The initial pro forma isolates annual branch fees only. Each participating branch pays a $25,000 annual branch fee for TAB brand participation, technology access, training, standards, client routing, NALU support, CRM infrastructure, and national expansion participation.", bullets: ["$25,000 annual branch participation fee", "$1.5M branch-fee revenue at 60 branches", "Upside excludes bookkeeping, tax prep, CFO, treasury, and advisory revenue"], icon: CircleDollarSign },
  { eyebrow: "Institutional Design", title: "The objective is major-firm style infrastructure for the TPG ecosystem.", body: "TAD/TAB should be designed as a professional advisory platform with compliance standards, branch governance, technology controls, program management, documented advisory playbooks, and enterprise-level delivery discipline. The credibility standard should be institutional from day one.", bullets: ["Enterprise advisory infrastructure", "Branch standards and compliance controls", "Institutional-grade reporting, training, and governance"], icon: ClipboardCheck },
  { eyebrow: "Strategic Outcome", title: "TAD/TAB becomes financeable, scalable, and acquirable infrastructure.", body: "Once branch fees are paired with recurring bookkeeping, fractional CFO, tax prep, treasury advisory, REIT accounting, and enterprise consulting revenue, TAD/TAB can become a PE-rollup, public-company support platform, institutional advisory network, and financial governance engine for TPG Worldwide.", bullets: ["Recurring revenue base", "National branch network", "Institutional advisory and treasury control layer"], icon: LineChart },
];

const THOUGHTS = [
  ["Tax governance for hybrid treasury programs", "How branch-level controls can support asset-backed infrastructure, loyalty rewards, and collateral reporting.", ShieldCheck],
  ["Permanent housing and financial readiness", "Why resident onboarding, entity support, and bookkeeping are essential before ownership pathways scale.", Home],
  ["Branch networks as advisory infrastructure", "A practical model for turning local tax operators into a national enterprise service layer.", Network],
];

// ─── NETWORK VISUALIZATION ──────────────────────────────────────────────────
function NetworkViz({ label = "Strategic tax advisory" }) {
  const nodes = [
    { cx: 400, cy: 250, r: 40, label: "NATIONAL HQ", main: true },
    { cx: 148, cy: 120, r: 26, label: "WEST", main: false },
    { cx: 652, cy: 120, r: 26, label: "NORTHEAST", main: false },
    { cx: 690, cy: 370, r: 26, label: "SOUTHEAST", main: false },
    { cx: 110, cy: 370, r: 26, label: "SOUTHWEST", main: false },
    { cx: 400, cy: 76, r: 26, label: "CENTRAL", main: false },
  ];

  const subNodes = [
    [210, 72], [96, 190], [84, 290], [190, 440], [320, 460],
    [490, 460], [610, 440], [716, 290], [704, 190], [590, 72], [340, 58], [460, 58],
  ];

  const lines = nodes.slice(1).map((n) => ({ x1: 400, y1: 250, x2: n.cx, y2: n.cy }));

  return (
    <div className="relative min-h-[520px] overflow-hidden bg-[#051525]">
      {/* Blueprint grid */}
      <svg className="absolute inset-0 h-full w-full opacity-100" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(184,146,42,0.07)" strokeWidth="0.5" />
          </pattern>
          <pattern id="bigGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(184,146,42,0.12)" strokeWidth="1" />
          </pattern>
          <radialGradient id="centerGlow" cx="50%" cy="48%" r="38%">
            <stop offset="0%" stopColor="#B8922A" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#B8922A" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width="800" height="520" fill="url(#bigGrid)" />
        <ellipse cx="400" cy="250" rx="280" ry="200" fill="url(#centerGlow)" />

        {/* Connection lines */}
        {lines.map((l, i) => (
          <g key={i}>
            <line {...l} stroke="#B8922A" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
            <line {...l} stroke="#B8922A" strokeOpacity="0.35" strokeWidth="0.5" />
          </g>
        ))}

        {/* Sub-nodes */}
        {subNodes.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill="#B8922A" fillOpacity="0.25" stroke="#B8922A" strokeWidth="1" strokeOpacity="0.4" />
        ))}

        {/* Region nodes */}
        {nodes.map((n) => (
          <g key={n.label} filter={n.main ? "url(#glow)" : undefined}>
            <circle cx={n.cx} cy={n.cy} r={n.r + 8} fill="#B8922A" fillOpacity="0.08" />
            <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.main ? "#B8922A" : "#0A1E38"} stroke="#B8922A" strokeWidth={n.main ? 0 : 1} strokeOpacity="0.7" />
            {n.main && <circle cx={n.cx} cy={n.cy} r={n.r - 12} fill="#051525" fillOpacity="0.6" />}
            <text x={n.cx} y={n.cy + (n.main ? 5 : 5)} textAnchor="middle" fill={n.main ? "#F5F2EC" : "#B8922A"} fontSize={n.main ? "11" : "9"} fontFamily="Inter, monospace" fontWeight="600" letterSpacing="1.5">
              {n.label}
            </text>
            {!n.main && (
              <text x={n.cx} y={n.cy + n.r + 16} textAnchor="middle" fill="rgba(184,146,42,0.55)" fontSize="8" fontFamily="Inter, monospace">
                12 BRANCHES
              </text>
            )}
          </g>
        ))}

        {/* Corner data overlays */}
        <g>
          <rect x="18" y="16" width="140" height="52" fill="#0A1E38" fillOpacity="0.9" stroke="#B8922A" strokeWidth="0.5" strokeOpacity="0.4" />
          <text x="28" y="34" fill="#B8922A" fontSize="8" fontFamily="Inter" fontWeight="600" letterSpacing="1.5">BRANCHES ACTIVE</text>
          <text x="28" y="56" fill="#F5F2EC" fontSize="22" fontFamily="Inter" fontWeight="700">60</text>
        </g>
        <g>
          <rect x="642" y="16" width="140" height="52" fill="#0A1E38" fillOpacity="0.9" stroke="#B8922A" strokeWidth="0.5" strokeOpacity="0.4" />
          <text x="652" y="34" fill="#B8922A" fontSize="8" fontFamily="Inter" fontWeight="600" letterSpacing="1.5">FEE CAPACITY</text>
          <text x="652" y="56" fill="#F5F2EC" fontSize="22" fontFamily="Inter" fontWeight="700">$1.5M</text>
        </g>
        <g>
          <rect x="18" y="448" width="140" height="52" fill="#0A1E38" fillOpacity="0.9" stroke="#B8922A" strokeWidth="0.5" strokeOpacity="0.4" />
          <text x="28" y="466" fill="#B8922A" fontSize="8" fontFamily="Inter" fontWeight="600" letterSpacing="1.5">REGIONS</text>
          <text x="28" y="488" fill="#F5F2EC" fontSize="22" fontFamily="Inter" fontWeight="700">5</text>
        </g>
        <g>
          <rect x="642" y="448" width="140" height="52" fill="#0A1E38" fillOpacity="0.9" stroke="#B8922A" strokeWidth="0.5" strokeOpacity="0.4" />
          <text x="652" y="466" fill="#B8922A" fontSize="8" fontFamily="Inter" fontWeight="600" letterSpacing="1.5">TERRITORIES</text>
          <text x="652" y="488" fill="#F5F2EC" fontSize="22" fontFamily="Inter" fontWeight="700">60</text>
        </g>
      </svg>

      {/* Bottom label */}
      <div className="absolute inset-x-0 bottom-0 p-8">
        <div className="max-w-sm border-l-4 border-[#B8922A] bg-[#051525]/92 p-6 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B8922A]">National Branch Network</p>
          <p className="mt-2 text-xl font-semibold text-[#F5F2EC]">{label}</p>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({ id, eyebrow, title, children, dark = false }) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 ${dark ? "bg-[#051525] text-[#F5F2EC]" : "bg-[#F5F2EC] text-[#0B0E17]"}`}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-[#B8922A]" />
            <p className={`text-[0.6rem] font-semibold uppercase tracking-[0.38em] ${dark ? "text-[#B8922A]" : "text-[#8B6A1C]"}`}>{eyebrow}</p>
          </div>
          <h2 className="max-w-4xl text-xl font-semibold tracking-tight leading-snug md:text-2xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

// ─── STAT CARD ───────────────────────────────────────────────────────────────
function Stat({ label, value, detail, icon: Icon }) {
  return (
    <div className="relative overflow-hidden border border-[#DDD7CB] bg-[#FEFCF8] p-8">
      <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.04]">
        {Icon && <Icon className="w-full h-full text-[#B8922A]" />}
      </div>
      <div className="text-xl font-semibold tracking-tight text-[#0B0E17] leading-snug">{value}</div>
      <div className="mt-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-[#B8922A]">{label}</div>
      <div className="mt-4 text-sm leading-[1.75] text-[#596070]">{detail}</div>
    </div>
  );
}

// ─── BOARDROOM DECK ──────────────────────────────────────────────────────────
function Presentation() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const Icon = slide.icon;

  const next = () => setIndex((v) => (v + 1) % SLIDES.length);
  const prev = () => setIndex((v) => (v - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="border border-[#1A3050] bg-[#051525] shadow-2xl">
      <div className="p-4 md:p-6 bg-[#0A1E38]">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-[#1A3050] pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#B8922A]">Digital Boardroom Presentation</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#F5F2EC]">TAD/TAB Enterprise Story Deck</h3>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={prev} className="flex h-10 w-10 items-center justify-center border border-[#1A3050] bg-[#051525] text-[#F5F2EC] hover:bg-[#B8922A] hover:text-[#051525] transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="border border-[#1A3050] px-4 py-2 text-sm text-[#8A9AB0] min-w-[72px] text-center">
              {index + 1} / {SLIDES.length}
            </div>
            <button onClick={next} className="flex h-10 w-10 items-center justify-center border border-[#1A3050] bg-[#051525] text-[#F5F2EC] hover:bg-[#B8922A] hover:text-[#051525] transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: 0.32 }}
            className="grid gap-8 pt-8 md:gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 border border-[#1A3050] bg-[#051525] px-4 py-2">
                <Icon className="h-4 w-4 text-[#B8922A]" />
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#8A9AB0]">{slide.eyebrow}</span>
              </div>
              <h4 className="text-xl font-semibold leading-snug text-[#F5F2EC] md:text-2xl">{slide.title}</h4>
              <p className="mt-6 text-base leading-8 text-[#8A9AB0] max-w-xl">{slide.body}</p>
            </div>

            <div className="border border-[#DDD7CB] bg-[#F5F2EC] p-7 text-[#0B0E17]">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px flex-1 bg-[#DDD7CB]" />
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#8B6A1C]">Key Talking Points</p>
                <div className="h-px flex-1 bg-[#DDD7CB]" />
              </div>
              <div className="space-y-4">
                {slide.bullets.map((bullet) => (
                  <div key={bullet} className="flex gap-3 border-l-[3px] border-[#B8922A] bg-white p-4 shadow-sm">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#B8922A]" />
                    <p className="text-sm leading-7 text-[#404550]">{bullet}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 pt-5 border-t border-[#EDE8DF]">
                <div className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8B6A1C]">Slide {index + 1} of {SLIDES.length}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="mt-8 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)}
              className={`h-1 flex-1 transition-all duration-300 ${i === index ? "bg-[#B8922A]" : "bg-[#1A3050] hover:bg-[#2A4060]"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── REGION MAP ──────────────────────────────────────────────────────────────
function RegionMap() {
  const [active, setActive] = useState(REGIONS[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      {/* Region columns */}
      <div className="border border-[#1A3050] bg-[#0A1E38] p-5 lg:p-6">
        <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[#B8922A]">Select a region</p>

        {/* Mobile: vertical list */}
        <div className="flex flex-col gap-2 lg:hidden">
          {REGIONS.map((region, i) => (
            <button key={region.id} onClick={() => setActive(region)}
              className={`flex items-center justify-between border p-4 text-left transition-all duration-200 ${active.id === region.id ? "border-[#B8922A] bg-[#B8922A] text-[#051525]" : "border-[#1A3050] bg-[#051525] text-[#F5F2EC]"}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center ${active.id === region.id ? "bg-[#051525]/20" : "bg-[#0A1E38]"}`}>
                  <Map className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className={`text-[0.58rem] font-semibold uppercase tracking-[0.2em] ${active.id === region.id ? "text-[#051525]/70" : "text-[#8A9AB0]"}`}>Region {i + 1}</p>
                  <h3 className="text-sm font-semibold leading-tight">{region.name.replace(`Region ${i + 1}: `, "")}</h3>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className={`text-2xl font-semibold ${active.id === region.id ? "text-[#051525]" : "text-[#B8922A]"}`}>12</div>
                <div className={`text-xs ${active.id === region.id ? "text-[#051525]/70" : "text-[#8A9AB0]"}`}>territories</div>
              </div>
            </button>
          ))}
        </div>

        {/* Desktop: 5-column grid */}
        <div className="hidden lg:grid grid-cols-5 gap-2">
          {REGIONS.map((region, i) => (
            <button key={region.id} onClick={() => setActive(region)}
              className={`group flex flex-col justify-between border p-4 text-left transition-all duration-200 min-h-[360px] ${active.id === region.id ? "border-[#B8922A] bg-[#B8922A] text-[#051525]" : "border-[#1A3050] bg-[#051525] text-[#F5F2EC] hover:border-[#B8922A]/50"}`}>
              <div>
                <div className={`mb-4 flex h-10 w-10 items-center justify-center ${active.id === region.id ? "bg-[#051525]/20" : "bg-[#0A1E38]"}`}>
                  <Map className="h-4 w-4" />
                </div>
                <p className={`text-[0.58rem] font-semibold uppercase tracking-[0.2em] ${active.id === region.id ? "text-[#051525]/70" : "text-[#8A9AB0]"}`}>Region {i + 1}</p>
                <h3 className="mt-2 text-sm font-semibold leading-tight">{region.name.replace(`Region ${i + 1}: `, "")}</h3>
              </div>
              <div>
                <div className={`text-3xl font-semibold ${active.id === region.id ? "text-[#051525]" : "text-[#B8922A]"}`}>12</div>
                <div className={`text-xs mt-0.5 ${active.id === region.id ? "text-[#051525]/70" : "text-[#8A9AB0]"}`}>territories</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="border border-[#1A3050] bg-[#0A1E38] p-8">
        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[#B8922A]">Selected Region</p>
            <h3 className="mt-3 text-xl font-semibold text-[#F5F2EC] leading-tight">{active.name}</h3>

            <div className="mt-7 space-y-3">
              <div className="border-l-[3px] border-[#B8922A] bg-[#051525] p-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-[#8A9AB0]">Market Focus</p>
                <p className="mt-2 text-sm leading-7 text-[#C8D0DC]">{active.focus}</p>
              </div>
              <div className="border-l-[3px] border-[#B8922A] bg-[#051525] p-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-[#8A9AB0]">Strategic Thesis</p>
                <p className="mt-2 text-sm leading-7 text-[#C8D0DC]">{active.thesis}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="bg-[#051525] p-5 border border-[#1A3050]">
                <div className="text-3xl font-semibold text-[#B8922A]">12</div>
                <div className="text-xs text-[#8A9AB0] mt-1">Sub-regions</div>
              </div>
              <div className="bg-[#051525] p-5 border border-[#1A3050]">
                <div className="text-3xl font-semibold text-[#B8922A]">$300K</div>
                <div className="text-xs text-[#8A9AB0] mt-1">Annual fee capacity</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── THEME ───────────────────────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return { theme, toggle };
}

// ─── MOBILE NAV ─────────────────────────────────────────────────────────────
const NAV_LINKS = [["#model", "Model"], ["#services", "Services"], ["#ecosystem", "Ecosystem"], ["#regions", "5 Regions"], ["#deck", "Web Deck"], ["#proforma", "Pro Forma"]];

function MobileNav({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#DDD7CB] bg-[#F5F2EC]/96 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center bg-[#051525]">
            <Layers3 className="h-5 w-5 text-[#B8922A]" />
          </div>
          <div>
            <div className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-[#8B6A1C]">TPG Worldwide</div>
            <div className="text-sm font-semibold text-[#0B0E17]">TAD / TAB</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-[0.82rem] font-medium text-[#596070] lg:flex">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-[#0B0E17] transition-colors">{label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Day/Night toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle day/night mode"
            className="flex h-10 w-10 items-center justify-center border border-[#DDD7CB] bg-[#FEFCF8] text-[#596070] hover:border-[#B8922A] hover:text-[#B8922A] transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a href="#contact" className="hidden lg:inline-flex items-center gap-2 bg-[#051525] px-5 py-2.5 text-sm font-medium text-[#F5F2EC] hover:bg-[#0A1E38] transition-colors">
            Branch Inquiry <ArrowRight className="h-3.5 w-3.5" />
          </a>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen((v) => !v)} className="flex lg:hidden h-10 w-10 items-center justify-center border border-[#DDD7CB] bg-[#FEFCF8] text-[#0B0E17]" aria-label="Toggle menu">
            <div className="flex flex-col gap-[5px]">
              <span className={`block h-0.5 w-5 bg-[#0B0E17] transition-all duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#0B0E17] transition-all duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#0B0E17] transition-all duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-[#DDD7CB] bg-[#FEFCF8] px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-[#596070] border-b border-[#EDE8DF] hover:text-[#0B0E17] transition-colors last:border-0">
                {label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 bg-[#051525] py-3 text-sm font-medium text-[#F5F2EC]">
              Branch Inquiry <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function TpgTadTabEnterpriseSite() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-[#F5F2EC] text-[#0B0E17] font-sans">

      {/* ── NAV ── */}
      <MobileNav theme={theme} toggleTheme={toggle} />

      <main id="top">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-[#F5F2EC]">
          {/* Subtle rule line background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #0B0E17 0px, #0B0E17 1px, transparent 1px, transparent 40px)" }} />

          <div className="relative mx-auto grid max-w-7xl gap-0 px-6 py-10 lg:grid-cols-2 lg:items-stretch lg:py-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex flex-col justify-center border border-[#DDD7CB] lg:border-r-0 bg-[#FEFCF8] p-8 md:p-12 lg:p-14">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px w-8 bg-[#B8922A]" />
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[#8B6A1C]">Enterprise Tax Advisory Division · National Branch Network</span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#0B0E17] leading-[1.15] sm:text-[1.75rem] lg:text-[2.25rem]">
                Strategic tax, treasury, and advisory infrastructure for TPG Worldwide.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#596070] md:text-base md:leading-8">
                TAD/TAB is a national tax, bookkeeping, treasury, real estate finance, and enterprise advisory platform built to support TPG ecosystem participants from consumer onboarding to institutional real estate, REIT, hybrid treasury, and structured finance execution.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#deck" className="inline-flex items-center gap-2 bg-[#051525] px-7 py-4 text-sm font-medium text-[#F5F2EC] hover:bg-[#0A1E38] transition-colors">
                  Launch Web Presentation <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#regions" className="inline-flex items-center gap-2 border border-[#B8922A] px-7 py-4 text-sm font-medium text-[#0B0E17] hover:bg-[#F0E8D5] transition-colors">
                  View 12/365 Rollout
                </a>
              </div>

              {/* Micro-stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#DDD7CB] pt-6">
                {[["5", "Regions"], ["60", "Branches"], ["$1.5M", "Fee Capacity"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div className="text-xl font-semibold text-[#B8922A]">{val}</div>
                    <div className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[#8B8070] mt-1">{lbl}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }} className="border border-[#DDD7CB] min-h-[520px]">
              <NetworkViz label="TAD / TAB national branch advisory platform" />
            </motion.div>
          </div>
        </section>

        {/* ── MODEL ── */}
        <Section id="model" eyebrow="Enterprise Model" title="Supporting complex tax, real estate, and treasury challenges with a controlled national branch system.">
          <div className="grid gap-5 md:grid-cols-3">
            <Stat label="TAD" value="National Division" detail="Enterprise standards, leadership, compliance, brand governance, technology, advisory systems, and national client-origination infrastructure." icon={Building2} />
            <Stat label="TAB" value="Branch Network" detail="Local and regional tax consultancies, EAs, CPAs, bookkeepers, and advisory firms operating under the TAB flag." icon={Network} />
            <Stat label="NALU" value="AI Intake Layer" detail="Client inquiry, document collection, service routing, compliance reminders, branch support, and digital help desk infrastructure." icon={Sparkles} />
          </div>

          <div className="mt-8 grid border border-[#051525] bg-[#051525] text-[#F5F2EC] lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-[#1A3050] p-10 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-5 bg-[#B8922A]" />
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-[#B8922A]">Core Positioning</p>
              </div>
              <h3 className="text-[2rem] font-semibold leading-tight">Not a retail tax shop. A financial operating system.</h3>
            </div>
            <p className="p-10 text-base leading-8 text-[#8A9AB0]">
              TAD/TAB is designed to provide the compliance, tax, bookkeeping, treasury, entity, and real estate finance support required to make the TPG ecosystem scalable, financeable, auditable, and institutionally presentable. The platform begins with entry-level services but is architected to support REITs, SPVs, public-company readiness, municipal programs, and hybrid treasury environments.
            </p>
          </div>
        </Section>

        {/* ── SERVICES ── */}
        <Section id="services" eyebrow="Related Capabilities" title="A full advisory stack from entry-level bookkeeping to enterprise treasury and real estate finance." dark>
          <div className="grid gap-px overflow-hidden border border-[#1A3050] bg-[#1A3050] md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="group bg-[#0A1E38] h-full p-8 transition-colors duration-200 hover:bg-[#0F2545]">
                  <div className="mb-7 flex h-12 w-12 items-center justify-center bg-[#B8922A]">
                    <Icon className="h-5 w-5 text-[#051525]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#F5F2EC]">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#8A9AB0]">{service.text}</p>
                  <div className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B8922A]">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* ── ECOSYSTEM ── */}
        <Section id="ecosystem" eyebrow="Client Origination Engine" title="Every TPG ecosystem vertical becomes a farming system for TAB clients.">
          <div className="grid gap-px overflow-hidden border border-[#DDD7CB] bg-[#DDD7CB] md:grid-cols-2 lg:grid-cols-3">
            {FEEDERS.map(([name, text, Icon]) => (
              <div key={name} className="bg-[#FEFCF8] p-8 group hover:bg-white transition-colors">
                <div className="flex items-start gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#EDE8DF] group-hover:bg-[#B8922A]/10 transition-colors">
                    <Icon className="h-5 w-5 text-[#B8922A]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0B0E17]">{name}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#596070]">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-[#DDD7CB] bg-[#FEFCF8] p-8">
            <div className="flex items-start gap-6 flex-wrap lg:flex-nowrap">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#051525]">
                <TrendingUp className="h-5 w-5 text-[#B8922A]" />
              </div>
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#8B6A1C] mb-2">Ecosystem flywheel</p>
                <p className="text-base leading-8 text-[#596070] max-w-4xl">
                  Each TPG vertical generates financial complexity that requires expert advisory. TAB captures that demand nationally through NALU's AI routing layer — converting ecosystem activity into branch-level client flow without cold outreach or traditional marketing spend.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── R.I.S.E. ── */}
        <Section id="rise" eyebrow="Highlight Experience" title="The Equitable phase requires tax, treasury, entity, and real estate governance before scale." dark>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Asset Procurement", "TAB supports acquisition diligence, ownership records, depreciation planning, vendor setup, and local accounting controls.", Scale],
              ["Land Banking", "Branch-level advisory supports municipality, developer, SPV, and investor reporting around land positions and project entities.", Map],
              ["Permanent Housing", "Residents, landlords, builders, contractors, and operators require tax, entity, bookkeeping, payroll, and mortgage-readiness support.", Home],
              ["REIT Readiness", "TAD creates the reporting discipline required for portfolio-level accounting, investor reporting, and institutional financing.", BarChart3],
            ].map(([title, text, Icon]) => (
              <div key={title} className="border border-[#1A3050] bg-[#0A1E38] p-7 hover:border-[#B8922A]/40 transition-colors group">
                <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#B8922A]">
                  <Icon className="h-4 w-4 text-[#051525]" />
                </div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#B8922A] mb-3">TPG Program</p>
                <h3 className="text-xl font-semibold text-[#F5F2EC]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#8A9AB0]">{text}</p>
                <div className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#B8922A] flex items-center gap-2">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── REGIONS ── */}
        <Section id="regions" eyebrow="National Expansion Plan" title="The 12/365 model converts national ambition into a controlled 5-region branch rollout.">
          <RegionMap />
        </Section>

        {/* ── DECK ── */}
        <Section id="deck" eyebrow="Dynamic Web Presentation" title="A boardroom-ready digital presentation embedded directly into the site." dark>
          <Presentation />
        </Section>

        {/* ── PRO FORMA ── */}
        <Section id="proforma" eyebrow="Branch Fee Pro Forma" title="Annual branch fees create the first recurring revenue foundation.">
          {/* Mobile: cards stacked */}
          <div className="flex flex-col gap-3 md:hidden">
            {PROFORMA.map((row, i) => (
              <div key={row.year} className="border border-[#DDD7CB] bg-[#FEFCF8] p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-[#0B0E17]">{row.year}</span>
                  <span className="text-xl font-semibold text-[#B8922A]">{row.branches} branches</span>
                </div>
                <div className="text-lg font-semibold text-[#0B0E17] mb-2">{row.revenue}</div>
                <div className="text-sm text-[#596070]">{row.note}</div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-hidden border border-[#DDD7CB]">
            <div className="grid grid-cols-4 bg-[#051525] px-7 py-4">
              {["Year", "Branches", "Branch Fee Revenue", "Deployment Note"].map((h) => (
                <div key={h} className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#8A9AB0]">{h}</div>
              ))}
            </div>
            {PROFORMA.map((row, i) => (
              <div key={row.year} className={`grid grid-cols-4 gap-4 border-t border-[#DDD7CB] px-7 py-5 items-center ${i % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#F5F2EC]"}`}>
                <div className="font-semibold text-[#0B0E17]">{row.year}</div>
                <div className="text-2xl font-semibold text-[#B8922A]">{row.branches}</div>
                <div className="font-semibold text-[#0B0E17]">{row.revenue}</div>
                <div className="text-sm text-[#596070]">{row.note}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-l-4 border-[#B8922A] bg-[#FEFCF8] p-8 border border-[#DDD7CB]">
            <div className="flex items-start gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#B8922A] mt-1">
                <ClipboardCheck className="h-5 w-5 text-[#051525]" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#0B0E17]">Important Pro Forma Note</h3>
                <p className="mt-3 text-base leading-8 text-[#596070] max-w-5xl">
                  This pro forma intentionally reflects annual branch-fee revenue only. It excludes tax preparation revenue, bookkeeping retainers, payroll services, fractional CFO retainers, treasury advisory, real estate tax advisory, REIT accounting, transaction advisory, public-company readiness, NALU technology fees, and any revenue share generated from enterprise client origination.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── THINKING ── */}
        <Section id="thinking" eyebrow="Our Thinking" title="Insights for tax, treasury, and real estate governance." dark>
          <div className="grid gap-px overflow-hidden border border-[#1A3050] bg-[#1A3050] lg:grid-cols-3">
            {THOUGHTS.map(([title, text, Icon]) => (
              <div key={title} className="bg-[#0A1E38] p-9 hover:bg-[#0F2545] transition-colors group">
                <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#B8922A]">
                  <Icon className="h-4 w-4 text-[#051525]" />
                </div>
                <p className="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#B8922A]">Briefing</p>
                <h3 className="text-xl font-semibold text-[#F5F2EC] leading-tight">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#8A9AB0]">{text}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#B8922A]">
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CTA ── */}
        <section id="contact" className="bg-[#051525] py-16 text-[#F5F2EC]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.55fr] lg:items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-[#B8922A]" />
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[#B8922A]">Branch Recruitment</p>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight leading-snug md:text-[1.75rem]">
                  Local advisors can join the national TAB platform.
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-8 text-[#8A9AB0]">
                  TAB is built for tax professionals, EAs, CPAs, bookkeepers, payroll operators, real estate finance advisors, and regional consultancies that want to access a national brand, technology stack, AI intake, enterprise systems, and TPG ecosystem client origination.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#1A3050] pt-6">
                  {[["$25K", "Annual Branch Fee"], ["60", "Flagship Branches"], ["5", "National Regions"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <div className="text-xl font-semibold text-[#B8922A]">{val}</div>
                      <div className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[#8A9AB0] mt-1">{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#1A3050] bg-[#0A1E38] p-8">
                <div className="flex h-12 w-12 items-center justify-center bg-[#B8922A] mb-7">
                  <Database className="h-5 w-5 text-[#051525]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#F5F2EC]">TAB Branch Package</h3>
                <p className="mt-2 text-sm text-[#8A9AB0]">Annual participation · $25,000</p>

                <div className="mt-7 space-y-3">
                  {[
                    "TAB brand participation rights",
                    "NALU AI intake and routing support",
                    "CRM and branch operating systems",
                    "Training, compliance & advisory playbooks",
                    "TPG ecosystem client-origination channels",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-[#C8D0DC]">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#B8922A] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-[#1A3050] pt-6">
                  <div className="text-xs text-[#8A9AB0] mb-4">Annual branch participation fee</div>
                  <div className="text-2xl font-semibold text-[#B8922A]">$25,000</div>
                </div>

                <button className="mt-7 w-full bg-[#B8922A] py-4 text-sm font-semibold text-[#051525] hover:bg-[#D4AD45] transition-colors">
                  Request Branch Review
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-[#1A3050] bg-[#051525] py-10">
          <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-[#B8922A]">
                <Layers3 className="h-4 w-4 text-[#051525]" />
              </div>
              <div>
                <div className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#8A9AB0]">TPG Worldwide</div>
                <div className="text-xs font-semibold text-[#F5F2EC]">Tax Advisory Division · TAD / TAB</div>
              </div>
            </div>
            <p className="text-[0.7rem] text-[#8A9AB0]">© {new Date().getFullYear()} TPG Worldwide. All rights reserved. Proprietary and confidential.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
