import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoanApplication } from '../LoanApplicationContext';
import { useUserId } from '../hooks/useUserId';
import './LoanApplication.css';

export default function LoanApplication() {
  const navigate = useNavigate();
  const { userId } = useUserId();
  const { loanApplicationData, updateLoanApplication } = useLoanApplication();

  const [loanAmount, setLoanAmount] = useState(loanApplicationData?.loanAmount || '');
  const [loanPurpose, setLoanPurpose] = useState(loanApplicationData?.loanPurpose || '');
  const [employmentStatus, setEmploymentStatus] = useState(loanApplicationData?.employmentStatus || '');
  const [monthlyIncome, setMonthlyIncome] = useState(loanApplicationData?.monthlyIncome || '');

  const handleNext = () => {
    if (!loanAmount || !loanPurpose || !employmentStatus || !monthlyIncome) {
      alert('Please fill all fields');
      return;
    }
    updateLoanApplication({ loanAmount, loanPurpose, employmentStatus, monthlyIncome });
    navigate(`/${userId}/details`);
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="loan-app-container">
      <header className="app-header">
        <button className="app-back-btn" onClick={handleBack}>←</button>
        <img src="/logo.svg" alt="NMB Connect Logo" className="app-logo-img" />
        <div className="app-logo">NMB<span className="app-connect">Connect</span></div>
        <div style={{ width: '40px' }}></div>
      </header>

      <main className="app-main">
        <div className="app-card">
          <h1 className="app-title">Loan Application</h1>
          <p className="app-subtitle">Tell us about your loan needs</p>
          <div className="progress-bar"><div className="progress-fill" style={{ width: '25%' }}></div></div>

          <form className="app-form">
            <div className="form-group">
              <label className="form-label">Loan Amount (ZWL)</label>
              <div className="input-wrapper">
                <span className="currency-symbol">ZWL</span>
                <input type="number" className="form-input" value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)} placeholder="Enter amount" min="1000" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Loan Purpose</label>
              <select className="form-select" value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)}>
                <option value="">Select purpose</option>
                <option value="education">Education</option>
                <option value="business">Business</option>
                <option value="home">Home Improvement</option>
                <option value="vehicle">Vehicle</option>
                <option value="medical">Medical</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Employment Status</label>
              <select className="form-select" value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)}>
                <option value="">Select status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="student">Student</option>
                <option value="retired">Retired</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Monthly Income (ZWL)</label>
              <div className="input-wrapper">
                <span className="currency-symbol">ZWL</span>
                <input type="number" className="form-input" value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)} placeholder="Enter monthly income" min="0" />
              </div>
            </div>
          </form>

          <div className="button-group">
            <button className="btn-back" onClick={handleBack}>BACK</button>
            <button className="btn-next" onClick={handleNext}>NEXT</button>
          </div>
        </div>
      </main>

      <footer className="app-footer"><p>Step 1 of 4: Loan Application</p></footer>
    </div>
  );
}
