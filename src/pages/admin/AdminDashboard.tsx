import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import {
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
  getActivities,
  saveActivity,
  deleteActivity,
  getPrograms,
  saveProgram,
  deleteProgram,
  getGalleryItems,
  saveGalleryItem,
  deleteGalleryItem,
  getDonations,
  updateDonationStatus,
  getDocuments,
  saveDocument,
  deleteDocument,
  getContactMessages,
  updateMessageStatus,
  getSiteSettings,
  updateSiteSettings,
  isSupabaseConfigured,
  AdminUser,
} from '../../lib/supabase';
import {
  Activity,
  UpcomingProgram,
  GalleryItem,
  Donation,
  TransparencyDocument,
  ContactMessage,
  SiteSettings,
  PaymentStatus,
} from '../../types';
import { Logo } from '../../components/Logo';
import {
  LayoutDashboard,
  CalendarDays,
  Image as ImageIcon,
  Heart,
  FileText,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  Search,
  Filter,
  Eye,
  Shield,
  ExternalLink,
  Save,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowUpRight,
} from 'lucide-react';

type AdminTab =
  | 'dashboard'
  | 'activities'
  | 'programs'
  | 'gallery'
  | 'donations'
  | 'documents'
  | 'messages'
  | 'settings';

export const AdminDashboard: React.FC = () => {
  const { navigate } = useNavigation();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(getCurrentAdmin());

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Domain states
  const [activities, setActivities] = useState<Activity[]>([]);
  const [programs, setPrograms] = useState<UpcomingProgram[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [documents, setDocuments] = useState<TransparencyDocument[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);

  // Modals & Editing states
  const [editingActivity, setEditingActivity] = useState<Partial<Activity> | null>(null);
  const [editingProgram, setEditingProgram] = useState<Partial<UpcomingProgram> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);
  const [editingDoc, setEditingDoc] = useState<Partial<TransparencyDocument> | null>(null);
  const [donationFilter, setDonationFilter] = useState<'all' | 'pending' | 'verified'>('all');
  const [donationSearch, setDonationSearch] = useState('');

  // Settings form
  const [settingsForm, setSettingsForm] = useState<SiteSettings | null>(null);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadAllData();
    }
  }, [currentUser]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [acts, progs, gals, dons, docs, msgs, sets] = await Promise.all([
        getActivities(false),
        getPrograms(false),
        getGalleryItems(),
        getDonations(),
        getDocuments(),
        getContactMessages(),
        getSiteSettings(),
      ]);
      setActivities(acts);
      setPrograms(progs);
      setGallery(gals);
      setDonations(dons);
      setDocuments(docs);
      setMessages(msgs);
      setSettings(sets);
      setSettingsForm(sets);
    } catch (e) {
      console.error('Error loading dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    const res = await loginAdmin(loginEmail, loginPassword);
    if (res.user) {
      setCurrentUser(res.user);
    } else {
      setLoginError(res.error || 'Authentication failed');
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setCurrentUser(null);
  };

  // Metrics calculations (Strict rule: only verified donations included in confirmed totals)
  const totalDonationSubmissions = donations.length;
  const verifiedDonations = donations.filter((d) => d.payment_status === 'verified');
  const pendingDonations = donations.filter((d) => d.payment_status === 'pending');
  const confirmedDonationsAmount = verifiedDonations.reduce((sum, d) => sum + d.amount, 0);
  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  // ==========================================
  // ACTIVITY HANDLERS
  // ==========================================
  const handleSaveActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActivity || !editingActivity.title || !editingActivity.description) return;

    const slug =
      editingActivity.slug?.trim() ||
      editingActivity.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const item: Activity = {
      id: editingActivity.id || 'act-' + Date.now(),
      title: editingActivity.title,
      slug,
      description: editingActivity.description || '',
      content: editingActivity.content || editingActivity.description || '',
      featured_image:
        editingActivity.featured_image ||
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      gallery_images: editingActivity.gallery_images || [],
      date: editingActivity.date || new Date().toISOString().split('T')[0],
      location: editingActivity.location || 'Pfutsero, Nagaland',
      category: editingActivity.category || 'Cultural Preservation',
      status: (editingActivity.status as any) || 'completed',
      featured: Boolean(editingActivity.featured),
      published: editingActivity.published !== undefined ? editingActivity.published : true,
      created_at: editingActivity.created_at || new Date().toISOString(),
    };

    await saveActivity(item);
    setEditingActivity(null);
    loadAllData();
  };

  const handleDeleteActivity = async (id: string) => {
    if (confirm('Are you sure you want to remove this activity record?')) {
      await deleteActivity(id);
      loadAllData();
    }
  };

  const toggleActivityPublish = async (act: Activity) => {
    await saveActivity({ ...act, published: !act.published });
    loadAllData();
  };

  // ==========================================
  // PROGRAM HANDLERS
  // ==========================================
  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram || !editingProgram.title) return;

    const item: UpcomingProgram = {
      id: editingProgram.id || 'prog-' + Date.now(),
      title: editingProgram.title,
      description: editingProgram.description || '',
      date: editingProgram.date || new Date().toISOString().split('T')[0],
      location: editingProgram.location || 'Rüziku, Pfutsero',
      status: editingProgram.status || 'Upcoming',
      featured_image: editingProgram.featured_image || '',
      published: editingProgram.published !== undefined ? editingProgram.published : true,
      created_at: editingProgram.created_at || new Date().toISOString(),
    };

    await saveProgram(item);
    setEditingProgram(null);
    loadAllData();
  };

  const handleDeleteProgram = async (id: string) => {
    if (confirm('Delete this upcoming program entry?')) {
      await deleteProgram(id);
      loadAllData();
    }
  };

  // ==========================================
  // GALLERY HANDLERS
  // ==========================================
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery || !editingGallery.title || !editingGallery.image_url) return;

    const item: GalleryItem = {
      id: editingGallery.id || 'gal-' + Date.now(),
      title: editingGallery.title,
      caption: editingGallery.caption || '',
      category: editingGallery.category || 'Community Activities',
      image_url: editingGallery.image_url,
      aspect_ratio: editingGallery.aspect_ratio || 'landscape',
      order_num: editingGallery.order_num || gallery.length + 1,
      date: editingGallery.date || new Date().toISOString().split('T')[0],
      created_at: editingGallery.created_at || new Date().toISOString(),
    };

    await saveGalleryItem(item);
    setEditingGallery(null);
    loadAllData();
  };

  const handleDeleteGallery = async (id: string) => {
    if (confirm('Delete this photograph from the society gallery?')) {
      await deleteGalleryItem(id);
      loadAllData();
    }
  };

  // ==========================================
  // DONATION VERIFICATION HANDLERS
  // ==========================================
  const handleVerifyDonation = async (id: string, status: PaymentStatus) => {
    await updateDonationStatus(id, status);
    loadAllData();
  };

  // ==========================================
  // DOCUMENT HANDLERS
  // ==========================================
  const handleSaveDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc || !editingDoc.title) return;

    const item: TransparencyDocument = {
      id: editingDoc.id || 'doc-' + Date.now(),
      title: editingDoc.title,
      category: editingDoc.category || 'Annual Reports',
      file_url: editingDoc.file_url || '#',
      file_size: editingDoc.file_size || '1.2 MB PDF',
      year: editingDoc.year || '2025–2026',
      published_date: editingDoc.published_date || new Date().toISOString().split('T')[0],
      description: editingDoc.description || '',
      downloads_count: editingDoc.downloads_count || 0,
    };

    await saveDocument(item);
    setEditingDoc(null);
    loadAllData();
  };

  const handleDeleteDoc = async (id: string) => {
    if (confirm('Remove this official report?')) {
      await deleteDocument(id);
      loadAllData();
    }
  };

  // ==========================================
  // SETTINGS HANDLER
  // ==========================================
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingsForm) return;

    await updateSiteSettings(settingsForm);
    setSettings(settingsForm);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  // ==========================================
  // IF NOT LOGGED IN -> RENDER AUTH SCREEN
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F6F8F7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="flex justify-center mb-4">
            <Logo variant="mark" />
          </div>
          <h2 className="text-2xl font-bold text-[#17251F] tracking-tight font-['DM_Sans',sans-serif]">
            Uzho Cultural Society Secretariat
          </h2>
          <p className="mt-1.5 text-xs text-[#57655E]">
            Authorized Administrative & Content Management System
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-sm rounded-2xl border border-[#E2E8E5] sm:px-10">
            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#17251F] mb-1">
                  Secretariat Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@uzhocultural.org"
                  required
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17251F] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 px-4 bg-[#176B52] hover:bg-[#104C3A] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>{loginLoading ? 'Authenticating...' : 'Sign In to Secretariat Portal'}</span>
              </button>
            </form>

            {/* Quick Demo Credentials Box for immediate evaluation */}
            <div className="mt-6 pt-5 border-t border-[#E2E8E5] text-xs text-[#57655E] space-y-2 bg-[#F6F8F7] p-3.5 rounded-xl">
              <span className="font-semibold text-[#17251F] block">
                Administrative Demo Access:
              </span>
              <div className="flex justify-between font-mono text-[11px]">
                <span>Email:</span>
                <button
                  type="button"
                  onClick={() => setLoginEmail('admin@uzhocultural.org')}
                  className="text-[#176B52] hover:underline"
                >
                  admin@uzhocultural.org
                </button>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span>Password:</span>
                <button
                  type="button"
                  onClick={() => setLoginPassword('admin123')}
                  className="text-[#176B52] hover:underline"
                >
                  admin123
                </button>
              </div>
              <p className="text-[10px] text-[#57655E] pt-1">
                Connected with Supabase Client & persistent local storage engine.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-[#57655E] hover:text-[#176B52]"
            >
              ← Return to Society Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED DASHBOARD VIEW
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col">
      {/* Top Admin Navigation Header */}
      <header className="bg-[#17251F] text-white border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo variant="horizontal" inverted={true} />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#176B52] text-white">
              Admin Secretariat
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10"
              title="Open public website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">View Live Site</span>
            </button>

            <span className="h-4 w-px bg-white/20" />

            <div className="text-right hidden sm:block">
              <span className="text-xs font-semibold block text-white">{currentUser.name}</span>
              <span className="text-[10px] text-[#A2B8AF]">{currentUser.email}</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Secondary Subnav Tabs */}
        <div className="bg-[#104C3A] px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <nav className="max-w-[1440px] mx-auto flex space-x-1 py-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'activities', label: `Activities (${activities.length})`, icon: CalendarDays },
              { id: 'programs', label: `Programs (${programs.length})`, icon: CalendarDays },
              { id: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
              { id: 'donations', label: `Donations (${donations.length})`, icon: Heart },
              { id: 'documents', label: `Documents (${documents.length})`, icon: FileText },
              {
                id: 'messages',
                label: `Messages ${unreadMessagesCount > 0 ? `(${unreadMessagesCount})` : ''}`,
                icon: Mail,
              },
              { id: 'settings', label: 'Website Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-white text-[#17251F] font-bold shadow-xs'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW METRICS */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                Secretariat Overview
              </h2>
              <p className="text-xs text-[#57655E] mt-1">
                Real-time society database status, manual donation verification queues, and community records.
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-[#E2E8E5] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#57655E] mb-2">
                  <span>Confirmed Donations</span>
                  <span className="p-1.5 bg-[#EAF4EF] text-[#176B52] rounded-lg">
                    <Heart className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#176B52] font-['DM_Sans',sans-serif]">
                  ₹{confirmedDonationsAmount.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-[#57655E] mt-1">
                  From {verifiedDonations.length} verified submissions
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E2E8E5] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#57655E] mb-2">
                  <span>Pending UTR Verification</span>
                  <span className="p-1.5 bg-amber-50 text-amber-700 rounded-lg">
                    <Clock className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-700 font-['DM_Sans',sans-serif]">
                  {pendingDonations.length}
                </div>
                <button
                  onClick={() => {
                    setActiveTab('donations');
                    setDonationFilter('pending');
                  }}
                  className="text-[11px] text-[#176B52] font-semibold hover:underline mt-1 block"
                >
                  Review pending UTRs →
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E2E8E5] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#57655E] mb-2">
                  <span>Published Activities</span>
                  <span className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
                    <CalendarDays className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                  {activities.filter((a) => a.published).length}
                </div>
                <p className="text-[11px] text-[#57655E] mt-1">
                  {programs.length} upcoming programs scheduled
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E2E8E5] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#57655E] mb-2">
                  <span>Secretariat Inbox</span>
                  <span className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
                    <Mail className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                  {unreadMessagesCount} Unread
                </div>
                <p className="text-[11px] text-[#57655E] mt-1">{messages.length} total messages received</p>
              </div>
            </div>

            {/* Quick Actions & Pending donations preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#E2E8E5] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                    Pending Donation Reconciliations
                  </h3>
                  <button
                    onClick={() => setActiveTab('donations')}
                    className="text-xs font-semibold text-[#176B52] hover:underline"
                  >
                    View All Donations
                  </button>
                </div>

                {pendingDonations.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#57655E] bg-[#F6F8F7] rounded-xl">
                    All submitted donations have been reconciled and verified!
                  </div>
                ) : (
                  <div className="divide-y divide-[#E2E8E5] text-xs">
                    {pendingDonations.slice(0, 5).map((don) => (
                      <div key={don.id} className="py-3 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-[#17251F] block">{don.donor_name}</span>
                          <span className="text-[#57655E]">
                            Mobile: {don.mobile} · UTR:{' '}
                            <strong className="font-mono text-[#17251F]">{don.utr}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#176B52]">
                            ₹{don.amount.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => handleVerifyDonation(don.id, 'verified')}
                            className="px-3 py-1.5 bg-[#176B52] hover:bg-[#104C3A] text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Verify UTR</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Database & Supabase connection status */}
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#E2E8E5] shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#176B52]" />
                  <h3 className="text-base font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                    Database Engine
                  </h3>
                </div>

                <div className="p-3 bg-[#F6F8F7] rounded-xl border border-[#E2E8E5] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#57655E]">Mode:</span>
                    <span className="font-semibold text-[#176B52]">
                      {isSupabaseConfigured ? 'Live Supabase Cloud' : 'Persistent Storage (Active)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57655E]">Head Office:</span>
                    <span className="text-[#17251F]">Rüziku, Pfutsero</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57655E]">Official UPI:</span>
                    <span className="font-mono text-[#176B52] font-semibold">
                      {settings?.upi_id || 'uzhocultural@upi'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#57655E] leading-relaxed">
                  SQL migration file with full Row Level Security (RLS) is located at{' '}
                  <code className="text-[#176B52] font-mono text-[11px]">/supabase/schema.sql</code>.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full py-2 px-3 bg-[#F6F8F7] hover:bg-[#EAF4EF] text-[#17251F] text-xs font-semibold rounded-xl border border-[#E2E8E5]"
                  >
                    Manage Site & UPI Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ACTIVITIES MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                  Activity Management
                </h2>
                <p className="text-xs text-[#57655E]">
                  Create, update, publish/unpublish, and feature community initiatives.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingActivity({
                    title: '',
                    slug: '',
                    description: '',
                    content: '',
                    category: 'Cultural Preservation',
                    location: 'Rüziku, Pfutsero',
                    date: new Date().toISOString().split('T')[0],
                    featured: false,
                    published: true,
                    featured_image:
                      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#176B52] text-white text-xs font-semibold rounded-xl hover:bg-[#104C3A]"
              >
                <Plus className="w-4 h-4" />
                <span>Record New Activity</span>
              </button>
            </div>

            {/* Editing / Creating Modal */}
            {editingActivity && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#176B52]/30 shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8E5] mb-6">
                  <h3 className="text-lg font-bold text-[#17251F]">
                    {editingActivity.id ? 'Edit Activity Record' : 'Record New Field Activity'}
                  </h3>
                  <button
                    onClick={() => setEditingActivity(null)}
                    className="p-1.5 text-[#57655E] hover:text-[#17251F]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveActivity} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">
                        Activity Title *
                      </label>
                      <input
                        type="text"
                        value={editingActivity.title || ''}
                        onChange={(e) =>
                          setEditingActivity({ ...editingActivity, title: e.target.value })
                        }
                        required
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8E5] focus:ring-2 focus:ring-[#176B52]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">
                        URL Slug (Leave blank for auto)
                      </label>
                      <input
                        type="text"
                        value={editingActivity.slug || ''}
                        onChange={(e) =>
                          setEditingActivity({ ...editingActivity, slug: e.target.value })
                        }
                        placeholder="e.g. oral-history-recording"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">Category</label>
                      <select
                        value={editingActivity.category || 'Cultural Preservation'}
                        onChange={(e) =>
                          setEditingActivity({ ...editingActivity, category: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      >
                        <option value="Cultural Preservation">Cultural Preservation</option>
                        <option value="Community Development">Community Development</option>
                        <option value="Social Activities">Social Activities</option>
                        <option value="Youth & Community Engagement">
                          Youth & Community Engagement
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">Date</label>
                      <input
                        type="date"
                        value={editingActivity.date || ''}
                        onChange={(e) =>
                          setEditingActivity({ ...editingActivity, date: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">Location</label>
                      <input
                        type="text"
                        value={editingActivity.location || ''}
                        onChange={(e) =>
                          setEditingActivity({ ...editingActivity, location: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Featured Photograph URL
                    </label>
                    <input
                      type="url"
                      value={editingActivity.featured_image || ''}
                      onChange={(e) =>
                        setEditingActivity({ ...editingActivity, featured_image: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Short Description / Abstract *
                    </label>
                    <textarea
                      rows={2}
                      value={editingActivity.description || ''}
                      onChange={(e) =>
                        setEditingActivity({ ...editingActivity, description: e.target.value })
                      }
                      required
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Full Field Report Content
                    </label>
                    <textarea
                      rows={5}
                      value={editingActivity.content || ''}
                      onChange={(e) =>
                        setEditingActivity({ ...editingActivity, content: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E2E8E5] font-mono text-[11px]"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingActivity.published}
                        onChange={(e) =>
                          setEditingActivity({ ...editingActivity, published: e.target.checked })
                        }
                        className="rounded text-[#176B52]"
                      />
                      <span className="font-semibold text-[#17251F]">Published on Website</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingActivity.featured}
                        onChange={(e) =>
                          setEditingActivity({ ...editingActivity, featured: e.target.checked })
                        }
                        className="rounded text-[#176B52]"
                      />
                      <span className="font-semibold text-[#17251F]">
                        Featured on Home Page Hero
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingActivity(null)}
                      className="px-4 py-2 border border-[#E2E8E5] text-[#57655E] rounded-xl hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#176B52] hover:bg-[#104C3A] text-white rounded-xl font-semibold"
                    >
                      Save Activity Record
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List */}
            <div className="bg-white rounded-2xl border border-[#E2E8E5] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F6F8F7] text-[#57655E] border-b border-[#E2E8E5] uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="p-4">Activity</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Date & Location</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8E5]">
                    {activities.map((act) => (
                      <tr key={act.id} className="hover:bg-slate-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={act.featured_image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                            />
                            <div>
                              <strong className="text-[#17251F] block">{act.title}</strong>
                              <span className="text-[11px] text-[#57655E]">/{act.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-[#176B52] font-semibold">{act.category}</td>
                        <td className="p-4 text-[#57655E]">
                          {act.date} · {act.location}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => toggleActivityPublish(act)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                              act.published
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {act.published ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingActivity(act)}
                            className="p-1.5 text-[#57655E] hover:text-[#176B52] rounded"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(act.id)}
                            className="p-1.5 text-[#57655E] hover:text-rose-600 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: UPCOMING PROGRAMS */}
        {/* ========================================================= */}
        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                  Upcoming Programs Management
                </h2>
                <p className="text-xs text-[#57655E]">
                  Publish future assemblies, workshops, and ongoing programs.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingProgram({
                    title: '',
                    description: '',
                    date: new Date().toISOString().split('T')[0],
                    location: 'Rüziku, Pfutsero',
                    status: 'Upcoming',
                    published: true,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#176B52] text-white text-xs font-semibold rounded-xl hover:bg-[#104C3A]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Scheduled Program</span>
              </button>
            </div>

            {editingProgram && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#176B52]/30 shadow-md">
                <form onSubmit={handleSaveProgram} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">
                        Program Title *
                      </label>
                      <input
                        type="text"
                        value={editingProgram.title || ''}
                        onChange={(e) =>
                          setEditingProgram({ ...editingProgram, title: e.target.value })
                        }
                        required
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">Status</label>
                      <select
                        value={editingProgram.status || 'Upcoming'}
                        onChange={(e) =>
                          setEditingProgram({
                            ...editingProgram,
                            status: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Planning">Planning</option>
                        <option value="Ongoing">Ongoing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">Date</label>
                      <input
                        type="date"
                        value={editingProgram.date || ''}
                        onChange={(e) =>
                          setEditingProgram({ ...editingProgram, date: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">Location</label>
                      <input
                        type="text"
                        value={editingProgram.location || ''}
                        onChange={(e) =>
                          setEditingProgram({ ...editingProgram, location: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Program Overview & Objectives
                    </label>
                    <textarea
                      rows={3}
                      value={editingProgram.description || ''}
                      onChange={(e) =>
                        setEditingProgram({ ...editingProgram, description: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingProgram(null)}
                      className="px-4 py-2 border border-[#E2E8E5] text-[#57655E] rounded-xl hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#176B52] text-white rounded-xl font-semibold"
                    >
                      Save Program
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-[#E2E8E5] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F6F8F7] text-[#57655E] border-b border-[#E2E8E5] uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-4">Program</th>
                    <th className="p-4">Date & Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8E5]">
                  {programs.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-4">
                        <strong className="text-[#17251F] block">{p.title}</strong>
                        <span className="text-[#57655E] line-clamp-1">{p.description}</span>
                      </td>
                      <td className="p-4 text-[#57655E]">
                        {p.date} · {p.location}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#EAF4EF] text-[#176B52]">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingProgram(p)}
                          className="p-1.5 text-[#57655E] hover:text-[#176B52]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProgram(p.id)}
                          className="p-1.5 text-[#57655E] hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: GALLERY MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                  Gallery Archives
                </h2>
                <p className="text-xs text-[#57655E]">
                  Add photographs, specify categories, add captions, and curate displays.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingGallery({
                    title: '',
                    caption: '',
                    category: 'Cultural Events',
                    image_url:
                      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
                    aspect_ratio: 'landscape',
                    order_num: gallery.length + 1,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#176B52] text-white text-xs font-semibold rounded-xl hover:bg-[#104C3A]"
              >
                <Plus className="w-4 h-4" />
                <span>Upload / Add Photograph</span>
              </button>
            </div>

            {editingGallery && (
              <div className="bg-white p-6 rounded-2xl border border-[#176B52]/30 shadow-md">
                <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">
                        Photograph Title *
                      </label>
                      <input
                        type="text"
                        value={editingGallery.title || ''}
                        onChange={(e) =>
                          setEditingGallery({ ...editingGallery, title: e.target.value })
                        }
                        required
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">Category</label>
                      <select
                        value={editingGallery.category || 'Cultural Events'}
                        onChange={(e) =>
                          setEditingGallery({
                            ...editingGallery,
                            category: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      >
                        <option value="Cultural Events">Cultural Events</option>
                        <option value="Community Activities">Community Activities</option>
                        <option value="Programs">Programs</option>
                        <option value="Meetings">Meetings</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Image URL (Stored in Supabase Storage or Direct CDN) *
                    </label>
                    <input
                      type="url"
                      value={editingGallery.image_url || ''}
                      onChange={(e) =>
                        setEditingGallery({ ...editingGallery, image_url: e.target.value })
                      }
                      required
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Archival Caption & Context
                    </label>
                    <textarea
                      rows={2}
                      value={editingGallery.caption || ''}
                      onChange={(e) =>
                        setEditingGallery({ ...editingGallery, caption: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingGallery(null)}
                      className="px-4 py-2 border border-[#E2E8E5] text-[#57655E] rounded-xl hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#176B52] text-white rounded-xl font-semibold"
                    >
                      Save Photograph
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-xl border border-[#E2E8E5] overflow-hidden flex flex-col justify-between"
                >
                  <div className="h-40 overflow-hidden bg-slate-100 relative">
                    <img src={photo.image_url} alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-[#17251F]/80 text-white text-[10px] px-2 py-0.5 rounded">
                      {photo.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-xs text-[#17251F] truncate">{photo.title}</h4>
                    <p className="text-[11px] text-[#57655E] line-clamp-2 mt-0.5">{photo.caption}</p>
                  </div>
                  <div className="p-3 pt-0 flex justify-end gap-1 border-t border-[#E2E8E5]/50">
                    <button
                      onClick={() => setEditingGallery(photo)}
                      className="p-1 text-[#57655E] hover:text-[#176B52]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteGallery(photo.id)}
                      className="p-1 text-[#57655E] hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: DONATION RECONCILIATION & MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'donations' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                Donation Reconciliation
              </h2>
              <p className="text-xs text-[#57655E]">
                Reconcile submitted UTRs against society bank statements. Only VERIFIED donations
                are added into official totals.
              </p>
            </div>

            {/* Summary Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#E2E8E5]">
                <span className="text-[11px] font-semibold text-[#57655E] uppercase block">
                  Total Submissions
                </span>
                <span className="text-xl font-bold text-[#17251F]">
                  {donations.length} records
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E2E8E5]">
                <span className="text-[11px] font-semibold text-[#176B52] uppercase block">
                  Verified Total Amount
                </span>
                <span className="text-xl font-bold text-[#176B52]">
                  ₹{confirmedDonationsAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E2E8E5]">
                <span className="text-[11px] font-semibold text-amber-700 uppercase block">
                  Pending Verification
                </span>
                <span className="text-xl font-bold text-amber-700">
                  {pendingDonations.length} awaiting audit
                </span>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#E2E8E5]">
                {(['all', 'pending', 'verified'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setDonationFilter(filter)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg capitalize transition-all ${
                      donationFilter === filter
                        ? 'bg-[#176B52] text-white font-semibold'
                        : 'text-[#57655E] hover:text-[#17251F]'
                    }`}
                  >
                    {filter} ({filter === 'all' ? donations.length : donations.filter((d) => d.payment_status === filter).length})
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#57655E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search donor, UTR, mobile..."
                  value={donationSearch}
                  onChange={(e) => setDonationSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-[#E2E8E5] bg-white text-[#17251F]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-[#E2E8E5] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F6F8F7] text-[#57655E] border-b border-[#E2E8E5] uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="p-4">Date</th>
                      <th className="p-4">Donor Details</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">UTR Reference</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Verification Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8E5]">
                    {donations
                      .filter((d) => donationFilter === 'all' || d.payment_status === donationFilter)
                      .filter((d) => {
                        const q = donationSearch.toLowerCase();
                        return (
                          !q ||
                          d.donor_name.toLowerCase().includes(q) ||
                          d.utr.toLowerCase().includes(q) ||
                          d.mobile.includes(q)
                        );
                      })
                      .map((don) => (
                        <tr key={don.id} className="hover:bg-slate-50">
                          <td className="p-4 text-[#57655E] whitespace-nowrap">
                            {new Date(don.created_at).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="p-4">
                            <strong className="text-[#17251F] block">{don.donor_name}</strong>
                            <span className="text-[11px] text-[#57655E]">
                              {don.mobile} {don.email && `· ${don.email}`}
                            </span>
                            {don.notes && (
                              <span className="block text-[11px] text-[#176B52] italic">
                                Note: {don.notes}
                              </span>
                            )}
                          </td>
                          <td className="p-4 font-bold text-[#176B52] whitespace-nowrap">
                            ₹{don.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="p-4 font-mono font-medium text-[#17251F]">{don.utr}</td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                                don.payment_status === 'verified'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}
                            >
                              {don.payment_status === 'verified' ? 'Verified' : 'Pending Verification'}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                            {don.payment_status === 'pending' ? (
                              <button
                                onClick={() => handleVerifyDonation(don.id, 'verified')}
                                className="px-3 py-1 bg-[#176B52] hover:bg-[#104C3A] text-white rounded-lg text-xs font-semibold"
                              >
                                Mark Verified
                              </button>
                            ) : (
                              <button
                                onClick={() => handleVerifyDonation(don.id, 'pending')}
                                className="px-3 py-1 border border-[#E2E8E5] hover:bg-slate-50 text-[#57655E] rounded-lg text-xs font-medium"
                              >
                                Revert to Pending
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: DOCUMENTS & TRANSPARENCY */}
        {/* ========================================================= */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                  Official Documents & Reports
                </h2>
                <p className="text-xs text-[#57655E]">
                  Publish Annual Reports, Financial Summaries, and By-laws.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingDoc({
                    title: '',
                    category: 'Annual Reports',
                    file_url: '#',
                    file_size: '1.5 MB PDF',
                    year: '2025–2026',
                    description: '',
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#176B52] text-white text-xs font-semibold rounded-xl hover:bg-[#104C3A]"
              >
                <Plus className="w-4 h-4" />
                <span>Upload / Record Document</span>
              </button>
            </div>

            {editingDoc && (
              <div className="bg-white p-6 rounded-2xl border border-[#176B52]/30 shadow-md">
                <form onSubmit={handleSaveDoc} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">
                        Document Title *
                      </label>
                      <input
                        type="text"
                        value={editingDoc.title || ''}
                        onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                        required
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">Category</label>
                      <select
                        value={editingDoc.category || 'Annual Reports'}
                        onChange={(e) =>
                          setEditingDoc({ ...editingDoc, category: e.target.value as any })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      >
                        <option value="Annual Reports">Annual Reports</option>
                        <option value="Financial Summaries">Financial Summaries</option>
                        <option value="Activity Reports">Activity Reports</option>
                        <option value="Official Documents">Official Documents</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">Reporting Year</label>
                      <input
                        type="text"
                        value={editingDoc.year || ''}
                        onChange={(e) => setEditingDoc({ ...editingDoc, year: e.target.value })}
                        placeholder="e.g. 2025–2026"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">File Size</label>
                      <input
                        type="text"
                        value={editingDoc.file_size || ''}
                        onChange={(e) => setEditingDoc({ ...editingDoc, file_size: e.target.value })}
                        placeholder="e.g. 2.4 MB PDF"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#17251F] mb-1">
                        File Download URL
                      </label>
                      <input
                        type="text"
                        value={editingDoc.file_url || ''}
                        onChange={(e) => setEditingDoc({ ...editingDoc, file_url: e.target.value })}
                        placeholder="Storage path or URL"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Brief Document Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingDoc.description || ''}
                      onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingDoc(null)}
                      className="px-4 py-2 border border-[#E2E8E5] text-[#57655E] rounded-xl hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#176B52] text-white rounded-xl font-semibold"
                    >
                      Save Document
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-[#E2E8E5] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F6F8F7] text-[#57655E] border-b border-[#E2E8E5] uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Year & Size</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8E5]">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50">
                      <td className="p-4">
                        <strong className="text-[#17251F] block">{doc.title}</strong>
                        <span className="text-[#57655E] text-[11px] line-clamp-1">
                          {doc.description}
                        </span>
                      </td>
                      <td className="p-4 text-[#176B52] font-semibold">{doc.category}</td>
                      <td className="p-4 text-[#57655E]">
                        {doc.year} · {doc.file_size}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingDoc(doc)}
                          className="p-1.5 text-[#57655E] hover:text-[#176B52]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDoc(doc.id)}
                          className="p-1.5 text-[#57655E] hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: CONTACT MESSAGES */}
        {/* ========================================================= */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                Secretariat Messages & Inquiries
              </h2>
              <p className="text-xs text-[#57655E]">
                Inbound communications received from the public website contact form.
              </p>
            </div>

            {messages.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-[#E2E8E5] text-xs text-[#57655E]">
                No contact submissions recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-white p-6 rounded-2xl border transition-all ${
                      msg.status === 'unread' ? 'border-[#176B52] shadow-xs' : 'border-[#E2E8E5]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8E5]">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-[#17251F]">{msg.name}</strong>
                          {msg.status === 'unread' && (
                            <span className="px-2 py-0.5 bg-[#EAF4EF] text-[#176B52] font-semibold text-[10px] rounded">
                              New
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#57655E]">
                          Phone: {msg.phone} · Email:{' '}
                          <a href={`mailto:${msg.email}`} className="text-[#176B52] hover:underline">
                            {msg.email}
                          </a>
                        </span>
                      </div>
                      <span className="text-[11px] text-[#57655E]">
                        {new Date(msg.created_at).toLocaleString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="py-3">
                      <h4 className="text-xs font-bold text-[#17251F] uppercase tracking-wider mb-1">
                        Subject: {msg.subject}
                      </h4>
                      <p className="text-xs text-[#17251F] leading-relaxed whitespace-pre-line">
                        {msg.message}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E2E8E5] flex justify-end gap-2 text-xs">
                      {msg.status === 'unread' ? (
                        <button
                          onClick={async () => {
                            await updateMessageStatus(msg.id, 'read');
                            loadAllData();
                          }}
                          className="px-3 py-1.5 bg-[#F6F8F7] hover:bg-[#EAF4EF] text-[#176B52] font-semibold rounded-lg"
                        >
                          Mark as Read
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-semibold self-center">
                          ✓ Reviewed
                        </span>
                      )}
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                          msg.subject
                        )} - Uzho Cultural Society`}
                        className="px-3 py-1.5 bg-[#176B52] hover:bg-[#104C3A] text-white font-semibold rounded-lg"
                      >
                        Reply via Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: WEBSITE & UPI SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'settings' && settingsForm && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                Website & UPI Settings
              </h2>
              <p className="text-xs text-[#57655E]">
                Centralized settings for UPI ID, payee credentials, office contact info, and links.
              </p>
            </div>

            {settingsSuccess && (
              <div className="p-3.5 bg-[#EAF4EF] border border-[#176B52]/20 text-[#176B52] text-xs font-semibold rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Website and UPI configuration successfully updated across application!</span>
              </div>
            )}

            <form
              onSubmit={handleSaveSettings}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8E5] space-y-6 text-xs shadow-xs"
            >
              {/* Payment Section */}
              <div className="space-y-4 pb-6 border-b border-[#E2E8E5]">
                <div className="flex items-center gap-2 text-sm font-bold text-[#17251F]">
                  <Heart className="w-4 h-4 text-[#176B52]" />
                  <span>Centralized UPI Payment Configuration</span>
                </div>
                <p className="text-[#57655E] text-xs">
                  This UPI ID generates the live QR codes dynamically on the donation modal and public pages.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Official Society UPI ID *
                    </label>
                    <input
                      type="text"
                      value={settingsForm.upi_id || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, upi_id: e.target.value.trim() })
                      }
                      required
                      className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      UPI Payee Name (Shown in Banking Apps) *
                    </label>
                    <input
                      type="text"
                      value={settingsForm.upi_payee_name || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, upi_payee_name: e.target.value })
                      }
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>
                </div>
              </div>

              {/* Organization Info */}
              <div className="space-y-4 pb-6 border-b border-[#E2E8E5]">
                <div className="text-sm font-bold text-[#17251F]">
                  Institutional Identity & Location
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.org_name || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, org_name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">Tagline</label>
                    <input
                      type="text"
                      value={settingsForm.tagline || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, tagline: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#17251F] mb-1">
                    Head Office Official Address
                  </label>
                  <input
                    type="text"
                    value={settingsForm.head_office || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, head_office: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8E5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Primary Phone Number
                    </label>
                    <input
                      type="text"
                      value={settingsForm.phone_primary || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, phone_primary: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">
                      Official Contact Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.email_primary || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, email_primary: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-4">
                <div className="text-sm font-bold text-[#17251F]">Official Social Media Handles</div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">Facebook</label>
                    <input
                      type="url"
                      value={settingsForm.facebook || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, facebook: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">Instagram</label>
                    <input
                      type="url"
                      value={settingsForm.instagram || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, instagram: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#17251F] mb-1">YouTube</label>
                    <input
                      type="url"
                      value={settingsForm.youtube || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, youtube: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8E5]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#176B52] hover:bg-[#104C3A] text-white text-xs font-semibold rounded-xl flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Updated Website Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
