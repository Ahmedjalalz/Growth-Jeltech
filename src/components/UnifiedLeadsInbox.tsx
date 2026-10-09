import React, { useState } from 'react'
import {
  MessageSquare,
  Sparkles,
  Send,
  Bot,
  User,
  Calendar,
  FileText,
  Tag,
  DollarSign,
  CheckCircle2,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { UnifiedLeadConversation, LeadMessage } from '../data/mockData'

interface UnifiedLeadsInboxProps {
  leads: UnifiedLeadConversation[]
  onUpdateLeads: (leads: UnifiedLeadConversation[]) => void
}

export const UnifiedLeadsInbox: React.FC<UnifiedLeadsInboxProps> = ({
  leads,
  onUpdateLeads,
}) => {
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '')
  const [channelFilter, setChannelFilter] = useState<'ALL' | 'WhatsApp' | 'Instagram' | 'Facebook'>('ALL')
  const [replyText, setReplyText] = useState('')
  const [isGeneratingAiReply, setIsGeneratingAiReply] = useState(false)

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0]

  const filteredLeads = leads.filter((lead) => {
    if (channelFilter === 'ALL') return true
    return lead.channel === channelFilter
  })

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || replyText
    if (!text.trim() || !selectedLead) return

    const newMessage: LeadMessage = {
      id: `msg-${Date.now()}`,
      sender: 'business',
      text: text.trim(),
      timestamp: 'Just now',
    }

    const updated = leads.map((l) => {
      if (l.id === selectedLead.id) {
        return {
          ...l,
          unread: false,
          status: 'AI Responded' as const,
          lastMessageSnippet: text.trim(),
          lastMessageTime: 'Just now',
          messages: [...l.messages, newMessage],
        }
      }
      return l
    })

    onUpdateLeads(updated)
    setReplyText('')
  }

  const handleGenerateAiResponse = () => {
    if (!selectedLead) return
    setIsGeneratingAiReply(true)

    setTimeout(() => {
      let smartReply = ''
      if (selectedLead.channel === 'Instagram') {
        smartReply = `Kia ora ${selectedLead.contactName}! Thanks for reaching out. Yes, our weekend crew has availability for this Saturday morning in Takapuna. For a 2-bedroom home, our fixed quote is $750-$850 NZD including full transit insurance. Would you like me to reserve the 9:00 AM slot for you?`
      } else if (selectedLead.channel === 'WhatsApp') {
        smartReply = `Hello ${selectedLead.contactName}! We’ve reviewed your commercial relocation requirements. Our team can execute this after 6:00 PM with zero disruption to your workday. Would tomorrow at 11 AM suit for a 5-minute site assessment?`
      } else {
        smartReply = `Hi ${selectedLead.contactName}! To confirm the deposit and lock in your date, you can click here to securely complete your booking: https://paulmovers.co.nz/pay-deposit`
      }

      setReplyText(smartReply)
      setIsGeneratingAiReply(false)
      confetti({ particleCount: 35, spread: 50 })
    }, 700)
  }

  const handleQuickInsert = (actionType: 'booking' | 'quote') => {
    if (actionType === 'booking') {
      const text = `You can easily choose your preferred time slot here: https://paulmovers.co.nz/book`
      handleSendMessage(text)
    } else {
      const text = `Here is your customized instant quote breakdown: https://paulmovers.co.nz/quote-1049 ($850 NZD fixed estimate).`
      handleSendMessage(text)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      {/* Top Banner */}
      <div className="rounded-3xl bg-[#182126] border border-[#26343d] p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MODULE 3 · UNIFIED LEADS INBOX</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Customer Conversations
            </h2>
            <p className="text-xs text-[#8095a2]">
              Instagram DMs, WhatsApp Business, and Facebook Messenger in a single clean workspace.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#13191d] p-1.5 rounded-2xl border border-[#243138]">
            {(['ALL', 'WhatsApp', 'Instagram', 'Facebook'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  channelFilter === ch
                    ? 'bg-[#1b252b] text-white border border-[#46bd3b]/50 shadow-sm'
                    : 'text-[#7e919d] hover:text-white'
                }`}
              >
                {ch === 'ALL' ? 'All Channels' : ch}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spacious 2-Column Chat Layout */}
      <div className="rounded-3xl bg-[#182126] border border-[#26343d] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[660px] shadow-xl">
        {/* Left Column: Conversations List (4 cols) */}
        <div className="md:col-span-4 border-r border-[#243138] flex flex-col bg-[#141b20]">
          <div className="p-4 border-b border-[#243138] flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Messages ({filteredLeads.length})
            </span>
            <span className="text-[10px] text-[#46bd3b] font-mono bg-[#46bd3b]/10 px-2 py-0.5 rounded">
              Synced
            </span>
          </div>

          <div className="divide-y divide-[#1e272d] overflow-y-auto flex-1">
            {filteredLeads.map((lead) => {
              const isSelected = lead.id === selectedLead?.id
              return (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`w-full text-left p-4 transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected ? 'bg-[#1c262d] border-l-3 border-[#46bd3b]' : 'hover:bg-[#182025]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full ${lead.avatarColor} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md`}>
                    {lead.contactName.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white truncate">
                        {lead.contactName}
                      </span>
                      <span className="text-[10px] text-[#718590] shrink-0 font-mono">
                        {lead.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-xs text-[#8e9fa9] line-clamp-1 mb-2">
                      {lead.lastMessageSnippet}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          lead.channel === 'WhatsApp'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : lead.channel === 'Instagram'
                            ? 'bg-pink-500/15 text-pink-400'
                            : 'bg-blue-500/15 text-blue-400'
                        }`}
                      >
                        {lead.channel}
                      </span>

                      <span
                        className={`text-[10px] font-mono ${
                          lead.status === 'Needs Reply'
                            ? 'text-amber-400 font-bold'
                            : lead.status === 'Booked'
                            ? 'text-[#46bd3b]'
                            : 'text-[#7d909c]'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Active Conversation Thread (8 cols) */}
        <div className="md:col-span-8 flex flex-col justify-between bg-[#151c20]">
          {selectedLead ? (
            <>
              {/* Clean Thread Header */}
              <div className="p-5 border-b border-[#243138] bg-[#172025] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${selectedLead.avatarColor} text-white flex items-center justify-center font-bold text-sm`}>
                    {selectedLead.contactName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      {selectedLead.contactName}
                      <span className="text-xs text-[#718590] font-normal font-mono">
                        {selectedLead.contactPhoneOrHandle}
                      </span>
                    </div>
                    <div className="text-xs text-[#7e919c] flex items-center gap-2 mt-0.5">
                      <span className="text-[#46bd3b] font-medium">{selectedLead.channel}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-[#8b9da7]">
                        <Tag className="w-3 h-3 text-[#46bd3b]" />
                        {selectedLead.adSource}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-[10px] uppercase font-mono text-[#718590]">Est. Deal Value</div>
                  <div className="text-sm font-bold text-[#46bd3b] font-mono">
                    {selectedLead.estimatedValue}
                  </div>
                </div>
              </div>

              {/* Message History with comfortable padding */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1 max-h-[420px]">
                {selectedLead.messages.map((msg) => {
                  const isCustomer = msg.sender === 'customer'
                  const isAi = msg.sender === 'ai_pilot'
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5 text-[11px] text-[#718590]">
                        {isCustomer && <User className="w-3 h-3 text-[#7d909b]" />}
                        {isAi && <Bot className="w-3 h-3 text-[#46bd3b]" />}
                        <span>{isCustomer ? selectedLead.contactName : isAi ? 'AI Pilot Auto-Reply' : 'You (Owner)'}</span>
                        <span>·</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-[78%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isCustomer
                            ? 'bg-[#1e282f] text-slate-100 rounded-tl-sm border border-[#2b3a43]'
                            : isAi
                            ? 'bg-[#182920] text-emerald-100 rounded-tr-sm border border-[#46bd3b]/40 shadow-[0_0_20px_rgba(70,189,59,0.1)]'
                            : 'bg-[#232f36] text-white rounded-tr-sm border border-[#30404a]'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Reply Box & Friendly AI Suggested Responses */}
              <div className="p-4 border-t border-[#243138] bg-[#172025] space-y-3">
                {/* AI Copilot Suggestion Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-[11px] text-[#718590] shrink-0 font-medium mr-1">
                    AI Suggestions:
                  </span>
                  <button
                    onClick={handleGenerateAiResponse}
                    disabled={isGeneratingAiReply}
                    className="px-3 py-1.5 rounded-xl bg-[#46bd3b]/15 hover:bg-[#46bd3b]/25 border border-[#46bd3b]/40 text-[#46bd3b] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingAiReply ? 'Drafting...' : 'Auto-Draft Response'}</span>
                  </button>

                  <button
                    onClick={() => handleQuickInsert('booking')}
                    className="px-3 py-1.5 rounded-xl bg-[#1e282f] hover:bg-[#25323a] border border-[#2c3b44] text-slate-200 text-xs flex items-center gap-1.5 shrink-0 cursor-pointer transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Send Booking Link</span>
                  </button>

                  <button
                    onClick={() => handleQuickInsert('quote')}
                    className="px-3 py-1.5 rounded-xl bg-[#1e282f] hover:bg-[#25323a] border border-[#2c3b44] text-slate-200 text-xs flex items-center gap-1.5 shrink-0 cursor-pointer transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Send Quote</span>
                  </button>
                </div>

                {/* Input row */}
                <div className="flex gap-2.5">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={`Reply to ${selectedLead.contactName}...`}
                    className="flex-1 px-4 py-3 rounded-2xl bg-[#12181b] border border-[#28373f] text-xs sm:text-sm text-white placeholder-[#5a6e7a] focus:outline-none focus:border-[#46bd3b]"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="px-5 py-3 rounded-2xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(70,189,59,0.25)]"
                  >
                    <Send className="w-4 h-4 text-black stroke-[2.5]" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-[#718590]">
              No conversation selected.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
