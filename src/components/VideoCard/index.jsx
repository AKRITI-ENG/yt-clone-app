import { Link } from "react-router-dom";
import { formatViews, timeAgo } from "../../utils/formatters";
import styles from "./VideoCard.module.css";

function VideoCard({ video, compact = false }) {
  if (!video) {
    return null;
  }

  return (
    <article className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <Link
        to={`/watch/${video.id}`}
        className={styles.thumbnailLink}
        aria-label={`Watch ${video.title}`}
      >
        <div className={styles.thumbnailWrap}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className={styles.thumbnail}
            loading="lazy"
          />
          {video.duration ? <span className={styles.duration}>{video.duration}</span> : null}
        </div>
      </Link>

      <div className={styles.content}>
        <Link to={`/channel/${video.channelId}`} className={styles.avatarLink} aria-hidden="true">
          <img
            src={video.channelAvatar}
            alt=""
            className={styles.avatar}
            loading="lazy"
          />
        </Link>

        <div className={styles.meta}>
          <Link to={`/watch/${video.id}`} className={styles.titleLink}>
            <h3 className={styles.title}>{video.title}</h3>
          </Link>

          <Link to={`/channel/${video.channelId}`} className={styles.channel}>
            {video.channelName}
          </Link>

          <p className={styles.stats}>
            <span>{formatViews(video.views)}</span>
            <span>•</span>
            <span>{timeAgo(video.uploadedAt)}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default VideoCard;
