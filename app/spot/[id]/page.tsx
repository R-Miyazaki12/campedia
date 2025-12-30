import Link from 'next/link';
import { notFound } from 'next/navigation';
import YouTubeEmbed from '../../components/YouTubeEmbed';
import StarRating from '../../components/StarRating';
import RatingChart from '../../components/RatingChart';
import ReviewList from '../../components/ReviewList';
import ReviewForm from '../../components/ReviewForm';
import styles from './page.module.css';
import { getCampsite } from '../../lib/campsites';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SpotPage({ params }: PageProps) {
    const { id } = await params;
    const spot = await getCampsite(id);

    if (!spot) {
        notFound();
    }

    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${spot.location.lat},${spot.location.lng}`;

    return (
        <div className={`container ${styles.container}`}>
            <Link href="/" className={styles.backLink}>← 一覧に戻る</Link>

            <div className={styles.header}>
                <h1 className={styles.title}>{spot.name}</h1>
                <div className={styles.tags}>
                    {spot.features.vibe.map(v => <span key={v} className={styles.tag}>{v}</span>)}
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.main}>
                    {spot.media.youtubeVideoId ? (
                        <div className={styles.videoSection}>
                            <YouTubeEmbed videoId={spot.media.youtubeVideoId} />
                        </div>
                    ) : (
                        <div className={styles.imagePlaceholder}>
                            メイン動画はありません
                        </div>
                    )}

                    {spot.media.videoLinks && spot.media.videoLinks.length > 0 && (
                        <div className={styles.videoLinks}>
                            <h3 className={styles.subTitle}>その他の関連動画</h3>
                            <ul>
                                {spot.media.videoLinks.map((link, i) => (
                                    <li key={i}>
                                        <a href={link} target="_blank" rel="noopener noreferrer">
                                            📺 {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className={styles.description}>
                        <h2 className={styles.sectionTitle}>Editor's Voice</h2>
                        <p className={styles.voice}>"{spot.editorVoice}"</p>
                        <h2 className={styles.sectionTitle}>スポット詳細</h2>
                        <p className={styles.text}>{spot.description}</p>
                    </div>
                </div>

                <aside className={styles.sidebar}>
                    {/* Main Info Card */}
                    <div className={`${styles.card} glass-panel`}>
                        <div style={{ marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)', lineHeight: 1 }}>
                                {spot.rating.total.toFixed(1)} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>/ 5.0</span>
                            </div>
                            <StarRating rating={spot.rating.total} size="lg" />
                        </div>

                        <h3 className={styles.cardTitle}>評価詳細</h3>
                        <RatingChart metrics={spot.rating} />

                        <div style={{ marginTop: '20px' }}>
                            <h3 className={styles.cardTitle}>設備</h3>
                            <div className={styles.facilities}>
                                {spot.features.facilities.map(f => <span key={f} className={styles.facility}>{f}</span>)}
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className={styles.googleBtn}>
                                Googleマップで開く
                            </a>
                        </div>
                    </div>

                    {(spot.nearby.onsen || spot.nearby.supermarket) && (
                        <div className={`${styles.card} glass-panel`}>
                            <h3 className={styles.cardTitle}>周辺情報</h3>
                            {spot.nearby.onsen && (
                                <div className={styles.nearbyItem}>
                                    <span>♨️ {spot.nearby.onsen.name}</span>
                                    <span className={styles.time}>{spot.nearby.onsen.driveTimeMin}分</span>
                                </div>
                            )}
                            {spot.nearby.supermarket && (
                                <div className={styles.nearbyItem}>
                                    <span>🛒 {spot.nearby.supermarket.name}</span>
                                    <span className={styles.time}>{spot.nearby.supermarket.driveTimeMin}分</span>
                                </div>
                            )}
                        </div>
                    )}
                </aside>
            </div>

            <div className={styles.reviewsSection} style={{ marginTop: '60px' }}>
                <h2 className={styles.sectionTitle}>
                    口コミ ({spot.reviews.length}件)
                </h2>
                <ReviewList reviews={spot.reviews} />
                <ReviewForm campsiteId={spot.id} />
            </div>
        </div>
    );
}
