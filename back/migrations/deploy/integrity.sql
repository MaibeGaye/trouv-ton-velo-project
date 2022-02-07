-- Deploy apo-velo:integrity to pg

BEGIN;

ALTER TABLE offer
    ADD CONSTRAINT date_coherence CHECK (validity_start_date < validity_end_date AND validity_start_date>=now());



COMMIT;
