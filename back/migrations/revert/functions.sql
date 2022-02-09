-- Revert apo-velo:functions from pg

BEGIN;

DROP FUNCTION update_offer(json);
DROP FUNCTION add_offer(json);
DROP FUNCTION update_user(json);
DROP FUNCTION add_user(json);

COMMIT;
