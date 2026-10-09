import React from 'react'
import {
  TrendingUp,
  DollarSign,
  Search,
  MessageSquare,
  Sparkles,
  Bot,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  CalendarDays,
  FileText,
  Car,
  Layers,
  Zap,
} from 'lucide-react'
import {
  BusinessProfile,
  MetaAdCampaign,
  UnifiedLeadConversation,
  SeoIssue,
} from '../data/mockData'
import { NavTabId } from './Sidebar'

interface DashboardOverviewProps {
  currentProfile: BusinessProfile
  ads: MetaAdCampaign[]
  leads: UnifiedLeadConversation[]
  seoIssues: SeoIssue[]
  onNavigate: (tab: NavTabId) => void
  onRunAudit: () => void
  onAutoFixSeo: () => void
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentProfile,
  ads,
  leads,
  seoIssues,
  onNavigate,
  onRunAudit,
}) => {
  const totalSpend = ads.reduce((acc, a) => acc + a.totalSpent, 0)
  const totalRevenue = ads.reduce((acc, a) => acc + a.revenue, 0)
  const averageRoas = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : '4.60'
  const unreadLeadsCount = leads.filter((l) => l.unread || l.status === 'Needs Reply').length
  const fixedSeoCount = seoIssues.filter((i) => i.fixed).length

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-2">
      {/* Clean Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#172025] border border-[#26353d] p-8 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#46bd3b]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#46bd3b]/10 border border-[#46bd3b]/30 text-[#46bd3b] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI GROWTH PILOT · ACTIVE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {currentProfile.name}
            </h1>
            <p className="text-base text-[#91a3ae] leading-relaxed">
              Your automated growth team is driving traffic, running profitable Meta ads at a{' '}
              <strong className="text-white font-semibold">{averageRoas}x ROAS</strong>, and responding to leads across WhatsApp, Instagram, and Facebook.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={onRunAudit}
              className="px-5 py-3 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-sm transition-all shadow-[0_0_25px_rgba(70,189,59,0.3)] hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-black stroke-[2.5]" />
              <span>Run SEO Audit</span>
            </button>
            <button
              onClick={() => onNavigate('ads')}
              className="px-5 py-3 rounded-xl bg-[#1f292f] hover:bg-[#26343c] border border-[#2d3e48] text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-[#46bd3b]" />
              <span>View Campaigns</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spacious 4 Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-[#182126] border border-[#26343d] hover:border-[#46bd3b]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-[#8095a2] mb-3">
            <span className="font-medium">Ad Revenue</span>
            <div className="p-2 rounded-xl bg-[#46bd3b]/10 text-[#46bd3b]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-[#46bd3b] font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+28.4% this month</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#182126] border border-[#26343d] hover:border-[#46bd3b]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-[#8095a2] mb-3">
            <span className="font-medium">Meta ROAS</span>
            <div className="p-2 rounded-xl bg-[#46bd3b]/10 text-[#46bd3b]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {averageRoas}x
          </div>
          <div className="mt-2 text-xs text-[#46bd3b] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Target surpassed</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#182126] border border-[#26343d] hover:border-[#46bd3b]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-[#8095a2] mb-3">
            <span className="font-medium">SEO Health</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Search className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            84<span className="text-lg font-normal text-[#8095a2]">/100</span>
          </div>
          <div className="mt-2 text-xs text-cyan-400 font-medium">
            {fixedSeoCount} of {seoIssues.length} fixes applied
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#182126] border border-[#26343d] hover:border-[#46bd3b]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-[#8095a2] mb-3">
            <span className="font-medium">Unified Leads</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {leads.length}
          </div>
          <div className="mt-2 text-xs text-amber-400 font-medium">
            {unreadLeadsCount} awaiting reply
          </div>
        </div>
      </div>

      {/* The 3 Core Growth Pillars */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            The Three Growth Pillars
          </h2>
          <p className="text-xs text-[#8095a2]">
            Everything needed to rank on Google, run profitable ads, and close customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: SEO */}
          <div className="p-6 rounded-3xl bg-[#182126] border border-[#26343d] flex flex-col justify-between hover:border-[#46bd3b]/50 transition-all hover:shadow-[0_0_25px_rgba(70,189,59,0.12)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#46bd3b]/10 border border-[#46bd3b]/30 text-[#46bd3b] text-xs font-bold font-mono">
                  PILLAR 1
                </span>
                <span className="text-xs text-[#8095a2] font-mono">Score: 84%</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">SEO Intelligence</h3>
                <p className="text-xs text-[#8e9fa9] leading-relaxed mt-1">
                  Automated site audits, keyword opportunity discovery, and instant AI-written articles.
                </p>
              </div>

              <div className="py-3 border-t border-[#232f36] space-y-2 text-xs text-[#8e9fa9]">
                <div className="flex justify-between">
                  <span>Technical Health:</span>
                  <span className="text-white font-medium">88%</span>
                </div>
                <div className="flex justify-between">
                  <span>High-Intent Keywords:</span>
                  <span className="text-[#46bd3b] font-medium">5 Tracked</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('seo')}
              className="mt-6 w-full py-3 rounded-xl bg-[#202c33] hover:bg-[#46bd3b] hover:text-black text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
            >
              <span>Open SEO Engine</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Pillar 2: Meta Ads */}
          <div className="p-6 rounded-3xl bg-[#182126] border border-[#26343d] flex flex-col justify-between hover:border-[#46bd3b]/50 transition-all hover:shadow-[0_0_25px_rgba(70,189,59,0.12)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold font-mono">
                  PILLAR 2
                </span>
                <span className="text-xs text-[#8095a2] font-mono">{ads.length} Live Ads</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Smart Meta Ads</h3>
                <p className="text-xs text-[#8e9fa9] leading-relaxed mt-1">
                  AI creative scoring, automated targeting, and hands-free budget reallocation.
                </p>
              </div>

              <div className="py-3 border-t border-[#232f36] space-y-2 text-xs text-[#8e9fa9]">
                <div className="flex justify-between">
                  <span>Current ROAS:</span>
                  <span className="text-[#46bd3b] font-bold font-mono">{averageRoas}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Auto-Optimization:</span>
                  <span className="text-white font-medium">Auto-Scale Active</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('ads')}
              className="mt-6 w-full py-3 rounded-xl bg-[#202c33] hover:bg-[#46bd3b] hover:text-black text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
            >
              <span>Manage Meta Ads</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Pillar 3: Unified Leads */}
          <div className="p-6 rounded-3xl bg-[#182126] border border-[#26343d] flex flex-col justify-between hover:border-[#46bd3b]/50 transition-all hover:shadow-[0_0_25px_rgba(70,189,59,0.12)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
                  PILLAR 3
                </span>
                <span className="text-xs text-[#8095a2] font-mono">WhatsApp · IG · FB</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Unified Leads Inbox</h3>
                <p className="text-xs text-[#8e9fa9] leading-relaxed mt-1">
                  All customer chats consolidated into one inbox with smart AI Copilot replies.
                </p>
              </div>

              <div className="py-3 border-t border-[#232f36] space-y-2 text-xs text-[#8e9fa9]">
                <div className="flex justify-between">
                  <span>Response Speed:</span>
                  <span className="text-[#46bd3b] font-medium">&lt; 45 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>Pipeline Value:</span>
                  <span className="text-white font-medium">$6,070 NZD</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('leads')}
              className="mt-6 w-full py-3 rounded-xl bg-[#202c33] hover:bg-[#46bd3b] hover:text-black text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
            >
              <span>Open Unified Inbox</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Operational Modules & Live AI Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operational Modules for this Business */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#182126] border border-[#26343d] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#232f36]">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Plug-and-Play Business Modules
              </h3>
              <p className="text-xs text-[#8095a2]">
                Active tools for {currentProfile.name}. Inquiries feed directly into the unified inbox.
              </p>
            </div>
            <button
              onClick={() => onNavigate('modules')}
              className="text-xs text-[#46bd3b] hover:underline cursor-pointer"
            >
              Customize
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => onNavigate('bookings')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                currentProfile.activeModules.bookings
                  ? 'bg-[#1b252b] border-[#46bd3b]/40 hover:border-[#46bd3b]'
                  : 'bg-[#151c20] border-[#222e35] opacity-50'
              }`}
            >
              <CalendarDays className="w-5 h-5 text-[#46bd3b] mb-2" />
              <div className="text-sm font-bold text-white">Bookings</div>
              <p className="text-xs text-[#7e919c] mt-1">Salons, barbers, clinics</p>
              <div className="mt-3 text-[10px] font-mono font-bold text-[#46bd3b]">
                {currentProfile.activeModules.bookings ? 'ENABLED' : 'OFF'}
              </div>
            </div>

            <div
              onClick={() => onNavigate('forms')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                currentProfile.activeModules.forms
                  ? 'bg-[#1b252b] border-[#46bd3b]/40 hover:border-[#46bd3b]'
                  : 'bg-[#151c20] border-[#222e35] opacity-50'
              }`}
            >
              <FileText className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="text-sm font-bold text-white">Form &amp; Quotes</div>
              <p className="text-xs text-[#7e919c] mt-1">Movers, quotes, intakes</p>
              <div className="mt-3 text-[10px] font-mono font-bold text-cyan-400">
                {currentProfile.activeModules.forms ? 'ENABLED' : 'OFF'}
              </div>
            </div>

            <div
              onClick={() => onNavigate('rentals')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                currentProfile.activeModules.rentals
                  ? 'bg-[#1b252b] border-[#46bd3b]/40 hover:border-[#46bd3b]'
                  : 'bg-[#151c20] border-[#222e35] opacity-50'
              }`}
            >
              <Car className="w-5 h-5 text-purple-400 mb-2" />
              <div className="text-sm font-bold text-white">Rentals</div>
              <p className="text-xs text-[#7e919c] mt-1">Cars, villas, units</p>
              <div className="mt-3 text-[10px] font-mono font-bold text-purple-400">
                {currentProfile.activeModules.rentals ? 'ENABLED' : 'OFF'}
              </div>
            </div>
          </div>
        </div>

        {/* Live AI Decisions Feed */}
        <div className="p-6 rounded-3xl bg-[#182126] border border-[#26343d] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#232f36]">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#46bd3b]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Autonomous Decisions
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#46bd3b] animate-ping" />
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#141b1f] border border-[#232f36] text-xs">
                <div className="text-[#46bd3b] font-semibold mb-0.5">Budget Auto-Scaled</div>
                <p className="text-[#899ca8] leading-relaxed text-[11px]">
                  Boosted daily spend +25% on Weekend Stress-Free Reel after hitting 5.6x ROAS.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#141b1f] border border-[#232f36] text-xs">
                <div className="text-cyan-400 font-semibold mb-0.5">Lead Fast-Tracked</div>
                <p className="text-[#899ca8] leading-relaxed text-[11px]">
                  WhatsApp customer requested corporate pricing; AI sent digital intake form.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#232f36] text-center">
            <span className="text-[11px] text-[#718590] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#46bd3b]" />
              Continuous 24/7 background optimization
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
