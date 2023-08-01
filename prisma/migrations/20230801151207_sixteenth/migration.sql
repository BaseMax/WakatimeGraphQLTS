/*
  Warnings:

  - You are about to drop the column `fileId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_fileId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "files" TEXT[];

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "fileId";

-- DropTable
DROP TABLE "File";
