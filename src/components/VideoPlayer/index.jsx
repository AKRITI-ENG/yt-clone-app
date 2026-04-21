import styles from "./VideoPlayer.module.css";

function VideoPlayer({ title, videoUrl }) {
  if (!videoUrl) {
    return (
      <div className={styles.fallback}>
        <p>Video source is not available for this item.</p>
      </div>
    );
  }

  return (
    <div className={styles.playerShell}>
      <video
        className={styles.player}
        src={videoUrl}
        poster=""
        controls
        preload="metadata"
        playsInline
        aria-label={title || "Video player"}
      />
    </div>
  );
}

export default VideoPlayer;
