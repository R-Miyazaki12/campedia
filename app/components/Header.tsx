import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Campedia
                </Link>
                <nav className={styles.nav}>
                    <Link href="/about" className={styles.link}>Campediaについて</Link>
                    <Link href="/browse" className={styles.cta}>
                        キャンプ場を探す
                    </Link>
                </nav>
            </div>
        </header>
    );
}
