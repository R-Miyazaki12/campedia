import styles from './RatingChart.module.css';

interface RatingChartProps {
    metrics: {
        nature: number;
        facilities: number;
        cleanliness: number;
        access: number;
        quietness: number;
    };
}

const LABELS: { [key: string]: string } = {
    nature: '自然',
    facilities: '設備',
    cleanliness: '清潔さ',
    access: 'アクセス',
    quietness: '静けさ',
};

export default function RatingChart({ metrics }: RatingChartProps) {
    return (
        <div className={styles.container}>
            {Object.entries(metrics).map(([key, value]) => {
                // Calculate percentage for bar width
                const pct = (value / 5) * 100;

                return (
                    <div key={key} className={styles.row}>
                        <span className={styles.label}>{LABELS[key]}</span>
                        <div className={styles.barContainer}>
                            <div className={styles.barFill} style={{ width: `${pct}%` }} />
                        </div>
                        <span className={styles.value}>{value.toFixed(1)}</span>
                    </div>
                );
            })}
        </div>
    );
}
