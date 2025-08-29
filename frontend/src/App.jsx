import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AyurvedaLanding from "./pages/AyurvedaLanding";
import Login from "./pages/LoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import SignupPage from "./pages/SignupPage";
import AyurvedaDoctorDashboard from "./pages/AyurvedaDoctorDashboard";
import TherapyForm from "./pages/TherapyForm";
import { UserProvider } from "./context/userContext";
const App = () => {
  return (
    
      <Router>
        <Routes>

       
         <Route path="/" element={
          <UserProvider>
            <AyurvedaLanding />
          </UserProvider>
         } />
        <Route path="/dashboard" element={
          <UserProvider>
            <PatientDashboard />
          </UserProvider>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/doctor/dashboard" element={
          <UserProvider>
            <AyurvedaDoctorDashboard />
          </UserProvider>
        } />
        <Route path="/doctor/therapy-form" element={
          <UserProvider>
            <TherapyForm />
          </UserProvider>
        } />

      </Routes>
    </Router>
    
  );
};

export default App;
