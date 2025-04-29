import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forum } from '../../services/api';
import '../../styles/forum.css';

const CreateEntry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forum.createEntry(formData);
      navigate('/'); // Başarılı olduğunda ana sayfaya yönlendir
    } catch (err) {
      setError('Failed to create entry. Please try again.');
      console.error('Error creating entry:', err);
    }
  };

  return (
    <div className="create-entry-container">
      <div className="create-entry-box">
        <h2>Create New Entry</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="6"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">Create Entry</button>
            <button type="button" className="cancel-button" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEntry; 