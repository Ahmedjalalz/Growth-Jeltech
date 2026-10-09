import React, { useState } from 'react'
import {
  Megaphone,
  Sparkles,
  TrendingUp,
  DollarSign,
  Play,
  Pause,
  Copy,
  Plus,
  Zap,
  Target,
  RefreshCw,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { MetaAdCampaign, BusinessProfile } from '../data/mockData'

interface SmartAdsManagerProps {
  currentProfile: BusinessProfile
  ads: MetaAdCampaign[]
  onUpdateAds: (ads: MetaAdCampaign[]) => void
}

export const SmartAdsManager: React.FC<SmartAdsManagerProps> = ({
  currentProfile,
  ads,
  onUpdateAds,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'scoring' | 'new-campaign'>('matrix')

  // Creative scoring state
  const [sampleHeadline, setSampleHeadline] = useState(
    'Moving this weekend? Relax. We pack, lift & deliver in 3 hours flat.'
  )
  const [creativeType, setCreativeType] = useState<'reel' | 'image' | 'carousel'>('reel')
  const [hookScore, setHookScore] = useState(8.8)
  const [visualScore, setVisualScore] = useState(9.1)
  const [clarityScore, setClarityScore] = useState(8.5)
  const [isScoring, setIsScoring] = useState(false)
  const [suggestedRewrite, setSuggestedRewrite] = useState(
    'Stop carrying heavy couches down narrow stairs. Watch Paul Movers clear a 2-bedroom home in under 90 minutes.'
  )

  // New campaign modal state
  const [newCampaignName, setNewCampaignName] = useState('Weekend Prime Moves - AI Retargeting')
  const [newObjective, setNewObjective] = useState<'Sales' | 'Lead Generation' | 'Inquiries'>('Sales')
  const [newBudget, setNewBudget] = useState(35)
  const [isLaunching, setIsLaunching] = useState(false)

  const handleSimulateAutoScale = (adId: string) => {
    const updated = ads.map((ad) => {
      if (ad.id === adId) {
        const newBudget = Math.round(ad.dailyBudget * 1.25)
        return {
          ...ad,
          dailyBudget: newBudget,
          status: 'BOOSTED_BY_AI' as const,
          aiActionNote: `Auto-Optimized: ROAS exceeded 5.0x. Budget increased +25% to $${newBudget}/day.`,
        }
      }
      return ad
    })
    onUpdateAds(updated)
    confetti({ particleCount: 65, spread: 75 })
  }

  const handleSimulateAutoPause = (adId: string) => {
    const updated = ads.map((ad) => {
      if (ad.id === adId) {
        return {
          ...ad,
          status: 'PAUSED_LOW_ROAS' as const,
          aiActionNote: `Auto-Paused: ROAS fell below 1.5x threshold. Spend redirected to top winner.`,
        }
      }
      return ad
    })
    onUpdateAds(updated)
  }

  const handleDuplicateWinner = (ad: MetaAdCampaign) => {
    const newAd: MetaAdCampaign = {
      ...ad,
      id: `ad-${Date.now().toString().slice(-3)}`,
      name: `${ad.name} [Variant B]`,
      dailyBudget: 25,
      totalSpent: 0,
      revenue: 0,
      roas: 0,
      salesCount: 0,
      status: 'LEARNING',
      aiActionNote: 'Variant created: Testing high-contrast text overlay on first 3 seconds.',
    }
    onUpdateAds([newAd, ...ads])
    confetti({ particleCount: 45, spread: 60 })
  }

  const handleScoreCreative = () => {
    setIsScoring(true)
    setTimeout(() => {
      setIsScoring(false)
      setHookScore(9.2)
      setVisualScore(9.4)
      setClarityScore(9.0)
      confetti({ particleCount: 50 })
    }, 800)
  }

  const handleApplyRewrite = () => {
    setSampleHeadline(suggestedRewrite)
    setHookScore(9.4)
    confetti({ particleCount: 45 })
  }

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLaunching(true)
    setTimeout(() => {
      const createdAd: MetaAdCampaign = {
        id: `ad-${Date.now().toString().slice(-3)}`,
        name: newCampaignName,
        channel: 'Instagram & Facebook',
        objective: newObjective,
        status: 'ACTIVE_OPTIMIZING',
        dailyBudget: newBudget,
        totalSpent: 0,
        revenue: 0,
        roas: 0,
        salesCount: 0,
        hookScore: 8.6,
        visualStoppingPower: 8.9,
        creativeType: 'Video Reel',
        creativePreview:
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=80',
        headline: sampleHeadline,
        aiActionNote: 'Live: Configured 25km geofenced lookalike audience & conversion pixel.',
      }
      onUpdateAds([createdAd, ...ads])
      setIsLaunching(false)
      setActiveTab('matrix')
      confetti({ particleCount: 70, spread: 80 })
    }, 1000)
  }

  const totalSpend = ads.reduce((acc, a) => acc + a.totalSpent, 0)
  const totalRevenue = ads.reduce((acc, a) => acc + a.revenue, 0)
  const blendedRoas = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : '4.60'

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Top Banner */}
      <div className="rounded-3xl bg-[#182126] border border-[#26343d] p-8 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MODULE 2 · SMART ADS MANAGER (META)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Meta Campaigns &amp; Continuous Optimization
            </h2>
            <p className="text-sm text-[#8ca0ab] leading-relaxed max-w-2xl">
              AI evaluates your creative hooks, configures niche audiences, and scales high-ROAS ads automatically.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-[#141b1f] border border-[#24333b] text-right">
              <div className="text-[10px] text-[#718590] uppercase font-mono">Blended ROAS</div>
              <div className="text-base font-black text-[#46bd3b] font-mono">{blendedRoas}x</div>
            </div>
            <button
              onClick={() => setActiveTab('new-campaign')}
              className="px-5 py-3 rounded-2xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-black stroke-[2.5]" />
              <span>New Campaign</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#232f36] gap-4 pt-2">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'matrix' ? 'text-[#46bd3b]' : 'text-[#8095a2] hover:text-white'
            }`}
          >
            Live Campaigns ({ads.length})
            {activeTab === 'matrix' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#46bd3b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('scoring')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'scoring' ? 'text-[#46bd3b]' : 'text-[#8095a2] hover:text-white'
            }`}
          >
            AI Creative Scoring
            {activeTab === 'scoring' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#46bd3b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('new-campaign')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'new-campaign' ? 'text-[#46bd3b]' : 'text-[#8095a2] hover:text-white'
            }`}
          >
            Campaign Wizard
            {activeTab === 'new-campaign' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#46bd3b] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: Live Campaigns */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className={`p-6 sm:p-7 rounded-3xl border transition-all flex flex-col justify-between ${
                  ad.status === 'BOOSTED_BY_AI'
                    ? 'bg-[#1a252b] border-[#46bd3b]/50 shadow-[0_0_30px_rgba(70,189,59,0.12)]'
                    : ad.status === 'PAUSED_LOW_ROAS'
                    ? 'bg-[#151c20] border-[#2c2022] opacity-75'
                    : 'bg-[#182126] border-[#26343d] hover:border-[#46bd3b]/30'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full font-mono uppercase tracking-wider ${
                        ad.status === 'BOOSTED_BY_AI'
                          ? 'bg-[#46bd3b] text-black font-bold'
                          : ad.status === 'PAUSED_LOW_ROAS'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-blue-500/15 text-blue-400'
                      }`}
                    >
                      {ad.status === 'BOOSTED_BY_AI' && '🚀 Scaled (+25%)'}
                      {ad.status === 'PAUSED_LOW_ROAS' && '⏸ Paused (Low ROAS)'}
                      {ad.status === 'ACTIVE_OPTIMIZING' && '⚡ Optimizing'}
                      {ad.status === 'LEARNING' && '🧠 Testing'}
                    </span>

                    <span className="text-xs font-mono font-bold text-white">
                      ${ad.dailyBudget}/day
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">{ad.name}</h3>

                  {/* Thumbnail & Copy */}
                  <div className="flex gap-3.5 p-3 rounded-2xl bg-[#13191d] border border-[#222e35]">
                    <img
                      src={ad.creativePreview}
                      alt={ad.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-[#718590] uppercase font-mono">
                        {ad.creativeType} · Hook Score: <strong className="text-[#46bd3b]">{ad.hookScore}/10</strong>
                      </div>
                      <p className="text-xs text-[#b0c2ce] line-clamp-2 mt-1 italic">
                        "{ad.headline}"
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#232f36] text-center">
                    <div>
                      <div className="text-[10px] text-[#718590]">Total Spend</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">${ad.totalSpent}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#718590]">Revenue</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">${ad.revenue}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#718590]">ROAS</div>
                      <div
                        className={`text-base font-black font-mono mt-0.5 ${
                          ad.roas >= 4.0 ? 'text-[#46bd3b]' : ad.roas >= 2.0 ? 'text-cyan-400' : 'text-rose-400'
                        }`}
                      >
                        {ad.roas > 0 ? `${ad.roas}x` : '—'}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#8c9fa9] leading-relaxed">
                    {ad.aiActionNote}
                  </p>
                </div>

                {/* Simulation Actions */}
                <div className="mt-5 pt-3 border-t border-[#232f36] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {ad.status !== 'BOOSTED_BY_AI' && ad.roas >= 3.0 && (
                      <button
                        onClick={() => handleSimulateAutoScale(ad.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#46bd3b]/15 hover:bg-[#46bd3b]/30 text-[#46bd3b] text-xs font-semibold cursor-pointer"
                      >
                        Scale (+25%)
                      </button>
                    )}

                    {ad.status !== 'PAUSED_LOW_ROAS' && (
                      <button
                        onClick={() => handleSimulateAutoPause(ad.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#202a30] hover:bg-rose-500/20 text-[#718590] hover:text-rose-400 text-xs cursor-pointer"
                      >
                        Pause
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleDuplicateWinner(ad)}
                    className="px-3 py-1.5 rounded-xl bg-[#202a30] hover:bg-[#27343c] border border-[#2d3e48] text-slate-200 text-xs cursor-pointer flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Duplicate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Creative Scoring Studio */}
      {activeTab === 'scoring' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#182126] border border-[#26343d] space-y-5">
            <h3 className="text-lg font-bold text-white">Pre-Flight Creative Evaluator</h3>
            <p className="text-xs text-[#8095a2] leading-relaxed">
              Test hook retention before publishing to prevent ad waste.
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Format</label>
              <div className="grid grid-cols-3 gap-2">
                {(['reel', 'image', 'carousel'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setCreativeType(fmt)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all uppercase font-mono cursor-pointer ${
                      creativeType === fmt
                        ? 'bg-[#46bd3b]/15 border-[#46bd3b] text-[#46bd3b]'
                        : 'bg-[#13191d] border-[#26343c] text-[#718590]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Headline Hook</label>
              <textarea
                value={sampleHeadline}
                onChange={(e) => setSampleHeadline(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
              />
            </div>

            <button
              onClick={handleScoreCreative}
              disabled={isScoring}
              className="w-full py-3 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isScoring ? (
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
              ) : (
                <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
              )}
              <span>{isScoring ? 'Scoring...' : 'Score Creative with AI'}</span>
            </button>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#182126] border border-[#26343d] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#232f36]">
              <div>
                <h3 className="text-lg font-bold text-white">Diagnostics</h3>
                <p className="text-xs text-[#8095a2]">Benchmarked against high-converting Meta ads.</p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-black text-[#46bd3b] font-mono">
                  {((hookScore + visualScore + clarityScore) / 3).toFixed(1)}/10
                </div>
                <div className="text-[10px] text-[#718590] uppercase font-mono">Composite Score</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8c9fa9]">Hook Strength (First 3 Seconds)</span>
                  <span className="font-bold text-white font-mono">{hookScore}/10</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#202c33] overflow-hidden">
                  <div className="h-full bg-[#46bd3b]" style={{ width: `${hookScore * 10}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8c9fa9]">Visual Stopping Power</span>
                  <span className="font-bold text-cyan-400 font-mono">{visualScore}/10</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#202c33] overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${visualScore * 10}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8c9fa9]">Offer Clarity</span>
                  <span className="font-bold text-amber-400 font-mono">{clarityScore}/10</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#202c33] overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: `${clarityScore * 10}%` }} />
                </div>
              </div>
            </div>

            {/* AI Pattern Interrupt Rewrite */}
            <div className="p-5 rounded-2xl bg-[#141b1f] border border-[#24333b] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#46bd3b]" />
                  AI Suggested Pattern Interrupt:
                </span>
                <button
                  onClick={handleApplyRewrite}
                  className="text-[#46bd3b] hover:underline font-semibold cursor-pointer"
                >
                  Apply Hook →
                </button>
              </div>
              <p className="text-xs text-[#c5d6e2] italic leading-relaxed">
                "{suggestedRewrite}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Campaign Wizard */}
      {activeTab === 'new-campaign' && (
        <form onSubmit={handleLaunchCampaign} className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#182126] border border-[#26343d] space-y-6 shadow-xl">
          <div className="border-b border-[#232f36] pb-3">
            <h3 className="text-lg font-bold text-white">Create Automated Campaign</h3>
            <p className="text-xs text-[#8095a2] mt-0.5">AI configures targeting for maximum paying customers.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Campaign Title</label>
              <input
                type="text"
                value={newCampaignName}
                onChange={(e) => setNewCampaignName(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Goal</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Sales', 'Lead Generation', 'Inquiries'] as const).map((obj) => (
                  <button
                    type="button"
                    key={obj}
                    onClick={() => setNewObjective(obj)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      newObjective === obj
                        ? 'bg-[#46bd3b]/15 border-[#46bd3b] text-[#46bd3b]'
                        : 'bg-[#13191d] border-[#26343c] text-[#718590]'
                    }`}
                  >
                    {obj}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Daily Budget</span>
                <span className="text-[#46bd3b] font-mono">${newBudget} NZD / day</span>
              </div>
              <input
                type="range"
                min={10}
                max={150}
                step={5}
                value={newBudget}
                onChange={(e) => setNewBudget(Number(e.target.value))}
                className="w-full accent-[#46bd3b] cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLaunching}
              className="w-full py-3.5 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] cursor-pointer disabled:opacity-50"
            >
              {isLaunching ? 'Deploying...' : 'Launch AI Campaign'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
