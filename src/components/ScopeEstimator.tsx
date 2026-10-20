import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Clock, DollarSign, Sparkles } from 'lucide-react';
import { SCOPE_TIERS, SCOPE_ADDONS } from '../data/portfolioData';

interface ScopeEstimatorProps {
  onTransferToContact: (scopeSummary: string) => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({ onTransferToContact }) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('mvp');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['websockets']);
  const [urgencyMultiplier, setUrgencyMultiplier] = useState<number>(1.0);

  const currentTier = SCOPE_TIERS.find((t) => t.id === selectedTierId) || SCOPE_TIERS[0];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const addonsTotalCost = selectedAddons.reduce((acc, id) => {
    const addon = SCOPE_ADDONS.find((a) => a.id === id);
    return acc + (addon ? addon.cost : 0);
  }, 0);

  const addonsTotalDays = selectedAddons.reduce((acc, id) => {
    const addon = SCOPE_ADDONS.find((a) => a.id === id);
    return acc + (addon ? addon.timeDays : 0);
  }, 0);

  const estimatedCost = Math.round((currentTier.baseCost + addonsTotalCost) * urgencyMultiplier);
  const estimatedWeeks = Math.ceil(currentTier.timelineWeeks + addonsTotalDays / 5);

  const handleTransfer = () => {
    const selectedAddonNames = selectedAddons
      .map((id) => SCOPE_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const summary = `Project Scope Estimate:
- Engagement Package: ${currentTier.name}
- Target Timeline: ~${estimatedWeeks} Weeks (${urgencyMultiplier > 1 ? 'Expedited Rush' : 'Standard Pace'})
- Technical Add-ons: ${selectedAddonNames || 'None selected'}
- Estimated Investment Range: ~$${estimatedCost.toLocaleString()} USD
- Objectives & Requirements: `;

    onTransferToContact(summary);
  };

  return (
    <section id="estimator" className="py-20 md:py-28 border-b border-neutral-800/60 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Heading */}
        <div className="mb-12">
          <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
            02. Services & Engineering Scope
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 [text-wrap:balance]">
            Interactive Scope & Investment Estimator
          </h2>
          <p className="text-base text-neutral-400 max-w-2xl">
            Configure technical deliverables, timeline constraints, and architectural add-ons to forecast project investment transparently.
          </p>
        </div>

        {/* 2-Column Calculator Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Configuration Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Engagement Tier Selection */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                1. Select Engagement Foundation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SCOPE_TIERS.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-neutral-900 border-white text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      <div className="text-sm font-semibold mb-1 text-white">{tier.name}</div>
                      <div className="text-xs text-neutral-400 font-mono mb-2">
                        ~{tier.timelineWeeks} Weeks Timeline
                      </div>
                      <div className="text-xs font-mono font-medium text-neutral-300">
                        From ${tier.baseCost.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Tier Deliverables Overview */}
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div className="text-xs font-semibold text-neutral-300 mb-2">
                Included Deliverables for {currentTier.name}:
              </div>
              <p className="text-xs text-neutral-400 mb-3">{currentTier.idealFor}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentTier.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Architecture & Feature Add-ons */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                2. Technical Capabilities & Add-Ons
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SCOPE_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-lg text-left border flex items-center justify-between text-xs transition-colors ${
                        isChecked
                          ? 'bg-neutral-900 border-neutral-600 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked ? 'bg-white border-white text-neutral-950' : 'border-neutral-700 bg-neutral-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium text-neutral-200">{addon.name}</span>
                      </div>
                      <span className="font-mono text-neutral-400 tabular-nums">+${addon.cost}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Pace & Urgency */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                3. Delivery Cadence
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  onClick={() => setUrgencyMultiplier(1.0)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    urgencyMultiplier === 1.0
                      ? 'bg-neutral-900 border-white text-white font-medium'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-medium text-neutral-200">Standard Production Pace</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">Recommended agile 2-week iterations</div>
                </button>
                <button
                  onClick={() => setUrgencyMultiplier(1.25)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    urgencyMultiplier === 1.25
                      ? 'bg-neutral-900 border-white text-white font-medium'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-medium text-neutral-200">Expedited Sprint (+25%)</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">Priority daily standups & rapid deployment</div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Investment Summary */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-6">
              
              <div>
                <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">
                  Scope Calculation Output
                </div>
                <div className="font-display text-2xl font-bold text-white">
                  Estimated Project Baseline
                </div>
              </div>

              {/* Numerical Metrics */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Estimated Investment</span>
                  <span className="font-display text-2xl font-bold text-white font-mono tabular-nums">
                    ${estimatedCost.toLocaleString()} <span className="text-xs font-normal text-neutral-400">USD</span>
                  </span>
                </div>
                <div className="h-px bg-neutral-800/80" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Production Timeline</span>
                  <span className="font-mono text-neutral-200 font-medium">~{estimatedWeeks} Business Weeks</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Included Capabilities</span>
                  <span className="font-mono text-neutral-200 font-medium">{selectedAddons.length + 5} Modules</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Base Scope ({currentTier.name})</span>
                  <span className="font-mono tabular-nums">${currentTier.baseCost.toLocaleString()}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Technical Add-ons ({selectedAddons.length})</span>
                    <span className="font-mono tabular-nums">+${addonsTotalCost.toLocaleString()}</span>
                  </div>
                )}
                {urgencyMultiplier > 1 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Priority Rush Surge</span>
                    <span className="font-mono tabular-nums">+25%</span>
                  </div>
                )}
              </div>

              {/* Transfer Button */}
              <button
                onClick={handleTransfer}
                className="w-full py-3 px-4 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Transfer Scope to Contact Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
                Estimates serve as transparent project guidelines. Final architecture contracts are customized following an initial technical discovery session.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
