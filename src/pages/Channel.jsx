import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ChannelHeader from "../components/ChannelHeader";
import VideoCard from "../components/VideoCard";
import useFetch from "../hooks/useFetch";

function Channel() {
  const { id } = useParams();
  const { data: channel, loading: channelLoading, error: channelError } = useFetch(`/channels/${id}`, {
    initialData: null,
    enabled: Boolean(id),
  });
  const { data: videos = [], loading: videosLoading, error: videosError } = useFetch(`/videos?channelId=${id}`, {
    initialData: [],
    enabled: Boolean(id),
  });

  const sortedVideos = useMemo(
    () => [...videos].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)),
    [videos]
  );

  if (channelLoading) {
    return <div className="state-card">Loading channel...</div>;
  }

  if (channelError || !channel) {
    return <div className="state-card">Channel not found or failed to load.</div>;
  }

  return (
    <section className="content-stack">
      <ChannelHeader channel={channel} videoCount={sortedVideos.length} />

      <header className="section-intro compact-intro">
        <span className="section-kicker">Uploads</span>
        <h2>Videos from this channel</h2>
        <p>{videosLoading ? "Loading channel videos..." : "Browse the full upload list."}</p>
      </header>

      {videosError ? <div className="state-card">Unable to load channel videos: {videosError}</div> : null}
      {!videosLoading && !videosError && sortedVideos.length === 0 ? (
        <div className="state-card">This channel has no videos in the mock backend yet.</div>
      ) : null}

      {!videosLoading && !videosError && sortedVideos.length > 0 ? (
        <div className="video-grid">
          {sortedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default Channel;
