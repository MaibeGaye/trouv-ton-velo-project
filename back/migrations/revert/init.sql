-- Revert apo-velo:init from pg

BEGIN;

DROP TABLE user, offer;

COMMIT;
