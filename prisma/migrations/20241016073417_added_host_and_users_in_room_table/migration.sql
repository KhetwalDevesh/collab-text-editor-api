/*
  Warnings:

  - You are about to drop the `_RoomUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RoomUsers" DROP CONSTRAINT "_RoomUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomUsers" DROP CONSTRAINT "_RoomUsers_B_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "hostId" TEXT,
ADD COLUMN     "users" JSONB NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "_RoomUsers";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
