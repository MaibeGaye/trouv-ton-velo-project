-- Revert apo-velo:integrity from pg

BEGIN;

-- -- XXX Add DDLs here.
-- ALTER TABLE "user"
--     ALTER COLUMN zip_code TYPE varchar;

-- DROP DOMAIN postalcode;

COMMIT;
