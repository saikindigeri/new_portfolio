export const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    const seconds = Math.floor(diffInSeconds % 60);
    const minutes = Math.floor((diffInSeconds / 60) % 60);
    const hours = Math.floor((diffInSeconds / 3600) % 24);
    const days = Math.floor(diffInSeconds / 86400);
  
    if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else if (seconds > 0) {
      return seconds === 1 ? 'Just now' : `${seconds} seconds ago`;
    } else {
      return 'Just now';
    }
  };


