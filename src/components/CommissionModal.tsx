import { useState } from 'react';
import { X, Send, CheckCircle2, Mail, Copy, Check } from 'lucide-react';

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommissionModal({ isOpen, onClose }: CommissionModalProps) {
  const [mandate, setMandate] = useState<string>('tender');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `LC-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(id);
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lichenshu@email.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setOrganization('');
    setContact('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0E0E14] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#E62A2A] mb-2">
              DIRECT COMMISSION DOSSIER
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Initiate Strategic Mandate
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Direct dialogue with Li Chenshu for turnkey execution, competitive tender leadership, or curatorial commissions.
            </p>

            {/* Direct Contact Bar */}
            <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4 text-[#E62A2A]" />
                <span>lichenshu@email.com</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 hover:border-white text-white/70 hover:text-white transition-all cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Mandate Selector */}
              <div>
                <label className="block font-mono text-xs text-white/50 uppercase tracking-wider mb-2">
                  Collaboration Nature
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'tender', label: 'Tender Lead' },
                    { key: 'curation', label: 'Spatial Curation' },
                    { key: 'popup', label: 'Brand Pop-Up' },
                    { key: 'advisory', label: 'Jury / Advisory' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setMandate(item.key)}
                      className={`p-2.5 rounded-xl text-center text-xs font-mono transition-all border cursor-pointer ${
                        mandate === item.key
                          ? 'bg-[#E62A2A] text-white border-[#E62A2A] font-semibold'
                          : 'bg-white/[0.02] text-white/60 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-white/50 uppercase tracking-wider mb-1.5">
                    Your Name / Lead *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Director Chen"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E62A2A] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-white/50 uppercase tracking-wider mb-1.5">
                    Organization / Client *
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Swire Properties / Municipal Group"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E62A2A] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-white/50 uppercase tracking-wider mb-1.5">
                  Direct Email / Mobile *
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="name@domain.com or +86 ..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E62A2A] transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-white/50 uppercase tracking-wider mb-1.5">
                  Project Context & Target Timeline
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Briefly outline the site topography, architectural challenge, or tender date..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E62A2A] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#E62A2A] hover:bg-[#ff3b3b] text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(230,42,42,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Dispatch Commission Dossier</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E62A2A]/20 border border-[#E62A2A] flex items-center justify-center mx-auto text-[#E62A2A]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E62A2A]">
                DOSSIER LOGGED // {ticketId}
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-2">
                Commission Inquiry Received
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                Thank you, {name} ({organization}). A direct response and feasibility brief will be dispatched within 24 hours.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 max-w-md mx-auto text-left font-mono text-xs space-y-2 text-white/60">
              <div className="flex justify-between">
                <span>REFERENCE:</span>
                <span className="text-white">{ticketId}</span>
              </div>
              <div className="flex justify-between">
                <span>DIRECT EMAIL:</span>
                <span className="text-white">lichenshu@email.com</span>
              </div>
              <div className="flex justify-between">
                <span>LOCATION:</span>
                <span className="text-white">Shanghai, China</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Return to Monograph
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
