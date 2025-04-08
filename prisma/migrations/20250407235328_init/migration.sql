/*
  Warnings:

  - You are about to drop the column `Badges` on the `Donor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "Badges",
ADD COLUMN     "badges" "Badges"[];
