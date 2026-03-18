import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Capture from './pages/Capture';
import Classification from './pages/Classification';
import Optimization from './pages/Optimization';
import Standards from './pages/Standards';
import Dashboard from './pages/Dashboard';
import Manual from './pages/Manual';
import About from './pages/About';
import Login from './pages/Login';

function ProtectedLayout() {
  return (
    <>
      <Sidebar />
      <main className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/classify" element={<Classification />} />
          <Route path="/optimize" element={<Optimization />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0c29, #302b63)',
        color: '#fff',
        fontSize: '1.1rem',
        gap: '0.75rem',
      }}>
        <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
        Cargando…
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={session ? <Navigate to="/" replace /> : <Login />} />
      <Route
        path="/*"
        element={session ? <ProtectedLayout /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}
