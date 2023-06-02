import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/Register/Register';
import LoginForm from './pages/Login/Login';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
