-- CreateTable
CREATE TABLE "Campsite" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "editorVoice" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "accessNote" TEXT,
    "vibeTags" TEXT NOT NULL,
    "noiseLevel" INTEGER NOT NULL,
    "facilities" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "youtubeVideoId" TEXT,
    "videoLinks" TEXT NOT NULL DEFAULT '[]',
    "nearbyOnsenName" TEXT,
    "nearbyOnsenTime" INTEGER,
    "nearbySuperName" TEXT,
    "nearbySuperTime" INTEGER,
    "ratingTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingNature" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingFacilities" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCleanliness" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingAccess" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingQuietness" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Campsite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "campsiteId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "ratingTotal" INTEGER NOT NULL,
    "ratingNature" INTEGER NOT NULL,
    "ratingFacilities" INTEGER NOT NULL,
    "ratingCleanliness" INTEGER NOT NULL,
    "ratingAccess" INTEGER NOT NULL,
    "ratingQuietness" INTEGER NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_campsiteId_fkey" FOREIGN KEY ("campsiteId") REFERENCES "Campsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
