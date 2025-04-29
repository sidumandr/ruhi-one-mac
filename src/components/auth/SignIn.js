import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    identifier: '', // Can be email, phone, or username
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to backend
    console.log('Sign in attempt:', formData);
  };

  return (
    <div className="form-container">
      <h2 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="identifier" className="form-label">E-posta, Telefon veya Kullanıcı Adı</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="E-posta, telefon veya kullanıcı adınızı girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Şifre</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Şifrenizi girin"
          />
        </div>
        <button type="submit" className="form-button">Giriş Yap</button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-color)' }}>
        Hesabınız yok mu? <Link to="/signup" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Kayıt Ol</Link>
      </p>
    </div>
  );
};

export default SignIn; 