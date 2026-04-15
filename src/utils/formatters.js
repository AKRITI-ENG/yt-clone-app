export const formatViews = (views) => {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M views";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K views";
  } else {
    return views + " views";
  }
};

export const formatSubscribers = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  } else {
    return count.toString();
  }
};

export const formatLikes = (likes) => {
  if (likes >= 1000000) {
    return (likes / 1000000).toFixed(1) + "M";
  } else if (likes >= 1000) {
    return (likes / 1000).toFixed(1) + "K";
  } else {
    return likes.toString();
  }
};

export const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year",   seconds: 31536000 },
    { label: "month",  seconds: 2592000  },
    { label: "week",   seconds: 604800   },
    { label: "day",    seconds: 86400    },
    { label: "hour",   seconds: 3600     },
    { label: "minute", seconds: 60       },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return count === 1
        ? `1 ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }

  return "just now";
};