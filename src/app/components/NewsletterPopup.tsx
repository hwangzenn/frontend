'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'factorix_newsletter_dismissed';
const DISMISS_DAYS = 7;

interface Props {
  /** 외부에서 강제로 열기 (버튼 클릭 등) */
  open?: boolean;
  onClose?: () => void;
}

export default function NewsletterPopup({ open, onClose }: Props) {
  const [autoVisible, setAutoVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // 5초 자동 노출 (외부 제어 없을 때만)
  useEffect(() => {
    if (open !== undefined) return;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const daysSince = (Date.now() - parseInt(dismissed, 10)) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISS_DAYS) return;
    }
    const timer = setTimeout(() => setAutoVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [open]);

  const visible = open !== undefined ? open : autoVisible;

  const dismiss = () => {
    setAutoVisible(false);
    if (onClose) {
      onClose();
    } else {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 800));
    console.log('[Newsletter] Subscribe:', email);
    setStatus('success');
    setTimeout(dismiss, 2000);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 z-10">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <div className="text-3xl mb-3">✅</div>
            <p className="text-lg font-bold text-slate-900">Thank you for subscribing!</p>
            <p className="text-sm text-gray-500 mt-1">You'll receive the latest insights from Factorix.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Newsletter</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Stay ahead in smart manufacturing</h2>
              <p className="text-sm text-gray-500 mt-2">
                From industry trends to Factorix webinars and product updates — all in your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-400 transition"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-slate-900 text-white font-semibold text-sm py-3 rounded-xl hover:bg-blue-600 transition disabled:opacity-60"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe for free'}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-3">No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}
