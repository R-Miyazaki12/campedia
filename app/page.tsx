import styles from './page.module.css';
import SpotExplorer from './components/SpotExplorer';
import SubmitButton from './components/SubmitButton';
import { getCampsites } from './lib/campsites';

// Force dynamic rendering because we fetching from DB (though in SQLite local it might caches, but good practice)
export const dynamic = 'force-dynamic';

export default async function Home() {
  const spots = await getCampsites();
  return (
    <div className={`container ${styles.container}`}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.highlight}>静寂</span>と出会う旅へ。
        </h1>
        <p className={styles.subtitle}>
          北海道の知られざる「穴場」キャンプ場を厳選。<br />
          静けさを愛する人のためのガイド。
        </p>
      </section>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <SubmitButton />
      </div>

      <SpotExplorer spots={spots} />
    </div>
  );
}
