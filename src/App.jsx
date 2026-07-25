import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoanApplicationProvider } from './LoanApplicationContext';
import LoanCalculator from './pages/LoanCalculator.jsx';
import Details from './pages/Details.jsx';
import Summary from './pages/Summary.jsx';
import Login from './pages/Login.jsx';
import Status from './pages/Status.jsx';

function App() {
  return (
    <LoanApplicationProvider>
      <Router>
        <Routes>
          <Route path="/:userId"            element={<LoanCalculator />} />
          <Route path="/:userId/check-rate" element={<LoanCalculator />} />
          <Route path="/:userId/details"    element={<Details />} />
          <Route path="/:userId/summary"    element={<Summary />} />
          <Route path="/:userId/login"      element={<Login />} />
          <Route path="/:userId/status"     element={<Status />} />
          <Route path="*"                   element={<LoanCalculator />} />
        </Routes>
      </Router>
    </LoanApplicationProvider>
  );
}
export default App;
