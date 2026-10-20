import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, ArrowRight, ShieldCheck, Activity, RefreshCw, Cpu, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  // Simulator States
  // 1. Fintech State
  const [marketTickRate, setMarketTickRate] = useState(250);
  const [workerActive, setWorkerActive] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(4821.5);
  const [ticksCount, setTicksCount] = useState(14820);
  const [fps, setFps] = useState(60);

  // 2. Design System State
  const [primaryHue, setPrimaryHue] = useState<'cobalt' | 'emerald' | 'amber' | 'rose'>('cobalt');
  const [radiusScale, setRadiusScale] = useState<'sm' | 'md' | 'lg'>('md');

  // 3. Cloud Nodes State
  const [nodes, setNodes] = useState([
    { id: 'lon-1', name: 'London (Primary PoP)', status: 'healthy', latency: '12ms', load: '38%' },
    { id: 'fra-2', name: 'Frankfurt (Edge Relay)', status: 'healthy', latency: '19ms', load: '45%' },
    { id: 'nyc-1', name: 'New York (US Gateway)', status: 'healthy', latency: '68ms', load: '52%' },
    { id: 'tyo-1', name: 'Tokyo (APAC Hub)', status: 'healthy', latency: '142ms', load: '61%' },
  ]);
  const [isFailingOver, setIsFailingOver] = useState(false);

  // 4. CRDT State
  const [docContent, setDocContent] = useState('Distributed systems require verifiable guarantees over subjective assumptions.');
  const [peerState, setPeerState] = useState<'Synced' | 'Reconciling'>('Synced');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Fintech live ticker loop
  useEffect(() => {
    if (!project || project.simulatorType !== 'fintech') return;
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const delta = (Math.random() - 0.49) * 2.5;
        return Number((prev + delta).toFixed(2));
      });
      setTicksCount((c) => c + 1);
      setFps(workerActive ? 59 + Math.floor(Math.random() * 2) : 42 + Math.floor(Math.random() * 8));
    }, marketTickRate);
    return () => clearInterval(interval);
  }, [project, marketTickRate, workerActive]);

  const triggerNodeFailover = () => {
    setIsFailingOver(true);
    setNodes((prev) =>
      prev.map((n) => (n.id === 'nyc-1' ? { ...n, status: 'failover-rerouting', load: '98%' } : n))
    );
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === 'nyc-1'
            ? { ...n, status: 'healthy', latency: '44ms', load: '42%' }
            : n.id === 'lon-1'
            ? { ...n, load: '56%' }
            : n
        )
      );
      setIsFailingOver(false);
    }, 1800);
  };

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60 shrink-0">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-300">Technical Case Study</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Title & Tagline */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              {project.title}
            </h2>
            <p className="text-base text-neutral-300">
              {project.tagline}
            </p>
          </div>

          {/* Media Header */}
          <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 object-cover object-center"
            />
          </div>

          {/* Unboxed Tech Stack */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-neutral-400 border-y border-neutral-800 py-3">
            <span className="text-neutral-500 font-medium">Core Stack:</span>
            {project.stack.map((tech, i) => (
              <React.Fragment key={tech}>
                <span className="text-neutral-300 font-mono">{tech}</span>
                {i < project.stack.length - 1 && (
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Section: Challenge & Architectural Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-neutral-950/70 border border-neutral-800">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-2">
                The Engineering Constraint
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-950/70 border border-neutral-800">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-2">
                The Architecture Solution
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </div>

          {/* Section: Measurable Production Outcomes */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Measurable Production Impact
            </h3>
            <div className="space-y-2.5">
              {project.impact.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-neutral-200">
                  <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* INTERACTIVE PLAYGROUND SIMULATOR */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-neutral-400" />
                  <span>Interactive Proof Simulator</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Live in-browser interactive component demonstrating core architecture behavior
                </p>
              </div>
            </div>

            {/* Simulator Container */}
            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm">
              
              {/* FINTECH SIMULATOR */}
              {project.simulatorType === 'fintech' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800/80">
                      <div className="text-neutral-400 mb-1">Live Asset Spot</div>
                      <div className="font-mono text-base font-bold text-white tabular-nums">
                        ${currentPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800/80">
                      <div className="text-neutral-400 mb-1">Buffered Ticks</div>
                      <div className="font-mono text-base font-bold text-white tabular-nums">
                        {ticksCount.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800/80">
                      <div className="text-neutral-400 mb-1">Render Loop Budget</div>
                      <div className="font-mono text-base font-bold text-emerald-400 tabular-nums">
                        {fps} FPS
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800/80">
                      <div className="text-neutral-400 mb-1">Worker Zero-Copy</div>
                      <div className="font-mono text-base font-bold text-white">
                        {workerActive ? 'Active' : 'Bypassed'}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                    <label className="flex items-center gap-2 text-neutral-300">
                      <span>Stream Frequency:</span>
                      <input
                        type="range"
                        min="50"
                        max="800"
                        step="50"
                        value={marketTickRate}
                        onChange={(e) => setMarketTickRate(Number(e.target.value))}
                        className="w-28 accent-white"
                      />
                      <span className="font-mono tabular-nums text-neutral-400">{marketTickRate}ms</span>
                    </label>

                    <button
                      onClick={() => setWorkerActive(!workerActive)}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                        workerActive
                          ? 'bg-neutral-800 text-white border border-neutral-700'
                          : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                      }`}
                    >
                      {workerActive ? 'Offscreen Worker Enabled' : 'Offscreen Worker Disabled'}
                    </button>
                  </div>
                </div>
              )}

              {/* DESIGN SYSTEM SIMULATOR */}
              {project.simulatorType === 'design-system' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="text-neutral-400">Brand Palette Token:</span>
                    <div className="flex items-center gap-1.5">
                      {(['cobalt', 'emerald', 'amber', 'rose'] as const).map((hue) => (
                        <button
                          key={hue}
                          onClick={() => setPrimaryHue(hue)}
                          className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                            primaryHue === hue
                              ? 'bg-white text-neutral-950 font-semibold'
                              : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                          }`}
                        >
                          {hue}
                        </button>
                      ))}
                    </div>

                    <span className="text-neutral-400 ml-2">Radius Scale:</span>
                    <div className="flex items-center gap-1.5">
                      {(['sm', 'md', 'lg'] as const).map((rad) => (
                        <button
                          key={rad}
                          onClick={() => setRadiusScale(rad)}
                          className={`px-2.5 py-1 rounded-md text-xs font-mono uppercase transition-colors ${
                            radiusScale === rad
                              ? 'bg-white text-neutral-950 font-semibold'
                              : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                          }`}
                        >
                          {rad}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Rendered Component Preview */}
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex flex-wrap items-center gap-4">
                    <button
                      className={`px-4 py-2 text-xs font-semibold text-white transition-all shadow-sm ${
                        primaryHue === 'cobalt'
                          ? 'bg-blue-600 hover:bg-blue-500'
                          : primaryHue === 'emerald'
                          ? 'bg-emerald-600 hover:bg-emerald-500'
                          : primaryHue === 'amber'
                          ? 'bg-amber-600 hover:bg-amber-500'
                          : 'bg-rose-600 hover:bg-rose-500'
                      } ${
                        radiusScale === 'sm'
                          ? 'rounded'
                          : radiusScale === 'md'
                          ? 'rounded-lg'
                          : 'rounded-2xl'
                      }`}
                    >
                      Primary Button Action
                    </button>

                    <input
                      type="text"
                      readOnly
                      value="Interactive Token Input"
                      className={`px-3 py-2 text-xs bg-neutral-950 border border-neutral-700 text-neutral-200 outline-none ${
                        radiusScale === 'sm'
                          ? 'rounded'
                          : radiusScale === 'md'
                          ? 'rounded-lg'
                          : 'rounded-2xl'
                      }`}
                    />

                    <div className="text-xs text-neutral-400 font-mono">
                      tokens.theme.{primaryHue}.radius_{radiusScale}
                    </div>
                  </div>
                </div>
              )}

              {/* CLOUD NODES SIMULATOR */}
              {project.simulatorType === 'cloud-nodes' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {nodes.map((node) => (
                      <div
                        key={node.id}
                        className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-white font-medium">{node.name}</div>
                          <div className="text-neutral-400 text-[11px] font-mono">
                            Latency: {node.latency} · Load: {node.load}
                          </div>
                        </div>
                        <span
                          className={`text-[11px] font-mono ${
                            node.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400 animate-pulse'
                          }`}
                        >
                          {node.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={triggerNodeFailover}
                      disabled={isFailingOver}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 rounded-lg transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isFailingOver ? 'animate-spin' : ''}`} />
                      <span>{isFailingOver ? 'Simulating Dynamic Failover...' : 'Simulate Gateway Failover'}</span>
                    </button>
                    <span className="text-xs text-neutral-400 font-mono">mTLS 1.3 Active</span>
                  </div>
                </div>
              )}

              {/* CRDT SIMULATOR */}
              {project.simulatorType === 'crdt' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Collaborative Document Buffer (Try Editing):</span>
                    <span className="font-mono text-emerald-400">State: {peerState}</span>
                  </div>

                  <textarea
                    rows={2}
                    value={docContent}
                    onChange={(e) => {
                      setDocContent(e.target.value);
                      setPeerState('Reconciling');
                      setTimeout(() => setPeerState('Synced'), 350);
                    }}
                    className="w-full p-3 text-xs font-mono bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Yjs Vector Clock: v(peer_A=142, peer_B=108) · WebRTC DataChannel Active
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Modal Footer with External Links */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Product Website</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
};
