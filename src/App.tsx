// src/App.tsx
import 'antd/dist/reset.css';
<<<<<<< Updated upstream
import Home from './pages/pages/Home';
import Dashboard from './pages/pages/Dashboard';
=======
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
