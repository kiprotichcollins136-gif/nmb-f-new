import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserId } from '../hooks/useUserId';
import './Details.css';

export default function Details() {
  const navigate = useNavigate();
  const { userId } = useUserId();
  const [errorModal, setErrorModal] = useState({ show: false, message: '' });

  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [idNumber, setIdNumber] = useState(localStorage.getItem('idNumber') || '');
  const [address, setAddress] = useState(localStorage.getItem('address') || '');
  const [city, setCity] = useState(localStorage.getItem('city') || '');

  const closeErrorModal = () => setErrorModal({ show: false, message: '' });

  const handleNext = () => {
    if (!firstName || !lastName || !email || !idNumber || !address || !city) {
      setErrorModal({ show: true, message: 'Please fill all fields before proceeding' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorModal({ show: true, message: 'Please enter a valid email address' });
      return;
    }
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('idNumber', idNumber);
    localStorage.setItem('address', address);
    localStorage.setItem('city', city);
    navigate(`/${userId}/summary`);
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="details-container">
      <header className="details-header">
        <button className="details-back-btn" onClick={handleBack}>←</button>
        <img src="/logo.svg" alt="NMB Connect Logo" className="details-logo-img" />
        <div className="details-logo">NMB<span className="details-connect">Connect</span></div>
        <div style={{ width: '40px' }}></div>
      </header>

      <main className="details-main">
        <div className="details-card">
          <h1 className="details-title">Personal Details</h1>
          <p className="details-subtitle">Complete your profile</p>
          <div className="progress-bar"><div className="progress-fill" style={{ width: '33%' }}></div></div>

          <form className="details-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" value={lastName}
                  onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label">ID Number</label>
              <input type="text" className="form-input" value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)} placeholder="123456789" />
            </div>
            <div className="form-group">
              <label className="form-label">Home Address</label>
              <input type="text" className="form-input" value={address}
                onChange={(e) => setAddress(e.target.value)} placeholder="123 Main Street" />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input type="text" className="form-input" value={city}
                onChange={(e) => setCity(e.target.value)} placeholder="Harare" />
            </div>
          </form>

          <div className="button-group">
            <button className="btn-back" onClick={handleBack}>BACK</button>
            <button className="btn-next" onClick={handleNext}>NEXT</button>
          </div>
        </div>
      </main>

      <footer className="details-footer"><p>Step 1 of 3: Personal Details</p></footer>

      {errorModal.show && (
        <div className="error-overlay" onClick={closeErrorModal}>
          <div className="error-modal" onClick={(e) => e.stopPropagation()}>
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Attention Required</h2>
            <p className="error-message">{errorModal.message}</p>
            <button className="error-close-btn" onClick={closeErrorModal}>OK, I Understand</button>
          </div>
        </div>
      )}
    </div>
  );
}
