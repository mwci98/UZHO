export interface Activity {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featured_image: string;
  gallery_images?: string[];
  date: string;
  location: string;
  category: string;
  status: 'completed' | 'ongoing' | 'planned';
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at?: string;
}

export interface UpcomingProgram {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: 'Upcoming' | 'Planning' | 'Ongoing';
  featured_image?: string;
  published: boolean;
  created_at: string;
}

export type GalleryCategory = 'All' | 'Cultural Events' | 'Community Activities' | 'Programs' | 'Meetings';

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: 'Cultural Events' | 'Community Activities' | 'Programs' | 'Meetings';
  image_url: string;
  aspect_ratio?: 'landscape' | 'portrait' | 'square';
  order_num: number;
  date?: string;
  created_at: string;
}

export type PaymentStatus = 'pending' | 'verified' | 'rejected';

export interface Donation {
  id: string;
  donor_name: string;
  mobile: string;
  email?: string;
  amount: number;
  utr: string;
  payment_status: PaymentStatus;
  created_at: string;
  verified_at?: string | null;
  notes?: string;
}

export type DocumentCategory = 'Annual Reports' | 'Activity Reports' | 'Financial Summaries' | 'Official Documents';

export interface TransparencyDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  file_url: string;
  file_size: string;
  year: string;
  published_date: string;
  description: string;
  downloads_count?: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface SiteSettings {
  org_name: string;
  tagline: string;
  office_name: string;
  head_office: string;
  locality: string;
  town: string;
  district: string;
  state: string;
  pin_code: string;
  country: string;
  phone_primary: string;
  phone_secondary?: string;
  email_primary: string;
  email_official?: string;
  office_hours: string;
  upi_id: string;
  upi_payee_name: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
}
