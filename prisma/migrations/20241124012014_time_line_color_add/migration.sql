-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'blue',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "workItemId" INTEGER NOT NULL,
    CONSTRAINT "TimeLine_workItemId_fkey" FOREIGN KEY ("workItemId") REFERENCES "WorkItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimeLine" ("color", "createdAt", "dateEnd", "dateStart", "id", "title", "updateAt", "workItemId") SELECT "color", "createdAt", "dateEnd", "dateStart", "id", "title", "updateAt", "workItemId" FROM "TimeLine";
DROP TABLE "TimeLine";
ALTER TABLE "new_TimeLine" RENAME TO "TimeLine";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
