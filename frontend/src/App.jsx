import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AyurvedaLanding from "./pages/AyurvedaLanding";
import Login from "./pages/LoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import SignupPage from "./pages/SignupPage";
import TherapyPage from "./pages/TherapyPage";
import AyurvedaDoctorDashboard from "./pages/AyurvedaDoctorDashboard";
import Therapies from "./pages/Therapies";
import CreateTherapyForm from "./pages/CreateTherapyForm";
import UserProvider from "./context/UserContext";
import PractitionerForm from "./pages/PractitionerForm";
const App = () => {
  return (
    <Router>
      <Routes>
       <Route path="/therapies" element={<Therapies />} />
        <Route path="/" element={<AyurvedaLanding />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/therapy" element={<TherapyPage />} />
        <Route path="/practitioner-form" element={<UserProvider><PractitionerForm /></UserProvider>} />
        <Route path="/doctor-dashboard" element={<AyurvedaDoctorDashboard />} />
        <Route path="/create-therapy" element={
          <UserProvider>
            <CreateTherapyForm />
          </UserProvider>
        } />

      </Routes>
    </Router>
    
  );
};

export default App;
