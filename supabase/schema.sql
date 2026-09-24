-- ==============================================================================
-- UZHO CULTURAL SOCIETY - SUPABASE DATABASE MIGRATION & RLS POLICIES
-- Head Office: Rüziku, Pfutsero, Phek District, Nagaland, India – 797107
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  org_name TEXT NOT NULL DEFAULT 'Uzho Cultural Society',
  tagline TEXT NOT NULL DEFAULT 'Preserving Our Culture. Strengthening Our Community.',
  head_office TEXT NOT NULL DEFAULT 'Rüziku, Pfutsero, Phek District, Nagaland, India – 797107',
  phone_primary TEXT NOT NULL DEFAULT '+91 94360 00000',
  phone_secondary TEXT DEFAULT '+91 98620 00000',
  email_primary TEXT NOT NULL DEFAULT 'info@uzhocultural.org',
  office_hours TEXT NOT NULL DEFAULT 'Monday – Saturday: 9:00 AM – 4:00 PM IST',
  upi_id TEXT NOT NULL DEFAULT 'uzhocultural@upi',
  upi_payee_name TEXT NOT NULL DEFAULT 'Uzho Cultural Society',
  facebook TEXT DEFAULT 'https://facebook.com/uzhocultural',
  instagram TEXT DEFAULT 'https://instagram.com/uzhocultural',
  youtube TEXT DEFAULT 'https://youtube.com/@uzhocultural',
  twitter TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  date DATE NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. UPCOMING PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Planning', 'Ongoing')),
  featured_image TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Cultural Events', 'Community Activities', 'Programs', 'Meetings')),
  image_url TEXT NOT NULL,
  aspect_ratio TEXT DEFAULT 'landscape' CHECK (aspect_ratio IN ('landscape', 'portrait', 'square')),
  order_num INTEGER NOT NULL DEFAULT 0,
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. DONATIONS TABLE (Strictly private donor details with manual verification)
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  utr TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- 6. TRANSPARENCY DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Annual Reports', 'Activity Reports', 'Financial Summaries', 'Official Documents')),
  file_url TEXT NOT NULL,
  file_size TEXT NOT NULL,
  year TEXT NOT NULL,
  published_date DATE NOT NULL,
  description TEXT NOT NULL,
  downloads_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. CONTACT MESSAGES TABLE (Inbox)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- SITE SETTINGS
CREATE POLICY "Allow public read site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated admin manage site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (true);

-- ACTIVITIES
CREATE POLICY "Allow public read published activities"
  ON public.activities FOR SELECT
  USING (published = true);

CREATE POLICY "Allow authenticated admin all activities"
  ON public.activities FOR ALL
  TO authenticated
  USING (true);

-- PROGRAMS
CREATE POLICY "Allow public read published programs"
  ON public.programs FOR SELECT
  USING (published = true);

CREATE POLICY "Allow authenticated admin all programs"
  ON public.programs FOR ALL
  TO authenticated
  USING (true);

-- GALLERY
CREATE POLICY "Allow public read gallery"
  ON public.gallery FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated admin all gallery"
  ON public.gallery FOR ALL
  TO authenticated
  USING (true);

-- DONATIONS
-- CRITICAL: Public users can only INSERT donations. They CANNOT view donation lists or totals!
CREATE POLICY "Allow public insert donation"
  ON public.donations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated admin manage donations"
  ON public.donations FOR ALL
  TO authenticated
  USING (true);

-- DOCUMENTS (TRANSPARENCY)
CREATE POLICY "Allow public read transparency documents"
  ON public.documents FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated admin manage documents"
  ON public.documents FOR ALL
  TO authenticated
  USING (true);

-- CONTACT MESSAGES
-- Public can only insert contact messages. They cannot view other messages.
CREATE POLICY "Allow public insert contact message"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated admin manage contact messages"
  ON public.contact_messages FOR ALL
  TO authenticated
  USING (true);
