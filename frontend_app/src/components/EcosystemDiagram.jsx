import React from 'react';
import './ecosystem.css';

// PUBLIC_INTERFACE
export default function EcosystemDiagram() {
  /** Accessible, responsive inline-SVG diagram of the Trinidad Digital ID ecosystem.
   * - Ocean Professional theme (primary #2563EB, accent #F59E0B, bg #f9fafb)
   * - Actors: UTC, TSTT, Unified Citizen Registry, Issuer (Klefki), Wallet, Verifiers (Gov Portal QR Login, Bank/eKYC, Employer, University, Immigration/CSME)
   * - Phases: Phase 1: Data-led EKYC, Phase 2: Service Access, Phase 3: Biometrics & MOSIP
   * - Flows with animated arrows and tooltips on hover/focus
   * - MOSIP biometric enrollment path included
   * - Optional printed QR noted on issuance path
   */
  const actors = [
    { id: 'utc', label: 'UTC', desc: 'Unit Trust Corporation — data source for EKYC.', x: 40, y: 120 },
    { id: 'tstt', label: 'TSTT', desc: 'Telecom source — identity/contact verification.', x: 40, y: 220 },
    { id: 'registry', label: 'Unified Citizen Registry', desc: 'Consolidated citizen identity record.', x: 320, y: 170 },
    { id: 'issuer', label: 'Issuer (Klefki)', desc: 'Issues verifiable credentials to citizens.', x: 560, y: 170 },
    { id: 'wallet', label: 'Klefki Wallet', desc: 'Holds citizen’s digital ID/VCs.', x: 800, y: 170 },
    { id: 'gov', label: 'Gov Portal (QR Login)', desc: 'Services with QR login via verifiable presentation.', x: 1040, y: 60 },
    { id: 'bank', label: 'Bank / eKYC', desc: 'Banks use data-led EKYC and ZK proofs.', x: 1040, y: 140 },
    { id: 'employer', label: 'Employer', desc: 'Verifies employment eligibility.', x: 1040, y: 220 },
    { id: 'uni', label: 'University', desc: 'Verifies student identity/records.', x: 1040, y: 300 },
    { id: 'imm', label: 'Immigration / CSME', desc: 'Cross-border verification and travel.', x: 1040, y: 380 },
    { id: 'enroll', label: 'Enrollment Points', desc: 'Biometric capture kiosks/centers.', x: 320, y: 320 },
    { id: 'mosip', label: 'MOSIP Core', desc: 'Biometric de-duplication and strong ID.', x: 560, y: 320 },
  ];

  const width = 1200;
  const height = 460;

  return (
    <div className="ecosystem-wrapper" aria-label="Trinidad Digital ID Ecosystem Diagram">
      <div className="ecosystem-header">
        <h2 className="eco-title">Trinidad Digital ID Ecosystem</h2>
        <p className="eco-subtitle">
          Phased rollout of a consent-driven, privacy-preserving digital identity using verifiable credentials and optional biometrics.
        </p>
      </div>

      <div className="phase-badges" role="group" aria-label="Phases">
        <span className="phase-badge phase-1" aria-label="Phase 1: Data-led EKYC">Phase 1: Data-led EKYC</span>
        <span className="phase-badge phase-2" aria-label="Phase 2: Service Access">Phase 2: Service Access</span>
        <span className="phase-badge phase-3" aria-label="Phase 3: Biometrics & MOSIP">Phase 3: Biometrics & MOSIP</span>
      </div>

      <div className="diagram-scroll">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby="title desc"
          className="ecosystem-svg"
        >
          <title id="title">Trinidad Digital ID Ecosystem</title>
          <desc id="desc">
            Data sources feed a unified registry, issuer provides credentials to a wallet,
            verifiers request consented presentations, and MOSIP provides biometric enrollment and strong identity binding.
          </desc>

          <defs>
            <linearGradient id="nodeSurface" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#eef2ff" />
            </linearGradient>

            <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L10,3 L0,6 Z" fill="#2563EB" />
            </marker>
            <marker id="arrow-accent" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L10,3 L0,6 Z" fill="#F59E0B" />
            </marker>

            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#11182722" />
            </filter>
          </defs>

          {/* Lanes/Background bands */}
          <rect x="0" y="0" width={width} height={height} fill="#f9fafb" />
          <rect x="0" y="90" width={width} height="160" fill="#ffffff" opacity="0.7" />
          <rect x="0" y="270" width={width} height="140" fill="#ffffff" opacity="0.7" />

          {/* Phase labels overlay */}
          <g className="phase-labels">
            <text x="10" y="30" className="phase-label">Phase 1: Data-led EKYC</text>
            <text x="10" y="120" className="phase-label">Phase 2: Service Access</text>
            <text x="10" y="300" className="phase-label">Phase 3: Biometrics & MOSIP</text>
          </g>

          {/* Nodes */}
          {actors.map((a) => (
            <g key={a.id} className="node" transform={`translate(${a.x}, ${a.y})`} tabIndex="0" aria-label={`${a.label}. ${a.desc}`}>
              <rect rx="10" ry="10" width="200" height="60" className="node-bg" />
              <rect rx="10" ry="10" width="200" height="60" className="node-outline" />
              <text x="100" y="28" className="node-title">{a.label}</text>
              <text x="100" y="45" className="node-sub">{a.desc}</text>
              <title>{`${a.label}: ${a.desc}`}</title>
            </g>
          ))}

          {/* Flows */}
          {/* UTC -> Registry */}
          <path d="M 240 150 L 320 150" className="flow" markerEnd="url(#arrow)">
            <title>UTC data to Unified Citizen Registry (consent + data-led EKYC)</title>
          </path>
          {/* TSTT -> Registry */}
          <path d="M 240 250 L 320 250" className="flow" markerEnd="url(#arrow)">
            <title>TSTT verification data to Unified Citizen Registry</title>
          </path>
          {/* Registry -> Issuer */}
          <path d="M 520 170 L 560 170" className="flow flow-animated" markerEnd="url(#arrow)">
            <title>Verified registry profile to Issuer (Klefki)</title>
          </path>
          {/* Issuer -> Wallet (include printed QR note) */}
          <path d="M 760 170 L 800 170" className="flow flow-accent flow-animated" markerEnd="url(#arrow-accent)">
            <title>Issuance to Wallet (verifiable credentials). Optional printed QR for offline.</title>
          </path>
          <text x="700" y="160" className="tiny-note">Optional printed QR</text>

          {/* Wallet -> Verifiers */}
          <path d="M 1000 80 L 1040 80" className="flow flow-animated" markerEnd="url(#arrow)">
            <title>Wallet presentation to Government Portal via QR login</title>
          </path>
          <path d="M 1000 160 L 1040 160" className="flow flow-animated" markerEnd="url(#arrow)">
            <title>Wallet presentation to Bank/eKYC</title>
          </path>
          <path d="M 1000 240 L 1040 240" className="flow flow-animated" markerEnd="url(#arrow)">
            <title>Wallet presentation to Employer</title>
          </path>
          <path d="M 1000 320 L 1040 320" className="flow flow-animated" markerEnd="url(#arrow)">
            <title>Wallet presentation to University</title>
          </path>
          <path d="M 1000 400 L 1040 400" className="flow flow-animated" markerEnd="url(#arrow)">
            <title>Wallet presentation to Immigration/CSME (cross-border)</title>
          </path>

          {/* Wallet hub line to verifiers */}
          <path d="M 900 170 C 940 170, 960 60, 1000 60" className="flow" markerEnd="url(#arrow)">
            <title>Presentation router to verifiers</title>
          </path>
          <path d="M 900 170 C 940 170, 960 140, 1000 140" className="flow" markerEnd="url(#arrow)" />
          <path d="M 900 170 C 940 170, 960 220, 1000 220" className="flow" markerEnd="url(#arrow)" />
          <path d="M 900 170 C 940 170, 960 300, 1000 300" className="flow" markerEnd="url(#arrow)" />
          <path d="M 900 170 C 940 170, 960 380, 1000 380" className="flow" markerEnd="url(#arrow)" />

          {/* MOSIP enrollment path */}
          {/* Enrollment -> MOSIP */}
          <path d="M 520 320 L 560 320" className="flow flow-bio flow-animated" markerEnd="url(#arrow-accent)">
            <title>Biometric capture flows into MOSIP Core</title>
          </path>
          {/* MOSIP -> Registry */}
          <path d="M 560 320 C 560 260, 420 240, 420 200" className="flow flow-bio" markerEnd="url(#arrow-accent)">
            <title>MOSIP strengthens identity in Registry (de-duplication)</title>
          </path>
          {/* MOSIP -> Wallet */}
          <path d="M 560 320 C 650 280, 760 220, 800 200" className="flow flow-bio flow-animated" markerEnd="url(#arrow-accent)">
            <title>Upgrades wallet credential to biometrics-bound ID</title>
          </path>

          {/* Icons/legend markers near wallet to denote consent/ZKP */}
          <circle cx="835" cy="150" r="6" className="legend-consent" />
          <text x="845" y="154" className="tiny-note">Consent & ZKP based sharing</text>
        </svg>
      </div>

      <div className="legend" aria-label="Legend">
        <h3 className="legend-title">Legend</h3>
        <ul className="legend-list">
          <li><span className="legend-chip legend-consent" aria-hidden="true" /> Consent</li>
          <li><span className="legend-chip legend-zkp" aria-hidden="true" /> Zero-Knowledge Proof (ZKP)</li>
          <li><span className="legend-chip legend-verify" aria-hidden="true" /> Verification Flow</li>
          <li><span className="legend-chip legend-bio" aria-hidden="true" /> Biometrics (MOSIP)</li>
        </ul>
        <p className="legend-note">Flows animate subtly to indicate direction. Hover or focus nodes/edges for details.</p>
      </div>
    </div>
  );
}
