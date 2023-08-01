/*
  Warnings:

  - You are about to drop the column `projectId` on the `Editor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Editor" DROP CONSTRAINT "Editor_projectId_fkey";

-- AlterTable
ALTER TABLE "Editor" DROP COLUMN "projectId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "notificationsType" SET DEFAULT ARRAY['PUSH-NOTIFICATION']::TEXT[];

-- CreateTable
CREATE TABLE "_EditorsProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EditorsProjects_AB_unique" ON "_EditorsProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_EditorsProjects_B_index" ON "_EditorsProjects"("B");

-- AddForeignKey
ALTER TABLE "Editor" ADD CONSTRAINT "Editor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditorsProjects" ADD CONSTRAINT "_EditorsProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Editor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditorsProjects" ADD CONSTRAINT "_EditorsProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
