'use client';
import { useState, useEffect } from 'react';

interface ContactFormProps {
  lang: 'EN' | 'KR';
}

const KR_AREA_CODES = ['02', '010', '011'];
const EN_MESSENGERS = ['WhatsApp', 'WeChat'];

const inputCls = 'w-full bg-white rounded-xl px-4 py-3 text-sm border-none focus:ring-2 focus:ring-slate-400 outline-none transition';
const selectCls = 'bg-white rounded-xl px-4 py-3 text-sm border-none focus:ring-2 focus:ring-slate-400 outline-none transition shrink-0';

export default function ContactForm({ lang }: ContactFormProps) {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactPrefix, setContactPrefix] = useState<string>(lang === 'KR' ? '02' : 'WhatsApp');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    setContactPrefix(lang === 'KR' ? '02' : 'WhatsApp');
    setContactNumber('');
    setCountry('');
    setStatus('idle');
  }, [lang]);

  const getContactPlaceholder = () => {
    if (lang === 'KR') return '000-0000-0000';
    return contactPrefix === 'WhatsApp' ? '+82 10-0000-0000' : 'WeChat ID or phone number';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const contact = contactNumber.trim() ? `${contactPrefix} ${contactNumber.trim()}` : '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company,
          name,
          email,
          contact,
          message,
          country: lang === 'KR' ? '한국' : country,
          lang,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed');

      setStatus('success');
      setCompany('');
      setName('');
      setEmail('');
      setContactPrefix(lang === 'KR' ? '02' : 'WhatsApp');
      setContactNumber('');
      setMessage('');
      setCountry('');
    } catch {
      setStatus('error');
    }
  };

  const isKR = lang === 'KR';

  const labels = {
    section: 'Contact Us',
    heading: isKR ? '오늘 문의해 주세요' : 'Get in touch today',
    company: isKR ? '기업 또는 단체명' : 'Company / Organization',
    name: isKR ? '담당자명' : 'Contact Person',
    email: isKR ? '이메일' : 'Email',
    contact: isKR ? '연락처' : 'Contact',
    message: isKR ? '문의내용' : 'Inquiry',
    country: isKR ? '국가' : 'Country',
    submit: isKR ? '문의 보내기' : 'Send message',
    sending: isKR ? '전송 중...' : 'Sending...',
    successMsg: isKR ? '문의가 성공적으로 접수되었습니다!' : 'Message sent successfully!',
    errorMsg: isKR ? '오류가 발생했습니다. 다시 시도해 주세요.' : 'Something went wrong. Please try again.',
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{labels.section}</span>
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-950">{labels.heading}</h2>
        <div className="space-y-4 text-sm text-gray-600 pt-4 font-light">
          <p className="flex items-center gap-3">✉️ info.global@factorix.com</p>
          <p className="flex items-center gap-3">📞 +82 (0)2-555-1234</p>
          <p className="flex items-center gap-3">📍 Head Office: Premier Campus, Dakeu-vally, Seoul, Republic of Korea</p>
        </div>
      </div>

      <div className="bg-[#EAEAEA] rounded-2xl p-8 shadow-inner">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-xs font-semibold text-gray-700 mb-1">
              {labels.company} <span className="text-red-400">*</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              className={inputCls}
              required
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-700 mb-1">
              {labels.name} <span className="text-red-400">*</span>
            </label>
            <input
              id="contact-name"
              name="contact-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className={inputCls}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
              {labels.email} <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputCls}
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact-number" className="block text-xs font-semibold text-gray-700 mb-1">{labels.contact}</label>
            <div className="flex gap-2">
              <select
                id="contact-prefix"
                name="contact-prefix"
                value={contactPrefix}
                onChange={e => setContactPrefix(e.target.value)}
                className={selectCls}
              >
                {isKR
                  ? KR_AREA_CODES.map(c => <option key={c} value={c}>{c}</option>)
                  : EN_MESSENGERS.map(m => <option key={m} value={m}>{m}</option>)
                }
              </select>
              <input
                id="contact-number"
                name="contact-number"
                type="text"
                value={contactNumber}
                onChange={e => setContactNumber(e.target.value)}
                placeholder={getContactPlaceholder()}
                className={inputCls}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1">
              {labels.message} <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              className={`${inputCls} resize-none`}
              required
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-xs font-semibold text-gray-700 mb-1">{labels.country}</label>
            {isKR ? (
              <input
                id="country"
                name="country"
                type="text"
                value="한국"
                disabled
                className={`${inputCls} opacity-60 cursor-not-allowed`}
              />
            ) : (
              <input
                id="country"
                name="country"
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                placeholder="e.g. China, Japan, Singapore..."
                className={inputCls}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full md:w-auto bg-slate-950 text-white font-medium text-sm px-6 py-3 rounded-xl hover:bg-blue-600 transition disabled:opacity-60"
          >
            {status === 'loading' ? labels.sending : labels.submit}
          </button>

          {status === 'success' && (
            <p className="text-sm text-green-600 font-medium">{labels.successMsg}</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-500 font-medium">{labels.errorMsg}</p>
          )}
        </form>
      </div>
    </section>
  );
}
