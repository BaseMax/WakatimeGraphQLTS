/*
  Warnings:

  - You are about to drop the column `groupId` on the `Dashboard` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_billing-managers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_devs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_invite-only` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_managers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_owners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dashboard" DROP CONSTRAINT "Dashboard_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_teamId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_groupId_fkey";

-- DropForeignKey
ALTER TABLE "_admin" DROP CONSTRAINT "_admin_A_fkey";

-- DropForeignKey
ALTER TABLE "_admin" DROP CONSTRAINT "_admin_B_fkey";

-- DropForeignKey
ALTER TABLE "_billing-managers" DROP CONSTRAINT "_billing-managers_A_fkey";

-- DropForeignKey
ALTER TABLE "_billing-managers" DROP CONSTRAINT "_billing-managers_B_fkey";

-- DropForeignKey
ALTER TABLE "_devs" DROP CONSTRAINT "_devs_A_fkey";

-- DropForeignKey
ALTER TABLE "_devs" DROP CONSTRAINT "_devs_B_fkey";

-- DropForeignKey
ALTER TABLE "_invite-only" DROP CONSTRAINT "_invite-only_A_fkey";

-- DropForeignKey
ALTER TABLE "_invite-only" DROP CONSTRAINT "_invite-only_B_fkey";

-- DropForeignKey
ALTER TABLE "_managers" DROP CONSTRAINT "_managers_A_fkey";

-- DropForeignKey
ALTER TABLE "_managers" DROP CONSTRAINT "_managers_B_fkey";

-- DropForeignKey
ALTER TABLE "_owners" DROP CONSTRAINT "_owners_A_fkey";

-- DropForeignKey
ALTER TABLE "_owners" DROP CONSTRAINT "_owners_B_fkey";

-- AlterTable
ALTER TABLE "Dashboard" DROP COLUMN "groupId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "groupId";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "_admin";

-- DropTable
DROP TABLE "_billing-managers";

-- DropTable
DROP TABLE "_devs";

-- DropTable
DROP TABLE "_invite-only";

-- DropTable
DROP TABLE "_managers";

-- DropTable
DROP TABLE "_owners";
