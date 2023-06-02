import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/Register/Register';

import './App.css';

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>ECOBUCKS</h1>
      <div className="card">
      </div>

      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
