-- CreateTable
CREATE TABLE "Campsite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "editorVoice" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "address" TEXT NOT NULL,
    "accessNote" TEXT,
    "vibeTags" TEXT NOT NULL,
    "noiseLevel" INTEGER NOT NULL,
    "facilities" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "youtubeVideoId" TEXT,
    "nearbyOnsenName" TEXT,
    "nearbyOnsenTime" INTEGER,
    "nearbySuperName" TEXT,
    "nearbySuperTime" INTEGER,
    "ratingTotal" REAL NOT NULL DEFAULT 0,
    "ratingNature" REAL NOT NULL DEFAULT 0,
    "ratingFacilities" REAL NOT NULL DEFAULT 0,
    "ratingCleanliness" REAL NOT NULL DEFAULT 0,
    "ratingAccess" REAL NOT NULL DEFAULT 0,
    "ratingQuietness" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campsiteId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "ratingTotal" INTEGER NOT NULL,
    "ratingNature" INTEGER NOT NULL,
    "ratingFacilities" INTEGER NOT NULL,
    "ratingCleanliness" INTEGER NOT NULL,
    "ratingAccess" INTEGER NOT NULL,
    "ratingQuietness" INTEGER NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Review_campsiteId_fkey" FOREIGN KEY ("campsiteId") REFERENCES "Campsite" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
