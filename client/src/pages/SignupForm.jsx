import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) alert("Passwords don't match in the form...");
      const response = await axios.post("http://localhost:3000/users/register", {
        email,
        password,
      });
      console.log(response);
      setRedirectToSignin(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h1>Kanban Board App</h1>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Enter confirm password"
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account <Link to="/signin">Sign In</Link>
        </p>
      </div>
      {redirectToSignin && <Navigate to="/signin" />}
    </div>
  );
};

export default SignupForm;
