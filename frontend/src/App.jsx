import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AyurvedaLanding from "./pages/AyurvedaLanding";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page route */}
        <Route path="/" element={<AyurvedaLanding />} />

        {/* Login page route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
