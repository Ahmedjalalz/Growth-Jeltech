import React, { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Sidebar, NavTabId } from './components/Sidebar'
import { DashboardOverview } from './components/DashboardOverview'
import { SeoIntelligence } from './components/SeoIntelligence'
import { SmartAdsManager } from './components/SmartAdsManager'
import { UnifiedLeadsInbox } from './components/UnifiedLeadsInbox'
import { BookingSystem } from './components/BookingSystem'
import { FormQuoteBuilder } from './components/FormQuoteBuilder'
import { RentalListingManager } from './components/RentalListingManager'
import { DeveloperApiView } from './components/DeveloperApiView'
import { ModuleSettingsModal } from './components/ModuleSettingsModal'
import { QuickScanModal } from './components/QuickScanModal'
import {
  BUSINESS_PROFILES,
  BusinessProfile,
  INITIAL_ADS,
  INITIAL_LEADS,
  INITIAL_SEO_ISSUES,
  INITIAL_KEYWORDS,
  INITIAL_BOOKINGS,
  INITIAL_SUBMISSIONS,
  INITIAL_RENTALS,
  MetaAdCampaign,
  UnifiedLeadConversation,
  SeoIssue,
  BookingAppointment,
  FormSubmission,
  RentalListing,
} from './data/mockData'

