import Link from 'next/link';
import styles from './ReviewButton.module.css';

interface ReviewButtonProps {
    spotName: string;
}

export default function ReviewButton({ spotName }: ReviewButtonProps) {
    // Google Form URL with pre-filled entry (Concept)
    // In reality, you would generate a specific URL from Google Forms pre-filled link feature
    // e.g. https://docs.google.com/forms/d/e/XXXX/viewform?entry.12345={spotName}
    const formUrl = `https://docs.google.com/forms/u/0/`;

    return (
        <div className={styles.container}>
            <p className={styles.text}>このキャンプ場の情報を知っていますか？<br />あなたの体験をシェアしてください。</p>
            <Link
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
            >
                ✎ コメント・評価を投稿する
            </Link>
        </div>
    );
}
