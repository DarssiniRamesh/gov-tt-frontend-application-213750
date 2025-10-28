import React, { useMemo, useRef, useState, useEffect } from 'react';
import './slideFlowTT.css';

/**
 * SlideFlowTT - Trinidad & Tobago Digital ID Flow (single-slide)
 * Ocean Professional theme, 3 swimlanes, inline SVG with export (SVG/PNG),
 * WCAG AA contrast, variant overlay toggle for "Existing System".
 *
 * Diagram content (verbatim prompt summary reflected in labels):
 * - Three horizontal lanes: Phase badges left-aligned
 * - Lane 1: UTC/TSTT cards, dotted Venn 'Match & Deduplicate', Unified Citizen Registry (Provisional UID) with shield,
 *           Klefki Issuer Service, Klefki Wallet with badge, printer icon label
 * - Lane 2: Consent pill and verifier row of five equal cards with thin arrows, green checks near cards
 * - Lane 3: MOSIP Enrollment Points (fingerprint/face icons), MOSIP Core, return arrows to Registry and Wallet with upgrade badge; progress ribbon
 * - Footer ribbon with Network Operator Model and two mini-panels plus audit icon label
 * - Variant overlay toggle draws a dotted "Existing System" boundary with star markers and legend
 * - Export buttons to download SVG and PNG
 */

// Theme tokens as constants for usage inside SVG inline styles
const THEME = {
  bg: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  primary: '#2563EB',
  amber: '#F59E0B',
  success: '#10B981',
  muted: '#374151',
  border: '#e5e7eb',
};

// Helpers for titles/aria
const ariaLabel = 'TT Digital ID flow slide: three-lane ecosystem diagram';

