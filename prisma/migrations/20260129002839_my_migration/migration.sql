/*
  Warnings:

  - You are about to drop the column `dataHora` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `dtAtualizado` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `dtCriado` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Barbearia` table. All the data in the column will be lost.
  - You are about to drop the column `dtAtualizado` on the `Barbearia` table. All the data in the column will be lost.
  - You are about to drop the column `dtCriado` on the `Barbearia` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `Barbearia` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Barbearia` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `barbeariaId` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "dataHora",
DROP COLUMN "dtAtualizado",
DROP COLUMN "dtCriado",
DROP COLUMN "usuarioId",
ADD COLUMN     "barbeariaId" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Barbearia" DROP COLUMN "descricao",
DROP COLUMN "dtAtualizado",
DROP COLUMN "dtCriado",
DROP COLUMN "imagem",
DROP COLUMN "telefone",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "imagem",
ADD COLUMN     "imageUrl" TEXT;

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "imagem" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_barbeariaId_fkey" FOREIGN KEY ("barbeariaId") REFERENCES "Barbearia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
