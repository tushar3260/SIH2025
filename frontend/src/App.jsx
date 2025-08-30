import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AyurvedaLanding from "./pages/AyurvedaLanding";
import Login from "./pages/LoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import SignupPage from "./pages/SignupPage";
import TherapyPage from "./pages/TherapyPage";
import AyurvedaDoctorDashboard from "./pages/AyurvedaDoctorDashboard";
import Therapies from "./pages/Therapies";
import BookAppointment from "./pages/BookAppointment";
import { UserProvider } from "./context/userContext";
import CreateTherapyForm from "./pages/CreateTherapyForm";
import PractitionerForm from "./pages/PractitionerForm";
// import UserProvider from "./context/UserContext";
import Record from "./pages/Record";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/book/:id" element={
          <UserProvider>
          <BookAppointment />
          </UserProvider>
        } />
       <Route path="/therapies" element={<Therapies />} />
        <Route path="/" element={<AyurvedaLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/dashboard" element={
          <UserProvider>
          <PatientDashboard />
          </UserProvider>
        } />
        <Route path="/therapies" element={<Therapies />} />
        <Route path="/therapy" element={<TherapyPage />} />
        <Route path="/record" element={<Record />} />
        <Route path="/practitioner-setup" element={<PractitionerForm />} />
        <Route path="/doctor-dashboard" element={<AyurvedaDoctorDashboard />} />
        <Route
          path="/create-therapy"
          element={
            <UserProvider>
              <CreateTherapyForm />
            </UserProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
