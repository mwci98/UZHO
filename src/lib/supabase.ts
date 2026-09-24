import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  Activity,
  UpcomingProgram,
  GalleryItem,
  Donation,
  TransparencyDocument,
  ContactMessage,
  SiteSettings,
  PaymentStatus,
} from '../types';
import {
  initialSiteSettings,
  initialActivities,
  initialPrograms,
  initialGallery,
  initialDonations,
  initialDocuments,
} from './initialData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Helper keys for LocalStorage persistence
const STORAGE_KEYS = {
  SETTINGS: 'uzho_settings_v1',
  ACTIVITIES: 'uzho_activities_v1',
  PROGRAMS: 'uzho_programs_v1',
  GALLERY: 'uzho_gallery_v1',
  DONATIONS: 'uzho_donations_v1',
  DOCUMENTS: 'uzho_documents_v1',
  MESSAGES: 'uzho_messages_v1',
  ADMIN_SESSION: 'uzho_admin_session_v1',
};

function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error writing ${key} to storage:`, e);
  }
}

// ==================== SITE SETTINGS ====================
export async function getSiteSettings(): Promise<SiteSettings> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (!error && data) {
        return {
          ...initialSiteSettings,
          ...data,
        };
      }
    } catch (err) {
      console.warn('Falling back to local storage for site_settings', err);
    }
  }
  return getStored<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated: SiteSettings = { ...current, ...settings };

  if (supabase) {
    try {
      await supabase.from('site_settings').upsert({ id: 'current', ...updated });
    } catch (e) {
      console.warn('Could not update Supabase site_settings directly:', e);
    }
  }
  setStored(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

// ==================== ACTIVITIES ====================
export async function getActivities(onlyPublished = true): Promise<Activity[]> {
  if (supabase) {
    try {
      let query = supabase.from('activities').select('*').order('date', { ascending: false });
      if (onlyPublished) {
        query = query.eq('published', true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Activity[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed for activities, using local:', err);
    }
  }

  const list = getStored<Activity[]>(STORAGE_KEYS.ACTIVITIES, initialActivities);
  if (onlyPublished) {
    return list.filter((a) => a.published);
  }
  return list;
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const list = await getActivities(false);
  return list.find((a) => a.slug === slug) || null;
}

export async function saveActivity(activity: Activity): Promise<Activity> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('activities').upsert(activity).select().single();
      if (!error && data) {
        // also sync local
        const local = getStored<Activity[]>(STORAGE_KEYS.ACTIVITIES, initialActivities);
        const idx = local.findIndex((a) => a.id === activity.id);
        if (idx >= 0) local[idx] = data as Activity;
        else local.unshift(data as Activity);
        setStored(STORAGE_KEYS.ACTIVITIES, local);
        return data as Activity;
      }
    } catch (e) {
      console.warn('Supabase saveActivity fallback to local:', e);
    }
  }

  const local = getStored<Activity[]>(STORAGE_KEYS.ACTIVITIES, initialActivities);
  const idx = local.findIndex((a) => a.id === activity.id);
  if (idx >= 0) {
    local[idx] = { ...activity, updated_at: new Date().toISOString() };
  } else {
    local.unshift(activity);
  }
  setStored(STORAGE_KEYS.ACTIVITIES, local);
  return activity;
}

export async function deleteActivity(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('activities').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteActivity failed:', e);
    }
  }
  const local = getStored<Activity[]>(STORAGE_KEYS.ACTIVITIES, initialActivities);
  const filtered = local.filter((a) => a.id !== id);
  setStored(STORAGE_KEYS.ACTIVITIES, filtered);
  return true;
}

// ==================== UPCOMING PROGRAMS ====================
export async function getPrograms(onlyPublished = true): Promise<UpcomingProgram[]> {
  if (supabase) {
    try {
      let query = supabase.from('programs').select('*').order('date', { ascending: true });
      if (onlyPublished) {
        query = query.eq('published', true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as UpcomingProgram[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed for programs, using local:', err);
    }
  }

  const list = getStored<UpcomingProgram[]>(STORAGE_KEYS.PROGRAMS, initialPrograms);
  if (onlyPublished) {
    return list.filter((p) => p.published);
  }
  return list;
}

export async function saveProgram(program: UpcomingProgram): Promise<UpcomingProgram> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('programs').upsert(program).select().single();
      if (!error && data) {
        const local = getStored<UpcomingProgram[]>(STORAGE_KEYS.PROGRAMS, initialPrograms);
        const idx = local.findIndex((p) => p.id === program.id);
        if (idx >= 0) local[idx] = data as UpcomingProgram;
        else local.unshift(data as UpcomingProgram);
        setStored(STORAGE_KEYS.PROGRAMS, local);
        return data as UpcomingProgram;
      }
    } catch (e) {
      console.warn('Supabase saveProgram error:', e);
    }
  }

  const local = getStored<UpcomingProgram[]>(STORAGE_KEYS.PROGRAMS, initialPrograms);
  const idx = local.findIndex((p) => p.id === program.id);
  if (idx >= 0) {
    local[idx] = program;
  } else {
    local.unshift(program);
  }
  setStored(STORAGE_KEYS.PROGRAMS, local);
  return program;
}

export async function deleteProgram(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('programs').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteProgram error:', e);
    }
  }
  const local = getStored<UpcomingProgram[]>(STORAGE_KEYS.PROGRAMS, initialPrograms);
  const filtered = local.filter((p) => p.id !== id);
  setStored(STORAGE_KEYS.PROGRAMS, filtered);
  return true;
}

// ==================== GALLERY ====================
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('order_num', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as GalleryItem[];
      }
    } catch (err) {
      console.warn('Supabase gallery fetch failed, using local:', err);
    }
  }
  return getStored<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
}

export async function saveGalleryItem(item: GalleryItem): Promise<GalleryItem> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('gallery').upsert(item).select().single();
      if (!error && data) {
        const local = getStored<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
        const idx = local.findIndex((g) => g.id === item.id);
        if (idx >= 0) local[idx] = data as GalleryItem;
        else local.unshift(data as GalleryItem);
        setStored(STORAGE_KEYS.GALLERY, local);
        return data as GalleryItem;
      }
    } catch (e) {
      console.warn('Supabase saveGalleryItem error:', e);
    }
  }

  const local = getStored<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
  const idx = local.findIndex((g) => g.id === item.id);
  if (idx >= 0) {
    local[idx] = item;
  } else {
    local.unshift(item);
  }
  setStored(STORAGE_KEYS.GALLERY, local);
  return item;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('gallery').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteGalleryItem error:', e);
    }
  }
  const local = getStored<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
  const filtered = local.filter((g) => g.id !== id);
  setStored(STORAGE_KEYS.GALLERY, filtered);
  return true;
}

// ==================== DONATIONS ====================
// Public submission: returns the donation object with default status 'pending'
export async function submitDonation(donationData: {
  donor_name: string;
  mobile: string;
  email?: string;
  amount: number;
  utr: string;
  notes?: string;
}): Promise<Donation> {
  const newDonation: Donation = {
    id: 'don-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    donor_name: donationData.donor_name.trim(),
    mobile: donationData.mobile.trim(),
    email: donationData.email?.trim() || '',
    amount: Number(donationData.amount),
    utr: donationData.utr.trim().toUpperCase(),
    payment_status: 'pending',
    created_at: new Date().toISOString(),
    verified_at: null,
    notes: donationData.notes || '',
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .insert({
          donor_name: newDonation.donor_name,
          mobile: newDonation.mobile,
          email: newDonation.email,
          amount: newDonation.amount,
          utr: newDonation.utr,
          payment_status: newDonation.payment_status,
          notes: newDonation.notes,
        })
        .select()
        .single();
      if (!error && data) {
        newDonation.id = data.id;
      }
    } catch (e) {
      console.warn('Supabase donation insert fallback to local storage:', e);
    }
  }

  const donations = getStored<Donation[]>(STORAGE_KEYS.DONATIONS, initialDonations);
  donations.unshift(newDonation);
  setStored(STORAGE_KEYS.DONATIONS, donations);
  return newDonation;
}

// Admin only: Get full donation history
export async function getDonations(): Promise<Donation[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data as Donation[];
      }
    } catch (err) {
      console.warn('Supabase donation fetch error, using local:', err);
    }
  }
  return getStored<Donation[]>(STORAGE_KEYS.DONATIONS, initialDonations);
}

// Admin only: Mark status verified or pending
export async function updateDonationStatus(id: string, status: PaymentStatus): Promise<boolean> {
  const verified_at = status === 'verified' ? new Date().toISOString() : null;

  if (supabase) {
    try {
      await supabase
        .from('donations')
        .update({ payment_status: status, verified_at })
        .eq('id', id);
    } catch (e) {
      console.warn('Supabase update donation error:', e);
    }
  }

  const donations = getStored<Donation[]>(STORAGE_KEYS.DONATIONS, initialDonations);
  const item = donations.find((d) => d.id === id);
  if (item) {
    item.payment_status = status;
    item.verified_at = verified_at;
    setStored(STORAGE_KEYS.DONATIONS, donations);
    return true;
  }
  return false;
}

// ==================== TRANSPARENCY DOCUMENTS ====================
export async function getDocuments(): Promise<TransparencyDocument[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('published_date', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as TransparencyDocument[];
      }
    } catch (err) {
      console.warn('Supabase documents error, using local:', err);
    }
  }
  return getStored<TransparencyDocument[]>(STORAGE_KEYS.DOCUMENTS, initialDocuments);
}

export async function saveDocument(doc: TransparencyDocument): Promise<TransparencyDocument> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('documents').upsert(doc).select().single();
      if (!error && data) {
        const local = getStored<TransparencyDocument[]>(STORAGE_KEYS.DOCUMENTS, initialDocuments);
        const idx = local.findIndex((d) => d.id === doc.id);
        if (idx >= 0) local[idx] = data as TransparencyDocument;
        else local.unshift(data as TransparencyDocument);
        setStored(STORAGE_KEYS.DOCUMENTS, local);
        return data as TransparencyDocument;
      }
    } catch (e) {
      console.warn('Supabase saveDocument error:', e);
    }
  }

  const local = getStored<TransparencyDocument[]>(STORAGE_KEYS.DOCUMENTS, initialDocuments);
  const idx = local.findIndex((d) => d.id === doc.id);
  if (idx >= 0) {
    local[idx] = doc;
  } else {
    local.unshift(doc);
  }
  setStored(STORAGE_KEYS.DOCUMENTS, local);
  return doc;
}

export async function deleteDocument(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('documents').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteDocument error:', e);
    }
  }
  const local = getStored<TransparencyDocument[]>(STORAGE_KEYS.DOCUMENTS, initialDocuments);
  const filtered = local.filter((d) => d.id !== id);
  setStored(STORAGE_KEYS.DOCUMENTS, filtered);
  return true;
}

// ==================== CONTACT MESSAGES ====================
export async function submitContactMessage(messageData: {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    id: 'msg-' + Date.now(),
    name: messageData.name.trim(),
    phone: messageData.phone.trim(),
    email: messageData.email.trim(),
    subject: messageData.subject.trim(),
    message: messageData.message.trim(),
    status: 'unread',
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      await supabase.from('contact_messages').insert({
        name: newMsg.name,
        phone: newMsg.phone,
        email: newMsg.email,
        subject: newMsg.subject,
        message: newMsg.message,
        status: newMsg.status,
      });
    } catch (e) {
      console.warn('Supabase contact_messages fallback:', e);
    }
  }

  const messages = getStored<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
  messages.unshift(newMsg);
  setStored(STORAGE_KEYS.MESSAGES, messages);
  return newMsg;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data as ContactMessage[];
      }
    } catch (err) {
      console.warn('Supabase contact messages error:', err);
    }
  }
  return getStored<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
}

export async function updateMessageStatus(id: string, status: 'unread' | 'read' | 'replied'): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('contact_messages').update({ status }).eq('id', id);
    } catch (e) {
      console.warn('Supabase updateMessageStatus error:', e);
    }
  }

  const messages = getStored<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.status = status;
    setStored(STORAGE_KEYS.MESSAGES, messages);
    return true;
  }
  return false;
}

// ==================== AUTHENTICATION (ADMIN) ====================
export interface AdminUser {
  email: string;
  role: 'admin' | 'superadmin';
  name: string;
  authenticated_at: string;
}

export async function loginAdmin(email: string, password: string): Promise<{ user: AdminUser | null; error?: string }> {
  // If real Supabase auth is available:
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // If Supabase credentials rejected or not initialized in Auth, try fallback
        console.warn('Supabase auth failed:', error.message);
      } else if (data.user) {
        const adminUser: AdminUser = {
          email: data.user.email || email,
          role: 'admin',
          name: data.user.user_metadata?.full_name || 'Society Administrator',
          authenticated_at: new Date().toISOString(),
        };
        setStored(STORAGE_KEYS.ADMIN_SESSION, adminUser);
        return { user: adminUser };
      }
    } catch (e) {
      console.warn('Supabase login exception:', e);
    }
  }

  // Fallback demo/admin credentials for instant access:
  const normalizedEmail = email.trim().toLowerCase();
  if (
    (normalizedEmail === 'admin@uzhocultural.org' || normalizedEmail === 'admin') &&
    password === 'admin123'
  ) {
    const adminUser: AdminUser = {
      email: 'admin@uzhocultural.org',
      role: 'admin',
      name: 'Uzho Central Secretariat Admin',
      authenticated_at: new Date().toISOString(),
    };
    setStored(STORAGE_KEYS.ADMIN_SESSION, adminUser);
    return { user: adminUser };
  }

  return { user: null, error: 'Invalid administrator email or password. (Demo: admin@uzhocultural.org / admin123)' };
}

export async function logoutAdmin(): Promise<void> {
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signout failed:', e);
    }
  }
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
}

export function getCurrentAdmin(): AdminUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
