/*
  Warnings:

  - The values [SACANNER] on the enum `ItemType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `latitude` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemType_new" AS ENUM ('CABINET', 'CONECTORS', 'KEYBOARD', 'MOBILES', 'MONITOR', 'MOUSE', 'NOTEBOOKS', 'PRINTER', 'RECYCLESERVICES', 'SCANNER', 'SUPORTSERVICES', 'TABLETS');
ALTER TABLE "Item" ALTER COLUMN "item" TYPE "ItemType_new" USING ("item"::text::"ItemType_new");
ALTER TYPE "ItemType" RENAME TO "ItemType_old";
ALTER TYPE "ItemType_new" RENAME TO "ItemType";
DROP TYPE "ItemType_old";
COMMIT;

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
