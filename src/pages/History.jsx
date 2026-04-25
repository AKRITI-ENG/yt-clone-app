import VideoCard from "../components/VideoCard";
import { useApp } from "../context/AppContext";

function History() {
  const { watchHistory, clearHistory } = useApp();

  return (
    <section className="content-stack">
      <header className="page-hero">
        <div className="hero-top">
          <div className="hero-copy">
            <span className="section-kicker">Library</span>
            <h1>Watch history</h1>
            <p>Track the videos you opened most recently and clear the list when you want a fresh browsing session.</p>
          </div>

          {watchHistory.length > 0 ? (
            <button type="button" className="pill-button" onClick={clearHistory}>
              Clear history
            </button>
          ) : null}
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>{watchHistory.length}</strong>
            <span>Recently opened videos</span>
          </div>
        </div>
      </header>

      {watchHistory.length === 0 ? (
        <div className="state-card">
          <strong className="state-card-title">No watch history yet</strong>
          <p>Open a video from the home, search, or channel pages to populate this list.</p>
        </div>
      ) : (
        <>
          <div className="results-toolbar">
            <p className="results-count">
              {watchHistory.length} item{watchHistory.length === 1 ? "" : "s"} in recent history
            </p>
          </div>
          <div className="results-list">
            {watchHistory.map((video) => (
              <VideoCard key={video.id} video={video} compact />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default History;
