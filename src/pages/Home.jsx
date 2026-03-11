import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { generateId, formatDuration, totalDuration, calculateReduction } from '../utils/helpers';
import './Home.css';

const MODULES = [
  { path: '/capture', icon: '🎥', title: 'Captura', desc: 'Graba el proceso y registra cada paso' },
  { path: '/classify', icon: '🔀', title: 'Clasificación', desc: 'Separa tareas internas y externas' },
  { path: '/optimize', icon: '⚡', title: 'Optimización', desc: 'Convierte y simplifica tareas' },
  { path: '/standards', icon: '📋', title: 'Estándares', desc: 'Genera instrucciones de trabajo' },
  { path: '/dashboard', icon: '📊', title: 'Resultados', desc: 'Visualiza el impacto y mejoras' },
];

export default function Home() {
  const { state, dispatch, activeProject } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = () => {
    if (!newName.trim()) return;
    dispatch({
      type: 'CREATE_PROJECT',
      payload: { id: generateId(), name: newName.trim(), description: newDesc.trim() },
    });
    setNewName('');
    setNewDesc('');
    setShowModal(false);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (confirm('¿Eliminar este proyecto?')) {
      dispatch({ type: 'DELETE_PROJECT', payload: id });
    }
  };

  return (
    <div className="page-container animate-fade-in">
      {/* Hero */}
      <div className="home-hero">
        <h1><span className="hero-icon">⏱</span> Nexia SMED</h1>
        <p>
          Reduce los tiempos de cambio en tu proceso paso a paso.
          Graba, clasifica, optimiza y estandariza —todo desde aquí.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}>
          ＋ Nuevo Proyecto SMED
        </button>
      </div>

      {/* Quick Stats */}
      {state.projects.length > 0 && (
        <div className="quick-stats">
          <div className="glass-card stat-card">
            <span className="stat-label">Proyectos</span>
            <span className="stat-value">{state.projects.length}</span>
          </div>
          <div className="glass-card stat-card">
            <span className="stat-label">Proyecto Activo</span>
            <span className="stat-value" style={{ fontSize: '1.2rem' }}>{activeProject?.name || '—'}</span>
          </div>
          <div className="glass-card stat-card">
            <span className="stat-label">Pasos Registrados</span>
            <span className="stat-value">{activeProject?.steps?.length || 0}</span>
          </div>
        </div>
      )}

      {/* Modules */}
      <div className="section-divider"><span>Módulos SMED</span></div>
      <div className="module-cards">
        {MODULES.map(m => (
          <Link key={m.path} to={m.path} className="glass-card module-card">
            <span className="module-icon">{m.icon}</span>
            <h4>{m.title}</h4>
            <p>{m.desc}</p>
          </Link>
        ))}
      </div>

      {/* Project List */}
      <div className="section-divider"><span>Mis Proyectos</span></div>
      <div className="project-list">
        {state.projects.map(p => {
          const total = totalDuration(p.steps);
          const internal = p.steps.filter(s => s.category === 'internal' && !s.isConverted);
          const internalTime = totalDuration(internal);
          return (
            <div
              key={p.id}
              className={`glass-card project-card ${p.id === state.activeProjectId ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_ACTIVE_PROJECT', payload: p.id })}
            >
              <div className="project-info">
                <h3>{p.name}</h3>
                <div className="project-meta">
                  <span>{p.steps.length} pasos</span>
                  <span>{formatDuration(total)}</span>
                  {p.steps.some(s => s.category) && (
                    <span className="badge badge-internal">{internal.length} internas</span>
                  )}
                </div>
              </div>
              <div className="project-actions">
                {p.id === state.activeProjectId && (
                  <span className="badge badge-accent">Activo</span>
                )}
                <button className="btn btn-ghost btn-sm" onClick={(e) => handleDelete(e, p.id)}>🗑</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nuevo Proyecto SMED</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="form-group" style={{ marginBottom: 'var(--space-md)' }}>
              <label className="form-label">Nombre del proyecto</label>
              <input
                className="form-input"
                placeholder="Ej: Cambio de molde — Inyectora #5"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="form-group">
              <label className="form-label">Descripción (opcional)</label>
              <textarea
                className="form-textarea"
                placeholder="Breve descripción del proceso a mejorar..."
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                rows={3}
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleCreate} disabled={!newName.trim()}>
                Crear Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
