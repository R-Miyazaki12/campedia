import Link from 'next/link';
import styles from './SubmitButton.module.css';

export default function SubmitButton() {
    return (
        <Link
            href="/request"
            className={styles.button}
        >
            <span className={styles.icon}>+</span>
            キャンプ場掲載リクエスト
        </Link>
    );
}
