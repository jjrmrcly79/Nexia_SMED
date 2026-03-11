import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDuration, totalDuration, calculateReduction } from '../utils/helpers';
import './Optimization.css';

const GUIDING_QUESTIONS = [
  '¿Se puede preparar este material/herramienta antes de detener la máquina?',
  '¿Se podría precalentar, pre-posicionar o pre-ensamblar externamente?',
  '¿Se puede usar un sistema de fijación rápida en vez de tornillos?',
  '¿Se puede estandarizar este ajuste para eliminarlo?',
  '¿Se puede hacer esta tarea en paralelo con otra?',
];

const LEAN_TECHNIQUES = [
  { id: 'quickclamp', label: '🔧 Abrazaderas rápidas', tip: 'Cambiar tornillos por abrazaderas de liberación rápida' },
  { id: 'positioning', label: '📐 Guías de posicionamiento', tip: 'Usar guías, pines o topes para eliminar ajustes' },
  { id: 'preassembly', label: '🔩 Pre-ensamble', tip: 'Ensamblar subconjuntos antes del cambio' },
  { id: 'preheat', label: '🔥 Pre-calentamiento', tip: 'Precalentar moldes o herramientas antes del cambio' },
  { id: 'parallel', label: '👥 Operaciones paralelas', tip: 'Asignar dos personas para hacer tareas simultáneamente' },
  { id: 'standardize', label: '📏 Estandarización', tip: 'Estandarizar tamaños, alturas y conexiones' },
  { id: 'checklist', label: '✅ Checklist previo', tip: 'Crear listas de verificación para asegurar preparación' },
  { id: 'visual', label: '👁 Gestión visual', tip: 'Marcar posiciones, colores y etiquetas para ubicación rápida' },
];

