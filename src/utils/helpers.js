/**
 * Nexia SMED — Utility helpers
 */

// Generate unique ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Format milliseconds to MM:SS.d
export function formatTime(ms) {
  if (ms == null || ms < 0) return '00:00.0';
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const tenths = Math.floor((totalSeconds % 1) * 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
}

// Format milliseconds to human-friendly string
export function formatDuration(ms) {
  if (ms == null || ms < 0) return '0s';
  const totalSeconds = Math.round(ms / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60) return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// Calculate percentage reduction
export function calculateReduction(before, after) {
  if (!before || before === 0) return 0;
  return Math.round(((before - after) / before) * 100);
}

// Calculate OEE availability impact
export function calculateOEEImpact(oldSetupMs, newSetupMs, changesPerDay = 1, shiftMinutes = 480) {
  const savedMs = oldSetupMs - newSetupMs;
  const savedMinutes = savedMs / 60000;
  const savedPerDay = savedMinutes * changesPerDay;
  const availabilityGain = (savedPerDay / shiftMinutes) * 100;
  return {
    savedPerChange: savedMinutes,
    savedPerDay,
    availabilityGainPercent: Math.round(availabilityGain * 10) / 10,
  };
}

// Sum durations
export function totalDuration(steps) {
  return steps.reduce((sum, s) => sum + (s.duration || 0), 0);
}

// Get steps by category
export function stepsByCategory(steps, category) {
  return steps.filter(s => s.category === category);
}

// Export project to JSON
export function exportToJSON(project) {
  const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `smed-${project.name || 'proyecto'}-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Export steps to CSV
export function exportToCSV(steps, filename = 'smed-pasos') {
  const headers = ['#', 'Paso', 'Duración (seg)', 'Categoría', 'Notas'];
  const rows = steps.map((s, i) => [
    i + 1,
    `"${(s.name || '').replace(/"/g, '""')}"`,
    (s.duration / 1000).toFixed(1),
    s.category || 'sin clasificar',
    `"${(s.notes || '').replace(/"/g, '""')}"`,
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Demo project for initial load
export const DEMO_PROJECT = {
  id: 'demo-1',
  name: 'Cambio de molde — Inyectora #3',
  description: 'Proyecto de ejemplo: reducir el cambio de molde en la máquina inyectora de plástico.',
  createdAt: new Date().toISOString(),
  steps: [
    { id: 's1', name: 'Buscar herramientas en almacén', duration: 180000, category: 'external', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's2', name: 'Esperar enfriamiento del molde', duration: 300000, category: 'internal', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's3', name: 'Desconectar mangueras de agua', duration: 120000, category: 'internal', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's4', name: 'Retirar tornillos de fijación (12 unidades)', duration: 480000, category: 'internal', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's5', name: 'Retirar molde con grúa', duration: 240000, category: 'internal', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's6', name: 'Limpiar platinas', duration: 180000, category: 'internal', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's7', name: 'Traer nuevo molde desde rack', duration: 300000, category: 'external', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's8', name: 'Posicionar nuevo molde', duration: 300000, category: 'internal', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's9', name: 'Apretar tornillos de fijación (12 unidades)', duration: 480000, category: 'internal', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's10', name: 'Conectar mangueras de agua', duration: 120000, category: 'internal', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's11', name: 'Ajustar parámetros de inyección', duration: 600000, category: 'internal', notes: '', isConverted: false, simplificationNotes: '' },
    { id: 's12', name: 'Prueba de primera pieza', duration: 300000, category: 'internal', notes: '', isConverted: false, simplificationNotes: '' },
  ],
  videoUrl: null,
};
