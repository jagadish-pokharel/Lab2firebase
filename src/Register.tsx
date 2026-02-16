import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        if (userToken) {
            navigate("/dashboard");
        }
        // If no token, we do NOTHING. We want the user to stay on this page to register!
    }, [navigate]);

    const handleRegister = async () => {
        try {
            const userData = await createUserWithEmailAndPassword(auth, email, password);
            
            if (userData.user) {
                await sendEmailVerification(userData.user);
                alert("Registration Successful! Please check your email for verification.");
                
                // Sign out immediately so they have to log in manually
                await signOut(auth);
                navigate("/");
            }
        } catch (error: any) {
            console.error("Registration Error:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
                <h3 className="card-title text-center mb-4">Register</h3>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-center d-grid">
                        <button type="button" className="btn btn-primary" onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                    <div className="mt-3 text-center">
                        <span>Already have an account? </span>
                        <Link to="/">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;