import { CampingSpot } from '../types/camping';

export interface FilterCriteria {
    text: string;           // Matches name or address
}

export function filterSpots(spots: CampingSpot[], criteria: FilterCriteria, userLocation?: { lat: number, lng: number } | null): CampingSpot[] {
    return spots.filter(spot => {
        // Text Search
        if (criteria.text) {
            const lowerText = criteria.text.toLowerCase();
            const matchName = spot.name.toLowerCase().includes(lowerText);
            const matchAddress = spot.location.address.toLowerCase().includes(lowerText);
            if (!matchName && !matchAddress) return false;
        }
        return true;
    });
}
