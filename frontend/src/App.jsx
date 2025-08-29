import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AyurvedaLanding from "./pages/AyurvedaLanding";
import Login from "./pages/LoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import SignupPage from "./pages/SignupPage";
import Therapies from "./pages/Therapies";

const App = () => {
  return (
    <Router>
      <Routes>
       <Route path="/therapies" element={<Therapies />} />
        <Route path="/" element={<AyurvedaLanding />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
