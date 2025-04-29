import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { forum } from '../../services/api';
import '../../styles/forum.css';

const ForumList = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await forum.getEntries();
        setEntries(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load forum entries');
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="forum-list">
      <div className="forum-header">
        <h1>Forum Entries</h1>
        <Link to="/create-entry" className="create-entry-btn">
          Create New Entry
        </Link>
      </div>
      
      <div className="entries-container">
        {entries.map((entry) => (
          <div key={entry.id} className="entry-card">
            <div className="entry-header">
              <h2>{entry.title}</h2>
              <span className="entry-author">by {entry.author}</span>
            </div>
            <p className="entry-preview">{entry.content}</p>
            <div className="entry-footer">
              <span className="entry-date">{entry.date}</span>
              <span className="entry-comments">{entry.commentCount} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumList; 