-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "Milestone" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
