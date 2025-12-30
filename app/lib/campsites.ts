import { prisma } from './db';
import { CampingSpot } from '../types/camping';

// Helper to map Prisma entity to CampingSpot interface
function mapToCampingSpot(item: any): CampingSpot {
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        editorVoice: item.editorVoice,
        location: {
            lat: item.lat,
            lng: item.lng,
            address: item.address,
            accessNote: item.accessNote,
        },
        features: {
            vibe: JSON.parse(item.vibeTags),
            noiseLevel: item.noiseLevel,
            facilities: JSON.parse(item.facilities),
        },
        media: {
            images: JSON.parse(item.images),
            youtubeVideoId: item.youtubeVideoId || undefined,
            videoLinks: item.videoLinks ? JSON.parse(item.videoLinks) : [],
        },
        nearby: {
            onsen: item.nearbyOnsenName ? { name: item.nearbyOnsenName, driveTimeMin: item.nearbyOnsenTime || 0 } : undefined,
            supermarket: item.nearbySuperName ? { name: item.nearbySuperName, driveTimeMin: item.nearbySuperTime || 0 } : undefined,
        },
        rating: {
            total: item.ratingTotal,
            nature: item.ratingNature,
            facilities: item.ratingFacilities,
            cleanliness: item.ratingCleanliness,
            access: item.ratingAccess,
            quietness: item.ratingQuietness,
        },
        reviews: item.reviews ? item.reviews.map((r: any) => ({
            id: r.id,
            userName: r.userName,
            date: r.date.toISOString().split('T')[0], // YYYY-MM-DD
            rating: r.ratingTotal,
            content: r.content,
        })) : []
    };
}

export async function getCampsites(): Promise<CampingSpot[]> {
    const sites = await prisma.campsite.findMany({
        where: { isPublic: true },
        include: {
            reviews: {
                where: { isApproved: true }, // Only show approved reviews
                orderBy: { date: 'desc' }
            }
        }
    });
    return sites.map(mapToCampingSpot);
}

export async function getCampsite(id: string): Promise<CampingSpot | null> {
    const item = await prisma.campsite.findUnique({
        where: { id },
        include: {
            reviews: {
                where: { isApproved: true },
                orderBy: { date: 'desc' }
            }
        }
    });

    if (!item) return null;
    return mapToCampingSpot(item);
}
