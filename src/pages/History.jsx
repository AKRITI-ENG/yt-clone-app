import VideoCard from "../components/VideoCard";
import { useApp } from "../context/AppContext";

function History() {
  const { watchHistory, clearHistory } = useApp();

  return (
    <section className="content-stack">
      <header className="section-intro">
        <span className="section-kicker">Library</span>
        <h1>Watch history</h1>
        <p>Recent videos you opened in this browser.</p>
      </header>

      {watchHistory.length > 0 ? (
        <div className="actions-row">
          <button type="button" className="pill-button" onClick={clearHistory}>
            Clear history
          </button>
        </div>
      ) : null}

      {watchHistory.length === 0 ? (
        <div className="state-card">No watch history yet.</div>
      ) : (
        <div className="results-list">
          {watchHistory.map((video) => (
            <VideoCard key={video.id} video={video} compact />
          ))}
        </div>
      )}
    </section>
  );
}

export default History;
