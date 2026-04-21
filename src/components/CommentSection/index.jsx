import { timeAgo } from "../../utils/formatters";
import styles from "./CommentSection.module.css";

const fallbackComments = [
  {
    id: "fallback-1",
    author: "Viewer One",
    avatar: "https://picsum.photos/seed/fallback1/32/32",
    text: "Solid video. The explanation was easy to follow.",
    likes: 84,
    timestamp: "2024-03-01",
  },
  {
    id: "fallback-2",
    author: "Frontend Learner",
    avatar: "https://picsum.photos/seed/fallback2/32/32",
    text: "Would love to see a deeper follow-up on this topic.",
    likes: 29,
    timestamp: "2024-03-02",
  },
];

function CommentSection({ comments = [], loading = false }) {
  const list = comments.length > 0 ? comments : fallbackComments;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{loading ? "Loading comments..." : `${list.length} Comments`}</h2>
        <p className={styles.subtitle}>Community reactions and discussion</p>
      </div>

      <div className={styles.list}>
        {list.map((comment) => (
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
    </section>
  );
}

export default CommentSection;
