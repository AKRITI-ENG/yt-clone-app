/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AppContext = createContext();
const readStoredList = (key) => {
  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [likedVideos, setLikedVideos] = useState(() => readStoredList("likedVideos"));
  const [watchHistory, setWatchHistory] = useState(() => readStoredList("watchHistory"));

  useEffect(() => {
    localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
  }, [watchHistory]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const toggleLike = useCallback((video) => {
    if (!video?.id) {
      return;
    }

    setLikedVideos((prev) => {
      const alreadyLiked = prev.find((v) => v.id === video.id);
      if (alreadyLiked) {
        return prev.filter((v) => v.id !== video.id);
      }

      return [video, ...prev];
    });
  }, []);

  const isLiked = useCallback((videoId) => {
    return likedVideos.some((v) => v.id === videoId);
  }, [likedVideos]);

  const addToHistory = useCallback((video) => {
    if (!video?.id) {
      return;
    }

    setWatchHistory((prev) => {
      if (prev[0]?.id === video.id) {
        return prev;
      }

      const filtered = prev.filter((v) => v.id !== video.id);
      return [video, ...filtered];
    });
  }, []);

  const clearHistory = useCallback(() => {
    setWatchHistory([]);
  }, []);

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
