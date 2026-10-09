export interface BusinessProfile {
  id: string
  name: string
  category: string
  tagline: string
  website: string
  phone: string
  avatar: string
  activeModules: {
    seo: boolean
    ads: boolean
    leads: boolean
    bookings: boolean
    forms: boolean
    rentals: boolean
  }
}

export const BUSINESS_PROFILES: BusinessProfile[] = [
  {
    id: 'paul-movers',
    name: 'Paul Movers Auckland',
    category: 'Logistics & Moving Services',
    tagline: 'Auckland Premier Residential & Commercial Relocation',
    website: 'https://paulmovers.co.nz',
    phone: '+64 9 887 6543',
    avatar: '🚚',
    activeModules: {
      seo: true,
      ads: true,
      leads: true,
      bookings: false,
      forms: true,
      rentals: false,
    },
  },
  {
    id: 'bella-chic',
    name: 'Bella Chic Salon & Spa',
    category: 'Hair, Aesthetics & Wellness',
    tagline: 'Boutique Hair Styling, Balayage & Organic Treatments',
    website: 'https://bellachicsalon.com',
    phone: '+1 415 555 0192',
    avatar: '💇‍♀️',
    activeModules: {
      seo: true,
      ads: true,
      leads: true,
      bookings: true,
      forms: false,
      rentals: false,
    },
  },
  {
    id: 'luxe-stays',
    name: 'Apex Luxury Fleet & Villas',
    category: 'Exotic Car & Villa Rentals',
    tagline: 'Chauffeured Exotics & Waterfront Coastal Properties',
    website: 'https://apexluxerentals.io',
    phone: '+44 20 7946 0912',
    avatar: '🏎️',
    activeModules: {
      seo: true,
      ads: true,
      leads: true,
      bookings: false,
      forms: true,
      rentals: true,
    },
  },
]

export interface SeoIssue {
  id: string
  title: string
  category: 'Technical' | 'Content' | 'Authority'
  impact: 'High' | 'Medium' | 'Low'
  scoreImpact: number
  description: string
  fixed: boolean
  aiSolution: string
  snippetCode?: string
}