// PUBLIC_INTERFACE
export default function SlideFlowTT() {
  /** Renders a single-slide, responsive, inline-SVG diagram with export and overlay. */

  const svgRef = useRef(null);
  const [showExistingOverlay, setShowExistingOverlay] = useState(true);
  const [width, height] = [1280, 820]; // Logical canvas; responsive via viewBox

  // Serialize the SVG to string for export
  const serializeSvg = () => {
    const svg = svgRef.current;
    if (!svg) return null;
    const clone = svg.cloneNode(true);
    // Ensure xmlns for serialization
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return new XMLSerializer().serializeToString(clone);
  };

  // PUBLIC_INTERFACE
  const handleDownloadSVG = () => {
    /** Download the inline SVG as an .svg file. */
    const s = serializeSvg();
    if (!s) return;
    const blob = new Blob([s], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tt-digital-id-flow.svg';
    link.click();
  };

  // PUBLIC_INTERFACE
  const handleDownloadPNG = async () => {
    /** Download a PNG snapshot rendered from the SVG via canvas. */
    const s = serializeSvg();
    if (!s) return;
    const svg64 = window.btoa(unescape(encodeURIComponent(s)));
    const image64 = `data:image/svg+xml;base64,${svg64}`;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = image64;

    await new Promise((res, rej) => {
      img.onload = () => res(true);
      img.onerror = (e) => rej(e);
    });

    const scale = 2; // increase for higher res
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    // Fill background to ensure opaque PNG
    ctx.fillStyle = THEME.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const png = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = png;
    link.download = 'tt-digital-id-flow.png';
    link.click();
  };

  // Icon symbols (as JSX for <defs>)
  const Symbols = useMemo(
    () => (
      <defs>
        {/* Basic drop shadow */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#11182722" />
        </filter>

        {/* Markers */}
        <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L10,3 L0,6 Z" fill={THEME.primary} />
        </marker>
        <marker id="arrow-amber" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L10,3 L0,6 Z" fill={THEME.amber} />
        </marker>
        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L10,3 L0,6 Z" fill={THEME.success} />
        </marker>

        {/* Gradients */}
        <linearGradient id="laneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eef2ff" />
        </linearGradient>

        {/* Icon set */}
        <symbol id="ic-shield" viewBox="0 0 24 24">
          <path fill={THEME.primary} d="M12 2l7 3v6c0 5.55-3.84 10.74-7 12-3.16-1.26-7-6.45-7-12V5l7-3z"/>
          <path fill="#fff" d="M10.5 12.8l-2-2 1.4-1.4 0.6 0.6 3.9-3.9 1.4 1.4z"/>
        </symbol>
        <symbol id="ic-lock" viewBox="0 0 24 24">
          <path fill={THEME.primary} d="M12 1a5 5 0 00-5 5v3H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2v-9a2 2 0 00-2-2h-2V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z"/>
        </symbol>
        <symbol id="ic-fingerprint" viewBox="0 0 24 24">
          <path fill={THEME.muted} d="M12,1A9,9 0 0,0 3,10V11.5A1.5,1.5 0 0,0 4.5,13A1.5,1.5 0 0,0 6,11.5V10A6,6 0 0,1 12,4A6,6 0 0,1 18,10V12A10,10 0 0,1 9,21H7A1,1 0 0,0 6,22A1,1 0 0,0 7,23H9A12,12 0 0,0 21,11V10A9,9 0 0,0 12,1Z" />
        </symbol>
        <symbol id="ic-face" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="#e5e7eb"/>
          <circle cx="9" cy="10" r="1.2" fill={THEME.text}/>
          <circle cx="15" cy="10" r="1.2" fill={THEME.text}/>
          <path d="M8 15c1.2 1 2.5 1.5 4 1.5s2.8-.5 4-1.5" stroke={THEME.muted} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </symbol>
        <symbol id="ic-printer" viewBox="0 0 24 24">
          <path fill={THEME.muted} d="M6 7V2h12v5H6zm12 3H6v6H4a2 2 0 01-2-2v-4a2 2 0 012-2h16a2 2 0 012 2v4a2 2 0 01-2 2h-2v-6z"/>
          <rect x="8" y="16" width="8" height="6" fill={THEME.primary} rx="1"/>
        </symbol>
        <symbol id="ic-check" viewBox="0 0 24 24">
          <path fill={THEME.success} d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.7-7.7 1.4 1.4z"/>
        </symbol>
        <symbol id="ic-star" viewBox="0 0 24 24">
          <path fill={THEME.amber} d="M12 2l3.09 6.26L22 9.27l-5 4.88L18.18 22 12 18.77 5.82 22 7 14.15l-5-4.88 6.91-1.01z"/>
        </symbol>
        <symbol id="ic-audit" viewBox="0 0 24 24">
          <path fill={THEME.muted} d="M19 3H5a2 2 0 00-2 2v14l4-2h12a2 2 0 002-2V5a2 2 0 00-2-2z"/>
          <path fill={THEME.primary} d="M7 7h10v2H7zM7 11h6v2H7z"/>
        </symbol>

        {/* Venn pattern */}
        <pattern id="vennDots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#9CA3AF" />
        </pattern>
      </defs>
    ),
    []
  );

  // Layout coordinates for lanes and items
  const lane = {
    x: 24,
    w: width - 48,
    h: 180,
    gap: 16,
  };
  const lane1 = { x: lane.x, y: 80, w: lane.w, h: lane.h };
  const lane2 = { x: lane.x, y: lane1.y + lane.h + lane.gap, w: lane.w, h: lane.h };
  const lane3 = { x: lane.x, y: lane2.y + lane.h + lane.gap, w: lane.w, h: lane.h };

  // Small reusable card component
  const Card = ({ x, y, w = 220, h = 70, title, subtitle, icon, badge, aria }) => (
    <g transform={`translate(${x}, ${y})`} role="group" aria-label={aria || title}>
      <rect width={w} height={h} rx="12" ry="12" fill="url(#cardGrad)" stroke={THEME.border} filter="url(#shadow)" />
      <g transform="translate(12, 12)">
        {icon ? <use href={`#${icon}`} width="22" height="22" /> : null}
        <text x={icon ? 30 : 0} y={14} fill={THEME.text} fontWeight="700" fontSize="14" aria-hidden="true">
          {title}
        </text>
        {subtitle ? (
          <text x={icon ? 30 : 0} y={34} fill={THEME.muted} fontSize="12">
            {subtitle}
          </text>
        ) : null}
      </g>
      {badge ? (
        <g transform={`translate(${w - 12}, -8)`} aria-hidden="true">
          <rect x="-60" y="0" width="60" height="22" rx="11" fill={THEME.primary} />
          <text x="-30" y="15" fill="#fff" fontSize="11" textAnchor="middle" fontWeight="700">
            {badge}
          </text>
        </g>
      ) : null}
    </g>
  );

  // Thin arrow helper
  const Arrow = ({ d, color = THEME.primary, marker = 'arrow-blue', dashed = false }) => (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      markerEnd={`url(#${marker})`}
      strokeDasharray={dashed ? '6 6' : undefined}
    />
  );

  // Lane header/phase badge
  const PhaseBadge = ({ x, y, label, color }) => (
    <g transform={`translate(${x}, ${y})`} role="group" aria-label={label}>
      <rect x="0" y="-24" width="220" height="28" rx="14" fill="#eef2ff" stroke={color} />
      <text x="110" y="-6" fill={THEME.text} fontSize="12" fontWeight="700" textAnchor="middle">
        {label}
      </text>
    </g>
  );

  // Existing System overlay
  const ExistingOverlay = () => {
    if (!showExistingOverlay) return null;
    return (
      <g role="group" aria-label="Existing System boundary overlay">
        <rect
          x={lane1.x + 4}
          y={lane1.y - 8}
          width={lane1.w * 0.46}
          height={lane1.h + lane.gap + lane.h + 16}
          fill="none"
          stroke={THEME.muted}
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity="0.9"
        />
        {/* Star markers */}
        <use href="#ic-star" x={lane1.x + 14} y={lane1.y - 20} width="18" height="18" />
        <use href="#ic-star" x={lane1.x + lane.w * 0.46 - 26} y={lane1.y - 20} width="18" height="18" />
        <use href="#ic-star" x={lane1.x + 14} y={lane1.y + lane.h + lane.gap + lane.h + 4} width="18" height="18" />
        <use href="#ic-star" x={lane1.x + lane.w * 0.46 - 26} y={lane1.y + lane.h + lane.gap + lane.h + 4} width="18" height="18" />

        {/* Legend */}
        <g transform={`translate(${lane1.x + 10}, ${lane1.y - 48})`}>
          <rect width="210" height="28" rx="6" fill={THEME.surface} stroke={THEME.border} />
          <use href="#ic-star" x="8" y="5" width="18" height="18" />
          <text x="32" y="19" fill={THEME.text} fontSize="12" fontWeight="700">
            Existing System
          </text>
        </g>
      </g>
    );
  };

  // Consent pill
  const ConsentPill = ({ x, y, label = 'Consent-mediated sharing' }) => (
    <g transform={`translate(${x}, ${y})`} role="group" aria-label={label}>
      <rect width="260" height="28" rx="14" fill="#DBEAFE" stroke={THEME.primary} />
      <g transform="translate(12,5)">
        <use href="#ic-lock" width="18" height="18" />
        <text x="26" y="13" fill={THEME.text} fontSize="12" fontWeight="700">{label}</text>
      </g>
    </g>
  );

  // Footer ribbon
  const FooterRibbon = () => (
    <g transform={`translate(${lane.x}, ${height - 90})`} role="group" aria-label="Network Operator Model ribbon">
      <rect width={lane.w} height="70" rx="10" fill="#EFF6FF" stroke="#BFDBFE" />
      <text x="14" y="26" fill={THEME.text} fontSize="14" fontWeight="700">
        Network Operator Model
      </text>
      <g transform="translate(14, 36)">
        <rect width="260" height="24" rx="6" fill={THEME.surface} stroke={THEME.border} />
        <text x="8" y="16" fontSize="12" fill={THEME.muted}>Interconnect & Federation</text>
      </g>
      <g transform="translate(286, 36)">
        <rect width="260" height="24" rx="6" fill={THEME.surface} stroke={THEME.border} />
        <text x="8" y="16" fontSize="12" fill={THEME.muted}>Observability & SLA</text>
      </g>
      <g transform="translate(560, 12)">
        <use href="#ic-audit" width="20" height="20" />
        <text x="26" y="16" fill={THEME.muted} fontSize="12">Audit-ready operations</text>
      </g>
    </g>
  );

  useEffect(() => {
    // ensure prefers-reduced-motion compliance if needed later
  }, []);

  return (
    <div className="tt-flow-wrap" aria-label={ariaLabel}>
      <div className="tt-flow-toolbar">
        <div className="left">
          <h1 className="tt-title">TT Digital ID — Three-lane Ecosystem Flow</h1>
          <p className="tt-subtitle">
            Ocean Professional theme — Consent-driven, privacy-preserving identity with progressive enhancement.
          </p>
        </div>
        <div className="right">
          <label className="toggle">
            <input
              type="checkbox"
              checked={showExistingOverlay}
              onChange={(e) => setShowExistingOverlay(e.target.checked)}
              aria-label="Toggle Existing System overlay"
            />
            <span>Existing System overlay</span>
          </label>
          <button className="btn" onClick={handleDownloadSVG} aria-label="Download SVG">Download SVG</button>
          <button className="btn btn-ghost" onClick={handleDownloadPNG} aria-label="Download PNG">Download PNG</button>
        </div>
      </div>

      <div className="tt-flow-stage">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby="tt-title tt-desc"
          className="tt-svg"
        >
          <title id="tt-title">TT Digital ID Flow</title>
          <desc id="tt-desc">
            Three horizontal swimlanes with badges and cards: data sources and registry with issuance to wallet,
            consent-mediated verifier interactions, MOSIP enrollment and core with return arrows.
            Existing System overlay optional. Footer ribbon shows Network Operator Model.
          </desc>

          {Symbols}

          {/* Stage background */}
          <rect x="0" y="0" width={width} height={height} fill={THEME.bg} />

          {/* Lanes */}
          <g>
            <rect x={lane1.x} y={lane1.y} width={lane1.w} height={lane1.h} fill="url(#laneGrad)" stroke={THEME.border} rx="12" />
            <rect x={lane2.x} y={lane2.y} width={lane2.w} height={lane2.h} fill="url(#laneGrad)" stroke={THEME.border} rx="12" />
            <rect x={lane3.x} y={lane3.y} width={lane3.w} height={lane3.h} fill="url(#laneGrad)" stroke={THEME.border} rx="12" />
          </g>

          {/* Phase badges (left aligned) */}
          <PhaseBadge x={lane1.x + 12} y={lane1.y + 24} label="Phase 1: Data-led EKYC" color="#93c5fd" />
          <PhaseBadge x={lane2.x + 12} y={lane2.y + 24} label="Phase 2: Service Access" color="#34d399" />
          <PhaseBadge x={lane3.x + 12} y={lane3.y + 24} label="Phase 3: Biometrics & MOSIP" color="#fde68a" />

          {/* Lane 1 contents */}
          {/* UTC and TSTT cards */}
          <Card
            x={lane1.x + 24}
            y={lane1.y + 44}
            title="UTC"
            subtitle="Data Source"
            icon="ic-check"
            aria="UTC data source"
          />
          <Card
            x={lane1.x + 24}
            y={lane1.y + 44 + 86}
            title="TSTT"
            subtitle="Telecom Data"
            icon="ic-check"
            aria="TSTT telecom data source"
          />

          {/* Venn 'Match & Deduplicate' */}
          <g transform={`translate(${lane1.x + 264}, ${lane1.y + 60})`} role="group" aria-label="Match & Deduplicate">
            <circle cx="40" cy="28" r="32" fill="url(#vennDots)" opacity="0.9" />
            <circle cx="70" cy="28" r="32" fill="url(#vennDots)" opacity="0.6" />
            <text x="40" y="74" fontSize="12" fill={THEME.muted}>Match &amp; Deduplicate</text>
          </g>

          {/* Unified Citizen Registry (Provisional UID) with shield */}
          <Card
            x={lane1.x + 400}
            y={lane1.y + 62}
            w={260}
            title="Unified Citizen Registry"
            subtitle="Provisional UID"
            icon="ic-shield"
            aria="Unified Citizen Registry — Provisional UID"
          />

          {/* Issuer and Wallet with badge and printer */}
          <Card
            x={lane1.x + 700}
            y={lane1.y + 40}
            w={240}
            title="Klefki Issuer Service"
            subtitle="VC Issuance"
            icon="ic-check"
          />
          <Card
            x={lane1.x + 970}
            y={lane1.y + 40}
            w={240}
            title="Klefki Wallet"
            subtitle="Citizen Wallet"
            icon="ic-lock"
            badge="Verified"
          />
          {/* Printer icon label near Wallet */}
          <g transform={`translate(${lane1.x + 1190}, ${lane1.y + 28})`} role="img" aria-label="Printer label">
            <use href="#ic-printer" width="22" height="22" />
            <text x="26" y="16" fontSize="12" fill={THEME.muted}>Printed card option</text>
          </g>

          {/* Arrows Lane 1 */}
          <Arrow d={`M ${lane1.x + 244} ${lane1.y + 78} L ${lane1.x + 264} ${lane1.y + 78}`} dashed />
          <Arrow d={`M ${lane1.x + 244} ${lane1.y + 78 + 86} L ${lane1.x + 264} ${lane1.y + 78 + 86}`} dashed />
          <Arrow d={`M ${lane1.x + 340} ${lane1.y + 78} L ${lane1.x + 400} ${lane1.y + 96}`} />
          <Arrow d={`M ${lane1.x + 660} ${lane1.y + 96} L ${lane1.x + 700} ${lane1.y + 96}`} />
          <Arrow d={`M ${lane1.x + 940} ${lane1.y + 96} L ${lane1.x + 970} ${lane1.y + 96}`} color={THEME.amber} marker="arrow-amber" dashed />

          {/* Lane 2: Consent + Verifiers */}
          <ConsentPill x={lane2.x + 24} y={lane2.y + 44} />

          {/* Five verifier cards row with green checks */}
          {[
            { t: 'Gov Portal QR Login' },
            { t: 'Bank / eKYC' },
            { t: 'Employer' },
            { t: 'University' },
            { t: 'Immigration / CSME' },
          ].map((v, i) => (
            <g key={v.t}>
              <Card
                x={lane2.x + 24 + i * 240}
                y={lane2.y + 96}
                w={220}
                title={v.t}
                icon="ic-check"
                aria={v.t}
              />
              {/* Thin arrow from consent to each card */}
              <Arrow
                d={`M ${lane2.x + 154} ${lane2.y + 72} L ${lane2.x + 24 + i * 240 + 20} ${lane2.y + 96}`}
                color={THEME.primary}
                marker="arrow-blue"
              />
              {/* Green check near card */}
              <use href="#ic-check" x={lane2.x + 24 + i * 240 + 194} y={lane2.y + 84} width="18" height="18" />
            </g>
          ))}

          {/* Lane 3: MOSIP Enrollment Points and MOSIP Core */}
          <Card
            x={lane3.x + 24}
            y={lane3.y + 50}
            title="MOSIP Enrollment Points"
            subtitle="Biometric capture"
            icon="ic-fingerprint"
            aria="MOSIP Enrollment Points — Biometric capture"
          />
          <use href="#ic-face" x={lane3.x + 210} y={lane3.y + 52} width="28" height="28" />
          <Card
            x={lane3.x + 310}
            y={lane3.y + 50}
            title="MOSIP Core"
            subtitle="De-duplication & Strong ID"
            icon="ic-shield"
            aria="MOSIP Core — De-duplication and Strong ID"
          />

          {/* Return arrows to Registry and Wallet with upgrade badge */}
          <Arrow
            d={`M ${lane3.x + 440} ${lane3.y + 85} C ${lane3.x + 440} ${lane2.y + 20}, ${lane1.x + 520} ${lane2.y}, ${lane1.x + 520} ${lane1.y + 100}`}
            color={THEME.amber}
            marker="arrow-amber"
          />
          <g transform={`translate(${lane1.x + 520 - 54}, ${lane1.y + 100 - 30})`}>
            <rect width="108" height="22" rx="11" fill={THEME.amber} />
            <text x="54" y="15" fill="#111827" textAnchor="middle" fontWeight="700" fontSize="12">Registry Update</text>
          </g>

          <Arrow
            d={`M ${lane3.x + 440} ${lane3.y + 85} C ${lane3.x + 700} ${lane3.y + 20}, ${lane1.x + 1040} ${lane3.y}, ${lane1.x + 1040} ${lane1.y + 100}`}
            color={THEME.success}
            marker="arrow-green"
          />
          <g transform={`translate(${lane1.x + 1040 - 44}, ${lane1.y + 100 - 30})`}>
            <rect width="88" height="22" rx="11" fill={THEME.success} />
            <text x="44" y="15" fill="#fff" textAnchor="middle" fontWeight="700" fontSize="12">Upgraded</text>
          </g>

          {/* Progress ribbon in lane 3 */}
          <g transform={`translate(${lane3.x + lane3.w - 260}, ${lane3.y + 16})`} aria-label="Progress">
            <rect width="240" height="22" rx="11" fill="#DCFCE7" stroke="#86EFAC" />
            <text x="120" y="15" fill={THEME.text} fontSize="12" fontWeight="700" textAnchor="middle">Biometrics Enrollment in Progress</text>
          </g>

          {/* Existing system overlay */}
          <ExistingOverlay />

          {/* Footer ribbon */}
          <FooterRibbon />
        </svg>
      </div>
    </div>
  );
}
