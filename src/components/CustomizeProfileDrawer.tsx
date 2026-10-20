import React, { useState } from 'react';
import { X, RotateCcw, Check, User, Mail, MapPin, Briefcase } from 'lucide-react';
import { ProfileData, INITIAL_PROFILE } from '../data/portfolioData';

interface CustomizeProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSaveProfile: (updated: ProfileData) => void;
  onResetDefaults: () => void;
}

export const CustomizeProfileDrawer: React.FC<CustomizeProfileDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync state when profile prop changes
  React.useEffect(() => {
    setFormData(profile);
  }, [profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    onResetDefaults();
    setFormData(INITIAL_PROFILE);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full overflow-y-auto flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-neutral-800 bg-neutral-950/70 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-display text-lg font-bold text-white tracking-tight">
              Personalize Portfolio Data
            </h3>
            <p className="text-xs text-neutral-400">
              Customize your profile details in real-time
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1 overflow-y-auto">
          {savedNotice && (
            <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Profile details updated and stored in local memory!</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Full Display Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Professional Role & Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Kicker / Discipline Subtitle
            </label>
            <input
              type="text"
              value={formData.kicker}
              onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Primary Direct Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Location & Work Preference
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Availability Status Tagline
            </label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Lead Hero Introduction (Short Bio)
            </label>
            <textarea
              rows={3}
              value={formData.shortBio}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              className="w-full p-3 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-600 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium text-xs transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 text-[11px] text-neutral-500 text-center">
          Persisted locally in your browser storage.
        </div>
      </div>
    </div>
  );
};
