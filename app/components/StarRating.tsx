import styles from './StarRating.module.css';

interface StarRatingProps {
    rating: number; // 0 to 5
    size?: 'sm' | 'md' | 'lg';
    showCount?: boolean;
}

export default function StarRating({ rating, size = 'md', showCount = false }: StarRatingProps) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={`${styles.container} ${styles[size]}`}>
            <div className={styles.stars}>
                {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`} className={styles.starFull}>★</span>)}
                {hasHalfStar && <span className={styles.starHalf}>★</span>}
                {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className={styles.starEmpty}>★</span>)}
            </div>
            {showCount && <span className={styles.ratingValue}>{rating.toFixed(1)}</span>}
        </div>
    );
}
