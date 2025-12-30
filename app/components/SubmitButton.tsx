import Link from 'next/link';
import styles from './SubmitButton.module.css';

export default function SubmitButton() {
    return (
        <Link
            href="https://docs.google.com/forms/u/0/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
        >
            <span className={styles.icon}>+</span>
            穴場情報を投稿する
        </Link>
    );
}
