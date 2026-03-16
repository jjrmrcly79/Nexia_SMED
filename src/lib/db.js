import { supabase } from './supabase';

// -------------------------------------------------------
// PROFILE
// -------------------------------------------------------
export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  if (error) throw error;
  return data;
}

export async function upsertProfile(updates) {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: user.id, ...updates }, { onConflict: 'id' });
  if (error) throw error;
}

// -------------------------------------------------------
// PROJECTS
// -------------------------------------------------------
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createProject(project) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('projects')
    .insert({ ...project, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(id, updates) {
  const { error } = await supabase.from('projects').update(updates).eq('id', id);
  if (error) throw error;
}

export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// -------------------------------------------------------
// CAPTURE DATA (Módulo 1 — Captura de tiempos)
// -------------------------------------------------------
export async function getCaptureData(projectId) {
  const { data, error } = await supabase
    .from('capture_data')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function upsertCaptureRow(projectId, row) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('capture_data')
    .upsert({
      id: row.id,
      project_id: projectId,
      user_id: user.id,
      activity: row.activity,
      type: row.type,         // 'IE' | 'EI' | 'IE_EI'
      duration: row.duration,
      notes: row.notes,
      order: row.order ?? 0,
    }, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCaptureRow(id) {
  const { error } = await supabase.from('capture_data').delete().eq('id', id);
  if (error) throw error;
}

// -------------------------------------------------------
// CLASSIFICATIONS (Módulo 2 — Clasificación IE/EI)
// -------------------------------------------------------
export async function getClassifications(projectId) {
  const { data, error } = await supabase
    .from('classifications')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function upsertClassification(projectId, item) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('classifications')
    .upsert({
      id: item.id,
      project_id: projectId,
      user_id: user.id,
      activity: item.activity,
      classification: item.classification, // 'IE' | 'EI'
      duration: item.duration,
      notes: item.notes,
    }, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteClassification(id) {
  const { error } = await supabase.from('classifications').delete().eq('id', id);
  if (error) throw error;
}

// -------------------------------------------------------
// OPTIMIZATIONS (Módulo 3 — Optimización)
// -------------------------------------------------------
export async function getOptimizations(projectId) {
  const { data, error } = await supabase
    .from('optimizations')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function upsertOptimization(projectId, item) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('optimizations')
    .upsert({
      id: item.id,
      project_id: projectId,
      user_id: user.id,
      activity: item.activity,
      original_time: item.originalTime,
      optimized_time: item.optimizedTime,
      saving: item.saving,
      action: item.action,
      responsible: item.responsible,
      status: item.status ?? 'pending',
    }, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteOptimization(id) {
  const { error } = await supabase.from('optimizations').delete().eq('id', id);
  if (error) throw error;
}

// -------------------------------------------------------
// STANDARDS (Módulo 4 — Estándares de trabajo)
// -------------------------------------------------------
export async function getStandards(projectId) {
  const { data, error } = await supabase
    .from('standards')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function upsertStandard(projectId, standard) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('standards')
    .upsert({
      id: standard.id,
      project_id: projectId,
      user_id: user.id,
      title: standard.title,
      sequence: standard.sequence,
      key_points: standard.keyPoints,
      standard_time: standard.standardTime,
      responsible: standard.responsible,
    }, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteStandard(id) {
  const { error } = await supabase.from('standards').delete().eq('id', id);
  if (error) throw error;
}

// -------------------------------------------------------
// LOAD FULL PROJECT (hydrate all modules)
// -------------------------------------------------------
export async function loadFullProject(projectId) {
  const [
    { data: capture },
    { data: classifications },
    { data: optimizations },
    { data: standards },
  ] = await Promise.all([
    supabase.from('capture_data').select('*').eq('project_id', projectId).order('order'),
    supabase.from('classifications').select('*').eq('project_id', projectId).order('created_at'),
    supabase.from('optimizations').select('*').eq('project_id', projectId).order('created_at'),
    supabase.from('standards').select('*').eq('project_id', projectId).order('created_at'),
  ]);

  return {
    capture: (capture || []).map(r => ({
      id: r.id,
      activity: r.activity,
      type: r.type,
      duration: r.duration,
      notes: r.notes,
      order: r.order,
    })),
    classifications: (classifications || []).map(r => ({
      id: r.id,
      activity: r.activity,
      classification: r.classification,
      duration: r.duration,
      notes: r.notes,
    })),
    optimizations: (optimizations || []).map(r => ({
      id: r.id,
      activity: r.activity,
      originalTime: r.original_time,
      optimizedTime: r.optimized_time,
      saving: r.saving,
      action: r.action,
      responsible: r.responsible,
      status: r.status,
    })),
    standards: (standards || []).map(r => ({
      id: r.id,
      title: r.title,
      sequence: r.sequence,
      keyPoints: r.key_points,
      standardTime: r.standard_time,
      responsible: r.responsible,
    })),
  };
}
