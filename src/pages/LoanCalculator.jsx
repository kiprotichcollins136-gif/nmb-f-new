import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserId } from '../hooks/useUserId';
import './LoanCalculator.css';

export default function LoanCalculator() {
  const navigate = useNavigate();
  const { userId } = useUserId();

  const [loanAmount, setLoanAmount] = useState(500);
  const [loanTerm, setLoanTerm] = useState(12);
  const [interestRate] = useState(8);

  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    if (monthlyRate === 0) return (principal / numberOfPayments).toFixed(2);
    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment.toFixed(2);
  };

  const handleGetLoan = () => {
    localStorage.setItem('loanAmount', loanAmount.toString());
    localStorage.setItem('loanTerm', loanTerm.toString());
    navigate(`/${userId}/details`);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = (parseFloat(loanAmount) * (1 + (interestRate / 100 * loanTerm / 12))).toFixed(2);
  const amountPercent = ((loanAmount - 100) / (5000 - 100)) * 100;
  const termPercent = ((loanTerm - 6) / (60 - 6)) * 100;

  return (
    <div className="loan-calculator-container">
      <header className="calc-header">
        <img src="/logo.svg" alt="NMB Connect Logo" className="calc-logo-img" />
        <div className="calc-logo">NMB<span className="calc-connect">Connect</span></div>
        <p className="calc-tagline">Quick Loan Calculator</p>
      </header>

      <main className="calc-main">
        <div className="calc-card">
          <h1 className="calc-title">How Much Do You Need?</h1>
          <p className="calc-subtitle">Drag to select your loan amount</p>

          <div className="drag-section">
            <div className="slider-container">
              <div className="amount-display">
                <div className="amount-value">${loanAmount.toLocaleString()}</div>
                <div className="amount-label">Loan Amount (USD)</div>
              </div>
              <input type="range" className="amount-slider" min="100" max="5000" step="50"
                value={loanAmount} onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                style={{ '--fill-percent': `${amountPercent}%` }} />
              <div className="slider-range"><span>$100</span><span>$5,000</span></div>
            </div>

            <div className="slider-container">
              <div className="amount-display">
                <div className="amount-value">{loanTerm} Months</div>
                <div className="amount-label">Loan Term</div>
              </div>
              <input type="range" className="term-slider" min="6" max="60" step="1"
                value={loanTerm} onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                style={{ '--fill-percent': `${termPercent}%` }} />
              <div className="slider-range"><span>6 months</span><span>60 months</span></div>
            </div>
          </div>

          <div className="calc-results">
            <div className="result-item">
              <span className="result-label">Interest Rate:</span>
              <span className="result-value">{interestRate}% per annum</span>
            </div>
            <div className="result-item highlighted">
              <span className="result-label">Monthly Payment:</span>
              <span className="result-value">${parseFloat(monthlyPayment).toLocaleString()}</span>
            </div>
            <div className="result-item highlighted">
              <span className="result-label">Total Payable:</span>
              <span className="result-value">${parseFloat(totalPayment).toLocaleString()}</span>
            </div>
          </div>

          <button className="get-loan-btn" onClick={handleGetLoan}>CONTINUE</button>
        </div>
      </main>

      <footer className="calc-footer">
        <p>© 2026 NMB Holdings | Secure Lending Platform</p>
      </footer>
    </div>
  );
}
