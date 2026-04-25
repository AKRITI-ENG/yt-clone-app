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
      <header className="section-intro">
        <span className="section-kicker">Search</span>
        <h1>{query ? `Results for "${query}"` : "Search the video catalog"}</h1>
        <p>Search works against the local mock backend data.</p>
      </header>

      {!query ? <div className="state-card">Enter a search term from the navbar to see results.</div> : null}
      {query && loading ? <div className="state-card">Searching videos...</div> : null}
      {query && error ? <div className="state-card">Unable to search videos: {error}</div> : null}
      {query && !loading && !error && results.length === 0 ? (
        <div className="state-card">No results found for "{query}".</div>
      ) : null}

      {query && !loading && !error && results.length > 0 ? (
        <div className="results-list">
          {results.map((video) => (
            <VideoCard key={video.id} video={video} compact />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default Search;
