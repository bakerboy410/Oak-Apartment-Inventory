/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TrapperTransaction` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TrapperTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "quantity" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "legacy" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_TrapperTransaction" ("date", "id", "name", "phone", "quantity", "type") SELECT "date", "id", "name", "phone", "quantity", "type" FROM "TrapperTransaction";
DROP TABLE "TrapperTransaction";
ALTER TABLE "new_TrapperTransaction" RENAME TO "TrapperTransaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
