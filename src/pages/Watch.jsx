import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import VideoCard from "../components/VideoCard";
import VideoPlayer from "../components/VideoPlayer";
import useFetch from "../hooks/useFetch";
import { useApp } from "../context/AppContext";
import { formatLikes, formatSubscribers, formatViews, timeAgo } from "../utils/formatters";

function Watch() {
  const { id } = useParams();
  const { data: video, loading, error } = useFetch(`/videos/${id}`, { initialData: null, enabled: Boolean(id) });
  const { data: channel } = useFetch(`/channels/${video?.channelId}`, {
    initialData: null,
    enabled: Boolean(video?.channelId),
  });
  const { data: comments = [], loading: commentsLoading } = useFetch(`/comments?videoId=${id}`, {
    initialData: [],
    enabled: Boolean(id),
  });
  const { data: allVideos = [] } = useFetch("/videos", { initialData: [] });
  const { toggleLike, isLiked, addToHistory } = useApp();

  useEffect(() => {
    if (video) {
      addToHistory(video);
    }
  }, [addToHistory, video]);

  const relatedVideos = useMemo(() => {
    if (!video) {
      return [];
    }

    return allVideos
      .filter(
        (item) =>
          item.id !== video.id &&
          (item.category === video.category || item.channelId === video.channelId)
      )
      .slice(0, 6);
  }, [allVideos, video]);

  if (loading) {
    return <div className="state-card">Loading video...</div>;
  }

  if (error || !video) {
    return <div className="state-card">Video not found or failed to load.</div>;
  }

  const liked = isLiked(video.id);

  return (
    <section className="watch-layout">
      <div className="content-stack">
        <VideoPlayer title={video.title} videoUrl={video.videoUrl} />

        <div className="watch-details">
          <div>
            <h1 className="watch-title">{video.title}</h1>
            <p className="watch-meta">
              <span>{formatViews(video.views)}</span>
              <span>•</span>
              <span>{formatLikes(video.likes)} likes</span>
              <span>•</span>
              <span>{timeAgo(video.uploadedAt)}</span>
            </p>
          </div>

          <button type="button" className={`pill-button ${liked ? "active-pill" : ""}`} onClick={() => toggleLike(video)}>
            {liked ? "Liked" : "Like video"}
          </button>
        </div>

        <div className="watch-channel-card">
          <Link to={`/channel/${video.channelId}`} className="channel-inline">
            <img src={video.channelAvatar} alt={video.channelName} className="channel-inline-avatar" />
            <div>
              <strong>{video.channelName}</strong>
              <p>{channel ? `${formatSubscribers(channel.subscribers)} subscribers` : "Channel details loading..."}</p>
            </div>
          </Link>
          <p className="watch-description">{video.description}</p>
        </div>

        <CommentSection comments={comments} loading={commentsLoading} />
      </div>

      <aside className="side-stack">
        <div className="section-intro compact-intro">
          <span className="section-kicker">Up Next</span>
          <h2>Recommended videos</h2>
        </div>

        {relatedVideos.length > 0 ? (
          <div className="side-video-list">
            {relatedVideos.map((item) => (
              <VideoCard key={item.id} video={item} compact />
            ))}
          </div>
        ) : (
          <div className="state-card">No related videos found.</div>
        )}
      </aside>
    </section>
  );
}

export default Watch;
