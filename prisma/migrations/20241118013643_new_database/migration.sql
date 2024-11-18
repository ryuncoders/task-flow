/*
  Warnings:

  - You are about to drop the column `endDate` on the `TimeLine` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `TimeLine` table. All the data in the column will be lost.
  - Added the required column `isComplete` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateEnd` to the `TimeLine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateStart` to the `TimeLine` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "text" TEXT NOT NULL,
    "isComplete" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "timeLineId" INTEGER NOT NULL,
    CONSTRAINT "Task_timeLineId_fkey" FOREIGN KEY ("timeLineId") REFERENCES "TimeLine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createdAt", "date", "id", "text", "timeLineId", "updateAt") SELECT "createdAt", "date", "id", "text", "timeLineId", "updateAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_TimeLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "workItemId" INTEGER NOT NULL,
    CONSTRAINT "TimeLine_workItemId_fkey" FOREIGN KEY ("workItemId") REFERENCES "WorkItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimeLine" ("createdAt", "id", "title", "updateAt", "workItemId") SELECT "createdAt", "id", "title", "updateAt", "workItemId" FROM "TimeLine";
DROP TABLE "TimeLine";
ALTER TABLE "new_TimeLine" RENAME TO "TimeLine";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
