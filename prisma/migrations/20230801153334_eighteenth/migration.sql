-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificationDisturbHour" TEXT[],
ADD COLUMN     "notificationStatus" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "notificationsType" TEXT[];
