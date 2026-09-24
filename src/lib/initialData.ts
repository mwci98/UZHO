import { Activity, UpcomingProgram, GalleryItem, Donation, TransparencyDocument, SiteSettings } from '../types';

export const initialSiteSettings: SiteSettings = {
  org_name: 'Uzho Cultural Society',
  tagline: 'Preserving Our Culture. Strengthening Our Community.',
  office_name: 'Uzho Cultural Society Central Secretariat',
  head_office: 'Rüziku, Pfutsero, Phek District, Nagaland, India – 797107',
  locality: 'Rüziku',
  town: 'Pfutsero',
  district: 'Phek District',
  state: 'Nagaland',
  pin_code: '797107',
  country: 'India',
  phone_primary: '+91 94360 77084',
  phone_secondary: '+91 98620 00000',
  email_primary: 'vezokho@yahoo.com',
  email_official: 'office@uzhocultural.org',
  office_hours: 'Monday – Friday: 9:30 AM – 4:30 PM | Saturday: 10:00 AM – 2:00 PM',
  upi_id: 'uzhocultural@upi',
  upi_payee_name: 'Uzho Cultural Society',
  facebook: 'https://facebook.com/uzhoculturalsociety',
  instagram: 'https://instagram.com/uzhoculturalsociety',
  youtube: 'https://youtube.com/@uzhoculturalsociety',
  twitter: '',
};

export const initialActivities: Activity[] = [
  {
    id: 'act-1',
    title: 'Community Heritage Preservation & Oral History Archive',
    slug: 'community-heritage-preservation-oral-history',
    description: 'Documenting regional folklore, historical lineage narratives, and indigenous environmental knowledge from community elders across Pfutsero sub-division.',
    content: `The Uzho Cultural Society convened an oral history recording initiative at Rüziku, Pfutsero. Recognizing the irreplaceable value of living history, our dedicated field volunteers recorded interviews with village elders and cultural custodians.

The session prioritized the documentation of traditional agricultural cycles, customary consensus practices, ancient folk chants, and place names in the surrounding hill communities.

Key Focus Areas:
• Audio and video documentation of oral folklore and folk ballads.
• Translation and transcription of historical genealogies.
• Archival compilation into digital repository for community researchers.

The society intends to publish an indexed compendium for regional schools and community libraries upon completion of verification.`,
    featured_image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
    ],
    date: '2026-08-14',
    location: 'Rüziku Community Hall, Pfutsero',
    category: 'Cultural Preservation',
    status: 'completed',
    featured: true,
    published: true,
    created_at: '2026-08-15T10:00:00Z',
  },
  {
    id: 'act-2',
    title: 'Youth Leadership & Traditional Skill Development Workshop',
    slug: 'youth-leadership-traditional-skill-workshop',
    description: 'Empowering young members with vocational knowledge, organizational leadership, and community stewardship skills.',
    content: `A three-day workshop conducted by Uzho Cultural Society bringing together over 80 youth representatives from surrounding villages of Phek District.

The workshop combined modern organizational project management with masterclass sessions in traditional bamboo craftsmanship, natural fiber processing, and community event facilitation.

Participants engaged in roundtables addressing sustainable local enterprise development and community mobilization.`,
    featured_image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80'
    ],
    date: '2026-06-22',
    location: 'Pfutsero Town Council Hall',
    category: 'Youth & Community Engagement',
    status: 'completed',
    featured: false,
    published: true,
    created_at: '2026-06-25T11:30:00Z',
  },
  {
    id: 'act-3',
    title: 'Highland Ecological Conservation & Spring Watershed Cleaning Drive',
    slug: 'highland-ecological-conservation-watershed-drive',
    description: 'Community volunteer drive to clear natural water springs and plant native high-altitude broadleaf saplings around Pfutsero ridges.',
    content: `Water security in mountainous settlements depends strictly on the health of perennial spring sources. In collaboration with local village councils, Uzho Cultural Society mobilized community volunteers for an extensive water spring rejuvenation effort.

Volunteers cleared accumulated debris from 14 ancestral spring wells, stabilized runoff channels with natural stonework, and planted native alder and oak saplings to prevent soil erosion along the upper catchment ridges.`,
    featured_image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80'
    ],
    date: '2026-04-18',
    location: 'Pfutsero Hill Ridges & Watersheds',
    category: 'Community Development',
    status: 'completed',
    featured: false,
    published: true,
    created_at: '2026-04-20T09:00:00Z',
  },
  {
    id: 'act-4',
    title: 'Inter-Generational Folk Music & Storytelling Seminar',
    slug: 'inter-generational-folk-music-storytelling-seminar',
    description: 'Fostering cultural transmission where experienced community elders perform classical folk vocal genres and teach younger generations.',
    content: `Held at Rüziku, this symposium gathered master folk vocalists to demonstrate vocal harmonies, ceremonial greetings, and situational chants traditionally sung during collective fieldwork and seasonal celebrations.

Participants documented the structural context of the lyrics, ensuring that both acoustic nuances and lyrical meanings are preserved accurately.`,
    featured_image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [],
    date: '2026-02-10',
    location: 'Uzho Society Centre, Rüziku',
    category: 'Cultural Preservation',
    status: 'completed',
    featured: false,
    published: true,
    created_at: '2026-02-12T14:15:00Z',
  }
];

