-- Revert apo-velo:integrity from pg

BEGIN;

<<<<<<< HEAD
ALTER TABLE offer
    DROP CONSTRAINT date_coherence;
=======
-- -- XXX Add DDLs here.
-- ALTER TABLE "user"
--     ALTER COLUMN zip_code TYPE varchar;

-- DROP DOMAIN postalcode;
>>>>>>> develop

COMMIT;
