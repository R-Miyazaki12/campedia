'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { CampingSpot } from '../types/camping';
import CampsiteCard from './CampsiteCard';
import styles from '../page.module.css';
import MapStyles from './Map.module.css';
import { filterSpots } from '../utils/search';

const Map = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => <div className={MapStyles.loading}>地図を読み込み中...</div>
});

interface SpotExplorerProps {
    spots: CampingSpot[];
}

export default function SpotExplorer({ spots }: SpotExplorerProps) {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [searchText, setSearchText] = useState('');

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("Error getting location", error);
                    alert("現在地を取得できませんでした。");
                }
            );
        } else {
            alert("このブラウザは位置情報をサポートしていません。");
        }
    };

    const filteredSpots = useMemo(() => {
        return filterSpots(spots, { text: searchText }, userLocation);
    }, [spots, searchText, userLocation]);

    return (
        <>
            <div className={styles.toolbar}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexGrow: 1, flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="キャンプ場名、住所で検索..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            width: '100%',
                            maxWidth: '300px',
                            fontSize: '0.95rem',
                            color: 'var(--color-text-main)',
                            background: 'var(--color-bg-surface)'
                        }}
                    />
                    <button
                        onClick={handleGetLocation}
                        style={{
                            background: userLocation ? 'var(--color-success)' : 'transparent',
                            border: '1px solid var(--color-border)',
                            color: userLocation ? '#fff' : 'var(--color-text-muted)',
                            padding: '8px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {userLocation ? '現在地取得済み' : '📍 現在地周辺'}
                    </button>
                </div>

                <div className={styles.filters}>
                    <button
                        onClick={() => setViewMode('list')}
                        style={{
                            fontWeight: viewMode === 'list' ? 'bold' : 'normal',
                            marginRight: 10,
                            cursor: 'pointer',
                            background: viewMode === 'list' ? 'var(--color-primary)' : 'none',
                            border: 'none',
                            padding: '6px 16px',
                            borderRadius: 'var(--radius-full)',
                            color: viewMode === 'list' ? '#fff' : 'inherit',
                            transition: 'all 0.2s'
                        }}
                    >
                        リスト
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        style={{
                            fontWeight: viewMode === 'map' ? 'bold' : 'normal',
                            marginLeft: 10,
                            cursor: 'pointer',
                            background: viewMode === 'map' ? 'var(--color-primary)' : 'none',
                            border: 'none',
                            padding: '6px 16px',
                            borderRadius: 'var(--radius-full)',
                            color: viewMode === 'map' ? '#fff' : 'inherit',
                            transition: 'all 0.2s'
                        }}
                    >
                        地図
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className={styles.grid}>
                    {filteredSpots.length > 0 ? (
                        filteredSpots.map(spot => (
                            <CampsiteCard key={spot.id} spot={spot} userLocation={userLocation} />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                            条件に一致するキャンプ場が見つかりませんでした。
                        </div>
                    )}
                </div>
            ) : (
                <Map spots={filteredSpots} />
            )}
        </>
    );
}