export const INITIAL_SEO_ISSUES: SeoIssue[] = [
  {
    id: 'seo-1',
    title: 'Missing OpenGraph & Meta Description on High-Traffic Service Pages',
    category: 'Technical',
    impact: 'High',
    scoreImpact: 8,
    description: '3 primary landing pages lack meta descriptions and social preview tags, causing reduced search CTR by 24%.',
    fixed: false,
    aiSolution: 'GrowthPilot AI has synthesized high-converting meta descriptions with localized intent keywords.',
    snippetCode: `<meta name="description" content="Affordable & reliable commercial & residential furniture moving across Auckland. Instant online quotes with Paul Movers." />\n<meta property="og:title" content="Auckland Professional Moving & Packing | Paul Movers" />\n<meta property="og:type" content="business.business" />`,
  },
  {
    id: 'seo-2',
    title: 'Content Gap: Zero Topical Coverage for "Eco-Friendly Packing Boxes"',
    category: 'Content',
    impact: 'High',
    scoreImpact: 12,
    description: 'Search volume for sustainable moving & packaging surged +180% this quarter in your target area.',
    fixed: false,
    aiSolution: 'Generate an AI long-form authority pillar article (1,450 words) targeting 4 primary regional search queries.',
  },
  {
    id: 'seo-3',
    title: 'Unoptimized Image Assets without Alt Text & Modern WebP Format',
    category: 'Technical',
    impact: 'Medium',
    scoreImpact: 5,
    description: '8 high-resolution gallery images are served in uncompressed PNG format, slowing mobile LCP to 3.8s.',
    fixed: true,
    aiSolution: 'Compressed and converted via Cloudflare image edge caching.',
  },
  {
    id: 'seo-4',
    title: 'Unclaimed Google Local Service Schema Markup',
    category: 'Authority',
    impact: 'Medium',
    scoreImpact: 6,
    description: 'Schema.org JSON-LD structured data is missing from the footer, preventing Google Map Pack rich snippets.',
    fixed: false,
    aiSolution: 'Inject JSON-LD LocalBusiness Schema containing verified operating hours, address, geo-coordinates and review aggregate.',
    snippetCode: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "MovingCompany",\n  "name": "Paul Movers",\n  "telephone": "+64-9-887-6543",\n  "areaServed": "Auckland Region, New Zealand"\n}\n</script>`,
  },
]

export interface KeywordItem {
  keyword: string
  intent: 'Transactional' | 'Commercial' | 'Informational'
  volume: string
  difficulty: number // 1-100
  cpc: string
  currentRank: number | string
  potentialTraffic: string
}

export const INITIAL_KEYWORDS: KeywordItem[] = [
  { keyword: 'cheap furniture movers auckland', intent: 'Transactional', volume: '3,800/mo', difficulty: 38, cpc: '$3.45', currentRank: 4, potentialTraffic: '+920 visits' },
  { keyword: 'office relocation services north shore', intent: 'Commercial', volume: '1,450/mo', difficulty: 29, cpc: '$4.80', currentRank: 2, potentialTraffic: '+610 visits' },
  { keyword: 'intercity piano moving specialist nz', intent: 'Commercial', volume: '980/mo', difficulty: 22, cpc: '$5.10', currentRank: 7, potentialTraffic: '+380 visits' },
  { keyword: 'how to pack fragile items checklist', intent: 'Informational', volume: '6,200/mo', difficulty: 45, cpc: '$1.20', currentRank: 'Unranked', potentialTraffic: '+1,800 visits' },
  { keyword: 'emergency weekend movers auckland cbd', intent: 'Transactional', volume: '1,100/mo', difficulty: 31, cpc: '$6.20', currentRank: 3, potentialTraffic: '+490 visits' },
]

export interface MetaAdCampaign {
  id: string
  name: string
  channel: 'Instagram & Facebook' | 'Instagram Stories/Reels' | 'Facebook Feed'
  objective: 'Sales' | 'Lead Generation' | 'Inquiries'
  status: 'ACTIVE_OPTIMIZING' | 'BOOSTED_BY_AI' | 'PAUSED_LOW_ROAS' | 'LEARNING'
  dailyBudget: number
  totalSpent: number
  revenue: number
  roas: number
  salesCount: number
  hookScore: number
  visualStoppingPower: number
  creativeType: 'Video Reel' | 'Carousel' | 'Single Image'
  creativePreview: string
  headline: string
  aiActionNote: string
}

export const INITIAL_ADS: MetaAdCampaign[] = [
  {
    id: 'ad-01',
    name: 'Weekend Stress-Free Move Campaign [Variation A]',
    channel: 'Instagram Stories/Reels',
    objective: 'Sales',
    status: 'BOOSTED_BY_AI',
    dailyBudget: 45,
    totalSpent: 420,
    revenue: 2350,
    roas: 5.6,
    salesCount: 19,
    hookScore: 8.8,
    visualStoppingPower: 9.1,
    creativeType: 'Video Reel',
    creativePreview: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    headline: 'Moving this weekend? Relax. We pack, lift & deliver in 3 hours flat.',
    aiActionNote: 'Auto-Optimized: ROAS surpassed 5.0x threshold. Budget automatically raised by +25% at 04:00 AM.',
  },
  {
    id: 'ad-02',
    name: 'Auckland CBD Commercial Relocations - B2B Retargeting',
    channel: 'Instagram & Facebook',
    objective: 'Lead Generation',
    status: 'ACTIVE_OPTIMIZING',
    dailyBudget: 35,
    totalSpent: 280,
    revenue: 1190,
    roas: 4.25,
    salesCount: 11,
    hookScore: 7.9,
    visualStoppingPower: 8.4,
    creativeType: 'Carousel',
    creativePreview: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    headline: 'Zero-downtime office moving across Auckland. Get your instant quote in 60s.',
    aiActionNote: 'Audience refined: Re-targeted LinkedIn company decision makers aged 28-54 within 25km radius.',
  },
  {
    id: 'ad-03',
    name: 'Generic Packing Boxes Discount [Underperforming Test]',
    channel: 'Facebook Feed',
    objective: 'Sales',
    status: 'PAUSED_LOW_ROAS',
    dailyBudget: 20,
    totalSpent: 110,
    revenue: 95,
    roas: 0.86,
    salesCount: 2,
    hookScore: 3.4,
    visualStoppingPower: 4.2,
    creativeType: 'Single Image',
    creativePreview: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
    headline: 'Cheap cardboard boxes available for pickup in store.',
    aiActionNote: 'Auto-Paused: ROAS (0.86x) failed minimum viability target. Budget preserved & redirected to Winner Ad #01.',
  },
  {
    id: 'ad-04',
    name: 'AI Lookalike 2% Expansion - High Value Movers',
    channel: 'Instagram Stories/Reels',
    objective: 'Inquiries',
    status: 'ACTIVE_OPTIMIZING',
    dailyBudget: 30,
    totalSpent: 180,
    revenue: 720,
    roas: 4.0,
    salesCount: 7,
    hookScore: 8.2,
    visualStoppingPower: 8.0,
    creativeType: 'Video Reel',
    creativePreview: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
    headline: 'The 5 Things You Should Never Pack Yourself (And How We Handle Them)',
    aiActionNote: 'Auto-Scaling candidate: CTR increased by +42% after AI re-cut the first 3 seconds with a pattern interrupt.',
  },
]

export interface LeadMessage {
  id: string
  sender: 'customer' | 'business' | 'ai_pilot'
  text: string
  timestamp: string
}

export interface UnifiedLeadConversation {
  id: string
  contactName: string
  contactPhoneOrHandle: string
  channel: 'WhatsApp' | 'Instagram' | 'Facebook'
  avatarColor: string
  adSource: string
  estimatedValue: string
  status: 'Needs Reply' | 'AI Responded' | 'Quoted' | 'Booked' | 'Closed'
  lastMessageSnippet: string
  lastMessageTime: string
  unread: boolean
  messages: LeadMessage[]
}

export const INITIAL_LEADS: UnifiedLeadConversation[] = [
  {
    id: 'lead-1',
    contactName: 'Chloe Henderson',
    contactPhoneOrHandle: '@chloe.henderson_nz',
    channel: 'Instagram',
    avatarColor: 'bg-gradient-to-tr from-amber-500 to-pink-500',
    adSource: 'Meta Ad: Weekend Stress-Free Move (Reel)',
    estimatedValue: '$850 NZD',
    status: 'Needs Reply',
    lastMessageSnippet: 'Hi! Can you do a 2-bedroom move from Ponsonby to Takapuna this Saturday morning?',
    lastMessageTime: '12m ago',
    unread: true,
    messages: [
      { id: 'm1', sender: 'customer', text: 'Hey there! Saw your Instagram reel about 3-hour packing moves.', timestamp: '10:41 AM' },
      { id: 'm2', sender: 'customer', text: 'Hi! Can you do a 2-bedroom move from Ponsonby to Takapuna this Saturday morning?', timestamp: '10:42 AM' },
    ],
  },
  {
    id: 'lead-2',
    contactName: 'Marcus Sterling',
    contactPhoneOrHandle: '+64 21 890 1243',
    channel: 'WhatsApp',
    avatarColor: 'bg-emerald-600',
    adSource: 'Google Search Organic (Keyword: Commercial Relocation)',
    estimatedValue: '$3,200 NZD',
    status: 'AI Responded',
    lastMessageSnippet: 'AI Pilot: Sent our commercial rate card and 3-step intake form.',
    lastMessageTime: '34m ago',
    unread: false,
    messages: [
      { id: 'm1', sender: 'customer', text: 'Good morning, we have a 14-desk tech office moving to Wynyard Quarter by end of the month. Can you do after-hours moving?', timestamp: '09:15 AM' },
      { id: 'm2', sender: 'ai_pilot', text: 'Kia ora Marcus! Yes, we specialize in zero-downtime evening and weekend corporate moves. I have prepared our commercial onboarding form for you here: https://paulmovers.co.nz/corporate-quote', timestamp: '09:16 AM' },
      { id: 'm3', sender: 'customer', text: 'Brilliant, just filled in the desk count and elevator specs.', timestamp: '09:28 AM' },
    ],
  },
  {
    id: 'lead-3',
    contactName: 'David & Emily Zhang',
    contactPhoneOrHandle: 'David Zhang (FB Messenger)',
    channel: 'Facebook',
    avatarColor: 'bg-blue-600',
    adSource: 'Meta Ad: AI Lookalike 2% Expansion',
    estimatedValue: '$1,400 NZD',
    status: 'Quoted',
    lastMessageSnippet: 'David: Quote #1049 approved! How do we lock in the deposit?',
    lastMessageTime: '2h ago',
    unread: false,
    messages: [
      { id: 'm1', sender: 'customer', text: 'Hi Paul Movers, wondering if you provide full packing boxes and wrapping for antique wood furniture?', timestamp: 'Yesterday' },
      { id: 'm2', sender: 'business', text: 'Hello David! Absolutely, our white-glove team brings heavy-duty felt blankets, wardrobe boxes, and custom crating for delicate items.', timestamp: 'Yesterday' },
      { id: 'm3', sender: 'customer', text: 'Quote #1049 approved! How do we lock in the deposit?', timestamp: '8:15 AM' },
    ],
  },
  {
    id: 'lead-4',
    contactName: 'Sophie Vance',
    contactPhoneOrHandle: '@sophie.vance_design',
    channel: 'Instagram',
    avatarColor: 'bg-purple-600',
    adSource: 'Organic Profile Visit',
    estimatedValue: '$620 NZD',
    status: 'Booked',
    lastMessageSnippet: 'AI Pilot: Booking confirmed for Friday Oct 16th, 9:00 AM.',
    lastMessageTime: '4h ago',
    unread: false,
    messages: [
      { id: 'm1', sender: 'customer', text: 'Booking for 1-bedroom apartment move from Epsom.', timestamp: 'Oct 8' },
      { id: 'm2', sender: 'ai_pilot', text: 'Booking confirmed for Friday Oct 16th, 9:00 AM. 2 Movers + 5-tonne tail-lift truck reserved.', timestamp: 'Oct 8' },
    ],
  },
]

export interface BookingAppointment {
  id: string
  clientName: string
  serviceName: string
  staffMember: string
  date: string
  time: string
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'
  price: string
  clientEmail: string
  clientPhone: string
}

export const INITIAL_BOOKINGS: BookingAppointment[] = [
  { id: 'b-1', clientName: 'Jessica Taylor', serviceName: 'Signature Balayage & Blowdry', staffMember: 'Sarah Jenkins', date: 'Tomorrow', time: '10:00 AM', status: 'Confirmed', price: '$220', clientEmail: 'jess.t@example.com', clientPhone: '+1 415 889 2011' },
  { id: 'b-2', clientName: 'Liam O’Connor', serviceName: 'Precision Fade & Hot Towel Shave', staffMember: 'Marco Rossi', date: 'Tomorrow', time: '11:30 AM', status: 'Confirmed', price: '$65', clientEmail: 'liam.oc@example.com', clientPhone: '+1 415 721 9904' },
  { id: 'b-3', clientName: 'Amara Patel', serviceName: 'Hydra-Gloss Treatment + Style', staffMember: 'Sarah Jenkins', date: 'Oct 11', time: '2:15 PM', status: 'Pending', price: '$145', clientEmail: 'amara.p@example.com', clientPhone: '+1 415 632 1087' },
  { id: 'b-4', clientName: 'Elena Rostova', serviceName: 'Full Color Correction & Restructure', staffMember: 'Sarah Jenkins', date: 'Oct 12', time: '1:00 PM', status: 'Confirmed', price: '$310', clientEmail: 'elena.r@example.com', clientPhone: '+1 415 409 3320' },
]

export interface FormSubmission {
  id: string
  formName: string
  submittedAt: string
  customerName: string
  customerEmail: string
  detailsSummary: string
  estimatedQuote: string
  status: 'Pending Review' | 'Quote Sent' | 'Accepted'
}

export const INITIAL_SUBMISSIONS: FormSubmission[] = [
  { id: 'sub-101', formName: 'Instant Move & Relocation Estimator', submittedAt: '18 mins ago', customerName: 'Cameron Bell', customerEmail: 'cameron.bell@gmail.com', detailsSummary: '3-Bed House (Remuera -> Mount Eden) · 2 flights of stairs · Needs packing boxes', estimatedQuote: '$1,150 NZD', status: 'Pending Review' },
  { id: 'sub-102', formName: 'Instant Move & Relocation Estimator', submittedAt: '1 hour ago', customerName: 'Fiona MacLean', customerEmail: 'fiona.m@outlook.co.nz', detailsSummary: 'Studio Apartment · Heavy oak dining table · Ground floor access', estimatedQuote: '$480 NZD', status: 'Quote Sent' },
  { id: 'sub-103', formName: 'Corporate Office Assessment', submittedAt: 'Yesterday', customerName: 'TechVanguard NZ', customerEmail: 'admin@techvanguard.nz', detailsSummary: '22 Desks · 3 Server Racks · Saturday overnight window', estimatedQuote: '$4,200 NZD', status: 'Accepted' },
]

export interface RentalListing {
  id: string
  title: string
  category: 'Supercar' | 'Luxury SUV' | 'Seaside Villa' | 'Penthouse'
  ratePerDay: string
  availableStatus: 'Available Now' | 'Reserved' | 'Maintenance'
  image: string
  specs: string
  upcomingBookingsCount: number
}

export const INITIAL_RENTALS: RentalListing[] = [
  { id: 'r-1', title: '2024 Porsche 911 GT3 RS (Guards Red)', category: 'Supercar', ratePerDay: '$1,200/day', availableStatus: 'Available Now', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop&q=80', specs: '518 HP · PDK · Track Telemetry · Carbon Ceramic', upcomingBookingsCount: 3 },
  { id: 'r-2', title: 'Cliffside Panorama Villa - Piha Beach', category: 'Seaside Villa', ratePerDay: '$950/night', availableStatus: 'Reserved', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80', specs: '4 Suites · Infinity Pool · Private Chef Option · Heli-pad', upcomingBookingsCount: 7 },
  { id: 'r-3', title: 'Mercedes-Benz G63 AMG (Night Edition)', category: 'Luxury SUV', ratePerDay: '$780/day', availableStatus: 'Available Now', image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=600&auto=format&fit=crop&q=80', specs: '577 HP Twin Turbo · Burmester 3D · Privacy Glass', upcomingBookingsCount: 2 },
  { id: 'r-4', title: 'Metropolis Sky Penthouse - Harbour View', category: 'Penthouse', ratePerDay: '$1,400/night', availableStatus: 'Available Now', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80', specs: '360° Skyline Views · Rooftop Jacuzzi · Concierge Service', upcomingBookingsCount: 4 },
]
