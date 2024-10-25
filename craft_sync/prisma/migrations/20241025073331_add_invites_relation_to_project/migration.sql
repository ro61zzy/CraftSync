/*
  Warnings:

  - You are about to drop the column `email` on the `Invite` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "email",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
