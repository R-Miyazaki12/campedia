import styles from './ReviewList.module.css';
import StarRating from './StarRating';

interface Review {
    id: string;
    userName: string;
    date: string;
    rating: number;
    content: string;
}

interface ReviewListProps {
    reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
    if (!reviews || reviews.length === 0) {
        return <div className={styles.empty}>まだ口コミはありません。</div>;
    }

    return (
        <div className={styles.container}>
            {reviews.map(review => (
                <div key={review.id} className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.avatar}>{review.userName.charAt(0)}</div>
                        <div>
                            <div className={styles.meta}>
                                <span className={styles.name}>{review.userName}</span>
                                <span className={styles.date}>{review.date}</span>
                            </div>
                            <StarRating rating={review.rating} size="sm" />
                        </div>
                    </div>
                    <p className={styles.content}>{review.content}</p>
                </div>
            ))}
        </div>
    );
}
