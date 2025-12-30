export type VibeTag = 'Quiet' | 'Starry Sky' | 'Forest' | 'Lake' | 'Solo' | 'No Music';

export interface CampingSpot {
    id: string;
    name: string;
    description: string; // Short summary
    editorVoice: string; // The "curated" description
    location: {
        lat: number;
        lng: number;
        address: string;
        accessNote?: string; // e.g. "Narrow road for last 2km"
    };
    features: {
        vibe: VibeTag[];
        noiseLevel: 1 | 2 | 3 | 4 | 5; // 1 = Absolute Silence, 5 = Lively
        facilities: string[]; // e.g. "Water", "Toilet", "No Power"
    };
    media: {
        images: string[]; // URLs
        youtubeVideoId?: string; // YouTube ID for embed
        videoLinks?: string[]; // New field
    };
    nearby: {
        supermarket?: { name: string; driveTimeMin: number };
        onsen?: { name: string; driveTimeMin: number };
    };
    rating: {
        total: number;
        nature: number;
        facilities: number;
        cleanliness: number;
        access: number;
        quietness: number;
    };
    reviews: {
        id: string;
        userName: string;
        date: string;
        rating: number;
        content: string;
    }[];
}
