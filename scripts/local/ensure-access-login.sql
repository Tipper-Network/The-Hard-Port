-- Run once as superuser / migration owner on your platform database.
-- Creates a login role that inherits hp_access (runtime role for @hardport/access).

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'hp_access_login') THEN
    CREATE ROLE hp_access_login LOGIN PASSWORD 'localdev' IN ROLE hp_access;
  END IF;
END
$$;

-- Replace hp_platform if you used another database name.
GRANT CONNECT ON DATABASE hp_platform TO hp_access_login;
