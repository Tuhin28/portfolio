/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `authorId` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `sources` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `BlogPost` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to drop the column `authorId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `liveUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `Project` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - Added the required column `author` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "blogPostId" TEXT NOT NULL,
    CONSTRAINT "Source_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL,
    "blogPostId" TEXT NOT NULL,
    CONSTRAINT "Content_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WordPressSyncState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lastSyncedAt" DATETIME NOT NULL,
    "syncStatus" TEXT NOT NULL,
    "errorMessage" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "readTime" TEXT,
    "author" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_BlogPost" ("createdAt", "date", "excerpt", "id", "readTime", "thumbnail", "title", "type", "updatedAt") SELECT "createdAt", "date", "excerpt", "id", "readTime", "thumbnail", "title", "type", "updatedAt" FROM "BlogPost";
DROP TABLE "BlogPost";
ALTER TABLE "new_BlogPost" RENAME TO "BlogPost";
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "date", "description", "id", "thumbnail", "title", "type", "updatedAt") SELECT "createdAt", "date", "description", "id", "thumbnail", "title", "type", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
