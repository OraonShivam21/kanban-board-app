import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SigninForm from "./pages/SigninForm";
import SignupForm from "./pages/SignupForm";
import Board from "./pages/Board";

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Route to handle signin */}
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
