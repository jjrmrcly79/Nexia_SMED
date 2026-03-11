import { createContext, useContext, useReducer, useEffect } from 'react';
import { DEMO_PROJECT } from '../utils/helpers';

const AppContext = createContext();
const STORAGE_KEY = 'nexia-smed-data';

const initialState = {
  projects: [DEMO_PROJECT],
  activeProjectId: DEMO_PROJECT.id,
  settings: { changesPerDay: 2, shiftMinutes: 480 },
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...initialState, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
  }
  return initialState;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

function appReducer(state, action) {
  switch (action.type) {
    // ----- Projects -----
    case 'CREATE_PROJECT': {
      const newProject = {
        ...action.payload,
        steps: [],
        videoUrl: null,
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        projects: [...state.projects, newProject],
        activeProjectId: newProject.id,
      };
    }
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
        activeProjectId:
          state.activeProjectId === action.payload
            ? (state.projects.length > 1 ? state.projects.find(p => p.id !== action.payload)?.id : null)
            : state.activeProjectId,
      };
    case 'SET_ACTIVE_PROJECT':
      return { ...state, activeProjectId: action.payload };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      };

    // ----- Steps -----
    case 'ADD_STEP': {
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === state.activeProjectId
            ? { ...p, steps: [...p.steps, action.payload] }
            : p
        ),
      };
    }
    case 'UPDATE_STEP':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === state.activeProjectId
            ? {
                ...p,
                steps: p.steps.map(s =>
                  s.id === action.payload.id ? { ...s, ...action.payload } : s
                ),
              }
            : p
        ),
      };
    case 'DELETE_STEP':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === state.activeProjectId
            ? { ...p, steps: p.steps.filter(s => s.id !== action.payload) }
            : p
        ),
      };
    case 'CLASSIFY_STEP':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === state.activeProjectId
            ? {
                ...p,
                steps: p.steps.map(s =>
                  s.id === action.payload.id
                    ? { ...s, category: action.payload.category }
                    : s
                ),
              }
            : p
        ),
      };
    case 'CONVERT_STEP':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === state.activeProjectId
            ? {
                ...p,
                steps: p.steps.map(s =>
                  s.id === action.payload.id
                    ? {
                        ...s,
                        category: 'external',
                        isConverted: true,
                        conversionNote: action.payload.note || '',
                      }
                    : s
                ),
              }
            : p
        ),
      };
    case 'ADD_SIMPLIFICATION_NOTE':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === state.activeProjectId
            ? {
                ...p,
                steps: p.steps.map(s =>
                  s.id === action.payload.id
                    ? { ...s, simplificationNotes: action.payload.notes, simplifiedDuration: action.payload.newDuration }
                    : s
                ),
              }
            : p
        ),
      };
    case 'SET_STEPS':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === state.activeProjectId
            ? { ...p, steps: action.payload }
            : p
        ),
      };
    case 'SET_VIDEO_URL':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === state.activeProjectId
            ? { ...p, videoUrl: action.payload }
            : p
        ),
      };

    // ----- Settings -----
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    // ----- Reset -----
    case 'RESET_ALL':
      return initialState;

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  // Derived: active project
  const activeProject = state.projects.find(p => p.id === state.activeProjectId) || null;

  return (
    <AppContext.Provider value={{ state, dispatch, activeProject }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
