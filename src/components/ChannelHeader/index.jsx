import { formatSubscribers } from "../../utils/formatters";
import styles from "./ChannelHeader.module.css";

function ChannelHeader({ channel, videoCount = 0 }) {
  if (!channel) {
    return null;
  }

  return (
    <section className={styles.header}>
      <div className={styles.bannerWrap}>
        <img src={channel.banner} alt="" className={styles.banner} />
      </div>

      <div className={styles.content}>
        <img src={channel.avatar} alt={channel.name} className={styles.avatar} />

        <div className={styles.meta}>
          <h1 className={styles.name}>{channel.name}</h1>
          <p className={styles.stats}>
            <span>{formatSubscribers(channel.subscribers)} subscribers</span>
            <span>•</span>
            <span>{videoCount} videos</span>
          </p>
          <p className={styles.description}>{channel.description}</p>
        </div>
      </div>
    </section>
  );
}

export default ChannelHeader;
