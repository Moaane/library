/*
  Warnings:

  - You are about to drop the column `publicationYear` on the `book` table. All the data in the column will be lost.
  - Added the required column `publication_year` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "book" DROP COLUMN "publicationYear",
ADD COLUMN     "publication_year" INTEGER NOT NULL;
