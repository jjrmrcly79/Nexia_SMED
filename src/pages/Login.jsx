import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        const { user } = await signUp(email, password, fullName);
        if (!user?.confirmed_at) {
          setMessage('Revisa tu correo para confirmar tu cuenta.');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        {/* Logo / Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="url(#lg)" />
              <path d="M10 28L20 12L30 28H10Z" fill="white" fillOpacity="0.9"/>
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="login-app-name">Nexia SMED</h1>
          <p className="login-tagline">Reducción inteligente de tiempos de cambio</p>
        </div>

        {/* Toggle */}
        <div className="login-toggle">
          <button
            className={mode === 'login' ? 'active' : ''}
            onClick={() => { setMode('login'); setError(null); setMessage(null); }}
          >
            Iniciar sesión
          </button>
          <button
            className={mode === 'signup' ? 'active' : ''}
            onClick={() => { setMode('signup'); setError(null); setMessage(null); }}
          >
            Crear cuenta
          </button>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="login-field">
              <label htmlFor="fullName">Nombre completo</label>
              <input
                id="fullName"
                type="text"
                placeholder="Juan García"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required={mode === 'signup'}
                autoComplete="name"
              />
            </div>
          )}
          <div className="login-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@empresa.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className="login-error">⚠ {error}</p>}
          {message && <p className="login-success">✓ {message}</p>}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading
              ? 'Procesando…'
              : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
        </form>

        <p className="login-footer">Nexia Soluciones © 2025</p>
      </div>
    </div>
  );
}
