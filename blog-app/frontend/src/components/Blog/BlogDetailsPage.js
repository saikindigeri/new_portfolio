

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetailsPage.css';
import Header from '../Header/Header';

function BlogDetailPage() {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`https://blog-backend-1-wkh7.onrender.com/posts/${id}`);
      if (!response.ok) throw new Error('Error fetching blog');
      const data = await response.json();
      setBlog(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://blog-backend-1-wkh7.onrender.com/posts/${id}/comments`);
      if (!response.ok) throw new Error('Error fetching comments');
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await fetch(`https://blog-backend-1-wkh7.onrender.com/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (!response.ok) throw new Error('Error adding comment');
      await fetchComments(); 
      setCommentText(''); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShowComments = () => {
    if (!showComments) fetchComments(); 
    setShowComments(!showComments); 
  };

  if (error) return <p>{error}</p>;

  if (!blog) return <p>Loading...</p>;
console.log(comments)

 const timeAgo = (dateString) => {
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


  return (
    <>
    <Header/>
    
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} />
      <p>{blog.content}</p>

      <button onClick={handleShowComments}>
        {showComments ? 'Hide Comments' : `View Comments (${comments.length})`}
      </button>

      {showComments && (
        <div className="comments-section">
          <h2>Comments</h2>
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <p className='comment-para'><strong>{comment.username}</strong>: {comment.text}</p>
                  <small>{timeAgo(comment.created_at)}</small>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            rows="4"
            className="comment-input"
          />
          <button onClick={handleAddComment} className="btn btn-comment">Add Comment</button>
        </div>
      )}
    </div>
    </>
    
  );
}

export default BlogDetailPage;
