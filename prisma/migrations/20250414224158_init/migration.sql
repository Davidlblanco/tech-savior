-- CreateIndex
CREATE INDEX "Donor_name_idx" ON "Donor"("name");

-- CreateIndex
CREATE INDEX "Item_name_idx" ON "Item"("name");

-- CreateIndex
CREATE INDEX "Item_condition_idx" ON "Item"("condition");

-- CreateIndex
CREATE INDEX "Item_schoolId_donorId_idx" ON "Item"("schoolId", "donorId");

-- CreateIndex
CREATE INDEX "School_name_idx" ON "School"("name");

-- CreateIndex
CREATE INDEX "School_postalCode_idx" ON "School"("postalCode");

-- CreateIndex
CREATE INDEX "School_street_idx" ON "School"("street");
