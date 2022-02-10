-- Deploy apo-velo:integrity to pg

BEGIN;

<<<<<<< HEAD
ALTER TABLE offer
    ADD CONSTRAINT date_coherence CHECK (validity_start_date < validity_end_date AND validity_start_date>=now());
=======
-- peut peut être fonctionner
-- -- XXX Add DDLs here.
-- CREATE DOMAIN postalcode AS TEXT
-- CHECK (
-- 	-- cas très particuliers
-- 	VALUE ~ '(58180|34280|20300|20600|20620)'
--    	OR (
-- 		--cas général : les départements inexistants
-- 		VALUE ~ '^(?!00|96|99)\d{5}'
-- 		AND
-- 		-- cas corse
-- 		VALUE ~ '(?!20[04-9])\d{5}'
-- 		AND
-- 		--cas général : les valeurs inexistantes pour les 3 derniers chiffres
-- 		VALUE ~ '\d{5}(?<![12]80)$'	
-- 	)
-- );

-- ALTER TABLE "user"
--     ALTER COLUMN zip_code TYPE postalcode;
>>>>>>> develop

COMMIT;
