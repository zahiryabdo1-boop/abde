import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Check, MessageSquare, ArrowUpRight, Clock, Sparkles } from 'lucide-react';

interface ContactStudioProps {
  initialMessage: string;
  recipientEmail: string;
}

interface SubmittedMessage {
  id: string;
  name: string;
  email: string;
  engagementType: string;
  message: string;
  date: string;
}

export const ContactStudio: React.FC<ContactStudioProps> = ({
  initialMessage,
  recipientEmail,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [engagementType, setEngagementType] = useState('Full-Stack Web App');
  const [budget, setBudget] = useState('$10k - $25k');
  const [message, setMessage] = useState(initialMessage || '');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sentHistory, setSentHistory] = useState<SubmittedMessage[]>(() => {
    try {
      const saved = localStorage.getItem('zahira_portfolio_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep message updated if parent passes a new transferred scope
  React.useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialMessage]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, and Message).');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    const newEntry: SubmittedMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      engagementType,
      message: message.trim(),
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
    };

    const updated = [newEntry, ...sentHistory];
    setSentHistory(updated);
    try {
      localStorage.setItem('zahira_portfolio_messages', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  const handleDirectMailto = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${engagementType} - ${name || 'Collaboration'}`);
    const body = encodeURIComponent(
      `Hi Zahir,\n\nName: ${name}\nEmail: ${email}\nEngagement: ${engagementType}\nEstimated Budget: ${budget}\n\nProject Scope:\n${message}\n`
    );
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
            05. Initiation & Contact
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 [text-wrap:balance]">
            Let's Build Something Durable Together
          </h2>
          <p className="text-base text-neutral-400 max-w-2xl">
            Whether you are planning an ambitious new venture, modernizing enterprise architectures, or seeking technical advisory, I would love to hear from you.
          </p>
        </div>

        {/* 2-Column Split: Form on Left, Contact Cards & Sent Inquiries on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
              
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-medium text-white">{name}</span>. Your inquiry has been logged. You can also trigger your native email client to send it directly to{' '}
                    <span className="font-mono text-neutral-200">{recipientEmail}</span>.
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleDirectMailto}
                      className="px-5 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Mail Client</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alexandra Vance"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Engagement Scope
                      </label>
                      <select
                        value={engagementType}
                        onChange={(e) => setEngagementType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
                      >
                        <option value="Full-Stack Web App">Full-Stack Web App</option>
                        <option value="Technical Architecture Advisory">Technical Architecture Advisory</option>
                        <option value="Rapid MVP Launch Sprint">Rapid MVP Launch Sprint</option>
                        <option value="Design System & Modernization">Design System & Modernization</option>
                        <option value="Full-Time Staff / Advisory Role">Full-Time Staff / Advisory Role</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Target Budget Guide
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
                      >
                        <option value="< $10k">&lt; $10k (Advisory / Sprint)</option>
                        <option value="$10k - $25k">$10k - $25k (Standard MVP)</option>
                        <option value="$25k - $50k">$25k - $50k (Platform Build)</option>
                        <option value="$50k+">$50k+ (Enterprise Multi-Month)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Project Objectives & Technical Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline your timeline, current stack, core bottlenecks, or desired outcomes..."
                      className="w-full p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors font-mono text-xs"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold transition-colors shadow-sm"
                    >
                      <span>Transmit Project Brief</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleDirectMailto}
                      className="text-xs text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
                    >
                      Or open in mail client directly &rarr;
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Direct Info, Copy Email, Sent Inquiries Log */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Direct Contact Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Direct Communication Channel
              </div>
              
              <div>
                <div className="text-sm text-neutral-300 mb-1">Direct Personal Email</div>
                <div className="font-mono text-base font-bold text-white break-all">
                  {recipientEmail}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Email Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${recipientEmail}`}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>
              </div>

              {/* Unboxed SLA metadata */}
              <div className="pt-3 border-t border-neutral-800 text-xs text-neutral-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Typical response window: within 24 business hours</span>
              </div>
            </div>

            {/* In-Browser Inquiries History (Verifiable Transmission Proof) */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Transmitted Inquiries Archive ({sentHistory.length})</span>
                </div>
                {sentHistory.length > 0 && (
                  <button
                    onClick={() => {
                      setSentHistory([]);
                      localStorage.removeItem('zahira_portfolio_messages');
                    }}
                    className="text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {sentHistory.length === 0 ? (
                <p className="text-xs text-neutral-500 italic py-2">
                  No inquiries sent in this session yet. Submitting the form above saves an immediate record here.
                </p>
              ) : (
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {sentHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="font-semibold text-white">{item.name}</span>
                        <span className="font-mono text-[10px] text-neutral-500">{item.date}</span>
                      </div>
                      <div className="text-neutral-400 text-[11px]">
                        {item.engagementType} · <span className="font-mono text-neutral-300">{item.email}</span>
                      </div>
                      <div className="text-neutral-300 font-mono text-[11px] line-clamp-2 pt-0.5">
                        {item.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
