-- =======================================================
-- NexIA_SMED — Migración Supabase
-- Schema: smed  (independiente, una instancia multi-app)
-- RLS habilitado: cada usuario ve solo SUS datos
-- Tablas: profiles + 4 módulos SMED
-- =======================================================

-- 1. Crear schema
CREATE SCHEMA IF NOT EXISTS smed;

-- 2. Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "pgcrypto" SCHEMA extensions;

-- -------------------------------------------------------
-- FUNCIÓN: updated_at automático (reutilizable)
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION smed.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------
-- TABLA: profiles (perfil extendido — SaaS-ready)
-- Se crea automáticamente al registrar un usuario.
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS smed.profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT,
  company      TEXT,
  role         TEXT NOT NULL DEFAULT 'analyst',
  -- role values: 'admin' | 'analyst' | 'viewer'
  avatar_url   TEXT,
  plan         TEXT NOT NULL DEFAULT 'free',
  -- plan values: 'free' | 'pro' | 'enterprise'
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE smed.profiles ENABLE ROW LEVEL SECURITY;

-- El propio usuario ve y edita su perfil
CREATE POLICY "profile_owner_all" ON smed.profiles
  FOR ALL USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Otros usuarios autenticados pueden leer nombre + empresa
CREATE POLICY "profile_read_by_authenticated" ON smed.profiles
  FOR SELECT USING (auth.role() = 'authenticated');

-- Trigger: crear perfil vacío automáticamente al registrarse
CREATE OR REPLACE FUNCTION smed.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO smed.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_smed ON auth.users;
CREATE TRIGGER on_auth_user_created_smed
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION smed.handle_new_user();

-- Backfill: crear perfil para usuarios ya existentes
INSERT INTO smed.profiles (id, full_name)
SELECT
  id,
  split_part(email, '@', 1)
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- -------------------------------------------------------
-- TABLA: projects (raíz de cada análisis SMED)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS smed.projects (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  description   TEXT,
  product       TEXT,
  machine       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE smed.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_projects" ON smed.projects
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- -------------------------------------------------------
-- TABLA: capture_data (Módulo 1 — Captura de tiempos)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS smed.capture_data (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID NOT NULL REFERENCES smed.projects(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity     TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'IE',
  -- type values: 'IE' | 'EI' | 'IE_EI'
  duration     NUMERIC NOT NULL DEFAULT 0,
  notes        TEXT,
  "order"      INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE smed.capture_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_capture" ON smed.capture_data
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- -------------------------------------------------------
-- TABLA: classifications (Módulo 2 — Clasificación IE/EI)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS smed.classifications (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id       UUID NOT NULL REFERENCES smed.projects(id) ON DELETE CASCADE,
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity         TEXT NOT NULL,
  classification   TEXT NOT NULL DEFAULT 'IE',
  -- classification values: 'IE' | 'EI'
  duration         NUMERIC NOT NULL DEFAULT 0,
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE smed.classifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_classifications" ON smed.classifications
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- -------------------------------------------------------
-- TABLA: optimizations (Módulo 3 — Reducción y mejoras)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS smed.optimizations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id       UUID NOT NULL REFERENCES smed.projects(id) ON DELETE CASCADE,
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity         TEXT NOT NULL,
  original_time    NUMERIC NOT NULL DEFAULT 0,
  optimized_time   NUMERIC NOT NULL DEFAULT 0,
  saving           NUMERIC GENERATED ALWAYS AS (original_time - optimized_time) STORED,
  action           TEXT,
  responsible      TEXT,
  status           TEXT NOT NULL DEFAULT 'pending',
  -- status values: 'pending' | 'in_progress' | 'done'
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE smed.optimizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_optimizations" ON smed.optimizations
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- -------------------------------------------------------
-- TABLA: standards (Módulo 4 — Estándares de trabajo)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS smed.standards (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES smed.projects(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  sequence        TEXT,
  key_points      TEXT,
  standard_time   NUMERIC,
  responsible     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE smed.standards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_standards" ON smed.standards
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- -------------------------------------------------------
-- Triggers: updated_at automático en todas las tablas
-- -------------------------------------------------------
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profiles','projects','capture_data','classifications','optimizations','standards'
  ] LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_updated_at ON smed.%I;
       CREATE TRIGGER trg_updated_at
       BEFORE UPDATE ON smed.%I
       FOR EACH ROW EXECUTE FUNCTION smed.set_updated_at();',
      t, t
    );
  END LOOP;
END;
$$;

-- -------------------------------------------------------
-- Permisos: exponer schema smed en la API REST de Supabase
-- (Agregar también "smed" en API > Extra Search Path)
-- -------------------------------------------------------
GRANT USAGE ON SCHEMA smed TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA smed TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA smed TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA smed TO anon;
GRANT EXECUTE ON FUNCTION smed.handle_new_user() TO service_role;
