import React from 'react';
import EcosystemDiagram from '../components/EcosystemDiagram';

// PUBLIC_INTERFACE
export default function EcosystemPage() {
  /** Page-level container for the Ecosystem diagram with descriptive intro. */
  return (
    <main className="container" style={{ padding: '16px' }} aria-label="Ecosystem Page">
      <header style={{ marginBottom: 12 }}>
        <h1 style={{ margin: '0 0 6px 0', color: '#111827' }}>Digital ID Ecosystem</h1>
        <p style={{ margin: 0, color: '#374151' }}>
          Explore how data sources, the unified registry, issuers, wallets, and service verifiers
          connect through consented, privacy-preserving flows. Biometric enrollment via MOSIP
          strengthens identities in later phases.
        </p>
      </header>
      <EcosystemDiagram />
    </main>
  );
}
