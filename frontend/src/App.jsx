import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AyurvedaLanding from "./pages/AyurvedaLanding";
import Login from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PatientDashboard from "./pages/PatientDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<AyurvedaLanding />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