export const App: React.FC = () => {
  // Profiles
  const [profiles, setProfiles] = useState<BusinessProfile[]>(BUSINESS_PROFILES)
  const [currentProfile, setCurrentProfile] = useState<BusinessProfile>(BUSINESS_PROFILES[0])

  // Navigation
  const [currentTab, setCurrentTab] = useState<NavTabId>('overview')

  // Autopilot Mode
  const [autopilotEnabled, setAutopilotEnabled] = useState(true)

  // Datasets
  const [ads, setAds] = useState<MetaAdCampaign[]>(INITIAL_ADS)
  const [leads, setLeads] = useState<UnifiedLeadConversation[]>(INITIAL_LEADS)
  const [seoIssues, setSeoIssues] = useState<SeoIssue[]>(INITIAL_SEO_ISSUES)
  const [keywords] = useState(INITIAL_KEYWORDS)
  const [bookings, setBookings] = useState<BookingAppointment[]>(INITIAL_BOOKINGS)
  const [submissions, setSubmissions] = useState<FormSubmission[]>(INITIAL_SUBMISSIONS)
  const [rentals, setRentals] = useState<RentalListing[]>(INITIAL_RENTALS)

  // Modals
  const [modulesModalOpen, setModulesModalOpen] = useState(false)
  const [quickScanModalOpen, setQuickScanModalOpen] = useState(false)

  // Handlers
  const handleSelectProfile = (profile: BusinessProfile) => {
    setCurrentProfile(profile)
    // If current tab is a disabled module for this profile, redirect to overview
    if (
      (currentTab === 'bookings' && !profile.activeModules.bookings) ||
      (currentTab === 'forms' && !profile.activeModules.forms) ||
      (currentTab === 'rentals' && !profile.activeModules.rentals)
    ) {
      setCurrentTab('overview')
    }
  }

  const handleToggleAutopilot = () => {
    setAutopilotEnabled(!autopilotEnabled)
  }

  const handleFixSeoIssue = (id: string) => {
    setSeoIssues((prev) =>
      prev.map((issue) => (issue.id === id ? { ...issue, fixed: true } : issue))
    )
  }

  const handleAddBooking = (appointment: BookingAppointment) => {
    setBookings((prev) => [appointment, ...prev])
  }

  const handleAddSubmission = (submission: FormSubmission) => {
    setSubmissions((prev) => [submission, ...prev])
  }

  const handleAddRental = (rental: RentalListing) => {
    setRentals((prev) => [rental, ...prev])
  }

  const handleToggleRentalStatus = (id: string) => {
    setRentals((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              availableStatus: r.availableStatus === 'Available Now' ? 'Reserved' : 'Available Now',
            }
          : r
      )
    )
  }

  const handleToggleProfileModule = (moduleKey: keyof BusinessProfile['activeModules']) => {
    const updatedModules = {
      ...currentProfile.activeModules,
      [moduleKey]: !currentProfile.activeModules[moduleKey],
    }

    const updatedProfile = {
      ...currentProfile,
      activeModules: updatedModules,
    }

    setCurrentProfile(updatedProfile)
    setProfiles((prev) =>
      prev.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
    )
  }

  const unreadLeadCount = leads.filter((l) => l.unread || l.status === 'Needs Reply').length

  return (
    <div className="min-h-screen bg-[#161c20] text-[#f1f5f9] flex flex-col font-sans relative selection:bg-[#46bd3b]/30 selection:text-white">
      {/* Background ambient orbs and grid overlay matching JelTech design */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#46bd3b]/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#46bd3b]/5 rounded-full blur-[160px]" />
      </div>

      {/* Top Navbar */}
      <Navbar
        currentProfile={currentProfile}
        onSelectProfile={handleSelectProfile}
        autopilotEnabled={autopilotEnabled}
        onToggleAutopilot={handleToggleAutopilot}
        onOpenQuickScan={() => setQuickScanModalOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            if (tab === 'modules') {
              setModulesModalOpen(true)
            } else {
              setCurrentTab(tab)
            }
          }}
          currentProfile={currentProfile}
          unreadLeadCount={unreadLeadCount}
        />

        {/* Dynamic Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {currentTab === 'overview' && (
            <DashboardOverview
              currentProfile={currentProfile}
              ads={ads}
              leads={leads}
              seoIssues={seoIssues}
              onNavigate={(tab) => setCurrentTab(tab)}
              onRunAudit={() => setCurrentTab('seo')}
              onAutoFixSeo={() => {}}
            />
          )}

          {currentTab === 'seo' && (
            <SeoIntelligence
              currentProfile={currentProfile}
              seoIssues={seoIssues}
              keywords={keywords}
              onFixIssue={handleFixSeoIssue}
            />
          )}

          {currentTab === 'ads' && (
            <SmartAdsManager
              currentProfile={currentProfile}
              ads={ads}
              onUpdateAds={setAds}
            />
          )}

          {currentTab === 'leads' && (
            <UnifiedLeadsInbox
              leads={leads}
              onUpdateLeads={setLeads}
            />
          )}

          {currentTab === 'bookings' && (
            <BookingSystem
              currentProfile={currentProfile}
              bookings={bookings}
              onAddBooking={handleAddBooking}
            />
          )}

          {currentTab === 'forms' && (
            <FormQuoteBuilder
              currentProfile={currentProfile}
              submissions={submissions}
              onAddSubmission={handleAddSubmission}
            />
          )}

          {currentTab === 'rentals' && (
            <RentalListingManager
              currentProfile={currentProfile}
              rentals={rentals}
              onAddRental={handleAddRental}
              onToggleStatus={handleToggleRentalStatus}
            />
          )}

          {currentTab === 'api' && (
            <DeveloperApiView currentProfile={currentProfile} />
          )}
        </main>
      </div>

      {/* Plug-and-Play Modules Configuration Modal */}
      <ModuleSettingsModal
        isOpen={modulesModalOpen}
        onClose={() => setModulesModalOpen(false)}
        currentProfile={currentProfile}
        onToggleModule={handleToggleProfileModule}
      />

      {/* Quick Growth Scan Modal */}
      <QuickScanModal
        isOpen={quickScanModalOpen}
        onClose={() => setQuickScanModalOpen(false)}
        currentProfile={currentProfile}
        onScanCompleted={() => {
          // Boost SEO score by marking one issue fixed
          const unfixed = seoIssues.find((i) => !i.fixed)
          if (unfixed) {
            handleFixSeoIssue(unfixed.id)
          }
        }}
      />
    </div>
  )
}

export default App
