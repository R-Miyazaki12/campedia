-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campsite" (
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
    "videoLinks" TEXT NOT NULL DEFAULT '[]',
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
INSERT INTO "new_Campsite" ("accessNote", "address", "description", "editorVoice", "facilities", "id", "images", "lat", "lng", "name", "nearbyOnsenName", "nearbyOnsenTime", "nearbySuperName", "nearbySuperTime", "noiseLevel", "ratingAccess", "ratingCleanliness", "ratingFacilities", "ratingNature", "ratingQuietness", "ratingTotal", "vibeTags", "youtubeVideoId") SELECT "accessNote", "address", "description", "editorVoice", "facilities", "id", "images", "lat", "lng", "name", "nearbyOnsenName", "nearbyOnsenTime", "nearbySuperName", "nearbySuperTime", "noiseLevel", "ratingAccess", "ratingCleanliness", "ratingFacilities", "ratingNature", "ratingQuietness", "ratingTotal", "vibeTags", "youtubeVideoId" FROM "Campsite";
DROP TABLE "Campsite";
ALTER TABLE "new_Campsite" RENAME TO "Campsite";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
