import React, { useState } from 'react'
import {
  Car,
  Sparkles,
  Plus,
  Calendar,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { RentalListing, BusinessProfile } from '../data/mockData'

interface RentalListingManagerProps {
  currentProfile: BusinessProfile
  rentals: RentalListing[]
  onAddRental: (item: RentalListing) => void
  onToggleStatus: (id: string) => void
}

export const RentalListingManager: React.FC<RentalListingManagerProps> = ({
  currentProfile,
  rentals,
  onAddRental,
  onToggleStatus,
}) => {
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'Supercar' | 'Luxury SUV' | 'Seaside Villa' | 'Penthouse'>('ALL')
  const [showAddModal, setShowAddModal] = useState(false)

  // Add asset form state
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState<'Supercar' | 'Luxury SUV' | 'Seaside Villa' | 'Penthouse'>('Supercar')
  const [newRate, setNewRate] = useState('$850/day')
  const [newSpecs, setNewSpecs] = useState('Twin Turbo V8 · Carbon Package')
  const [newImage, setNewImage] = useState(
    'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80'
  )

  const filteredRentals = rentals.filter((r) => {
    if (filterCategory === 'ALL') return true
    return r.category === filterCategory
  })

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newItem: RentalListing = {
      id: `r-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      category: newCategory,
      ratePerDay: newRate,
      availableStatus: 'Available Now',
      image: newImage,
      specs: newSpecs,
      upcomingBookingsCount: 1,
    }

    onAddRental(newItem)
    setShowAddModal(false)
    setNewTitle('')
    confetti({ particleCount: 60, spread: 60 })
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header Banner */}
      <div className="rounded-3xl bg-[#182126] border border-[#26343d] p-8 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MODULE 6.3 · RENTAL &amp; LISTING MANAGEMENT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Vehicle &amp; Property Fleet Listings
            </h2>
            <p className="text-sm text-[#8ca0ab] leading-relaxed max-w-2xl">
              Manage luxury units, set daily rates, and sync booking inquiries into your unified inbox.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-2xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] hover:scale-[1.02] flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-black stroke-[2.5]" />
            <span>List New Asset</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#232f36]">
          {(['ALL', 'Supercar', 'Luxury SUV', 'Seaside Villa', 'Penthouse'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#1e2a30] text-white border border-[#46bd3b]/50 shadow-sm'
                  : 'text-[#7e919d] hover:text-white bg-[#13191d]'
              }`}
            >
              {cat === 'ALL' ? 'All Units' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Grid with spacious cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRentals.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-[#182126] border border-[#26343d] overflow-hidden hover:border-[#46bd3b]/40 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="aspect-[16/10] relative overflow-hidden bg-[#13191d]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      item.availableStatus === 'Available Now'
                        ? 'bg-[#46bd3b] text-black font-bold'
                        : 'bg-amber-500 text-black font-bold'
                    }`}
                  >
                    {item.availableStatus}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs font-black font-mono text-white bg-black/80 px-2.5 py-1 rounded-xl">
                    {item.ratePerDay}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="text-[10px] text-[#718590] uppercase font-mono">{item.category}</div>
                <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                <p className="text-xs text-[#8c9fa9] line-clamp-2 leading-relaxed">{item.specs}</p>
                <div className="pt-2 text-xs text-[#718590] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.upcomingBookingsCount} bookings</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => onToggleStatus(item.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  item.availableStatus === 'Available Now'
                    ? 'bg-[#1f292f] hover:bg-[#25323a] text-slate-200 border border-[#2b3b44]'
                    : 'bg-[#46bd3b]/15 text-[#46bd3b] border border-[#46bd3b]/30'
                }`}
              >
                {item.availableStatus === 'Available Now' ? 'Mark Reserved' : 'Set Available'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-3xl bg-[#182126] border border-[#2c3b44] p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#232f36]">
              <h3 className="text-base font-bold text-white">Add Rental Asset</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-[#8095a2] hover:text-white cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateAsset} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Asset Title (e.g. 2024 Porsche 911 GT3)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
                >
                  <option value="Supercar">Supercar</option>
                  <option value="Luxury SUV">Luxury SUV</option>
                  <option value="Seaside Villa">Seaside Villa</option>
                  <option value="Penthouse">Penthouse</option>
                </select>

                <input
                  type="text"
                  required
                  placeholder="Daily Rate"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
                />
              </div>

              <input
                type="text"
                placeholder="Specifications"
                value={newSpecs}
                onChange={(e) => setNewSpecs(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#13191d] border border-[#28373f] text-xs text-white focus:outline-none focus:border-[#46bd3b]"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#46bd3b] hover:bg-[#3ea934] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(70,189,59,0.25)] cursor-pointer"
              >
                Publish Asset
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
