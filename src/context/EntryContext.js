import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const EntryContext = createContext(null);

export const EntryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('latest');
  const { user } = useAuth();

  useEffect(() => {
    // Burada API'den gönderileri çekebiliriz
    fetchEntries();
  }, [sortBy]);

  const fetchEntries = async () => {
    try {
      // API çağrısı yapılacak
      // Şimdilik örnek veri kullanıyoruz
      const exampleEntries = [
        {
          id: 1,
          author: 'Ahmet Yılmaz',
          authorAvatar: 'https://via.placeholder.com/40',
          date: '2 saat önce',
          content: 'Bugün harika bir gün! Yeni projem üzerinde çalışıyorum ve çok keyifli ilerliyor. #coding #webdev',
          image: 'https://via.placeholder.com/600x400',
          likes: 42,
          comments: [
            {
              id: 1,
              author: 'Mehmet Demir',
              text: 'Harika görünüyor! Başarılar!',
              timestamp: '1 saat önce'
            }
          ]
        },
        {
          id: 2,
          author: 'Ayşe Kaya',
          authorAvatar: 'https://via.placeholder.com/40',
          date: '5 saat önce',
          content: 'Yeni bir kitap okumaya başladım. Önerilerinizi bekliyorum! 📚',
          likes: 28,
          comments: []
        }
      ];

      // Sıralama işlemi
      const sortedEntries = [...exampleEntries].sort((a, b) => {
        switch (sortBy) {
          case 'popular':
            return b.likes - a.likes;
          case 'trending':
            return (b.likes + b.comments.length) - (a.likes + a.comments.length);
          default: // latest
            return new Date(b.date) - new Date(a.date);
        }
      });

      setEntries(sortedEntries);
    } catch (error) {
      console.error('Gönderiler yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (newEntry) => {
    try {
      // API'ye gönderi ekleme isteği yapılacak
      const entry = {
        id: entries.length + 1,
        author: user.name,
        authorAvatar: user.avatar,
        date: 'Şimdi',
        content: newEntry.content,
        image: newEntry.image,
        likes: 0,
        comments: []
      };

      setEntries(prevEntries => [entry, ...prevEntries]);
      return entry;
    } catch (error) {
      console.error('Gönderi eklenirken hata oluştu:', error);
      throw error;
    }
  };

  const likeEntry = async (entryId) => {
    try {
      // API'ye beğeni isteği yapılacak
      setEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === entryId
            ? { ...entry, likes: entry.likes + 1 }
            : entry
        )
      );
    } catch (error) {
      console.error('Beğeni eklenirken hata oluştu:', error);
      throw error;
    }
  };

  const addComment = async (entryId, comment) => {
    try {
      // API'ye yorum ekleme isteği yapılacak
      const newComment = {
        id: Date.now(),
        author: user.name,
        text: comment,
        timestamp: 'Şimdi'
      };

      setEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === entryId
            ? {
                ...entry,
                comments: [...entry.comments, newComment]
              }
            : entry
        )
      );
      return newComment;
    } catch (error) {
      console.error('Yorum eklenirken hata oluştu:', error);
      throw error;
    }
  };

  const value = {
    entries,
    loading,
    sortBy,
    setSortBy,
    addEntry,
    likeEntry,
    addComment,
    fetchEntries
  };

  return (
    <EntryContext.Provider value={value}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntry = () => {
  const context = useContext(EntryContext);
  if (!context) {
    throw new Error('useEntry must be used within an EntryProvider');
  }
  return context;
}; 