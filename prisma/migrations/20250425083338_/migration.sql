/*
  Warnings:

  - You are about to drop the `EmployerProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobSeekerProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmployerProfile" DROP CONSTRAINT "EmployerProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_userId_fkey";

-- DropTable
DROP TABLE "EmployerProfile";

-- DropTable
DROP TABLE "JobSeekerProfile";
