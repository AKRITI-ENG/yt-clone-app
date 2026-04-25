import { describe, expect, it, vi } from "vitest";
import { formatLikes, formatSubscribers, formatViews, timeAgo } from "./formatters";

describe("formatters", () => {
  it("formats view counts into compact labels", () => {
    expect(formatViews(980)).toBe("980 views");
    expect(formatViews(1200)).toBe("1.2K views");
    expect(formatViews(2500000)).toBe("2.5M views");
  });

  it("formats likes and subscribers", () => {
    expect(formatLikes(1500)).toBe("1.5K");
    expect(formatSubscribers(2200000)).toBe("2.2M");
  });

  it("returns relative time labels", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-21T12:00:00.000Z"));

    expect(timeAgo("2026-04-21T11:30:00.000Z")).toBe("30 minutes ago");
    expect(timeAgo("2026-04-20T12:00:00.000Z")).toBe("1 day ago");

    vi.useRealTimers();
  });
});
