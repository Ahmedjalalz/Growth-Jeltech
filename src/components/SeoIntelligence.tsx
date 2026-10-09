import React, { useState } from 'react'
import {
  Search,
  Sparkles,
  CheckCircle2,
  FileCode,
  Copy,
  RefreshCw,
  TrendingUp,
  FileText,
  Link2,
  Check,
  Send,
  ArrowRight,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { BusinessProfile, SeoIssue, KeywordItem } from '../data/mockData'

interface SeoIntelligenceProps {
  currentProfile: BusinessProfile
  seoIssues: SeoIssue[]
  keywords: KeywordItem[]
  onFixIssue: (id: string) => void
}

export const SeoIntelligence: React.FC<SeoIntelligenceProps> = ({
  currentProfile,
  seoIssues,
  keywords,
  onFixIssue,
}) => {
  const [urlInput, setUrlInput] = useState(currentProfile.website)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanStep, setScanStep] = useState('')
  const [activeTab, setActiveTab] = useState<'audit' | 'articles' | 'keywords'>('audit')
  const [selectedSnippetIssue, setSelectedSnippetIssue] = useState<SeoIssue | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)

  // AI Article Generator State
  const [selectedTopic, setSelectedTopic] = useState('Eco-Friendly Packing Boxes & Sustainable Relocation')
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false)
  const [generatedArticle, setGeneratedArticle] = useState<{
    title: string
    metaDescription: string
    slug: string
    wordCount: number
    projectedTraffic: string
    content: string
  } | null>({
    title: 'The Ultimate Guide to Eco-Friendly Moving & Recyclable Packing in Auckland (2026)',
    metaDescription: 'Discover how to move home with zero waste. Discover biodegradable bubble wrap, recycled cardboard crates, and eco-certified moving teams.',
    slug: '/blog/eco-friendly-moving-auckland-guide',
    wordCount: 1420,
    projectedTraffic: '+1,850 organic visits/month',
    content: `## Why Sustainable Moving Matters in Auckland\n\nMoving homes in Auckland shouldn't mean leaving behind heaps of single-use plastic wrap and discarded packaging. With over 40,000 residential relocations across the North Shore and Central suburbs each year, adopting sustainable packing practices can cut packaging waste by over 70%.\n\n### 1. Opt for Heavy-Duty Recycled Cardboard Crates\nInstead of buying flimsy virgin-fiber boxes, rent heavy-duty stackable corrugated moving crates. Paul Movers provides sanitized, reusable crates that get returned and repurposed over 50 times.\n\n### 2. Biodegradable Cushioning vs. Traditional Bubble Wrap\nReplace petrochemical bubble wrap with corrugated shredded kraft paper and biodegradable starch-based packing peanuts that dissolve in water.\n\n### 3. Consolidate Truck Trips with Optimized Route Mapping\nOur fleet routing AI groups furniture distribution to eliminate empty deadhead kilometers across the Harbour Bridge, directly decreasing fuel burn and transit emissions.`,
  })

  const [webhookDeployed, setWebhookDeployed] = useState(false)

  const handleRunScan = () => {
    setIsScanning(true)
    setScanProgress(15)
    setScanStep('Auditing Core Web Vitals & mobile DOM...')

    setTimeout(() => {
      setScanProgress(55)
      setScanStep('Benchmarking regional keyword competitors...')
    }, 700)

    setTimeout(() => {
      setScanProgress(100)
      setScanStep('Audit complete! Suggestions synthesized.')
      setTimeout(() => {
        setIsScanning(false)
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } })
      }, 500)
    }, 1600)
  }

  const handleAutoFix = (issue: SeoIssue) => {
    onFixIssue(issue.id)
    confetti({ particleCount: 60, spread: 65, origin: { y: 0.6 } })
  }

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleGenerateArticle = () => {
    setIsGeneratingArticle(true)
    setTimeout(() => {
      setGeneratedArticle({
        title: `Comprehensive Guide: ${selectedTopic} in 2026`,
        metaDescription: `Everything you need to know about ${selectedTopic.toLowerCase()}. Expert advice, pricing guidelines, and checklist by certified local specialists.`,
        slug: `/blog/${selectedTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        wordCount: 1540,
        projectedTraffic: '+2,100 organic visits/month',
        content: `## Complete Overview: ${selectedTopic}\n\nSearch volume for this niche query has grown rapidly. When potential customers look for solutions, they expect authoritative, structured guidance tailored to their exact questions.\n\n### Core Value Drivers\n- Transparent service breakdown with no hidden add-on costs\n- Verified insurance coverage and white-glove equipment protection\n- Flexible same-day and scheduled appointments tailored to busy workdays\n\n### Actionable Next Steps\nUse our instant quote calculator to receive an immediate estimate tailored to your exact property specifications.`,
      })
      setIsGeneratingArticle(false)
      confetti({ particleCount: 50, spread: 60 })
    }, 900)
  }

  const fixedCount = seoIssues.filter((i) => i.fixed).length
  const overallScore = Math.min(100, 68 + fixedCount * 8)

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Spacious Scanner Hero */}
      <div className="rounded-3xl bg-[#182126] border border-[#26343d] p-8 sm:p-10 shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#46bd3b]/10 border border-[#46bd3b]/30 text-[#46bd3b] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MODULE 1 · SEO INTELLIGENCE ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Search Visibility &amp; Keyword Authority
          </h2>
          <p className="text-sm text-[#8ca0ab] leading-relaxed max-w-2xl">
            Audit your website in plain language, fix technical issues in one click, and publish targeted AI articles to capture high-intent Google searches.
          </p>
        </div>

        {/* Clean URL Input bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#718590]" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#13191d] border border-[#28373f] text-sm text-white focus:outline-none focus:border-[#46bd3b] font-mono"
            />
          </div>
          <button
            onClick={handleRunScan}
            disabled={isScanning}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isScanning ? (
              <RefreshCw className="w-4 h-4 animate-spin text-black" />
            ) : (
              <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
            )}
            <span>{isScanning ? 'Auditing...' : 'Scan Website'}</span>
          </button>
        </div>

        {isScanning && (
          <div className="p-4 rounded-2xl bg-[#13191d] border border-[#24333b] animate-in fade-in space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#46bd3b] animate-spin" />
                {scanStep}
              </span>
              <span className="font-mono text-[#46bd3b] font-bold">{scanProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#1e272d] overflow-hidden">
              <div
                className="h-full bg-[#46bd3b] transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Clean Sub-Tabs */}
        <div className="flex border-b border-[#232f36] gap-4 pt-2">
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'audit' ? 'text-[#46bd3b]' : 'text-[#8095a2] hover:text-white'
            }`}
          >
            SEO Health &amp; Fixes ({seoIssues.length})
            {activeTab === 'audit' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#46bd3b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'articles' ? 'text-[#46bd3b]' : 'text-[#8095a2] hover:text-white'
            }`}
          >
            AI Article Generator
            {activeTab === 'articles' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#46bd3b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('keywords')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'keywords' ? 'text-[#46bd3b]' : 'text-[#8095a2] hover:text-white'
            }`}
          >
            Target Keywords ({keywords.length})
            {activeTab === 'keywords' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#46bd3b] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: Audit & Prioritized Action Items */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* Health Score Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl bg-[#182126] border border-[#26343d] flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#46bd3b]/15 border border-[#46bd3b]/40 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-[#46bd3b] font-mono">{overallScore}</span>
                <span className="text-[10px] text-[#8095a2] uppercase font-mono">Score</span>
              </div>
              <div>
                <div className="text-sm font-bold text-white">Overall Health</div>
                <div className="text-xs text-[#8095a2] mt-0.5">
                  {fixedCount} of {seoIssues.length} resolved
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#182126] border border-[#26343d] space-y-2">
              <div className="flex justify-between text-xs text-[#8095a2]">
                <span>Technical</span>
                <span className="font-bold text-white font-mono">88%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#202c33] overflow-hidden">
                <div className="h-full bg-[#46bd3b]" style={{ width: '88%' }} />
              </div>
              <p className="text-[11px] text-[#718590]">Core Web Vitals healthy</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#182126] border border-[#26343d] space-y-2">
              <div className="flex justify-between text-xs text-[#8095a2]">
                <span>Content Gaps</span>
                <span className="font-bold text-amber-400 font-mono">62%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#202c33] overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: '62%' }} />
              </div>
              <p className="text-[11px] text-[#718590]">1 high-traffic topic gap</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#182126] border border-[#26343d] space-y-2">
              <div className="flex justify-between text-xs text-[#8095a2]">
                <span>Authority</span>
                <span className="font-bold text-cyan-400 font-mono">75%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#202c33] overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: '75%' }} />
              </div>
              <p className="text-[11px] text-[#718590]">Google Map Pack in top 3</p>
            </div>
          </div>

          {/* Actionable Issues List with ample breathing room */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight">
              Actionable Fixes (Section 5.1.1)
            </h3>

            <div className="space-y-4">
              {seoIssues.map((issue) => (
                <div
                  key={issue.id}
                  className={`p-6 rounded-3xl border transition-all ${
                    issue.fixed
                      ? 'bg-[#151c20]/60 border-[#222e35]'
                      : 'bg-[#182126] border-[#26343d] hover:border-[#46bd3b]/40'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            issue.impact === 'High'
                              ? 'bg-rose-500/15 text-rose-400'
                              : 'bg-amber-500/15 text-amber-400'
                          }`}
                        >
                          {issue.impact} Impact
                        </span>

                        <span className="text-[10px] text-[#728590] font-mono">
                          {issue.category} · +{issue.scoreImpact} Score Pts
                        </span>

                        {issue.fixed && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#46bd3b] bg-[#46bd3b]/15 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Resolved
                          </span>
                        )}
                      </div>

                      <h4 className={`text-base font-bold ${issue.fixed ? 'text-[#718590] line-through' : 'text-white'}`}>
                        {issue.title}
                      </h4>

                      <p className="text-xs text-[#8c9fa9] leading-relaxed">
                        {issue.description}
                      </p>

                      <div className="mt-3 p-3.5 rounded-xl bg-[#13191d] border border-[#222e35] text-xs">
                        <div className="text-[#46bd3b] font-semibold flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Solution:</span>
                        </div>
                        <p className="text-[#96a9b4] text-xs leading-relaxed">{issue.aiSolution}</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex md:flex-col gap-2 shrink-0">
                      {!issue.fixed ? (
                        <>
                          <button
                            onClick={() => handleAutoFix(issue)}
                            className="px-4 py-2.5 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_15px_rgba(70,189,59,0.25)] flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                            <span>Auto-Fix</span>
                          </button>

                          {issue.snippetCode && (
                            <button
                              onClick={() => setSelectedSnippetIssue(issue)}
                              className="px-4 py-2.5 rounded-xl bg-[#1f282f] hover:bg-[#26333a] border border-[#2d3d46] text-slate-200 text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                              <span>View Code</span>
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="px-4 py-2 rounded-xl bg-[#1a2429] text-[#46bd3b] text-xs flex items-center justify-center gap-1.5 font-medium">
                          <Check className="w-3.5 h-3.5" />
                          <span>Resolved</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI Articles */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 p-6 rounded-3xl bg-[#182126] border border-[#26343d] space-y-4">
            <h3 className="text-base font-bold text-white">Generate Article</h3>
            <p className="text-xs text-[#8095a2] leading-relaxed">
              Target missed search queries with full-length authority articles.
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Select Gap Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
              >
                <option value="Eco-Friendly Packing Boxes & Sustainable Relocation">
                  Eco-Friendly Packing Boxes (3,800 searches/mo)
                </option>
                <option value="Zero-Downtime Commercial Office Moving Guide">
                  Zero-Downtime Commercial Moves (1,450 searches/mo)
                </option>
                <option value="Moving in Auckland: Suburb Guide">
                  Auckland Suburb Relocation Guide (6,200 searches/mo)
                </option>
              </select>
            </div>

            <button
              onClick={handleGenerateArticle}
              disabled={isGeneratingArticle}
              className="w-full py-3 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingArticle ? (
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
              ) : (
                <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
              )}
              <span>{isGeneratingArticle ? 'Writing...' : 'Generate Full Article'}</span>
            </button>
          </div>

          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#182126] border border-[#26343d] space-y-5">
            {generatedArticle ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#232f36]">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {generatedArticle.title}
                    </h3>
                    <div className="text-xs text-[#718590] font-mono mt-1">
                      {generatedArticle.wordCount} words · {generatedArticle.projectedTraffic}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setWebhookDeployed(true)
                      confetti({ particleCount: 35 })
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      webhookDeployed
                        ? 'bg-[#46bd3b]/20 border border-[#46bd3b] text-[#46bd3b]'
                        : 'bg-[#202c33] hover:bg-[#273740] text-white border border-[#2e3e48]'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{webhookDeployed ? 'Synced to Site ✓' : 'Deploy via Webhook'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#13191d] border border-[#222e35] max-h-80 overflow-y-auto text-xs text-[#cad5dc] leading-relaxed">
                  <pre className="whitespace-pre-wrap font-sans">
                    {generatedArticle.content}
                  </pre>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* TAB 3: Keywords Table */}
      {activeTab === 'keywords' && (
        <div className="rounded-3xl bg-[#182126] border border-[#26343d] overflow-hidden">
          <div className="p-6 border-b border-[#232f36] flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">Tracked Search Queries</h3>
              <p className="text-xs text-[#8095a2]">Queries with high customer intent for your niche.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#141b20] text-[#718590] uppercase font-mono text-[10px] border-b border-[#232f36]">
                <tr>
                  <th className="py-4 px-6">Keyword</th>
                  <th className="py-4 px-6">Intent</th>
                  <th className="py-4 px-6">Volume</th>
                  <th className="py-4 px-6">Est. CPC</th>
                  <th className="py-4 px-6">Current Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f282e] text-[#d6e0e6]">
                {keywords.map((kw, i) => (
                  <tr key={i} className="hover:bg-[#1b2328] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">{kw.keyword}</td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1e272d] text-[#8ea0ab]">
                        {kw.intent}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono">{kw.volume}</td>
                    <td className="py-4 px-6 font-mono">{kw.cpc}</td>
                    <td className="py-4 px-6 font-mono text-[#46bd3b] font-bold">
                      {typeof kw.currentRank === 'number' ? `#${kw.currentRank}` : kw.currentRank}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Snippet Modal */}
      {selectedSnippetIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#182126] border border-[#2c3b44] p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#232f36]">
              <h3 className="text-sm font-bold text-white">Header Code Snippet</h3>
              <button
                onClick={() => setSelectedSnippetIssue(null)}
                className="text-xs text-[#8095a2] hover:text-white cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <pre className="text-xs font-mono text-[#a3b9c7] p-3 rounded-xl bg-[#101518] border border-[#222e35] overflow-x-auto whitespace-pre-wrap">
              {selectedSnippetIssue.snippetCode}
            </pre>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => handleCopyCode(selectedSnippetIssue.snippetCode || '')}
                className="px-4 py-2 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-black" />
                <span>{copiedCode ? 'Copied!' : 'Copy Snippet'}</span>
              </button>
              <button
                onClick={() => {
                  handleAutoFix(selectedSnippetIssue)
                  setSelectedSnippetIssue(null)
                }}
                className="px-4 py-2 rounded-xl bg-[#202c33] text-white text-xs cursor-pointer"
              >
                Mark as Fixed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
