import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Capture from './pages/Capture';
import Classification from './pages/Classification';
import Optimization from './pages/Optimization';
import Standards from './pages/Standards';
import Dashboard from './pages/Dashboard';
import Manual from './pages/Manual';

export default function App() {
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
        </Routes>
      </main>
    </>
  );
}
