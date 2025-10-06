import { useState } from "react";
import axios from "axios";
import "../style/auth.css"

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ loding ,  setLoding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      setMessage("Login successful!");
      console.log("User:", response.data.user);
      console.log("Token:", response.data.token);

      // Optionally, save the token in localStorage
      localStorage.setItem("token", response.data.token);



    } catch (error) {
      setMessage(" Invalid credentials or server error !");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="bx bxs-user"></i>
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

        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>

        <button type="submit" className="btn">Login</button>

        {message && <p style={{ marginTop: "10px", color: "white" }}>{message}</p>}

        <div className="register-link">
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}

