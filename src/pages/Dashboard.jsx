import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { useApp } from '../context/AppContext';
import {
  formatDuration, totalDuration, calculateReduction, calculateOEEImpact,
} from '../utils/helpers';
import './Dashboard.css';

const COLORS = {
  internal: '#f87171',
  external: '#34d399',
  converted: '#22d3ee',
  simplified: '#a78bfa',
};

export default function Dashboard() {
  const { state, activeProject, dispatch } = useApp();
  const steps = activeProject?.steps || [];
  const settings = state.settings;

  const metrics = useMemo(() => {
    if (steps.length === 0) return null;

    const all = totalDuration(steps);
    const internalSteps = steps.filter(s => s.category === 'internal' && !s.isConverted);
    const externalSteps = steps.filter(s => s.category === 'external' && !s.isConverted);
    const convertedSteps = steps.filter(s => s.isConverted);
    const classified = steps.filter(s => s.category);

    const internalTime = totalDuration(internalSteps);
    const externalTime = totalDuration(externalSteps);
    const convertedTime = totalDuration(convertedSteps);

    // Simplified savings
    const simplifiedSavings = internalSteps.reduce((sum, s) => {
      if (s.simplifiedDuration && s.simplifiedDuration < s.duration) {
        return sum + (s.duration - s.simplifiedDuration);
      }
      return sum;
    }, 0);

    // "After" is: only internal tasks that remain internal and were not converted
    // with their simplified durations if available
    const afterInternalTime = internalSteps.reduce((sum, s) => {
      return sum + (s.simplifiedDuration || s.duration);
    }, 0);

    const before = all;
    const after = afterInternalTime; // Only internal time matters for machine downtime
    const reduction = calculateReduction(before, after);
    const oee = calculateOEEImpact(before, after, settings.changesPerDay, settings.shiftMinutes);

    return {
      before, after, reduction,
      internalSteps, externalSteps, convertedSteps, classified,
      internalTime, externalTime, convertedTime, simplifiedSavings,
      afterInternalTime, oee,
    };
  }, [steps, settings]);

  // Chart data for Before vs After
  const barData = metrics ? [
    { name: 'Antes', tiempo: Math.round(metrics.before / 60000), fill: '#f87171' },
    { name: 'Después', tiempo: Math.round(metrics.after / 60000), fill: '#34d399' },
  ] : [];

  // Pie data for category breakdown
  const pieData = metrics ? [
    { name: 'Internas', value: metrics.internalTime, color: COLORS.internal },
    { name: 'Externas', value: metrics.externalTime, color: COLORS.external },
    { name: 'Convertidas', value: metrics.convertedTime, color: COLORS.converted },
  ].filter(d => d.value > 0) : [];

  const handleSettingChange = (key, value) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: parseInt(value) || 0 } });
  };

  if (!activeProject) {
    return (
      <div className="page-container animate-fade-in">
        <div className="empty-state">
          <span className="empty-state-icon">📊</span>
          <h2>Sin proyecto activo</h2>
          <p>Crea o selecciona un proyecto en la página de Inicio.</p>
        </div>
      </div>
    );
  }

  if (!metrics || steps.length === 0) {
    return (
      <div className="page-container animate-fade-in">
        <div className="page-header"><h1>📊 Panel de Resultados</h1></div>
        <div className="empty-state">
          <span className="empty-state-icon">📈</span>
          <h3>Sin datos suficientes</h3>
          <p>Registra, clasifica y optimiza los pasos primero para ver los resultados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>📊 Panel de Resultados</h1>
          <p className="page-subtitle">
            Métricas de mejora y impacto del análisis SMED en {activeProject.name}
          </p>
        </div>
      </div>

      {/* Big Stats */}
      <div className="dashboard-stats">
        <div className="glass-card stat-card big-stat">
          <span className="stat-label">Tiempo Antes</span>
          <span className="stat-value" style={{ color: 'var(--color-red)' }}>
            {formatDuration(metrics.before)}
          </span>
          <span className="stat-sub">Tiempo total de cambio original</span>
        </div>
        <div className="glass-card stat-card big-stat">
          <span className="stat-label">Tiempo Después</span>
          <span className="stat-value" style={{ color: 'var(--color-green)' }}>
            {formatDuration(metrics.after)}
          </span>
          <span className="stat-sub">Tiempo de paro efectivo</span>
        </div>
        <div className="glass-card stat-card big-stat">
          <span className="stat-label">Reducción</span>
          <span className="stat-value" style={{ color: 'var(--color-accent)' }}>
            {metrics.reduction}%
          </span>
          <span className="stat-sub">
            <span className={`reduction-arrow ${metrics.reduction > 0 ? 'positive' : 'negative'}`}>
              {metrics.reduction > 0 ? '↓' : '↑'} {formatDuration(metrics.before - metrics.after)}
            </span>
          </span>
        </div>
        <div className="glass-card stat-card big-stat">
          <span className="stat-label">Tareas Convertidas</span>
          <span className="stat-value" style={{ color: 'var(--color-cyan)' }}>
            {metrics.convertedSteps.length}
          </span>
          <span className="stat-sub">De internas a externas</span>
        </div>
      </div>

      {/* Charts */}
      <div className="dashboard-charts">
        {/* Before vs After Bar Chart */}
        <div className="glass-card chart-card">
          <h3>⏱ Comparativo Antes vs Después</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,158,11,0.1)" />
              <XAxis dataKey="name" stroke="#8892b0" />
              <YAxis stroke="#8892b0" label={{ value: 'Minutos', angle: -90, position: 'insideLeft', style: { fill: '#8892b0' } }} />
              <Tooltip
                contentStyle={{
                  background: '#112240',
                  border: '1px solid rgba(245,158,11,0.2)',
                  borderRadius: '8px',
                  color: '#ccd6f6'
                }}
                formatter={(value) => [`${value} min`, 'Tiempo']}
              />
              <Bar dataKey="tiempo" radius={[8, 8, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown Pie */}
        <div className="glass-card chart-card">
          <h3>📊 Desglose por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#112240',
                  border: '1px solid rgba(245,158,11,0.2)',
                  borderRadius: '8px',
                  color: '#ccd6f6'
                }}
                formatter={(value) => [formatDuration(value), 'Tiempo']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* OEE Impact */}
      <div className="section-divider"><span>Impacto en OEE — Disponibilidad</span></div>
      <div className="oee-grid">
        <div className="glass-card stat-card">
          <span className="stat-label">Ahorro por Cambio</span>
          <span className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--color-green)' }}>
            {metrics.oee.savedPerChange.toFixed(1)} <span className="stat-unit">min</span>
          </span>
        </div>
        <div className="glass-card stat-card">
          <span className="stat-label">Ahorro por Día ({settings.changesPerDay} cambios)</span>
          <span className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--color-green)' }}>
            {metrics.oee.savedPerDay.toFixed(1)} <span className="stat-unit">min</span>
          </span>
        </div>
        <div className="glass-card stat-card">
          <span className="stat-label">Ganancia Disponibilidad</span>
          <span className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}>
            +{metrics.oee.availabilityGainPercent}%
          </span>
          <span className="stat-sub">del turno de {settings.shiftMinutes} min</span>
        </div>
      </div>

      {/* Settings */}
      <div className="section-divider"><span>Parámetros de Cálculo</span></div>
      <div className="glass-card settings-section">
        <div className="settings-row">
          <label>Cambios por día:</label>
          <input
            className="form-input"
            type="number"
            min="1"
            value={settings.changesPerDay}
            onChange={e => handleSettingChange('changesPerDay', e.target.value)}
          />
        </div>
        <div className="settings-row">
          <label>Minutos por turno:</label>
          <input
            className="form-input"
            type="number"
            min="1"
            value={settings.shiftMinutes}
            onChange={e => handleSettingChange('shiftMinutes', e.target.value)}
          />
        </div>
      </div>

      {/* Project History */}
      {state.projects.length > 1 && (
        <>
          <div className="section-divider"><span>Historial de Proyectos</span></div>
          <div className="glass-card project-history">
            {state.projects.map(p => {
              const pTotal = totalDuration(p.steps);
              const pInternal = p.steps.filter(s => s.category === 'internal' && !s.isConverted);
              const pAfter = pInternal.reduce((sum, s) => sum + (s.simplifiedDuration || s.duration), 0);
              const pReduction = calculateReduction(pTotal, pAfter);
              return (
                <div key={p.id} className="project-history-item">
                  <div>
                    <div style={{ fontWeight: 500, color: 'var(--color-text-bright)' }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {p.steps.length} pasos • {new Date(p.createdAt).toLocaleDateString('es')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {formatDuration(pTotal)} → {formatDuration(pAfter)}
                    </span>
                    <span className={`reduction-arrow ${pReduction > 0 ? 'positive' : ''}`}>
                      {pReduction > 0 ? `↓${pReduction}%` : '—'}
                    </span>
                    {p.id === state.activeProjectId && (
                      <span className="badge badge-accent">Activo</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
