import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import EcosystemPage from './pages/EcosystemPage';
import logo from './logo.svg';
import './App.css';

function Home() {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <img src={logo} className="App-logo" alt="logo" />
      <h2 style={{ marginTop: 12 }}>Welcome</h2>
      <p>Edit <code>src/App.js</code> and save to reload.</p>
      <p>Use the navigation to view the new Ecosystem diagram.</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function RouterApp() {
  /** App shell with header navigation and routes. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <BrowserRouter>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header className="navbar" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="/" aria-label="Go to home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <img src={logo} alt="Logo" style={{ width: 32, height: 32 }} />
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Gov TT</span>
            </Link>
            <nav aria-label="Main">
              <ul style={{ display: 'flex', gap: 12, listStyle: 'none', margin: 0, padding: 0 }}>
                <li><Link to="/ecosystem" className="App-link">Ecosystem</Link></li>
              </ul>
            </nav>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </header>

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ecosystem" element={<EcosystemPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <footer style={{ padding: 12, textAlign: 'center', color: '#6b7280', borderTop: '1px solid var(--border-color)' }}>
          <small>© {new Date().getFullYear()} Gov TT</small>
        </footer>
      </div>
    </BrowserRouter>
  );
}
