/*
  Warnings:

  - Added the required column `company` to the `Employer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "company" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JobSeeker" ADD COLUMN     "skills" TEXT[];
