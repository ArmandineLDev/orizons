-- Revert orizons:0023-Modifying_tables_structures from pg

BEGIN;

--ALTER TABLE "trip" DROP COLUMN "category_id";

COMMIT;
