import React, { useState } from 'react';
import { submitContactMessage } from '../../lib/supabase';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');
    try {
      await submitContactMessage({
        name,
        phone,
        email,
        subject,
        message,
      });
      setStatus('success');
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Could not send message. Please try calling directly or try again.');
    }
  };

  return (
    <section className="py-20 bg-[#F6F8F7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
            Communication
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
            Contact Uzho Cultural Society
          </h2>
          <p className="mt-2 text-sm text-[#57655E]">
            Reach out to our central secretariat in Pfutsero for membership inquiries, research
            collaboration, cultural archives, or general communication.
          </p>
        </div>

        {/* Two-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Official Office Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8E5] space-y-6 shadow-xs">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
                  Head Office Location
                </span>
                <h3 className="text-lg font-bold text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
                  Uzho Cultural Society
                </h3>
                <div className="mt-3 flex items-start gap-3 text-sm text-[#57655E] leading-relaxed">
                  <MapPin className="w-5 h-5 text-[#176B52] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#17251F]">Rüziku, Pfutsero</strong>
                    <br />
                    Phek District, Nagaland
                    <br />
                    India – 797107
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8E5] space-y-3.5 text-sm text-[#57655E]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#176B52] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-[#57655E]">Official Telephone</span>
                    <a href="tel:+919436077084" className="font-medium text-[#17251F] hover:text-[#176B52]">
                      +91 94360 77084
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#176B52] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-[#57655E]">Electronic Mail</span>
                    <a href="mailto:uzhoculturalsociety@gmail.com" className="font-medium text-[#17251F] hover:text-[#176B52]">
                      uzhoculturalsociety@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-[#57655E]">Secretariat Working Hours</span>
                    <span className="text-xs text-[#17251F]">
                      Monday – Friday: 9:30 AM – 4:30 PM
                      <br />
                      Saturday: 10:00 AM – 2:00 PM (IST)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs text-[#57655E] bg-[#F6F8F7] p-3.5 rounded-xl border border-[#E2E8E5]">
                <strong className="text-[#17251F]">Visitor Advisory:</strong> Rüziku is situated in
                upper Pfutsero. During winter months (Nov–Feb), evening temperatures drop
                significantly; prior appointments for oral archives or delegations are recommended.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8E5] shadow-xs">
              <h3 className="text-lg font-bold text-[#17251F] mb-1 font-['DM_Sans',sans-serif]">
                Send a Message to the Secretariat
              </h3>
              <p className="text-xs text-[#57655E] mb-6">
                Your communication will be directed to the General Secretary / Executive Office.
              </p>

              {status === 'success' ? (
                <div className="p-6 bg-[#EAF4EF] border border-[#176B52]/20 rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 bg-[#176B52] text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#17251F]">Message Successfully Transmitted</h4>
                  <p className="text-xs text-[#57655E] max-w-sm mx-auto">
                    Thank you for reaching out. The Uzho Cultural Society administrative office will
                    review your note and get in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-4 py-2 bg-[#176B52] text-white text-xs font-semibold rounded-lg hover:bg-[#104C3A]"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#17251F] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#17251F] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="Contact number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#17251F] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#17251F] mb-1">
                        Subject / Topic *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Research inquiry, membership"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17251F] mb-1">
                      Message / Inquiry *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-3 px-4 bg-[#176B52] hover:bg-[#104C3A] disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{status === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Placeholder as specified in prompt: "Map can appear below." */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-[#E2E8E5] bg-white shadow-xs">
          <div className="p-4 bg-[#F6F8F7] border-b border-[#E2E8E5] flex items-center justify-between text-xs text-[#57655E]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#176B52]" />
              <span className="font-semibold text-[#17251F]">Pfutsero Town & Rüziku Region</span>
              <span>· 25.712° N, 94.316° E · Elevation 2,133m</span>
            </div>
            <span className="text-[#176B52] font-medium hidden sm:inline">Phek District, Nagaland</span>
          </div>
          <div className="relative h-[240px] sm:h-[300px] bg-[#EAF4EF] flex items-center justify-center text-center p-6">
            {/* Clean topographical map background presentation */}
            <div className="max-w-md space-y-2">
              <div className="w-10 h-10 bg-[#176B52] text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                Rüziku, Pfutsero
              </h4>
              <p className="text-xs text-[#57655E] leading-relaxed">
                Situated along the scenic ridge of Pfutsero, accessible via the Kohima–Jessami National
                Highway corridor (~70 km from Kohima).
              </p>
              <div className="pt-1">
                <a
                  href="https://maps.google.com/?q=Pfutsero+Nagaland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#176B52] hover:underline"
                >
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
