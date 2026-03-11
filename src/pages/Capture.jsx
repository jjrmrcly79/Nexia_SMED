import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { generateId, formatTime, formatDuration, totalDuration } from '../utils/helpers';
import './Capture.css';

export default function Capture() {
  const { activeProject, dispatch } = useApp();
  const steps = activeProject?.steps || [];

  // -- Chronometer state --
  const [chrono, setChrono] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapStart, setLapStart] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  // -- Video state --
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [recordedUrl, setRecordedUrl] = useState(activeProject?.videoUrl || null);
  const videoRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  // -- Step name --
  const [stepName, setStepName] = useState('');

  // Chrono logic
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - chrono;
      intervalRef.current = setInterval(() => {
        setChrono(Date.now() - startTimeRef.current);
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartPause = () => {
    if (!isRunning && chrono === 0) {
      setLapStart(0);
    }
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setChrono(0);
    setLapStart(0);
  };

  const handleRecordStep = () => {
    if (!activeProject) return;
    const duration = chrono - lapStart;
    if (duration < 100) return; // min 0.1s

    const name = stepName.trim() || `Paso ${steps.length + 1}`;
    dispatch({
      type: 'ADD_STEP',
      payload: {
        id: generateId(),
        name,
        duration,
        category: null,
        notes: '',
        isConverted: false,
        simplificationNotes: '',
      },
    });
    setStepName('');
    setLapStart(chrono);
  };

  const handleDeleteStep = (id) => {
    dispatch({ type: 'DELETE_STEP', payload: id });
  };

  // -- Camera/Recording --
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn('Camera not available:', err);
      alert('No se pudo acceder a la cámara. Verifica los permisos del navegador.');
    }
  };

  const startRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedUrl(url);
      dispatch({ type: 'SET_VIDEO_URL', payload: url });
    };
    recorder.start();
    recorderRef.current = recorder;
    setIsRecording(true);
    // Also start chrono
    if (!isRunning) handleStartPause();
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // -- Summary stats --
  const total = totalDuration(steps);
  const longest = steps.length > 0 ? Math.max(...steps.map(s => s.duration)) : 0;
  const avg = steps.length > 0 ? total / steps.length : 0;

  if (!activeProject) {
    return (
      <div className="page-container animate-fade-in">
        <div className="empty-state">
          <span className="empty-state-icon">🎥</span>
          <h2>Sin proyecto activo</h2>
          <p>Crea o selecciona un proyecto en la página de Inicio para comenzar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>🎥 Captura y Observación</h1>
          <p className="page-subtitle">Graba el proceso de cambio y registra cada paso con su duración exacta.</p>
        </div>
      </div>

      <div className="capture-layout">
        {/* Video Preview */}
        <div className="glass-card video-section">
          <h3>📹 Video del Proceso</h3>
          <div className="video-preview">
            {stream ? (
              <>
                <video ref={videoRef} autoPlay muted playsInline />
                {isRecording && (
                  <div className="rec-badge">
                    <span className="recording-dot" />REC
                  </div>
                )}
              </>
            ) : recordedUrl ? (
              <video src={recordedUrl} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="video-placeholder">
                <span>📷</span>
                <span>Conecta tu cámara para grabar</span>
              </div>
            )}
          </div>
          <div className="video-controls">
            {!stream ? (
              <button className="btn btn-secondary" onClick={startCamera}>📷 Activar Cámara</button>
            ) : (
              <>
                {!isRecording ? (
                  <button className="btn btn-danger" onClick={startRecording}>⏺ Grabar</button>
                ) : (
                  <button className="btn btn-ghost" onClick={stopRecording}>⏹ Detener</button>
                )}
                <button className="btn btn-ghost btn-sm" onClick={stopCamera}>Cerrar Cámara</button>
              </>
            )}
          </div>
        </div>

        {/* Chronometer + Step Recorder */}
        <div className="glass-card chrono-section">
          <h3>⏱ Cronómetro</h3>
          <div className={`chrono-display ${isRecording ? 'recording' : ''}`}>
            {formatTime(chrono)}
          </div>

          <div className="chrono-controls">
            <button className="btn btn-primary" onClick={handleStartPause}>
              {isRunning ? '⏸ Pausar' : chrono > 0 ? '▶ Reanudar' : '▶ Iniciar'}
            </button>
            <button className="btn btn-ghost" onClick={handleReset} disabled={chrono === 0}>
              ↺ Reset
            </button>
          </div>

          <div className="section-divider"><span>Registrar Paso</span></div>

          <div className="step-recorder">
            <input
              className="form-input"
              placeholder={`Nombre del paso ${steps.length + 1}...`}
              value={stepName}
              onChange={e => setStepName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleRecordStep()}
            />
            <button
              className="btn btn-primary"
              onClick={handleRecordStep}
              disabled={!isRunning && chrono === 0}
            >
              ＋ Registrar
            </button>
          </div>

          {steps.length > 0 && (
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Lap: {formatTime(chrono - lapStart)}
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      {steps.length > 0 && (
        <div className="capture-summary">
          <div className="glass-card stat-card">
            <span className="stat-label">Total Pasos</span>
            <span className="stat-value">{steps.length}</span>
          </div>
          <div className="glass-card stat-card">
            <span className="stat-label">Tiempo Total</span>
            <span className="stat-value" style={{ fontSize: '1.5rem' }}>{formatDuration(total)}</span>
          </div>
          <div className="glass-card stat-card">
            <span className="stat-label">Paso más largo</span>
            <span className="stat-value" style={{ fontSize: '1.5rem' }}>{formatDuration(longest)}</span>
          </div>
          <div className="glass-card stat-card">
            <span className="stat-label">Promedio</span>
            <span className="stat-value" style={{ fontSize: '1.5rem' }}>{formatDuration(avg)}</span>
          </div>
        </div>
      )}

      {/* Steps List */}
      <div className="section-divider"><span>Pasos Registrados ({steps.length})</span></div>
      <div className="steps-list">
        {steps.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">📝</span>
            <p>Inicia el cronómetro y registra cada paso del proceso de cambio.</p>
          </div>
        ) : (
          steps.map((step, i) => (
            <div key={step.id} className="step-item" style={{ animationDelay: `${i * 50}ms` }}>
              <span className="step-number">{i + 1}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, color: 'var(--color-text-bright)' }}>{step.name}</div>
              </div>
              <span className="step-duration">{formatDuration(step.duration)}</span>
              <button className="btn btn-ghost btn-sm" onClick={() => handleDeleteStep(step.id)}>✕</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
