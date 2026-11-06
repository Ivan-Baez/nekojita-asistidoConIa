-- CreateTable
CREATE TABLE "FanWallMessage" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FanWallMessage_pkey" PRIMARY KEY ("id")
);
