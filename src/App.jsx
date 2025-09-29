import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function HomeWrapper() {
  const navigate = useNavigate();
  return (
    <Home
      onLogout={() => navigate("/login")}
      onGoToProfile={() => navigate("/profile")}
    />
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