export default function Optimization() {
  const { activeProject, dispatch } = useApp();
  const steps = activeProject?.steps || [];
  const [conversionNotes, setConversionNotes] = useState({});
  const [simplifyNotes, setSimplifyNotes] = useState({});
  const [expandedStep, setExpandedStep] = useState(null);

  const internalSteps = steps.filter(s => s.category === 'internal' && !s.isConverted);
  const convertedSteps = steps.filter(s => s.isConverted);
  const externalSteps = steps.filter(s => s.category === 'external' && !s.isConverted);

  const totalBefore = totalDuration(steps);
  const internalTime = totalDuration(internalSteps);
  const convertedTime = totalDuration(convertedSteps);
  const simplifiedSavings = internalSteps.reduce((sum, s) => {
    if (s.simplifiedDuration && s.simplifiedDuration < s.duration) {
      return sum + (s.duration - s.simplifiedDuration);
    }
    return sum;
  }, 0);
  const totalAfter = totalBefore - convertedTime - simplifiedSavings;
  const reduction = calculateReduction(totalBefore, totalAfter);

  const handleConvert = (stepId) => {
    const note = conversionNotes[stepId] || '';
    dispatch({ type: 'CONVERT_STEP', payload: { id: stepId, note } });
    setConversionNotes(prev => ({ ...prev, [stepId]: '' }));
  };

  const handleSimplify = (stepId, notes, newDuration) => {
    dispatch({
      type: 'ADD_SIMPLIFICATION_NOTE',
      payload: { id: stepId, notes, newDuration },
    });
  };

  if (!activeProject) {
    return (
      <div className="page-container animate-fade-in">
        <div className="empty-state">
          <span className="empty-state-icon">⚡</span>
          <h2>Sin proyecto activo</h2>
          <p>Crea o selecciona un proyecto en la página de Inicio.</p>
        </div>
      </div>
    );
  }

  if (internalSteps.length === 0 && convertedSteps.length === 0) {
    return (
      <div className="page-container animate-fade-in">
        <div className="page-header">
          <h1>⚡ Transformación y Simplificación</h1>
        </div>
        <div className="empty-state">
          <span className="empty-state-icon">🔀</span>
          <h3>Sin tareas internas</h3>
          <p>Clasifica los pasos del proceso como internos o externos en el módulo de Clasificación.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>⚡ Transformación y Simplificación</h1>
          <p className="page-subtitle">
            Cuestiona cada tarea interna: ¿se puede convertir a externa o simplificar?
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="optimize-summary">
        <div className="glass-card stat-card">
          <span className="stat-label">Tiempo Original</span>
          <span className="stat-value" style={{ fontSize: '1.3rem' }}>{formatDuration(totalBefore)}</span>
        </div>
        <div className="glass-card stat-card">
          <span className="stat-label">Tiempo Estimado</span>
          <span className="stat-value" style={{ fontSize: '1.3rem', color: 'var(--color-green)' }}>{formatDuration(totalAfter)}</span>
        </div>
        <div className="glass-card stat-card">
          <span className="stat-label">Reducción</span>
          <span className="stat-value" style={{ fontSize: '1.3rem', color: 'var(--color-accent)' }}>{reduction}%</span>
        </div>
        <div className="glass-card stat-card">
          <span className="stat-label">Convertidas</span>
          <span className="stat-value" style={{ fontSize: '1.3rem', color: 'var(--color-cyan)' }}>{convertedSteps.length}</span>
        </div>
      </div>

      <div className="optimize-layout" style={{ marginTop: 'var(--space-lg)' }}>
        {/* Internal Tasks Panel */}
        <div className="optimize-panel">
          <div className="glass-card">
            <h3>⛔ Tareas Internas ({internalSteps.length})</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
              Analiza cada tarea: ¿se puede hacer de forma externa o simplificar?
            </p>

            {internalSteps.map(step => (
              <div key={step.id} className="optimize-card" style={{ marginBottom: 'var(--space-sm)' }}>
                <div className="optimize-card-header">
                  <span className="optimize-card-name">{step.name}</span>
                  <span className="step-duration">{formatDuration(step.duration)}</span>
                </div>

                {/* Guiding Questions */}
                <div className="questions-section">
                  {GUIDING_QUESTIONS.slice(0, expandedStep === step.id ? 5 : 2).map((q, i) => (
                    <div key={i} className="guide-question">{q}</div>
                  ))}
                  {expandedStep !== step.id && (
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ alignSelf: 'flex-start' }}
                      onClick={() => setExpandedStep(step.id)}
                    >
                      Ver más preguntas...
                    </button>
                  )}
                </div>

                {/* Convert action */}
                <div className="conversion-note">
                  <input
                    className="form-input"
                    placeholder="¿Cómo se hará externamente?"
                    value={conversionNotes[step.id] || ''}
                    onChange={e => setConversionNotes(prev => ({ ...prev, [step.id]: e.target.value }))}
                  />
                  <button className="btn btn-cyan btn-sm" onClick={() => handleConvert(step.id)}>
                    → Convertir a Externa
                  </button>
                </div>

                {/* Simplify section */}
                <div className="simplify-section">
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-sm)' }}>
                    💡 Simplificación
                  </div>
                  <div className="lean-tags">
                    {LEAN_TECHNIQUES.map(tech => (
                      <span
                        key={tech.id}
                        className="lean-tag"
                        title={tech.tip}
                        onClick={() => {
                          const current = simplifyNotes[step.id] || step.simplificationNotes || '';
                          const newNote = current ? `${current}\n• ${tech.tip}` : `• ${tech.tip}`;
                          setSimplifyNotes(prev => ({ ...prev, [step.id]: newNote }));
                        }}
                      >
                        {tech.label}
                      </span>
                    ))}
                  </div>
                  <textarea
                    className="form-textarea"
                    style={{ marginTop: 'var(--space-sm)', fontSize: '0.8rem' }}
                    placeholder="Notas de simplificación..."
                    value={simplifyNotes[step.id] || step.simplificationNotes || ''}
                    onChange={e => setSimplifyNotes(prev => ({ ...prev, [step.id]: e.target.value }))}
                    rows={2}
                  />
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)', alignItems: 'center' }}>
                    <label className="form-label" style={{ fontSize: '0.7rem', margin: 0 }}>Nuevo tiempo estimado (seg):</label>
                    <input
                      className="form-input"
                      type="number"
                      style={{ width: '100px' }}
                      placeholder={Math.round(step.duration / 1000)}
                      defaultValue={step.simplifiedDuration ? Math.round(step.simplifiedDuration / 1000) : ''}
                      onBlur={e => {
                        const val = parseInt(e.target.value);
                        if (val > 0) {
                          handleSimplify(step.id, simplifyNotes[step.id] || step.simplificationNotes || '', val * 1000);
                        }
                      }}
                    />
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        handleSimplify(step.id, simplifyNotes[step.id] || step.simplificationNotes || '', step.simplifiedDuration || step.duration);
                      }}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Converted Tasks Panel */}
        <div className="optimize-panel">
          <div className="glass-card">
            <h3>✨ Tareas Convertidas a Externas ({convertedSteps.length})</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
              Estas tareas se realizarán antes de detener el proceso.
            </p>

            {convertedSteps.length === 0 ? (
              <div className="empty-state" style={{ padding: 'var(--space-lg)' }}>
                <span className="empty-state-icon">🔄</span>
                <p style={{ fontSize: '0.8rem' }}>Convierte tareas internas usando el botón "Convertir a Externa"</p>
              </div>
            ) : (
              convertedSteps.map(step => (
                <div key={step.id} className="optimize-card converted" style={{ marginBottom: 'var(--space-sm)', borderLeft: '3px solid var(--color-cyan)' }}>
                  <div className="optimize-card-header">
                    <span className="optimize-card-name">{step.name}</span>
                    <span className="badge badge-converted">Convertida</span>
                  </div>
                  <div className="converted-indicator">
                    <span>⚡ Ahorro: {formatDuration(step.duration)}</span>
                  </div>
                  {step.conversionNote && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-xs)' }}>
                      📝 {step.conversionNote}
                    </p>
                  )}
                </div>
              ))
            )}

            {/* External tasks that were originally external */}
            {externalSteps.length > 0 && (
              <>
                <div className="section-divider" style={{ margin: 'var(--space-md) 0' }}>
                  <span>Ya Externas</span>
                </div>
                {externalSteps.map(step => (
                  <div key={step.id} className="optimize-card external" style={{ marginBottom: 'var(--space-sm)', opacity: 0.7 }}>
                    <div className="optimize-card-header">
                      <span className="optimize-card-name">{step.name}</span>
                      <span className="badge badge-external">Externa Original</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
