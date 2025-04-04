-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('CABINET', 'CONECTORS', 'KEYBOARD', 'MOBILES', 'MONITOR', 'MOUSE', 'NOTEBOOKS', 'PRINTER', 'RECYCLESERVICES', 'SACANNER', 'SUPORTSERVICES', 'TABLETS');

-- CreateEnum
CREATE TYPE "ConditionType" AS ENUM ('NEW', 'GOOD', 'FAIR', 'POOR', 'BROKEN');

-- CreateTable
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "neighbourhood" TEXT NOT NULL,
    "unprivilegedArea" BOOLEAN NOT NULL,
    "urgency" "UrgencyLevel" NOT NULL,
    "quantityOfStudents" INTEGER,
    "availability" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "name" TEXT,
    "document" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "item" "ItemType" NOT NULL,
    "name" TEXT NOT NULL,
    "condition" "ConditionType" NOT NULL,
    "donorId" INTEGER NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_document_key" ON "Donor"("document");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
