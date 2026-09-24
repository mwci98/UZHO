import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { getSiteSettings, submitDonation } from '../lib/supabase';
import { SiteSettings, Donation } from '../types';
import {
  Heart,
  QrCode,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';

interface DonationFlowProps {
  initialAmount?: number;
  onClose?: () => void;
  isModal?: boolean;
}

export const DonationFlow: React.FC<DonationFlowProps> = ({
  initialAmount = 1000,
  onClose,
  isModal = false,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  // Form Step 1
  const [donorName, setDonorName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Step 2: UPI State
  const [copiedUpi, setCopiedUpi] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Step 3: Confirmation
  const [utr, setUtr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedDonation, setSubmittedDonation] = useState<Donation | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSiteSettings);
  }, []);

  const upiId = siteSettings?.upi_id || 'uzhocultural@upi';
  const upiPayee = siteSettings?.upi_payee_name || 'Uzho Cultural Society';

  // Generate UPI URI
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    upiPayee
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent('Donation to Uzho Cultural Society')}`;

  // Render QR Code onto canvas when in Step 2
  useEffect(() => {
    if (step === 2 && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        upiUri,
        {
          width: 220,
          margin: 1,
          color: {
            dark: '#17251F',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error('QR code generation error:', error);
        }
      );
    }
  }, [step, upiUri]);

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleSelectAmount = (val: number) => {
    setAmount(val);
    setCustomAmount('');
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: '' }));
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) {
      setAmount(Number(val));
    }
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: '' }));
    }
  };

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!donorName.trim()) {
      errs.donorName = 'Full name is required';
    }
    if (!mobile.trim()) {
      errs.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      errs.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!amount || amount <= 0) {
      errs.amount = 'Please select or enter a donation amount';
    } else if (amount < 50) {
      errs.amount = 'Minimum contribution is ₹50';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleValidateStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUtr = utr.trim();
    if (!cleanUtr) {
      setErrors({ utr: 'UTR / Transaction Reference number is required' });
      return;
    }
    if (cleanUtr.length < 6) {
      setErrors({ utr: 'Please enter a valid 12-digit UPI UTR / transaction ID' });
      return;
    }
    setErrors({});
    handleSubmitRecord();
  };

  const handleSubmitRecord = async () => {
    setSubmitting(true);
    try {
      const record = await submitDonation({
        donor_name: donorName,
        mobile,
        email: email || undefined,
        amount,
        utr,
        notes,
      });
      setSubmittedDonation(record);
      setStep(4);
    } catch (err) {
      console.error('Error recording donation:', err);
      setErrors({ utr: 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setUtr('');
    setSubmittedDonation(null);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8E5] shadow-sm overflow-hidden">
      {/* Top Header Progress */}
      <div className="bg-[#17251F] text-white p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#176B52] fill-[#176B52]" />
            <h3 className="text-base sm:text-lg font-semibold tracking-tight font-['DM_Sans',sans-serif]">
              Support Uzho Cultural Society
            </h3>
          </div>
          <span className="text-xs text-white/70">
            Step {step} of 3 {step === 4 && '(Completed)'}
          </span>
        </div>

        {/* Step Indicator */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div
            className={`h-1.5 rounded-full transition-all ${
              step >= 1 ? 'bg-[#176B52]' : 'bg-white/20'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all ${
              step >= 2 ? 'bg-[#176B52]' : 'bg-white/20'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all ${
              step >= 3 ? 'bg-[#176B52]' : 'bg-white/20'
            }`}
          />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* ================= STEP 1: DONOR DETAILS ================= */}
        {step === 1 && (
          <form onSubmit={handleProceedToPayment} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#57655E] mb-2">
                Select Donation Amount (INR) *
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-3">
                {presetAmounts.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleSelectAmount(val)}
                    className={`py-2.5 px-3 text-sm font-semibold rounded-xl border transition-all text-center ${
                      amount === val && !customAmount
                        ? 'bg-[#176B52] text-white border-[#176B52] shadow-xs'
                        : 'bg-[#F6F8F7] text-[#17251F] border-[#E2E8E5] hover:border-[#176B52]/40'
                    }`}
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-medium text-[#57655E]">
                  ₹
                </span>
                <input
                  type="text"
                  placeholder="Or enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full pl-8 pr-4 py-2.5 text-sm rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
                />
              </div>
              {errors.amount && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.amount}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17251F] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikuolie Medo"
                  value={donorName}
                  onChange={(e) => {
                    setDonorName(e.target.value);
                    if (errors.donorName) setErrors((prev) => ({ ...prev, donorName: '' }));
                  }}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
                />
                {errors.donorName && (
                  <p className="mt-1 text-xs text-rose-600">{errors.donorName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17251F] mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/[^0-9]/g, ''));
                    if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                  }}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
                />
                {errors.mobile && (
                  <p className="mt-1 text-xs text-rose-600">{errors.mobile}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17251F] mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="For receiving receipt confirmation"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17251F] mb-1.5">
                Initiative / Dedicated Purpose (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Oral history documentation, youth workshop, general support"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#176B52] hover:bg-[#104C3A] text-white font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Proceed to UPI Payment (₹{amount.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-center text-xs text-[#57655E]">
              Uzho Cultural Society accepts direct voluntary contributions via UPI. No third-party
              intermediary payment commission is deducted.
            </p>
          </form>
        )}

        {/* ================= STEP 2: UPI PAYMENT & LIVE QR CODE ================= */}
        {step === 2 && (
          <div className="space-y-6 text-center">
            <div>
              <span className="text-xs font-medium text-[#57655E] uppercase tracking-wider">
                Scan & Pay via any UPI App
              </span>
              <h4 className="text-2xl font-bold text-[#17251F] mt-1">
                ₹{amount.toLocaleString('en-IN')}
              </h4>
              <p className="text-xs text-[#57655E] mt-0.5">
                Donor: <span className="font-semibold text-[#17251F]">{donorName}</span>
              </p>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-5 bg-[#F6F8F7] border border-[#E2E8E5] rounded-2xl max-w-xs mx-auto">
              <div className="bg-white p-3 rounded-xl shadow-xs border border-[#E2E8E5]">
                <canvas ref={canvasRef} className="rounded-lg" />
              </div>

              <div className="mt-4 w-full text-left bg-white p-3 rounded-xl border border-[#E2E8E5] flex items-center justify-between">
                <div className="truncate mr-2">
                  <span className="block text-[10px] uppercase font-semibold text-[#57655E]">
                    Official Society UPI ID
                  </span>
                  <span className="text-xs font-bold text-[#17251F] font-mono select-all">
                    {upiId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyUpiId}
                  className="p-1.5 text-[#176B52] hover:bg-[#EAF4EF] rounded-lg transition-colors shrink-0"
                  title="Copy UPI ID"
                >
                  {copiedUpi ? (
                    <Check className="w-4 h-4 text-[#176B52]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* UPI App launch button for mobile devices */}
            <div className="space-y-3 max-w-sm mx-auto">
              <a
                href={upiUri}
                className="w-full py-3 px-4 bg-[#17251F] hover:bg-[#104C3A] text-white font-medium text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in UPI App (GPay, PhonePe, Paytm, BHIM)</span>
              </a>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full py-3 px-4 bg-[#176B52] hover:bg-[#104C3A] text-white font-medium text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>I Have Completed the Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs text-[#57655E] hover:text-[#17251F] pt-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Change amount or donor details</span>
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200/70 rounded-xl text-left text-xs text-amber-900 leading-relaxed max-w-md mx-auto">
              <span className="font-semibold block mb-0.5">Please Note:</span>
              Transactions are verified manually against society bank records. Please note down
              your UTR (12-digit reference number) from your UPI receipt to submit on the next screen.
            </div>
          </div>
        )}

        {/* ================= STEP 3: UTR CONFIRMATION ================= */}
        {step === 3 && (
          <form onSubmit={handleValidateStep3} className="space-y-6">
            <div className="text-center pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
                Final Confirmation
              </span>
              <h4 className="text-xl font-bold text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
                Submit Payment Reference
              </h4>
              <p className="text-xs text-[#57655E] mt-1 max-w-md mx-auto">
                Please enter the 12-digit UPI Transaction Reference Number / UTR generated by your
                banking or UPI application.
              </p>
            </div>

            <div className="bg-[#F6F8F7] p-4 rounded-xl border border-[#E2E8E5] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#57655E]">Donor Name:</span>
                <span className="font-medium text-[#17251F]">{donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57655E]">Mobile Number:</span>
                <span className="font-medium text-[#17251F]">{mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57655E]">Amount:</span>
                <span className="font-bold text-[#176B52] text-sm">
                  ₹{amount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57655E]">Payee:</span>
                <span className="font-medium text-[#17251F]">{upiPayee} ({upiId})</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17251F] mb-1.5">
                UPI Reference / UTR Number *
              </label>
              <input
                type="text"
                placeholder="e.g. 423901849182"
                value={utr}
                onChange={(e) => {
                  setUtr(e.target.value.trim());
                  if (errors.utr) setErrors({});
                }}
                className="w-full px-3.5 py-2.5 text-sm font-mono tracking-wider rounded-xl border border-[#E2E8E5] bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52] focus:border-[#176B52]"
              />
              {errors.utr && <p className="mt-1 text-xs text-rose-600">{errors.utr}</p>}
              <p className="mt-1 text-[11px] text-[#57655E]">
                Usually visible under "Transaction Details" or "Google Transaction ID / UPI Ref ID".
              </p>
            </div>

            {/* Crucial mandatory disclaimer as per prompt */}
            <div className="p-3.5 bg-[#EAF4EF] border border-[#176B52]/20 rounded-xl flex items-start gap-2.5 text-xs text-[#17251F]">
              <ShieldCheck className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
              <span>
                <strong>Manual Verification:</strong> Payment confirmation is subject to manual
                verification. There is currently no automated payment gateway integration; society
                honorary treasurers verify each UTR with bank statements before updating official
                receipt registers.
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-3 px-4 border border-[#E2E8E5] text-[#57655E] hover:text-[#17251F] text-xs font-medium rounded-xl transition-all"
              >
                Back to QR
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3 px-4 bg-[#176B52] hover:bg-[#104C3A] disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Recording submission...</span>
                ) : (
                  <>
                    <span>Submit Donation Record</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 4: SUBMISSION SUCCESS ================= */}
        {step === 4 && submittedDonation && (
          <div className="text-center space-y-6 py-4">
            <div className="w-14 h-14 bg-[#EAF4EF] text-[#176B52] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                Contribution Record Submitted
              </h4>
              <p className="text-xs text-[#57655E] mt-1.5 max-w-sm mx-auto">
                Thank you, <strong className="text-[#17251F]">{submittedDonation.donor_name}</strong>.
                Your contribution details have been saved for reconciliation.
              </p>
            </div>

            <div className="bg-[#F6F8F7] p-4 rounded-xl border border-[#E2E8E5] text-xs text-left space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-[#57655E]">Reference ID:</span>
                <span className="font-mono text-[#17251F]">{submittedDonation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57655E]">Amount:</span>
                <span className="font-bold text-[#176B52]">
                  ₹{submittedDonation.amount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57655E]">UTR Submitted:</span>
                <span className="font-mono font-medium text-[#17251F]">{submittedDonation.utr}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-[#E2E8E5]">
                <span className="text-[#57655E]">Verification Status:</span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                  Pending Manual Verification
                </span>
              </div>
            </div>

            <p className="text-xs text-[#57655E] max-w-md mx-auto leading-relaxed">
              Our administrative secretariat in Pfutsero reconciles bank transactions weekly. Once
              verified, your contribution is credited towards the society's cultural and community
              programs.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={resetFlow}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#176B52] bg-[#EAF4EF] hover:bg-[#d8ece2] rounded-xl transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Make Another Contribution</span>
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-medium text-white bg-[#17251F] hover:bg-[#104C3A] rounded-xl transition-colors"
                >
                  Close Window
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
