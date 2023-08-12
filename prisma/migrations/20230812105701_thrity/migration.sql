-- AlterTable
ALTER TABLE "LeaderBoard" ADD COLUMN     "billingCycle" TEXT NOT NULL DEFAULT 'Monthly',
ADD COLUMN     "coupon" TEXT NOT NULL DEFAULT 'no-active-coupon',
ADD COLUMN     "extraInfo" TEXT NOT NULL DEFAULT 'you have not added any additional information for you projects',
ADD COLUMN     "paymant" TEXT NOT NULL DEFAULT 'no-method',
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free';
