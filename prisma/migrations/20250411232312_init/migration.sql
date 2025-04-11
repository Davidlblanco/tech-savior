/*
  Warnings:

  - The values [NOAPPLY] on the enum `ConditionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConditionType_new" AS ENUM ('NEW', 'GOOD', 'FAIR', 'POOR', 'BROKEN', 'NO_APPLY');
ALTER TABLE "Item" ALTER COLUMN "condition" TYPE "ConditionType_new" USING ("condition"::text::"ConditionType_new");
ALTER TYPE "ConditionType" RENAME TO "ConditionType_old";
ALTER TYPE "ConditionType_new" RENAME TO "ConditionType";
DROP TYPE "ConditionType_old";
COMMIT;
