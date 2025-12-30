import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.links}>
                    <Link href="/request">キャンプ場掲載リクエスト</Link>
                </div>
                <p className={styles.copyright}>&copy; {new Date().getFullYear()} Campedia Hokkaido. All rights reserved.</p>
            </div>
        </footer>
    );
}
