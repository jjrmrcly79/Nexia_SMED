import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { formatDuration, totalDuration, exportToJSON, exportToCSV } from '../utils/helpers';
import './Standards.css';

export default function Standards() {
  const { activeProject, dispatch } = useApp();
  const steps = activeProject?.steps || [];
  const [checked, setChecked] = useState({});
  const [stepNotes, setStepNotes] = useState({});

  // Build SOP phases
  const sopPhases = useMemo(() => {
    const preSetup = steps.filter(s => s.category === 'external' || s.isConverted);
    const internal = steps.filter(s => s.category === 'internal' && !s.isConverted);
    return { preSetup, internal };
  }, [steps]);

  const totalSteps = steps.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const checkProgress = totalSteps > 0 ? Math.round((checkedCount / totalSteps) * 100) : 0;

  const toggleCheck = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNoteChange = (id, note) => {
    setStepNotes(prev => ({ ...prev, [id]: note }));
    dispatch({ type: 'UPDATE_STEP', payload: { id, notes: note } });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    if (activeProject) exportToJSON(activeProject);
  };

  const handleExportCSV = () => {
    if (steps.length > 0) exportToCSV(steps, `sop-${activeProject?.name || 'proyecto'}`);
  };

  if (!activeProject) {
    return (
      <div className="page-container animate-fade-in">
        <div className="empty-state">
          <span className="empty-state-icon">📋</span>
          <h2>Sin proyecto activo</h2>
          <p>Crea o selecciona un proyecto en la página de Inicio.</p>
        </div>
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <div className="page-container animate-fade-in">
        <div className="page-header"><h1>📋 Creador de Estándares</h1></div>
        <div className="empty-state">
          <span className="empty-state-icon">📝</span>
          <h3>Sin pasos registrados</h3>
          <p>Registra pasos, clasifícalos y optimízalos primero.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>📋 Creador de Estándares</h1>
          <p className="page-subtitle">
            Instrucciones de trabajo digitales generadas a partir del flujo optimizado.
          </p>
        </div>
      </div>

      {/* SOP Header */}
      <div className="sop-header">
        <div>
          <h2>SOP: {activeProject.name}</h2>
          <div className="sop-meta">
            <span>📅 {new Date(activeProject.createdAt).toLocaleDateString('es')}</span>
            <span>📝 {steps.length} pasos</span>
            <span>⏱ Tiempo objetivo: {formatDuration(totalDuration(steps))}</span>
          </div>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary btn-sm" onClick={handlePrint}>🖨 Imprimir</button>
        </div>
      </div>

      {/* Checklist Progress */}
      <div className="checklist-progress">
        <span className="checklist-progress-text">
          Progreso: {checkedCount}/{totalSteps}
        </span>
        <div className="progress-bar" style={{ flex: 1 }}>
          <div className="progress-bar-fill green" style={{ width: `${checkProgress}%` }} />
        </div>
        <span className="checklist-progress-text">{checkProgress}%</span>
      </div>

      {/* Phase 1: Pre-Setup External */}
      {sopPhases.preSetup.length > 0 && (
        <div className="glass-card sop-phase animate-fade-in">
          <h3>
            <span style={{ color: 'var(--color-green)' }}>✅</span>
            Fase 1 — Preparación Externa
            <span className="badge badge-green">{sopPhases.preSetup.length} pasos</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
            Realizar ANTES de detener la máquina / proceso.
          </p>

          {sopPhases.preSetup.map((step, i) => (
            <div key={step.id} className={`checklist-item ${checked[step.id] ? 'checked' : ''}`}>
              <div
                className={`checklist-checkbox ${checked[step.id] ? 'checked' : ''}`}
                onClick={() => toggleCheck(step.id)}
              >
                {checked[step.id] ? '✓' : ''}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="checklist-text" style={{ fontWeight: 500, color: 'var(--color-text-bright)' }}>
                    {i + 1}. {step.name}
                  </span>
                  <span className="step-duration">{formatDuration(step.simplifiedDuration || step.duration)}</span>
                </div>
                {step.isConverted && (
                  <span className="badge badge-converted" style={{ marginTop: 4 }}>Convertida de Interna</span>
                )}
                {step.conversionNote && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
                    💡 {step.conversionNote}
                  </p>
                )}
                <div className="step-notes-input">
                  <input
                    className="form-input"
                    style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                    placeholder="Agregar nota o instrucción..."
                    value={stepNotes[step.id] ?? step.notes ?? ''}
                    onChange={e => handleNoteChange(step.id, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 'var(--space-md)', fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 600 }}>
            Tiempo de preparación externa: {formatDuration(totalDuration(sopPhases.preSetup))}
          </div>
        </div>
      )}

      {/* Phase 2: Internal Setup */}
      {sopPhases.internal.length > 0 && (
        <div className="glass-card sop-phase animate-fade-in">
          <h3>
            <span style={{ color: 'var(--color-internal)' }}>⛔</span>
            Fase 2 — Cambio Interno
            <span className="badge badge-red">{sopPhases.internal.length} pasos</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
            Realizar CON la máquina / proceso detenido. Ejecutar lo más rápido posible.
          </p>

          {sopPhases.internal.map((step, i) => (
            <div key={step.id} className={`checklist-item ${checked[step.id] ? 'checked' : ''}`}>
              <div
                className={`checklist-checkbox ${checked[step.id] ? 'checked' : ''}`}
                onClick={() => toggleCheck(step.id)}
              >
                {checked[step.id] ? '✓' : ''}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="checklist-text" style={{ fontWeight: 500, color: 'var(--color-text-bright)' }}>
                    {sopPhases.preSetup.length + i + 1}. {step.name}
                  </span>
                  <span className="step-duration">{formatDuration(step.simplifiedDuration || step.duration)}</span>
                </div>
                {step.simplificationNotes && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-purple)', marginTop: 4 }}>
                    💡 {step.simplificationNotes}
                  </p>
                )}
                {step.simplifiedDuration && step.simplifiedDuration < step.duration && (
                  <span className="badge badge-purple" style={{ marginTop: 4 }}>
                    Simplificada: {formatDuration(step.duration)} → {formatDuration(step.simplifiedDuration)}
                  </span>
                )}
                <div className="step-notes-input">
                  <input
                    className="form-input"
                    style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                    placeholder="Agregar nota o instrucción..."
                    value={stepNotes[step.id] ?? step.notes ?? ''}
                    onChange={e => handleNoteChange(step.id, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 'var(--space-md)', fontSize: '0.8rem', color: 'var(--color-internal)', fontWeight: 600 }}>
            Tiempo de cambio interno: {formatDuration(totalDuration(sopPhases.internal.map(s => ({ ...s, duration: s.simplifiedDuration || s.duration }))))}
          </div>
        </div>
      )}

      {/* Export Bar */}
      <div className="export-bar">
        <button className="btn btn-primary" onClick={handlePrint}>🖨 Imprimir SOP</button>
        <button className="btn btn-secondary" onClick={handleExportJSON}>📥 Exportar JSON</button>
        <button className="btn btn-ghost" onClick={handleExportCSV}>📊 Exportar CSV</button>
      </div>
    </div>
  );
}
