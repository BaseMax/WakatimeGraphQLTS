/*
  Warnings:

  - The `unitAmount` column on the `Goal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `perEachUnit` column on the `Goal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "unitAmount",
ADD COLUMN     "unitAmount" TEXT NOT NULL DEFAULT 'secs',
DROP COLUMN "perEachUnit",
ADD COLUMN     "perEachUnit" TEXT NOT NULL DEFAULT 'day';
