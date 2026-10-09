import React from 'react'
import {
  Zap,
  CalendarDays,
  FileText,
  Car,
  Layers,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { BusinessProfile } from '../data/mockData'

interface ModuleSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  currentProfile: BusinessProfile
  onToggleModule: (moduleKey: keyof BusinessProfile['activeModules']) => void
}

export const ModuleSettingsModal: React.FC<ModuleSettingsModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onToggleModule,
}) => {
  if (!isOpen) return null

  const handleToggle = (key: keyof BusinessProfile['activeModules']) => {
    onToggleModule(key)
    confetti({ particleCount: 30, spread: 45 })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-[#182126] border border-[#2c3b44] p-8 sm:p-10 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-[#232f36]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>SECTION 6 · BUSINESS MODULES</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Configure Active Modules
            </h3>
            <p className="text-xs text-[#8095a2]">
              Toggle operational features on or off for {currentProfile.name}.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-[#8095a2] hover:text-white cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Core Growth Engine Notice */}
        <div className="p-5 rounded-2xl bg-[#13191d] border border-[#222e35] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#46bd3b]/15 text-[#46bd3b] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Core Growth Engine (SEO · Ads · Leads)</div>
              <p className="text-xs text-[#8095a2]">Always enabled across all accounts.</p>
            </div>
          </div>
          <span className="text-[10px] text-[#46bd3b] font-mono bg-[#46bd3b]/10 px-2.5 py-1 rounded-full font-bold">
            ACTIVE
          </span>
        </div>

        {/* Feature Modules */}
        <div className="space-y-3">
          {/* Module 6.1 */}
          <div className="p-5 rounded-2xl bg-[#13191d] border border-[#222e35] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#46bd3b]/15 text-[#46bd3b] flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">6.1 Booking &amp; Appointment System</div>
                <p className="text-xs text-[#8095a2] mt-0.5">
                  Salons, barbers, clinics. Real-time calendar &amp; client widget.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleToggle('bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentProfile.activeModules.bookings
                  ? 'bg-[#46bd3b] text-black font-bold'
                  : 'bg-[#1f282e] text-slate-300 hover:text-white'
              }`}
            >
              {currentProfile.activeModules.bookings ? 'Enabled ✓' : 'Enable'}
            </button>
          </div>

          {/* Module 6.2 */}
          <div className="p-5 rounded-2xl bg-[#13191d] border border-[#222e35] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">6.2 Custom Form &amp; Quote Builder</div>
                <p className="text-xs text-[#8095a2] mt-0.5">
                  Intake submissions, moving quotes, school admissions.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleToggle('forms')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentProfile.activeModules.forms
                  ? 'bg-[#46bd3b] text-black font-bold'
                  : 'bg-[#1f282e] text-slate-300 hover:text-white'
              }`}
            >
              {currentProfile.activeModules.forms ? 'Enabled ✓' : 'Enable'}
            </button>
          </div>

          {/* Module 6.3 */}
          <div className="p-5 rounded-2xl bg-[#13191d] border border-[#222e35] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">6.3 Rental &amp; Listing Management</div>
                <p className="text-xs text-[#8095a2] mt-0.5">
                  Luxury vehicles, villas, units with availability calendars.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleToggle('rentals')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentProfile.activeModules.rentals
                  ? 'bg-[#46bd3b] text-black font-bold'
                  : 'bg-[#1f282e] text-slate-300 hover:text-white'
              }`}
            >
              {currentProfile.activeModules.rentals ? 'Enabled ✓' : 'Enable'}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#232f36]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs cursor-pointer shadow-[0_0_15px_rgba(70,189,59,0.25)]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
