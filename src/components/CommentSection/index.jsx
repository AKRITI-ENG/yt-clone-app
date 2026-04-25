import { timeAgo } from "../../utils/formatters";
import styles from "./CommentSection.module.css";

function CommentSection({ comments = [], loading = false }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {loading ? "Loading comments..." : `${comments.length} Comments`}
        </h2>
        <p className={styles.subtitle}>Community reactions and discussion</p>
      </div>

      {loading ? (
        <p className={styles.empty}>Fetching comments from the mock API.</p>
      ) : comments.length === 0 ? (
        <p className={styles.empty}>No comments yet for this video.</p>
      ) : (
        <div className={styles.list}>
          {comments.map((comment) => (
            <article key={comment.id} className={styles.comment}>
              <img src={comment.avatar} alt="" className={styles.avatar} loading="lazy" />
              <div className={styles.body}>
                <div className={styles.meta}>
                  <strong>{comment.author}</strong>
                  <span>{timeAgo(comment.timestamp)}</span>
                </div>
                <p className={styles.text}>{comment.text}</p>
                <p className={styles.likes}>{comment.likes} likes</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default CommentSection;
