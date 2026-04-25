import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import styles from "./Navbar.module.css";
import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";

function Navbar() {
  const location = useLocation();
  const themeContext = useTheme();
  const appContext = useApp();

  const isDarkMode = themeContext?.isDarkMode ?? true;
  const toggleTheme = themeContext?.toggleTheme;
  const toggleSidebar = appContext?.toggleSidebar;

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Toggle sidebar"
          onClick={() => toggleSidebar?.()}
        >
          <span className={styles.hamburger} />
          <span className={styles.hamburger} />
          <span className={styles.hamburger} />
        </button>

        <Link to="/" className={styles.brand} aria-label="Go to home page">
          <span className={styles.logoMark}>▶</span>
          <span className={styles.brandText}>
            <strong>YouTube</strong>
            <span>Clone</span>
          </span>
        </Link>
      </div>

      <div className={styles.center}>
        <SearchBar key={`${location.pathname}:${location.search}`} />
      </div>

      <div className={styles.right}>
        <button
          type="button"
          className={styles.themeButton}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => toggleTheme?.()}
        >
          <span className={styles.themeIcon}>{isDarkMode ? "☀" : "☾"}</span>
          <span className={styles.themeLabel}>{isDarkMode ? "Light" : "Dark"}</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
