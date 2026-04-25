import { act } from "react";
import { describe, expect, it, beforeEach } from "vitest";
import { createRoot } from "react-dom/client";
import { AppProvider, useApp } from "./AppContext";

function renderWithProvider(callback) {
  const container = document.createElement("div");
  const root = createRoot(container);

  function Probe() {
    callback(useApp());
    return null;
  }

  act(() => {
    root.render(
      <AppProvider>
        <Probe />
      </AppProvider>
    );
  });

  return {
    unmount() {
      act(() => {
        root.unmount();
      });
    },
  };
}

describe("AppContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds likes without duplicates and can remove them", () => {
    const sampleVideo = { id: 42, title: "Test Video" };
    let app;
    const { unmount } = renderWithProvider((value) => {
      app = value;
    });

    act(() => {
      app.toggleLike(sampleVideo);
    });
    expect(app.likedVideos).toEqual([sampleVideo]);
    expect(app.isLiked(42)).toBe(true);

    act(() => {
      app.toggleLike(sampleVideo);
    });
    expect(app.likedVideos).toEqual([]);
    expect(app.isLiked(42)).toBe(false);

    unmount();
  });

  it("keeps watch history ordered by most recent and unique video id", () => {
    const firstVideo = { id: 1, title: "First" };
    const secondVideo = { id: 2, title: "Second" };
    let app;
    const { unmount } = renderWithProvider((value) => {
      app = value;
    });

    act(() => {
      app.addToHistory(firstVideo);
      app.addToHistory(secondVideo);
      app.addToHistory(firstVideo);
    });

    expect(app.watchHistory).toEqual([firstVideo, secondVideo]);

    act(() => {
      app.clearHistory();
    });
    expect(app.watchHistory).toEqual([]);

    unmount();
  });
});
