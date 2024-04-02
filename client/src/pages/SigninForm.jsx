import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectToBoard, setRedirectToBoard] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://kanban-board-app-itnu.onrender.com/users/login", {
        email,
        password,
      });
      console.log(response);
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      setRedirectToBoard(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h1>Kanban Board App</h1>
      <div>
        <h2>Sign In</h2>
        <form onSubmit={handleSignin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter email"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter password"
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      {redirectToBoard && <Navigate to="/board" />}
    </div>
  );
};

export default SigninForm;
