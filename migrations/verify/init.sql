-- Verify apo-velo:init on pg

BEGIN;

SELECT * FROM user WHERE false;
SELECT * FROM offer WHERE false;

ROLLBACK;
