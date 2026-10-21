-- Run as superuser (postgres), connected to `postgres` maintenance DB:
--   psql -h 127.0.0.1 -U postgres -d postgres -f scripts/local/create-platform-db.sql

SELECT 'CREATE DATABASE hp_platform'
WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'hp_platform')\gexec
