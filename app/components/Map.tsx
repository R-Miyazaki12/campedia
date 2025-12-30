'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CampingSpot } from '../types/camping';
import styles from './Map.module.css';
import Link from 'next/link';

// Fix Leaflet default icon issue in Next.js
const icon = L.icon({
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapProps {
    spots: CampingSpot[];
}

export default function Map({ spots }: MapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        (async function init() {
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });
        })();
    }, []);

    if (!isMounted) return <div className={styles.loading}>地図を読み込み中...</div>;

    return (
        <div className={styles.container}>
            <MapContainer center={[43.5, 142.5]} zoom={7} scrollWheelZoom={false} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {spots.map(spot => (
                    <Marker key={spot.id} position={[spot.location.lat, spot.location.lng]}>
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                                <strong style={{ display: 'block', marginBottom: '4px', fontSize: '1.1em' }}>{spot.name}</strong>
                                <div style={{ marginBottom: '8px', color: '#666' }}>{spot.features.vibe.join(', ')}</div>
                                <Link href={`/spot/${spot.id}`} style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    background: '#4A6741',
                                    color: '#fff',
                                    borderRadius: '4px',
                                    textDecoration: 'none',
                                    fontSize: '0.9em'
                                }}>
                                    詳細を見る
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
