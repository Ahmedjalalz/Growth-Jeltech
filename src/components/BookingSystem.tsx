import React, { useState } from 'react'
import {
  CalendarDays,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { BookingAppointment, BusinessProfile } from '../data/mockData'

interface BookingSystemProps {
  currentProfile: BusinessProfile
  bookings: BookingAppointment[]
  onAddBooking: (booking: BookingAppointment) => void
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  currentProfile,
  bookings,
  onAddBooking,
}) => {
  const [showClientWidgetModal, setShowClientWidgetModal] = useState(false)

  // Booking Widget Form State
  const [selectedService, setSelectedService] = useState('Signature Balayage & Blowdry')
  const [selectedStaff, setSelectedStaff] = useState('Sarah Jenkins')
  const [selectedDate, setSelectedDate] = useState('2026-10-15')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM')
  const [clientNameInput, setClientNameInput] = useState('')
  const [clientPhoneInput, setClientPhoneInput] = useState('')
  const [clientEmailInput, setClientEmailInput] = useState('')

  const servicesCatalogue = [
    { name: 'Signature Balayage & Blowdry', duration: '90 mins', price: '$220', staff: 'Sarah Jenkins' },
    { name: 'Precision Fade & Hot Towel Shave', duration: '45 mins', price: '$65', staff: 'Marco Rossi' },
    { name: 'Hydra-Gloss Treatment + Style', duration: '60 mins', price: '$145', staff: 'Sarah Jenkins' },
    { name: 'Full Color Correction & Restructure', duration: '120 mins', price: '$310', staff: 'Sarah Jenkins' },
  ]

  const handleCompleteTestBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientNameInput.trim()) return

    const newAppointment: BookingAppointment = {
      id: `b-${Date.now().toString().slice(-4)}`,
      clientName: clientNameInput.trim(),
      serviceName: selectedService,
      staffMember: selectedStaff,
      date: selectedDate,
      time: selectedTimeSlot,
      status: 'Confirmed',
      price: servicesCatalogue.find((s) => s.name === selectedService)?.price || '$150',
      clientEmail: clientEmailInput || 'client@example.com',
      clientPhone: clientPhoneInput || '+1 415 555 9011',
    }

    onAddBooking(newAppointment)
    setShowClientWidgetModal(false)
    setClientNameInput('')
    setClientPhoneInput('')
    setClientEmailInput('')
    confetti({ particleCount: 65, spread: 70 })
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="rounded-3xl bg-[#182126] border border-[#26343d] p-8 sm:p-10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#46bd3b]/10 border border-[#46bd3b]/30 text-[#46bd3b] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MODULE 6.1 · BOOKING &amp; APPOINTMENT SYSTEM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Appointment Scheduling
            </h2>
            <p className="text-sm text-[#8ca0ab] leading-relaxed max-w-2xl">
              Self-serve calendar for salons, barbers, and clinics. Synchronizes bookings directly with your dashboard and unified inbox.
            </p>
          </div>

          <button
            onClick={() => setShowClientWidgetModal(true)}
            className="px-5 py-3 rounded-2xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] hover:scale-[1.02] flex items-center gap-2 cursor-pointer shrink-0"
          >
            <ExternalLink className="w-4 h-4 text-black stroke-[2.5]" />
            <span>Test Client Booking Widget</span>
          </button>
        </div>
      </div>

      {/* Services & Scheduled Appointments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Services Catalogue (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#182126] border border-[#26343d] space-y-4">
          <div className="pb-3 border-b border-[#232f36]">
            <h3 className="text-base font-bold text-white">Configured Services</h3>
            <p className="text-xs text-[#8095a2] mt-0.5">Offered services &amp; pricing</p>
          </div>

          <div className="space-y-3">
            {servicesCatalogue.map((srv, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#13191d] border border-[#222e35] flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-semibold text-white">{srv.name}</div>
                  <div className="text-xs text-[#718590] mt-0.5">
                    {srv.duration} · {srv.staff}
                  </div>
                </div>
                <div className="text-sm font-bold text-[#46bd3b] font-mono">{srv.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Scheduled Bookings (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#182126] border border-[#26343d] overflow-hidden">
          <div className="p-6 border-b border-[#232f36] flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">Upcoming Bookings</h3>
              <p className="text-xs text-[#8095a2]">Live appointments received from web &amp; chat widgets.</p>
            </div>
            <span className="text-xs font-mono text-[#46bd3b] font-bold">
              {bookings.length} Booked
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#141b20] text-[#718590] uppercase font-mono text-[10px] border-b border-[#232f36]">
                <tr>
                  <th className="py-4 px-6">Client</th>
                  <th className="py-4 px-6">Service</th>
                  <th className="py-4 px-6">Staff</th>
                  <th className="py-4 px-6">Slot</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f282e] text-[#d6e0e6]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#1b2328] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      <div>{b.clientName}</div>
                      <div className="text-[11px] text-[#718590] font-mono">{b.clientPhone}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-200">{b.serviceName}</td>
                    <td className="py-4 px-6 text-[#8c9fa9]">{b.staffMember}</td>
                    <td className="py-4 px-6 font-mono text-cyan-400">
                      {b.date} · {b.time}
                    </td>
                    <td className="py-4 px-6 font-mono text-[#46bd3b] font-bold">{b.price}</td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#46bd3b]/15 text-[#46bd3b]">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Client-Facing Booking Widget Modal */}
      {showClientWidgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-[#182126] border border-[#2c3b44] p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#232f36]">
              <div>
                <span className="text-[10px] font-mono text-[#46bd3b] uppercase">Customer Widget</span>
                <h3 className="text-lg font-bold text-white">Book an Appointment</h3>
              </div>
              <button
                onClick={() => setShowClientWidgetModal(false)}
                className="text-xs text-[#8095a2] hover:text-white cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCompleteTestBooking} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Select Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
                >
                  {servicesCatalogue.map((s, i) => (
                    <option key={i} value={s.name}>
                      {s.name} ({s.duration} - {s.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Time</label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:15 PM">02:15 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#232f36]">
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Jessica Taylor)"
                  value={clientNameInput}
                  onChange={(e) => setClientNameInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={clientPhoneInput}
                  onChange={(e) => setClientPhoneInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] cursor-pointer"
              >
                Confirm Appointment &amp; Sync to Dashboard
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
