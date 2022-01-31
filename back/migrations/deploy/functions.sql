-- Deploy apo-velo:functions to pg

BEGIN;

CREATE FUNCTION add_user(json) RETURNS "user" AS $$
	INSERT INTO "user" (username, lastname, firstname, email, "password", "address", zip_code)
	VALUES (
		$1->>'username', 
		$1->>'lastname', 
		$1->>'firstname', 
		$1->>'email',
		$1->>'password',
		$1->>'address',
		$1->>'zip_code'
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_user(json) RETURNS "user" AS $$
	UPDATE "user" SET
		username=$1->>'username',
		lastname=$1->>'lastname',
		firstname=$1->>'firstname',
		email=$1->>'email',
		"password"=$1->>'password',
		"address"=$1->>'address',
		zip_code=$1->>'zip_code'
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;	

CREATE FUNCTION add_offer(json) RETURNS offer AS $$
	INSERT INTO offer (title, infos, model, "size", helmet, lamps, safety_lock, photo, "address", zip_code, validity_start_date, validity_end_date, lender_id, borrower_id)
	VALUES (
		$1->>'title', 
		$1->>'infos', 
		$1->>'model',
		$1->>'size', 
		($1->>'helmet')::bool, 
		($1->>'lamps')::bool, 
		($1->>'safety_lock')::bool,
		$1->>'photo',
		$1->>'address',
		($1->>'zip_code')::int,
		($1->>'validity_start_date')::timestamptz,
		($1->>'validity_start_date')::timestamptz,
		($1->>'lender_id')::int,
		($1->>'borrower_id')::int
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_offer(json) RETURNS offer AS $$
	UPDATE offer SET
		title=$1->>'title',
		infos=$1->>'infos',
		model=$1->>'model',
		"size"=$1->>'size',
		helmet=($1->>'helmet')::bool,
		lamps=($1->>'lamps')::bool,
		safety_lock=($1->>'safety_lock')::bool,
		photo=$1->>'photo',
		"address"=$1->>'address',
		zip_code=($1->>'zip_code')::int,
		validity_start_date=($1->>'validity_start_date')::timestamptz,
		validity_end_date=($1->>'validity_end_date')::timestamptz,
		lender_id=($1->>'lender_id')::int,
		borrower_id=($1->>'borrower_id')::int
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;
