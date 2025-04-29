import React, { useState } from 'react';
import { useEntry } from '../context/EntryContext';
import { useAuth } from '../context/AuthContext';

const Entry = ({ entry }) => {
  const { likeEntry, addComment } = useEntry();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      await likeEntry(entry.id);
    } catch (error) {
      console.error('Beğeni eklenirken hata oluştu:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment(entry.id, newComment);
      setNewComment('');
      setShowComments(true);
    } catch (error) {
      console.error('Yorum eklenirken hata oluştu:', error);
    }
  };

  return (
    <div className="entry-card">
      <div className="entry-header">
        <div className="entry-author">
          <img
            src={entry.authorAvatar}
            alt={entry.author}
            className="author-avatar"
          />
          <div className="author-info">
            <span className="author-name">{entry.author}</span>
            <span className="entry-date">{entry.date}</span>
          </div>
        </div>
      </div>

      <div className="entry-content">
        <p>{entry.content}</p>
        {entry.image && (
          <img
            src={entry.image}
            alt="Entry content"
            className="entry-image"
          />
        )}
      </div>

      <div className="entry-actions">
        <button
          className="action-button"
          onClick={handleLike}
        >
          <span className="action-icon">❤️</span>
          <span className="action-count">{entry.likes}</span>
        </button>
        <button
          className="action-button"
          onClick={() => setShowComments(!showComments)}
        >
          <span className="action-icon">💬</span>
          <span className="action-count">{entry.comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          {user && (
            <form onSubmit={handleComment} className="comment-form">
              <input
                type="text"
                className="comment-input"
                placeholder="Yorum yazın..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit" className="comment-submit">
                Gönder
              </button>
            </form>
          )}

          <div className="comments-list">
            {entry.comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{comment.timestamp}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Entry; 