import { useState } from "react";
import axios from "axios";
import "../style/auth.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlice";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true); // Démarre le chargement

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      setMessage("Login successful!");
      dispatch(setAuth({ user: response.data.user, token: response.data.token }));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      navigate('/organizer/dashboard');
    } catch (error) {
      setMessage("Invalid credentials or server error !");
      console.error("Login error:", error);
    } finally {
      setLoding(false); // Arrête le chargement
    }
  };

  return (
    <div className="auth-body">
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
              disabled={loding}
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
              disabled={loding}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" disabled={loding} /> Remember me
            </label>
          </div>

          <button type="submit" className="btn" disabled={loding}>
            {loding ? "Connexion..." : "Login"}
          </button>

          {message && <p style={{ marginTop: "10px", color: "white" }}>{message}</p>}

          <div className="register-link">
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

