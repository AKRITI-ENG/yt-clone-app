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
      <header className="section-intro">
        <span className="section-kicker">Home Feed</span>
        <h1>Discover videos from the mock backend</h1>
        <p>Browse the full local catalog and filter it by category.</p>
      </header>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {loading ? <div className="state-card">Loading videos...</div> : null}
      {error ? <div className="state-card">Unable to load videos: {error}</div> : null}
      {!loading && !error && filteredVideos.length === 0 ? (
        <div className="state-card">No videos are available for this category.</div>
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