export const initialPrograms: UpcomingProgram[] = [
  {
    id: 'prog-1',
    title: 'Annual General Assembly & Cultural Conference 2026',
    description: 'The convening of all registered members, village council representatives, and youth advisors to review society work, ratify annual resolutions, and present the annual stewardship audit.',
    date: '2026-11-14',
    location: 'Uzho Central Auditorium, Rüziku, Pfutsero',
    status: 'Upcoming',
    featured_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-09-01T08:00:00Z',
  },
  {
    id: 'prog-2',
    title: 'Phek District Indigenous Crafts Documentation Residency',
    description: 'Two-week residency program pairing regional artisans with digital archivists to create step-by-step documentation of endangered regional weaving techniques and wood carving methodologies.',
    date: '2026-12-05',
    location: 'Pfutsero Sub-Divisional Craft Centre',
    status: 'Planning',
    featured_image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-09-05T09:30:00Z',
  },
  {
    id: 'prog-3',
    title: 'Community Career Guidance & Civil Services Mentorship Camp',
    description: 'Intensive counseling and study strategy orientation led by local officers and professionals to mentor high school and collegiate students from rural areas.',
    date: '2027-01-18',
    location: 'Pfutsero College Seminar Hall',
    status: 'Upcoming',
    featured_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-09-10T12:00:00Z',
  },
  {
    id: 'prog-4',
    title: 'Terrace Farming Preservation & Soil Health Assessment Program',
    description: 'Ongoing technical collaboration with agrarian specialists to test indigenous hillside soil vitality and support cold-climate organic farming sustainability.',
    date: '2026-10-10',
    location: 'Rüziku Agricultural Terraces, Pfutsero',
    status: 'Ongoing',
    featured_image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-09-12T15:00:00Z',
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Community Assembly at Rüziku',
    caption: 'Society members and community elders gathering for consultation and mutual deliberation in Pfutsero.',
    category: 'Meetings',
    image_url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'landscape',
    order_num: 1,
    date: '2026-07-15',
    created_at: '2026-07-16T10:00:00Z',
  },
  {
    id: 'gal-2',
    title: 'Pfutsero Highland Ridge Vista',
    caption: 'The majestic mountain topography surrounding Pfutsero, the highest town in Nagaland at over 2,100 meters altitude.',
    category: 'Community Activities',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'landscape',
    order_num: 2,
    date: '2026-05-20',
    created_at: '2026-05-21T11:00:00Z',
  },
  {
    id: 'gal-3',
    title: 'Oral History Recording Session',
    caption: 'Documentation team conducting an interview with a respected village storyteller.',
    category: 'Cultural Events',
    image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    aspect_ratio: 'portrait',
    order_num: 3,
    date: '2026-08-14',
    created_at: '2026-08-15T10:00:00Z',
  },
  {
    id: 'gal-4',
    title: 'Youth Leadership Cohort',
    caption: 'Young participants collaborating during the community stewardship and planning workshop.',
    category: 'Programs',
    image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'landscape',
    order_num: 4,
    date: '2026-06-22',
    created_at: '2026-06-23T09:00:00Z',
  },
  {
    id: 'gal-5',
    title: 'Terraced Agricultural Landscape',
    caption: 'Historic agricultural terraces maintained through centuries of community cooperation.',
    category: 'Community Activities',
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    aspect_ratio: 'portrait',
    order_num: 5,
    date: '2026-04-18',
    created_at: '2026-04-19T08:30:00Z',
  },
  {
    id: 'gal-6',
    title: 'Executive Council Deliberations',
    caption: 'Quarterly review of administrative programs, community petitions, and financial statements.',
    category: 'Meetings',
    image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'landscape',
    order_num: 6,
    date: '2026-08-01',
    created_at: '2026-08-02T16:00:00Z',
  },
  {
    id: 'gal-7',
    title: 'Heritage Music Documentation',
    caption: 'Preserving customary folk vocal compositions for future generations.',
    category: 'Cultural Events',
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'square',
    order_num: 7,
    date: '2026-02-10',
    created_at: '2026-02-11T13:00:00Z',
  },
  {
    id: 'gal-8',
    title: 'Community Environmental Care',
    caption: 'Local volunteers clearing native water channels and spring wells in Pfutsero.',
    category: 'Community Activities',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    aspect_ratio: 'landscape',
    order_num: 8,
    date: '2026-04-19',
    created_at: '2026-04-20T10:15:00Z',
  }
];

