-- Revert apo-velo:integrity from pg

BEGIN;

ALTER TABLE offer
    DROP CONSTRAINT date_coherence;

COMMIT;
