/*
  Warnings:

  - Added the required column `password` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `JobSeeker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JobSeeker" ADD COLUMN     "password" TEXT NOT NULL;
