import React from 'react';
import SlideFlowTT from '../components/SlideFlowTT';

// PUBLIC_INTERFACE
export default function TTFlowPage() {
  /** Page container for TT Digital ID flow slide at /tt-digital-id-flow */
  return (
    <main className="container" style={{ padding: '16px' }} aria-label="TT Digital ID Flow Page">
      <header style={{ marginBottom: 12 }}>
        <h1 style={{ margin: '0 0 6px 0', color: '#111827' }}>TT Digital ID Flow</h1>
        <p style={{ margin: 0, color: '#374151' }}>
          A single-slide, designer-ready ecosystem flow with consent, issuance, verifiers, and MOSIP integration.
        </p>
      </header>
      <SlideFlowTT />
    </main>
  );
}
