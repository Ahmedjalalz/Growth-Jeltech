import React, { useState } from 'react'
import {
  Code2,
  Sparkles,
  Copy,
  Play,
  Check,
  CheckCircle2,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { BusinessProfile } from '../data/mockData'

interface DeveloperApiViewProps {
  currentProfile: BusinessProfile
}

export const DeveloperApiView: React.FC<DeveloperApiViewProps> = ({ currentProfile }) => {
  const [apiKey] = useState('gp_live_8f9104b2819cd7e21a8')
  const [copiedKey, setCopiedKey] = useState(false)
  const [activeEndpoint, setActiveEndpoint] = useState<'booking' | 'form' | 'rental' | 'seo'>('booking')
  const [codeLang, setCodeLang] = useState<'js' | 'curl' | 'python'>('js')
  const [isRunningRequest, setIsRunningRequest] = useState(false)
  const [responseJson, setResponseJson] = useState<string | null>(null)

  const endpoints = {
    booking: {
      method: 'POST',
      path: '/api/v1/bookings/create',
      description: 'Creates a confirmed client appointment and syncs to calendar & lead inbox.',
      body: {
        service_id: 'srv_balayage_90',
        client_name: 'Jessica Taylor',
        client_phone: '+1 415 889 2011',
        start_time: '2026-10-15T11:00:00Z',
      },
      sampleResponse: {
        status: 'success',
        booking_id: 'bk_91042',
        appointment: {
          client: 'Jessica Taylor',
          service: 'Signature Balayage & Blowdry',
          staff: 'Sarah Jenkins',
          start_time: '2026-10-15T11:00:00Z',
          status: 'confirmed',
        },
        unified_inbox_synced: true,
      },
    },
    form: {
      method: 'POST',
      path: '/api/v1/forms/submit',
      description: 'Ingests structured customer quote / intake requests from external websites.',
      body: {
        form_id: `gp_${currentProfile.id}`,
        customer_name: 'Cameron Bell',
        customer_email: 'cameron.bell@gmail.com',
        move_size: '3-Bed House',
        estimated_quote_nzd: 1150,
      },
      sampleResponse: {
        status: 'received',
        submission_id: 'sub_8912',
        auto_quote_calculated: '$1,150 NZD',
        routing: 'forwarded_to_unified_inbox',
      },
    },
    rental: {
      method: 'GET',
      path: '/api/v1/rentals/availability',
      description: 'Checks live availability and daily pricing rules for fleet & property inventory.',
      body: {
        asset_id: 'porsche_911_gt3',
        check_in: '2026-10-20',
        check_out: '2026-10-23',
      },
      sampleResponse: {
        status: 'available',
        asset: '2024 Porsche 911 GT3 RS',
        rate_per_day_nzd: 1200,
        total_estimated: '$3,600 NZD',
        instant_reserve_enabled: true,
      },
    },
    seo: {
      method: 'POST',
      path: '/api/v1/seo/audit',
      description: 'Performs on-demand AI Core Web Vitals & keyword gap scan for any URL.',
      body: {
        url: currentProfile.website,
        mode: 'comprehensive_deep_crawl',
      },
      sampleResponse: {
        status: 'audit_completed',
        health_score: 84,
        critical_issues: 1,
        content_gap_opportunities: 4,
        meta_snippet_available: true,
      },
    },
  }

  const currentEndpointInfo = endpoints[activeEndpoint]

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
  }

  const handleSendTestRequest = () => {
    setIsRunningRequest(true)
    setResponseJson(null)
    setTimeout(() => {
      setIsRunningRequest(false)
      setResponseJson(JSON.stringify(currentEndpointInfo.sampleResponse, null, 2))
      confetti({ particleCount: 45, spread: 60 })
    }, 600)
  }

  const getCodeSnippet = () => {
    const ep = currentEndpointInfo
    if (codeLang === 'curl') {
      return `curl -X ${ep.method} "https://api.growthpilot.ai${ep.path}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(ep.body)}'`
    } else if (codeLang === 'js') {
      return `const response = await fetch("https://api.growthpilot.ai${ep.path}", {
  method: "${ep.method}",
  headers: {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(${JSON.stringify(ep.body, null, 2)})
});

const data = await response.json();
console.log(data);`
    } else {
      return `import requests

url = "https://api.growthpilot.ai${ep.path}"
headers = {"Authorization": "Bearer ${apiKey}"}
response = requests.${ep.method.toLowerCase()}(url, json=${JSON.stringify(ep.body)}, headers=headers)
print(response.json())`
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header Banner */}
      <div className="rounded-3xl bg-[#182126] border border-[#26343d] p-8 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#46bd3b]/10 border border-[#46bd3b]/30 text-[#46bd3b] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MODULE 7 · DEVELOPER API &amp; WEBSITE INTEGRATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Headless Engine API &amp; Widgets
            </h2>
            <p className="text-sm text-[#8ca0ab] leading-relaxed max-w-2xl">
              Connect your existing frontend design directly into GrowthPilot AI's backend logic and data storage.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#13191d] border border-[#26343c] flex items-center gap-3 shrink-0">
            <div>
              <div className="text-[10px] text-[#718590] uppercase font-mono">API Key</div>
              <div className="text-xs font-mono text-[#46bd3b] font-bold">{apiKey}</div>
            </div>
            <button
              onClick={handleCopyKey}
              className="p-2 rounded-xl bg-[#1d272d] hover:bg-[#25323a] text-white border border-[#2c3b44] cursor-pointer"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-[#46bd3b]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Playground Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Endpoints Nav (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#182126] border border-[#26343d] space-y-4">
          <div className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#232f36]">
            API Endpoints (Docs § 7)
          </div>

          <div className="space-y-2">
            {(
              [
                { id: 'booking', label: 'Booking System API', path: '/bookings/create', method: 'POST' },
                { id: 'form', label: 'Quote Ingestion API', path: '/forms/submit', method: 'POST' },
                { id: 'rental', label: 'Rentals Availability', path: '/rentals/availability', method: 'GET' },
                { id: 'seo', label: 'On-Demand SEO Audit', path: '/seo/audit', method: 'POST' },
              ] as const
            ).map((ep) => (
              <button
                key={ep.id}
                onClick={() => {
                  setActiveEndpoint(ep.id)
                  setResponseJson(null)
                }}
                className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between text-xs ${
                  activeEndpoint === ep.id
                    ? 'bg-[#1b252b] text-white border border-[#46bd3b]/50 shadow-md'
                    : 'text-[#8ca0ab] hover:bg-[#141b1f] hover:text-white'
                }`}
              >
                <div>
                  <div className="font-semibold text-sm">{ep.label}</div>
                  <div className="text-[11px] text-[#718590] font-mono mt-0.5">{ep.path}</div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold bg-[#141b1f] text-[#46bd3b]">
                  {ep.method}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Code & Runner (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#182126] border border-[#26343d] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#232f36]">
            <div>
              <div className="text-sm font-mono font-bold text-white">
                https://api.growthpilot.ai{currentEndpointInfo.path}
              </div>
              <p className="text-xs text-[#8095a2] mt-0.5">{currentEndpointInfo.description}</p>
            </div>

            <div className="flex items-center gap-1 bg-[#13191d] p-1 rounded-xl border border-[#243138]">
              {(['js', 'curl', 'python'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCodeLang(lang)}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer uppercase ${
                    codeLang === lang
                      ? 'bg-[#202a30] text-white border border-[#46bd3b]/40 font-bold'
                      : 'text-[#718590] hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <pre className="text-xs font-mono text-[#a5bac7] p-4 rounded-2xl bg-[#101518] border border-[#202b31] overflow-x-auto leading-relaxed">
            {getCodeSnippet()}
          </pre>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-[#8095a2]">Test live response:</span>
            <button
              onClick={handleSendTestRequest}
              disabled={isRunningRequest}
              className="px-5 py-2.5 rounded-2xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_15px_rgba(70,189,59,0.25)] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{isRunningRequest ? 'Sending...' : 'Send Test Request'}</span>
            </button>
          </div>

          {responseJson && (
            <div className="p-4 rounded-2xl bg-[#0f1417] border border-[#202b31] space-y-2 animate-in fade-in">
              <div className="text-xs font-mono text-[#46bd3b] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                200 OK (Response Received)
              </div>
              <pre className="text-xs font-mono text-emerald-400 p-2 overflow-x-auto">
                {responseJson}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
