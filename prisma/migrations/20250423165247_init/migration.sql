/*
  Warnings:

  - You are about to drop the column `patronymic` on the `Employer` table. All the data in the column will be lost.
  - You are about to drop the column `patronymic` on the `JobSeeker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employer" DROP COLUMN "patronymic";

-- AlterTable
ALTER TABLE "JobSeeker" DROP COLUMN "patronymic";
