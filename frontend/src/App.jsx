import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AyurvedaLanding from "./pages/AyurvedaLanding";
import Login from "./pages/LoginPage";
<<<<<<< HEAD
import PatientDashboard from "./pages/PatientDashboard";
=======
import SignupPage from "./pages/SignupPage";

>>>>>>> 22b1cc58727b0e2f63cb7e4b24cb6ecc64b8bccf
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
