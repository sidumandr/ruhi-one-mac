import React, { useState } from 'react';
import { useEntry } from '../context/EntryContext';
import { useAuth } from '../context/AuthContext';
import Entry from './Entry';

const Home = () => {
  const { entries, loading, sortBy, setSortBy, addEntry } = useEntry();
  const { user } = useAuth();
  const [newEntry, setNewEntry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    try {
      await addEntry({
        content: newEntry,
        image: null // Şimdilik resim ekleme özelliğini kullanmıyoruz
      });
      setNewEntry('');
    } catch (error) {
      console.error('Gönderi eklenirken hata oluştu:', error);
    }
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="home-container">
      {/* Sol Sidebar */}
      <aside className="sidebar">
        <div className="friend-suggestions">
          <h3>Arkadaş Önerileri</h3>
          {/* Arkadaş önerileri buraya gelecek */}
        </div>
      </aside>

      {/* Ana İçerik */}
      <main className="main-feed">
        {user && (
          <div className="create-entry">
            <form onSubmit={handleSubmit}>
              <textarea
                className="entry-input"
                placeholder="Düşüncelerinizi paylaşın..."
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
              />
              <div className="entry-actions">
                <div className="entry-action-buttons">
                  <button type="button" className="entry-action-btn">
                    📷 Resim
                  </button>
                  <button type="button" className="entry-action-btn">
                    🎥 Video
                  </button>
                </div>
                <button type="submit" className="submit-entry-btn">
                  Paylaş
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="sort-options">
          <button
            className={`sort-btn ${sortBy === 'latest' ? 'active' : ''}`}
            onClick={() => setSortBy('latest')}
          >
            En Yeni
          </button>
          <button
            className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`}
            onClick={() => setSortBy('popular')}
          >
            En Popüler
          </button>
          <button
            className={`sort-btn ${sortBy === 'trending' ? 'active' : ''}`}
            onClick={() => setSortBy('trending')}
          >
            Trend
          </button>
        </div>

        <div className="entries-container">
          {entries.map(entry => (
            <Entry key={entry.id} entry={entry} />
          ))}
        </div>
      </main>

      {/* Sağ Sidebar */}
      <aside className="sidebar">
        <div className="trending-topics">
          <h3>Trend Konular</h3>
          <div className="topic-list">
            <div className="topic-item">
              <span className="topic-tag">#coding</span>
              <span className="topic-count">1.2k gönderi</span>
            </div>
            <div className="topic-item">
              <span className="topic-tag">#webdev</span>
              <span className="topic-count">856 gönderi</span>
            </div>
            <div className="topic-item">
              <span className="topic-tag">#javascript</span>
              <span className="topic-count">654 gönderi</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Home; 