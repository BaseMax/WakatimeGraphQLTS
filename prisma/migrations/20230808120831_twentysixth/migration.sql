-- CreateEnum
CREATE TYPE "UnitAmount" AS ENUM ('secs', 'hrs', 'min');

-- CreateEnum
CREATE TYPE "PerEachUnit" AS ENUM ('day', 'week', 'month', 'alltime');

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "unitAmount" "UnitAmount" NOT NULL DEFAULT 'secs',
    "perEachUnit" "PerEachUnit" NOT NULL DEFAULT 'day',
    "ignoreDaysWithNoCode" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
