import styles from './YouTubeEmbed.module.css';

interface YouTubeEmbedProps {
    videoId: string;
}

export default function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
    return (
        <div className={styles.container}>
            <iframe
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
