-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reception" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "docNumber" TEXT,
    "grades" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "note" TEXT,
    "petitionHasFiled" BOOLEAN NOT NULL,
    "gradesType" TEXT,
    "sector" TEXT,
    "unstutation" TEXT,
    "subject" TEXT,
    "ministry" TEXT NOT NULL,
    "typePlaint" TEXT,
    "subjectPlaint" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reception_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "receptionId" INTEGER NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "note" TEXT,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "createdBy" TEXT NOT NULL,
    "users" TEXT[],
    "title" TEXT NOT NULL,
    "description" TEXT,
    "finishedAt" TIMESTAMPTZ(3),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plainte" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "ministry" TEXT NOT NULL,
    "unstutation" TEXT,
    "typePlaint" TEXT,
    "subjectPlaint" TEXT,
    "grades" TEXT NOT NULL,
    "sourcePlaint" TEXT,
    "correspondenceNumber" TEXT NOT NULL,
    "gradesType" TEXT,
    "correspondenceDate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filesRelated" TEXT,

    CONSTRAINT "Plainte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlainteRecipients" (
    "id" TEXT NOT NULL,
    "plainteId" TEXT NOT NULL,
    "sector" TEXT,
    "reciption" TEXT,
    "town" TEXT,
    "save" BOOLEAN,

    CONSTRAINT "PlainteRecipients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Reception_id_key" ON "Reception"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Visit_id_key" ON "Visit"("id");

-- CreateIndex
CREATE INDEX "Visit_receptionId_idx" ON "Visit"("receptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_id_key" ON "Tasks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Plainte_id_key" ON "Plainte"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PlainteRecipients_id_key" ON "PlainteRecipients"("id");

-- CreateIndex
CREATE INDEX "PlainteRecipients_plainteId_idx" ON "PlainteRecipients"("plainteId");
