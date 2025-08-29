import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AyurvedaLanding from "./pages/AyurvedaLanding";
import Login from "./pages/LoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import SignupPage from "./pages/SignupPage";
import AyurvedaDoctorDashboard from "./pages/AyurvedaDoctorDashboard";
import TherapyForm from "./pages/TherapyForm";

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<AyurvedaLanding />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/doctor/dashboard" element={<AyurvedaDoctorDashboard />} />
        <Route path="/doctor/therapy-form" element={<TherapyForm />} />
      </Routes>
    </Router>
  );
};

export default App;
