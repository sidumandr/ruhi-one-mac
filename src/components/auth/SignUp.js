import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const countryCodes = [
  { code: '+90', flag: '🇹🇷', name: 'Türkiye' },
  { code: '+1', flag: '🇺🇸', name: 'ABD' },
  { code: '+44', flag: '🇬🇧', name: 'Birleşik Krallık' },
  { code: '+49', flag: '🇩🇪', name: 'Almanya' },
  { code: '+33', flag: '🇫🇷', name: 'Fransa' },
  { code: '+39', flag: '🇮🇹', name: 'İtalya' },
  { code: '+34', flag: '🇪🇸', name: 'İspanya' },
  { code: '+31', flag: '🇳🇱', name: 'Hollanda' },
  { code: '+41', flag: '🇨🇭', name: 'İsviçre' },
  { code: '+46', flag: '🇸🇪', name: 'İsveç' },
  { code: '+47', flag: '🇳🇴', name: 'Norveç' },
  { code: '+45', flag: '🇩🇰', name: 'Danimarka' },
  { code: '+358', flag: '🇫🇮', name: 'Finlandiya' },
  { code: '+7', flag: '🇷🇺', name: 'Rusya' },
  { code: '+86', flag: '🇨🇳', name: 'Çin' },
  { code: '+81', flag: '🇯🇵', name: 'Japonya' },
  { code: '+82', flag: '🇰🇷', name: 'Güney Kore' },
  { code: '+91', flag: '🇮🇳', name: 'Hindistan' },
  { code: '+971', flag: '🇦🇪', name: 'Birleşik Arap Emirlikleri' },
  { code: '+966', flag: '🇸🇦', name: 'Suudi Arabistan' },
  { code: '+20', flag: '🇪🇬', name: 'Mısır' },
  { code: '+27', flag: '🇿🇦', name: 'Güney Afrika' },
  { code: '+61', flag: '🇦🇺', name: 'Avustralya' },
  { code: '+64', flag: '🇳🇿', name: 'Yeni Zelanda' },
  { code: '+55', flag: '🇧🇷', name: 'Brezilya' },
  { code: '+54', flag: '🇦🇷', name: 'Arjantin' },
  { code: '+56', flag: '🇨🇱', name: 'Şili' },
  { code: '+57', flag: '🇨🇴', name: 'Kolombiya' },
  { code: '+52', flag: '🇲🇽', name: 'Meksika' },
  { code: '+1', flag: '🇨🇦', name: 'Kanada' }
];

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    countryCode: '+90',
    password: '',
    confirmPassword: ''
  });

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // dropdown out click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Get only numbers
      const numbersOnly = value.replace(/[^0-9]/g, '');
      // Maximum 10 digits
      const truncatedNumber = numbersOnly.slice(0, 10);
      setFormData(prevState => ({
        ...prevState,
        [name]: truncatedNumber
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleCountrySelect = (country) => {
    setFormData(prevState => ({
      ...prevState,
      countryCode: country.code
    }));
    setShowCountryDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    // TODO: Implement API call to backend
    console.log('Sign up attempt:', formData);
  };

  const selectedCountry = countryCodes.find(country => country.code === formData.countryCode);

  return (
    <div className="form-container">
      <h2 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Kullanıcı Adı</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Kullanıcı adınızı girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">E-posta</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="E-posta adresinizi girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Telefon Numarası</label>
          <div className="phone-input-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={dropdownRef}>
            <div 
              className="country-selector" 
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                cursor: 'pointer',
                border: '1px solid var(--input-border)',
                borderRight: 'none',
                borderTopLeftRadius: 'var(--border-radius)',
                borderBottomLeftRadius: 'var(--border-radius)',
                backgroundColor: 'var(--input-background)',
                minWidth: '100px',
                position: 'relative',
                height: '48px',
                borderRight: '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>{selectedCountry?.flag}</span>
              <span>{selectedCountry?.code}</span>
              <span 
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.8rem',
                  color: 'var(--text-light)',
                  transition: 'transform 0.2s ease',
                  transform: showCountryDropdown ? 'rotate(180deg)' : 'rotate(0)'
                }}
              >
                ▼
              </span>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="(5XX) XXX XX XX"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength="10"
              style={{
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
                flex: 1,
                height: '48px',
                padding: '0.75rem'
              }}
            />
            {showCountryDropdown && (
              <div 
                className="country-dropdown"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 5px)',
                  left: 0,
                  right: 0,
                  backgroundColor: 'var(--background-color)',
                  border: '1px solid var(--input-border)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 99999,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              >
                {countryCodes.map((country) => (
                  <div
                    key={country.code}
                    onClick={() => {
                      handleCountrySelect(country);
                      setShowCountryDropdown(false);
                    }}
                    style={{
                      padding: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'background-color 0.2s',
                      backgroundColor: 'var(--background-color)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--input-background)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--background-color)'}
                  >
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--text-light)' }}>{country.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Şifre Tekrar</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Şifrenizi tekrar girin"
          />
        </div>
        <button type="submit" className="form-button">Kayıt Ol</button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-color)' }}>
        Zaten hesabınız var mı? <Link to="/signin" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Giriş Yap</Link>
      </p>
    </div>
  );
};

export default SignUp; 