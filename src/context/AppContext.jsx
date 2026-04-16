import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [likedVideos, setLikedVideos] = useState(() => {
    const saved = localStorage.getItem("likedVideos");
    return saved ? JSON.parse(saved) : [];
  });

  const [watchHistory, setWatchHistory] = useState(() => {
    const saved = localStorage.getItem("watchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
  }, [watchHistory]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleLike = (video) => {
    setLikedVideos((prev) => {
      const alreadyLiked = prev.find((v) => v.id === video.id);
      if (alreadyLiked) {
        return prev.filter((v) => v.id !== video.id);
      } else {
        return [video, ...prev];
      }
    });
  };

  const isLiked = (videoId) => {
    return likedVideos.some((v) => v.id === videoId);
  };

  const addToHistory = (video) => {
    setWatchHistory((prev) => {
      const filtered = prev.filter((v) => v.id !== video.id);
      return [video, ...filtered];
    });
  };

  const clearHistory = () => {
    setWatchHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        likedVideos,
        toggleLike,
        isLiked,
        watchHistory,
        addToHistory,
        clearHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};