export const initialDonations: Donation[] = [
  {
    id: 'don-1',
    donor_name: 'Vikuolie M.',
    mobile: '94360XXXXX',
    email: 'vikuolie.m@example.com',
    amount: 5000,
    utr: '422918402918',
    payment_status: 'verified',
    created_at: '2026-08-20T14:22:00Z',
    verified_at: '2026-08-21T09:10:00Z',
    notes: 'Contribution towards Oral History Archive equipment',
  },
  {
    id: 'don-2',
    donor_name: 'Khrienuo T.',
    mobile: '98620XXXXX',
    email: '',
    amount: 2500,
    utr: '423184918201',
    payment_status: 'verified',
    created_at: '2026-09-02T11:05:00Z',
    verified_at: '2026-09-03T10:00:00Z',
    notes: 'Youth leadership workshop sponsorship',
  },
  {
    id: 'don-3',
    donor_name: 'Tevetso K.',
    mobile: '97740XXXXX',
    email: 'tevetso@example.com',
    amount: 1000,
    utr: '423891029481',
    payment_status: 'pending',
    created_at: '2026-09-21T16:40:00Z',
    verified_at: null,
    notes: 'General contribution',
  }
];

export const initialDocuments: TransparencyDocument[] = [
  {
    id: 'doc-1',
    title: 'Annual Activity & Progress Report (2025–2026)',
    category: 'Annual Reports',
    file_url: '#',
    file_size: '2.4 MB PDF',
    year: '2025–2026',
    published_date: '2026-04-15',
    description: 'Comprehensive report covering cultural documentation drives, youth seminars, community infrastructure support, and resolutions ratified by the General Assembly.',
    downloads_count: 142,
  },
  {
    id: 'doc-2',
    title: 'Financial Summary & Audited Statement of Accounts (FY 2024–2025)',
    category: 'Financial Summaries',
    file_url: '#',
    file_size: '1.1 MB PDF',
    year: '2024–2025',
    published_date: '2025-07-20',
    description: 'Audited financial summary detailing public donations, program expenditures, administrative maintenance, and verified fund utilization certified by honorary auditors.',
    downloads_count: 98,
  },
  {
    id: 'doc-3',
    title: 'Oral Folklore Preservation Fieldwork Findings & Methodology',
    category: 'Activity Reports',
    file_url: '#',
    file_size: '3.8 MB PDF',
    year: '2026',
    published_date: '2026-08-30',
    description: 'Field report documenting qualitative interviews, recording protocols, ethical consent safeguards, and dialectical cataloging across Pfutsero area.',
    downloads_count: 67,
  },
  {
    id: 'doc-4',
    title: 'Constitution & By-Laws of Uzho Cultural Society',
    category: 'Official Documents',
    file_url: '#',
    file_size: '850 KB PDF',
    year: '2024 Revised',
    published_date: '2024-03-10',
    description: 'The foundational legal charter governing the society, detailing membership rights, organizational mandate, executive election guidelines, and non-profit ethics.',
    downloads_count: 215,
  }
];
