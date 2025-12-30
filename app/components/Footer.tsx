import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <p className={styles.copyright}>&copy; {new Date().getFullYear()} Campedia Hokkaido. All rights reserved.</p>
            </div>
        </footer>
    );
}
