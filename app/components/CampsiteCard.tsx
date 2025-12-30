import Link from 'next/link';
import { CampingSpot } from '../types/camping';
import styles from './CampsiteCard.module.css';
import { calculateDistance } from '../utils/geo';

interface CampsiteCardProps {
    spot: CampingSpot;
    userLocation?: { lat: number; lng: number } | null;
}

export default function CampsiteCard({ spot, userLocation }: CampsiteCardProps) {
    const distance = userLocation
        ? calculateDistance(userLocation.lat, userLocation.lng, spot.location.lat, spot.location.lng)
        : null;

    return (
        <Link href={`/spot/${spot.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${spot.media.images[0] || '/images/placeholder.jpg'})` }}
                />
                <div className={styles.badge}>{spot.nearby.onsen ? '温泉近隣' : '穴場'}</div>
            </div>
            <div className={styles.content}>
                <div className={styles.vibeTags}>
                    {spot.features.vibe.map(vibe => (
                        <span key={vibe} className={styles.tag}>{vibe}</span>
                    ))}
                </div>
                <h3 className={styles.name}>{spot.name}</h3>
                <p className={styles.voice}>"{spot.editorVoice}"</p>
                <div className={styles.footer}>
                    <span className={styles.location}>
                        {distance !== null ? `📍 ${distance} km` : spot.location.address}
                    </span>
                    <span className={styles.rating}>★ {spot.rating.total.toFixed(1)}</span>
                </div>
            </div>
        </Link>
    );
}
