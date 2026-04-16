import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("q")?.trim() || "";
  const [value, setValue] = useState(currentQuery);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (location.pathname === "/search") {
      setValue(currentQuery);
    }
  }, [currentQuery, location.pathname]);

  useEffect(() => {
    const nextQuery = debouncedValue.trim();
    if (!nextQuery) {
      return;
    }

    const nextUrl = `/search?q=${encodeURIComponent(nextQuery)}`;
    const currentUrl = `/search?q=${encodeURIComponent(currentQuery)}`;

    if (location.pathname !== "/search" || currentUrl !== nextUrl) {
      navigate(nextUrl);
    }
  }, [currentQuery, debouncedValue, location.pathname, navigate]);

  const submitSearch = (event) => {
    event.preventDefault();

    const nextQuery = value.trim();
    if (!nextQuery) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(nextQuery)}`);
  };

  return (
    <form className={styles.form} role="search" onSubmit={submitSearch}>
      <label htmlFor="site-search" className={styles.srOnly}>
        Search videos
      </label>
      <input
        id="site-search"
        type="search"
        className={styles.input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search videos"
        autoComplete="off"
      />
      <button type="submit" className={styles.button} aria-label="Search">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
