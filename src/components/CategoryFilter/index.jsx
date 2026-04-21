import styles from "./CategoryFilter.module.css";

function CategoryFilter({ categories = [], activeCategory = "All", onChange }) {
  return (
    <div className={styles.filterBar} aria-label="Video categories">
      {["All", ...categories].map((category) => (
        <button
          key={category}
          type="button"
          className={`${styles.chip} ${activeCategory === category ? styles.active : ""}`}
          onClick={() => onChange?.(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
