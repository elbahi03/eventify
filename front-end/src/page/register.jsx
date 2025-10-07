import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import "../style/auth.css"


export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", {
                name,
                email,
                password,
                password_confirmation,
            });

            setMessage(" Account created successfully!");
            console.log("User:", response.data.user);
            console.log("Token:", response.data.token);

            // Optionally store token
            localStorage.setItem("token", response.data.token);
            navigate('/home');

        } catch (error) {
            setMessage(" Registration failed. Please check your inputs.");
            console.error("Register error:", error);
        }
    };
    return (
        <div className="wrapper">
            <form onSubmit={handleRegister}>
                <h1>Register</h1>

                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Full name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <i className="bx bxs-user"></i>
                </div>

                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <i className="bx bxs-email"></i>
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password Confirmation"
                        required
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>

                <button type="submit" className="btn">Register</button>

                {message && <p style={{ marginTop: "10px", color: "white" }}>{message}</p>}

                <div className="register-link">
                    <p>
                    you have already an account? <a href="/login">Login</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

