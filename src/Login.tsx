import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userToken = localStorage.getItem("token");
    if (userToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // 1. Get the Token
      const userToken = await userCredential.user.getIdToken();
      
      // 2. Save Token AND Email to localStorage
      localStorage.setItem("token", userToken);
      
      // We save the full email so the Dashboard can parse the name
      if (userCredential.user.email) {
        localStorage.setItem("userEmail", userCredential.user.email);
      }
      
      alert("Login Successful!");
      navigate("/dashboard");

    } catch (error: any) {
      console.error("Login Error:", error.code);
      // Friendly error handling for the lab
      if (error.code === 'auth/invalid-login-credentials') {
        alert("Incorrect email or password.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="card-title text-center mb-4">Login</h3>
        <form>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center d-grid">
            <button type="button" className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="mt-3 text-center">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
