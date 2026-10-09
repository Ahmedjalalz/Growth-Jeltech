import React, { useState } from 'react'
import {
  FileText,
  Sparkles,
  Plus,
  Copy,
  Trash2,
  Code2,
  Send,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { FormSubmission, BusinessProfile } from '../data/mockData'

interface FormQuoteBuilderProps {
  currentProfile: BusinessProfile
  submissions: FormSubmission[]
  onAddSubmission: (submission: FormSubmission) => void
}

export const FormQuoteBuilder: React.FC<FormQuoteBuilderProps> = ({
  currentProfile,
  submissions,
  onAddSubmission,
}) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'builder' | 'preview'>('submissions')
  const [copiedSnippet, setCopiedSnippet] = useState(false)

  const [fields, setFields] = useState<string[]>([
    'Customer Full Name',
    'Email & Phone Number',
    'Pickup Address & Destination Suburb',
    'Property Size (Studio / 1-Bed / 2-Bed / 3-Bed+)',
    'Elevator Access & Flights of Stairs',
    'Need Professional Packing Boxes?',
  ])
  const [newFieldLabel, setNewFieldLabel] = useState('')

  // Test form state
  const [testName, setTestName] = useState('Oliver Queen')
  const [testEmail, setTestEmail] = useState('oliver.queen@starling.nz')
  const [testDetails, setTestDetails] = useState('3-Bed Townhouse (Grey Lynn to Parnell) · 1 flight of stairs')
  const [testBoxes, setTestBoxes] = useState('Yes, include 15 eco moving boxes')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFieldLabel.trim()) return
    setFields([...fields, newFieldLabel.trim()])
    setNewFieldLabel('')
  }

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const handleCopyEmbedCode = () => {
    const code = `<!-- GrowthPilot Embedded Quote Widget -->\n<div id="growthpilot-quote-widget" data-form-id="gp-${currentProfile.id}"></div>\n<script src="https://cdn.growthpilot.ai/v1/widget.js" async></script>`
    navigator.clipboard.writeText(code)
    setCopiedSnippet(true)
    setTimeout(() => setCopiedSnippet(false), 2000)
  }

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      const newSub: FormSubmission = {
        id: `sub-${Date.now().toString().slice(-3)}`,
        formName: 'Instant Move & Relocation Estimator',
        submittedAt: 'Just now',
        customerName: testName,
        customerEmail: testEmail,
        detailsSummary: `${testDetails} · ${testBoxes}`,
        estimatedQuote: '$1,280 NZD',
        status: 'Pending Review',
      }
      onAddSubmission(newSub)
      setIsSubmitting(false)
      setActiveTab('submissions')
      confetti({ particleCount: 60, spread: 70 })
    }, 800)
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="rounded-3xl bg-[#182126] border border-[#26343d] p-8 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MODULE 6.2 · CUSTOM FORM &amp; QUOTE BUILDER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Intake Forms &amp; Instant Quotes
            </h2>
            <p className="text-sm text-[#8ca0ab] leading-relaxed max-w-2xl">
              Capture structured submissions for moves, admissions, and project estimates.
            </p>
          </div>

          <button
            onClick={handleCopyEmbedCode}
            className="px-5 py-3 rounded-2xl bg-[#1f282f] hover:bg-[#26343c] border border-[#2d3e48] text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Code2 className="w-4 h-4 text-[#46bd3b]" />
            <span>{copiedSnippet ? 'Copied Embed Code!' : 'Get Embed Code'}</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#232f36] gap-4 pt-2">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'submissions' ? 'text-[#46bd3b]' : 'text-[#8095a2] hover:text-white'
            }`}
          >
            Submissions Inbox ({submissions.length})
            {activeTab === 'submissions' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#46bd3b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'builder' ? 'text-[#46bd3b]' : 'text-[#8095a2] hover:text-white'
            }`}
          >
            Form Fields ({fields.length})
            {activeTab === 'builder' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#46bd3b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'preview' ? 'text-[#46bd3b]' : 'text-[#8095a2] hover:text-white'
            }`}
          >
            Test Submission Form
            {activeTab === 'preview' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#46bd3b] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: Submissions */}
      {activeTab === 'submissions' && (
        <div className="rounded-3xl bg-[#182126] border border-[#26343d] overflow-hidden">
          <div className="p-6 border-b border-[#232f36] flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">Received Submissions</h3>
              <p className="text-xs text-[#8095a2]">Inquiries submitted by customers from your website.</p>
            </div>
            <span className="text-xs font-mono text-[#46bd3b] font-bold">{submissions.length} Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#141b20] text-[#718590] uppercase font-mono text-[10px] border-b border-[#232f36]">
                <tr>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Form</th>
                  <th className="py-4 px-6">Summary</th>
                  <th className="py-4 px-6">Est. Quote</th>
                  <th className="py-4 px-6">Submitted</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f282e] text-[#d6e0e6]">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#1b2328] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      <div>{sub.customerName}</div>
                      <div className="text-[11px] text-[#718590] font-mono">{sub.customerEmail}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{sub.formName}</td>
                    <td className="py-4 px-6 text-[#8ea1ad] max-w-xs truncate">{sub.detailsSummary}</td>
                    <td className="py-4 px-6 font-mono text-[#46bd3b] font-bold">{sub.estimatedQuote}</td>
                    <td className="py-4 px-6 text-[#718590] font-mono">{sub.submittedAt}</td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#46bd3b]/15 text-[#46bd3b]">
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Field Designer */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#182126] border border-[#26343d] space-y-4">
            <h3 className="text-base font-bold text-white">Add Intake Field</h3>
            <p className="text-xs text-[#8095a2] leading-relaxed">
              Design the custom questions needed to generate automated quotes.
            </p>

            <form onSubmit={handleAddField} className="space-y-3">
              <input
                type="text"
                placeholder="Field label (e.g. Flight of stairs?)"
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_15px_rgba(70,189,59,0.25)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-black stroke-[2.5]" />
                <span>Add Field</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#182126] border border-[#26343d] space-y-3">
            <h3 className="text-base font-bold text-white mb-2">Configured Questions</h3>
            {fields.map((fld, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#13191d] border border-[#222e35] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1b252b] text-[#718590] flex items-center justify-center font-mono text-xs">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-white">{fld}</span>
                </div>
                <button
                  onClick={() => handleRemoveField(idx)}
                  className="text-[#647883] hover:text-rose-400 p-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Preview Form */}
      {activeTab === 'preview' && (
        <div className="max-w-xl mx-auto rounded-3xl bg-[#182126] border border-[#26343d] p-8 sm:p-10 space-y-5 shadow-2xl">
          <div className="text-center pb-3 border-b border-[#232f36]">
            <h3 className="text-lg font-bold text-white">Instant Move Estimator</h3>
            <p className="text-xs text-[#8095a2] mt-1">Submit test data to preview live ingestion.</p>
          </div>

          <form onSubmit={handleTestSubmit} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
            />
            <input
              type="email"
              required
              placeholder="Email address"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
            />
            <textarea
              rows={2}
              placeholder="Details"
              value={testDetails}
              onChange={(e) => setTestDetails(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
            />
            <input
              type="text"
              placeholder="Supplies"
              value={testBoxes}
              onChange={(e) => setTestBoxes(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
            />

            <div className="p-4 rounded-xl bg-[#13191d] border border-[#222e35] flex items-center justify-between text-xs">
              <span className="text-[#8095a2]">Estimated Online Quote:</span>
              <span className="font-bold text-[#46bd3b] text-base font-mono">$1,280 NZD</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-black stroke-[2.5]" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Quote Request'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
