import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useApp } from '../context/AppContext';
import { formatDuration, totalDuration } from '../utils/helpers';
import './Classification.css';

function SortableCard({ step }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const categoryClass = step.category === 'internal' ? 'internal' : step.category === 'external' ? 'external' : '';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`drag-card ${categoryClass}`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 500, color: 'var(--color-text-bright)', fontSize: '0.9rem' }}>{step.name}</span>
        <span className="step-duration">{formatDuration(step.duration)}</span>
      </div>
      {step.category && (
        <div style={{ marginTop: 'var(--space-xs)' }}>
          <span className={`badge badge-${step.category}`}>
            {step.category === 'internal' ? '⛔ Interna' : '✅ Externa'}
          </span>
        </div>
      )}
    </div>
  );
}

function OverlayCard({ step }) {
  if (!step) return null;
  return (
    <div className="drag-card" style={{ boxShadow: 'var(--shadow-lg)', transform: 'scale(1.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 500, color: 'var(--color-text-bright)' }}>{step.name}</span>
        <span className="step-duration">{formatDuration(step.duration)}</span>
      </div>
    </div>
  );
}

export default function Classification() {
  const { activeProject, dispatch } = useApp();
  const steps = activeProject?.steps || [];
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const unclassified = steps.filter(s => !s.category);
  const internal = steps.filter(s => s.category === 'internal');
  const external = steps.filter(s => s.category === 'external');

  const totalAll = totalDuration(steps);
  const totalInternal = totalDuration(internal);
  const totalExternal = totalDuration(external);
  const totalUnclass = totalDuration(unclassified);
  const classified = internal.length + external.length;
  const progress = steps.length > 0 ? Math.round((classified / steps.length) * 100) : 0;

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const overId = over.id;
    // Determine which zone was dropped into
    let newCategory = null;
    if (overId === 'zone-internal' || internal.some(s => s.id === overId)) {
      newCategory = 'internal';
    } else if (overId === 'zone-external' || external.some(s => s.id === overId)) {
      newCategory = 'external';
    } else if (overId === 'zone-unclassified' || unclassified.some(s => s.id === overId)) {
      newCategory = null;
    }

    const activeStep = steps.find(s => s.id === active.id);
    if (activeStep && activeStep.category !== newCategory) {
      dispatch({
        type: 'CLASSIFY_STEP',
        payload: { id: active.id, category: newCategory },
      });
    }
  };

  const handleDragOver = (event) => {
    // Not needed with current setup but kept for future extension
  };

  const activeStep = steps.find(s => s.id === activeId);

  if (!activeProject) {
    return (
      <div className="page-container animate-fade-in">
        <div className="empty-state">
          <span className="empty-state-icon">🔀</span>
          <h2>Sin proyecto activo</h2>
          <p>Crea o selecciona un proyecto en la página de Inicio.</p>
        </div>
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <div className="page-container animate-fade-in">
        <div className="page-header">
          <h1>🔀 Clasificación Visual</h1>
        </div>
        <div className="empty-state">
          <span className="empty-state-icon">📝</span>
          <h3>Sin pasos registrados</h3>
          <p>Primero registra los pasos del proceso en el módulo de Captura.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>🔀 Clasificación Visual</h1>
          <p className="page-subtitle">
            Arrastra cada tarea a su categoría: ¿requiere máquina detenida o se puede hacer en paralelo?
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="glass-card classify-progress">
        <div className="classify-progress-header">
          <span>Progreso de clasificación</span>
          <span>{classified} de {steps.length} ({progress}%)</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill green" style={{ width: `${progress}%` }} />
        </div>

        {/* Time Breakdown Bar */}
        {classified > 0 && (
          <div className="time-breakdown">
            <div className="time-bar">
              {totalInternal > 0 && (
                <div
                  className="time-bar-segment time-bar-internal"
                  style={{ width: `${(totalInternal / totalAll) * 100}%` }}
                >
                  {Math.round((totalInternal / totalAll) * 100)}%
                </div>
              )}
              {totalExternal > 0 && (
                <div
                  className="time-bar-segment time-bar-external"
                  style={{ width: `${(totalExternal / totalAll) * 100}%` }}
                >
                  {Math.round((totalExternal / totalAll) * 100)}%
                </div>
              )}
              {totalUnclass > 0 && (
                <div
                  className="time-bar-segment time-bar-unclass"
                  style={{ width: `${(totalUnclass / totalAll) * 100}%` }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* DnD Columns */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="classify-layout" style={{ marginTop: 'var(--space-lg)' }}>
          {/* Unclassified */}
          <div className="classify-column">
            <h3>
              📋 Sin clasificar
              <span className="classify-count">{unclassified.length}</span>
            </h3>
            <SortableContext
              items={[...unclassified.map(s => s.id), 'zone-unclassified']}
              strategy={verticalListSortingStrategy}
              id="zone-unclassified"
            >
              <div
                className="drop-zone"
                id="zone-unclassified"
              >
                {unclassified.length === 0 ? (
                  <div className="empty-state" style={{ padding: 'var(--space-lg)' }}>
                    <p style={{ fontSize: '0.8rem' }}>Todas las tareas clasificadas ✓</p>
                  </div>
                ) : (
                  unclassified.map(step => (
                    <SortableCard key={step.id} step={step} />
                  ))
                )}
              </div>
            </SortableContext>
          </div>

          {/* Internal */}
          <div className="classify-column">
            <h3>
              ⛔ Internas
              <span className="classify-count">{internal.length}</span>
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-sm)' }}>
              Requieren máquina detenida
            </p>
            <SortableContext
              items={[...internal.map(s => s.id), 'zone-internal']}
              strategy={verticalListSortingStrategy}
              id="zone-internal"
            >
              <div className="drop-zone drop-zone-internal">
                {internal.length === 0 ? (
                  <div className="empty-state" style={{ padding: 'var(--space-lg)' }}>
                    <p style={{ fontSize: '0.8rem' }}>Arrastra tareas internas aquí</p>
                  </div>
                ) : (
                  internal.map(step => (
                    <SortableCard key={step.id} step={step} />
                  ))
                )}
              </div>
            </SortableContext>
            {totalInternal > 0 && (
              <div style={{ fontSize: '0.8rem', color: 'var(--color-internal)', fontWeight: 600, marginTop: 'var(--space-sm)' }}>
                ⛔ {formatDuration(totalInternal)} total
              </div>
            )}
          </div>

          {/* External */}
          <div className="classify-column">
            <h3>
              ✅ Externas
              <span className="classify-count">{external.length}</span>
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-sm)' }}>
              Se pueden hacer con máquina funcionando
            </p>
            <SortableContext
              items={[...external.map(s => s.id), 'zone-external']}
              strategy={verticalListSortingStrategy}
              id="zone-external"
            >
              <div className="drop-zone drop-zone-external">
                {external.length === 0 ? (
                  <div className="empty-state" style={{ padding: 'var(--space-lg)' }}>
                    <p style={{ fontSize: '0.8rem' }}>Arrastra tareas externas aquí</p>
                  </div>
                ) : (
                  external.map(step => (
                    <SortableCard key={step.id} step={step} />
                  ))
                )}
              </div>
            </SortableContext>
            {totalExternal > 0 && (
              <div style={{ fontSize: '0.8rem', color: 'var(--color-external)', fontWeight: 600, marginTop: 'var(--space-sm)' }}>
                ✅ {formatDuration(totalExternal)} total
              </div>
            )}
          </div>
        </div>

        <DragOverlay>
          <OverlayCard step={activeStep} />
        </DragOverlay>
      </DndContext>

      {/* Summary */}
      {classified > 0 && (
        <>
          <div className="section-divider"><span>Resumen</span></div>
          <div className="classify-summary">
            <div className="glass-card stat-card">
              <span className="stat-label">Tiempo Interno</span>
              <span className="stat-value" style={{ color: 'var(--color-internal)', fontSize: '1.5rem' }}>
                {formatDuration(totalInternal)}
              </span>
              <span className="stat-sub">{internal.length} tareas</span>
            </div>
            <div className="glass-card stat-card">
              <span className="stat-label">Tiempo Externo</span>
              <span className="stat-value" style={{ color: 'var(--color-external)', fontSize: '1.5rem' }}>
                {formatDuration(totalExternal)}
              </span>
              <span className="stat-sub">{external.length} tareas</span>
            </div>
            <div className="glass-card stat-card">
              <span className="stat-label">Ratio Interno/Total</span>
              <span className="stat-value" style={{ fontSize: '1.5rem' }}>
                {totalAll > 0 ? Math.round((totalInternal / totalAll) * 100) : 0}%
              </span>
              <span className="stat-sub">del tiempo total</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
