-- Deploy apo-velo:init to pg

BEGIN;
CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" VARCHAR(64) NOT NULL UNIQUE DEFAULT '',
    "lastname" VARCHAR(64) NOT NULL DEFAULT '',
    "firstname" VARCHAR(64) NOT NULL DEFAULT '',
    "email" VARCHAR(64) NOT NULL UNIQUE DEFAULT '',
    "password" VARCHAR(64) NOT NULL DEFAULT '',
    "address" VARCHAR(256) NOT NULL DEFAULT '',
    "zip_code" VARCHAR(5) NOT NULL DEFAULT ''
);

CREATE TABLE "offer" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"title" VARCHAR(128) NOT NULL DEFAULT '',
    "infos" VARCHAR(256) NOT NULL DEFAULT '',
    "model" VARCHAR(32) NOT NULL DEFAULT '', -- VILLE ou VTT
    "size" VARCHAR(32) NOT NULL DEFAULT '', -- ADULTE ou ENFANT
    "helmet" BOOLEAN NOT NULL DEFAULT false,
    "lamps" BOOLEAN NOT NULL DEFAULT false,
    "safety_lock" BOOLEAN NOT NULL DEFAULT false,
    "photo" VARCHAR NOT NULL DEFAULT '',
    "address" VARCHAR(256) DEFAULT '',
    "zip_code" VARCHAR(5) NOT NULL DEFAULT '',
    "validity_start_date" TIMESTAMPTZ NOT NULL,
    "validity_end_date" TIMESTAMPTZ NOT NULL,
    "lender_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE,
    "borrower_id" INTEGER REFERENCES "user"("id")
);
COMMIT;