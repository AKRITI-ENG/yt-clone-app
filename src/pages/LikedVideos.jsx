import VideoCard from "../components/VideoCard";
import { useApp } from "../context/AppContext";

function LikedVideos() {
  const { likedVideos } = useApp();

  return (
    <section className="content-stack">
      <header className="section-intro">
        <span className="section-kicker">Library</span>
        <h1>Liked videos</h1>
        <p>Your saved likes from the current browser session.</p>
      </header>

      {likedVideos.length === 0 ? (
        <div className="state-card">You have not liked any videos yet.</div>
      ) : (
        <div className="results-list">
          {likedVideos.map((video) => (
            <VideoCard key={video.id} video={video} compact />
          ))}
        </div>
      )}
    </section>
  );
}

export default LikedVideos;
