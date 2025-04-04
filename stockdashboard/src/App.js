import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StockMarketDashboard from "./components/StockMarketDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar"; 
import { isAuthenticated, logout } from "./services/authService";

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setUserLoggedIn(isAuthenticated());
  }, []);

  const handleLogout = () => {
    logout();
    setUserLoggedIn(false);
  };

  return (
    <Router>
      <Navbar userLoggedIn={userLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={userLoggedIn ? <StockMarketDashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onAuthChange={() => setUserLoggedIn(true)} />} />
        <Route path="/signup" element={<Signup onAuthChange={() => setUserLoggedIn(true)} />} />
      </Routes>
    </Router>
  );
};

export default App;
