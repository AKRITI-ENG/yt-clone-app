import { useMemo, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import VideoCard from "../components/VideoCard";
import useFetch from "../hooks/useFetch";

function Home() {
  const { data: videos = [], loading, error } = useFetch("/videos", { initialData: [] });
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => [...new Set(videos.map((video) => video.category).filter(Boolean))],
    [videos]
  );

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") {
      return videos;
    }

    return videos.filter((video) => video.category === activeCategory);
  }, [activeCategory, videos]);

  return (
    <section className="content-stack">
      <header className="page-hero">
        <div className="hero-top">
          <div className="hero-copy">
            <span className="section-kicker">Home Feed</span>
            <h1>Discover the local video catalog with a cleaner, more complete UI</h1>
            <p>Browse every mock video, filter by category, and move between routes without losing the core viewing flow.</p>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>{videos.length}</strong>
            <span>Videos in the mock library</span>
          </div>
          <div className="hero-stat">
            <strong>{categories.length + 1}</strong>
            <span>Category filters available</span>
          </div>
          <div className="hero-stat">
            <strong>{filteredVideos.length}</strong>
            <span>Items in the current feed</span>
          </div>
        </div>
      </header>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {loading ? (
        <div className="state-card">
          <strong className="state-card-title">Loading the home feed</strong>
          <p>Fetching videos from the local json-server backend.</p>
        </div>
      ) : null}
      {error ? (
        <div className="state-card">
          <strong className="state-card-title">Unable to load videos</strong>
          <p>{error}</p>
        </div>
      ) : null}
      {!loading && !error && filteredVideos.length === 0 ? (
        <div className="state-card">
          <strong className="state-card-title">Nothing matches this category yet</strong>
          <p>Choose another filter to explore the rest of the local catalog.</p>
        </div>
      ) : null}

      {!loading && !error && filteredVideos.length > 0 ? (
        <div className="video-grid">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default Home;
