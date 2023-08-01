/*
  Warnings:

  - Added the required column `language` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_languageId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
