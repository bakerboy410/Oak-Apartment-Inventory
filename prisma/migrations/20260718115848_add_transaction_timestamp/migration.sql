-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TrapperTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "quantity" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_TrapperTransaction" ("date", "id", "name", "phone", "quantity", "type") SELECT "date", "id", "name", "phone", "quantity", "type" FROM "TrapperTransaction";
DROP TABLE "TrapperTransaction";
ALTER TABLE "new_TrapperTransaction" RENAME TO "TrapperTransaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
