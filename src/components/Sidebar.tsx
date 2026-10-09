import React from 'react'
import {
  LayoutDashboard,
  Search,
  Megaphone,
  MessageSquare,
  CalendarDays,
  FileText,
  Car,
  Code2,
  Sliders,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { BusinessProfile } from '../data/mockData'

export type NavTabId =
  | 'overview'
  | 'seo'
  | 'ads'
  | 'leads'
  | 'bookings'
  | 'forms'
  | 'rentals'
  | 'api'
  | 'modules'

interface SidebarProps {
  currentTab: NavTabId
  onSelectTab: (tab: NavTabId) => void
  currentProfile: BusinessProfile
  unreadLeadCount: number
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentProfile,
  unreadLeadCount,
}) => {
  const coreModules: { id: NavTabId; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'seo', label: 'SEO Intelligence', icon: Search, badge: '84%' },
    { id: 'ads', label: 'Meta Ads Manager', icon: Megaphone, badge: '4.6x' },
    { id: 'leads', label: 'Unified Inbox', icon: MessageSquare, badge: unreadLeadCount > 0 ? `${unreadLeadCount}` : undefined },
  ]

  const featureModules: {
    id: NavTabId
    label: string
    sublabel: string
    icon: React.ElementType
    enabledKey: keyof BusinessProfile['activeModules']
  }[] = [
    {
      id: 'bookings',
      label: 'Bookings',
      sublabel: 'Appointments & Schedule',
      icon: CalendarDays,
      enabledKey: 'bookings',
    },
    {
      id: 'forms',
      label: 'Forms & Quotes',
      sublabel: 'Custom Quote Builder',
      icon: FileText,
      enabledKey: 'forms',
    },
    {
      id: 'rentals',
      label: 'Rentals',
      sublabel: 'Listings & Fleet',
      icon: Car,
      enabledKey: 'rentals',
    },
  ]

  return (
    <aside className="w-72 shrink-0 bg-[#13191d] border-r border-[#222e35] flex flex-col justify-between select-none">
      <div className="p-5 space-y-8 overflow-y-auto">
        {/* Core Growth Engine */}
        <div>
          <div className="px-3 mb-3 text-[11px] font-bold uppercase tracking-wider text-[#697f8c]">
            Growth Engine
          </div>
          <div className="space-y-1.5">
            {coreModules.map((item) => {
              const Icon = item.icon
              const isActive = currentTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1b252b] text-white border border-[#46bd3b]/50 shadow-[0_0_20px_rgba(70,189,59,0.15)]'
                      : 'text-[#8b9da7] hover:bg-[#182126] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#46bd3b]' : 'text-[#728590]'}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-medium ${
                        isActive
                          ? 'bg-[#46bd3b] text-black font-bold'
                          : 'bg-[#1d272d] text-[#8ea0ab] border border-[#27363f]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Business Operational Modules */}
        <div>
          <div className="px-3 mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#697f8c]">
            <span>Business Modules</span>
            <button
              onClick={() => onSelectTab('modules')}
              className="text-[#46bd3b] hover:underline cursor-pointer flex items-center gap-1 text-[11px]"
            >
              <Sliders className="w-3 h-3" />
              Manage
            </button>
          </div>
          <div className="space-y-1.5">
            {featureModules.map((item) => {
              const Icon = item.icon
              const isEnabled = currentProfile.activeModules[item.enabledKey]
              const isActive = currentTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#1b252b] text-white border border-[#46bd3b]/50 shadow-[0_0_20px_rgba(70,189,59,0.15)]'
                      : 'text-[#8b9da7] hover:bg-[#182126] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#46bd3b]' : 'text-[#728590]'}`} />
                    <div className="truncate">
                      <div className="text-sm font-semibold truncate text-white">{item.label}</div>
                      <div className="text-[11px] text-[#6e828f] truncate">{item.sublabel}</div>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-mono ml-2 shrink-0 ${
                      isEnabled
                        ? 'text-[#46bd3b] bg-[#46bd3b]/10 border border-[#46bd3b]/20 font-bold'
                        : 'text-[#5a6e7a] bg-[#1a2227]'
                    }`}
                  >
                    {isEnabled ? 'ACTIVE' : 'OFF'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Developer Integration */}
        <div>
          <div className="px-3 mb-3 text-[11px] font-bold uppercase tracking-wider text-[#697f8c]">
            Developer &amp; Embeds
          </div>
          <button
            onClick={() => onSelectTab('api')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentTab === 'api'
                ? 'bg-[#1b252b] text-white border border-[#46bd3b]/50 shadow-[0_0_20px_rgba(70,189,59,0.15)]'
                : 'text-[#8b9da7] hover:bg-[#182126] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Code2 className={`w-4 h-4 ${currentTab === 'api' ? 'text-[#46bd3b]' : 'text-[#728590]'}`} />
              <span className="text-sm">API &amp; Web Widgets</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#5a6e7a]" />
          </button>
        </div>
      </div>

      {/* JelTech Footer Badge */}
      <div className="p-5 border-t border-[#202b31] bg-[#101518]/50">
        <a
          href="https://jeltech.net"
          target="_blank"
          rel="noreferrer"
          className="group block p-3.5 rounded-xl bg-[#172025] border border-[#25323a] hover:border-[#46bd3b]/40 transition-all"
        >
          <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#46bd3b]" />
              Jel<span className="text-[#46bd3b]">Tech</span> Ecosystem
            </span>
            <span className="text-[10px] text-[#46bd3b] font-mono group-hover:translate-x-0.5 transition-transform">
              jeltech.net →
            </span>
          </div>
          <p className="text-[11px] text-[#718590] leading-relaxed">
            Software &amp; AI engineered for growing businesses.
          </p>
        </a>
      </div>
    </aside>
  )
}
