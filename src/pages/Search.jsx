import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import useFetch from "../hooks/useFetch";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const { data: videos = [], loading, error } = useFetch("/videos", { initialData: [] });

  const results = useMemo(() => {
    if (!query) {
      return [];
    }

    const normalizedQuery = query.toLowerCase();
    return videos.filter((video) => {
      const haystack = [
        video.title,
        video.description,
        video.channelName,
        video.category,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query, videos]);

  return (
    <section className="content-stack">
      <header className="page-hero">
        <div className="hero-top">
          <div className="hero-copy">
            <span className="section-kicker">Search</span>
            <h1>{query ? `Results for "${query}"` : "Search the video catalog"}</h1>
            <p>Search checks titles, descriptions, creators, and categories from the local mock backend.</p>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>{query ? results.length : 0}</strong>
            <span>Matching results</span>
          </div>
          <div className="hero-stat">
            <strong>{videos.length}</strong>
            <span>Total searchable videos</span>
          </div>
        </div>
      </header>

      {!query ? (
        <div className="state-card">
          <strong className="state-card-title">Start with a keyword</strong>
          <p>Use the navbar search to look up videos by topic, creator, or category.</p>
        </div>
      ) : null}
      {query && loading ? (
        <div className="state-card">
          <strong className="state-card-title">Searching videos</strong>
          <p>Filtering the current mock library for relevant matches.</p>
        </div>
      ) : null}
      {query && error ? (
        <div className="state-card">
          <strong className="state-card-title">Unable to search videos</strong>
          <p>{error}</p>
        </div>
      ) : null}
      {query && !loading && !error && results.length === 0 ? (
        <div className="state-card">
          <strong className="state-card-title">No results found</strong>
          <p>Try a broader keyword or a creator name instead of "{query}".</p>
        </div>
      ) : null}
      {query && !loading && !error && results.length > 0 ? (
        <>
          <div className="results-toolbar">
            <p className="results-count">
              {results.length} result{results.length === 1 ? "" : "s"} found
            </p>
          </div>
          <div className="results-list">
            {results.map((video) => (
              <VideoCard key={video.id} video={video} compact />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}

export default Search;
