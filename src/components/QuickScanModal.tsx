import React, { useState } from 'react'
import {
  Sparkles,
  Search,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { BusinessProfile } from '../data/mockData'

interface QuickScanModalProps {
  isOpen: boolean
  onClose: () => void
  currentProfile: BusinessProfile
  onScanCompleted: () => void
}

export const QuickScanModal: React.FC<QuickScanModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onScanCompleted,
}) => {
  if (!isOpen) return null

  const [step, setStep] = useState<number>(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const handleStartScan = () => {
    setIsRunning(true)
    setStep(1)

    setTimeout(() => setStep(2), 600)
    setTimeout(() => setStep(3), 1300)
    setTimeout(() => setStep(4), 2000)
    setTimeout(() => {
      setIsRunning(false)
      setIsFinished(true)
      confetti({ particleCount: 65, spread: 75 })
    }, 2500)
  }

  const handleDone = () => {
    onScanCompleted()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-[#182126] border border-[#2c3b44] p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-[#232f36]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#46bd3b]/10 border border-[#46bd3b]/30 text-[#46bd3b] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI GROWTH SCAN</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Automated Growth Audit
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-[#8095a2] hover:text-white cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        <p className="text-xs text-[#8ca0ab] leading-relaxed">
          Simulates an end-to-end evaluation for <strong className="text-white">{currentProfile.name}</strong> across SEO rankings, Meta ad spend efficiency, and customer response times.
        </p>

        {/* Step checklist with spacious padding */}
        <div className="space-y-3">
          <div
            className={`p-4 rounded-2xl border text-xs transition-all flex items-center justify-between ${
              step >= 1
                ? 'bg-[#15231c] border-[#46bd3b]/40 text-white'
                : 'bg-[#13191d] border-[#222e35] text-[#718590]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Search className={`w-4 h-4 ${step >= 1 ? 'text-[#46bd3b]' : 'text-[#718590]'}`} />
              <span className="font-medium">1. SEO Web Vitals &amp; Meta Tags</span>
            </div>
            {step === 1 && <RefreshCw className="w-4 h-4 text-[#46bd3b] animate-spin" />}
            {step > 1 && <CheckCircle2 className="w-4 h-4 text-[#46bd3b]" />}
          </div>

          <div
            className={`p-4 rounded-2xl border text-xs transition-all flex items-center justify-between ${
              step >= 2
                ? 'bg-[#15231c] border-[#46bd3b]/40 text-white'
                : 'bg-[#13191d] border-[#222e35] text-[#718590]'
            }`}
          >
            <div className="flex items-center gap-3">
              <TrendingUp className={`w-4 h-4 ${step >= 2 ? 'text-[#46bd3b]' : 'text-[#718590]'}`} />
              <span className="font-medium">2. Meta Ads ROAS &amp; Hook Strength</span>
            </div>
            {step === 2 && <RefreshCw className="w-4 h-4 text-[#46bd3b] animate-spin" />}
            {step > 2 && <CheckCircle2 className="w-4 h-4 text-[#46bd3b]" />}
          </div>

          <div
            className={`p-4 rounded-2xl border text-xs transition-all flex items-center justify-between ${
              step >= 3
                ? 'bg-[#15231c] border-[#46bd3b]/40 text-white'
                : 'bg-[#13191d] border-[#222e35] text-[#718590]'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className={`w-4 h-4 ${step >= 3 ? 'text-[#46bd3b]' : 'text-[#718590]'}`} />
              <span className="font-medium">3. Customer Chat Latency (IG, WhatsApp, FB)</span>
            </div>
            {step === 3 && <RefreshCw className="w-4 h-4 text-[#46bd3b] animate-spin" />}
            {step > 3 && <CheckCircle2 className="w-4 h-4 text-[#46bd3b]" />}
          </div>

          <div
            className={`p-4 rounded-2xl border text-xs transition-all flex items-center justify-between ${
              step >= 4
                ? 'bg-[#15231c] border-[#46bd3b]/40 text-white'
                : 'bg-[#13191d] border-[#222e35] text-[#718590]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Zap className={`w-4 h-4 ${step >= 4 ? 'text-[#46bd3b]' : 'text-[#718590]'}`} />
              <span className="font-medium">4. Operational Modules &amp; API Health</span>
            </div>
            {step === 4 && <RefreshCw className="w-4 h-4 text-[#46bd3b] animate-spin" />}
            {isFinished && <CheckCircle2 className="w-4 h-4 text-[#46bd3b]" />}
          </div>
        </div>

        {/* Scan Results */}
        {isFinished && (
          <div className="p-4 rounded-2xl bg-[#14231b] border border-[#46bd3b]/40 space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-[#46bd3b]">
              <ShieldCheck className="w-4 h-4" />
              <span>All 3 Core Growth Pillars Synchronized!</span>
            </div>
            <p className="text-xs text-[#9bb3a6] leading-relaxed">
              SEO Health evaluated at 84/100, Meta Campaigns executing at 4.60x ROAS with automated scaling, and customer leads receiving instant AI replies.
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-[#232f36]">
          {!isFinished ? (
            <button
              onClick={handleStartScan}
              disabled={isRunning}
              className="w-full py-3.5 rounded-2xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] cursor-pointer disabled:opacity-50"
            >
              {isRunning ? 'Analyzing...' : 'Run Automated Scan'}
            </button>
          ) : (
            <button
              onClick={handleDone}
              className="w-full py-3.5 rounded-2xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs cursor-pointer shadow-[0_0_15px_rgba(70,189,59,0.25)]"
            >
              Apply Findings &amp; View Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
