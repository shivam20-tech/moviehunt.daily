'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Clapperboard, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.refresh();
        router.push('/admin/overview');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          padding: '40px 36px',
          backgroundColor: '#0d0d12',
          border: '1px solid rgba(229,169,60,0.15)',
          borderRadius: 16,
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: 'rgba(229,169,60,0.1)',
              border: '1px solid rgba(229,169,60,0.2)',
              marginBottom: 14,
            }}
          >
            <Clapperboard size={22} style={{ color: '#e5a93c' }} />
          </div>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#f4f4f0',
              margin: '0 0 4px',
              letterSpacing: '0.02em',
            }}
          >
            MOVIE<span style={{ color: '#e5a93c' }}>HUNT</span>
          </h1>
          <p
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              margin: 0,
            }}
          >
            Admin Access
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Password field */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 8,
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={14}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.25)',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '11px 42px 11px 38px',
                  backgroundColor: '#0a0a0f',
                  border: `1px solid ${error ? 'rgba(255,107,107,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  color: '#f4f4f0',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 150ms ease',
                }}
                onFocus={(e) => {
                  if (!error) e.target.style.borderColor = 'rgba(229,169,60,0.5)';
                }}
                onBlur={(e) => {
                  if (!error) e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.25)',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p
              style={{
                fontSize: '0.78rem',
                color: '#ff6b6b',
                margin: '-8px 0 16px',
                padding: '8px 12px',
                backgroundColor: 'rgba(255,107,107,0.08)',
                borderRadius: 6,
                border: '1px solid rgba(255,107,107,0.2)',
              }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading || !password ? 'rgba(229,169,60,0.4)' : '#e5a93c',
              color: '#0a0a0f',
              border: 'none',
              borderRadius: 8,
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            {loading ? 'Verifying...' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  );
}
