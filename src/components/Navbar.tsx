import React, { useState } from 'react'
import {
  Sparkles,
  Bot,
  ChevronDown,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'
import { BusinessProfile, BUSINESS_PROFILES } from '../data/mockData'

interface NavbarProps {
  currentProfile: BusinessProfile
  onSelectProfile: (profile: BusinessProfile) => void
  autopilotEnabled: boolean
  onToggleAutopilot: () => void
  onOpenQuickScan: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProfile,
  onSelectProfile,
  autopilotEnabled,
  onToggleAutopilot,
  onOpenQuickScan,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const recentAiActions = [
    {
      time: '4m ago',
      title: 'Ad Budget Boosted',
      desc: 'Top Reel achieved 5.6x ROAS. Scaled daily budget by +25%.',
      type: 'success',
    },
    {
      time: '18m ago',
      title: 'Low-ROAS Ad Paused',
      desc: 'Single Image ad paused at 0.86x ROAS to prevent waste.',
      type: 'warning',
    },
    {
      time: '34m ago',
      title: 'WhatsApp Lead Qualified',
      desc: 'Sent corporate moving intake form to Marcus Sterling.',
      type: 'info',
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-[#13191d]/90 backdrop-blur-xl border-b border-[#232f36]">
      <div className="max-w-[1600px] mx-auto flex h-20 items-center justify-between px-6 sm:px-10">
        {/* Brand & Active Workspace */}
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#46bd3b] flex items-center justify-center shadow-[0_0_25px_rgba(70,189,59,0.35)] transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold tracking-tight text-white leading-none">
                Jel<span className="text-[#46bd3b]">Tech</span>
                <span className="text-slate-400 font-light mx-2">/</span>
                <span className="text-white font-semibold">GrowthPilot</span>
              </div>
              <span className="text-[11px] tracking-widest text-[#7f949f] uppercase font-medium mt-1">
                The Smart Marketing Assistant
              </span>
            </div>
          </a>

          {/* Business Switcher Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#1a2227] border border-[#29373f] hover:border-[#46bd3b]/50 text-slate-200 transition-all cursor-pointer"
            >
              <span className="text-lg">{currentProfile.avatar}</span>
              <div className="text-left">
                <div className="text-xs font-semibold text-white leading-tight">
                  {currentProfile.name}
                </div>
                <div className="text-[11px] text-[#788e99] leading-tight">
                  {currentProfile.category}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#788e99] ml-1" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-[#182126] border border-[#2b3a43] shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 text-[11px] font-bold text-[#718793] uppercase tracking-wider">
                  Select Business Demo
                </div>
                <div className="space-y-1">
                  {BUSINESS_PROFILES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProfile(p)
                        setProfileDropdownOpen(false)
                      }}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        p.id === currentProfile.id
                          ? 'bg-[#46bd3b]/15 border border-[#46bd3b]/40 text-white'
                          : 'hover:bg-[#202a30] text-slate-300'
                      }`}
                    >
                      <span className="text-xl mt-0.5">{p.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          {p.name}
                          {p.id === currentProfile.id && (
                            <span className="text-[10px] text-[#46bd3b] font-mono">ACTIVE</span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#8296a2] mt-0.5">{p.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3.5">
          {/* Autopilot Status Pill */}
          <button
            onClick={onToggleAutopilot}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              autopilotEnabled
                ? 'bg-[#46bd3b]/10 border-[#46bd3b]/40 text-[#46bd3b] shadow-[0_0_20px_rgba(70,189,59,0.15)]'
                : 'bg-[#1a2327] border-[#29363e] text-slate-400'
            }`}
          >
            <Bot className={`w-4 h-4 ${autopilotEnabled ? 'text-[#46bd3b]' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">AI Pilot:</span>
            <strong className="font-semibold">{autopilotEnabled ? 'Autonomous' : 'Manual'}</strong>
            <span className={`w-2 h-2 rounded-full ${autopilotEnabled ? 'bg-[#46bd3b] animate-pulse' : 'bg-slate-500'}`} />
          </button>

          {/* Quick Scan Action */}
          <button
            onClick={onOpenQuickScan}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] hover:scale-[1.02] cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            <span className="hidden sm:inline">Run Growth Scan</span>
            <span className="sm:hidden">Scan</span>
          </button>

          {/* Notification Center */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 rounded-xl bg-[#1a2227] border border-[#29363e] text-slate-300 hover:text-white hover:border-[#46bd3b]/40 transition-all cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#46bd3b] ring-2 ring-[#1a2227]" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#182126] border border-[#2c3b44] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-[#243138]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#46bd3b]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      AI Autonomous Activity
                    </span>
                  </div>
                  <span className="text-[10px] text-[#46bd3b] font-mono bg-[#46bd3b]/10 px-2 py-0.5 rounded">
                    Live
                  </span>
                </div>

                <div className="divide-y divide-[#232f36] my-2">
                  {recentAiActions.map((action, i) => (
                    <div key={i} className="py-3 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          {action.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-[#46bd3b]" />}
                          {action.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                          {action.type === 'info' && <Bot className="w-3.5 h-3.5 text-cyan-400" />}
                          {action.title}
                        </span>
                        <span className="text-[#6d818d]">{action.time}</span>
                      </div>
                      <p className="text-[#8e9fa9] text-xs leading-relaxed pl-5">
                        {action.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#243138] text-center">
                  <a
                    href="https://jeltech.net"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-[#46bd3b] hover:underline inline-flex items-center gap-1"
                  >
                    View JelTech Ecosystem <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
