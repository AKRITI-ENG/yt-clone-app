import VideoCard from "../components/VideoCard";
import { useApp } from "../context/AppContext";

function LikedVideos() {
  const { likedVideos } = useApp();

  return (
    <section className="content-stack">
      <header className="page-hero">
        <div className="hero-top">
          <div className="hero-copy">
            <span className="section-kicker">Library</span>
            <h1>Liked videos</h1>
            <p>Your saved likes stay available through localStorage, so the library feels persistent between sessions.</p>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>{likedVideos.length}</strong>
            <span>Videos saved to likes</span>
          </div>
        </div>
      </header>

      {likedVideos.length === 0 ? (
        <div className="state-card">
          <strong className="state-card-title">No liked videos yet</strong>
          <p>Use the like action on any watch page to build this collection.</p>
        </div>
      ) : (
        <>
          <div className="results-toolbar">
            <p className="results-count">
              {likedVideos.length} saved item{likedVideos.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="results-list">
            {likedVideos.map((video) => (
              <VideoCard key={video.id} video={video} compact />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default LikedVideos;
